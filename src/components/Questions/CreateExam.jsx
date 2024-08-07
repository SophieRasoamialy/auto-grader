import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Editor } from "@tinymce/tinymce-react";

const CreateExam = () => {
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [level, setLevel] = useState("");
  const [questions, setQuestions] = useState([
    {
      text: "",
      answer: "",
      answer_type: "texte",
      points: "",
      answer_duplicated: false,
    },
  ]);
  const [subjects, setSubjects] = useState([]);
  const [levels, setLevels] = useState([]);
  const navigate = useNavigate();

  // Fonction pour récupérer les matières
  const fetchSubjects = async () => {
    const token = Cookies.get("token");
    console.log("Token+++++++++++",token);
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:8000/matieres/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Inclusion du token dans les en-têtes de la requête
        },
      });
      setSubjects(response.data);
      console.log("Subject+++++++++++",response.data);
    } catch (error) {
      console.log("Error+++++++++++",error);
      console.error("Erreur lors de la récupération des matières :", error);
    }
  };

  // Fonction pour récupérer les niveaux
  const fetchLevels = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/classes");
      setLevels(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des niveaux :", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchLevels();
  }, []);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        answer: "",
        answer_type: "texte",
        points: "",
        answer_duplicated: false,
      },
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

  const handleEditorChange = (index, field, content) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = content;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/exams", {
        subject_id: subject,
        date: examDate,
        level,
        questions,
      });
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la création de l'examen :", error);
    }
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
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="level"
              >
                Niveau
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#1f81a9] focus:border-[#1f81a9] block w-full pl-10 p-2.5 shadow-lg"
              >
                <option value="">Sélectionnez un niveau</option>
                {levels.map((lvl) => (
                  <option key={lvl._id} value={lvl._id}>
                    {lvl.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Matière
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#1f81a9] focus:border-[#1f81a9] block w-full pl-10 p-2.5 shadow-lg"
            >
              <option value="">Sélectionnez une matière</option>
              {subjects.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
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
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#1f81a9] focus:border-[#1f81a9] block w-full pl-10 p-2.5 shadow-lg"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Questions
            </label>
            {questions.map((q, index) => (
              <div key={index} className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Texte de la question
                </label>
                <Editor
                  apiKey="vx9i16y2v638jfhhq9t242kvxkouxaxuo0wrvgxsg4786phi"
                  init={{
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    ai_request: (request, respondWith) =>
                      respondWith.string(() =>
                        Promise.reject("See docs to implement AI Assistant")
                      ),
                  }}
                  onEditorChange={(content) =>
                    handleEditorChange(index, "text", content)
                  }
                />

                <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
                  Réponse
                </label>
                <Editor
                  apiKey="vx9i16y2v638jfhhq9t242kvxkouxaxuo0wrvgxsg4786phi"
                  init={{
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                    tinycomments_mode: "embedded",
                    ai_request: (request, respondWith) =>
                      respondWith.string(() =>
                        Promise.reject("See docs to implement AI Assistant")
                      ),
                  }}
                  onEditorChange={(content) =>
                    handleEditorChange(index, "answer", content)
                  }
                />

                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Type de réponse
                  </label>
                  <select
                    value={q.answer_type}
                    onChange={(e) =>
                      handleChangeQuestion(index, "answer_type", e.target.value)
                    }
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#1f81a9] focus:border-[#1f81a9] block w-full pl-10 p-2.5 shadow-lg"
                  >
                    <option value="texte">Texte</option>
                    <option value="QCM">QCM</option>
                    <option value="vrai ou faux">Vrai ou Faux</option>
                    <option value="compléter">Compléter</option>
                    <option value="conception">Conception</option>
                  </select>
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    value={q.points}
                    onChange={(e) =>
                      handleChangeQuestion(index, "points", e.target.value)
                    }
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#1f81a9] focus:border-[#1f81a9] block w-full pl-10 p-2.5 shadow-lg"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Permettre les réponses dupliquées
                  </label>
                  <select
                    value={q.answer_duplicated}
                    onChange={(e) =>
                      handleChangeQuestion(
                        index,
                        "answer_duplicated",
                        e.target.value === "true"
                      )
                    }
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#1f81a9] focus:border-[#1f81a9] block w-full pl-10 p-2.5 shadow-lg"
                  >
                    <option value="true">Oui</option>
                    <option value="false">Non</option>
                  </select>
                </div>
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
