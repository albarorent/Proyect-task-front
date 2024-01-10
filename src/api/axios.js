import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api-tasks-u571.onrender.com/api',
    withCredentials: true
})

export default instance;