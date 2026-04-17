import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Charts({ traffic }) {

  const colors = {
    indigo: "#6366f1",
    emerald: "#10b981",
    amber: "#f59e0b",
    rose: "#f43f5e",
    sky: "#0ea5e9",
    slate: "#94a3b8",
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: colors.slate,
          padding: 14,
          font: { size: 11 },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#f8fafc",
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: colors.slate,
          font: { size: 10 },
        },
      },
      y: {
        grid: { color: "rgba(148,163,184,0.1)" },
        ticks: {
          color: colors.slate,
          font: { size: 10 },
        },
      },
    },
  };

  const doughnutData = {
    labels: ["Cars", "Bikes", "Autos", "Buses", "Trucks"],
    datasets: [{
      data: [
        traffic.cars,
        traffic.bikes,
        traffic.autos,
        traffic.buses,
        traffic.trucks
      ],
      backgroundColor: [
        colors.indigo,
        colors.emerald,
        colors.amber,
        colors.rose,
        colors.sky
      ],
      borderWidth: 0,
      hoverOffset: 10,
    }],
  };

  const barData = {
    labels: ["Cars", "Bikes", "Autos", "Buses", "Trucks"],
    datasets: [{
      label: "Live Count",
      data: [
        traffic.cars,
        traffic.bikes,
        traffic.autos,
        traffic.buses,
        traffic.trucks
      ],
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      borderRadius: 6,
    }],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 sm:mt-10">

      {/* DOUGHNUT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl"
      >

        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-sm sm:text-lg font-bold text-white">
            Vehicle Distribution
          </h2>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* RESPONSIVE CHART HEIGHT */}
        <div className="h-[220px] sm:h-[280px] md:h-[320px]">
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>

      </motion.div>

      {/* BAR CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.1 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl"
      >

        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-sm sm:text-lg font-bold text-white">
            Traffic Density
          </h2>

          <span className="text-[10px] sm:text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">
            Live
          </span>
        </div>

        {/* RESPONSIVE CHART HEIGHT */}
        <div className="h-[220px] sm:h-[280px] md:h-[320px]">
          <Bar data={barData} options={barOptions} />
        </div>

      </motion.div>

    </div>
  );
}