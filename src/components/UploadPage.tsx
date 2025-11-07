import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [serverImageUrl, setServerImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 👇 Show local preview before uploading
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
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

      const absoluteImageUrl = "http://127.0.0.1:5000" + data.image_url;

      setResult(data.result);
      setConfidence(data.confidence);
      setServerImageUrl(absoluteImageUrl);

      // Redirect back to the test page with prediction data
      navigate("/test", {
        state: {
          uploadResult: {
            result: data.result,
            confidence: data.confidence,
            imageUrl: absoluteImageUrl,
          },
        },
      });
    } catch (err: any) {
      console.error("Upload error:", err);
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        setError("Cannot connect to server. Please make sure Flask backend is running on http://127.0.0.1:5000");
      } else {
        setError("Upload failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        🧠 Brain Tumor Detection
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-64 h-64 object-cover rounded-xl shadow-md mx-auto mb-4"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full transition"
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {serverImageUrl && (
        <div className="mt-8 text-center">
          <img
            src={serverImageUrl}
            alt="Uploaded"
            className="w-64 h-64 object-cover rounded-xl shadow-md mx-auto"
          />
          {result && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Result: {result}
              </h2>
              <p className="text-gray-600">
                Confidence: {confidence?.toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
