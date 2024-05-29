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
    <div className="">
            <div className="flex flex-col gap-4">
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border rounded px-2 py-1"
                    placeholder="From Date"
                />
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border rounded px-2 py-1"
                    placeholder="To Date"
                />
                  <label
          htmlFor="department"
          className="text-[0.875rem] leading-[1.375rem] text-richblack-5 dark:text-richblack-600 dark:font-[600] dark:text-[18px]"
        >
          Department <sup className="text-pink-200">*</sup>
        </label>
        <select
          name="department"
          id="department"
          value={department}
          required
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] border-none text-richblack-5 outline-none
                        dark:bg-white dark:text-richblack-700"
        >
          {departmentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
                <button onClick={exportEvents} className="bg-blue-500 text-white rounded px-4 py-1">Export Events</button>
            </div>
    </div>
  );
};

export default ExportEvents;
