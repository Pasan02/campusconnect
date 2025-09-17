import React, { useState, useEffect } from "react";
import feather from "feather-icons";
import "./report.css";

const Report = () => {
  const [isFound, setIsFound] = useState(true);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    feather.replace();
  }, [files]);

  const handleFoundClick = () => setIsFound(true);
  const handleLostClick = () => setIsFound(false);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files || e.dataTransfer?.files || []);
    setFiles(newFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-indigo-500", "bg-indigo-50");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("border-indigo-500", "bg-indigo-50");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-500", "bg-indigo-50");
    handleFileChange(e);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="gradient-bg text-white py-4 px-6">
            <h2 className="text-2xl font-bold">Report Lost or Found Item</h2>
          </div>

          {/* --- FORM --- */}
          <form className="p-6">
            {/* Found / Lost Switch */}
            <div className="flex items-center space-x-4 mb-6">
              <button
                type="button"
                onClick={handleFoundClick}
                className={`flex-1 py-2 px-4 rounded-lg font-medium border-2 ${
                  isFound
                    ? "bg-green-100 text-green-800 border-green-300"
                    : "bg-gray-100 text-gray-800 border-transparent"
                }`}
              >
                <i data-feather="check-circle" className="inline mr-2"></i> Found
              </button>
              <button
                type="button"
                onClick={handleLostClick}
                className={`flex-1 py-2 px-4 rounded-lg font-medium border-2 ${
                  !isFound
                    ? "bg-red-100 text-red-800 border-red-300"
                    : "bg-gray-100 text-gray-800 border-transparent"
                }`}
              >
                <i data-feather="alert-circle" className="inline mr-2"></i> Lost
              </button>
            </div>

            {/* Item Name */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Item Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Black backpack, Silver laptop"
              />
            </div>

            {/* File Upload */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                Upload Photos
              </label>
              <div
                className="file-upload rounded-lg p-8 text-center cursor-pointer border border-gray-300"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("item-photos").click()}
              >
                <i data-feather="upload" className="w-12 h-12 text-gray-400 mb-2"></i>
                <p className="text-gray-600">Drag & drop or click to upload</p>
              </div>
              <input
                type="file"
                id="item-photos"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />

              {/* Preview */}
              <div className={`mt-4 grid grid-cols-3 gap-2 ${files.length ? "" : "hidden"}`}>
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="h-32 w-full object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      onClick={() => removeFile(index)}
                    >
                      <i data-feather="x" className="w-3 h-3"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="gradient-bg text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;
