import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/profile", {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const updateDetails = () => {};
  return (
    <div>
      <img
        src={user.imageUrl}
        alt=""
        width={200}
        height={200}
        style={{ border: "1px solid black" }}
      />
      <h1>User profile</h1>
      <h1></h1>
      <h1>{user.fullName}</h1>
      <h1>{user.email}</h1>
      <br />
      <button onClick={updateDetails}>Edit detials</button>
    </div>
  );
};

export default User;
