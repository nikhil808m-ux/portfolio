import React from 'react';
import { motion } from 'motion/react';

// Google Colors
const GOOGLE_BLUE = "#4285F4";
const GOOGLE_GREEN = "#34A853";
const GOOGLE_YELLOW = "#FBBC05";
const GOOGLE_RED = "#EA4335";

export const ThoughtExperimentIllustration: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto items-center justify-center py-12 font-sans">
      {/* Left: Cash Experience - Physical/Tactile */}
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="relative w-72 h-72 bg-[#FFF8E1] rounded-[32px] flex items-center justify-center overflow-hidden border border-[#FDE293]">
          <motion.svg width="240" height="240" viewBox="0 0 240 240">
            {/* Abstract Hand */}
            <circle cx="120" cy="120" r="100" fill="#FEF7E0" />
            
            {/* Stack of Bills - Yellow/Orange (Google Yellow Theme) */}
            <motion.rect x="70" y="130" width="100" height="50" rx="4" fill="#F9AB00" stroke="#E37400" strokeWidth="2" />
            <motion.rect x="70" y="120" width="100" height="50" rx="4" fill="#FBBC05" stroke="#E37400" strokeWidth="2" />
            <motion.rect x="70" y="110" width="100" height="50" rx="4" fill="#FCC934" stroke="#E37400" strokeWidth="2" />
            
            {/* Top Note Sliding Away */}
            <motion.g
               initial={{ x: 0, y: 0, opacity: 1 }}
               whileInView={{ x: 60, y: -40, opacity: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <rect x="70" y="100" width="100" height="50" rx="4" fill="#FDD663" stroke="#E37400" strokeWidth="2" />
              <text x="120" y="130" textAnchor="middle" fontSize="16" fill="#E37400" fontWeight="bold">₹</text>
            </motion.g>
          </motion.svg>
          
          <div className="absolute bottom-6 bg-[#FEF7E0] px-3 py-1 rounded-full border border-[#FDE293]">
             <span className="text-xs font-bold text-[#E37400] tracking-wide uppercase">Physical Loss</span>
          </div>
        </div>
        <p className="mt-6 text-sm text-center text-gray-600 max-w-[240px]">
          The stack physically shrinks. You feel the loss.
        </p>
      </div>

      {/* Right: Digital Experience - Abstract/Static */}
      <div className="flex-1 w-full flex flex-col items-center">
        <div className="relative w-72 h-72 bg-[#E6F4EA] rounded-[32px] flex items-center justify-center overflow-hidden border border-[#CEEAD6]">
          <motion.svg width="240" height="240" viewBox="0 0 240 240">
            {/* Phone Frame */}
            <rect x="80" y="50" width="80" height="140" rx="12" fill="white" stroke={GOOGLE_GREEN} strokeWidth="3" />
            
            {/* Screen Elements */}
            <rect x="95" y="70" width="50" height="6" rx="3" fill="#E6F4EA" />
            
            {/* Static Number */}
            <motion.text 
              x="120" y="110" 
              textAnchor="middle" 
              fill={GOOGLE_GREEN} 
              fontSize="20" 
              fontWeight="bold"
              style={{ fontFamily: 'Google Sans, Roboto, sans-serif' }}
            >
              ₹500
            </motion.text>

            {/* "Success" Badge appearing - but number stays same */}
            <motion.circle 
              cx="120" cy="140" r="18" 
              fill={GOOGLE_GREEN} 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.path 
              d="M112 140 L118 146 L128 134" 
              stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.svg>
          
          <div className="absolute bottom-6 bg-[#E6F4EA] px-3 py-1 rounded-full border border-[#CEEAD6]">
             <span className="text-xs font-bold text-[#137333] tracking-wide uppercase">Visual Static</span>
          </div>
        </div>
        <p className="mt-6 text-sm text-center text-gray-600 max-w-[240px]">
          The number stays the same. The loss is abstract.
        </p>
      </div>
    </div>
  );
};
