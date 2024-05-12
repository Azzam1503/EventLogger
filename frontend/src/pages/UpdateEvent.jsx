import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEvent = ({ eventId }) => {
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
  }; 20

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

      const response = await axios.put(`http://localhost:3000/event/update-event/${id}`, formData, {
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
    <div className="w-11/12 max-w-maxContent flex justify-between mx-auto py-14">
      <form onSubmit={handleSubmit}
        className="w-[50%] flex flex-col mx-auto"
      >
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Update Event</h1>
        <br />
        <label htmlFor="speakerName"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="title"
          value={eventData.title}
          onChange={handleFormDataChange}
          placeholder="Title"
          required
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="speakerName"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          name="description"
          value={eventData.description}
          onChange={handleFormDataChange}
          placeholder="Description"
          required
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full h-[450px] rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="speakerName"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">Venue <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          name="venue"
          value={eventData.venue}
          onChange={handleFormDataChange}
          placeholder="Venue"
          required
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="speakerName"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">Date <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleFormDataChange}
          required
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="speakerName"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">Time <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleFormDataChange}
          required
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />

        <label htmlFor="speakerName"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">Uploade file <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none"
        />
        {/* Render speakers fields */}
        <div>
          <h2 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 mt-4">Speakers</h2>
          <hr className="text-richblack-200" />
          <br />
          {eventData.speakers && eventData.speakers.map((speaker) => (
            <div key={speaker._id}>
              <label htmlFor="speakerName"
                className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">Name of Speaker <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="text"
                value={speaker.name}
                onChange={(e) => handleSpeakerChange(speaker._id, "name", e.target.value)}
                placeholder="Speaker Name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 mt-2 outline-none"
              />
              <br />
              <br />
              <label htmlFor="speakerName"
                className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 py-2">About of Speaker <sup className="text-pink-200">*</sup>
              </label>
              <input
                type="text"
                value={speaker.about}
                onChange={(e) => handleSpeakerChange(speaker._id, "about", e.target.value)}
                placeholder="About Speaker"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 mt-2 outline-none"
              />
              <button type="button" onClick={handleAddSpeaker}
                className="mt-6 rounded-[8px] bg-blue-400 py-[8px] px-[12px] font-medium text-richblack-25">Add Speaker</button>
            </div>
          ))}
          <button type="button" onClick={() => handleRemoveSpeaker(speaker._id)}
            className="mt-6 rounded-[8px] bg-blue-400 py-[8px] px-[12px] font-medium text-richblack-25">Remove Speaker</button>
        </div>
        <button type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEvent


