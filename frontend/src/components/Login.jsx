import React, { useContext, useEffect, useState } from "react";
import { userContext } from "./AppWrapper";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
        "http://localhost:4000/api/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(data.message);
      setIsAuthorized(true);
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
      <div className="form-container auth-login">
        <h2>Login to Account</h2>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
          </div>
          <div className="auth-link">
            <p>Don't have an account? </p>
            <Link to={"/register"}>Register</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
