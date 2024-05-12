import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const User = ({user}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/profile`, {
        withCredentials: true,
      });
      console.log(response)
      setUserData(response.data.user);
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const updateDetails = () => {};
  return (
    <div className="text-white">
      <h1>User profile</h1>
      <h1>{userData.fullName}</h1>
      <h1>{userData.email}</h1>
      <br />
      <button onClick={updateDetails}>Edit detials</button>
    </div>
  );
};

export default User;
