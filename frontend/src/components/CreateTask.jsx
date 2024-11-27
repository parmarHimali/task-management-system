import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userContext } from "./AppWrapper";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const { isAuthorized } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);
  const submitHandle = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:4000/api/task/createTask",
        {
          title,
          description,
          priority,
          dueDate,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTitle("");
        setDueDate("");
        setPriority("Low");
        setDescription("");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="form-container">
      <h2>Create New Task</h2>
      <form onSubmit={submitHandle}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            cols={42}
          />
        </div>
        <div>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Meduim">Meduim</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
