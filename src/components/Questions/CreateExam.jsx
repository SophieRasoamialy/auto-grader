import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CreateExam = () => {
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [level, setLevel] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      answer: "",
      allowDuplicateAnswers: true,
    },
  ]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answer: "", allowDuplicateAnswers: true },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleChangeQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez ajouter la logique pour enregistrer l'examen ici
    console.log({ subject, examDate, level, questions });
    // Rediriger vers la liste des sujets après la création
    navigate("/");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-[#f3fbfa] min-h-screen pl-64">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Créer un Examen
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="level"
            >
              Niveau
            </label>
            <input
              id="level"
              type="number"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Matière
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="examDate"
            >
              Date d'Examen
            </label>
            <input
              id="examDate"
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Questions
            </label>
            {questions.map((q, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  placeholder={`Question ${index + 1}`}
                  value={q.question}
                  onChange={(e) =>
                    handleChangeQuestion(index, "question", e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                />
                <textarea
                  placeholder={`Réponse ${index + 1}`}
                  value={q.answer}
                  onChange={(e) =>
                    handleChangeQuestion(index, "answer", e.target.value)
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                />

                <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">
                  Permettre les réponses dupliquées
                </label>
                <select
                  value={q.allowDuplicateAnswers}
                  onChange={(e) =>
                    handleChangeQuestion(
                      index,
                      "allowDuplicateAnswers",
                      e.target.value === "true"
                    )
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none focus:shadow-outline mt-2"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddQuestion}
              className="text-white bg-[#1f81a9] hover:bg-[#145c73] focus:outline-none focus:ring-4 focus:ring-[#1f81a9] font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2"
            >
              Ajouter une Question
            </button>
          </div>

          {/* Container for the submit button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-[#1f81a9] hover:bg-[#145c73] focus:outline-none focus:ring-4 focus:ring-[#1f81a9] font-medium rounded-full text-sm px-5 py-2.5 text-center"
            >
              Créer l'Examen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
