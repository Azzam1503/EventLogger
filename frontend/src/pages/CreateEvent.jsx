import {useEffect, useState } from "react";
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
    <div>
      Event
        <form onSubmit={handleSubmit}>
          <h1>Create Event</h1>
          <input
            type="text"
            name="title"
            value={eventFormData.title}
            placeholder="title"
            required
            onChange={handleFormDataChange}
          />
          <textarea
            type="text"
            name="description"
            value={eventFormData.description}
            placeholder="description"
            required
            onChange={handleFormDataChange}
          />
          <input
            type="text"
            name="venue"
            value={eventFormData.venue}
            placeholder="venue"
            required
            onChange={handleFormDataChange}
          />
          <br />
          <input
            type="file"
            name="image"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
           <input
          type="date"
          name="date"
          value={eventFormData.date}
          required
          onChange={handleFormDataChange}
        />
        {/* Time input */}
        <input
          type="time"
          name="time"
          value={eventFormData.time}
          required
          onChange={handleFormDataChange}
        />
          <div>
            <br />
            <h2>Add speakers</h2>
            <label htmlFor="speakerName">Name of speaker</label>
            <br />
            <input 
              type="text" 
              id="speakerName" 
              name="name" 
              placeholder="speaker name" 
              onChange={speakerDataChange} />
              <br />
            <label htmlFor="speakerAbout">About the Speaker</label>
            <br />
            <input 
              type="text" 
              id="speakerAbout" 
              name="about" 
              placeholder="about" 
              onChange={speakerDataChange} />

              <button type="button" onClick={appendSpeaker}>Add speaker</button>
          </div>
          <ul>{speakers.map((speaker) => (
              <li key={speaker.id}>
                {speaker.name}
                {speaker.about}
                <button type="button" onClick={() => deleteSpeaker(speaker.id)}>Delete</button>
              </li>
          ))}</ul>
          <br />
          <br />
          <br />
          <button type="submit">Create Event</button>
        </form>
    </div>
  );
};

export default CreateEvent
