import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const inputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevForm) => ({ ...prevForm, [name]: value }));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/check-auth",
        {
          withCredentials: true,
        }
      );
      if (response.statusText === "OK") {
        navigate("/events");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/sign-in",
        loginDetails,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.statusText == "OK") {
        navigate("/events");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="email"
          required
          onChange={inputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="password"
          required
          onChange={inputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
