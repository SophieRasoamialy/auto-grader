import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

// Liste des URL des images
const imageUrls = [
  "https://images.unsplash.com/photo-1528459199957-0ff28496a7f6?q=80&w=1943&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1528459135417-42dfc609ce87?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1543769657-fcf1236421bc?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const ListCopy = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate(); 

  const handleClick = (url) => {
    setSelectedImage(url);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleUpload = () => {
    navigate("/upload-copy");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen p-8 bg-[#f3fbfa] pl-72 w-full ">
        <button
          onClick={handleUpload}
          className="absolute top-4 right-4 text-white bg-[#1f81a9] hover:bg-[#145c73] focus:outline-none focus:ring-4 focus:ring-[#1f81a9] font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
        >
          <span className="material-icons">upload</span> {/* Remplacez par une icône de votre choix */}
        </button>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Liste des Feuilles de Copie</h1>
          <div className="text-lg mb-4">
            <p><strong>Session de l'examen :</strong> Session de 2024</p>
            <p><strong>Matière :</strong> Mathématiques</p>
            <p><strong>Classe :</strong> Terminale S</p>
          </div>
        </div>
        <div className="flex gap-6">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative bg-white shadow-md w-60 h-80 rounded-lg overflow-hidden"
            >
              <div
                className="relative w-60 h-80 overflow-hidden cursor-pointer"
                onClick={() => handleClick(url)}
              >
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal pour afficher l'image en grand */}
        {selectedImage && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-full">
              <div className="relative w-full h-full">
                <img
                  src={selectedImage}
                  alt="Grand affichage"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-white" />
              </div>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-800 text-3xl font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCopy;
