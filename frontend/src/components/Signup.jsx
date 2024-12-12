import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Photo from "../assets/images/games22.jpg";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const navigate = useNavigate();
  const {loading, signup} = useSignup();
  const [signupFormData, setSignUpFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false)

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
        navigate("/");
      }
    } catch (error) {
      navigate("/register")
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSignUpFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(signupFormData);
  };

  return (
    <div className="w-full md:px-14 px-5 max-w-maxContent flex md:flex-row flex-col justify-between mx-auto py-14 gap-x-12">
      <form onSubmit={handleSubmit} className="flex w-full md:w-[45%] flex-col gap-y-2 mt-3 md:10"> 

        <div className=" w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[30px] font-inter font-[600] leading-[38px] text-richblack-5
               dark:text-[#e84949]">Join the millions playing to game with EventLogger for free</h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem] text-richblack-5
               dark:text-[#343d68]">Build Events for today, tomorrow, and beyond.
               <span className="font-edu-sa font-bold italic text-blue-100">Education to future-proof your career.</span></p>
        </div>
      <br/>
        <label htmlFor="fullName"
          className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600]">Full Name <sup className="text-pink-200">*</sup></label>
        <input
          type="text"
          name="fullName"
          id="fullName"
          required
          placeholder="Enter your fullName"
          onChange={handleInputChange}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 outline-none
          dark:text-black dark:box-shadow: 2px 2px 10px #1f1f1f dark:bg-white dark:font-[600]"
        />

        <label htmlFor="email"
          className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600]">Email <sup className="text-pink-200">*</sup></label>
        <input
          type="text"
          name="email"
          id="email"
          required
          placeholder="Enter your email address"
          onChange={handleInputChange}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 outline-none
          dark:text-black dark:box-shadow: 2px 2px 10px #1f1f1f dark:bg-white dark:font-[600]"
        />

        <div className="relative">
            <label htmlFor="password"
              className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600]">Password <sup className="text-pink-200">*</sup></label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                placeholder="Enter your password"
                onChange={handleInputChange}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5 outline-none
                    dark:text-black dark:box-shadow: 2px 2px 10px #1f1f1f dark:bg-white dark:font-[600]"
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
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900
                        hover:scale-95 transition-all duration-200 dark:bg-[#e84949] dark:text-white">Create Account</button>
      </form>

     <div className="md:w-2/5 w-full mt-16">
      <img src={Photo} className="rounded-[8px]"/>
     </div>

    </div>
  );
};

export default Signup;



