import React from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { Layers, ArrowRight, MousePointerClick } from 'lucide-react';
import { FinalInterventionIllustration } from '../illustrations/FinalInterventionIllustration';

export const FinalInterventionSection: React.FC = () => {
  return (
    <Section variant="base" className="py-32 md:py-48">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Text & Grid */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          <TextBlock 
            eyebrow="07 — The Intervention"
            title="The lost reflection, back where it belongs." 
            subtitle=""
          >
            <p className="mb-8 text-slate-500 font-light text-[17px] leading-relaxed">
              We return to the final moment. The payment is successful, the transaction is logged, but the cognitive loop is left open. Here is how we close it—without breaking the flow, without forcing an interaction, and without violating the architecture.
            </p>
          </TextBlock>

          {/* Architectural Style Grid for Principles */}
          <div className="grid grid-cols-1 gap-0 border-t border-l border-slate-200">
            
            <div 
              className="p-6 md:p-8 border-b border-r border-slate-200 bg-white"
            >
              <Layers className="w-5 h-5 text-slate-900 mb-4 stroke-[1.5]" />
              <h4 className="text-lg font-medium text-slate-900 mb-2 tracking-tight">Voluntary & seamless</h4>
              <p className="text-[15px] font-light text-slate-500 leading-relaxed">
                The core 'Done' flow remains completely untouched. The reflection opportunity sits alongside it—revealed smoothly via a bottom sheet within the success screen. The user never leaves the moment; the financial context remains intact.
              </p>
            </div>
            
            <div 
              className="p-6 md:p-8 border-b border-r border-slate-200 bg-slate-50 relative"
            >
              <ArrowRight className="w-5 h-5 text-slate-900 mb-4 stroke-[1.5]" />
              <h4 className="text-lg font-medium text-slate-900 mb-2 tracking-tight">Restores the mental math</h4>
              <p className="text-[15px] font-light text-slate-500 leading-relaxed">
                Seeing the updated balance immediately after paying achieves what counting change once did. "Spent ₹250. ₹9,750 left." Two steps instead of five, exactly when it matters most.
              </p>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Prototype */}
        <div className="order-1 lg:order-2 flex flex-col items-center justify-center relative mt-8 lg:mt-0 h-full lg:translate-y-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: 'translateZ(0)' }}
            className="w-full h-full flex flex-col items-center justify-center group"
          >
            <div className="relative flex flex-col items-center">
              <FinalInterventionIllustration />

              {/* Pulsating Interaction Prompt */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-6 md:-bottom-10 z-20 flex flex-col items-center gap-3 pointer-events-none"
              >
                <div className="h-8 md:h-12 w-px bg-gradient-to-t from-slate-900 to-transparent opacity-30" />
                <div className="bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2.5">
                  <MousePointerClick className="w-4 h-4 animate-bounce" />
                  <span className="text-[13px] font-medium tracking-wide uppercase">
                    Tap View balance
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};
