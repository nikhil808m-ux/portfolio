import React from 'react';
import { motion } from 'motion/react';

export const Glyph = ({ size = 72 }: { size?: number }) => {
  const outer = size;
  const middle = size * (48 / 72);
  const inner = size * (8 / 72);

  return (
    <div className="relative flex items-center justify-center" style={{ width: outer, height: outer }}>
      <motion.div
        className="absolute rounded-full border border-borders"
        style={{ width: outer, height: outer, borderColor: '#242424' }}
        animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute rounded-full border border-borders"
        style={{ width: middle, height: middle, borderColor: '#242424' }}
      />
      <motion.div
        className="absolute rounded-full bg-accent"
        style={{ width: inner, height: inner }}
        animate={{ opacity: [1, 0.7, 1], boxShadow: ['0 0 12px rgba(200,185,138,0.6)', '0 0 6px rgba(200,185,138,0.3)', '0 0 12px rgba(200,185,138,0.6)'] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
};
