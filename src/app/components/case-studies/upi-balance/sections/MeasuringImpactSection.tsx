import React from 'react';
import { Section, TextBlock } from '../Section';
import { Activity, ShieldCheck, Scale } from 'lucide-react';
import { clsx } from 'clsx';

const ImpactMetric = ({ 
  title, 
  desc, 
  delay, 
  icon: Icon,
  invert 
}: { 
  title: string, 
  desc: string, 
  delay: number,
  icon: any,
  invert?: boolean 
}) => (
  <div
    className={clsx(
      "flex flex-col p-8 md:p-12 lg:p-16 border-b border-r border-slate-200",
      invert ? "bg-emerald-50" : "bg-white"
    )}
  >
    {/* Architectural Icon Box */}
    <div className={clsx(
      "mb-16",
      invert ? "text-slate-300" : "text-emerald-600"
    )}>
      <Icon size={24} strokeWidth={1.5} />
    </div>

    {/* Content */}
    <div className="mt-auto flex flex-col gap-6">
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
        <div className="max-w-3xl mb-12 md:mb-16">
            <TextBlock
              eyebrow="10 — Impact"
              title="Friction that serves a purpose."
              subtitle=""
            >
              <p className="text-slate-500 font-light text-[17px] leading-relaxed">
                By analyzing the qualitative outcomes of the prototype testing, three core behavioral shifts emerged. The intervention didn't just solve a navigation issue; it restored a missing psychological need.
              </p>
            </TextBlock>
        </div>

        {/* Architectural Grid for Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-slate-200">
            
          <ImpactMetric
            icon={Activity}
            title="Active Recalibration"
            desc="Users began processing their financial standing organically post-payment, mimicking the cognitive loop of physical currency."
            delay={0}
          />
          <ImpactMetric
            icon={ShieldCheck}
            title="Maintained Privacy"
            desc="Because the action remains entirely voluntary and hidden behind standard authentication, trust and comfort levels remained high."
            delay={0.1}
          />
          <ImpactMetric
            icon={Scale}
            title="Balanced Efficiency"
            desc="The primary flow remains frictionless for those who simply want to pay and leave, satisfying both behavioral archetypes perfectly."
            delay={0.2}
          />

        </div>

      </div>
    </Section>
  );
};