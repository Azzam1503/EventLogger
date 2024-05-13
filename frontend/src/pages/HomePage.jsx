import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import Link from "react-router-dom";

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
    <div className='text-white'>
       This is the homepage of the event logger     
       <button onClick={check}>Check</button>
    </div>
  )
}

export default HomePage
        