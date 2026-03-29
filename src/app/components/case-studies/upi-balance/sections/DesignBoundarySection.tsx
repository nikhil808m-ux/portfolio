import React from 'react';
import { Section, TextBlock } from '../Section';
import { Check, X } from 'lucide-react';

const BoundaryPair = ({ allowText, avoidText, delay }: { allowText: string, avoidText: string, delay: number }) => (
  <div 
    className="flex flex-col md:flex-row gap-6 w-full"
  >
    <div className="flex-1 p-8 rounded-[2px] bg-transparent border border-slate-900 flex items-start gap-6">
      <div className="mt-1 w-6 h-6 rounded-[2px] border border-slate-900 text-slate-900 flex items-center justify-center flex-shrink-0">
        <Check size={14} strokeWidth={2.5} />
      </div>
      <span className="text-[17px] font-medium text-slate-900 leading-relaxed">
        {allowText}
      </span>
    </div>
    
    <div className="hidden md:flex items-center text-slate-300">
        <span className="tracking-[0.5em]">···</span>
    </div>

    <div className="flex-1 p-8 rounded-[2px] bg-transparent border border-slate-200 flex items-start gap-6">
      <div className="mt-1 w-6 h-6 rounded-[2px] border border-slate-300 text-slate-400 flex items-center justify-center flex-shrink-0">
        <X size={14} strokeWidth={2.5} />
      </div>
      <span className="text-[17px] text-slate-500 leading-relaxed font-light">
        {avoidText}
      </span>
    </div>
  </div>
);

export const DesignBoundarySection: React.FC = () => {
  return (
    <Section variant="alt" className="py-20 md:py-24">
      <div className="flex flex-col gap-16">
        <TextBlock 
          eyebrow="04 — Defining the Intervention"
          title="Restore the checkpoint. Don't rebuild the friction." 
          subtitle=""
        >
          <p className="text-slate-500 font-light text-[17px] leading-relaxed max-w-3xl">
            The goal is not to add friction or recreate what physical currency did manually. It's to put the post-payment check back into the confirmation flow — quietly, voluntarily, without getting in the way of people who don't need it. We must solve for awareness, but protect for privacy.
          </p>
        </TextBlock>

        <div className="flex flex-col gap-6">
          <BoundaryPair 
            allowText="Restore the reflection moment within the confirmation screen, maintaining zero extra navigation." 
            avoidText="Add mandatory steps before the flow is complete or route the user away from the success screen." 
            delay={0} 
          />
          <BoundaryPair 
            allowText="Make the balance check voluntary and user-initiated, keeping sensitive data hidden until requested." 
            avoidText="Auto-display the balance or force-feed financial information, introducing major privacy risks." 
            delay={0.1} 
          />
        </div>
      </div>
    </Section>
  );
};
