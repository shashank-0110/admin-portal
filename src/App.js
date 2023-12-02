import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import AllTasks from "./pages/AllTasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/LogIn" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AllTasks />} />
      </Routes>
    </div>
  );
};

export default App;
