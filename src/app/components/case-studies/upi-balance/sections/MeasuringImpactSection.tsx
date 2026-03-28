import React from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { Target, BarChart2, Heart, MousePointer } from 'lucide-react';

const ImpactMetric = ({ label, icon: Icon, delay }: { label: string, icon: any, delay: number }) => (
  <motion.div 
    className="flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
      <Icon size={20} />
    </div>
    <span className="font-medium text-gray-700">{label}</span>
  </motion.div>
);

export const MeasuringImpactSection: React.FC = () => {
  return (
    <Section variant="base" className="py-24">
      <div className="flex flex-col gap-12">
        <TextBlock 
          title="Measuring Impact" 
          subtitle="If this were shipped, I would track these specific signals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <ImpactMetric label="Frequency of immediate post-transaction balance checks" icon={Target} delay={0.2} />
          </div>
          <ImpactMetric label="Self-reported financial control" icon={BarChart2} delay={0.4} />
          <ImpactMetric label="Reported anxiety levels" icon={Heart} delay={0.5} />
          <ImpactMetric label="Interaction rate with View Balance" icon={MousePointer} delay={0.6} />
          <ImpactMetric label="Impact on confirmation dwell time" icon={Target} delay={0.7} />
        </div>
      </div>
    </Section>
  );
};
