import React from 'react';
import { Section, TextBlock } from '../Section';

export const PrototypeValidationSection: React.FC = () => {
  return (
    <Section variant="base" className="py-20 md:py-24">
      <div className="flex flex-col">

        {/* Header Area */}
        <div className="max-w-3xl">
            <TextBlock
              eyebrow="09 — Testing"
              title="Initial Testing"
              subtitle=""
            >
              <p className="text-slate-500 font-light text-[17px] leading-relaxed">
                The prototype was handed to 30+ people on the payment success screen, without prior instruction. They were simply asked what they would do next after making a payment.
              </p>
            </TextBlock>
        </div>

        {/* Architectural Grid for Testing Data */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-l border-slate-200">
            
            {/* Left Col - Data point */}
            <div className="md:col-span-4 bg-slate-50 p-8 md:p-12 lg:p-16 border-r border-b border-slate-200 flex flex-col items-center justify-center text-center">
                <span className="text-7xl lg:text-8xl font-light tracking-tighter text-slate-900 mb-4">30+</span>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.2em]">Participants</span>
            </div>

            {/* Right Col - Findings */}
            <div className="md:col-span-8 bg-white p-8 md:p-12 lg:p-16 border-r border-b border-slate-200 flex flex-col justify-center gap-8">
                <p className="text-[18px] lg:text-[20px] text-slate-600 leading-relaxed font-light max-w-2xl">
                  Most users tapped "View Balance" immediately. Some tapped "Done" out of habit, and later checked the balance once they were made aware of the option.
                </p>
                
                <div className="border-l-2 border-slate-900 pl-6 mt-4 max-w-2xl">
                    <p className="text-[18px] lg:text-[20px] text-slate-900 leading-relaxed font-medium">
                      A consistent reaction across users: <br/>
                      <span className="italic">"This feels like something that should already exist."</span>
                    </p>
                </div>
            </div>

        </div>

      </div>
    </Section>
  );
};