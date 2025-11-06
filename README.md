# 🧠 Brain Tumor Detection System

This project is a full-stack web application for detecting brain tumors from MRI images using a trained TensorFlow model.  
It uses **Firebase Cloud Functions** for serverless backend processing and a **React (TypeScript + Tailwind CSS)** frontend.

---

## 🚀 Features

- Upload MRI images for brain tumor detection  
- TensorFlow-based deep learning model for classification  
- Displays prediction result and confidence percentage  
- Built with a modern frontend (React + Tailwind CSS)  
- Firebase Authentication (Email/Password)
- Serverless backend with Firebase Cloud Functions
- Firebase Storage for image storage
- Firestore for user data

---

## 🧩 Tech Stack

### **Frontend**
- React + TypeScript  
- Tailwind CSS  
- Firebase SDK
- React Router

### **Backend (Serverless)**
- Firebase Cloud Functions (Python)
- TensorFlow / Keras  
- NumPy, Pillow for image processing
- Firebase Storage
- Firestore Database

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/brain-tumor-system.git
cd brain-tumor-system
```

---

### 2️⃣ Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend (Cloud Functions):**
```bash
cd functions
pip install -r requirements.txt
cd ..
```

---

### 3️⃣ Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
3. Update `src/config/firebase.ts` with your Firebase config

---

### 4️⃣ Deploy Cloud Functions

```bash
firebase deploy --only functions
```

After deployment, update the function URL in `src/components/UploadPage.tsx`

---

### 5️⃣ Start Frontend

```bash
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 🔗 Architecture

The frontend sends image uploads to:
```
https://YOUR-REGION-YOUR-PROJECT.cloudfunctions.net/predict_tumor
```

No local backend server needed! Everything runs on Firebase.

---

## 📷 Example Workflow

1. Select an MRI image  
2. Click **"Analyze Image"**  
3. The backend predicts the tumor type  
4. The result and confidence are displayed on the screen  

---

## 🧠 Classes in Model Output

- Glioma Tumor  
- Meningioma Tumor  
- No Tumor  
- Pituitary Tumor  

---

## 🧾 License
This project is open-source and free to use for educational purposes.

---


