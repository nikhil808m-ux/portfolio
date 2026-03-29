import React from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { ChevronRight } from 'lucide-react';

const GOOGLE_BLUE_BG = "bg-[#E8F0FE]";
const GOOGLE_BLUE_TEXT = "text-[#1967D2]";
const GOOGLE_GRAY_BG = "bg-[#F1F3F4]";
const GOOGLE_GRAY_TEXT = "text-[#3C4043]";

const FlowNode = ({ label, variant, isLast, index }: { label: string, variant: 'grey' | 'blue', isLast?: boolean, index: number }) => (
  <div className="flex items-center">
    <motion.div 
      style={{ transform: 'translateZ(0)' }}
      className={clsx(
        "px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap shadow-sm transition-all hover:shadow-md",
        variant === 'grey' 
          ? `${GOOGLE_GRAY_BG} border-transparent ${GOOGLE_GRAY_TEXT}` 
          : `${GOOGLE_BLUE_BG} border-transparent ${GOOGLE_BLUE_TEXT}`
      )}
      initial={{ opacity: 0, scale: 0.9, y: 5 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {label}
    </motion.div>
    {!isLast && (
      <motion.div 
        style={{ transform: 'translateZ(0)' }}
        className="mx-2 text-gray-300"
        initial={{ opacity: 0, x: -5 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: (index * 0.1) + 0.1 }}
        viewport={{ once: true }}
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </motion.div>
    )}
  </div>
);

const FlowRow = ({ title, nodes, variant }: { title: string, nodes: string[], variant: 'grey' | 'blue' }) => (
  <div className="flex flex-col gap-4">
    <h4 className={clsx("text-xs font-bold uppercase tracking-widest pl-1 mb-1", variant === 'grey' ? "text-gray-400" : "text-blue-600")}>
      {title}
    </h4>
    <div className="flex flex-wrap gap-y-4 items-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      {nodes.map((node, i) => (
        <FlowNode key={i} label={node} variant={variant} isLast={i === nodes.length - 1} index={i} />
      ))}
    </div>
  </div>
);

export const FlowComparisonIllustration: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto py-8 font-sans">
      <FlowRow 
        title="Current Flow — Checking balance today" 
        variant="grey" 
        nodes={["Payment Success", "Tap Done", "Navigate to Balance", "Select Bank Account", "Enter UPI PIN", "View Balance"]} 
      />
      
      <FlowRow 
        title="Proposed Flow — Checkpoint 2 restored" 
        variant="blue" 
        nodes={["Payment Success", "Tap View Balance", "Authenticate", "Balance in bottom sheet"]} 
      />
    </div>
  );
};
