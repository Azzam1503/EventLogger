import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const UpdateEvent = ({ eventId }) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    imageUrl: "",
    speakers: [] 
  });

  // const [speaker, setSpeaker] = {
  //   name: "",
  //   about: ""
  // }
  console.log(eventData)
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/event/get-event/${id}`);
        console.log(response)
        setEventData(response.data.event);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, [eventId]);

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventData((prevData) => ({ ...prevData, imageUrl: file }));
  };20

  const handleSpeakerChange = (index, field, value) => {
    setEventData((prevData) => {
      const updatedSpeakers = [...prevData.speakers];
      updatedSpeakers[index][field] = value;
      return { ...prevData, speakers: updatedSpeakers };
    });
  };

  const handleAddSpeaker = () => {
    setEventData((prevData) => ({
      ...prevData,
      speakers: [...prevData.speakers, { name: "", about: "" }]
    }));
  };

  const handleRemoveSpeaker = (id) => {
    setEventData((prevData) => ({
      ...prevData,
      speakers: prevData.speakers.filter((speaker) => speaker._id != id)
    }));
    console.log(eventData.speakers)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("description", eventData.description);
      formData.append("venue", eventData.venue);
      formData.append("date", eventData.date);
      formData.append("time", eventData.time);
      formData.append("imageUrl", eventData.imageUrl);
      // Append speakers
      eventData.speakers.forEach((speaker, index) => {
        formData.append(`speakers[${index}][name]`, speaker.name);
        formData.append(`speakers[${index}][about]`, speaker.about);
      });

      const response = await axios.put(`http://localhost:3000/event/update-event/${id}`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      navigate(`/event/${id}`)
      console.log("Event updated successfully:", response.data);
      // Redirect to event details page or any other page
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div>
      <h1>Update Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleFormDataChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleFormDataChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="venue"
          value={eventData.venue}
          onChange={handleFormDataChange}
          placeholder="Venue"
          required
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleFormDataChange}
          required
        />
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleFormDataChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        {/* Render speakers fields */}
        <div>
          <h2>Speakers</h2>
          {eventData.speakers && eventData.speakers.map((speaker) => (
            <div key={speaker._id}>
              <input
                type="text"
                value={speaker.name}
                onChange={(e) => handleSpeakerChange(speaker._id, "name", e.target.value)}
                placeholder="Speaker Name"
              />
              <input
                type="text"
                value={speaker.about}
                onChange={(e) => handleSpeakerChange(speaker._id, "about", e.target.value)}
                placeholder="About Speaker"
              />
              <button type="button" onClick={() => handleRemoveSpeaker(speaker._id)}>Remove Speaker</button>
            </div>
          ))}
          <button type="button" onClick={handleAddSpeaker}>Add Speaker</button>
        </div>
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEvent
