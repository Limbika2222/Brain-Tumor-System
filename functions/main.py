import os
import tempfile
import base64
from firebase_functions import https_fn, options
from firebase_admin import initialize_app, storage
import tensorflow as tf
from tensorflow import keras
from keras.preprocessing import image
import numpy as np
from PIL import Image
import io
import json

# Initialize Firebase Admin
initialize_app()

# Global model variable (loaded once, reused for all requests)
_model = None

def load_model():
    """Load the brain tumor detection model (cached)"""
    global _model
    if _model is None:
        model_path = os.path.join(os.path.dirname(__file__), 'brain_tumor_model.h5')
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")
        _model = keras.models.load_model(model_path)
        print("Model loaded successfully")
    return _model

@https_fn.on_request(
    cors=options.CorsOptions(
        cors_origins=["http://localhost:5173", "https://brain-tumor-system-d402a.web.app"],
        cors_methods=["POST", "OPTIONS"],
        cors_allow_headers=["Content-Type", "Authorization"]
    ),
    timeout_sec=540,  # 9 minutes max for ML inference
    memory=options.MemoryOption.MB_2048,  # 2GB memory
    cpu=2  # 2 CPUs for faster processing
)
def predict_tumor(req: https_fn.Request) -> https_fn.Response:
    """Cloud Function to predict brain tumor from uploaded image"""
    
    # Handle CORS preflight
    if req.method == "OPTIONS":
        return https_fn.Response("", status=204, headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        })
    
    if req.method != "POST":
        return https_fn.Response(
            json.dumps({"error": "Method not allowed. Use POST."}),
            status=405,
            mimetype="application/json"
        )
    
    try:
        # Get JSON data from request
        request_json = req.get_json(silent=True)
        
        if not request_json:
            return https_fn.Response(
                json.dumps({"error": "No data provided"}),
                status=400,
                mimetype="application/json"
            )
        
        # Get base64 image or image data
        image_data = None
        filename = "uploaded_image.jpg"
        
        if 'image' in request_json:
            # Base64 encoded image
            image_str = request_json['image']
            if image_str.startswith('data:image'):
                # Remove data URL prefix
                image_str = image_str.split(',')[1]
            image_data = base64.b64decode(image_str)
            filename = request_json.get('filename', 'uploaded_image.jpg')
        elif 'imageData' in request_json:
            image_data = base64.b64decode(request_json['imageData'])
            filename = request_json.get('filename', 'uploaded_image.jpg')
        else:
            return https_fn.Response(
                json.dumps({"error": "No image data provided. Send 'image' or 'imageData' in JSON."}),
                status=400,
                mimetype="application/json"
            )
        
        # Save to temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp_file:
            tmp_file.write(image_data)
            tmp_path = tmp_file.name
        
        try:
            # Load and preprocess image
            img = image.load_img(tmp_path, target_size=(150, 150))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0) / 255.0
            
            # Load model and make prediction
            model = load_model()
            prediction = model.predict(img_array, verbose=0)
            
            class_labels = ['Glioma Tumor', 'Meningioma Tumor', 'No Tumor', 'Pituitary Tumor']
            predicted_index = np.argmax(prediction[0])
            predicted_label = class_labels[predicted_index]
            confidence = round(float(np.max(prediction[0]) * 100), 2)
            
            # Upload image to Firebase Storage
            image_url = None
            try:
                bucket = storage.bucket()
                blob_name = f"uploads/{filename}"
                blob = bucket.blob(blob_name)
                blob.upload_from_filename(tmp_path)
                blob.make_public()
                image_url = blob.public_url
            except Exception as storage_error:
                print(f"Storage upload failed: {storage_error}")
                # Continue without storage URL
            
            # Cleanup temp file
            os.unlink(tmp_path)
            
            return https_fn.Response(
                json.dumps({
                    "result": predicted_label,
                    "confidence": confidence,
                    "image_url": image_url or f"/uploads/{filename}"
                }),
                status=200,
                mimetype="application/json",
                headers={
                    "Access-Control-Allow-Origin": "*"
                }
            )
            
        except Exception as processing_error:
            # Cleanup on error
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
            raise processing_error
        
    except Exception as e:
        print(f"Error in predict_tumor: {str(e)}")
        import traceback
        traceback.print_exc()
        return https_fn.Response(
            json.dumps({"error": f"Prediction failed: {str(e)}"}),
            status=500,
            mimetype="application/json",
            headers={
                "Access-Control-Allow-Origin": "*"
            }
        )
