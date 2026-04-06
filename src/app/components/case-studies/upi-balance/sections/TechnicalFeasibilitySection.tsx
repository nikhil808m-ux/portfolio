import React from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { Database, Clock, Shield } from 'lucide-react';

export const TechnicalFeasibilitySection: React.FC = () => {
  return (
    <Section variant="alt" className="py-20 md:py-24">
      <div className="flex flex-col gap-10">
        
        {/* Header using TextBlock for consistency */}
        <TextBlock 
          eyebrow="06 — Under the Hood"
          title={
            <>
              Why balance isn’t part of <br className="hidden md:block" />
              the confirmation
            </>
          } 
          subtitle=""
        >
          <p className="text-slate-500 font-light text-[17px] leading-relaxed">
            Showing balance on the confirmation screen may seem straightforward, but it isn’t part of the transaction response. The payment system confirms the transfer, while balance remains with the bank and requires a separate request.
          </p>
        </TextBlock>

        {/* Technical Grid - blending the stark architectural style with soft typography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-slate-200">
          
          {/* Block 1 */}
          <div 
            className="p-8 md:p-10 border-b border-r border-slate-200 bg-white"
          >
             <Database className="w-6 h-6 stroke-[1.5] text-slate-900 mb-6" />
             <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-2 tracking-tight">
               Architectural Constraint
             </h3>
             <p className="text-[15px] text-slate-500 font-light leading-relaxed">
               Transaction responses include payment status, not updated balance. Retrieving balance requires a separate API call to the bank.
             </p>
          </div>
          
          {/* Block 2 */}
          <div 
            className="p-8 md:p-10 border-b border-r border-slate-200 bg-white"
          >
             <Clock className="w-6 h-6 stroke-[1.5] text-slate-900 mb-6" />
             <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-2 tracking-tight">
               System Constraint
             </h3>
             <p className="text-[15px] text-slate-500 font-light leading-relaxed">
               Balance cannot be fetched freely within the flow. It depends on additional requests, latency, and API limits, making it unreliable to surface every time.
             </p>
          </div>
          
          {/* Block 3 */}
          <div 
            className="p-8 md:p-10 border-b border-r border-slate-200 bg-white"
          >
             <Shield className="w-6 h-6 stroke-[1.5] text-slate-900 mb-6" />
             <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-2 tracking-tight">
               Regulatory Constraint
             </h3>
             <p className="text-[15px] text-slate-500 font-light leading-relaxed">
               Balance enquiries are designed as explicit actions and cannot be triggered continuously or passively within the system.
             </p>
          </div>

        </div>

      </div>
    </Section>
  );
};
