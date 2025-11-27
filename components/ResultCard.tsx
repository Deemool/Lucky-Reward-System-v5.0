import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrawResult } from '../types';
import * as Icons from 'lucide-react';

interface ResultCardProps {
  result: DrawResult | null;
  loading: boolean;
  onReset: () => void;
}

const LOADING_ICONS = ['Gift', 'Star', 'Zap', 'Trophy', 'Heart', 'Sparkles', 'Crown', 'Lightbulb'];

const ResultCard: React.FC<ResultCardProps> = ({ result, loading, onReset }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ResultIcon = result ? (Icons as any)[result.selectedItem.iconName] || Icons.Gift : Icons.Gift;

  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setIconIndex((prev) => (prev + 1) % LOADING_ICONS.length);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CurrentLoadingIcon = (Icons as any)[LOADING_ICONS[iconIndex]] || Icons.Loader;

  if (!result && !loading) return null;

  return (
    <div className="w-full max-w-md mx-auto relative z-10 px-4 md:px-0">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            className="flex flex-col items-center justify-center h-64 md:h-80 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl"
          >
            {/* Shuffling Icon Animation */}
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                <CurrentLoadingIcon className="w-16 h-16 md:w-24 md:h-24 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
            </div>
            
            <p className="mt-6 md:mt-8 text-slate-400 text-xs md:text-sm tracking-[0.2em] uppercase animate-pulse font-medium">
              命运轮盘转动中...
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            key="result"
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`relative overflow-hidden rounded-2xl border-2 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] ${result?.tier.borderColor} bg-slate-900`}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${result?.tier.bgGradient} opacity-30 pointer-events-none`} />
            
            <div className="relative p-5 md:p-8 flex flex-col items-center text-center">
              {/* Top Badge */}
              <div className={`px-3 py-1 md:px-4 md:py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6 bg-slate-950/50 border ${result?.tier.borderColor} ${result?.tier.color}`}>
                {result?.tier.name}
              </div>

              {/* Number and Icon */}
              <div className="relative mb-4 md:mb-6">
                 <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-slate-950 border-4 ${result?.tier.borderColor}`}
                 >
                    <ResultIcon className={`w-10 h-10 md:w-12 md:h-12 ${result?.tier.color}`} />
                 </motion.div>
                 {/* Roll Number Badge */}
                 <div className="absolute -bottom-2 -right-2 bg-slate-950 text-white font-mono text-[10px] md:text-xs px-2 py-0.5 md:py-1 rounded border border-slate-700 shadow-lg">
                    ROLL: {result?.roll}
                 </div>
              </div>

              {/* Title & Desc */}
              <h2 className={`text-xl md:text-3xl font-bold mb-2 text-white`}>
                {result?.selectedItem.title}
              </h2>
              <p className="text-slate-300 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                {result?.selectedItem.description}
              </p>

              {/* Flavor Text Section (Optimized Animation) */}
              {result?.comment && (
                 <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full"
                 >
                   <div className="bg-slate-950/40 rounded-lg p-3 md:p-4 border border-slate-700/50 relative mx-1">
                     <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                       <Icons.Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-yellow-400" />
                       <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">✨ 幸运寄语</span>
                     </div>
                     <p className="text-sm text-slate-200 italic leading-normal">
                        "{result.comment}"
                     </p>
                   </div>
                   {/* Spacer to push button down smoothly during animation */}
                   <div className="h-4 md:h-6" />
                 </motion.div>
              )}

              {/* Action Button */}
              <button 
                onClick={onReset}
                className="group relative px-5 py-2.5 md:px-6 md:py-3 bg-white text-slate-900 font-bold rounded-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
              >
                <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                  <Icons.RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  再次抽取
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultCard;