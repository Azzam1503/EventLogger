import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupFormData, setSignUpFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState("");

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSignUpFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avatar", image);
      formData.append("fullName", signupFormData.fullName);
      formData.append("email", signupFormData.email);
      formData.append("password", signupFormData.password);
      const response = await axios.post(
        "http://localhost:3000/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="avatar">Profile Picture</label>
        <input
          type="file"
          name="image"
          id="avatar"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          required
          placeholder="full name"
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          required
          placeholder="email"
          onChange={handleInputChange}
        />
        <label htmlFor="password">Passpassword</label>
        <input
          type="text"
          name="password"
          id="password"
          required
          placeholder="password"
          onChange={handleInputChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
