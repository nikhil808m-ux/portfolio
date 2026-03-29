import React from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { clsx } from 'clsx';

const FlowItem = ({ number, title, isOptimized, isLast }: { number: string, title: string, isOptimized?: boolean, isLast?: boolean }) => (
    <div className={clsx(
        "flex items-start gap-6 py-6",
        !isLast && "border-b",
        isOptimized ? "border-slate-200" : "border-slate-200/60"
    )}>
        <span className={clsx(
            "text-[10px] font-mono tracking-widest pt-1",
            isOptimized ? "text-slate-900" : "text-slate-400"
        )}>
            {number}
        </span>
        <span className={clsx(
            "text-[16px] font-medium leading-relaxed tracking-tight",
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
        <div className="max-w-3xl mb-12 md:mb-16">
            <TextBlock 
              eyebrow="08 — System Efficiency"
              title="From five steps to two." 
              subtitle=""
            >
              <p className="text-slate-500 font-light text-[17px] leading-relaxed">
                The previous process of checking a balance post-payment required completely abandoning the transaction context. By placing the action inside the success state, we reduce cognitive load and friction significantly.
              </p>
            </TextBlock>
        </div>

        {/* Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-slate-200">
            
            {/* Previous Flow */}
            <div 
                className="bg-slate-50 p-8 md:p-12 lg:p-16 border-r border-b border-slate-200 flex flex-col"
            >
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-2 h-2 border border-slate-400 rounded-full" />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">Previous Flow (5 Steps)</h3>
                </div>
                
                <div className="flex flex-col gap-0">
                    <FlowItem number="01" title="Tap 'Done' to exit" />
                    <FlowItem number="02" title="Navigate to Home" />
                    <FlowItem number="03" title="Find 'Check Balance'" />
                    <FlowItem number="04" title="Select Account & Authenticate" />
                    <FlowItem number="05" title="View Balance (Out of context)" isLast />
                </div>
            </div>

            {/* Optimized Flow */}
            <div 
                className="bg-white p-8 md:p-12 lg:p-16 outline outline-1 outline-emerald-500 border-r border-b border-transparent flex flex-col relative z-10"
            >
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-2 h-2 bg-slate-900" />
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">Optimized Flow (2 Steps)</h3>
                </div>

                <div className="flex flex-col gap-0">
                    <FlowItem number="01" title="Tap 'View Balance'" isOptimized />
                    <FlowItem number="02" title="Authenticate & View (In context)" isOptimized isLast />
                </div>
                
                <div className="mt-16 md:mt-auto pt-16 md:pt-24">
                    <div className="bg-emerald-500 text-white px-5 py-4 inline-flex items-center gap-4">
                        <ArrowDown className="w-4 h-4 text-emerald-100" />
                        <span className="text-[12px] font-medium tracking-wide uppercase">60% Reduction in Interaction Cost</span>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </Section>
  );
};