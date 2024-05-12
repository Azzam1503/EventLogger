import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div >
      Event
      {events.map((event) => (
        <div key={event._id} >
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
