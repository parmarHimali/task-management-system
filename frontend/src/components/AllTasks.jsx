import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";
import Spinner from "./Spinner";
import { userContext } from "./AppWrapper";
import { useNavigate } from "react-router-dom";

const AllTasks = () => {
  const { isAuthorized } = useContext(userContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigateTo = useNavigate();
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/task/allTasks", {
          withCredentials: true,
        });
        setTasks(res.data.tasks || []);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch tasks";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized) {
      fetchTasks();
    }
  }, [isAuthorized]);

  const filteredTasks = tasks.filter((task) =>
    task?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="all-tasks">
          <h3 className="heading">All Tasks List</h3>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search tasks"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="card-container">
            {filteredTasks.length > 0 ? (
              [...filteredTasks].reverse().map((task, idx) => {
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
                  <h2>Create Your First Task</h2>
                  <a href="/create">Create</a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllTasks;
