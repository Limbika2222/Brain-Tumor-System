# 🧠 Brain Tumor Detection System

This project is a full-stack web application for detecting brain tumors from MRI images using a trained TensorFlow model.  
It includes a **Flask (Python)** backend for image processing and prediction, and a **React (TypeScript + Tailwind CSS)** frontend for user interaction.

---

## 🚀 Features

- Upload MRI images for brain tumor detection  
- TensorFlow-based deep learning model for classification  
- Displays prediction result and confidence percentage  
- Built with a modern frontend (React + Tailwind CSS)  
- Flask API backend with TensorFlow integration

---

## 🧩 Tech Stack

### **Frontend**
- React + TypeScript  
- Tailwind CSS  
- Fetch API for backend communication  

### **Backend**
- Flask (Python)  
- TensorFlow / Keras  
- NumPy, Pillow for image processing  
- Flask-CORS for cross-origin requests  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/brain-tumor-system.git
cd brain-tumor-system
```

---

### 2️⃣ Backend Setup (Flask + TensorFlow)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

**Example `requirements.txt`:**
```
flask
flask-cors
tensorflow
numpy
pillow
```

Flask runs on **http://127.0.0.1:5000**

---

### 3️⃣ Frontend Setup (React + TypeScript + Tailwind)
```bash
cd frontend
npm install
npm run dev
```

Vite runs on **http://localhost:5173**

---

## 🔗 Connecting Frontend & Backend

The frontend sends image uploads to:
```
http://127.0.0.1:5000/api/upload
```

Make sure both servers are running before testing.

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


