import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Auth components
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// App components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import TestForm from "./components/TestForm";
import UploadPage from "./components/UploadPage";
import ResultPage from "./components/Result";
import Dashboard from "./components/Dashboard";
import PatientRecords from "./components/PatientRecords";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes - no authentication required */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected routes - require authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <MainContent />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <TestForm />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <UploadPage />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <ResultPage />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <Dashboard />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <div className="flex bg-gray-100 min-h-screen text-gray-800">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <div className="flex-1 p-6">
                    <PatientRecords />
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
