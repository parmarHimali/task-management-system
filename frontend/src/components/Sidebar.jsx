import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./AppWrapper";

const Sidebar = () => {
  const { isAuthorized, setIsAuthorized } = useContext(userContext);
  const navigate = useNavigate();
  if (!isAuthorized) return null;
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };
  return (
    <>
      <div className="sidebar">
        <h3>Task Management System</h3>
        <hr />
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/create">Create Task</Link>
          </li>
          <li>
            <Link to="/">All Tasks</Link>
          </li>
          <li>
            <Link to="/completed">Completed Tasks</Link>
          </li>
          <li>
            <Link to="/incomplete">Incomplete Tasks</Link>
          </li>
          <li>
            <Link to="/high">Important Tasks</Link>
          </li>
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
