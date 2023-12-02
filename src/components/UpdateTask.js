import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../pages/Login.css";

export default function Update({ data, updateState, setUpdatestate }) {
  const navigate = useNavigate();
  let location = useLocation();

  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [role, setRole] = useState(data.role);

  const UpdateTask = () => {
    console.log("first");
    if (!name) {
      window.alert("Incomplete Details");
      return;
    }

    const payload = {};
    payload.name = name;
    payload.email = email;
    payload.role = role;

    axios.put(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json/${location.state.payload}`,
      payload
    );

    alert("Hello! Data added Successfully");
  };

  const editUpdate = () => {
    setUpdatestate(-1);
    console.log("first");
  };

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>
        <input
          type="text"
          placeholder="Task Name"
          onChange={(e) => setName(e.target.value)}
          defaultValue={data.name}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={data.email}
        />
      </td>
      <td>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Status</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
        </select>
      </td>
      <td>
        <button
          type="submit"
          className="edit"
          onClick={() => {
            UpdateTask();
            editUpdate();
          }}
        >
          UPDATE
        </button>
      </td>
    </tr>
  );
}
