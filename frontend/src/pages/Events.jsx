import React, { Children, useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    venue: "",
  });
  const [image, setImage] = useState("");

  const [updateFormData, setUpdateFormData] = useState({
    id: null,
    title: "",
    description: "",
    venue: "",
  });

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

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setEventFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const updateFromDataChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/event/delete-event/" + id
      );
      console.log("event deleted successfully");
    } catch (error) {
      console.log("error while deleting the event");
    }

    const remainingEvents = events.filter((event) => event._id != id);
    setEvents(remainingEvents);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { title, description, venue } = updateFormData;
      const response = await axios.put(
        `http://localhost:3000/event/update-event/${updateFormData.id}`,
        {
          title,
          description,
          venue,
        }
      );
      console.log(response);

      const newEvents = [...events];
      const eventIndex = events.findIndex((event) => {
        return event._id == updateFormData.id;
      });

      newEvents[eventIndex] = response.data.event;
      setEvents(newEvents);

      setUpdateFormData({
        id: null,
        title: "",
        description: "",
        venue: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    console.log(image)
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
      setEvents([...events, response.data.newEvent]);
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
          <button onClick={() => toggleUpdate(event)}>Update</button>
          <button onClick={() => handleDelete(event._id)}>Delete</button>
        </div>
      ))}
      {!updateFormData.id && (
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
      )}
      {updateFormData.id && (
        <form onSubmit={handleUpdate}>
          <h1>Update Event</h1>
          <input
            type="text"
            name="title"
            value={updateFormData.title}
            placeholder="title"
            required
            onChange={updateFromDataChange}
          />
          <textarea
            type="text"
            name="description"
            value={updateFormData.description}
            placeholder="description"
            required
            onChange={updateFromDataChange}
          />
          <input
            type="text"
            name="venue"
            value={updateFormData.venue}
            placeholder="venue"
            required
            onChange={updateFromDataChange}
          />
          <button type="submit">Update Event</button>
        </form>
      )}
    </div>
  );
};

export default Events;
