import { useContext, useState } from "react";
import  UserContext  from"../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";


const useLogout = () => {
    const {setUser} = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    
    const lgout = async ({email, password}) =>{
        const success = handleInputErrors({email, password});

        if(!success) return;

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:3000/user/sign-in",
                {email, password}
            );

            if(response.error) throw new Error(response.error);
            const userObj = {
                email: response.data.email,
                fullName: response.data.fullName,
                id: response.data.id
            }
            localStorage.setItem("user", JSON.stringify(userObj));
            setUser(null);
        } catch (error) {
            toast.error(error.message);
            console.log("error in log", error);
        }finally{
            setLoading(false);
        }
    };

    return {loading, logout};
}

export default useSignin;

