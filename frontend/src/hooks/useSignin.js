import { useContext, useState } from "react";
import  UserContext  from"../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import baseURL from "../config";

const useSignin = () => {
    const {setUser} = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const signin = async ({email, password}) =>{
        const success = handleInputErrors({email, password});

        if(!success) return;

        try {
            setLoading(true);
            const response = await axios.post(
                `${baseURL}/user/sign-in`,
                {email, password},
                {
                    withCredentials: true
                }
            );

            if(response.error) throw new Error(response.error);
            const userObj = {
                email: response.data.email,
                fullName: response.data.fullName,
                id: response.data.id
            }
            localStorage.setItem("user", JSON.stringify(userObj));
            setUser(userObj);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            console.log("error in log", error);
        }finally{
            setLoading(false);
        }
    };

    return {loading, signin}
}

export default useSignin;

function handleInputErrors({email, password}){
    if(!email  || !password ){
      toast.error('Please fill in all fields')
      return false;
    }
    return true;
};

