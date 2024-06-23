import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const User = ({user}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get(`https://eventlogger.onrender.com/user/profile`, {
        withCredentials: true,
      });
      console.log(response)
      setUserData(response.data.user);
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const updateDetails = () => {};
  return (
    <div className=" mt-14">

      <div className="lg:ml-[340px]">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-pink-300 dark:text-black">User profile</h1>
          <div className="mt-4">
              <p1 className="text-[#dcfce7] font-[600] dark:text-black">{userData.fullName}</p1>
          </div>

          <div className="mt-1">
            <p className="text-[#bfdbfe] text-[14px] dark:text-black">{userData.email}</p>
          </div>

          <div className="flex items-center">

          <div className="mt-4 border border-richblack-700 rounded-[8px] bg-richblack-800 px-[12px] py-[8px] dark:bg-[#e84949] dark:border-none
                 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95 transition-all duration-200">
              <button onClick={updateDetails} className="text-richblack-100 text-[13px] font-[600] font-inter leading-[21px]
                                       dark:text-richblack-5">Edit detials</button>
          </div>
          </div>
      </div>

    </div>
  );
};

export default User;
