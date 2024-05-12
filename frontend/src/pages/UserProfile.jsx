import React from "react";
import User from "../components/User";
import axios from "axios";

const UserProfile = ({user}) => {
  const events = async () =>{
    try {
      const response = await axios.get("http://localhost:3000/user/events", {
        withCredentials: true
      });
    } catch (error) {
    }
  }
  return (
    <div className="text-white">
      <User user = {user} />
      <button onClick={events}>Click Me</button>
    </div>
  );
};

export default UserProfile;
