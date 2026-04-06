import React from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { Layers, ArrowRight, ArrowUp } from 'lucide-react';
import { FinalInterventionIllustration } from '../illustrations/FinalInterventionIllustration';

export const FinalInterventionSection: React.FC = () => {
  return (
    <Section variant="dark" className="!bg-[#1C1C1C] py-32 md:py-48 border-t border-zinc-800 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Text & Grid */}
        <div className="order-2 lg:order-1 flex flex-col justify-center">
          <TextBlock 
            eyebrow="07 — The Intervention"
            title="The moment, back where it belongs" 
            subtitle=""
            variant="light"
          >
            <p className="mb-8 text-zinc-400 font-light text-[17px] leading-relaxed">
              The balance is brought into the confirmation screen, placing it alongside the transaction itself, without changing how the payment works.
            </p>
          </TextBlock>

          {/* Architectural Style Grid for Principles */}
          <div className="grid grid-cols-1 gap-0 border-t border-l border-zinc-800">
            
            <div 
              className="p-6 md:p-8 border-b border-r border-zinc-800 bg-zinc-900/50"
            >
              <Layers className="w-5 h-5 text-white mb-4 stroke-[1.5]" />
              <h4 className="text-lg font-medium text-white mb-2 tracking-tight">Stays within the flow</h4>
              <p className="text-[15px] font-light text-zinc-400 leading-relaxed">
                The confirmation screen remains familiar, with minor adjustments to existing elements. The balance option sits within the same context, without requiring navigation away.
              </p>
            </div>
            
            <div 
              className="p-6 md:p-8 border-b border-r border-zinc-800 bg-transparent relative"
            >
              <ArrowRight className="w-5 h-5 text-white mb-4 stroke-[1.5]" />
              <h4 className="text-lg font-medium text-white mb-2 tracking-tight">Restores balance awareness</h4>
              <p className="text-[15px] font-light text-zinc-400 leading-relaxed">
                Right after paying, the updated balance is available within the same interaction, aligned with the transaction.
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

              {/* Interaction Prompt - Non-button styling */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute -bottom-10 md:-bottom-14 z-20 flex flex-col items-center gap-3 pointer-events-none"
              >
                <div className="h-10 w-px bg-gradient-to-t from-zinc-500 to-transparent opacity-60" />
                <div className="flex items-center gap-2 text-zinc-400">
                  <ArrowUp className="w-4 h-4 animate-bounce" />
                  <span className="text-[10px] font-mono tracking-widest uppercase">
                    Tap 'View balance' inside
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
