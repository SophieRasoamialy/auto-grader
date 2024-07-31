import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const UploadCopy = () => {
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState("");
  const [session, setSession] = useState("");
  const [classe, setClasse] = useState("");
  const [matiere, setMatiere] = useState("");
  const [uploadCount, setUploadCount] = useState(0);

  const handleChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data.textLines.join("\n"));
      setUploadCount(files.length);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const handleSave = () => {
    console.log("Saving files with details:", { session, classe, matiere });
    // Add logic to save the details and uploaded files to your backend.
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex items-center justify-center min-h-screen w-full bg-[#f3fbfa] pl-64">
        <div className="bg-white rounded-lg px-12 pt-10 pb-12 relative shadow-xl w-full max-w-6xl leading-normal">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
            Uploader et Analyser les Copies d'Examen
          </h2>

          <div className="flex flex-col md:flex-row items-start justify-between space-y-8 md:space-y-0 md:space-x-8">
            {/* Left Side: Form Selections */}
            <div className="w-full md:w-1/2">
              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-3 text-lg"
                  htmlFor="session"
                >
                  Sélectionnez la session de l'examen
                </label>
                <select
                  id="session"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="block w-full p-3 border rounded-full shadow-lg focus:ring-[#1f81a9] focus:border-[#1f81a9]"
                >
                  <option value="">-- Sélectionnez la session --</option>
                  <option value="session1">Session 1</option>
                  <option value="session2">Session 2</option>
                  <option value="session3">Session 3</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-3 text-lg"
                  htmlFor="classe"
                >
                  Sélectionnez la classe
                </label>
                <select
                  id="classe"
                  value={classe}
                  onChange={(e) => setClasse(e.target.value)}
                  className="block w-full p-3 border rounded-full shadow-lg focus:ring-[#1f81a9] focus:border-[#1f81a9]"
                >
                  <option value="">-- Sélectionnez la classe --</option>
                  <option value="class1">Classe 1</option>
                  <option value="class2">Classe 2</option>
                  <option value="class3">Classe 3</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 mb-3 text-lg"
                  htmlFor="matiere"
                >
                  Sélectionnez la matière
                </label>
                <select
                  id="matiere"
                  value={matiere}
                  onChange={(e) => setMatiere(e.target.value)}
                  className="block w-full p-3 border rounded-full shadow-lg focus:ring-[#1f81a9] focus:border-[#1f81a9]"
                >
                  <option value="">-- Sélectionnez la matière --</option>
                  <option value="mathematics">Mathématiques</option>
                  <option value="physics">Physique</option>
                  <option value="chemistry">Chimie</option>
                </select>
              </div>
            </div>

            {/* Right Side: File Upload */}
            <div className="w-full md:w-1/2">
              <div className="mb-6">
                <label className="block text-gray-700 mb-3 text-lg">
                  Uploader les copies scannées
                </label>
                <input
                  type="file"
                  multiple
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-base rounded-full focus:ring-[#1f81a9] focus:border-[#1f81a9] block w-full pl-10 p-3 shadow-lg"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#1f81a9] text-white py-3 rounded-full hover:bg-[#145c73] transition duration-300 text-lg"
              >
                Upload et Analyser
              </button>

              {uploadCount > 0 && (
                <div className="mt-6 text-gray-700 text-lg">
                  <p>{uploadCount} fichier(s) uploadé(s).</p>
                </div>
              )}

              {result && (
                <div className="mt-8 bg-gray-50 p-6 border rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Résultats :
                  </h3>
                  <pre className="text-base text-gray-600">{result}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Center: Save Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleSave}
              className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 font-medium rounded-full text-lg px-8 py-3 text-center w-full md:w-1/2"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCopy;
