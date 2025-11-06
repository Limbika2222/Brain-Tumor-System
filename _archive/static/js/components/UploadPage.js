import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [result, setResult] = useState(null);
    const [confidence, setConfidence] = useState(null);
    const [serverImageUrl, setServerImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // 👇 Show local preview before uploading
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setResult(null);
        setConfidence(null);
        setServerImageUrl(null);
        setError(null);
        if (selectedFile) {
            const preview = URL.createObjectURL(selectedFile);
            setPreviewUrl(preview);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select an image first!");
            return;
        }
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch("http://127.0.0.1:5000/api/upload", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error (${response.status}): ${errorText}`);
            }
            const data = await response.json();
            console.log("Response:", data);
            setResult(data.result);
            setConfidence(data.confidence);
            setServerImageUrl("http://127.0.0.1:5000" + data.image_url);
        }
        catch (err) {
            console.error("Upload error:", err);
            if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
                setError("Cannot connect to server. Please make sure Flask backend is running on http://127.0.0.1:5000");
            }
            else {
                setError("Upload failed: " + err.message);
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6", children: [_jsx("h1", { className: "text-3xl font-bold mb-6 text-gray-800", children: "\uD83E\uDDE0 Brain Tumor Detection" }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-white shadow-md rounded-2xl p-6 w-full max-w-md", children: [_jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "border border-gray-300 rounded-md p-2 w-full mb-4" }), previewUrl && (_jsx("img", { src: previewUrl, alt: "Preview", className: "w-64 h-64 object-cover rounded-xl shadow-md mx-auto mb-4" })), _jsx("button", { type: "submit", disabled: loading, className: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full transition", children: loading ? "Analyzing..." : "Analyze Image" })] }), error && _jsx("p", { className: "text-red-500 mt-4", children: error }), serverImageUrl && (_jsxs("div", { className: "mt-8 text-center", children: [_jsx("img", { src: serverImageUrl, alt: "Uploaded", className: "w-64 h-64 object-cover rounded-xl shadow-md mx-auto" }), result && (_jsxs("div", { className: "mt-4", children: [_jsxs("h2", { className: "text-xl font-semibold text-gray-700", children: ["Result: ", result] }), _jsxs("p", { className: "text-gray-600", children: ["Confidence: ", confidence?.toFixed(2), "%"] })] }))] }))] }));
};
export default UploadPage;
