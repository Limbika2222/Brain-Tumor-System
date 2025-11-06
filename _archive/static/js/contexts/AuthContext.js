import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
const AuthContext = createContext(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    // Fetch user data from Firestore
    const fetchUserData = React.useCallback(async (uid) => {
        try {
            const userDocRef = doc(db, 'users', uid);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const data = userDocSnap.data();
                setUserData(data);
                console.log('User data fetched:', data);
            }
            else {
                console.log('No user data found in Firestore');
                setUserData(null);
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
            setUserData(null);
        }
    }, []);
    const signup = async (email, password, userData) => {
        try {
            // Step 1: Create authentication account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Step 2: Save user data to Firestore
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    name: userData.name,
                    mobile: userData.mobile,
                    email: userData.email,
                    role: userData.role || 'user',
                    createdAt: new Date().toISOString(),
                    uid: user.uid
                });
                console.log('User data saved to Firestore successfully');
                // Step 3: Update local userData state
                setUserData({
                    ...userData,
                    uid: user.uid
                });
            }
            catch (firestoreError) {
                console.error('Firestore error:', firestoreError);
                // If Firestore fails, we still have the auth account, but log the error
                // Don't throw here - account is created, just data save failed
                throw new Error(`Account created but failed to save user data: ${firestoreError.message}`);
            }
        }
        catch (error) {
            console.error('Signup error:', error);
            // Check if it's an Auth error or Firestore error
            if (error.code && error.code.startsWith('auth/')) {
                const authError = error;
                throw new Error(authError.message);
            }
            else {
                throw new Error(error.message || 'Failed to create account');
            }
        }
    };
    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            const authError = error;
            throw new Error(authError.message);
        }
    };
    const logout = async () => {
        try {
            await signOut(auth);
        }
        catch (error) {
            const authError = error;
            throw new Error(authError.message);
        }
    };
    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
        }
        catch (error) {
            const authError = error;
            throw new Error(authError.message);
        }
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                // Fetch user data from Firestore when user is logged in
                await fetchUserData(user.uid);
            }
            else {
                setUserData(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, [fetchUserData]);
    const value = {
        currentUser,
        userData,
        login,
        signup,
        logout,
        resetPassword,
        loading
    };
    return (_jsx(AuthContext.Provider, { value: value, children: children }));
};
