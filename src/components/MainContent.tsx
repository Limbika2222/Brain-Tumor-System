import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const MainContent: React.FC = () => {
  const navigate = useNavigate();
  const { userData, loading } = useAuth();

  // Get user's name or fallback to email or "User"
  const displayName = userData?.name || userData?.email?.split('@')[0] || 'User';

  return (
    <main className="flex flex-1 items-center justify-between px-12 py-10">
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-orange-500">Hello:</span>
          <span className="text-blue-600"> {loading ? '...' : displayName}</span>
        </h2>

        <p className="text-gray-600 mb-6">
          Collect complete patient data and upload relevant diagnostic images (MRI/CT) for intelligent analysis.
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg">
          Patient Diagnosis
        </button>

        <div className="mt-10 p-6 bg-gray-100 rounded-xl shadow flex items-start gap-4">
          <div className="text-blue-600 text-3xl font-bold">+</div>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Manual Diagnosis</h4>
            <p className="text-gray-600 mb-3">Upload the MRI image to perform a Manual Diagnosis.</p>
             <button
                onClick={() => navigate("/test")}
                     className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
                >
                Patient Diagnosis
        </button>
          </div>
        </div>
      </div>

      <div>
        <img src="/images/doctor-illustration.png" alt="Doctor" className="w-96" />
      </div>
    </main>
  );
};

export default MainContent;
