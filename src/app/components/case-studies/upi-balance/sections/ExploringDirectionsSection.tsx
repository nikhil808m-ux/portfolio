import React, { useState } from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { Check, Eye, MoreHorizontal, MessageSquareWarning } from 'lucide-react';

const MobileFrame = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={clsx("w-72 h-[520px] rounded-[36px] border-[6px] border-slate-900 bg-white relative overflow-hidden flex flex-col", className)}>
    <div className="flex-1 flex flex-col">
      {children}
    </div>
  </div>
);

const AnnotationMarker = ({ number, className, isHighlighted }: { number: number, className?: string, isHighlighted: boolean }) => (
    <motion.div 
        style={{ transform: 'translateZ(0)' }}
        className={clsx(
            "absolute w-6 h-6 rounded-[2px] flex items-center justify-center text-xs font-bold border z-20 cursor-default transition-all duration-300", 
            isHighlighted ? "bg-slate-900 text-white border-slate-900 scale-110" : "bg-slate-100 text-slate-400 border-slate-200",
            className
        )}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 25 }}
    >
        {number}
    </motion.div>
);

const CritiqueItem = ({ number, title, desc, onHover, onLeave, isHighlighted }: { number: number, title: string, desc: string, onHover: () => void, onLeave: () => void, isHighlighted: boolean }) => (
    <div className="flex gap-6 items-start group cursor-pointer" onMouseEnter={onHover} onMouseLeave={onLeave}>
        <div className={clsx(
            "w-8 h-8 rounded-[2px] border flex items-center justify-center text-[13px] font-bold shrink-0 mt-1 transition-all duration-300",
            isHighlighted ? "bg-slate-900 text-white border-slate-900 scale-110" : "bg-transparent text-slate-400 border-slate-200 group-hover:border-slate-900 group-hover:text-slate-900"
        )}>
            {number}
        </div>
        <div>
            <h4 className={clsx("text-[17px] font-medium transition-colors duration-300 mb-1", isHighlighted ? "text-slate-900" : "text-slate-900")}>
                {title}
            </h4>
            <p className="text-[15px] text-slate-500 leading-relaxed font-light">{desc}</p>
        </div>
    </div>
);

const LofiSuccessScreen = ({ highlightedMarker }: { highlightedMarker: number | null }) => (
  <MobileFrame className="bg-white">
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
      <AnnotationMarker number={1} className="top-[22%] right-[22%]" isHighlighted={highlightedMarker === 1} />
      <AnnotationMarker number={2} className="top-[42%] left-[15%]" isHighlighted={highlightedMarker === 2} />

      <div className={clsx("w-20 h-20 border rounded-[2px] flex items-center justify-center mb-8 transition-colors duration-500", highlightedMarker === 1 ? "bg-slate-50 border-slate-900" : "bg-transparent border-slate-200")}>
        <Check size={36} className={clsx("transition-colors duration-500", highlightedMarker === 1 ? "text-slate-900" : "text-slate-300")} strokeWidth={2.5} />
      </div>

      <div className={clsx("flex flex-col items-center gap-3 mb-12 w-full p-3 border rounded-[2px] transition-colors duration-300", highlightedMarker === 2 ? "bg-slate-50 border-slate-900" : "bg-transparent border-transparent")}>
        <div className="h-5 w-28 bg-slate-200 rounded-[2px]" />
        <div className="h-3 w-36 bg-slate-100 rounded-[2px]" />
      </div>

      <div className="w-full bg-transparent p-5 rounded-[2px] border border-slate-200 space-y-4 mb-auto">
        <div className="flex justify-between items-center"><div className="h-2 w-12 bg-slate-200 rounded-[2px]" /><div className="h-2 w-20 bg-slate-200 rounded-[2px]" /></div>
        <div className="w-full h-px bg-slate-200" />
        <div className="flex justify-between items-center"><div className="h-2 w-16 bg-slate-200 rounded-[2px]" /><div className="h-2 w-8 bg-slate-200 rounded-[2px]" /></div>
      </div>
    </div>
    <div className="p-6 bg-transparent border-t border-slate-200 flex items-center justify-center">
       <div className="relative w-full">
         <AnnotationMarker number={3} className="-top-3 -right-2" isHighlighted={highlightedMarker === 3} />
         <div className={clsx("h-14 w-full rounded-[2px] flex items-center justify-center border transition-all duration-300", highlightedMarker === 3 ? "bg-slate-50 border-slate-900" : "bg-transparent border-slate-200")}>
            <span className={clsx("font-medium text-[15px] tracking-wide transition-colors duration-300", highlightedMarker === 3 ? "text-slate-900" : "text-slate-400")}>Done</span>
         </div>
       </div>
    </div>
  </MobileFrame>
);

const IdeationSketch = ({ variant, isSelected }: { variant: 'auto' | 'action' | 'mask' | 'nudge', isSelected?: boolean }) => {
    return (
        <div className={clsx(
            "w-full aspect-[9/16] rounded-[24px] bg-white relative overflow-hidden flex flex-col transition-all duration-500 group",
            isSelected ? "border-[4px] border-slate-900 scale-[1.02] z-10" : "border-[4px] border-slate-200 hover:border-slate-300"
        )}>
            <div className="h-[30%] bg-transparent border-b border-slate-200 flex items-center justify-center relative">
                 <div className="w-10 h-10 rounded-[2px] border border-slate-200 bg-transparent flex items-center justify-center"><Check size={16} className="text-slate-400" strokeWidth={2.5} /></div>
            </div>
            <div className="flex-1 p-5 flex flex-col items-center">
                <div className="h-1.5 w-16 bg-slate-200 rounded-[2px] mb-8" />
                
                 {variant === 'auto' && (
                    <div className="w-full mt-auto mb-6 p-4 bg-transparent border border-slate-200 rounded-[2px] flex flex-col items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-[0.2em]">Balance</span>
                        <span className="text-[15px] font-medium text-slate-800">₹ 4,250</span>
                    </div>
                )}
                {variant === 'action' && (
                    <div className="mt-auto mb-6">
                        <div className="h-9 px-5 border border-slate-900 bg-slate-900 rounded-[2px] flex items-center gap-2.5">
                            <Eye size={12} className="text-white" />
                            <span className="text-[11px] font-semibold tracking-wide text-white">View Balance</span>
                        </div>
                    </div>
                )}
                {variant === 'mask' && (
                    <div className="w-full mt-auto mb-6 p-4 bg-transparent border border-slate-200 rounded-[2px] flex flex-col items-center gap-1.5">
                        <span className="text-[9px] text-slate-400 uppercase font-bold tracking-[0.2em]">Balance</span>
                        <div className="flex gap-1 mt-1"><MoreHorizontal size={16} className="text-slate-300" /></div>
                    </div>
                )}
                {variant === 'nudge' && (
                    <div className="mt-auto mb-6 w-full p-3 border border-slate-200 bg-transparent rounded-[2px] flex items-center justify-center gap-2">
                        <MessageSquareWarning size={14} className="text-slate-400" />
                        <span className="text-[10px] text-slate-600 font-medium">You've spent ₹1,200 today</span>
                    </div>
                )}
            </div>
             {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-slate-900 rounded-[2px] flex items-center justify-center text-white">
                    <Check size={12} strokeWidth={3} />
                </div>
            )}
        </div>
    );
}

export const ExploringDirectionsSection: React.FC = () => {
  const [hoveredCritique, setHoveredCritique] = useState<number | null>(null);

  return (
    <Section variant="base" className="py-32">
      <div className="flex flex-col gap-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1">
                 <TextBlock 
                    eyebrow="05 — Ideation"
                    title="Deconstructing the dead end. Then building from it." 
                    subtitle=""
                >
                    <p className="mb-12 text-slate-500 font-light text-[17px] leading-relaxed">
                        Before looking for solutions, I spent time with the existing Payment Successful screen. What is it actually designed to do? Get you out. Efficiently. It is a very well-designed dead end.
                    </p>
                    
                    <div className="flex flex-col gap-8">
                        <CritiqueItem 
                            number={1}
                            title="The green tick closes the loop too early" 
                            desc="The green tick signals closure so effectively that the financial moment closes with it. By the time it appears, any instinct to check what's remaining has already dissolved. The tick doesn't just confirm the payment — it ends the conversation." 
                            onHover={() => setHoveredCritique(1)}
                            onLeave={() => setHoveredCritique(null)}
                            isHighlighted={hoveredCritique === 1}
                        />
                        <CritiqueItem 
                            number={2}
                            title="The information silo" 
                            desc="The screen tells you what you paid. It does not tell you what you have left. That second number is the only one that actually matters at this point — and it's nowhere on screen." 
                            onHover={() => setHoveredCritique(2)}
                            onLeave={() => setHoveredCritique(null)}
                            isHighlighted={hoveredCritique === 2}
                        />
                        <CritiqueItem 
                            number={3}
                            title="Done is the only door" 
                            desc="Done is the only exit. No secondary option, no quiet path to pause and check. If you want your balance, you have to leave this screen entirely — leaving the context behind." 
                            onHover={() => setHoveredCritique(3)}
                            onLeave={() => setHoveredCritique(null)}
                            isHighlighted={hoveredCritique === 3}
                        />
                    </div>
                </TextBlock>
            </div>
            
            <div className="flex justify-center order-1 lg:order-2">
                <div
                    className="relative"
                >
                    <LofiSuccessScreen highlightedMarker={hoveredCritique} />
                    <div className="absolute -bottom-12 left-0 w-full text-center">
                         <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.2em]">Figure 01 — The Dead End</p>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div className="mb-20 max-w-3xl">
                <h3 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 tracking-tight">Four directions explored</h3>
                <p className="text-lg text-slate-500 leading-relaxed font-light">
                    The constraint was clear: bring the recalibration moment back without slowing the transaction down, exposing balance by default, or adding a mandatory step. These four directions were explored in order. The first was ruled out by architecture. The next two by UX problems. That left one.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col gap-6">
                    <IdeationSketch variant="auto" />
                    <div>
                        <h4 className="font-medium text-[16px] text-slate-900 mb-2">Concept 1: Auto-Display</h4>
                        <p className="text-[14px] text-slate-500 mb-4 leading-relaxed font-light">Simplest on the surface. Show the balance as soon as the payment confirms.</p>
                        <div className="flex flex-col gap-2">
                            <span className="text-[11px] font-medium text-slate-500 bg-transparent border border-slate-200 px-2.5 py-1 rounded-[2px] w-fit">Privacy: Exposed</span>
                            <span className="text-[11px] font-medium text-slate-500 bg-transparent border border-slate-200 px-2.5 py-1 rounded-[2px] w-fit">Technical: Unviable</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 relative">
                    <IdeationSketch variant="action" isSelected />
                    <div>
                        <h4 className="font-medium text-[16px] text-slate-900 mb-2">Concept 2: Voluntary Chip</h4>
                        <p className="text-[14px] text-slate-500 mb-4 leading-relaxed font-light">An optional "View Balance" chip. User-initiated, stays firmly within context.</p>
                        <div className="flex flex-col gap-2">
                            <span className="text-[11px] font-medium text-slate-900 bg-transparent border border-slate-900 px-2.5 py-1 rounded-[2px] w-fit">Private by default</span>
                            <span className="text-[11px] font-medium text-slate-900 bg-transparent border border-slate-900 px-2.5 py-1 rounded-[2px] w-fit">Zero extra navigation</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <IdeationSketch variant="mask" />
                    <div>
                        <h4 className="font-medium text-[16px] text-slate-900 mb-2">Concept 3: Masked Row</h4>
                        <p className="text-[14px] text-slate-500 mb-4 leading-relaxed font-light">Balance present but masked. Tap the row to reveal it.</p>
                        <div className="flex flex-col gap-2">
                            <span className="text-[11px] font-medium text-slate-500 bg-transparent border border-slate-200 px-2.5 py-1 rounded-[2px] w-fit">Ambiguous affordance</span>
                            <span className="text-[11px] font-medium text-slate-500 bg-transparent border border-slate-200 px-2.5 py-1 rounded-[2px] w-fit">Interaction confusion</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <IdeationSketch variant="nudge" />
                    <div>
                        <h4 className="font-medium text-[16px] text-slate-900 mb-2">Concept 4: Contextual Nudge</h4>
                        <p className="text-[14px] text-slate-500 mb-4 leading-relaxed font-light">A smart nudge: once spending crosses a threshold, show an alert.</p>
                        <div className="flex flex-col gap-2">
                            <span className="text-[11px] font-medium text-slate-500 bg-transparent border border-slate-200 px-2.5 py-1 rounded-[2px] w-fit">Feels like surveillance</span>
                            <span className="text-[11px] font-medium text-slate-500 bg-transparent border border-slate-200 px-2.5 py-1 rounded-[2px] w-fit">Crosses into force-feeding</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </Section>
  );
};