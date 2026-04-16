import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

/* LIVE TRAFFIC */
export const getTraffic = () => API.get("/api/traffic");


/* VIDEO STREAM URL */
export const VIDEO_STREAM = "http://localhost:5000/video";

export default API;