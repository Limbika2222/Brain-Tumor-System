import React, { useState } from "react";

const TestForm: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData((prev: any) => {
      const prevValues = prev[name] || [];
      return {
        ...prev,
        [name]: checked
          ? [...prevValues, value]
          : prevValues.filter((v: string) => v !== value),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/api/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    setMessage(data.message || "✅ Test data submitted successfully!");
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

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg space-y-8">
        
        {/* SECTION I */}
        <section>
          <h2 className="text-lg font-bold mb-3">Section I. Demographics and Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input className="input" placeholder="Full Name" name="fullname" onChange={handleChange} required />
            <input className="input" placeholder="Phone Number" name="phone" onChange={handleChange} required />
            <input className="input" placeholder="Email" name="email" onChange={handleChange} />
            <input className="input" placeholder="Address" name="address" onChange={handleChange} />
            <input className="input" placeholder="Emergency Contact Name" name="emergency_name" onChange={handleChange} />
            <input className="input" placeholder="Relationship" name="relationship" onChange={handleChange} />
            <input className="input" placeholder="Emergency Phone" name="emergency_phone" onChange={handleChange} />
            <select className="input" name="gender" onChange={handleChange}>
              <option>Male</option><option>Female</option><option>Other</option><option>Prefer Not to Say</option>
            </select>
            <input className="input" type="date" name="dob" onChange={handleChange} />
            <input className="input" type="number" name="age" placeholder="Age" onChange={handleChange} />
            <input className="input" placeholder="Patient ID/MRN" name="patient_id" onChange={handleChange} />
          </div>
        </section>

        {/* SECTION II */}
        <section>
          <h2 className="text-lg font-bold mb-3">Section II. Clinical History</h2>
          <textarea className="input" name="chief_complaint" placeholder="Chief Complaint(s)" onChange={handleChange} />
          <textarea className="input" name="symptom_description" placeholder="Detailed Symptom Description" onChange={handleChange} />

          <div className="mt-3">
            <p className="font-semibold">Neurological Symptoms:</p>
            <div className="flex flex-wrap gap-3 mt-2">
              {["Seizures", "Vision Changes", "Weakness", "Cognitive Changes", "Speech Difficulties"].map(symptom => (
                <label key={symptom} className="flex items-center gap-2">
                  <input type="checkbox" name="symptoms" value={symptom} onChange={handleCheckbox} /> {symptom}
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION V (shortened) */}
        <section>
          <h2 className="text-lg font-bold mb-3">Section V. Core Test Data & Image Upload</h2>
          <select className="input" name="modality" onChange={handleChange}>
            <option>MRI</option><option>CT</option><option>PET-CT</option>
          </select>

          <a href="/upload" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-3">
            <i className="fas fa-cloud-upload-alt"></i> Upload MRI/CT Image
          </a>
        </section>

        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
          Submit Test Data
        </button>
      </form>

      {message && (
        <div className="mt-6 bg-blue-50 border border-blue-400 text-blue-700 p-4 rounded-lg shadow">
          {message}
        </div>
      )}
    </div>
  );
};

export default TestForm;
