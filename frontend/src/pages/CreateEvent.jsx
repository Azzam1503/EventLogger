import { useContext, useEffect, useState } from "react";
import { IoTimer } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import Spinner from "../components/Spinner";
import UserContext from "../context/UserContext";


const CreateEvent = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    department: ""
  });

  const [image, setImage] = useState("");
  console.log(image);
  const [speaker, setSpeaker] = useState({
    id: null,
    name: "",
    about: "",
  });
  const [speakers, setSpeakers] = useState([]);
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setEventFormData((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const speakerDataChange = (e) => {
    const { name, value } = e.target;
    setSpeaker((prevData) => ({ ...prevData, [name]: value }));
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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", eventFormData.title);
      formData.append("description", eventFormData.description);
      formData.append("venue", eventFormData.venue);
      formData.append("event-pic", image);
      formData.append("date", eventFormData.date);
      formData.append("time", eventFormData.time);
      formData.append("department", eventFormData.department);

      for (let i = 0; i < speakers.length; i++) {
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
          withCredentials: true,
        }
      );
      navigate(`/event/${response.data.newEvent._id}`);
      setLoading(false);
      setEventFormData({
        title: "",
        description: "",
        venue: "",
        date: "",
        time: "",
      });
      setImage("");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const appendSpeaker = () => {
    const newSpeaker = {
      id: parseInt(speakers.length + 1),
      name: speaker.name,
      about: speaker.about,
    };
    setSpeakers((prevSpeaker) => [...prevSpeaker, newSpeaker]);
    setSpeaker({
      name: "",
      about: "",
    });
  };

  const deleteSpeaker = (id) => {
    const filtered = speakers.filter((speaker) => speaker.id != id);
    setSpeakers(filtered);
  };

  const departmentOptions = [
    { value: "", label: "Select a department" },
    { value: "uni", label: "University" },
    { value: "cs", label: "Computer Science" },
    { value: "ei", label: "Electrical" },
    { value: "ch", label: "Chemical" },
    { value: "mh", label: "Mechanical" },
    { value: "ec", label: "Electronics" },
    { value: "math", label: "Maths" }
  ];

  return (
    <div className="w-full max-w-maxContent flex justify-center mx-auto py-14 px-5 md:px-0">
    {
      loading ? <Spinner/> :  <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4 mt-[20px] w-full md:w-[50%]"
      >
        <h1 className="text-[3rem] font-semibold leading-[2.375rem] text-yellow-50 dark:text-[#e84949] dark:shadow-md dark:py-3 dark:w-full">
          Create Event<spam className="">..</spam>
        </h1>
        <hr className="text-yellow-200 dark:text-[#e84949] max-w-[625px]" />
        <br/>

        <label
          htmlFor="title"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
        >
          Title <sup className="text-pink-200">*</sup>
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none
                          dark:bg-white dark:text-richblack-700"
        />

        <label
          htmlFor="title"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
        >
          Description <sup className="text-pink-200">*</sup>
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none h-[250px]
                      dark:bg-white dark:text-richblack-700"
        />

        <label
          htmlFor="title"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
        >
          Venue <sup className="text-pink-200">*</sup>
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none
                        dark:bg-white dark:text-richblack-700"
        />

        <label
          htmlFor="title"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
        >
          Upload Image <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-100 outline-none file:font-[600] file:font-inter
                       file:bg-richblack-700 file:text-richblack-25 file:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] file:hover:shadow-none
                          file:hover:scale-95 transition-all duration-200 file:px-5 file:py-2 file:border-none file:rounded-[8px] file:text-[13px]
                          dark:bg-white dark:text-richblack-700 file:dark:bg-[#e84949] file:dark:text-richblack-5"
        />

        <label
          htmlFor="title"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
        >
          Select Date <sup className="text-pink-200">*</sup>
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-300 outline-none
                       dark:bg-white dark:text-richblack-700"
        />

        {/* Time input */}
        <label
          htmlFor="title"
          className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
        >
          Select Time <sup className="text-pink-200">*</sup>
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
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-300 outline-none
                            dark:bg-white dark:text-richblack-700"
        />

        <div>
          <h2 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 mt-2 dark:text-[#e84949]">
            Add speakers
          </h2>
          <hr className="text-richblack-200 dark:text-[#e84949]" />
          <br />
          <label
            htmlFor="speakerName"
            className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
          >
            Name of speaker <sup className="text-pink-200">*</sup>
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
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none mt-2 mb-2 
                             dark:bg-white dark:text-richblack-700"
          />

          <br />

          <label
            htmlFor="speakerAbout"
            className=" text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
          >
            About the Speaker <sup className="text-pink-200">*</sup>
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
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none mt-2
                        dark:bg-white dark:text-richblack-700"
          />

          <button
            type="button"
            onClick={appendSpeaker}
            className="mt-6 text-[13px] px-6 py-3 rounded-md font-bold bg-richblack-800 text-richblack-25 
                           shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95
                                     transition-all duration-200 flex items-center gap-2 dark:bg-white dark:text-richblack-700"
          >
            Add speaker <IoIosAdd className="text-[20px]" />
          </button>
        </div>
        <ul className="flex flex-col gap-3">
          {speakers.map((speaker) => (
            <li
              key={speaker.id}
              className="bg-richblack-800 px-[12px] py-[8px] flex gap-6 rounded-[8px] dark:bg-white"
            >
              <div className="w-[85%] py-2 flex flex-col space-y-3">
                <h className="text-richblack-5 dark:text-richblack-700 font-[600] text-[24px]">
                  {speaker.name}
                </h>
                <p className="text-richblack-25 dark:text-richblack-600 w-[90%]">{speaker.about}</p>
              </div>

              <button
                type="button"
                onClick={() => deleteSpeaker(speaker.id)}
                className="flex my-auto items-center gap-2 h-[40px] text-[18px] px-6 py-3 rounded-md font-bold bg-richblack-700 text-pink-200 
                           shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] first-line: hover:shadow-none hover:scale-95
                             transition-all duration-200 dark:text-richblack-5 dark:bg-[#e84949]"
              >
                <MdDeleteForever />
              </button>
            </li>
          ))}
        </ul>
        <label
          htmlFor="department"
          className="text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
        >
          Department <sup className="text-pink-200">*</sup>
        </label>
        <select
          name="department"
          id="department"
          value={eventFormData.department}
          required
          onChange={handleFormDataChange}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none
                        dark:bg-white dark:text-richblack-700"
        >
          {departmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="mt-6 bg-yellow-50 text-black text-[13px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                          hover:shadow-none hover:scale-95 transition-all duration-200 dark:bg-[#e84949] dark:text-richblack-5"
        >
          Create Event
        </button>
      </form>
    } 
     
    </div>
  );
};

export default CreateEvent;
