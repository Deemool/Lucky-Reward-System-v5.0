import React from 'react';
import { PRIZE_POOL } from '../constants';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

const PrizePool: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-0 md:px-4">
      {PRIZE_POOL.map((tier, idx) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          key={tier.name}
          className={`relative p-4 md:p-5 rounded-xl border bg-slate-900/40 backdrop-blur-sm ${tier.borderColor} border-opacity-30 hover:border-opacity-60 transition-colors`}
        >
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h3 className={`font-bold text-base md:text-lg ${tier.color}`}>{tier.name}</h3>
            <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">
              {tier.range[0]}-{tier.range[1]} ({tier.probability})
            </span>
          </div>
          
          <ul className="space-y-3">
            {tier.items.map((item) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const ItemIcon = (Icons as any)[item.iconName] || Icons.Circle;
              return (
                <li key={item.id} className="flex items-start gap-3 text-sm text-slate-300">
                  <div className={`mt-0.5 p-1 rounded bg-slate-800 ${tier.color} bg-opacity-10`}>
                    <ItemIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block">{item.title}</span>
                    <span className="text-xs text-slate-500">{item.description}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default PrizePool;