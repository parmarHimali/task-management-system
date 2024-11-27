import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userContext } from "./AppWrapper";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(userContext);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/register",
        { name, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);
      setIsAuthorized(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      setIsAuthorized(false);
    }
  };

  return (
    <>
      <div className="form-container auth-register">
        <h2>Register a New Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">User Name:</label>
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
          <div className="auth-link">
            <p>Already have an account?</p>
            <Link to={"/login"}>Login</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
