import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom";
import eventImages from "../assets/images/web-mjpru.jpg"
import { FaSearch } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import Footer from '../components/Footer';


const HomePage = () => {
    const [pastEvents, setPastEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    
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
            <h1 className='text-[#f1f2ff] text-[28px] leading-[32px] text-center
               dark:text-black'>Welcome to Event Logger of MJPRU ! For the best experience, please 
            <span className='bg-gradient-to-r from-blue-300 to-yellow-300 
                text-transparent bg-clip-text text-[32px] font-[600]'>  <i>sign in to your event logger Account.</i></span></h1>
            <p className='text-[24px] leading-[32px] dark:text-black'>Create Events <span className='text-pink-400'><i>and Moments!</i></span></p>
        </div>

            <div className='w-6/12 mx-auto flex justify-between items-center cursor-pointer mt-10'>
                <Link to="/events">
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter 
                                group hover:scale-95 transition-all duration-200'>
                        <FaSearch className='text-[#e37222] text-[64px] font-[600] font-inter leading-[72px] group-hover:text-yellow-200
                                    group-hover:dark:text-[#e84949]'/>
                        <Link to={"/events"} className='text-[#e37222] group-hover:text-richblack-50
                             group-hover:dark:text-richblack-500'>Search Events</Link>
                    </div>
                </Link>
                <Link to="">
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter 
                                       group hover:scale-95 transition-all duration-200'>
                        <FaUserAlt className='text-[#e37222] text-[64px] font-[600] font-inter leading-[72px] group-hover:text-yellow-200
                                  group-hover:dark:text-[#e84949]'/>
                        <Link to={"/user-profile"} className='text-[#e37222] group-hover:text-richblack-50
                        group-hover:dark:text-richblack-500'>My Event</Link>
                    </div>
                </Link>
            <Link to="/exportEvents">
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter 
                              group hover:scale-95 transition-all duration-200'>
                        <FaFolderOpen className='text-[#006699] text-[64px] font-[600] font-inter leading-[72px] group-hover:text-yellow-200
                              group-hover:dark:text-[#e84949]'/>
                        <Link to={"/user-profile"} className='text-[#006699] group-hover:text-richblack-50
                        group-hover:dark:text-richblack-500'>Manage Events</Link>
                    </div>
            </Link>
            <Link to="/create-event">
                    <div className='flex flex-col items-center gap-y-3 text-[22px] font-[600] font-inter 
                               group hover:scale-95 transition-all duration-200'>
                        <IoIosAddCircle className='text-[#669933] text-[64px] font-[600] font-inter leading-[72px] group-hover:text-yellow-200
                           group-hover:dark:text-[#e84949]'/>
                        <Link to={"/create-event"} className='text-[#669933] group-hover:text-richblack-50
                        group-hover:dark:text-richblack-500'>Create Event</Link>
                    </div>
            </Link>
            </div>
        
            <div className='w-11/12 max-w-maxContent mx-auto flex justify-between pt-10 gap-2'>

                    <div className='rounded-[4px] border border-richblack-100 p-6 flex flex-col gap-y-4'>
                        <h2 className='text-[32px] font-[600] font-inter leading-[40px] text-yellow-100
                          dark:text-[#e84949]'>Past Events</h2>
                                {pastEvents.map((event) =>(
                                <Link key={event._id} to={`/event/${event._id}`}>
                                <h5  className='text-[rgba(131,136,148,1)] font-inter font-[500] text-[16px] 
                                     leading-[24px] border-b-2 rounded-[8px] p-1 hover:text-yellow-300 hover:dark:text-[#0504AA]
                                      dark:text-black'>{event.title}</h5></Link>
                            ))}
                    </div>
                
                    <div className='w-fit'>
                        <img src={eventImages} className='rounded-sm'/>
                    </div>
                
                    <div className='rounded-[4px] border border-richblack-100 p-5 flex flex-col gap-y-4'>
                        <h2 className='text-[32px] font-[600] font-inter leading-[40px] text-yellow-100
                           dark:text-[#e84949]'>Upcoming Events</h2>
                        {upcomingEvents.map((event) =>(
                            <Link key={event._id} to={`/event/${event._id}`}>
                            <h5 className='text-[rgba(131,136,148,1)] font-inter font-[500] dark:text-black 
                                    text-[16px] leading-[24px] border-b-2 rounded-[8px] p-1  hover:text-yellow-300
                                    hover:dark:text-[#0504AA]'>{event.title}</h5></Link>
                        ))}
                    </div>
            </div>

            {/* Footer section */}
           
                <Footer/>
            
    </>
  )
}

export default HomePage
        