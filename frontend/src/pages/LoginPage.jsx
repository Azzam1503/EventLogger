import React, {useContext} from "react";
import Login from "../components/Login";
import { Navigate} from "react-router-dom"
import UserContext from "../context/UserContext";

const LoginPage = () => {
  const {user} = useContext(UserContext);
  
  return (
    <div>
      {user === null ? <Login /> : <Navigate to={"/"} />}
    </div>
  );
};

export default LoginPage;
