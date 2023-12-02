import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import "../pages/Login.css";
const Dashboard = () => {
  const todos = useSelector((state) => state.todo);
  const navigate = useNavigate();
  const allTasks = () => {
    navigate("/AllTasks");
  };

  return (
    <div>
      <Navbar />
      <TodoForm />
      <h4>Recently added tasks</h4>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <button onClick={allTasks}>View all tasks</button>
    </div>
  );
};

export default Dashboard;
