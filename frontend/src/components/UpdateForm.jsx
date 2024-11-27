import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgCloseR } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { userContext } from "./AppWrapper";

const UpdateForm = ({ setTasks, task, setIsForm }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [completed, setCompleted] = useState(task.completed);
  const { isAuthorized } = useContext(userContext);
  const closeForm = () => {
    setIsForm(false);
  };
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);
  const handleSubmit = async (e, taskID) => {
    e.preventDefault();
    console.log(title, description, priority, dueDate, completed);

    try {
      const res = await axios.put(
        `http://localhost:4000/api/task/updateTask/${taskID}`,
        {
          title,
          description,
          priority,
          dueDate,
          completed,
        },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      closeForm();
      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskID
            ? { ...t, title, description, priority, dueDate, completed }
            : t
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error updating dataa", error);
    }
  };

  return (
    <div className="form-update-container">
      <form onSubmit={(e) => handleSubmit(e, task._id)}>
        <span className="close-btn" onClick={closeForm}>
          <CgCloseR />
        </span>
        <h2 style={{ textAlign: "center" }}>Update Task</h2>
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
            value={dueDate.split("T")[0]}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="completed">Completed?</label>
          <select
            id="completed"
            value={completed}
            onChange={(e) => setCompleted(e.target.value === "true")}
            //e.target.value === "true"-->if value true then return/set "true" otherwise return/set "false"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="btn-container">
          <button type="submit">Update</button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
