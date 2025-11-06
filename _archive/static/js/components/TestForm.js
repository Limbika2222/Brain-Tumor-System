import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const TestForm = () => {
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleCheckbox = (e) => {
        const { name, value, checked } = e.target;
        setFormData((prev) => {
            const prevValues = prev[name] || [];
            return {
                ...prev,
                [name]: checked
                    ? [...prevValues, value]
                    : prevValues.filter((v) => v !== value),
            };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/api/test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setMessage(data.message || "✅ Test data submitted successfully!");
    };
    return (_jsxs("div", { className: "p-8 bg-gray-50 min-h-screen", children: [_jsxs("header", { className: "flex justify-between items-center bg-white shadow p-4 mb-6 rounded-lg", children: [_jsx("div", { className: "text-xl font-bold text-blue-700", children: "\uD83E\uDDE0 ML-Based Brain Tumor Assistant" }), _jsxs("nav", { className: "flex gap-6", children: [_jsx("a", { href: "/", className: "hover:text-blue-600 font-medium", children: "Home" }), _jsx("a", { href: "/test", className: "text-blue-600 font-semibold border-b-2 border-blue-600", children: "Test Form" }), _jsx("a", { href: "/upload", className: "hover:text-blue-600 font-medium", children: "Upload" })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white p-8 shadow-lg rounded-lg space-y-8", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold mb-3", children: "Section I. Demographics and Contact Information" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("input", { className: "input", placeholder: "Full Name", name: "fullname", onChange: handleChange, required: true }), _jsx("input", { className: "input", placeholder: "Phone Number", name: "phone", onChange: handleChange, required: true }), _jsx("input", { className: "input", placeholder: "Email", name: "email", onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Address", name: "address", onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Emergency Contact Name", name: "emergency_name", onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Relationship", name: "relationship", onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Emergency Phone", name: "emergency_phone", onChange: handleChange }), _jsxs("select", { className: "input", name: "gender", onChange: handleChange, children: [_jsx("option", { children: "Male" }), _jsx("option", { children: "Female" }), _jsx("option", { children: "Other" }), _jsx("option", { children: "Prefer Not to Say" })] }), _jsx("input", { className: "input", type: "date", name: "dob", onChange: handleChange }), _jsx("input", { className: "input", type: "number", name: "age", placeholder: "Age", onChange: handleChange }), _jsx("input", { className: "input", placeholder: "Patient ID/MRN", name: "patient_id", onChange: handleChange })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold mb-3", children: "Section II. Clinical History" }), _jsx("textarea", { className: "input", name: "chief_complaint", placeholder: "Chief Complaint(s)", onChange: handleChange }), _jsx("textarea", { className: "input", name: "symptom_description", placeholder: "Detailed Symptom Description", onChange: handleChange }), _jsxs("div", { className: "mt-3", children: [_jsx("p", { className: "font-semibold", children: "Neurological Symptoms:" }), _jsx("div", { className: "flex flex-wrap gap-3 mt-2", children: ["Seizures", "Vision Changes", "Weakness", "Cognitive Changes", "Speech Difficulties"].map(symptom => (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", name: "symptoms", value: symptom, onChange: handleCheckbox }), " ", symptom] }, symptom))) })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-lg font-bold mb-3", children: "Section V. Core Test Data & Image Upload" }), _jsxs("select", { className: "input", name: "modality", onChange: handleChange, children: [_jsx("option", { children: "MRI" }), _jsx("option", { children: "CT" }), _jsx("option", { children: "PET-CT" })] }), _jsxs("a", { href: "/upload", className: "inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-3", children: [_jsx("i", { className: "fas fa-cloud-upload-alt" }), " Upload MRI/CT Image"] })] }), _jsx("button", { type: "submit", className: "bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700", children: "Submit Test Data" })] }), message && (_jsx("div", { className: "mt-6 bg-blue-50 border border-blue-400 text-blue-700 p-4 rounded-lg shadow", children: message }))] }));
};
export default TestForm;
