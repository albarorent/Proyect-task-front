import axios from "axios";

const instance = axios.create({
  //   baseURL: "http://localhost:4000/api",
  baseURL: "https://api-tasks-u571.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default instance;
