import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";

type UploadResult = {
  result: string;
  confidence: number;
  imageUrl: string;
};

type LocationState = {
  uploadResult?: UploadResult;
};

type PatientFormData = {
  fullname: string;
  phone: string;
  email: string;
  address: string;
  emergency_name: string;
  relationship: string;
  emergency_phone: string;
  gender: string;
  dob: string;
  age: string;
  patient_id: string;
  chief_complaint: string;
  symptom_description: string;
  symptoms: string[];
  onset_duration: string;
  neurological_exam: string;
  history: string[];
  medications: string;
  surgical_history: string;
  family_history: string;
  family_details: string;
  smoking_status: string;
  alcohol_use: string;
  occupational_exposures: string;
  modality: string;
  sequence: string;
};

const TestForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const initialFormData: PatientFormData = useMemo(
    () => ({
      fullname: "",
      phone: "",
      email: "",
      address: "",
      emergency_name: "",
      relationship: "",
      emergency_phone: "",
      gender: "Male",
      dob: "",
      age: "",
      patient_id: "",
      chief_complaint: "",
      symptom_description: "",
      symptoms: [],
      onset_duration: "",
      neurological_exam: "",
      history: [],
      medications: "",
      surgical_history: "",
      family_history: "No",
      family_details: "",
      smoking_status: "Never",
      alcohol_use: "Never",
      occupational_exposures: "",
      modality: "MRI",
      sequence: "T1",
    }),
    []
  );
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const location = useLocation();
  const locationState = location.state as LocationState | null;
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();

  useEffect(() => {
    if (locationState?.uploadResult) {
      setUploadResult(locationState.uploadResult);
      setMessage(null);
      setError(null);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => {
      const currentValues = Array.isArray(prev[name as keyof PatientFormData])
        ? (prev[name as keyof PatientFormData] as string[])
        : [];
      return {
        ...prev,
        [name]: checked
          ? [...currentValues, value]
          : currentValues.filter((v) => v !== value),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      if (!currentUser) {
        throw new Error("You must be logged in to submit test data.");
      }

      if (!uploadResult) {
        navigate("/upload");
        throw new Error("Please upload and analyze an image before submitting the record.");
      }

      setSaving(true);

      const record = {
        ...formData,
        result: uploadResult.result,
        confidence: uploadResult.confidence,
        imageUrl: uploadResult.imageUrl,
        userId: currentUser.uid,
        userEmail: currentUser.email ?? null,
        userName: userData?.name ?? null,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "testRecords"), record);
      setMessage("✅ Test data saved successfully to Firebase!");
      setFormData({ ...initialFormData });
      setUploadResult(null);
    } catch (err: any) {
      console.error("Failed to save test data:", err);
      setError(err.message || "Failed to submit test data.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center bg-white shadow p-4 mb-6 rounded-lg">
        <div className="text-xl font-bold text-blue-700">🧠 ML-Based Brain Tumor Assistant</div>
        <nav className="flex gap-6">
          <a href="/" className="hover:text-blue-600 font-medium">Home</a>
          <a href="/test" className="text-blue-600 font-semibold border-b-2 border-blue-600">Test Form</a>
          <a href="/upload" className="hover:text-blue-600 font-medium">Upload</a>
        </nav>
      </header>

      {/* Upload Results Summary */}
      {uploadResult ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Latest Upload Analysis</h3>
          <p className="mb-1"><strong>Result:</strong> {uploadResult.result}</p>
          <p className="mb-3"><strong>Confidence:</strong> {uploadResult.confidence.toFixed(2)}%</p>
          {uploadResult.imageUrl && (
            <img
              src={uploadResult.imageUrl}
              alt="Uploaded Scan"
              className="w-48 h-48 object-cover rounded-xl border border-blue-200"
            />
          )}
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-300 text-amber-800 p-6 rounded-lg shadow mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Upload Required</h3>
            <p className="text-sm mb-2">Please upload and analyze the MRI/CT scan before submitting the full patient record.</p>
            <a
              href="/upload"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-900 bg-amber-200 px-4 py-2 rounded-lg hover:bg-amber-300"
            >
              <i className="fas fa-cloud-upload-alt"></i>
              Go to Upload Page
            </a>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg space-y-8">
        
        {/* SECTION I */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold">Section I. Demographics & Contact Info</h2>
              <p className="text-sm text-gray-500">Capture patient and emergency contact details.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input" placeholder="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} required />
            <input className="input" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
            <input className="input" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            <input className="input" placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
            <input className="input" placeholder="Emergency Contact Name" name="emergency_name" value={formData.emergency_name} onChange={handleChange} />
            <input className="input" placeholder="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} />
            <input className="input" placeholder="Emergency Phone" name="emergency_phone" value={formData.emergency_phone} onChange={handleChange} />
            <select className="input" name="gender" value={formData.gender} onChange={handleChange}>
              <option>Male</option><option>Female</option><option>Other</option><option>Prefer Not to Say</option>
            </select>
            <input className="input" type="date" name="dob" value={formData.dob} onChange={handleChange} />
            <input className="input" type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
            <input className="input" placeholder="Patient ID/MRN" name="patient_id" value={formData.patient_id} onChange={handleChange} />
          </div>
        </section>

        {/* SECTION II */}
        <section>
          <h2 className="text-lg font-bold mb-3">Section II. Clinical History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea className="input md:col-span-2" rows={3} name="chief_complaint" placeholder="Chief Complaint(s)" value={formData.chief_complaint} onChange={handleChange} />
            <textarea className="input md:col-span-2" rows={4} name="symptom_description" placeholder="Detailed Symptom Description" value={formData.symptom_description} onChange={handleChange} />
            <select className="input" name="onset_duration" value={formData.onset_duration} onChange={handleChange}>
              <option value="">Onset & Duration</option>
              <option value="Acute">Acute</option>
              <option value="Subacute">Subacute</option>
              <option value="Chronic">Chronic</option>
              <option value="Rapidly Progressive">Rapidly Progressive</option>
              <option value="Stable">Stable</option>
            </select>
          </div>

          <div className="mt-3">
            <p className="font-semibold mb-2">Neurological Symptoms</p>
            <div className="flex flex-wrap gap-3">
              {["Seizures", "Vision Changes", "Weakness", "Cognitive Changes", "Speech Difficulties"].map((symptom) => (
                <label key={symptom} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    name="symptoms"
                    value={symptom}
                    checked={formData.symptoms.includes(symptom)}
                    onChange={handleCheckbox}
                  />
                  {symptom}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION III */}
        <section>
          <h2 className="text-lg font-bold mb-3">Section III. Medical Background</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold mb-2">Past Medical History</p>
              <div className="flex flex-wrap gap-3">
                {["Previous Cancers", "Neurological Disorders", "Immunosuppression"].map((item) => (
                  <label key={item} className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                    <input
                      type="checkbox"
                      name="history"
                      value={item}
                      checked={formData.history.includes(item)}
                      onChange={handleCheckbox}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
            <textarea className="input" rows={3} name="medications" placeholder="Current Medications & Allergies" value={formData.medications} onChange={handleChange} />
            <textarea className="input" rows={3} name="surgical_history" placeholder="Surgical History" value={formData.surgical_history} onChange={handleChange} />
            <textarea className="input" rows={3} name="neurological_exam" placeholder="Prior Neurological Exam Findings" value={formData.neurological_exam} onChange={handleChange} />
          </div>
        </section>

        {/* SECTION IV */}
        <section>
          <h2 className="text-lg font-bold mb-3">Section IV. Family & Social History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="input" name="family_history" value={formData.family_history} onChange={handleChange}>
              <option>No</option>
              <option>Yes</option>
            </select>
            <textarea className="input" rows={3} name="family_details" placeholder="If yes, provide details" value={formData.family_details} onChange={handleChange} />
            <select className="input" name="smoking_status" value={formData.smoking_status} onChange={handleChange}>
              <option>Current</option><option>Former</option><option>Never</option>
            </select>
            <select className="input" name="alcohol_use" value={formData.alcohol_use} onChange={handleChange}>
              <option>Daily</option><option>Weekly</option><option>Occasionally</option><option>Never</option>
            </select>
            <input className="input md:col-span-2" placeholder="Occupational Exposures" name="occupational_exposures" value={formData.occupational_exposures} onChange={handleChange} />
          </div>
        </section>

        {/* SECTION V */}
        <section>
          <h2 className="text-lg font-bold mb-3">Section V. Imaging & Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="input" name="modality" value={formData.modality} onChange={handleChange}>
              <option>MRI</option><option>CT</option><option>PET-CT</option>
            </select>
            <select className="input" name="sequence" value={formData.sequence} onChange={handleChange}>
              <option>T1</option><option>T1c</option><option>T2</option><option>FLAIR</option><option>DWI</option>
            </select>
          </div>
        </section>

        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
          {saving ? "Saving..." : "Submit Test Data"}
        </button>
      </form>

      {error && (
        <div className="mt-6 bg-red-50 border border-red-400 text-red-700 p-4 rounded-lg shadow">
          {error}
        </div>
      )}

      {message && (
        <div className="mt-6 bg-blue-50 border border-blue-400 text-blue-700 p-4 rounded-lg shadow">
          {message}
        </div>
      )}
    </div>
  );
};

export default TestForm;
