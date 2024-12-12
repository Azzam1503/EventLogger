import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Images from "../assets/images/games22.jpg"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from "react-router-dom";
import useSignin from "../hooks/useSignin";



const Login = ({isLoggedIn, setIsLoggedIn}) => {
  const {loading, signin} = useSignin();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);


  const inputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(loginDetails);
  };

  return (
    <div className="w-full max-w-maxContent flex md:flex-row flex-col justify-between mx-auto md:px-14 px-5 py-14 gap-x-12">

      <form onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 mt-3 md:mt-[80px] md:w-[50%] w-full">

        <div className=" w-11/12 max-w-[450px] md:mx-0">
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
                        dark:bg-white dark:text-richblack-700 dark:font-[600] dark:shadow-[2px_2px_10px_rgb(31,31,31)]"
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
              <Link to="">
                 <p className="mt-1 ml-auto max-w-max text-xs text-blue-100 dark:text-blue-200">
                 Forgot Password
                </p>
              </Link>
       </div>

        <button type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 dark:bg-[#e84949] dark:text-white py-[8px] px-[12px] font-medium
           text-richblack-900 dark:shadow-lg hover:scale-95 transition-all duration-200">Submit</button>
      </form>

      {/* <div className="w-[30%]">
        <img src={Images} className="rounded-lg" />
      </div> */}

      <div className="md:w-2/5 w-full mt-[65px] dark:shadow-xl">
        <img src={Images} className="rounded-lg" />
      </div>
      
    </div>

  );
};

export default Login;



// useEffect(() => {
//   checkAuth();
// }, []);

// const checkAuth = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:3000/user/check-auth",
//       {
//         withCredentials: true,
//       }
//     );
//     if (response.statusText === "OK") {
//       navigate("/events");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };