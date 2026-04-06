import React from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { clsx } from 'clsx';

const FlowItem = ({ number, title, isOptimized, isLast }: { number: string, title: React.ReactNode, isOptimized?: boolean, isLast?: boolean }) => (
    <div className={clsx(
        "flex flex-col gap-3 py-6 md:py-0 md:px-6 first:md:pl-0",
        !isLast && "border-b md:border-b-0 md:border-r",
        isOptimized ? "border-slate-200" : "border-slate-200/60"
    )}>
        <span className={clsx(
            "text-[10px] font-mono tracking-widest",
            isOptimized ? "text-slate-900" : "text-slate-400"
        )}>
            {number}
        </span>
        <span className={clsx(
            "text-[15px] font-medium leading-relaxed tracking-tight",
            isOptimized ? "text-slate-900" : "text-slate-500 font-light"
        )}>
            {title}
        </span>
    </div>
);

export const FlowComparisonSection: React.FC = () => {
  return (
    <Section variant="alt" className="py-20 md:py-24">
      <div className="flex flex-col">
        
        {/* Header Area */}
        <div className="max-w-3xl">
            <TextBlock 
              eyebrow="08 — System Efficiency"
              title="From five steps to two" 
              subtitle=""
            >
              <p className="text-slate-500 font-light text-[17px] leading-relaxed">
                Checking balance after a payment previously required leaving the confirmation and navigating back through the app. Placing it within the success screen reduces both steps and context shift.
              </p>
            </TextBlock>
        </div>

        {/* Architectural Grid */}
        <div className="grid grid-cols-1 gap-0 border-t border-l border-slate-200">
            
            {/* Previous Flow */}
            <div 
                className="bg-slate-50 p-8 md:p-12 border-r border-b border-slate-200 flex flex-col"
            >
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-2 h-2 border border-slate-400 rounded-full" />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Previous Flow (5 Steps)</h3>
                </div>
                
                <div className="flex flex-col md:grid md:grid-cols-5 gap-0 w-full">
                    <FlowItem number="01" title="Tap 'Done' to exit" />
                    <FlowItem number="02" title="Navigate to Home" />
                    <FlowItem number="03" title="Find 'Check Balance'" />
                    <FlowItem number="04" title="Select Account & Authenticate" />
                    <FlowItem number="05" title={<>View Balance<br /><span className="text-[13px] opacity-70 mt-1 block">(out of context)</span></>} isLast />
                </div>
            </div>

            {/* Optimized Flow */}
            <div 
                className="bg-white p-8 md:p-12 outline outline-1 outline-emerald-500 border-r border-b border-transparent flex flex-col relative z-10"
            >
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-slate-900" />
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">Optimized Flow (2 Steps)</h3>
                    </div>
                    <div className="hidden md:flex bg-emerald-500 text-white px-4 py-2 items-center gap-3">
                        <ArrowDown className="w-4 h-4 text-emerald-100" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">60% fewer steps</span>
                    </div>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-5 gap-0 w-full">
                    <FlowItem number="01" title="Tap 'View Balance'" isOptimized />
                    <FlowItem number="02" title={<>Authenticate & View<br /><span className="text-[13px] opacity-70 mt-1 block">(in context)</span></>} isOptimized isLast />
                </div>
                
                {/* Mobile only metric tag */}
                <div className="mt-12 md:hidden">
                    <div className="bg-emerald-500 text-white px-5 py-4 inline-flex items-center gap-4">
                        <ArrowDown className="w-4 h-4 text-emerald-100" />
                        <span className="text-[12px] font-medium tracking-wide uppercase">60% fewer steps</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </Section>
  );
};