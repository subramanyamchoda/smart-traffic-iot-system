import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-traffic-iot-system.onrender.com"
});

export const getTraffic = () => API.get("/api/traffic");

export default API;