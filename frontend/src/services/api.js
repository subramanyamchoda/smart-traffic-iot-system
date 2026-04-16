import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-traffic-iot-system.onrender.com"
});

/* LIVE TRAFFIC */
export const getTraffic = () => API.get("/api/traffic");


/* VIDEO STREAM URL */
export const VIDEO_STREAM = "https://smart-traffic-iot-system.onrender.com/video";

export default API;