import React from 'react';
import { motion } from 'motion/react';
import { Wallet, Smartphone, ArrowRight, RefreshCw, Check, AlertCircle, ChevronRight } from 'lucide-react';
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
      className="relative flex flex-col items-center z-10 w-1/3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      {showCheckpoint && (
        <div className={`absolute -top-14 left-1/2 -translate-x-1/2 flex flex-col items-center w-max`}>
            <span className={clsx(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border mb-1",
              isGap 
                ? "bg-red-50 text-red-600 border-red-100" 
                : "bg-white text-gray-500 border-gray-100"
            )}>
                {showCheckpoint}
            </span>
            <div className={clsx(
              "w-px h-6",
              isGap ? "bg-red-200" : "bg-gray-200"
            )} />
        </div>
      )}

      <div className={clsx(
        "w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border mb-4 relative bg-white transition-all",
        isGap 
          ? "border-red-300 border-dashed text-red-500 bg-red-50/30" 
          : "border-gray-100 text-gray-700"
      )}>
         {isGap && (
             <div className="absolute inset-0 bg-red-50 opacity-30 rounded-2xl animate-pulse" />
         )}
        <Icon size={isGap ? 24 : 24} strokeWidth={2} className="relative z-10" />
      </div>
      
      <h4 className={clsx(
        "text-sm font-semibold mb-1 text-center",
        isGap ? "text-red-600" : "text-gray-900"
      )}>
        {title}
      </h4>
      
      <p className="text-[11px] text-gray-500 text-center leading-tight max-w-[160px] px-2">
        {description}
      </p>
    </motion.div>
  );
};

const FlowArrow = ({ color, delay }: { color: string, delay: number }) => (
    <motion.div 
        className={clsx(
            "absolute top-8 -translate-y-1/2 z-0 hidden md:flex items-center justify-center w-8 h-8 rounded-full",
             color === 'red' ? "text-red-300 bg-red-50" : color === 'blue' ? "text-blue-300 bg-blue-50" : "text-gray-300 bg-gray-100"
        )}
        style={{ left: 'calc(33.33% - 16px)' }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
    >
        <ChevronRight size={16} strokeWidth={3} />
    </motion.div>
);

const FlowArrowTwo = ({ color, delay }: { color: string, delay: number }) => (
    <motion.div 
        className={clsx(
            "absolute top-8 -translate-y-1/2 z-0 hidden md:flex items-center justify-center w-8 h-8 rounded-full",
             color === 'red' ? "text-red-300 bg-red-50" : color === 'blue' ? "text-blue-300 bg-blue-50" : "text-gray-300 bg-gray-100"
        )}
        style={{ left: 'calc(66.66% - 16px)' }}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
    >
        <ChevronRight size={16} strokeWidth={3} />
    </motion.div>
);

export const CheckpointsIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 flex flex-col gap-16">
      
      {/* Cash Flow */}
      <div className="relative p-8 md:p-10 bg-gray-50/50 rounded-[32px] border border-gray-100">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-20 pl-2">Physical Cash Experience</h3>
        
        <div className="relative flex justify-between items-start px-2 md:px-8">
          {/* Flow Arrows */}
          <FlowArrow color="gray" delay={0.15} />
          <FlowArrowTwo color="gray" delay={0.25} />

          {/* Dotted Line Background */}
           <div className="absolute top-8 left-[16%] right-[16%] border-t-2 border-dotted border-gray-200 -z-10" />

          <StepNode 
            icon={Wallet} 
            title="Check Wallet" 
            description="Users peek inside to see available cash before transaction."
            delay={0.1}
            showCheckpoint="Checkpoint 1"
          />
          
          <StepNode 
            icon={ArrowRight} 
            title="Transaction" 
            description="Physical exchange of currency."
            delay={0.2}
          />
          
          <StepNode 
            icon={RefreshCw} 
            title="Count Change" 
            description="Mental calculation: 'Is this the right amount back?'"
            delay={0.3}
            showCheckpoint="Checkpoint 2"
          />
        </div>
      </div>

      {/* UPI Flow */}
      <div className="relative p-8 md:p-10 bg-blue-50/30 rounded-[32px] border border-blue-100/50">
        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-20 pl-2">Digital UPI Experience</h3>
        
        <div className="relative flex justify-between items-start px-2 md:px-8">
          {/* Flow Arrows */}
          <FlowArrow color="blue" delay={0.45} />
          <FlowArrowTwo color="red" delay={0.55} />

          {/* Dotted Line Background */}
          <div className="absolute top-8 left-[16%] right-[16%] border-t-2 border-dotted border-blue-200/60 -z-10" />

          <StepNode 
            icon={Smartphone} 
            title="Check Balance" 
            description="Supported via home screen widgets or app dashboard."
            delay={0.4}
            showCheckpoint="Checkpoint 1"
          />
          
          <StepNode 
            icon={Check} 
            title="Payment Success" 
            description="Green tick appears instantly. Interaction ends."
            delay={0.5}
          />
          
          <StepNode 
            icon={AlertCircle} 
            title="Existing Gap" 
            description="No moment to recalibrate. The mental math is skipped."
            isGap
            delay={0.6}
            showCheckpoint="Checkpoint 2"
          />
        </div>
      </div>

    </div>
  );
};
