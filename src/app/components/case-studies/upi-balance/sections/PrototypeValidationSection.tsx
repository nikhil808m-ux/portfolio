import React from 'react';
import { Section, TextBlock } from '../Section';

export const PrototypeValidationSection: React.FC = () => {
  return (
    <Section variant="base" className="py-20 md:py-24">
      <div className="flex flex-col">

        {/* Header Area */}
        <div className="max-w-3xl mb-12 md:mb-16">
            <TextBlock
              eyebrow="09 — Testing"
              title="Handed to users with zero explanation."
              subtitle=""
            >
              <p className="text-slate-500 font-light text-[17px] leading-relaxed">
                The working prototype was tested with 30+ individuals — some from the initial interviews, most completely cold. The phone was handed over on the payment success screen with no introduction. The only prompt: "You've just paid for something. What do you do next?"
              </p>
            </TextBlock>
        </div>

        {/* Architectural Grid for Testing Data */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-l border-slate-200">
            
            {/* Left Col - Data point */}
            <div className="md:col-span-4 bg-slate-50 p-8 md:p-12 lg:p-16 border-r border-b border-slate-200 flex flex-col justify-center">
                <span className="text-7xl lg:text-8xl font-light tracking-tighter text-slate-900 mb-4">30+</span>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em]">Participants</span>
            </div>

            {/* Right Col - Findings */}
            <div className="md:col-span-8 bg-white p-8 md:p-12 lg:p-16 border-r border-b border-slate-200 flex flex-col justify-center gap-8">
                <p className="text-[18px] lg:text-[20px] text-slate-600 leading-relaxed font-light max-w-2xl">
                  The vast majority tapped "View Balance" intuitively without any prompting. A few tapped "Done" out of pure muscle memory, realized what they missed, and actively returned to try it.
                </p>
                
                <div className="border-l-2 border-slate-900 pl-6 mt-4 max-w-2xl">
                    <p className="text-[18px] lg:text-[20px] text-slate-900 leading-relaxed font-medium">
                      The universal reaction across both behavioral groups was simple: <span className="italic">"Why wasn't this always there?"</span>
                    </p>
                </div>
            </div>

        </div>

      </div>
    </Section>
  );
};