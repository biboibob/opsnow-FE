import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_HTTPS === "true" ? "https" : "http"}://${
    process.env.REACT_APP_API_URL
  }/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});
