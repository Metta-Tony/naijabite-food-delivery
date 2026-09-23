import React, { useState } from 'react';
import { X, Clock, Flame, ShieldCheck } from 'lucide-react';

export const BannerNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="bg-stone-900 text-white text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden text-center sm:text-left w-full sm:w-auto justify-center">
          <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shrink-0">
            PROMO CODE
          </span>
          <span className="text-stone-300 truncate">
            Use code <strong className="text-amber-400 font-mono">NAIJA10</strong> for 10% off or{' '}
            <strong className="text-amber-400 font-mono">FREECHOP</strong> for free delivery!
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4 text-stone-400 text-[11px] shrink-0">
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            Cooked Fresh on Order
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            Kitchen open: 9am - 11pm WAT
          </span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer ml-1"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
