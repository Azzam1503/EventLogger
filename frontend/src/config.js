const baseURL =
  process.env.NODE_ENV === "proudction"
    ? "https://your-production-url.com"
    : "http://localhost:3000";

export default baseURL;
