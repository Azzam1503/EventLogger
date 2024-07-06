import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import eventImages from "../assets/images/web-mjpru.jpg";
import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import Footer from "../components/Footer";
import TextCard from "../components/TextCard";

const HomePage = () => {
<<<<<<< HEAD
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [tabs, setTabs] = useState("upcoming");

  const fetchHomePageEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/event/homepage-events"
      );
      setPastEvents(response.data.pastEvents);
      setUpcomingEvents(response.data.upcomingEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHomePageEvents();
  }, []);

=======
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    
    const fetchHomePageEvents = async () =>{
        try {
            const response = await axios.get("https://eventlogger.onrender.com/event/homepage-events");
            setPastEvents(response.data.pastEvents);
            setUpcomingEvents(response.data.upcomingEvents);
        } catch (error) {
            console.log(error)
        }
        
    }
>>>>>>> main



  return (
    <>
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col w-full h-full max-w-5xl items-center gap-10 py-8">
          {" "}
          <div className="text-white w-full  flex flex-col justify-between items-center gap-3 mt-10 md:px-0 sm:px-10 px-5">
            <div className="flex justify-center flex-col items-center text-center gap-2 w-full">
              <h1
                className="text-[#f1f2ff] w-full md:text-4xl text-2xl  leading-[32px] text-center
                dark:text-black"
              >
                Welcome to Event Logger of MJPRU ! For the best experience, please
                <span
                  className="bg-gradient-to-r from-blue-300 to-yellow-300 
                    text-transparent bg-clip-text md:text-4xl text-2xl font-[600]"
                >
                  {" "}
                  <i>sign in to your event logger Account.</i>
                </span>
              </h1>
              <p className="text-[24px] w-full leading-[32px] dark:text-black">
                Create Events{" "}
                <span className="text-pink-400">
                  <i>and Moments!</i>
                </span>
              </p>
            </div>
          </div>
          <div className="w-full mx-auto md:flex md:justify-between md:items-center cursor-pointer mt-10 md:px-10 grid grid-cols-2 space-x-6 space-y-6">
            <Link to="/events">
              <div
                className="flex w-full flex-col items-center gap-y-3 text-xl md:text-[22px] font-[600] font-inter 
                                group hover:scale-95 transition-all duration-200"
              >
                <FaSearch
                  className="text-[#e37222] md:text-6xl text-3xl font-[600] font-inter leading-[72px] group-hover:text-yellow-300
                                    group-hover:dark:text-[#e84949]"
                />
                <Link
                  to={"/events"}
                  className="text-[#e37222] group-hover:text-richblack-50
                             group-hover:dark:text-richblack-500"
                >
                  Search Events
                </Link>
<<<<<<< HEAD
              </div>
            </Link>
            <Link to="">
              <div
                className="flex w-full flex-col items-center gap-y-3 text-xl md:text-[22px] font-[600] font-inter 
                                group hover:scale-95 transition-all duration-200 -mt-6"
              >
                <FaUserAlt
                  className="text-[#e37222] md:text-6xl text-3xl font-[600] font-inter leading-[72px] group-hover:text-yellow-300
                                    group-hover:dark:text-[#e84949]"
                />
                <Link
                  to={"/user-profile"}
                  className="text-[#e37222] group-hover:text-richblack-50
                        group-hover:dark:text-richblack-500"
                >
                  My Event
                </Link>
              </div>
            </Link>
            <Link to="/exportEvents">
              <div
                className="flex w-full flex-col items-center gap-y-3 text-xl md:text-[22px] font-[600] font-inter 
                                group hover:scale-95 transition-all duration-200 mb-5"
              >
                <FaFolderOpen
                  className="text-[#006699] md:text-6xl text-3xl font-[600] font-inter leading-[72px] group-hover:text-yellow-300
                                    group-hover:dark:text-[#e84949] "
                />
                <Link
                  to={"/user-profile"}
                  className="text-[#006699] group-hover:text-richblack-50
                        group-hover:dark:text-richblack-500"
                >
                  Manage Events
                </Link>
              </div>
=======
                <Link to={"/user-profile"}>
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter 
                                       group hover:scale-95 transition-all duration-200'>
                        <FaUserAlt className='text-[#e37222] text-[64px] font-[600] font-inter leading-[72px] group-hover:text-yellow-200
                                  group-hover:dark:text-[#e84949]'/>
                        <Link to={"/user-profile"} className='text-[#e37222] group-hover:text-richblack-50
                        group-hover:dark:text-richblack-500'>My Event</Link>
                    </div>
                </Link>
            <Link to={"/exportEvents"}>
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter 
                              group hover:scale-95 transition-all duration-200'>
                        <FaFolderOpen className='text-[#006699] text-[64px] font-[600] font-inter leading-[72px] group-hover:text-yellow-200
                              group-hover:dark:text-[#e84949]'/>
                        <Link to={"/exportEvents"} className='text-[#006699] group-hover:text-richblack-50
                        group-hover:dark:text-richblack-500'>Export Events</Link>
                    </div>
>>>>>>> main
            </Link>
            <Link to="/create-event">
              <div
                className="flex w-full flex-col items-center gap-y-3 text-xl md:text-[22px] font-[600] font-inter 
                                group hover:scale-95 transition-all duration-200 mb-5"
              >
                <IoIosAddCircle
                  className="text-[#669933] md:text-6xl text-3xl  font-[600] font-inter leading-[72px] group-hover:text-yellow-300
                                    group-hover:dark:text-[#e84949]"
                />
                <Link
                  to={"/create-event"}
                  className="text-[#669933] group-hover:text-richblack-50
                        group-hover:dark:text-richblack-500"
                >
                  Create Event
                </Link>
              </div>
            </Link>
          </div>

          <div className='w-full max-w-maxContent mx-auto px-5 md:px-8 flex gap-10 xl:flex-row flex-col items-center xl:items-start xl:justify-between pt-10 xl:gap-2'>

            <div className='xl:flex hidden rounded-[4px] border border-richblack-100 p-6 flex-col gap-y-4'>
              <h2 className='text-[32px] font-[600] font-inter leading-[40px] text-yellow-100
                          dark:text-[#e84949]'>Past Events</h2>
              {pastEvents.map((event,index) => (
                <Link key={event._id} to={`/event/${event._id}`}>
                  <h5 className='text-[rgba(131,136,148,1)] font-inter font-[500] text-[16px] 
                                     leading-[24px] border-b-2 rounded-[8px] p-1 hover:text-yellow-300 hover:dark:text-[#0504AA]
                                      dark:text-black'>{index + 1}{`.`}{event.title}</h5></Link>
              ))}
            </div>

            <div className='w-fit'>
              <img src={eventImages} className='rounded-sm' />
            </div>

            <div className="flex flex-col gap-7 w-full items-center xl:hidden">
              <div className="flex gap-16 items-center">
                <button className={`px-5 rounded-xl py-3 text-base ${tabs === "upcoming" ? "bg-pink-500" : "bg-white"}`} onClick={() => setTabs("upcoming")}>Upcoming</button>
                <button className={`px-5 rounded-xl py-3 text-base ${tabs === "past" ? "bg-pink-500" : "bg-white"}`} onClick={() => setTabs("past")}>Past</button>
              </div>
              <div className="flex flex-col w-full rounded-lg border border-white max-w-2xl">
                {tabs === "upcoming" ? upcomingEvents.map((event,index) => (
                  <Link key={event._id} to={`/event/${event._id}`}>
                    <h5 className='text-[rgba(131,136,148,1)] p-3 w-full font-inter font-[500] dark:text-black 
                                    text-[16px] leading-[24px] border-b-2 rounded-[8px] text-lg  hover:text-yellow-300
                                    hover:dark:text-[#0504AA]'>{index+1}{`.`} {event.title}</h5></Link>
                )) : pastEvents.map((event,index) => (
                  <Link key={event._id} to={`/event/${event._id}`}>
                    <h5 className='text-[rgba(131,136,148,1)] p-3 w-full font-inter font-[500] dark:text-black 
                                    text-[16px] leading-[24px] border-b-2 rounded-[8px] text-lg  hover:text-yellow-300
                                    hover:dark:text-[#0504AA]'>{index + 1}{`.`} {event.title}</h5></Link>
                ))}
              </div>
            </div>

            <div className='hidden xl:flex rounded-[4px] border border-richblack-100 p-5 flex-col gap-y-4'>
              <h2 className='text-[32px] font-[600] font-inter leading-[40px] text-yellow-100
                           dark:text-[#e84949]'>Upcoming Events</h2>
              {upcomingEvents.map((event,index) => (
                <Link key={event._id} to={`/event/${event._id}`}>
                  <h5 className='text-[rgba(131,136,148,1)] font-inter font-[500] dark:text-black 
                                    text-[16px] leading-[24px] border-b-2 rounded-[8px] p-1  hover:text-yellow-300
                                    hover:dark:text-[#0504AA]'>{index + 1}{`.`}{event.title}</h5></Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Text card */}
      <TextCard />

      {/* Footer section */}
      <Footer />
    </>
  );
};

export default HomePage;
