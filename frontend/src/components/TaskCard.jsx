import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPencilSquare } from "react-icons/bs";
import { IoFlag } from "react-icons/io5";
import { MdDelete, MdOutlineDoneAll, MdRemoveDone } from "react-icons/md";
import UpdateForm from "./UpdateForm";
import { useNavigate } from "react-router-dom";
import { userContext } from "./AppWrapper";

const TaskCard = ({ task, setTasks }) => {
  const [completed, setCompleted] = useState(task.completed);
  const [isForm, setIsForm] = useState(false);
  const { isAuthorized } = useContext(userContext);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);
  const handleDelete = async (taskID) => {
    await axios
      .delete(`http://localhost:4000/api/task/deleteTask/${taskID}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTasks((prev) => prev.filter((task) => taskID !== task._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleComplete = async (taskID) => {
    const updatedStatus = !completed;
    // console.log(`Updating task ${taskID} to ${updatedStatus}`);
    await axios
      .put(
        `http://localhost:4000/api/task/updateComplete/${taskID}`,
        { completed: updatedStatus },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log("API response:", res.data);
        toast.success(res.data.message);
        setCompleted(updatedStatus);
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === taskID ? { ...t, completed: updatedStatus } : t
          )
        );
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const openForm = () => {
    setIsForm(true);
  };
  return (
    <>
      {isForm && (
        <UpdateForm setTasks={setTasks} task={task} setIsForm={setIsForm} />
      )}
      <div className="task-card">
        <div className="card-part1">
          <div className="task-title">
            {task.title}{" "}
            <span>
              <MdDelete
                onClick={() => handleDelete(task._id)}
                style={{
                  fontSize: "1.2rem",
                  position: "absolute",
                  right: "10px",
                }}
              />
            </span>
          </div>
          <div className="task-dec">{task.description}</div>
        </div>
        <div className="card-part2">
          <div className="card-sub">
            {/* complete-not */}
            <span
              className="check-complete"
              onClick={() => handleComplete(task._id)}
            >
              {task.completed ? <MdOutlineDoneAll /> : <MdRemoveDone />}
            </span>

            {/* update */}
            <span onClick={() => openForm(task)}>
              <BsPencilSquare />
            </span>

            {/* priority */}
            <span style={{ fontSize: "1.2rem" }}>
              {task.priority == "High" && <IoFlag style={{ color: "red" }} />}
              {task.priority == "Meduim" && (
                <IoFlag style={{ color: "yellow" }} />
              )}
              {task.priority == "Low" && <IoFlag style={{ color: "gray" }} />}
            </span>
          </div>
          {/* duedate */}
          <span style={{ color: "#9c9b9b", fontSize: "0.8rem" }}>
            Due Date:{" "}
            {task.dueDate.split("T")[0].split("-")[2] +
              "-" +
              task.dueDate.split("T")[0].split("-")[1] +
              "-" +
              task.dueDate.split("T")[0].split("-")[0]}
          </span>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
