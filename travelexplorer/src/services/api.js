import axios from "axios";

const api = axios.create({
 baseURL: "https://traveler-backend-1.onrender.com"
});

export default api;