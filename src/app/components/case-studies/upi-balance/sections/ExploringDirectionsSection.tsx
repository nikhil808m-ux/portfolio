import React, { useState } from 'react';
import { Section, TextBlock } from '../Section';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { Check, Eye } from 'lucide-react';

// --- COMPONENTS ---

const MobileFrame = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={clsx("w-64 h-[480px] rounded-[36px] border-[4px] border-gray-200 bg-white relative overflow-hidden flex flex-col shadow-xl", className)}>
    {children}
  </div>
);

const AnnotationMarker = ({ 
    number, 
    className, 
    isHighlighted 
}: { 
    number: number, 
    className?: string, 
    isHighlighted: boolean 
}) => (
    <motion.div 
        className={clsx(
            "absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-white z-20 cursor-default transition-colors duration-300", 
            isHighlighted ? "bg-purple-600 text-white scale-110 ring-purple-100" : "bg-gray-400 text-white",
            className
        )}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 0.5 + (number * 0.1), type: "spring" }}
    >
        {number}
    </motion.div>
);

const CritiqueItem = ({ 
    number, 
    title, 
    desc,
    onHover,
    onLeave,
    isHighlighted
}: { 
    number: number, 
    title: string, 
    desc: string,
    onHover: () => void,
    onLeave: () => void,
    isHighlighted: boolean
}) => (
    <div 
        className="flex gap-5 items-start group cursor-pointer"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
    >
        <div className={clsx(
            "w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 transition-all duration-300 shadow-sm",
            isHighlighted 
                ? "bg-purple-600 text-white border-purple-600 scale-110" 
                : "bg-gray-50 text-gray-500 border-gray-200 group-hover:border-purple-300 group-hover:text-purple-500"
        )}>
            {number}
        </div>
        <div>
            <h4 className={clsx(
                "text-sm font-bold transition-colors duration-300",
                isHighlighted ? "text-purple-700" : "text-gray-900 group-hover:text-purple-600"
            )}>
                {title}
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed mt-1">{desc}</p>
        </div>
    </div>
);

const LofiSuccessScreen = ({ highlightedMarker }: { highlightedMarker: number | null }) => (
  <MobileFrame className="bg-gray-50/30">
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
      
      {/* Annotations */}
      {/* 1. Success Trap -> Checkmark */}
      <AnnotationMarker 
        number={1} 
        className="top-[22%] right-[22%]" 
        isHighlighted={highlightedMarker === 1} 
      />
      
      {/* 2. Info Silo -> Amount Area */}
      <AnnotationMarker 
        number={2} 
        className="top-[42%] left-[15%]" 
        isHighlighted={highlightedMarker === 2} 
      />
      
      {/* 3. Forced Exit -> Done Button */}
      <AnnotationMarker 
        number={3} 
        className="bottom-[10%] right-[10%]" 
        isHighlighted={highlightedMarker === 3} 
      />

      {/* Success Icon */}
      <div className={clsx(
          "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-300",
          highlightedMarker === 1 ? "bg-purple-100" : "bg-gray-100"
      )}>
        <Check size={40} className={clsx("transition-colors duration-300", highlightedMarker === 1 ? "text-purple-500" : "text-gray-400")} strokeWidth={3} />
      </div>

      {/* Amount & Text */}
      <div className={clsx(
          "flex flex-col items-center gap-2 mb-12 w-full p-2 rounded-lg transition-colors duration-300",
          highlightedMarker === 2 ? "bg-purple-50/50" : ""
      )}>
        <div className="h-6 w-32 bg-gray-200 rounded-md" />
        <div className="h-3 w-40 bg-gray-100 rounded-sm" />
      </div>

      {/* Details Card */}
      <div className="w-full bg-white p-5 rounded-2xl border border-gray-100 space-y-4 mb-auto opacity-60">
        <div className="flex justify-between items-center">
            <div className="h-2 w-12 bg-gray-100 rounded" />
            <div className="h-2 w-20 bg-gray-100 rounded" />
        </div>
        <div className="w-full h-px bg-gray-50" />
        <div className="flex justify-between items-center">
            <div className="h-2 w-16 bg-gray-100 rounded" />
            <div className="h-2 w-8 bg-gray-100 rounded" />
        </div>
      </div>
    </div>

    {/* Bottom Action */}
    <div className="p-6 bg-white border-t border-gray-50">
       <div className={clsx(
           "h-12 w-full rounded-full flex items-center justify-center border transition-all duration-300",
           highlightedMarker === 3 
            ? "bg-purple-50 border-purple-200 shadow-sm" 
            : "bg-gray-50 border-gray-200"
       )}>
          <span className={clsx(
              "font-medium text-sm tracking-wide transition-colors duration-300",
              highlightedMarker === 3 ? "text-purple-700" : "text-gray-400"
          )}>Done</span>
       </div>
    </div>
  </MobileFrame>
);

const IdeationSketch = ({ 
    variant, 
    isSelected 
}: { 
    variant: 'auto' | 'action' | 'estimate' | 'cue',
    isSelected?: boolean
}) => {
    return (
        <div className={clsx(
            "w-full aspect-[9/16] rounded-2xl border bg-white relative overflow-hidden flex flex-col transition-all duration-300 group",
            isSelected 
                ? "border-emerald-500 shadow-[0_8px_30px_rgb(16,185,129,0.15)] ring-2 ring-emerald-50 scale-[1.02]" 
                : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
        )}>
            {/* Header Area */}
            <div className="h-[30%] bg-gray-50/50 border-b border-gray-50 flex items-center justify-center relative">
                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Check size={14} className="text-white" strokeWidth={3} />
                 </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 flex flex-col items-center">
                <div className="h-1.5 w-16 bg-gray-100 rounded mb-8" />
                
                 {variant === 'auto' && (
                    <div className="w-full mt-auto mb-6 p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex flex-col items-center gap-1">
                        <span className="text-[8px] text-emerald-600 uppercase font-bold tracking-wider">Balance</span>
                        <span className="text-sm font-bold text-gray-800">₹ 4,250</span>
                    </div>
                )}

                {variant === 'action' && (
                    <div className="mt-auto mb-6">
                        <div className="h-8 px-4 border border-blue-200 bg-blue-50/50 rounded-full flex items-center gap-2 shadow-sm group-hover:scale-105 transition-transform">
                            <Eye size={10} className="text-blue-600" />
                            <span className="text-[10px] font-bold text-blue-700">Check Balance</span>
                        </div>
                    </div>
                )}

                {variant === 'estimate' && (
                    <div className="mt-auto mb-6 flex flex-col items-center gap-2">
                         <div className="flex items-center gap-1.5 opacity-60">
                            <span className="text-xs text-gray-400 font-serif italic">approx.</span>
                            <div className="h-3 w-12 bg-gray-200 rounded" />
                        </div>
                        <span className="text-[8px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Based on last SMS</span>
                    </div>
                )}

                {variant === 'cue' && (
                    <div className="mt-auto mb-6 w-full px-2">
                         <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                            <div className="w-2/3 h-full bg-orange-300" />
                        </div>
                        <div className="flex justify-between px-1">
                             {[1,2,3].map(i => <div key={i} className="w-px h-1.5 bg-gray-200" />)}
                        </div>
                    </div>
                )}
            </div>

             {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm text-white">
                    <Check size={10} strokeWidth={3} />
                </div>
            )}
        </div>
    );
}

export const ExploringDirectionsSection: React.FC = () => {
  const [hoveredCritique, setHoveredCritique] = useState<number | null>(null);

  return (
    <Section variant="base" className="py-24">
      <div className="flex flex-col gap-24">
        
        {/* CURRENT STATE ANALYSIS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
                 <TextBlock 
                    title="Analyzing the Moment" 
                    subtitle="Before designing, I deconstructed the existing 'Payment Successful' screen."
                >
                    <p className="mb-10 text-gray-600">
                        The current design is optimized for a single outcome: <span className="text-gray-900 font-medium">Termination</span>. 
                        It actively discourages any further interaction.
                    </p>
                    
                    <div className="flex flex-col gap-6">
                        <CritiqueItem 
                            number={1}
                            title="The 'Success' Trap" 
                            desc="The prominent green checkmark triggers a dopamine release (closure), signalling the brain to switch off the financial context immediately." 
                            onHover={() => setHoveredCritique(1)}
                            onLeave={() => setHoveredCritique(null)}
                            isHighlighted={hoveredCritique === 1}
                        />
                        <CritiqueItem 
                            number={2}
                            title="Information Silo" 
                            desc="The screen displays only the debit amount. It completely omits the resulting state (remaining balance), creating a mental gap." 
                            onHover={() => setHoveredCritique(2)}
                            onLeave={() => setHoveredCritique(null)}
                            isHighlighted={hoveredCritique === 2}
                        />
                        <CritiqueItem 
                            number={3}
                            title="Forced Exit" 
                            desc="The primary 'Done' button is the only path forward, physically routing the user away from their finances." 
                            onHover={() => setHoveredCritique(3)}
                            onLeave={() => setHoveredCritique(null)}
                            isHighlighted={hoveredCritique === 3}
                        />
                    </div>
                </TextBlock>
            </div>
            
            <div className="flex justify-center order-1 lg:order-2">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <LofiSuccessScreen highlightedMarker={hoveredCritique} />
                    <div className="absolute -bottom-10 left-0 w-full text-center">
                         <p className="text-xs font-mono text-gray-400 uppercase tracking-[0.2em]">Figure 01: The Dead End</p>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* IDEATION */}
        <div>
            <div className="mb-16 max-w-2xl">
                <h3 className="text-3xl font-semibold text-gray-900 mb-6 font-sans">Ideation: Sketches & Concepts</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                    I explored four ways to introduce "financial mindfulness" without breaking the flow. 
                    The challenge was finding the balance between <span className="text-gray-900 font-medium bg-gray-100 px-1 rounded">information</span> and <span className="text-gray-900 font-medium bg-gray-100 px-1 rounded">interruption</span>.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                
                {/* Concept 1 */}
                <div className="flex flex-col gap-5">
                    <IdeationSketch variant="auto" />
                    <div>
                        <h4 className="font-bold text-sm text-gray-900">Auto-Display</h4>
                        <p className="text-xs text-gray-500 mt-1 mb-2">Show balance instantly.</p>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Risk: Privacy</span>
                        </div>
                    </div>
                </div>

                {/* Concept 2 (Winner) */}
                <div className="flex flex-col gap-5 relative">
                    <IdeationSketch variant="action" isSelected />
                    <div>
                        <h4 className="font-bold text-sm text-emerald-800">Voluntary Action</h4>
                        <p className="text-xs text-gray-500 mt-1 mb-2">"Check Balance" chip.</p>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-medium text-emerald-700 uppercase tracking-wide">Selected Concept</span>
                        </div>
                    </div>
                </div>

                {/* Concept 3 */}
                <div className="flex flex-col gap-5">
                    <IdeationSketch variant="estimate" />
                    <div>
                        <h4 className="font-bold text-sm text-gray-900">Soft Estimate</h4>
                        <p className="text-xs text-gray-500 mt-1 mb-2">Last known + deduction.</p>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Risk: Accuracy</span>
                        </div>
                    </div>
                </div>

                {/* Concept 4 */}
                <div className="flex flex-col gap-5">
                    <IdeationSketch variant="cue" />
                    <div>
                        <h4 className="font-bold text-sm text-gray-900">Visual Cue</h4>
                        <p className="text-xs text-gray-500 mt-1 mb-2">Abstract progress bar.</p>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Risk: Ambiguity</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </Section>
  );
};
