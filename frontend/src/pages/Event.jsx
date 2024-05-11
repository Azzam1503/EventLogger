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
    <div>
        <h1>{event.title}</h1>
        <p>{event.description}</p>
        <img src={event?.imageUrl} />
        {event?.speakers && event.speakers.map((speaker) => (
            <div key={speaker._id}>
                <h3>{speaker.name}</h3>
                <h5>{speaker.about}</h5>
            </div>
            
        ))}
    </div>
  )
}

export default Event
