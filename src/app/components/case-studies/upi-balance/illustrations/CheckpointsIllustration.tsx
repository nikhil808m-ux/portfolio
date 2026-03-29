import React from 'react';
import { motion } from 'motion/react';
import { Wallet, Smartphone, ArrowRight, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

const StepNode = ({ 
  icon: Icon, 
  title, 
  description, 
  isGap, 
  delay,
  showCheckpoint 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  isGap?: boolean;
  delay: number;
  showCheckpoint?: string;
}) => {
  return (
    <motion.div 
      style={{ transform: 'translateZ(0)' }}
      className="relative flex flex-col items-center z-10 w-1/3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {showCheckpoint && (
        <div className={`absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center w-max`}>
            <span className={clsx(
              "px-3 py-1 rounded-[2px] text-[10px] font-bold uppercase tracking-[0.2em] border mb-2 bg-transparent",
              isGap 
                ? "text-rose-600 border-rose-200" 
                : "text-slate-900 border-slate-200"
            )}>
                {showCheckpoint}
            </span>
            <div className={clsx(
              "w-px h-6",
              isGap ? "bg-rose-200" : "bg-slate-200"
            )} />
        </div>
      )}

      <div className={clsx(
        "w-16 h-16 rounded-[2px] flex items-center justify-center border mb-6 relative bg-transparent transition-all",
        isGap 
          ? "border-rose-300 border-dashed text-rose-600" 
          : "border-slate-200 text-slate-900"
      )}>
        <Icon size={isGap ? 24 : 24} strokeWidth={1.5} className="relative z-10" />
      </div>
      
      <h4 className={clsx(
        "text-[14px] font-medium mb-2 text-center tracking-tight",
        isGap ? "text-rose-600" : "text-slate-900"
      )}>
        {title}
      </h4>
      
      <p className="text-[13px] text-slate-500 text-center leading-relaxed font-light max-w-[180px] px-2">
        {description}
      </p>
    </motion.div>
  );
};

const FlowArrow = ({ delay, left, isGap }: { delay: number, left: string, isGap?: boolean }) => (
    <motion.div 
        className={clsx(
            "absolute top-8 -translate-y-1/2 z-0 hidden md:flex items-center justify-center w-8 h-8 bg-transparent",
             isGap ? "text-rose-300" : "text-slate-300"
        )}
        style={{ transform: 'translateZ(0)', left }}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.4 }}
    >
        <ArrowRight size={20} strokeWidth={1.5} />
    </motion.div>
);

export const CheckpointsIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 flex flex-col gap-12">
      
      {/* Cash Flow */}
      <div className="relative p-10 md:p-12 bg-transparent rounded-[2px] border border-slate-200 overflow-hidden">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-20 pl-2">Physical Cash Experience</h3>
        
        <div className="relative flex justify-between items-start px-2 md:px-8">
          {/* Flow Arrows */}
          <FlowArrow delay={0.15} left="calc(33.33% - 16px)" />
          <FlowArrow delay={0.25} left="calc(66.66% - 16px)" />

          {/* Solid Line Background */}
           <div className="absolute top-8 left-[16%] right-[16%] border-t border-solid border-slate-200 -z-10" />

          <StepNode 
            icon={Wallet} 
            title="Check Wallet" 
            description="Glance inside, physically feel available cash."
            delay={0.1}
            showCheckpoint="Checkpoint 1 ✓"
          />
          
          <StepNode 
            icon={ArrowRight} 
            title="Transaction" 
            description="Hand over notes. Receive change."
            delay={0.2}
          />
          
          <StepNode 
            icon={RefreshCw} 
            title="Count Change" 
            description="Mental math kicks in automatically."
            delay={0.3}
            showCheckpoint="Checkpoint 2 ✓"
          />
        </div>
      </div>

      {/* Digital Flow */}
      <div className="relative p-10 md:p-12 bg-white rounded-[2px] border border-slate-300 overflow-hidden">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-20 pl-2">Digital Experience</h3>
        
        <div className="relative flex justify-between items-start px-2 md:px-8">
          {/* Flow Arrows */}
          <FlowArrow delay={0.45} left="calc(33.33% - 16px)" />
          <FlowArrow delay={0.55} left="calc(66.66% - 16px)" isGap />

          {/* Line Background */}
          <div className="absolute top-8 left-[16%] right-[50%] border-t border-solid border-slate-200 -z-10" />
          <div className="absolute top-8 left-[50%] right-[16%] border-t border-dashed border-rose-200 -z-10" />

          <StepNode 
            icon={Smartphone} 
            title="Check Balance" 
            description="Supported via home screen or specific sections."
            delay={0.4}
            showCheckpoint="Checkpoint 1 ✓"
          />
          
          <StepNode 
            icon={Check} 
            title="Payment Success" 
            description="Green tick. Instant confirmation. Flow ends."
            delay={0.5}
          />
          
          <StepNode 
            icon={AlertCircle} 
            title="The Gap" 
            description="No natural recalibration. Cognitive process aborted."
            isGap
            delay={0.6}
            showCheckpoint="Checkpoint 2 ✗"
          />
        </div>
      </div>

    </div>
  );
};