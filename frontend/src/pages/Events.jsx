import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Events = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/event/allEvents");
      console.log(response)
      setEvents(response.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white">
      Event
      {events.map((event) => (
        <div key={event._id} >
          <h3>{event.title}</h3>
          <h6>{event.venue}</h6>
          <h3>{event.date}</h3>
          <h3>{event.time}</h3>
          <Link to={`/event/${event._id}`}>View</Link>
          <br />
        </div>
      ))}
      </div>
  );
};

export default Events;
