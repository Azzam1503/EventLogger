import React, { useEffect, useState } from 'react'
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { BsStopwatchFill } from "react-icons/bs";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { MdDescription, MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Event = ({user}) => {
    const [event, setEvent] = useState({})

    const {id} = useParams();

    const fetchEvent = async () => {
        const response = await axios.get(`http://localhost:3000/event/get-event/${id}`);
        console.log(response);
        setEvent(response.data.event);
    }

    useEffect(() =>{
        fetchEvent();
    },[])

    const handleDelete = async () => {
        try {
          const response = await axios.delete(
            "http://localhost:3000/event/delete-event/" + id
          );
          console.log("event deleted successfully");
        } catch (error) {
          console.log("error while deleting the event");
        }
    
        const remainingEvents = events.filter((event) => event._id != id);
        setEvents(remainingEvents);
      };

  return (
    <div className='w-9/12 max-w-maxContent mx-auto flex justify-between items-center gap-x-[80px] mt-4'>
        
        <div className='w-[50%]'>
            <h1 className='text-[#e37222] text-[36px] font-[600] font-inter leading-[44px] pt-6'>{event.title}</h1>
                <hr className="text-richblack-200 w-full"/>
                <p className='text-[#f5f5f5] text-[16px] font-[500] font-inter leading-[24px] mt-6'>{event.description}</p>
                <br/>
                <hr className="text-richblack-200 w-full"/>

                <div>
                     <div className='flex gap-x-3'>
                        <FaLocationDot className='text-[rgba(227,114,34,0.67)] mt-[25px] text-[24px]'/>
                        <h1 className='text-[#e37222] text-[24px] font-[600] font-inter leading-[28px] mt-6'>LOCATION</h1>    
                    </div>
                        <h3 className='text-richblack-50 text-[18px] font-[500] font-inter leading-[24px] mt-6'>{event.venue}</h3>
                </div>

                <div>
                     <div className='flex gap-x-3'>
                        <BsFillCalendar2DateFill className='text-[rgba(227,114,34,0.67)] mt-[25px] text-[24px]'/>
                        <h1 className='text-[#e37222] text-[24px] font-[600] font-inter leading-[28px] mt-6'>Calander</h1>    
                    </div>
                        <h3 className='text-richblack-50 text-[18px] font-[500] font-inter leading-[24px] mt-6'>{event.date}</h3>
                </div>

                <div>
                     <div className='flex gap-x-3'>
                        <BsStopwatchFill className='text-[rgba(227,114,34,0.67)] mt-[25px] text-[24px]'/>
                        <h1 className='text-[#e37222] text-[24px] font-[600] font-inter leading-[28px] mt-6'>Time</h1>    
                    </div>
                        <h3 className='text-richblack-50 text-[18px] font-[500] font-inter leading-[24px] mt-6'>{event.time}</h3>
                </div>  

                <br/>
                <hr className="text-richblack-200 w-full"/>

                {event?.speakers && event.speakers.map((speaker) => (
                    <div key={speaker._id} className='pb-12'>
                        <div className='flex gap-x-3'>
                            <BsPersonLinesFill className='text-[rgba(227,114,34,0.67)] mt-[22px] text-[32px]'/>
                            <h3 className='text-[#e37222] text-[28px] font-[600] font-inter leading-[28px] mt-6'>Speaker</h3>
                        </div>
                    <div className='flex gap-x-3'>
                        <BsPersonCircle  className='text-white mt-7 text-[20px]'/>
                        <h3 className='text-[#f5f5f5] text-[24px] font-[600] font-inter leading-[28px] mt-6'>{speaker.name}</h3>
                    </div > 
                        <div className='flex gap-3'>
                            <MdDescription className='text-white mt-5'/>   
                            <h5 className='text-richblack-25 text-[16px] font-[500] font-inter leading-[24px] mt-4'>{speaker.about}</h5>
                        </div>
                    </div>
                    
                ))}
        </div>

         <div className='w-[600px] flex flex-col justify-evenly items-center mx-auto text-white'>
            <div className='flex font-bold text-3xl'>
            {event.userId === user.id &&<Link to={`/update-event/${event._id}`}><FaRegEdit /></Link>}
            {event.userId === user.id &&<button onClick={handleDelete}><MdDelete /></button>}
            </div>
            <img src={event?.imageUrl} className='rounded-[8px]' />
        </div>
      


        
    </div>
  )
}

export default Event
