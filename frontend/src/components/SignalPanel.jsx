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
        const res = await fetch("https://smart-traffic-iot-system.onrender.com/api/traffic");
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

  const glow = {
    green: "shadow-[0_0_25px_rgba(52,211,153,0.3)]",
    red: "shadow-[0_0_25px_rgba(248,113,113,0.3)]",
    yellow: "shadow-[0_0_25px_rgba(251,191,36,0.3)]"
  };

  const statusColor = colors[s] || "text-slate-400";
  const statusGlow = glow[s] || "";

  const light = (color) => {

    const active = s === color;

    const base = "w-16 h-16 rounded-full transition-all duration-500";

    const styles = {
      red: active ? "bg-red-500 shadow-[0_0_20px_red]" : "bg-red-900/40",
      yellow: active ? "bg-yellow-400 shadow-[0_0_20px_yellow]" : "bg-yellow-900/40",
      green: active ? "bg-emerald-500 shadow-[0_0_20px_emerald]" : "bg-emerald-900/40"
    };

    return `${base} ${styles[color]}`;
  };

  return (

    <div className="flex flex-col items-center mt-10 gap-10">

      <div className="flex flex-col md:flex-row gap-10 items-center">

        {/* TRAFFIC LIGHT */}

       

<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="bg-slate-900/70 backdrop-blur-xl border border-slate-700/40 
             p-6 rounded-2xl flex items-center justify-center gap-10 
             shadow-xl"
>

  {/* RED */}
  <div className="flex items-center gap-3">
    <div className={light("red")} />
    <span className="text-red-400 font-bold tracking-wide">RED</span>
  </div>

  {/* YELLOW */}
  <div className="flex items-center gap-3">
    <div className={light("yellow")} />
    <span className="text-yellow-400 font-bold tracking-wide">YELLOW</span>
  </div>

  {/* GREEN */}
  <div className="flex items-center gap-3">
    <div className={light("green")} />
    <span className="text-emerald-400 font-bold tracking-wide">GREEN</span>
  </div>

</motion.div>

        {/* SIGNAL PANEL */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/60 p-1 backdrop-blur-xl ${statusGlow}`}
        >

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 relative z-10">

            {/* STATUS */}

            <div className="flex flex-col items-center justify-center p-6 bg-slate-800/40 rounded-t-xl md:rounded-l-xl md:rounded-tr-none border-b md:border-b-0 md:border-r border-slate-700/30">

              <div className="flex items-center gap-2 mb-2">
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
                  className={`text-4xl font-black italic tracking-tighter ${statusColor}`}
                >
                  {signal}
                </motion.h2>
              </AnimatePresence>

            </div>


            {/* TIME */}

            <div className="flex flex-col items-center justify-center p-6 bg-slate-800/40 border-b md:border-b-0 md:border-r border-slate-700/30">

              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Remaining Time
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-mono font-bold text-white">
                  {time}
                </span>
                <span className="text-lg text-slate-500">s</span>
              </div>

            </div>


            {/* SPEED */}

            <div className="flex flex-col items-center justify-center p-6 bg-slate-800/40 rounded-b-xl md:rounded-r-xl md:rounded-bl-none">

              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Avg Flow Speed
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/50 px-4 py-2 rounded-full border border-indigo-500/20">

                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <Gauge className="w-6 h-6 text-indigo-400" />
                </motion.div>

                <h2 className="text-2xl font-bold text-white">
                  {speed}
                  <span className="text-sm text-slate-400"> km/h</span>
                </h2>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );
}