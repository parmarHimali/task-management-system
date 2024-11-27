import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";
import Spinner from "./Spinner";
import { userContext } from "./AppWrapper";
import { useNavigate } from "react-router-dom";

const CompletedTasks = () => {
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
          "http://localhost:4000/api/task/completedTasks",
          {
            withCredentials: true,
          }
        );
        const { tasks } = res.data;
        setTasks(tasks);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
          <h3 className="heading">Completed Tasks List</h3>
          <div className="card-container">
            {tasks.length > 0 ? (
              [...tasks].reverse().map((task, idx) => {
                return <TaskCard task={task} setTasks={setTasks} key={idx} />;
              })
            ) : (
              <>
                <div className="create-first">
                  <h2>No Completed Tasks</h2>
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

export default CompletedTasks;
