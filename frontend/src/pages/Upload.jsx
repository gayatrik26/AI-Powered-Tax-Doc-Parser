import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Player } from "@lottiefiles/react-lottie-player";
import ExtractedData from "../components/ExtractedData";
import blobAnimation from "../assets/blob.json"; // ✅ Import Lottie animation

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setResponseData(null);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("⚠️ Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    setUploadStatus("");
    setResponseData(null);

    try {
      const response = await fetch("http://localhost:8000/upload-pdf/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      if (result.compliance_error) {
        setUploadStatus(`⚠️ Compliance Issue: ${result.compliance_error}`);
      } else {
        setUploadStatus("✅ File uploaded successfully!");
        setResponseData(result);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus(`❌ ${error.message || "Network error. Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadJSON = () => {
    if (!responseData) return;

    const dataStr = JSON.stringify(responseData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text) => {
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Copy failed", err));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 relative overflow-hidden">
      {/* Animated Blob Background */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <Player
          autoplay
          loop
          src={blobAnimation}
          className="w-[80%] h-[80%] md:w-[60%] md:h-[60%] opacity-40"
        />
      </div>

      <h1 className="text-4xl font-extrabold mb-6 text-blue-400 relative z-10">
        Upload Your Tax Document
      </h1>

      {/* Upload Box with Glassmorphism & Animation Background */}
      <div className="relative w-96 bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl text-center border border-gray-500 z-10">
        <label className="block cursor-pointer">
          <input type="file" className="hidden" onChange={handleFileChange} />
          <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-400 transition-all">
            <FiUploadCloud className="text-4xl text-gray-300" />
            <p className="mt-2 text-gray-200">
              {selectedFile ? selectedFile.name : "Click to choose a file"}
            </p>
          </div>
        </label>

        <button
          className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-all ${
            loading
              ? "bg-blue-500 bg-opacity-50 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {uploadStatus && <p className="mt-4 text-gray-300">{uploadStatus}</p>}
      </div>

      <ExtractedData
        responseData={responseData}
        copyToClipboard={copyToClipboard}
        handleDownloadJSON={handleDownloadJSON}
      />
    </div>
  );
};

export default Upload;
