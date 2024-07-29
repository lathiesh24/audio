import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("audio_file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/transcribe",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data && response.data.status === "success") {
        setTranscript(response.data.text);
      } else {
        setTranscript("Failed to transcribe audio.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setTranscript("Error uploading file.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <input
        type="file"
        onChange={handleFileChange}
        accept="audio/*"
        className="mb-4 p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Upload and Transcribe
      </button>
      {transcript && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-inner">
          <h2 className="text-2xl font-semibold mb-2">Transcription Result:</h2>
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
