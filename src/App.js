// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import ResetPasswordPage from "./components/Auth/ResetPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import SubjectList from "./components/Questions/SubjectList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/subject-list" element={<SubjectList />} />
      </Routes>
    </Router>
  );
};

export default App;
