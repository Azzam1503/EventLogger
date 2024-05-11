import React, { Children, useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/event");
      setEvents(response.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="bg-slate-600 font-normal text-cyan-400">Taiwind Check</h1>
      Event
      {events.map((event) => (
        <div key={event._id}>
          <h3>{event.title}</h3>
          <h5>{event.description}</h5>
          <h6>{event.venue}</h6>
          <img
            src={event.imageUrl}
            alt="image"
            style={{ width: "500px", height: "400px" }}
          />
          <br />
          <button onClick={() => toggleUpdate(event)}>Edit Event</button>
        </div>
      ))}
      </div>
  );
};

export default Events;
