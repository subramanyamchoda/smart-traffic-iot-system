import { motion } from "framer-motion";
import { Camera, Maximize2, Circle, Activity } from "lucide-react";

export default function CameraFeed({ stream }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative group bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-5 rounded-3xl shadow-2xl overflow-hidden"
    >
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <Camera className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-tighter">
              Live Traffic Feed
            </h2>
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Circle className="w-2 h-2 fill-red-500 text-red-500" />
              </motion.div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Recording • Cam_01
              </span>
            </div>
          </div>
        </div>
        
        <button className="p-2 hover:bg-slate-700/50 rounded-full transition-colors">
          <Maximize2 className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-inner group-hover:border-indigo-500/30 transition-colors duration-500">
        
        
        <motion.div 
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-0 z-10 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
        />

        
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <span className="bg-black/60 backdrop-blur-md text-[10px] font-mono text-white px-2 py-1 rounded border border-white/10">
               1080P | 60FPS
            </span>
        </div>

        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
             <Activity className="w-3 h-3 text-emerald-400" />
             <span className="text-[10px] font-mono text-emerald-400 font-bold">STABLE CONNECTION</span>
          </div>
        </div>

        
        <img
          src={stream}
          alt="camera"
          className="w-full aspect-video object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
        />

        
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/20 rounded-tl" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/20 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/20 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/20 rounded-br" />
      </div>

      
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600/10 blur-[50px] rounded-full -z-10" />
    </motion.div>
  );
}