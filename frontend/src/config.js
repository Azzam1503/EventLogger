const baseURL =
  process.env.NODE_ENV === "proudction"
    ? "https://eventlogger.onrender.com"
    : "http://localhost:3000";

export default baseURL;
