import React, { useEffect, useState } from 'react'
import axios from "axios";
import {useParams} from "react-router-dom";

const Event = () => {
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

  return (
    <div className='w-11/12 max-w-maxContent mx-auto'>
        <h1 className='text-richblack-25 text-[36px] font-[600] font-inter leading-[44px] pt-6'>{event.title}</h1>
        <hr className="text-richblack-200 w-full"/>
        <p className='text-[#838894] text-[16px] font-[500] font-inter leading-[24px] mt-6'>{event.description}</p>
        <h3 className='text-[#838894] text-[18px] font-[500] font-inter leading-[24px] mt-6'>{event.venue}</h3>
        <p className='text-[#838894] text-[16px] font-[500] font-inter leading-[24px] mt-6'>{event.data}</p>
        <p className='text-[#838894] text-[18px] font-[500] font-inter leading-[24px] mt-6'>{event.time}</p>
        
        <div className='w-[600px] flex justify-center items-center mx-auto'>
        <img src={event?.imageUrl} />
        </div>

        {event?.speakers && event.speakers.map((speaker) => (
            <div key={speaker._id}>
                <h3 className='text-[#838894] text-[16px] font-[500] font-inter leading-[24px] mt-6'>{speaker.name}</h3>
                <h5 className='text-[#838894] text-[16px] font-[500] font-inter leading-[24px] mt-4'>{speaker.about}</h5>
            </div>
            
        ))}
    </div>
  )
}

export default Event
