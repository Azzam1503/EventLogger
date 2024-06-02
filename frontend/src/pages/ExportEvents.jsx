import {useState} from "react";
import axios from "axios";

const ExportEvents = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [department, setDepartment] = useState("");
  const exportEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/event/downloadEvents",
        {
        params: {
                fromDate,
                toDate,
                department,
            },
          responseType: "blob",
        }
      );
      console.log(res);
      // Create a URL for the blob object
      const url = window.URL.createObjectURL(new Blob([res.data]));

      // Create a link element
      const link = document.createElement("a");

      // Set the download attribute with a filename
      link.href = url;
      link.setAttribute("download", "events.xlsx");

      // Append the link to the body
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up by removing the link and revoking the object URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log(error)
    }
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
    <div className="max-w-maxContent mx-auto justify-center items-center w-[50%] gap-10 mt-10">
        <h1 className="text-[2.8rem] font-semibold leading-[2.375rem] text-blue-100 dark:text-[#e84949]"
                 ><i> Download All Events in Excel Sheet</i></h1>

            <div className="flex flex-col gap-4">
                 <label
                    htmlFor="Starting Date"
                    className="text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600]
                       dark:text-[16px] mt-10"
                  >
                    Starting Date <sup className="text-pink-200">*</sup>
                  </label>
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    placeholder="From Date"
                    style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-300 outline-none
                                    dark:bg-white dark:text-richblack-700 font-[600]"
                />
                <label
                    htmlFor="Ending Date"
                    className="text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[16px]"
                  >
                    Ending Date <sup className="text-pink-200">*</sup>
                  </label>
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    placeholder="To Date"
                    style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-300 outline-none
                                      dark:bg-white dark:text-richblack-700 font-[600]"
                />
            
                  <label
                    htmlFor="department"
                    className="text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-700 dark:font-[600] dark:text-[16px]"
                  >
                    Department <sup className="text-pink-200">*</sup>
                  </label>
                <select
                  name="department"
                  id="department"
                  value={department}
                  required
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                              }}
                            className=" rounded-[0.5rem] bg-richblack-800 px-[30px] py-[12px] border-none text-richblack-200 outline-none dark:bg-white
                            dark:text-richblack-500 text-[16px] font-[600] font-inter leading-[26px] dark:shadow-[2px_2px_10px_[#1f1f1f]]"
                  >
                  {departmentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button onClick={exportEvents}
                className="mt-6 bg-yellow-50 text-black text-[13px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                          hover:shadow-none hover:scale-95 transition-all duration-200 dark:bg-[#e84949] dark:text-richblack-5"
                >Export Events</button>
            </div>
    </div>
  );
};

export default ExportEvents;
