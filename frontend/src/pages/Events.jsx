import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [department, setDepartment] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/event/allEvents");
      setEvents(response.data.events);
      setFilteredEvents(response.data.events);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = () => {
    let filteredEvents = events;
    if (fromDate) {
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.date) >= new Date(fromDate)
      );
    }
    if (toDate) {
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.date) <= new Date(toDate)
      );
    }

    if (department) {
      filteredEvents = filteredEvents.filter(
        (event) => event.department === department
      );
    }

    setFilteredEvents(filteredEvents);
    console.log(filteredEvents);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const departmentOptions = [
    { value: "", label: "Select a department" },
    { value: "uni", label: "University" },
    { value: "cs", label: "Computer Science" },
    { value: "ei", label: "Electrical" },
    { value: "ch", label: "Chemical" },
    { value: "mh", label: "Mechanical" },
    { value: "ec", label: "Electronics" },
    { value: "math", label: "Maths" },
  ];

  return (
    <>
         <div className="">
              <div className="w-11/12 max-w-maxContent mx-auto flex justify-between items-center border border-richblack-700
                  mt-10 px-[12px] py-[18px]">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    className=" rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-200 outline-none dark:bg-white
                              dark:text-black dark:box-shadow: 2px 2px 10px #1f1f1f"
                  />
                  <input
                    type="date"
                    value={toDate}
                    onChange={handleToDateChange}
                    className=" rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-200 outline-none dark:bg-white
                              dark:text-black dark:box-shadow: 2px 2px 10px #1f1f1f"
                  />
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className=" rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-200 outline-none dark:bg-white
                              dark:text-black dark:box-shadow: 2px 2px 10px #1f1f1f"
                  >
                    {departmentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleFilter}
                    className="border border-richblack-700 rounded-[8px] bg-richblack-800 px-[12px] py-[8px] text-richblack-100
                      shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95 transition-all duration-200"
                  >
                    Apply Filter
                  </button>
                </div>
          </div>
      <div
        className="text-white flex w-11/12 mx-auto max-w-maxContent justify-center items-center gap-x-[170px] 
                      mt-10 border border-richblack-200 py-6"
      >

        <h3 className="text-[#e37222] text-[28px] font-[600] font-inter leading-[32px]">
          Title
        </h3>
        <h3 className="text-[#e37222] text-[28px] font-[600] font-inter leading-[32px]">
          Location
        </h3>
        <h3 className="text-[#e37222] text-[28px] font-[600] font-inter leading-[32px]">
          Date
        </h3>
        <h3 className="text-[#e37222] text-[28px] font-[600] font-inter leading-[32px]">
          Time
        </h3>
        <h3 className="text-[#e37222] text-[28px] font-[600] font-inter leading-[32px]">
          Option
        </h3>
      </div>
      <div className="w-11/12 max-w-maxContent mx-auto flex flex-row justify-between items-center mt-10 text-white">
        <div className="w-full flex  flex-col">
  
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="flex justify-center items-center py-8 border border-richblack-200 "
            >
              <p className="text-richblue-25 text-[18px] font-[500] font-inter leading-[26px] w-[20%]">
                {event.title}
              </p>
              <p className="text-richblue-50 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">
                {event.venue}
              </p>
              <p className="text-richblue-50 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">
                {event.date}
              </p>
              <p className="text-richblue-50 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">
                {event.time}
              </p>
              <button
                className="border border-richblack-700 rounded-[8px] bg-richblack-800 px-[12px] py-[8px] 
                 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95 transition-all duration-200"
              >
                <Link
                  to={`/event/${event._id}`}
                  className="text-richblack-100 text-[13px] font-[600] font-inter leading-[21px]
                                                           w-[20%]"
                >
                  View
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Events;
