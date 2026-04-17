import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTraffic } from "../services/api";

import CameraFeed from "../components/CameraFeed";
import VehicleCard from "../components/VehicleCard";
import SignalPanel from "../components/SignalPanel";
import Charts from "../components/Charts";

import {
  Car,
  Bike,
  Bus,
  Truck,
  LayoutDashboard,
  Activity
} from "lucide-react";

export default function Dashboard() {
  const [traffic, setTraffic] = useState({
    cars: 0,
    bikes: 0,
    autos: 0,
    buses: 0,
    trucks: 0,
    signal: "RED",
    signal_time: 10,
    avg_speed: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      getTraffic()
        .then(res => setTraffic(res.data))
        .catch(err => console.error(err));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans overflow-x-hidden">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">

        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500 rounded-xl">
                <LayoutDashboard className="text-white w-6 h-6" />
              </div>

              <span className="text-indigo-400 font-bold tracking-[0.2em] text-xs uppercase">
                Intelligent Systems
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight">
              Smart Traffic{" "}
              <span className="text-indigo-500">Dashboard</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-4 py-3 rounded-2xl w-fit"
          >
            <Activity className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-green-400 font-bold text-xs sm:text-sm">
              LIVE ANALYTICS
            </span>
          </motion.div>

        </header>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">

          {/* CAMERA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <CameraFeed />
          </motion.div>

          {/* VEHICLE CARDS */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4"
          >
            <VehicleCard title="Cars" value={traffic.cars} icon={<Car />} />
            <VehicleCard title="Bikes" value={traffic.bikes} icon={<Bike />} />
            <VehicleCard title="Trucks" value={traffic.trucks} icon={<Truck />} />
            <VehicleCard title="Buses" value={traffic.buses} icon={<Bus />} />
          </motion.div>

        </div>

        {/* SIGNAL PANEL */}
        <div className="w-full overflow-hidden">
          <SignalPanel
            signal={traffic.signal}
            time={traffic.signal_time}
            speed={traffic.avg_speed}
          />
        </div>

        {/* CHARTS */}
        <div className="mt-6 overflow-x-auto">
          <Charts traffic={traffic} />
        </div>

        {/* FOOTER */}
        <footer className="mt-12 sm:mt-16 py-6 border-t border-slate-800 text-slate-500 text-xs sm:text-sm flex flex-col sm:flex-row gap-2 sm:justify-between">
          <p>© 2026 AI Traffic Management System</p>
          <span className="hover:text-indigo-400 cursor-pointer">
            Done by Subbu
          </span>
        </footer>

      </div>
    </div>
  );
}