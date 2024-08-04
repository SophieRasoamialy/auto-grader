import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import Sidebar from "../components/Sidebar";
import {
  FaArrowLeft,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaDownload,
} from "react-icons/fa";
import "./print.css";

const SubjectDetails = () => {
  const { id } = useParams();
  const [showAnswers, setShowAnswers] = useState(false);

  const subjects = [
    {
      id: 1,
      matiere: "Mathématiques",
      examDate: "2024-08-01",
      level: 1,
      questions: [
        { question: "Q1: Décrivez...", answer: "A1: La réponse est..." },
        { question: "Q2: Expliquez...", answer: "A2: La réponse est..." },
      ],
    },
    {
      id: 2,
      matiere: "Physique",
      examDate: "2024-08-05",
      level: 1,
      questions: [
        { question: "Q1: Décrivez...", answer: "A1: La réponse est..." },
        { question: "Q2: Expliquez...", answer: "A2: La réponse est..." },
      ],
    },
  ];

  const subject = subjects.find((subject) => subject.id === parseInt(id));

  if (!subject) {
    return <div>Sujet non trouvé</div>;
  }

  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Matière: ${subject.matiere}`, 10, 10);
    doc.text(
      `Date d'Examen: ${new Date(subject.examDate).toLocaleDateString()}`,
      10,
      20
    );
    doc.text(`Classe: Niveau ${subject.level}`, 10, 30);
    doc.text("Questions:", 10, 40);

    subject.questions.forEach((q, index) => {
      doc.text(`${index + 1}. ${q.question}`, 10, 50 + index * 10);
    });

    doc.save(`${subject.matiere}-questions.pdf`);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-[#f3fbfa] min-h-screen pl-64">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Détails du Sujet: {subject.matiere}
          </h1>
          <div className="space-x-2 flex">
            <Link
              to="/"
              className="bg-gray-500 text-white flex items-center hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-[#1f81a9] font-medium rounded-full text-sm px-5 py-3 text-center mb-2"
            >
              <FaArrowLeft className="mr-2" />
              Retour
            </Link>
            <button className="text-white bg-[#1f81a9] flex items-center hover:bg-[#145c73] focus:outline-none focus:ring-4 focus:ring-[#1f81a9] font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2">
              <FaEdit className="mr-2" />
              Modifier
            </button>
            <button
              onClick={toggleShowAnswers}
              className="text-white bg-[#1f81a9] flex items-center hover:bg-[#145c73] focus:outline-none focus:ring-4 focus:ring-[#1f81a9] font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
            >
              {showAnswers ? (
                <FaEyeSlash className="mr-2" />
              ) : (
                <FaEye className="mr-2" />
              )}
              {showAnswers ? "Masquer les réponses" : "Voir les réponses"}
            </button>
            <button
              onClick={downloadPDF}
              className="text-white bg-blue-500 flex items-center hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
            >
              <FaDownload className="mr-2" />
              Télécharger
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">Questions:</h2>
            <ul className="list-disc list-inside">
              {subject.questions.map((q, index) => (
                <li key={index} className="py-2">
                  {q.question}
                  {showAnswers && (
                    <div className="pl-4 text-gray-600">
                      Réponse: {q.answer}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section imprimable */}
        <div id="printable-section" className="hidden">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Matière: {subject.matiere}
            </h2>
            <p>
              Date d'Examen: {new Date(subject.examDate).toLocaleDateString()}
            </p>
            <p>Classe: Niveau {subject.level}</p>
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              Questions:
            </h2>
            <ul className="list-disc list-inside">
              {subject.questions.map((q, index) => (
                <li key={index} className="py-2">
                  {q.question}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
