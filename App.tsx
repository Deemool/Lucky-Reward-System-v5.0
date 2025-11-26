import React, { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PrizeTier, SubItem, DrawResult, HistoryItem, TierType } from './types';
import { PRIZE_POOL } from './constants';
import ResultCard from './components/ResultCard';
import PrizePool from './components/PrizePool';
import { History, Info, Sparkles, Trash2, X } from 'lucide-react';

const HISTORY_STORAGE_KEY = 'lucky_reward_history_v5';

const App: React.FC = () => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<DrawResult | null>(null);
  
  // Initialize history from localStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load history", e);
      return [];
    }
  });
  
  const [showHistory, setShowHistory] = useState(false);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [history]);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#22d3ee', '#c084fc', '#f59e0b', '#f43f5e']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#22d3ee', '#c084fc', '#f59e0b', '#f43f5e']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleDraw = useCallback(async () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setResult(null);

    // 1. Roll Logic
    const roll = Math.floor(Math.random() * 100) + 1;
    
    // 2. Find Tier
    const tier = PRIZE_POOL.find(t => roll >= t.range[0] && roll <= t.range[1]);
    if (!tier) {
        setIsRolling(false);
        return; // Should not happen
    }

    // 3. Select Item Logic
    let selectedItem: SubItem;

    if (tier.type === TierType.WISHLIST) {
        // Special Logic: Date Odd/Even
        const today = new Date().getDate();
        const isOdd = today % 2 !== 0;
        // Constants: index 0 = digital (odd), index 1 = physical (even)
        selectedItem = isOdd ? tier.items[0] : tier.items[1];
    } else {
        // Random pick from available items
        const itemIndex = Math.floor(Math.random() * tier.items.length);
        selectedItem = tier.items[itemIndex];
    }

    // 4. Delay for animation effect (Optimized: Reduced to 1000ms)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newResult: DrawResult = {
        roll,
        tier,
        selectedItem,
        timestamp: Date.now(),
        comment: selectedItem.flavorText // Use static flavor text from constants
    };

    // 5. Show Result
    setIsRolling(false);
    setResult(newResult);
    
    if (tier.type === TierType.WISHLIST || tier.type === TierType.LEGENDARY) {
        triggerConfetti();
    }

    // 6. Update History
    setHistory(prev => {
        const newHistory = [
            { ...newResult, id: Math.random().toString(36).substring(7) },
            ...prev
        ].slice(0, 50); // Keep last 50 items for local storage
        return newHistory;
    });

  }, [isRolling]);

  const reset = () => {
      setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500/30">
        {/* Header */}
        <header className="p-6 flex justify-between items-center border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/20">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="font-bold text-lg md:text-xl tracking-tight">RewardSystem<span className="text-slate-600">v5.0</span></h1>
            </div>
            <button 
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 hover:bg-slate-900 rounded-full transition-colors relative"
                aria-label="History"
            >
                <History className="w-5 h-5 text-slate-400" />
                {history.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
            </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative">
            
            {/* Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Introduction / Draw Button State */}
            {!result && !isRolling && (
                <div className="text-center max-w-lg mx-auto mb-12 animate-in fade-in zoom-in duration-500">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500">
                        完成任务了吗？
                    </h2>
                    <p className="text-slate-400 mb-8 text-lg">
                        每一次努力都值得被奖赏。<br/>点击下方按钮，抽取属于你的随机奖励。
                    </p>
                    <button
                        onClick={handleDraw}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-slate-900 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] active:scale-95 overflow-hidden"
                    >
                         <span className="relative z-10 flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            启动轮盘
                         </span>
                         {/* Button Shine Effect */}
                         <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                    </button>
                </div>
            )}

            {/* Result Display */}
            <ResultCard result={result} loading={isRolling} onReset={reset} />
            
            {/* Rules / Pool Section */}
            {!result && !isRolling && (
                <div className="mt-8 flex flex-col items-center w-full">
                    <div className="flex items-center gap-2 text-slate-500 text-sm uppercase tracking-widest font-semibold mb-4">
                        <Info className="w-4 h-4" /> 奖池概览
                    </div>
                    <PrizePool />
                </div>
            )}
        </main>

        {/* History Sidebar / Modal */}
        {showHistory && (
            <div className="fixed inset-0 z-50 flex justify-end">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowHistory(false)}></div>
                <div className="relative w-full max-w-sm bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">历史记录</h3>
                        <div className="flex items-center gap-2">
                            {history.length > 0 && (
                                <button
                                    onClick={clearHistory}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-950/20 hover:bg-red-900/40 border border-red-900/30 text-red-400 text-xs font-medium transition-colors"
                                    title="清空历史"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    清空
                                </button>
                            )}
                            <button 
                                onClick={() => setShowHistory(false)} 
                                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {history.length === 0 ? (
                            <p className="text-slate-500 text-center py-10">暂无记录</p>
                        ) : (
                            history.map(item => (
                                <div key={item.id} className={`group relative p-4 rounded-lg border bg-slate-950 ${item.tier.borderColor} border-opacity-30`}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteHistoryItem(item.id);
                                        }}
                                        className="absolute top-2 right-2 p-1 text-slate-600 hover:text-red-400 hover:bg-slate-900 rounded transition-colors z-10"
                                        title="删除此记录"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                    
                                    <div className="flex justify-between items-center mb-1 pr-6">
                                        <span className={`text-xs font-bold ${item.tier.color}`}>{item.tier.name}</span>
                                        <span className="text-xs font-mono text-slate-500">#{item.roll}</span>
                                    </div>
                                    <p className="font-semibold text-sm pr-4">{item.selectedItem.title}</p>
                                    <p className="text-xs text-slate-500 mt-1">{new Date(item.timestamp).toLocaleTimeString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default App;