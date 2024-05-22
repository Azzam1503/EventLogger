import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Images from "../assets/images/playimges.jpg"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import fromeImage from '../assets/images/games22.jpg'

const Login = ({isLoggedIn, setIsLoggedIn}) => {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false)

  const inputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevForm) => ({ ...prevForm, [name]: value }));
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/sign-in",
        loginDetails,
        {
          withCredentials: true,
        }
      );

      if(response.status === 200){
        setIsLoggedIn(true);
        navigate("/");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-11/12 max-w-maxContent flex justify-between mx-auto py-14 gap-x-12">

      <form onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 mt-[80px] w-[50%]">

        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[2.875rem] font-semibold leading-[2.375rem] text-richblack-5
                   dark:text-[#e84949] dark:font-[600] dark:text-[2.875rem]">Welcome Back</h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-5 dark:text-black">Build Events for today, tomorrow, and beyond.
               <span className="font-edu-sa font-bold italic text-blue-100 dark:text-[#343d68]">Education to future-proof your career.</span></p>
        </div>

        <label htmlFor="email"
          className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600]">Email Address <sup className="text-pink-200">*</sup></label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email address"
          required
          onChange={inputChange}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none dark:bg-white 
                            dark:text-richblack-700 dark:font-[600]"
        />

       <div className="relative">
          <label htmlFor="password"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600]">Password <sup className="text-pink-200">*</sup></label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={inputChange}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 outline-none
                        dark:bg-white dark:text-richblack-700 dark:font-[600]"
            />

            <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
            </span>
       </div>

        <button type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 dark:bg-[#e84949] dark:text-white py-[8px] px-[12px] font-medium
           text-richblack-900 dark:shadow-lg hover:scale-95 transition-all duration-200">Submit</button>
      </form>

      {/* <div className="w-[30%]">
        <img src={Images} className="rounded-lg" />
      </div> */}

      <div className="w-[33%] mt-[65px]">
        <img src={fromeImage} className="rounded-lg" />
      </div>
      
    </div>

  );
};

export default Login;
