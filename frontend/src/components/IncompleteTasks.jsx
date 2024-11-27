import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { userContext } from "./AppWrapper";

const IncompleteTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();
  const { isAuthorized } = useContext(userContext);
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/task/incompleteTasks",
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
          <h3 className="heading">Incompleted Tasks List</h3>
          <div className="card-container">
            {tasks.length > 0 ? (
              [...tasks].reverse().map((task, idx) => {
                return (
                  <TaskCard
                    task={task}
                    setTasks={setTasks}
                    tasks={tasks}
                    key={idx}
                  />
                );
              })
            ) : (
              <>
                <div className="create-first">
                  <h2>No InComplete Tasks</h2>
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

export default IncompleteTasks;
