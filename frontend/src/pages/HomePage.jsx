import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import eventImages from "../assets/images/web-mjpru.jpg"
import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";


const HomePage = ({isLoggedIn}) => {
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const check = () =>{
        console.log(isLoggedIn);
      } 

    const fetchHomePageEvents = async () =>{
        try {
            const response = await axios.get("http://localhost:3000/event/homepage-events");
            setPastEvents(response.data.pastEvents);
            setUpcomingEvents(response.data.upcomingEvents);
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() =>{
        fetchHomePageEvents();
    },[])


  return (
    <>
        <div className='text-white w-5/12 mx-auto flex flex-col justify-between items-center gap-3 mt-10'>
            <h1 className='text-richblack-5 text-[28px] leading-[32px]'>Welcome to Event Logger of MJPRU ! For the best experience, please 
            <span className='bg-gradient-to-r from-blue-300 to-yellow-300 
                text-transparent bg-clip-text text-[32px] font-[600]'>  <i>sign in to your event logger Account.</i></span></h1>
            <p className='text-[24px] leading-[32px]'>Create Events <span className='text-pink-400'><i>and Moments!</i></span></p>
        </div>

            <div className='w-6/12 mx-auto flex justify-between items-center cursor-pointer mt-10'>
                <Link to="">
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter'>
                        <FaSearch className='text-[#e37222] text-[64px] font-[600] font-inter leading-[72px]'/>
                        <Link to={"/events"} className='text-[#e37222]'>Search Events</Link>
                    </div>
                </Link>
                <Link to="">
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter'>
                        <FaUserAlt className='text-[#e37222] text-[64px] font-[600] font-inter leading-[72px]'/>
                        <Link to={"/user-profile"} className='text-[#e37222]'>My Events</Link>
                    </div>
                </Link>
            <Link to="">
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter'>
                        <FaFolderOpen className='text-[#006699] text-[64px] font-[600] font-inter leading-[72px]'/>
                        <Link to={"/user-profile"} className='text-[#006699]'>Manage Events</Link>
                    </div>
            </Link>
            <Link to="">
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter'>
                        <IoIosAddCircle className='text-[#669933] text-[64px] font-[600] font-inter leading-[72px]'/>
                        <Link to={"/create-event"} className='text-[#669933]'>Create Event</Link>
                    </div>
            </Link>
            </div>
        
        <div className='w-11/12 max-w-maxContent mx-auto flex justify-between pt-10'>

                    <div className='border border-richblack-100 p-6 flex flex-col gap-y-4'>
                        <h2 className='text-[32px] font-[600] font-inter leading-[40px] text-yellow-100'>Past Events</h2>
                                {pastEvents.map((event) =>(
                                <Link key={event._id} to={`/event/${event._id}`}>
                                <h5  className='text-[rgba(131,136,148,1)] font-inter font-[500] text-[16px] leading-[24px] border-b-2'>{event.title}</h5></Link>
                            ))}
                    </div>
                
                    <div className='w-[600px]'>
                        <img src={eventImages}/>
                    </div>
                
                    <div className='border border-richblack-100 p-5 flex flex-col gap-y-4'>
                        <h2 className='text-[32px] font-[600] font-inter leading-[40px] text-yellow-100'>Upcoming Events</h2>
                        {upcomingEvents.map((event) =>(
                            <Link key={event._id} to={`/event/${event._id}`}>
                            <h5 className='text-[rgba(131,136,148,1)] font-inter font-[500] 
                                    text-[16px] leading-[24px] border-b-2'>{event.title}</h5></Link>
                        ))}
                    </div>
            </div>
    </>
  )
}

export default HomePage
        