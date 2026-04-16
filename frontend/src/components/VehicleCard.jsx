import { motion } from "framer-motion";

export default function VehicleCard({ title, value, icon }) {
  return (
    <motion.div
      
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer"
    >
      
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-500"></div>

      
      <div className="relative flex flex-col items-center bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl overflow-hidden">
        
        
        <motion.div 
          whileHover={{ rotate: 12, scale: 1.2 }}
          className="p-4 rounded-full bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300"
        >
          {icon}
        </motion.div>

        
        <h3 className="text-sm font-medium uppercase tracking-widest text-slate-400 mb-1">
          {title}
        </h3>
        
        <p className="text-4xl font-black text-white tracking-tight">
          {value}
        </p>

        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}