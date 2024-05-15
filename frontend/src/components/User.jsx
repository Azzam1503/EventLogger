import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const User = ({user}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/profile`, {
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
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-pink-300">User profile</h1>
          <div className="mt-4">
              <p1 className="text-[#dcfce7] font-[600]">{userData.fullName}</p1>
          </div>

          <div className="mt-1">
            <p className="text-[#bfdbfe] text-[14px]">{userData.email}</p>
          </div>

          <div className="flex items-center">
          {/* <div className="mt-4 border border-pink-500 rounded-[8px] bg-pink-900 px-[12px] py-[8px] hover:border-none 
                  shadow-[2px_2px_0px_0px_rgb(190, 24 ,93,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200">
              <button onClick={updateDetails} className="text-pink-100 text-[13px] font-[600] font-inter leading-[21px]">Edit detials</button>
          </div> */}

          <div className="mt-4 border border-richblack-700 rounded-[8px] bg-richblack-800 px-[12px] py-[8px] 
                 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95 transition-all duration-200">
              <button onClick={updateDetails} className="text-richblack-100 text-[13px] font-[600] font-inter leading-[21px]">Edit detials</button>
          </div>
          </div>
      </div>

    </div>
  );
};

export default User;
