import React, { useState } from "react";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [serverImageUrl, setServerImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64Image = reader.result as string;
          
          // Get Cloud Function URL
          // TODO: Update this URL after deploying the function
          const functionUrl = import.meta.env.VITE_CLOUD_FUNCTION_URL || 
            'https://us-central1-brain-tumor-system-d402a.cloudfunctions.net/predict_tumor';
          
          const response = await fetch(functionUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              image: base64Image,
              filename: file.name,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: await response.text() }));
            throw new Error(errorData.error || `Server error (${response.status})`);
          }

          const data = await response.json();
          console.log("Response:", data);

          setResult(data.result);
          setConfidence(data.confidence);
          setServerImageUrl(data.image_url || previewUrl);
        } catch (err: any) {
          console.error("Upload error:", err);
          setError("Upload failed: " + (err.message || "Unknown error"));
        } finally {
          setLoading(false);
        }
      };
      
      reader.onerror = () => {
        setError("Failed to read image file");
        setLoading(false);
      };
      
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error("Error:", err);
      setError("Upload failed: " + err.message);
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
