import React from 'react';
import { motion } from 'motion/react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center mb-16">
      {/* Strict Grid Background - Maintained from the new style */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'translateZ(0)'
        }}
      />

      {/* Main Composition - Restored Hardware Accelerated Phone Silhouette */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {/* Phone Body */}
        <motion.div
          style={{ transform: 'translateZ(0)' }}
          className="relative w-[260px] h-[540px] bg-white rounded-[48px] border-[8px] border-slate-200 shadow-2xl flex flex-col items-center pt-24 overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Success Stamp Circle */}
          <motion.div
            style={{ transform: 'translateZ(0)' }}
            className="w-[90px] h-[90px] bg-emerald-500 rounded-full flex items-center justify-center mb-10 shadow-md relative z-20"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
          >
            {/* Checkmark SVG inside the hardware accelerated div */}
            <motion.svg
              width="40" height="40" viewBox="0 0 32 32" fill="none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.8 }}
            >
              <motion.path
                d="M8 16 L14 22 L24 10"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>

          {/* Floating UI Elements */}
          <motion.div
            style={{ transform: 'translateZ(0)' }}
            className="w-[140px] h-4 bg-slate-100 rounded-full mb-4"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 140, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
          />
          <motion.div
            style={{ transform: 'translateZ(0)' }}
            className="w-[80px] h-3 bg-slate-100 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
          />

          {/* Animated Confetti Burst */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const colors = ['bg-indigo-400', 'bg-emerald-400', 'bg-amber-400'];
            // Pre-calculate positions to avoid inline layout thrashing
            const radian = (angle * Math.PI) / 180;
            const startX = 0;
            const startY = 0;
            const endX = Math.cos(radian) * 80;
            const endY = Math.sin(radian) * 80;
            
            return (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${colors[i % 3]} z-10`}
                style={{
                  top: '141px', // Center of the 90px circle + 24px padding = 141px
                  left: '50%',
                  x: '-50%', // center align initially
                  y: '-50%',
                  transform: 'translateZ(0)'
                }}
                initial={{ opacity: 0, x: '-50%', y: '-50%', scale: 0 }}
                whileInView={{ 
                  opacity: [0, 1, 0], 
                  x: `calc(-50% + ${endX}px)`, 
                  y: `calc(-50% + ${endY}px)`,
                  scale: [0, 1.5, 0]
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + (i * 0.02), ease: "easeOut" }}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Caption styled to match new architectural design */}
      <motion.div
        style={{ transform: 'translateZ(0)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white border border-slate-200 px-4 py-3 max-w-[260px] shadow-sm z-20"
      >
        <p className="text-[11px] font-mono text-slate-600 leading-relaxed uppercase tracking-wide">
          <span className="text-slate-900 font-bold">Fig. 1</span> / Friction Loss
        </p>
        <p className="text-xs text-slate-500 mt-2 font-light">
          The green tick.<br/>
          <span className="text-slate-400 font-normal">And then — nothing.</span>
        </p>
      </motion.div>
    </div>
  );
};