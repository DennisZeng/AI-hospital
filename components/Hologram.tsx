import React from 'react';
import { Scan, Activity, Zap, ShieldCheck } from 'lucide-react';

interface HologramProps {
  lang: 'en' | 'cn';
}

const Hologram: React.FC<HologramProps> = ({ lang }) => {
  const t = {
    neuralSync: lang === 'cn' ? "神经同步" : "NEURAL SYNC",
    optimal: lang === 'cn' ? "状态极佳" : "OPTIMAL",
    bodyScan: lang === 'cn' ? "全身扫描" : "BODY SCAN",
    immunity: lang === 'cn' ? "免疫系统" : "IMMUNITY",
    active: lang === 'cn' ? "活跃" : "ACTIVE",
  };

  return (
    <div className="relative w-full h-[600px] flex justify-center items-center perspective-1000">
      
      {/* Central Axis Glow */}
      <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50 blur-sm"></div>

      {/* Holographic Base */}
      <div className="absolute bottom-10 w-64 h-24 bg-cyan-900/20 blur-xl rounded-[100%] transform rotate-x-60 animate-pulse"></div>
      <div className="absolute bottom-12 w-48 h-12 border border-cyan-500/30 rounded-[100%] animate-spin-slow"></div>

      {/* The Human Silhouette */}
      <div className="relative z-10 holo-glow animate-float">
        <svg
          viewBox="0 0 200 450"
          className="h-[450px] w-auto fill-cyan-500/10 stroke-cyan-400 stroke-1"
          style={{ vectorEffect: 'non-scaling-stroke' }}
        >
           {/* Abstract Human Shape */}
          <path d="M100,20 C85,20 75,35 75,50 C75,65 85,75 90,80 C60,90 40,110 40,150 L40,280 L60,430 L80,430 L70,290 L90,290 L90,430 L110,430 L110,290 L130,290 L120,430 L140,430 L160,280 L160,150 C160,110 140,90 110,80 C115,75 125,65 125,50 C125,35 115,20 100,20 Z" />
          
          {/* Internal Organs / Data Points (Stylized) */}
          <circle cx="100" cy="50" r="5" className="fill-cyan-300 animate-pulse" /> {/* Brain */}
          <circle cx="100" cy="110" r="8" className="fill-cyan-300 animate-pulse-fast" /> {/* Heart */}
          <path d="M90,130 Q100,125 110,130" fill="none" stroke="cyan" strokeWidth="2" opacity="0.5" />
          <path d="M70,160 Q100,180 130,160" fill="none" stroke="cyan" strokeWidth="1" opacity="0.3" />

          {/* Scanning Line */}
          <rect x="0" y="0" width="200" height="20" fill="url(#scanGradient)" className="animate-scan opacity-30" />
          
          <defs>
            <linearGradient id="scanGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Rotating Data Rings */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/10 border-dashed animate-spin-slow"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full border border-cyan-400/5 animate-spin-reverse-slow"></div>

      {/* Floating Data Cards (Holographic UI) */}
      
      {/* Top Left - Brain Scan */}
      <div className="absolute top-20 left-0 md:left-20 glass-panel p-4 rounded-lg transform -rotate-6 hover:rotate-0 transition-all duration-500 cursor-pointer group">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <span className="text-xs text-cyan-200 font-display tracking-widest">{t.neuralSync}</span>
        </div>
        <div className="h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-400 w-[85%] animate-pulse"></div>
        </div>
        <div className="text-[10px] text-cyan-600 mt-1 text-right">85% {t.optimal}</div>
      </div>

      {/* Middle Right - Diagnostics */}
      <div className="absolute top-1/2 right-0 md:right-16 glass-panel p-4 rounded-lg transform rotate-3 hover:rotate-0 transition-all duration-500 cursor-pointer">
        <div className="flex items-center gap-3 mb-2">
          <Scan className="w-5 h-5 text-cyan-400" />
          <span className="text-xs text-cyan-200 font-display tracking-widest">{t.bodyScan}</span>
        </div>
         <div className="grid grid-cols-4 gap-1 w-24">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`h-1 w-full rounded-sm ${Math.random() > 0.3 ? 'bg-cyan-500' : 'bg-cyan-900/50'}`}></div>
            ))}
         </div>
      </div>

       {/* Bottom Left - Immunity */}
       <div className="absolute bottom-32 left-4 md:left-32 glass-panel p-3 rounded-lg transform rotate-2 hover:rotate-0 transition-all duration-500">
         <div className="flex items-center justify-between gap-4">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
            <div className="text-right">
              <div className="text-xs text-cyan-500 font-bold">{t.immunity}</div>
              <div className="text-lg text-white font-display">{t.active}</div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Hologram;