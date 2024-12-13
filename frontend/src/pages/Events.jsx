"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoColorFilter } from "react-icons/io5";


import { Table } from "flowbite-react";
import baseURL from "../config";

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
      const response = await axios.get(`${baseURL}/event/allEvents`);
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
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const departmentOptions = [
    { value: "", label: "Select a department" },
    { value: "cs", label: "Computer Science & Information Technology" },
    { value: "ei", label: " Instrumentation Engineering" },
    { value: "ch", label: "Chemical engineering" },
    { value: "mh", label: "Electrical engineering" },
    { value: "ec", label: "Electronic communication" },
    { value: "math", label: "Department of Mathematics" },
    { value: "uni", label: "Other" },
  ];

  return (
    <>
         <div className="mb-12">
            <div className="w-11/12 max-w-maxContent mx-auto p-5  mt-10 border-2 rounded-xl dark:border-[#e84949] py-[12px] border-richblack-700">
                  <div className="flex justify-center items-center gap-3 underline text-richblack-50 dark:text-[#e84949]">
                    <IoColorFilter  className="text-richblack-50 text-[32px] leading-[36px] dark:text-[#e84949]"/>
                    <h1 className="text-richblack-50 dark:text-[#e84949] font-[600] text-[32px] leading-[36px]">Filtering Option</h1>
                  </div>
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-maxContent mx-auto xl:flex justify-between items-center rounded-xl border border-richblack-700
                  mt-10 px-[12px] py-[18px] mb-6 dark:border-none">
                 
                  <input
                    type="date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className=" rounded-[0.5rem] bg-richblack-800 px-[30px] py-[12px] border-none text-richblack-200 outline-none dark:bg-white
                              dark:text-richblack-600 text-[16px] font-[600] font-inter leading-[26px]"
                  />
                  <input
                    type="date"
                    value={toDate}
                    onChange={handleToDateChange}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className=" rounded-[0.5rem] bg-richblack-800 px-[30px] py-[12px] border-none text-richblack-200 outline-none dark:bg-white
                    dark:text-richblack-600 text-[16px] font-[600] font-inter leading-[26px]"
                  />
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                    className=" rounded-[0.5rem] bg-richblack-800 px-[30px] py-[12px] border-none text-richblack-200 outline-none dark:bg-white
                    dark:text-richblack-600 text-[16px] font-[600] font-inter leading-[26px] dark:shadow-[2px_2px_10px_[#1f1f1f]]"
                  >
                    {departmentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleFilter}
                    className="border border-richblack-700  rounded-[12px] bg-richblack-800 dark:bg-[#e84949] dark:border-none dark:text-white px-[12px] py-[8px] text-richblack-100
                      shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] font-[600] hover:shadow-none hover:scale-95 transition-all duration-200"
                  >
                    Apply Filter
                  </button>
                </div>
                </div>
          </div>
      {/* <div
        className="text-white flex w-11/12 mx-auto max-w-maxContent justify-between items-center
                      mt-10 border border-richblack-200 py-6"
      >

        <h3 className="text-[#e37222] dark:text-[#e84949] ml-[80px] dark:text-richblack-5' text-[28px] font-[600] font-inter leading-[32px]">
          Title
        </h3>
        <h3 className="text-[#e37222] dark:text-[#e84949] ml-[112px] text-[28px] font-[600] font-inter leading-[32px]">
          Location
        </h3>
        <h3 className="text-[#e37222] dark:text-[#e84949] text-[28px] font-[600] font-inter leading-[32px]">
          Date
        </h3>
        <h3 className="text-[#e37222] dark:text-[#e84949] text-[28px] font-[600] font-inter leading-[32px]">
          Time
        </h3>
        <h3 className="text-[#e37222] dark:text-[#e84949] text-[28px] font-[600] font-inter leading-[32px] mr-[40px] ">
          Option
        </h3>
      </div> */}
      {/* <div className="w-11/12 max-w-maxContent mx-auto flex flex-row justify-between items-center mt-10 text-white">
        <div className="w-full flex flex-col">
  
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="flex justify-evenly items-center py-7 border border-richblack-200 gap-2"
            >
              <p className="text-richblue-25 dark:text-black text-[18px] font-[500] font-inter leading-[26px] w-[25%]">
                {event.title}
              </p>
              <p className="text-richblue-50 dark:text-richblack-700 text-[16px] font-[500] font-inter leading-[26px] w-[20%]">
                {event.venue}
              </p>
              <p className="text-richblue-50 dark:text-richblack-700 text-[16px] font-[500] font-inter leading-[26px] w-[15%]">
                {event.date}
              </p>
              <p className="text-richblue-50 dark:text-richblack-700 text-[16px] font-[500] font-inter leading-[26px] w-[15%]">
                {event.time}
              </p>
              <button
                className="border border-richblack-700 rounded-[8px] bg-richblack-800 px-[12px] py-[8px] dark:bg-[#e84949] dark:border-none
                 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95 transition-all duration-200"
              >
                <Link
                  to={`/event/${event._id}`}
                  className="text-richblack-100 dark:text-richblack-5 text-[13px] font-[600] font-inter leading-[21px]
                                                           w-[20%]"
                >
                  View
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div> */}

    <div className="flex justify-center w-full sm:px-6 px-5 md:px-20 xl:px-0 pb-10">
    <div className="overflow-x-auto w-full rounded-xl  max-w-maxContent">
      <Table>
        <Table.Head className="dark:bg-white bg-gray-600 w-full">
          <Table.HeadCell className="dark:bg-white dark:text-black text-white bg-gray-600">Title</Table.HeadCell>
          <Table.HeadCell className="dark:bg-white dark:text-black text-white bg-gray-600">Location</Table.HeadCell>
          <Table.HeadCell className="dark:bg-white dark:text-black text-white bg-gray-600 ">Date</Table.HeadCell>
          <Table.HeadCell className="dark:bg-white dark:text-black text-white bg-gray-600">Time</Table.HeadCell>
          <Table.HeadCell className="dark:bg-white dark:text-black text-white bg-gray-600">
          Option
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {
          filteredEvents?.map((event,index) => (
            <Table.Row key={index} className="dark:bg-white dark:border-gray-700 bg-gray-800 dark:text-black text-white">
            <Table.Cell className="whitespace-nowrap font-medium dark:text-gray-900 text-white">
             {event?.title}
            </Table.Cell>
            <Table.Cell>{event?.venue}</Table.Cell>
            <Table.Cell>{event?.date}</Table.Cell>
            <Table.Cell>{event?.time}</Table.Cell>
            <Table.Cell>
            <button
                className="border border-richblack-700 rounded-[8px] bg-richblack-800 px-[12px] py-[8px] dark:bg-[#e84949] dark:border-none
                 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95 transition-all duration-200"
              >
                <Link
                  to={`/event/${event._id}`}
                  className="text-richblack-100 dark:text-richblack-5 text-[13px] font-[600] font-inter leading-[21px]
                                                           w-[20%]"
                >
                  View
                </Link>
              </button>
            </Table.Cell>
          </Table.Row>
          ))
        }
          
       
        </Table.Body>
      </Table>
    </div>
    </div>
    </>
  );
};

export default Events;
