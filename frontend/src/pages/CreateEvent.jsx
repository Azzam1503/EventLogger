import {useEffect, useState } from "react";
import { IoTimer } from "react-icons/io5";
import axios from "axios";


const CreateEvent = () => {
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: ""
  });
  const [image, setImage] = useState("");
  console.log(image)
  const [speaker, setSpeaker] = useState({
    id: null,
    name: "",
    about: ""
  })
  const [speakers, setSpeakers] = useState([]);

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setEventFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const speakerDataChange = (e) => {
    const {name, value} = e.target;
    setSpeaker((prevData) => ({...prevData, [name]: value}));
  }

 

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(
//         "http://localhost:3000/event/delete-event/" + id
//       );
//       console.log("event deleted successfully");
//     } catch (error) {
//       console.log("error while deleting the event");
//     }

//     const remainingEvents = events.filter((event) => event._id != id);
//     setEvents(remainingEvents);
//   };

  
  const toggleUpdate = (event) => {
    setUpdateFormData({
      id: event._id,
      title: event.title,
      description: event.description,
      venue: event.venue,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const formData = new FormData();
    formData.append("title", eventFormData.title);
    formData.append("description", eventFormData.description);
    formData.append("venue", eventFormData.venue);
    formData.append("event-pic", image);
    formData.append("date", eventFormData.date);
    formData.append("time", eventFormData.time);

    for(let i = 0; i<speakers.length; i++){
      formData.append(`speakers[${i}][name]`, speakers[i].name);
      formData.append(`speakers[${i}][about]`, speakers[i].about);
    }

      const response = await axios.post(
        "http://localhost:3000/event/create-event",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      );
      console.log(response);
      setEventFormData({
        title: "",
        description: "",
        venue: "",
        date: "",
        time: ""
      });
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  const appendSpeaker = () => {
    const newSpeaker = {
      id: parseInt(speakers.length+1),
      name: speaker.name,
      about: speaker.about
    }
    setSpeakers((prevSpeaker) => [...prevSpeaker, newSpeaker]);
    setSpeaker({
      name: "",
      about: ""
    });
  }

  const deleteSpeaker = (id) => {
    const filtered = speakers.filter((speaker) => speaker.id != id);
    setSpeakers(filtered);
  }

  
  return (
    <div className="w-11/12 max-w-maxContent flex justify-center mx-auto py-14">

        <form onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 mt-[20px] w-[50%]"
        >
          <h1 className="text-[2.5rem] font-semibold leading-[2.375rem] text-yellow-50"
            >Create Event<spam className="">..</spam></h1>
            <hr className="text-richblack-200 w-[625px]"/>
 

          <label htmlFor="title"
              className=" text-[0.875rem] leading-[1.375rem] text-richblack-5">Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={eventFormData.title}
            placeholder="Enter the title..."
            required
            onChange={handleFormDataChange}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
          />

          <label htmlFor="title"
              className=" text-[0.875rem] leading-[1.375rem] text-richblack-5">Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            type="text"
            name="description"
            value={eventFormData.description}
            placeholder="Enter the description..."
            required
            onChange={handleFormDataChange}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none h-[250px]"
          />

          <label htmlFor="title"
              className=" text-[0.875rem] leading-[1.375rem] text-richblack-5">Venue <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="venue"
            value={eventFormData.venue}
            placeholder="Enter the venue..."
            required
            onChange={handleFormDataChange}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
          />

          <label htmlFor="title"
              className=" text-[0.875rem] leading-[1.375rem] text-richblack-5">Upload Image <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="file"
            name="image"
            required
            onChange={(e) => setImage(e.target.files[0])}
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-300 outline-none"
          />

          <label htmlFor="title"
              className=" text-[0.875rem] leading-[1.375rem] text-richblack-5">Select Date <sup className="text-pink-200">*</sup>
          </label>
           <input
          type="date"
          name="date"
          value={eventFormData.date}
          required
          onChange={handleFormDataChange}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-300 outline-none"
        />

        {/* Time input */}
        <label htmlFor="title"
              className=" text-[0.875rem] leading-[1.375rem] text-richblack-5">Select Time <sup className="text-pink-200">*</sup>
          </label>
        <input
          type="time"
          name="time"
          value={eventFormData.time}
          required
          onChange={handleFormDataChange}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-300 outline-none"
        />
          
          

          <div>
            <h2  className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 mt-2">Add speakers</h2>
            <hr className="text-richblack-200"/>
            <br/>
            <label htmlFor="speakerName"
               className=" text-[0.875rem] leading-[1.375rem] text-richblack-5">Name of speaker <sup className="text-pink-200">*</sup>
            </label>
            <br />
            <input 
              type="text" 
              id="speakerName" 
              name="name" 
              placeholder="Enter speaker name..." 
              onChange={speakerDataChange}
              style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none mt-2 mb-2"
               />
              
          <br />

            <label htmlFor="speakerAbout"
             className=" text-[0.875rem] leading-[1.375rem] text-richblack-5">About the Speaker <sup className="text-pink-200">*</sup>
            </label>
            <br />
            <input 
              type="text" 
              id="speakerAbout" 
              name="about" 
              placeholder="Enter about speaker..." 
              onChange={speakerDataChange} 
              style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none mt-2"
              />

              <button type="button" onClick={appendSpeaker}
                className="mt-6 rounded-[8px] bg-blue-400 py-[6px] px-[8px] font-medium text-richblack-25">Add speaker
              </button>
          </div>
          <ul>{speakers.map((speaker) => (
              <li key={speaker.id} className="text-richblack-25">
                {speaker.name}
                {speaker.about}
                <button type="button" onClick={() => deleteSpeaker(speaker.id)}>Delete</button>
              </li>
          ))}</ul>
         
          <button type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Create Event
          </button>
        </form>
    </div>
  );
};

export default CreateEvent
