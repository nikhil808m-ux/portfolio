import React from 'react';
import { motion } from 'motion/react';

export const HeroIllustration: React.FC = () => {
  const googleBlue = "#4285F4";
  const googleRed = "#EA4335";
  const googleYellow = "#FBBC05";
  const googleGreen = "#34A853";

  return (
    <div className="relative w-full h-96 flex items-center justify-center mb-16">
      {/* Abstract Background Shapes - Material You Inspired */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="w-64 h-64 rounded-full blur-3xl absolute -top-10 -left-10"
          style={{ backgroundColor: googleBlue }}
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="w-72 h-72 rounded-full blur-3xl absolute bottom-0 right-0"
          style={{ backgroundColor: googleGreen }}
          animate={{ scale: [1, 1.1, 1], y: [0, -30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="w-48 h-48 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: googleYellow }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Main Composition */}
      <div className="relative z-10 flex items-center justify-center">
        <svg width="320" height="320" viewBox="0 0 320 320">
          
          {/* Phone Silhouette */}
          <motion.rect
            x="85" y="40" width="150" height="240" rx="20"
            fill="white"
            stroke="#DADCE0"
            strokeWidth="4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Success Stamp Circle */}
          <motion.circle
            cx="160" cy="140" r="35"
            fill={googleBlue}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
          />
          
          {/* Checkmark */}
          <motion.path
            d="M148 140 L156 148 L172 132"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />

          {/* Floating UI Elements */}
          <motion.rect
            x="110" y="190" width="100" height="12" rx="6"
            fill="#F1F3F4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 100, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          />
          <motion.rect
            x="130" y="212" width="60" height="8" rx="4"
            fill="#F1F3F4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 60, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />

          {/* Decorative Elements (Confetti/Sparks) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.circle
              key={i}
              cx="160" cy="140" r="4"
              fill={[googleRed, googleYellow, googleGreen, googleBlue][i % 4]}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: [1, 0], 
                scale: [0, 1], 
                x: Math.cos(angle * Math.PI / 180) * 60, 
                y: Math.sin(angle * Math.PI / 180) * 60 
              }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            />
          ))}
        </svg>
      </div>

      {/* Caption */}
      <motion.div
        className="absolute -bottom-8 right-8 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-gray-100 max-w-[240px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p className="text-xs text-gray-600 font-medium leading-relaxed font-sans">
          <span style={{ color: googleBlue }}>Payment</span> processed. <br/>
          <span style={{ color: googleGreen }}>Trust</span> established.
        </p>
      </motion.div>
    </div>
  );
};
