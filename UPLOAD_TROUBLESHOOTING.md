# 🔧 Upload Page Network Error - Troubleshooting

## Error: "NetworkError when attempting to fetch resource"

This error occurs when the React frontend cannot connect to the Flask backend.

## ✅ Common Causes & Solutions

### 1. Flask Backend Not Running

**Problem**: The Flask server at `http://127.0.0.1:5000` is not running.

**Solution**:
1. Open a terminal/command prompt
2. Navigate to your project directory
3. Run:
   ```bash
   python app.py
   ```
4. You should see: `Running on http://127.0.0.1:5000`
5. Keep this terminal open while using the app

### 2. Wrong Port or URL

**Problem**: Flask might be running on a different port.

**Solution**:
- Check the terminal where Flask is running
- Look for the port number (usually 5000)
- Update the URL in `UploadPage.tsx` if needed

### 3. CORS Issues

**Problem**: CORS might not be properly configured.

**Solution**: 
- Check `app.py` line 14: `CORS(app, origins=["http://localhost:5173"])`
- Make sure your React app is running on `http://localhost:5173`
- If using a different port, update the CORS origins

### 4. Firewall or Network Blocking

**Problem**: Firewall or antivirus blocking localhost connections.

**Solution**:
- Temporarily disable firewall/antivirus
- Or add an exception for Python/Flask

## 🧪 Quick Test

1. **Check if Flask is running**:
   - Open browser and go to: `http://127.0.0.1:5000`
   - You should see the Flask app homepage

2. **Test the API endpoint**:
   - Go to: `http://127.0.0.1:5000/api/test` (if it exists)
   - Or check browser console for connection errors

3. **Check React dev server**:
   - Make sure `npm run dev` is running
   - Should be on `http://localhost:5173`

## 📝 Required Setup

Both servers must be running simultaneously:

**Terminal 1 - Flask Backend**:
```bash
python app.py
```

**Terminal 2 - React Frontend**:
```bash
npm run dev
```

## 🔍 Debug Steps

1. Open browser Developer Tools (F12)
2. Go to **Network** tab
3. Try uploading an image
4. Look for the request to `/api/upload`
5. Check the error details:
   - **Failed to fetch** = Server not running
   - **CORS error** = CORS configuration issue
   - **404 Not Found** = Wrong URL/endpoint
   - **500 Internal Server Error** = Backend error

---

**Most likely issue: Flask backend is not running!** Start it with `python app.py` ✅

