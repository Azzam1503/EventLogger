import React, { useEffect, useState } from "react";
import User from "../components/User";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = ({user}) => {
  const [eventType, setEventType] = useState("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const fetchEvents = async () =>{
    try {
      const response = await axios.get("http://localhost:3000/user/events", {
        withCredentials: true
      });
      setPastEvents(response.data.pastEvents.reverse());
      setUpcomingEvents(response.data.upcomingEvents);
    } catch (error) {
    }
  }
  useEffect(() =>{
    fetchEvents();
  },[])
  return (
    <div className="text-white">
      <User user = {user} />

      <div className="flex justify-center items-center w-11/12 max-w-maxContent mx-auto gap-x-12">
        <button onClick={() => setEventType("upcoming")}
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Upcoming Events</button>
        <button onClick={() => setEventType("past")}
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Past Events</button>
      </div>
      
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-row justify-between items-center mt-10 text-white">
          <div className="w-full flex  flex-col">
              {eventType === "upcoming" ? upcomingEvents.map(event => (
              <div key={event._id} className="flex justify-center items-center py-8 border border-richblack-200 ">
                  <h3 className="text-richblue-5 text-[18px] font-[500] font-inter leading-[26px] w-[20%]">{event.title}</h3>
                  <h6 className="text-richblue-5 text-[18px] font-[500] font-inter leading-[26px] w-[20%]">{event.venue}</h6>
                  <h3 className="text-richblue-5 text-[18px] font-[500] font-inter leading-[26px] w-[20%]">{event.date}</h3>
                  <h3 className="text-richblue-5 text-[18px] font-[500] font-inter leading-[26px] w-[20%]">{event.time}</h3>
                  <Link to={`/event/${event._id}`}
                         className="text-richblue-5 text-[16px] font-[500] font-inter leading-[26px] border border-richblack-300 px-2">View</Link>
              </div>
              )): pastEvents.map((event) => (
              <div key={event._id} className="flex justify-center items-center py-8 border border-richblack-200 ">
                  <h3 className="text-richblue-5 text-[18px] font-[500] font-inter leading-[26px] w-[20%]">{event.title}</h3>
                  <h6 className="text-richblue-5 text-[18px] font-[500] font-inter leading-[26px] w-[20%]">{event.venue}</h6>
                  <h3 className="text-richblue-5 text-[18px] font-[500] font-inter leading-[26px] w-[20%]">{event.date}</h3>
                  <h3 className="text-richblue-5 text-[18px] font-[500] font-inter leading-[26px] w-[20%]">{event.time}</h3>
                  <Link to={`/event/${event._id}`}
                     className="text-richblue-5 text-[16px] font-[500] font-inter leading-[26px] border border-richblack-300 px-2">View</Link>
              </div>
        ))}
          </div>
      </div>

    </div>
  );
};

export default UserProfile;
