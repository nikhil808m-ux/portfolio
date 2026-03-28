import { motion } from 'motion/react';

export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-stone-50">
      {/* Soft Gradient Mesh */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 opacity-50" />
      
      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(#a8a29e 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      >
      </div>
    </div>
  );
}
