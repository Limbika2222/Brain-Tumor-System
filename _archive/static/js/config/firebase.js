import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Firebase configuration for brain-tumor-system-d402a
const firebaseConfig = {
    apiKey: "AIzaSyAmn_Yma-MvmkpQt4vXdgesYuEm9JcvIzo",
    authDomain: "brain-tumor-system-d402a.firebaseapp.com",
    projectId: "brain-tumor-system-d402a",
    storageBucket: "brain-tumor-system-d402a.firebasestorage.app",
    messagingSenderId: "778007508537",
    appId: "1:778007508537:web:6d695d981b3a27f1feffe8",
    measurementId: "G-EH2CDHZ6D9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
