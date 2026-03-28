import React from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { Check, X, Shield, Zap, Wind } from 'lucide-react';

const BoundaryCard = ({ title, icon: Icon, type, delay }: { title: string, icon: any, type: 'allow' | 'avoid', delay: number }) => (
  <motion.div 
    className={`p-6 rounded-xl border ${type === 'allow' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'} flex items-center gap-4`}
    initial={{ opacity: 0, x: type === 'allow' ? 20 : -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className={`p-2 rounded-full ${type === 'allow' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
      <Icon size={20} />
    </div>
    <span className={`font-medium ${type === 'allow' ? 'text-emerald-800' : 'text-red-800'}`}>
      {title}
    </span>
  </motion.div>
);

export const DesignBoundarySection: React.FC = () => {
  return (
    <Section variant="base" className="py-24">
      <div className="flex flex-col gap-12">
        <TextBlock 
          title="Defining the Intervention" 
          subtitle="The goal was not to slow down UPI, but to restore the passive control we lost."
        >
          <p className="mb-4">
            Cash gave us control through physical friction. UPI removed that friction.
            To fix the "insufficient balance" problem, we shouldn't add the friction back.
          </p>
          <p>
            Instead, we need to design a <strong>digital equivalent of the empty wallet feeling</strong>—a passive signal that informs without interrupting.
          </p>
        </TextBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BoundaryCard title="Restore passive awareness" icon={Zap} type="allow" delay={0.2} />
          <BoundaryCard title="Reintroduce active friction" icon={X} type="avoid" delay={0.3} />
          
          <BoundaryCard title="Respect existing habits" icon={Shield} type="allow" delay={0.4} />
          <BoundaryCard title="Force balance checks" icon={X} type="avoid" delay={0.5} />
          
          <BoundaryCard title="Prevent 'Insufficient Balance'" icon={Check} type="allow" delay={0.6} />
          <BoundaryCard title="Induce spending guilt" icon={X} type="avoid" delay={0.7} />
        </div>
      </div>
    </Section>
  );
};
