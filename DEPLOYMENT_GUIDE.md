# 🚀 Deployment Guide - Firebase Cloud Functions

## ✅ Migration Complete!

Your backend has been migrated from Flask to Firebase Cloud Functions. All local Flask files have been archived to `_archive/` folder.

## 📋 Pre-Deployment Checklist

- [x] Cloud Function code created (`functions/main.py`)
- [x] Model file copied to functions folder
- [x] Frontend updated to use Cloud Function
- [x] Flask files archived
- [ ] Firebase Storage enabled
- [ ] Cloud Function deployed
- [ ] Function URL updated in frontend

## 🔥 Step 1: Enable Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `brain-tumor-system-d402a`
3. Navigate to **Storage** (left sidebar)
4. Click **Get Started**
5. Choose **Start in test mode** (for development)
6. Select a location
7. Click **Enable**

## 🚀 Step 2: Deploy Cloud Function

### Install Dependencies (if not done)
```bash
cd functions
pip install -r requirements.txt
cd ..
```

### Deploy Function
```bash
firebase deploy --only functions
```

**Expected Output:**
```
✔  functions[predict_tumor(us-central1)] Successful create operation.
Function URL: https://us-central1-brain-tumor-system-d402a.cloudfunctions.net/predict_tumor
```

### Note the Function URL
Copy the URL from the deployment output. You'll need it in the next step.

## 🔧 Step 3: Update Frontend with Function URL

### Option A: Environment Variable (Recommended)

1. Create `.env` file in project root:
```env
VITE_CLOUD_FUNCTION_URL=https://us-central1-brain-tumor-system-d402a.cloudfunctions.net/predict_tumor
```

2. The frontend will automatically use this URL.

### Option B: Direct Update

Update `src/components/UploadPage.tsx` line 46-47:
```typescript
const functionUrl = 'https://YOUR-ACTUAL-FUNCTION-URL.cloudfunctions.net/predict_tumor';
```

## 🧪 Step 4: Test the Deployment

1. Start frontend: `npm run dev`
2. Login to your app
3. Go to Upload page
4. Upload an image
5. Check if prediction works

## 📊 Step 5: Monitor Function

1. Go to Firebase Console → Functions
2. View function logs and metrics
3. Check for any errors

## 🔍 Troubleshooting

### Error: "Function not found"
- Make sure function is deployed: `firebase deploy --only functions`
- Check function name matches in code

### Error: "Model file not found"
- Verify `brain_tumor_model.h5` is in `functions/` folder
- Check file size (might need to increase function memory)

### Error: "Timeout"
- Function timeout is set to 9 minutes (540 seconds)
- If still timing out, optimize model or increase timeout

### Error: "Memory limit exceeded"
- Current: 2GB memory, 2 CPUs
- Can increase in `functions/main.py` if needed

## 💰 Cost Considerations

### Free Tier
- **2 million invocations/month** free
- **400,000 GB-seconds** compute time free
- **5GB** Storage free

### After Free Tier
- $0.40 per million invocations
- $0.0000025 per GB-second
- Storage: $0.026/GB/month

## 📝 Files Changed

### Created:
- `functions/main.py` - Cloud Function
- `functions/requirements.txt` - Python dependencies
- `functions/.python-version` - Python version
- `src/config/functions.ts` - Function URL config

### Updated:
- `src/components/UploadPage.tsx` - Uses Cloud Function
- `src/components/TestForm.tsx` - Removed Flask reference
- `src/components/Dashboard.tsx` - Removed Flask reference
- `firebase.json` - Added functions configuration

### Archived:
- `_archive/app.py` - Old Flask backend
- `_archive/requirements.txt` - Old Python dependencies
- `_archive/templates/` - Old Flask templates
- `_archive/static/` - Old static files

## ✅ Next Steps

1. Deploy: `firebase deploy --only functions`
2. Update function URL in frontend
3. Test image upload
4. Monitor function performance
5. (Optional) Set up custom domain for function

---

**Your backend is now fully serverless! No local server needed.** 🎉

