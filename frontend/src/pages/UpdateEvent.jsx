import { useEffect, useState } from "react";
import axios from "axios";

const UpdateEvent = () => {
    const [updateFormData, setUpdateFormData] = useState({
        id: null,
        title: "",
        description: "",
        venue: "",
      });    
    const updateFromDataChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData((prevForm) => ({ ...prevForm, [name]: value }));
    };

    // useEffect(() => {
    //     fetchEvent();
    // },[]);

    // const fetchEvent = async () => {
    //     const response = axios.fetch("http://localhost:3000/")
    // }

    const [image, setImage] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", updateFormData.title);
            formData.append("description", updateFormData.description);
            formData.append("venue", updateFormData.venue);
            formData.append("event-pic", image);

          const response = await axios.put(
            `http://localhost:3000/event/update-event/${updateFormData.id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
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
    
  return (
    <div>
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
    </div>
  )
}

export default UpdateEvent
