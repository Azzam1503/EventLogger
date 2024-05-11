import {useEffect, useState } from "react";
import axios from "axios";

const CreateEvent = () => {
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    venue: "",
  });
  const [image, setImage] = useState("");

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setEventFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

 

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
      });
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

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
          <input
            type="file"
            name="image"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">Create Event</button>
        </form>
    </div>
  );
};

export default CreateEvent
