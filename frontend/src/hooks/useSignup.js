import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import baseURL from "../config";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const signup = async ({fullName, email, password}) =>{
        const success = handleInputErrors({fullName, email, password});

        if(!success) return;

        try {
            setLoading(true);
            const response = await axios.post(
                `${baseURL}/user/register`,
                {fullName, email, password},
                {
                  withCredentials: true,
                }
            );

            if(response.error) throw new Error(response.error);
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
            console.log("error in log", error);
        }finally{
            setLoading(false);
        }
    };

    return {loading, signup}
}

export default useSignup;

function handleInputErrors({fullName, email ,password}){
    if(!fullName || !email  || !password ){
      toast.error('Please fill in all fields')
      return false;
    }
    return true;
};

