import React from "react";
import FileUpload from "./FileUpload";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Audio Transcriber</h1>
      </header>
      <FileUpload />
    </div>
  );
}

export default App;
