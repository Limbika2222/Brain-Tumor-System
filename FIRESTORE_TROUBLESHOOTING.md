# 🔧 Firestore Troubleshooting Guide

## Issue: User Account Created but Data Not Saved to Firestore

If the authentication account is created successfully but user data isn't being saved to Firestore, follow these steps:

## ✅ Step 1: Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `brain-tumor-system-d402a`
3. Navigate to **Firestore Database** (left sidebar)
4. If you see "Get Started" or "Create Database", click it
5. Choose **Start in test mode** (for development) or **Production mode**
6. Select a location for your database
7. Click **Enable**

## ✅ Step 2: Check Firestore Rules

1. In Firebase Console → **Firestore Database** → **Rules** tab
2. Make sure rules allow writes. For development, use:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      // Or for development/testing:
      // allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

## ✅ Step 3: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Try signing up a new user
4. Look for error messages:
   - If you see "Firestore error" → Firestore might not be enabled
   - If you see "Permission denied" → Check Firestore rules
   - If you see "Network error" → Check internet connection

## ✅ Step 4: Verify Firestore Connection

Check if Firestore is properly initialized:

1. In browser console, check for any errors during page load
2. Verify `src/config/firebase.ts` exports `db` correctly
3. Check that Firestore is imported in `AuthContext.tsx`

## ✅ Step 5: Test Firestore Write

You can test if Firestore is working by checking:

1. After signup, go to Firebase Console
2. Navigate to **Firestore Database** → **Data** tab
3. Look for a `users` collection
4. Check if documents are being created with user UIDs

## 🔍 Common Errors

### Error: "Missing or insufficient permissions"
**Solution**: Update Firestore rules (see Step 2)

### Error: "Firestore is not enabled"
**Solution**: Enable Firestore in Firebase Console (see Step 1)

### Error: "Network request failed"
**Solution**: 
- Check internet connection
- Verify Firebase project is active
- Check if Firestore is enabled

### No Error but Data Not Saved
**Solution**:
- Check browser console for silent errors
- Verify Firestore is enabled
- Check Firestore rules allow writes
- Ensure `db` is properly exported from firebase config

## 📝 Code Verification

Make sure these files are correct:

1. **`src/config/firebase.ts`** - Should export `db`:
```typescript
export const db = getFirestore(app);
```

2. **`src/contexts/AuthContext.tsx`** - Should import and use Firestore:
```typescript
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
```

3. **Firestore Rules** - Should allow authenticated users to write:
```javascript
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

## 🚀 Quick Fix

If you're in development and want to quickly test:

1. Set Firestore rules to test mode temporarily:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

2. Publish the rules
3. Try signing up again
4. Check Firestore Database → Data tab for the `users` collection

---

**After fixing, the user data should be saved to Firestore automatically when signing up!** ✅

