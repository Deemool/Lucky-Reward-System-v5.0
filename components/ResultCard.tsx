import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrawResult } from '../types';
import * as Icons from 'lucide-react';

interface ResultCardProps {
  result: DrawResult | null;
  loading: boolean;
  onReset: () => void;
}

// Icons to cycle through during the loading phase
const SHUFFLE_ICONS = [
  'Gift', 'Sparkles', 'Zap', 'Trophy', 'Star', 
  'Heart', 'Music', 'Gamepad2', 'Coffee', 'Rocket', 
  'Crown', 'Smile', 'Gem', 'Lightbulb'
];

const ResultCard: React.FC<ResultCardProps> = ({ result, loading, onReset }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ResultIcon = result ? (Icons as any)[result.selectedItem.iconName] || Icons.Gift : Icons.Gift;

  // Icon shuffling state
  const [shuffleIndex, setShuffleIndex] = useState(0);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setShuffleIndex((prev) => (prev + 1) % SHUFFLE_ICONS.length);
      }, 80); // Fast shuffle
      return () => clearInterval(interval);
    }
  }, [loading]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ShuffleIconComponent = (Icons as any)[SHUFFLE_ICONS[shuffleIndex]];

  if (!result && !loading) return null;

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="flex flex-col items-center justify-center h-80 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 animate-pulse" />
            
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                key={shuffleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.08 }}
                className="mb-6"
              >
                <ShuffleIconComponent className="w-24 h-24 text-slate-200 drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]" />
              </motion.div>
              
              <div className="flex gap-2 items-center">
                 <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
              </div>
              
              <p className="mt-4 text-slate-400 text-sm tracking-widest uppercase font-medium">
                命运生成中...
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`relative overflow-hidden rounded-2xl border-2 shadow-[0_0_60px_-15px_rgba(0,0,0,0.6)] ${result?.tier.borderColor} bg-slate-900`}
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${result?.tier.bgGradient} opacity-30 pointer-events-none`} />
            
            <div className="relative p-8 flex flex-col items-center text-center">
              {/* Top Badge */}
              <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-8 bg-slate-950/50 border ${result?.tier.borderColor} ${result?.tier.color} shadow-lg`}>
                {result?.tier.name}
              </div>

              {/* Icon Display */}
              <div className="relative mb-8 group">
                 <div className={`absolute inset-0 rounded-full bg-current opacity-20 blur-xl group-hover:blur-2xl transition-all duration-700 ${result?.tier.color}`}></div>
                 <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                    className={`relative w-28 h-28 rounded-full flex items-center justify-center bg-slate-950 border-4 ${result?.tier.borderColor} shadow-2xl`}
                 >
                    <ResultIcon className={`w-14 h-14 ${result?.tier.color}`} />
                 </motion.div>
                 <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="absolute -bottom-3 -right-3 bg-slate-950 text-slate-200 font-mono text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-700 shadow-lg z-10"
                 >
                    #{result?.roll}
                 </motion.div>
              </div>

              {/* Title & Desc */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className={`text-3xl font-bold mb-3 text-white tracking-tight`}>
                    {result?.selectedItem.title}
                </h2>
                <p className="text-slate-300 mb-8 text-base leading-relaxed max-w-xs mx-auto">
                    {result?.selectedItem.description}
                </p>
              </motion.div>

              {/* Flavor Text Section (Optimized Animation) */}
              {result?.comment && (
                 <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ 
                        duration: 0.6, 
                        ease: [0.16, 1, 0.3, 1], // Custom Bezier for silky smooth easing
                        opacity: { duration: 0.3, delay: 0.1 } 
                    }}
                    className="w-full mb-8 relative overflow-hidden"
                 >
                   {/* Separate content container for smooth height animation */}
                   <div className="bg-slate-950/40 rounded-xl p-5 border border-slate-700/50 relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400/0 via-yellow-400/50 to-yellow-400/0 opacity-50"></div>
                        <div className="flex items-center gap-2 mb-3">
                            <Icons.Sparkles className="w-4 h-4 text-yellow-400" />
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">幸运寄语</span>
                        </div>
                        <p className="text-sm md:text-[15px] text-slate-200 italic leading-relaxed font-medium">
                            "{result.comment}"
                        </p>
                   </div>
                 </motion.div>
              )}

              {/* Action Button */}
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={onReset}
                className="group relative px-8 py-3.5 bg-white text-slate-900 font-bold rounded-xl overflow-hidden shadow-lg shadow-white/5 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icons.RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-180 duration-500" />
                  再次抽取
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultCard;