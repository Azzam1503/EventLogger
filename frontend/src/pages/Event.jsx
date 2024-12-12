import React, { useEffect, useState } from 'react'
import axios from "axios";
import {useParams, Link, useNavigate} from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { BsStopwatchFill } from "react-icons/bs";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { MdDescription, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Event = ({user, isLoggedIn}) => {
    const [event, setEvent] = useState({})
    const navigate = useNavigate();
    const {id} = useParams();

    const fetchEvent = async () => {
        const response = await axios.get(`https://eventlogger.onrender.com/event/get-event/${id}`);
        console.log(response.data.event.userId);
        setEvent(response.data.event);
    }

    useEffect(() =>{
        console.log("user",user)
        console.log(isLoggedIn)
        fetchEvent();
    },[])

    const handleDelete = async () => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this event?");
            if (!confirmDelete) {
              return;
            }
                    
          const response = await axios.delete(
            `https://eventlogger.onrender.com/event/delete-event/${id}`,{
                withCredentials: true
            }
          );
          navigate("/");
          console.log("event deleted successfully");
        } catch (error) {
          console.log("error while deleting the event");
        }
      };

  return (
    <div className='w-full flex justify-center mt-4'>
        
       <div className='w-full max-w-5xl flex md:flex-row flex-col-reverse justify-between gap-14 px-5 sm:px-14 lg:px-0'>
       <div className='md:w-1/2 w-full'>
            <h1 className='text-[#e37222] dark:text-richblack-700 text-[32px] font-[600] font-inter leading-[40px] pt-6'>{event.title}</h1>
                <hr className="text-richblack-200 w-full"/>
                <p className='text-[#f5f5f5] text-[16px] font-[500] font-inter leading-[24px] mt-6
                            dark:text-richblack-600'>{event.description}</p>
                <br/>
                <hr className="text-richblack-200 w-full"/>

                <div>
                     <div className='flex gap-x-3'>
                        <FaLocationDot className='text-[rgba(227,114,34,0.67)] mt-[25px] text-[24px] dark:text-[#e84949]'/>
                        <h1 className='text-[#e37222] dark:text-[#e84949] text-[24px] font-[600] font-inter leading-[28px] mt-6'>LOCATION</h1>    
                    </div>
                        <h3 className='text-richblack-50 text-[18px] font-[500] font-inter leading-[24px] mt-6
                                    dark:text-richblack-600'>{event.venue}</h3>
                </div>

                <div>
                     <div className='flex gap-x-3'>
                        <BsFillCalendar2DateFill className='text-[rgba(227,114,34,0.67)] mt-[25px] text-[24px] dark:text-[#e84949]'/>
                        <h1 className='text-[#e37222] dark:text-[#e84949] text-[24px] font-[600] font-inter leading-[28px] mt-6'>Calander</h1>    
                    </div>
                        <h3 className='text-richblack-50 text-[18px] font-[500] font-inter leading-[24px] mt-6
                                    dark:text-richblack-600'>{event.date}</h3>
                </div>

                <div>
                     <div className='flex gap-x-3'>
                        <BsStopwatchFill className='text-[rgba(227,114,34,0.67)] mt-[25px] text-[24px] dark:text-[#e84949]'/>
                        <h1 className='text-[#e37222] dark:text-[#e84949] text-[24px] font-[600] font-inter leading-[28px] mt-6'>Time</h1>    
                    </div>
                        <h3 className='text-richblack-50 text-[18px] font-[500] font-inter leading-[24px] mt-6
                                   dark:text-richblack-600'>{event.time}</h3>
                </div>  

                <br/>
                <hr className="text-richblack-200 w-full"/>

                {event?.speakers && event.speakers.map((speaker) => (
                    <div key={speaker._id} className='pb-12'>
                        <div className='flex gap-x-3'>
                            <BsPersonLinesFill className='text-[rgba(227,114,34,0.67)] mt-[22px] text-[32px] dark:text-[#e84949]'/>
                            <h3 className='text-[#e37222] dark:text-[#e84949] text-[28px] font-[600] font-inter leading-[28px] mt-6'>Speaker</h3>
                        </div>
                    <div className='flex gap-x-3'>
                        <BsPersonCircle  className='text-white mt-7 text-[20px] dark:text-[#006699]'/>
                        <h3 className='text-[#f5f5f5] text-[24px] font-[600] font-inter leading-[28px] mt-6
                                    dark:text-[#006699]'>{speaker.name}</h3>
                    </div > 
                        <div className='flex gap-3'>
                            <MdDescription className='text-white mt-5'/>   
                            <h5 className='text-richblack-25 text-[16px] font-[500] font-inter leading-[24px] mt-4
                                      dark:text-richblack-600'>{speaker.about}</h5>
                        </div>
                    </div>
                    
                ))}
        </div>

        <div className='flex flex-col items-center mt-8 w-full md:w-1/2'>

           <div className='flex justify-center w-full'>
               <img src={event?.imageUrl} className='rounded-[8px]' />
           </div>

            <div className='flex font-bold text-3xl mt-6 justify-between gap-x-12'>

            
                   {isLoggedIn && event.userId === user.id &&<Link className='border border-richblack-700 rounded-[8px] bg-richblack-800  text-[#006699] p-2 
                    shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95 transition-all 
                      duration-200 dark:bg-white dark:border-none' to={`/update-event/${event._id}`}><FaRegEdit className='text-xl md:text-2xl'/></Link>}
            

                <div className='border border-richblack-700 rounded-[8px] bg-richblack-800 text-pink-400 p-2 
                    shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95 transition-all 
                       duration-200 dark:bg-white dark:border-none'>
                    {isLoggedIn && event.userId === user.id &&<MdDelete onClick={handleDelete} className='text-xl md:text-2xl'/>}
                </div>
            
            </div>
            
        </div>
       </div>
        
    </div>
  )
}

export default Event
