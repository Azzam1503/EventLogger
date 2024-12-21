import React, { useEffect, useState } from "react";
import User from "../components/User";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import baseURL from "../config";

const UserProfile = ({user}) => {
  const [eventType, setEventType] = useState("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const navigate = useNavigate();
  const fetchEvents = async () =>{
    try {
      const response = await axios.get(`${baseURL}/user/events`, {
        withCredentials: true
      });
      setPastEvents(response.data.pastEvents.reverse());
      setUpcomingEvents(response.data.upcomingEvents);
    } catch (error) {
    }
  }
  useEffect(() =>{
    if(user == null) navigate("/login");
    fetchEvents();
  },[])
  return (
    <>
      <User user = {user} />

      <div className="flex justify-center items-center w-11/12 max-w-maxContent mx-auto gap-x-12">
 
        
          <button onClick={() => setEventType("upcoming")}
                className="mt-6 text-[13px] px-6 py-3 rounded-md font-bold bg-richblack-800 text-richblack-25 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                dark:bg-[#e84949] dark:border-none hover:shadow-none dark:text-richblack-5
                         hover:scale-95 transition-all duration-200 flex items-center gap-2">Upcoming Events <FaArrowRight /></button>       

          <button onClick={() => setEventType("past")}
                  className="mt-6 text-[13px] px-6 py-3 rounded-md font-bold bg-richblack-800 text-richblack-25 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                  dark:bg-[#e84949] dark:border-none hover:shadow-none dark:text-richblack-5
                      hover:scale-95 transition-all duration-200 flex items-center gap-2">Past Events <FaArrowRight /></button>
      </div>
      
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-row justify-between items-center mt-10 text-white">
          <div className="w-full flex  flex-col">
              {eventType === "upcoming" ? upcomingEvents.map(event => (
              <div key={event._id} className="flex justify-evenly items-center py-8 border border-richblack-200 ">
                  <h3 className="text-[#dbeafe] dark:text-black text-[18px] font-[500] font-inter leading-[26px] mx-6 w-[30%]">{event.title}</h3>
                  <h6 className="text-richblue-50 dark:text-richblack-700 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">{event.venue}</h6>
                  <h3 className="text-richblue-50 dark:text-richblack-700 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">{event.date}</h3>
                  <h3 className="text-richblue-50 dark:text-richblack-700 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">{event.time}</h3>
                  <button className="border border-richblack-700 rounded-[8px] bg-richblack-800 px-[12px] py-[8px] dark:bg-[#e84949] mx-6
                 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] dark:border-none hover:shadow-none hover:scale-95 transition-all duration-200">
                      <Link to={`/event/${event._id}`}
                            className="text-richblack-100 dark:text-richblack-5 text-[13px] font-[600] font-inter leading-[21px]">View</Link>
                  </button>
              </div>
              )): pastEvents.map((event) => (
              <div key={event._id} className="flex justify-evenly items-center py-8 border border-richblack-200 ">
                  <h3 className="text-[#dbeafe] dark:text-black text-[18px] font-[500] font-inter leading-[26px] px-6 w-[30%]">{event.title}</h3>
                  <h6 className="text-richblue-50 dark:text-richblack-700 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">{event.venue}</h6>
                  <h3 className="text-richblue-50 dark:text-richblack-700 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">{event.date}</h3>
                  <h3 className="text-richblue-50 dark:text-richblack-700 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">{event.time}</h3>
                  <button className="border border-richblack-700 rounded-[8px] bg-richblack-800 px-[12px] py-[8px] dark:bg-[#e84949] mx-6
                 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] dark:border-none hover:shadow-none hover:scale-95 transition-all duration-200">
                        <Link to={`/event/${event._id}`}
                          className="text-richblack-100 dark:text-richblack-5 text-[13px] font-[600] font-inter leading-[21px]">View</Link>
                  </button>
              </div>
        ))}
          </div>
      </div>

    </>
  );
};

export default UserProfile;




