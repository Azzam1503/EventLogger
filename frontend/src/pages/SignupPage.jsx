import React, {useContext} from "react";
import Signup from "../components/Signup";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";


const SignupPage = () => {
  const {user} = useContext(UserContext);
  
  return (
    <div>
        {user === null ? <Signup /> : <Navigate to={"/"} />}
    </div>
  );
};

export default SignupPage;
