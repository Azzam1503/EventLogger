import React from "react";
import Login from "../components/Login";

const LoginPage = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <div>
      <Login  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    </div>
  );
};

export default LoginPage;
