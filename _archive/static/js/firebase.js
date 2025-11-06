// static/js/firebase.js
// Firebase configuration for brain-tumor-system-d402a
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmn_Yma-MvmkpQt4vXdgesYuEm9JcvIzo",
  authDomain: "brain-tumor-system-d402a.firebaseapp.com",
  projectId: "brain-tumor-system-d402a",
  storageBucket: "brain-tumor-system-d402a.firebasestorage.app",
  messagingSenderId: "778007508537",
  appId: "1:778007508537:web:6d695d981b3a27f1feffe8",
  measurementId: "G-EH2CDHZ6D9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Expose globally
window.auth = auth;
window.db = db;
