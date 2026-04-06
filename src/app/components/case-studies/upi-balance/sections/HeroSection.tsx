import React from 'react';
import { Section } from '../Section';
import { HeroIllustration } from '../illustrations/HeroIllustration';

export const HeroSection: React.FC = () => {
  return (
    <Section className="min-h-screen flex items-center pt-32 pb-24 relative overflow-hidden bg-[#F8FAFC]">
      {/* Strict Grid Background - Replaced AI Blurs */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #0F172A 1px, transparent 1px), linear-gradient(to bottom, #0F172A 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          transform: 'translateZ(0)'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full relative z-10">
        <div className="flex flex-col gap-10 max-w-2xl">
          <div>
            <div className="flex items-center gap-4 mb-10 border-b border-slate-200 pb-4 w-max">
              <span className="text-slate-900 text-[11px] font-bold tracking-[0.25em] uppercase">
                UX Case Study
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-none"></span>
              <span className="text-slate-400 text-[10px] font-mono tracking-widest uppercase">2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter text-slate-900 leading-[0.95] mb-8 font-sans">
              The Lost <br/>
              <span className="text-indigo-600">Reflection.</span>
            </h1>
            
            <h2 className="text-2xl md:text-[28px] font-light text-slate-500 mb-8 leading-snug max-w-lg tracking-tight">
              UPI removed the friction of handling cash, carrying it, and counting it. But along with that, it also removed something quieter.
            </h2>
          </div>

          <div className="prose prose-lg text-slate-600 leading-relaxed font-light">
            <p className="text-slate-900 font-normal">
              With cash, every transaction ended with a natural update. You gave something, received something back, and knew what was left. With UPI, the payment ends instantly, but that sense of what remains doesn’t update in the same moment.
            </p>
          </div>
          
          <div className="flex gap-10 mt-6 pt-8 border-t border-slate-200 flex-wrap">
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-bold text-slate-900 tracking-widest uppercase text-[10px]">Domain</span> 
              <span className="text-slate-500 font-light">Behavioral UX</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-bold text-slate-900 tracking-widest uppercase text-[10px]">Focus</span> 
              <span className="text-slate-500 font-light">Post-Payment Cognition</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center lg:justify-end relative mt-16 lg:mt-0">
          <HeroIllustration />
        </div>
      </div>
    </Section>
  );
};