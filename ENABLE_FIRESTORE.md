# 🔥 Enable Firestore Database (Not Realtime Database)

## ⚠️ Important: You Need Firestore, Not Realtime Database

Your code uses **Firestore** (the modern Firebase database), but you currently have **Realtime Database** enabled. These are two different services!

## ✅ Step-by-Step: Enable Firestore

### Step 1: Go to Firestore Database
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `brain-tumor-system-d402a`
3. In the left sidebar, look for **"Firestore Database"** (NOT "Realtime Database")
4. Click on **"Firestore Database"**

### Step 2: Create Firestore Database
1. If you see **"Get Started"** or **"Create Database"**, click it
2. Choose **"Start in test mode"** (for development) or **"Production mode"**
3. Select a location (choose the same region as your Realtime Database if possible, e.g., `asia-southeast1`)
4. Click **"Enable"**
5. Wait for the database to be created (takes a few seconds)

### Step 3: Set Firestore Rules
1. After Firestore is enabled, go to the **"Rules"** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

### Step 4: Verify Firestore is Active
1. Go to the **"Data"** tab in Firestore
2. You should see an empty database (no collections yet)
3. This is normal - collections will be created when users sign up

## 🔍 How to Tell the Difference

### Realtime Database:
- URL shows: `-default-rtdb.firebasedatabase.app`
- Data is stored in JSON tree structure
- Shows in sidebar as "Realtime Database"

### Firestore:
- URL shows: `firestore.googleapis.com` (in API calls)
- Data is stored in collections/documents
- Shows in sidebar as "Firestore Database"
- Has "Data", "Rules", "Indexes", "Usage" tabs

## ✅ After Enabling Firestore

1. Try signing up a new user
2. Go to Firestore Database → Data tab
3. You should see a `users` collection appear
4. Click on it to see user documents with their data

## 📝 Note

You can have both Realtime Database and Firestore enabled in the same project, but our code uses Firestore. Make sure Firestore is enabled for the signup to work properly.

---

**Once Firestore is enabled, user data will be saved automatically!** ✅

