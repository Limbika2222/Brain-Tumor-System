from flask import Flask, render_template, request, url_for, jsonify
from keras.models import load_model
from keras.preprocessing import image
from flask_cors import CORS   # ✅ <-- NEW
import numpy as np
import os

# ----------------------------
# SETUP
# ----------------------------
app = Flask(__name__)

# ✅ Allow React frontend (localhost:5173) to access Flask
CORS(app, origins=["http://localhost:5173"])  

# Folder to store uploads
UPLOAD_FOLDER = os.path.join('static', 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load your trained model
MODEL_PATH = os.path.join('brain_tumor_model.h5')
model = load_model(MODEL_PATH)

# ----------------------------
# ROUTES
# ----------------------------

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tailwind-test.html')
def tailwind_test():
    return render_template('tailwind-test.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/api/test', methods=['POST'])
def test_form():
    data = request.json
    print("Received test data:", data)
    return jsonify({"message": "✅ Test data submitted successfully!"})

@app.route('/test', methods=['GET', 'POST'])
def test():
    if request.method == 'POST':
        form_data = request.form.to_dict()
        print("Form data received:", form_data)
        return render_template('test.html', message='✅ Test data submitted successfully!')
    return render_template('test.html')

# ----------------------------
# 🧠 Upload page and API route
# ----------------------------
@app.route('/upload', methods=['GET'])
def upload():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
@app.route('/api/upload', methods=['POST'])
def api_upload():
    file = request.files.get('file')
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    img = image.load_img(filepath, target_size=(150, 150))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    prediction = model.predict(img_array)
    class_labels = ['Glioma Tumor', 'Meningioma Tumor', 'No Tumor', 'Pituitary Tumor']
    predicted_index = np.argmax(prediction[0])
    predicted_label = class_labels[predicted_index]
    confidence = round(float(np.max(prediction[0]) * 100), 2)

    return jsonify({
        "result": predicted_label,
        "confidence": confidence,
        "image_url": f"/static/uploads/{filename}"
    })


# ----------------------------
# MAIN ENTRY POINT
# ----------------------------
if __name__ == '__main__':
    app.run(debug=True)
