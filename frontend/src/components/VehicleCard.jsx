import { motion } from "framer-motion";

export default function VehicleCard({ title, value, icon }) {
  return (
    <motion.div

      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}

      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}

      className="relative group cursor-pointer w-full"
    >

      {/* GLOW BACKGROUND */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 
                      rounded-2xl blur opacity-20 group-hover:opacity-80 transition duration-500" />

      {/* CARD */}
      <div className="relative flex flex-col items-center justify-center
                      bg-slate-900/80 backdrop-blur-xl border border-slate-700/50
                      p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl overflow-hidden
                      min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">

        {/* ICON */}
        <motion.div
          whileHover={{ rotate: 10, scale: 1.15 }}
          className="p-3 sm:p-4 rounded-full bg-indigo-500/10 text-indigo-400
                     mb-3 sm:mb-4 border border-indigo-500/20
                     group-hover:bg-indigo-500 group-hover:text-white
                     transition-colors duration-300"
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6">
            {icon}
          </div>
        </motion.div>

        {/* TITLE */}
        <h3 className="text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-widest text-slate-400 mb-1 text-center">
          {title}
        </h3>

        {/* VALUE */}
        <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight text-center">
          {value}
        </p>

        {/* BOTTOM LINE EFFECT */}
        <div className="absolute bottom-0 left-0 w-full h-1 
                        bg-gradient-to-r from-transparent via-indigo-500 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}