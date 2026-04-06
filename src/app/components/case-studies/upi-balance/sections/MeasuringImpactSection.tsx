import React from 'react';
import { Section, TextBlock } from '../Section';
import { clsx } from 'clsx';

const ImpactMetric = ({ 
  title, 
  desc, 
  invert 
}: { 
  title: string, 
  desc: string, 
  invert?: boolean 
}) => (
  <div
    className={clsx(
      "flex flex-col p-8 md:p-12 lg:p-16 border-b border-r border-slate-200 h-full",
      invert ? "bg-emerald-50" : "bg-white"
    )}
  >
    {/* Content */}
    <div className="flex flex-col gap-6">
        <h4 className={clsx(
          "text-[18px] lg:text-[20px] font-medium tracking-tight",
          invert ? "text-slate-900" : "text-slate-900"
        )}>
          {title}
        </h4>
        <p className={clsx(
          "text-[16px] font-light leading-relaxed",
          invert ? "text-slate-600" : "text-slate-500"
        )}>
          {desc}
        </p>
    </div>
  </div>
);

export const MeasuringImpactSection: React.FC = () => {
  return (
    <Section variant="alt" className="py-20 md:py-24">
      <div className="flex flex-col">

        {/* Header Area */}
        <div className="max-w-3xl">
            <TextBlock
              eyebrow="10 — Impact"
              title="A small addition, used when needed"
              subtitle=""
            >
              <p className="text-slate-500 font-light text-[17px] leading-relaxed">
                Placing balance within the confirmation changes when it is accessed, not how the payment works. Those who need it can act on it immediately, while others continue without interruption.
              </p>
            </TextBlock>
        </div>

        {/* Architectural Grid for Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-slate-200">
            
          <ImpactMetric
            title="Used at the right moment"
            desc="Users checked their balance right after paying, within the same context."
          />
          <ImpactMetric
            title="No forced interaction"
            desc="The payment flow remains unchanged for those who choose not to engage."
          />
          <ImpactMetric
            title="Fits existing behavior"
            desc="The action sits naturally within the confirmation, without requiring a new pattern."
          />

        </div>

      </div>
    </Section>
  );
};
