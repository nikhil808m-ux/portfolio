import React from 'react';
import { Section } from '../Section';

export const ReflectionSection: React.FC = () => {
  return (
    <Section variant="dark" className="!bg-[#1C1C1C] py-20 md:py-24 relative overflow-hidden border-t border-zinc-800">
      {/* Strict Grid Background - Replaced AI Blurs */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          transform: 'translateZ(0)'
        }}
      />

      <div 
        className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10"
      >
        <div className="flex items-center gap-2 mb-10">
          <span className="px-4 py-1.5 bg-zinc-800/50 text-zinc-300 rounded-none text-[11px] font-bold tracking-[0.2em] uppercase border border-zinc-700">11 — Conclusion</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-light text-white mb-10 tracking-tight leading-[1.2]">
          Bringing balance into the moment
        </h2>
        
        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mb-16">
          UPI made payments faster by removing the friction of handling cash. In doing so, it also moved balance away from the moment of payment. Placing it back within that moment doesn’t disrupt the existing flow. It simply brings awareness alongside the action.
        </p>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent" />
      </div>
    </Section>
  );
};