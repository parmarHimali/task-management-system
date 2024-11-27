import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { IoFlag } from "react-icons/io5";
import { MdPlaylistAddCheck, MdPlaylistRemove } from "react-icons/md";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { userContext } from "./AppWrapper";

const Dashboard = () => {
  const [all, setAll] = useState(0);
  const [comp, setComp] = useState(0);
  const [inComp, setInComp] = useState(0);
  const [high, setHigh] = useState(0);
  const [meduim, setMeduim] = useState(0);
  const [low, setLow] = useState(0);
  const [loading, setLoading] = useState(true);
  const { isAuthorized } = useContext(userContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAll = await axios.get(
          "http://localhost:4000/api/task/allTasks",
          {
            withCredentials: true,
          }
        );
        setAll(resAll.data.tasks);

        const resComp = await axios.get(
          "http://localhost:4000/api/task/completedTasks",
          {
            withCredentials: true,
          }
        );
        setComp(resComp.data.tasks);

        const resInComp = await axios.get(
          "http://localhost:4000/api/task/incompleteTasks",
          {
            withCredentials: true,
          }
        );
        setInComp(resInComp.data.tasks);

        const resHigh = await axios.get(
          "http://localhost:4000/api/task/highTasks",
          {
            withCredentials: true,
          }
        );
        setHigh(resHigh.data.tasks);

        const resMeduim = await axios.get(
          "http://localhost:4000/api/task/meduimTasks",
          {
            withCredentials: true,
          }
        );
        setMeduim(resMeduim.data.tasks);

        const resLow = await axios.get(
          "http://localhost:4000/api/task/lowTasks",
          {
            withCredentials: true,
          }
        );
        setLow(resLow.data.tasks);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <div className="card-container">
            <div className="card" onClick={() => navigate("/")}>
              <FaList style={{ color: "#c0c0c0" }} />
              <h3>Total Tasks</h3>
              <h1>{all.length}</h1>
            </div>
            <div className="card" onClick={() => navigate("/completed")}>
              <MdPlaylistAddCheck
                style={{ fontSize: "1.5rem", color: "#c0c0c0" }}
              />
              <h3>Total Completed Tasks</h3>
              <h1>{comp.length}</h1>
            </div>
            <div className="card" onClick={() => navigate("/incomplete")}>
              <MdPlaylistRemove
                style={{ fontSize: "1.5rem", color: "#c0c0c0" }}
              />
              <h3>Total InComplete Tasks</h3>
              <h1>{inComp.length}</h1>
            </div>
            <div className="card" onClick={() => navigate("/high")}>
              <IoFlag
                style={{ fontSize: "1.3rem", color: "red", opacity: "0.7" }}
              />
              <h3>High Priority Tasks</h3>
              <h1>{high.length}</h1>
            </div>
            <div className="card">
              <IoFlag
                style={{ fontSize: "1.3rem", color: "yellow", opacity: "0.7" }}
              />
              <h3>Meduim Priority Tasks</h3>
              <h1>{meduim.length}</h1>
            </div>
            <div className="card">
              <IoFlag style={{ fontSize: "1.3rem", color: "gray" }} />
              <h3>Low Priority Tasks</h3>
              <h1>{low.length}</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
