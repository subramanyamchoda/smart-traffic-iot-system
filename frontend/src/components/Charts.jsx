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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
          padding: 20,
          font: { family: "Inter", size: 12, weight: "500" },
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f8fafc",
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: colors.slate },
      },
      y: {
        grid: { color: "rgba(148, 163, 184, 0.1)" },
        ticks: { color: colors.slate },
      },
    },
  };

  const doughnutData = {
    labels: ["Cars", "Bikes", "Autos", "Buses", "Trucks"],
    datasets: [{
      data: [traffic.cars, traffic.bikes, traffic.autos, traffic.buses, traffic.trucks],
      backgroundColor: [colors.indigo, colors.emerald, colors.amber, colors.rose, colors.sky],
      borderWidth: 0,
      hoverOffset: 15,
    }],
  };

  const barData = {
    labels: ["Cars", "Bikes", "Autos", "Buses", "Trucks"],
    datasets: [{
      label: "Live Count",
      data: [traffic.cars, traffic.bikes, traffic.autos, traffic.buses, traffic.trucks],
      backgroundColor: "rgba(99, 102, 241, 0.8)",
      borderRadius: 8,
      hoverBackgroundColor: colors.indigo,
    }],
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-10">
      
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative group bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white tracking-tight">Vehicle Distribution</h2>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="h-[300px]">
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>
      </motion.div>

      
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="relative group bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white tracking-tight">Traffic Density</h2>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded">Real-time</span>
        </div>
        <div className="h-[300px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </motion.div>
    </div>
  );
}