import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SubjectList = () => {
  const levels = [
    { id: 1, name: "Niveau 1" },
    { id: 2, name: "Niveau 2" },
    { id: 3, name: "Niveau 3" },
  ];

  const subjects = [
    { id: 1, matiere: "Mathématiques", examDate: "2024-08-01", level: 1 },
    { id: 2, matiere: "Physique", examDate: "2024-08-05", level: 1 },
    { id: 3, matiere: "Chimie", examDate: "2024-09-10", level: 2 },
  ];

  const [selectedLevel, setSelectedLevel] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedLevelName, setSelectedLevelName] = useState("");


  useEffect(() => {
    if (selectedLevel) {
      const futureSubjects = subjects.filter(
        (subject) =>
          subject.level === parseInt(selectedLevel) &&
          new Date(subject.examDate) >= new Date()
      );
      setFilteredSubjects(futureSubjects);
      const level = levels.find(level => level.id === parseInt(selectedLevel));
      setSelectedLevelName(level ? level.name : "");
    } else {
      setFilteredSubjects([]);
      setSelectedLevelName("");
    }
  }, [selectedLevel]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 min-h-screen pl-64">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Liste des Sujets</h1>
          <select
            id="level-select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-[#1f81a9] focus:border-[#1f81a9] block  pl-10 p-2.5 scale-105 shadow-lg"
          >
            <option value="">-- Sélectionnez un niveau --</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
            {selectedLevelName ? `Sujets d'Examens Pour ${selectedLevelName}` : "Sujets d'Examens"}
            </h2>
            <div>
              <button className="text-white bg-[#1f81a9] hover:bg-[#145c73] focus:outline-none focus:ring-4 focus:ring-[#1f81a9] font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 w-full">
                Nouvel Examen
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Matière</th>
                  <th className="py-3 px-6 text-left">Date d'Examen</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subject) => (
                    <tr
                      key={subject.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {subject.matiere}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {new Date(subject.examDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-6 text-left">
                        <Link
                          to={`/sujet/${subject.id}`}
                          className=" text-[#1f81a9] hover:text-[#145c73] hover:underline"
                        >
                          Voir les détails
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="py-3 px-6 text-center text-gray-500"
                    >
                      Aucun sujet d'examen futur trouvé pour ce niveau.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Archives des Sujets d'Examens
            </h2>
            <Link
              to="/archives"
              className="text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 "
            >
              Voir les Archives
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
