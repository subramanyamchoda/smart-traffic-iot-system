import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Radio, Clock, Zap } from "lucide-react";

export default function SignalPannel() {

  const [traffic, setTraffic] = useState({
    signal: "RED",
    signal_time: 0,
    avg_speed: 0
  });

  useEffect(() => {

    const fetchTraffic = async () => {
      try {
        const res = await fetch(
          "https://smart-traffic-iot-system.onrender.com/api/traffic"
        );
        const data = await res.json();
        setTraffic(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTraffic();
    const interval = setInterval(fetchTraffic, 1000);

    return () => clearInterval(interval);

  }, []);

  const signal = traffic.signal;
  const time = traffic.signal_time;
  const speed = traffic.avg_speed;

  const s = signal?.toLowerCase();

  const colors = {
    green: "text-emerald-400",
    red: "text-red-400",
    yellow: "text-yellow-400"
  };

  const statusColor = colors[s] || "text-slate-400";

  const light = (color) => {
    const active = s === color;

    const base =
      "w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full transition-all duration-500";

    const styles = {
      red: active
        ? "bg-red-500 shadow-[0_0_20px_red]"
        : "bg-red-900/40",
      yellow: active
        ? "bg-yellow-400 shadow-[0_0_20px_yellow]"
        : "bg-yellow-900/40",
      green: active
        ? "bg-emerald-500 shadow-[0_0_20px_emerald]"
        : "bg-emerald-900/40"
    };

    return `${base} ${styles[color]}`;
  };

  return (
    <div className="w-full flex flex-col items-center mt-6 sm:mt-10 px-3 sm:px-6">

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">

        {/* TRAFFIC LIGHT */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full lg:w-auto bg-slate-900/70 backdrop-blur-xl border border-slate-700/40 
                     p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 shadow-xl"
        >

          {/* RED */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={light("red")} />
            <span className="text-red-400 font-bold text-sm sm:text-base">
              RED
            </span>
          </div>

          {/* YELLOW */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={light("yellow")} />
            <span className="text-yellow-400 font-bold text-sm sm:text-base">
              YELLOW
            </span>
          </div>

          {/* GREEN */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={light("green")} />
            <span className="text-emerald-400 font-bold text-sm sm:text-base">
              GREEN
            </span>
          </div>

        </motion.div>

        {/* SIGNAL PANEL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >

          {/* STATUS */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/30 
                          p-4 sm:p-6 rounded-2xl text-center">

            <div className="flex items-center justify-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-slate-400 animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Signal Status
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.h2
                key={signal}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`text-2xl sm:text-3xl md:text-4xl font-black ${statusColor}`}
              >
                {signal}
              </motion.h2>
            </AnimatePresence>

          </div>

          {/* TIME */}
          <div className="bg-slate-800/40 border border-slate-700/30 
                          p-4 sm:p-6 rounded-2xl text-center">

            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Remaining Time
              </p>
            </div>

            <div className="flex items-baseline justify-center gap-1">
              <span className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-white">
                {time}
              </span>
              <span className="text-sm text-slate-500">s</span>
            </div>

          </div>

          {/* SPEED */}
          <div className="bg-slate-800/40 border border-slate-700/30 
                          p-4 sm:p-6 rounded-2xl text-center">

            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Avg Flow Speed
              </p>
            </div>

            <div className="flex items-center justify-center gap-2">

              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <Gauge className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />
              </motion.div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {speed}
                <span className="text-sm text-slate-400"> km/h</span>
              </h2>

            </div>

          </div>

        </motion.div>

      </div>

    </div>
  );
}