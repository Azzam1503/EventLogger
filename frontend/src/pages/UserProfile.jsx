import React, { useEffect, useState } from "react";
import User from "../components/User";
import axios from "axios";
import { Link } from "react-router-dom";

const UserProfile = ({user}) => {
  const [eventType, setEventType] = useState("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const fetchEvents = async () =>{
    try {
      const response = await axios.get("http://localhost:3000/user/events", {
        withCredentials: true
      });
      setPastEvents(response.data.pastEvents.reverse());
      setUpcomingEvents(response.data.upcomingEvents);
    } catch (error) {
    }
  }
  useEffect(() =>{
    fetchEvents();
  },[])
  return (
    <div className="text-white">
      <User user = {user} />
      <button onClick={() => setEventType("upcoming")}>Upcoming Events</button>
      <button onClick={() => setEventType("past")}>Past Events</button>
      {eventType === "upcoming" ? upcomingEvents.map(event => (
        <div key={event._id}>
           <h3>{event.title}</h3>
          <h6>{event.venue}</h6>
          <h3>{event.date}</h3>
          <h3>{event.time}</h3>
          <Link to={`/event/${event._id}`}>View</Link>
        </div>
      )): pastEvents.map((event) => (
        <div key={event._id}>
           <h3>{event.title}</h3>
          <h6>{event.venue}</h6>
          <h3>{event.date}</h3>
          <h3>{event.time}</h3>
          <Link to={`/event/${event._id}`}>View</Link>
        </div>
      ))}

    </div>
  );
};

export default UserProfile;
