import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEvent = () => {
  const { id } = useParams();
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

  const [newSpeaker, setNewSpeaker] = useState({ name: "", about: "" });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`https://event-logger-9dd5-b741sl88m-azzam1503s-projects.vercel.app/event/get-event/${id}`);
        setEventData(response.data.event);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchEventData();
  }, [id]);

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventData((prevData) => ({ ...prevData, imageUrl: file }));
  };

  const handleSpeakerChange = (e) => {
    const { name, value } = e.target;
    setNewSpeaker((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddSpeaker = () => {
    if (newSpeaker.name && newSpeaker.about) {
      setEventData((prevData) => ({
        ...prevData,
        speakers: [...prevData.speakers, newSpeaker]
      }));
      setNewSpeaker({ name: "", about: "" });
    }
  };

  const handleRemoveSpeaker = (index) => {
    setEventData((prevData) => ({
      ...prevData,
      speakers: prevData.speakers.filter((_, i) => i !== index)
    }));
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
      eventData.speakers.forEach((speaker, index) => {
        formData.append(`speakers[${index}][name]`, speaker.name);
        formData.append(`speakers[${index}][about]`, speaker.about);
      });

      const response = await axios.put(`https://event-logger-9dd5-b741sl88m-azzam1503s-projects.vercel.app/event/update-event/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });
      navigate(`/event/${id}`);
      console.log("Event updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="w-11/12 max-w-maxContent flex justify-between mx-auto py-14">
      <form onSubmit={handleSubmit} className="w-[50%] flex flex-col mx-auto">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Update Event</h1>
        <br />
        <label htmlFor="title" className="text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">
          Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleFormDataChange}
          placeholder="Title"
          required
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="description" className="text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">
          Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleFormDataChange}
          placeholder="Description"
          required
          className="w-full h-[450px] rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="venue" className="text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">
          Venue <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="venue"
          value={eventData.venue}
          onChange={handleFormDataChange}
          placeholder="Venue"
          required
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="date" className="text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">
          Date <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleFormDataChange}
          required
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="time" className="text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">
          Time <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleFormDataChange}
          required
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="image" className="text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">
          Upload file <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        {/* Render speakers fields */}
        <div>
          <h2 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 mt-4">Speakers</h2>
          <hr className="text-richblack-200" />
          <br />
          {eventData.speakers.map((speaker, index) => (
            <div key={index} className="mb-4">
              <p className="text-richblack-5">{speaker.name} - {speaker.about}</p>
              <button type="button" onClick={() => handleRemoveSpeaker(index)}
                className="mt-2 rounded-[8px] bg-red-400 py-[8px] px-[12px] font-medium text-richblack-25">Remove</button>
            </div>
          ))}
          <label htmlFor="newSpeakerName" className="text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">
            Name of Speaker <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="name"
            value={newSpeaker.name}
            onChange={handleSpeakerChange}
            placeholder="Speaker Name"
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 mt-2 outline-none"
          />
          <label htmlFor="newSpeakerAbout" className="text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">
            About Speaker <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="about"
            value={newSpeaker.about}
            onChange={handleSpeakerChange}
            placeholder="About Speaker"
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 mt-2 outline-none"
          />
          <button type="button" onClick={handleAddSpeaker}
            className="mt-4 rounded-[8px] bg-blue-400 py-[8px] px-[12px] font-medium text-richblack-25">Add Speaker</button>
        </div>
        <button type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEvent;
