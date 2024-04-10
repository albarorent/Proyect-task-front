import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
  // baseURL: "https://api-tasks-u571.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
