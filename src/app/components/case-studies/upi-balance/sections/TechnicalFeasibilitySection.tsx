import React from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { Database, MessageSquareWarning, Fingerprint } from 'lucide-react';

export const TechnicalFeasibilitySection: React.FC = () => {
  return (
    <Section variant="alt" className="py-20 md:py-24">
      <div className="flex flex-col gap-16">
        
        {/* Header using TextBlock for consistency */}
        <TextBlock 
          eyebrow="06 — Under the Hood"
          title={
            <>
              The obvious solution doesn't exist. <br className="hidden md:block" />
              And that's not a design choice.
            </>
          } 
          subtitle=""
        >
          <p className="mb-10 text-slate-500 font-light text-[17px] leading-relaxed">
            Showing the balance automatically on the confirmation screen seems like the obvious fix. But digging into the payment stack architecture reveals why that isn't possible. The answer closes the door on automatic solutions completely.
          </p>
        </TextBlock>

        {/* Technical Grid - blending the stark architectural style with soft typography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-slate-200">
          
          {/* Block 1 */}
          <div 
            className="p-10 md:p-14 border-b border-r border-slate-200 bg-white"
          >
             <Database className="w-6 h-6 stroke-[1.5] text-slate-900 mb-10" />
             <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-4 tracking-tight">
               The Architectural Constraint
             </h3>
             <p className="text-[15px] text-slate-500 font-light leading-relaxed">
               The payload contains transaction results, not the updated account balance. That number sits with the issuer bank and requires a separate, explicit API call.
             </p>
          </div>
          
          {/* Block 2 */}
          <div 
            className="p-10 md:p-14 border-b border-r border-slate-200 bg-white"
          >
             <MessageSquareWarning className="w-6 h-6 stroke-[1.5] text-slate-900 mb-10" />
             <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-4 tracking-tight">
               The Regulatory Reality
             </h3>
             <p className="text-[15px] text-slate-500 font-light leading-relaxed">
               Mandatory SMS notifications arrive out of context, often displaying sensitive info on the lock screen. The checkpoint happens at the wrong place and time.
             </p>
          </div>
          
          {/* Block 3 */}
          <div 
            className="p-10 md:p-14 border-b border-r border-slate-200 bg-slate-50 relative"
          >
             <Fingerprint className="w-6 h-6 stroke-[1.5] text-slate-900 mb-10" />
             <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-4 tracking-tight">
               Voluntary Action
             </h3>
             <p className="text-[15px] text-slate-500 font-light leading-relaxed">
               Balance enquiries must be user-initiated by mandate. A deliberate, voluntary tap is the only architecturally viable and privacy-respecting solution.
             </p>
          </div>

        </div>

        {/* Quote Block */}
        <div 
          className="mt-16 max-w-3xl text-left border-l border-slate-900 pl-8"
        >
          <p className="text-2xl md:text-3xl font-light tracking-tight text-slate-900 leading-snug italic">
            "You tap it. The system responds. In a small way, that deliberate action is closer to counting physical change than any automatic display could ever be."
          </p>
        </div>

      </div>
    </Section>
  );
};
