# 🔥 Firebase Cloud Functions Setup Guide

## ✅ What Was Done

Your backend has been migrated to Firebase Cloud Functions! The local Flask server is no longer needed.

## 📁 Files Created

1. **`functions/main.py`** - Cloud Function for brain tumor prediction
2. **`functions/requirements.txt`** - Python dependencies
3. **`functions/.python-version`** - Python version (3.11)
4. **`functions/brain_tumor_model.h5`** - ML model (copied)
5. **`src/config/functions.ts`** - Function URL configuration

## 🚀 Deployment Steps

### Step 1: Install Dependencies in Functions Folder

```bash
cd functions
pip install -r requirements.txt
cd ..
```

### Step 2: Deploy Cloud Function

```bash
firebase deploy --only functions
```

This will:
- Upload your function code
- Upload the model file
- Create the Cloud Function endpoint
- Provide you with the function URL

### Step 3: Get Your Function URL

After deployment, you'll see output like:
```
✔  functions[predict_tumor(us-central1)] Successful create operation.
Function URL: https://us-central1-brain-tumor-system-d402a.cloudfunctions.net/predict_tumor
```

### Step 4: Update Frontend with Function URL

Update `src/components/UploadPage.tsx` line 47 with your actual function URL:

```typescript
const functionUrl = 'https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/predict_tumor';
```

Or set it as an environment variable:
```bash
# Create .env file
VITE_CLOUD_FUNCTION_URL=https://us-central1-brain-tumor-system-d402a.cloudfunctions.net/predict_tumor
```

## 🔧 Local Testing (Optional)

You can test locally using Firebase Emulators:

```bash
firebase emulators:start --only functions
```

Then update the URL in `UploadPage.tsx` to:
```typescript
const functionUrl = 'http://127.0.0.1:5001/brain-tumor-system-d402a/us-central1/predict_tumor';
```

## 📝 How It Works Now

1. **User uploads image** → Frontend converts to base64
2. **Frontend sends to Cloud Function** → POST request with JSON
3. **Cloud Function processes** → Loads model, makes prediction
4. **Image saved to Firebase Storage** → Public URL returned
5. **Results returned** → Prediction + confidence + image URL

## 🗑️ Removing Local Flask Backend

After confirming Cloud Function works, you can:

1. **Stop running Flask** (if running)
2. **Archive Flask files** (optional):
   - `app.py` → Move to `_archive/` folder
   - `requirements.txt` → Keep or archive
   - Flask templates → Can be removed (using React now)

## ⚙️ Configuration

### Memory & CPU Settings

The function is configured with:
- **Memory**: 2GB (for TensorFlow model)
- **CPU**: 2 cores
- **Timeout**: 9 minutes

You can adjust these in `functions/main.py` if needed.

### Firebase Storage

Make sure Firebase Storage is enabled:
1. Go to Firebase Console
2. Navigate to **Storage**
3. Click **Get Started**
4. Choose **Start in test mode** or **Production mode**

## 🔍 Troubleshooting

### Error: "Model file not found"
- Make sure `brain_tumor_model.h5` is in the `functions/` folder
- Check file size (might need to increase function memory)

### Error: "Function timeout"
- Increase timeout in `main.py` (max 540 seconds)
- Or optimize model size

### Error: "Memory limit exceeded"
- Increase memory allocation in `main.py`
- Or use a smaller model

## 📊 Cost Considerations

- **Free Tier**: 2 million invocations/month
- **After free tier**: $0.40 per million invocations
- **Compute time**: Charged per GB-second
- **Storage**: First 5GB free

## ✅ Next Steps

1. Deploy the function: `firebase deploy --only functions`
2. Update frontend URL with deployed function URL
3. Test image upload
4. Remove/archive local Flask files

---

**Your backend is now fully serverless on Firebase!** 🎉

