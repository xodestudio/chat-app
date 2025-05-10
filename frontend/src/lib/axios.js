import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : `${import.meta.env.VITE_BACKEND_URL}/api`.replace(/([^:]\/)\/+/g, "$1"), // Removes double slashes
  withCredentials: true,
});
