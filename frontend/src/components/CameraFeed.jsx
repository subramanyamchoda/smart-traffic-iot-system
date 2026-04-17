import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Camera,
  Scan,
  CheckCircle,
  Gauge,
  Activity
} from "lucide-react";

export default function CameraFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [detections, setDetections] = useState(0);
  const [status] = useState("LIVE");

  useEffect(() => {
    let stream;
    let interval;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });

        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();

        // 📡 Send frames to backend
        interval = setInterval(() => {
          const video = videoRef.current;
          const canvas = canvasRef.current;

          if (!video || !canvas) return;
          if (!video.videoWidth) return;
          if (video.readyState < 2) return;

          const ctx = canvas.getContext("2d");

          canvas.width = 640;
          canvas.height = 480;

          ctx.drawImage(video, 0, 0, 640, 480);

          canvas.toBlob(async (blob) => {
            if (!blob) return;

            const formData = new FormData();
            formData.append("frame", blob, "frame.jpg");

            try {
              const res = await axios.post(
                "https://smart-traffic-iot-system.onrender.com/process-frame",
                formData
              );

              // ✔ safe update only
              if (res.data?.detections !== undefined) {
                setDetections(res.data.detections);
              }

            } catch (err) {
              console.log("Backend error:", err.message);
            }

          }, "image/jpeg", 0.7);

        }, 1200); // 🔥 SAFE FOR RENDER

      } catch (err) {
        console.log("Camera error:", err);
      }
    }

    startCamera();

    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-black">

      {/* VIDEO FEED */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full aspect-video object-cover"
      />

      {/* HIDDEN CANVAS */}
      <canvas ref={canvasRef} className="hidden" />

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80">

        <div className="flex items-center gap-2">
          <Camera className="text-cyan-400 w-5 h-5" />
          <span className="text-white font-bold text-sm">
            AI TRAFFIC MONITOR
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Activity className="w-4 h-4 text-cyan-400" />
          LIVE FEED
        </div>

      </div>

      {/* SCAN FRAME */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70%] h-[70%] border border-cyan-400/30 rounded-2xl" />
      </div>

      {/* RIGHT SIDE INDICATORS */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-cyan-500 rounded-full" />
        <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
      </div>

      {/* BOTTOM HUD */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 flex justify-between items-center">

        {/* STATUS */}
        <div className="flex items-center gap-2 text-green-400 font-bold text-sm">
          <CheckCircle className="w-4 h-4" />
          {status}
        </div>

        {/* DETECTIONS */}
        <div className="text-white text-sm flex items-center gap-2">
          <Scan className="w-4 h-4 text-cyan-400" />
          Vehicles:
          <span className="text-cyan-400 font-bold text-lg">
            {detections}
          </span>
        </div>

        {/* INTENSITY BAR */}
        <div className="flex items-center gap-2">
          <Gauge className="text-cyan-400 w-4 h-4" />
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-500"
              style={{ width: `${Math.min(detections * 10, 100)}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}