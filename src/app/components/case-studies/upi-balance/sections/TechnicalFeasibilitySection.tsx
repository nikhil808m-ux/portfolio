import React from 'react';
import { Section, TextBlock } from '../Section';
import { ConstraintsIllustration } from '../illustrations/ConstraintsIllustration';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { Lock } from 'lucide-react';

export const TechnicalFeasibilitySection: React.FC = () => {
  return (
    <Section variant="alt" className="py-24">
      <div className="flex flex-col gap-12">
        <TextBlock 
          title="Understanding the Constraint" 
          subtitle="UPI transaction authorization and balance inquiry are separate API calls."
        >
          <p className="mb-4">
            The UPI PIN authorizes a specific debit instruction. It does not create a reusable financial session.
          </p>
          <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 mb-8">
            <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
              <Lock size={16} /> Key Technical Constraint
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-indigo-800 text-sm">
              <li>Updated balance is not guaranteed in the payment response.</li>
              <li>Background balance fetch without authentication is restricted.</li>
              <li>Balance inquiry may require re-entering the UPI PIN.</li>
            </ul>
          </div>
        </TextBlock>

        <ConstraintsIllustration />

        <div className="mt-8 text-center text-gray-500 italic text-sm">
          Separation of Authorization and Inquiry
        </div>
      </div>
    </Section>
  );
};
