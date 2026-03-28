import React from 'react';
import { motion } from 'motion/react';
import { Server, Landmark, Smartphone, ShieldCheck, Zap } from 'lucide-react';

// Google Colors & Theme
const GOOGLE_BLUE = "#4285F4";
const GOOGLE_GREEN = "#34A853";
const GOOGLE_YELLOW = "#FBBC05";
const GOOGLE_RED = "#EA4335";
const GOOGLE_GRAY_50 = "#F8F9FA";
const GOOGLE_GRAY_200 = "#E8EAED";
const GOOGLE_GRAY_600 = "#5F6368";

const Node = ({ x, y, icon: Icon, label, color, sublabel, delay = 0, type = "default" }: any) => (
  <motion.g 
    transform={`translate(${x}, ${y})`}
    initial={{ opacity: 0, scale: 0.9, y: y + 10 }}
    whileInView={{ opacity: 1, scale: 1, y: y }}
    transition={{ delay, duration: 0.6, type: "spring" }}
    viewport={{ once: true }}
  >
    {/* Glow Effect */}
    <circle r="45" fill={color} fillOpacity="0.05" />
    
    {/* Card Background */}
    <rect 
      x="-36" y="-36" width="72" height="72" rx="16" 
      fill="white" 
      stroke={color === '#E5E7EB' ? GOOGLE_GRAY_200 : color} 
      strokeWidth={type === "bank" ? 3 : 2}
      className="drop-shadow-sm"
    />
    
    <foreignObject x="-24" y="-24" width="48" height="48">
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        <Icon size={24} color={color === '#E5E7EB' ? GOOGLE_GRAY_600 : color} strokeWidth={2.5} />
      </div>
    </foreignObject>
    
    <text y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill={GOOGLE_GRAY_600} style={{ fontFamily: 'Google Sans, sans-serif' }}>
      {label}
    </text>
    {sublabel && (
      <text y="68" textAnchor="middle" fontSize="9" fontWeight="500" fill="#9AA0A6" style={{ fontFamily: 'Google Sans, sans-serif' }}>
        {sublabel}
      </text>
    )}
  </motion.g>
);

export const ConstraintsIllustration: React.FC = () => {
  return (
    <div className="w-full h-[360px] relative bg-white rounded-[24px] border border-gray-200 shadow-sm mt-8 overflow-visible">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.4] rounded-[24px] overflow-hidden" 
           style={{ backgroundImage: `radial-gradient(${GOOGLE_BLUE} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} 
      />
      
      <svg width="100%" height="100%" viewBox="0 0 800 360" className="absolute inset-0">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={GOOGLE_BLUE} stopOpacity="0.2" />
            <stop offset="50%" stopColor={GOOGLE_BLUE} stopOpacity="0.8" />
            <stop offset="100%" stopColor={GOOGLE_GREEN} stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* 1. Payment Flow Path (Straight) */}
        <path 
          d="M 120 180 L 680 180" 
          stroke={GOOGLE_GRAY_200} strokeWidth="2" strokeDasharray="6 6" 
        />

        {/* 2. Balance Check Path (Curved Top) */}
        <path 
          d="M 120 150 C 250 50, 550 50, 680 150" 
          fill="none" stroke={GOOGLE_BLUE} strokeWidth="2" strokeOpacity="0.15"
        />

        {/* Animated Payment Packet (Green) */}
        <motion.circle 
          r="6" fill={GOOGLE_GREEN} stroke="white" strokeWidth="2"
          filter="drop-shadow(0 2px 3px rgba(52, 168, 83, 0.4))"
          style={{ 
            offsetPath: "path('M 120 180 L 680 180')",
            offsetDistance: "var(--progress-payment)"
          }}
          initial={{ "--progress-payment": "0%" } as any}
          animate={{ "--progress-payment": "100%" } as any}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Animated Balance Packet (Blue Lock) */}
        <motion.g
          style={{ 
            offsetPath: "path('M 120 150 C 250 50, 550 50, 680 150')",
            offsetDistance: "var(--progress-balance)"
          }}
          initial={{ "--progress-balance": "0%", opacity: 0 } as any}
          animate={{ "--progress-balance": "100%", opacity: 1 } as any}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
        >
          <circle r="14" fill="white" stroke={GOOGLE_BLUE} strokeWidth="2" className="drop-shadow-md" />
          <foreignObject x="-8" y="-8" width="16" height="16">
            <ShieldCheck size={16} color={GOOGLE_BLUE} />
          </foreignObject>
        </motion.g>

        {/* Nodes positioned to avoid overlap */}
        <Node x="100" y="180" icon={Smartphone} label="User App" color={GOOGLE_BLUE} delay={0} />
        
        {/* Middle Node - Slightly offset to show complexity */}
        <Node x="400" y="180" icon={Server} label="NPCI / PSP" color={GOOGLE_YELLOW} sublabel="Switch" delay={0.2} />
        
        <Node x="700" y="180" icon={Landmark} label="Bank Core" color={GOOGLE_RED} sublabel="CBS" delay={0.4} type="bank" />

      </svg>
      
      {/* Legend / Caption */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[#34A853]" />
          <span className="text-[11px] font-medium text-gray-600 uppercase tracking-wide font-sans">Payment</span>
        </div>
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
          <div className="w-2 h-2 rounded-full border border-[#4285F4]" />
          <span className="text-[11px] font-medium text-gray-600 uppercase tracking-wide font-sans">Balance Check</span>
        </div>
      </div>
    </div>
  );
};
