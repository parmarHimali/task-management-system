import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import TaskCard from "./TaskCard";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { userContext } from "./AppWrapper";

const HighTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthorized } = useContext(userContext);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/task/highTasks",
          { withCredentials: true }
        );
        const { tasks } = res.data;
        setTasks(tasks);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchTasks();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="all-tasks">
          <h3 className="heading">High Priority Tasks</h3>
          <div className="card-container">
            {tasks.length > 0 ? (
              [...tasks].reverse().map((task, idx) => {
                return <TaskCard task={task} setTasks={setTasks} key={idx} />;
              })
            ) : (
              <>
                <div className="create-first">
                  <h2>No High Priority Tasks</h2>
                  <a href="/">View all available tasks</a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HighTasks;
