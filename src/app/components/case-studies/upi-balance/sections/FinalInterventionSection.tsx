import React from 'react';
import { Section, TextBlock } from '../Section';
import { FinalInterventionIllustration } from '../illustrations/FinalInterventionIllustration';
import { motion } from 'motion/react';

export const FinalInterventionSection: React.FC = () => {
  return (
    <Section variant="dark" className="py-32 relative overflow-hidden">
      {/* Background radial gradient for focus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="order-2 lg:order-1">
          <FinalInterventionIllustration />
        </div>

        <div className="order-1 lg:order-2">
          <TextBlock 
            title="A Small Refinement" 
            subtitle="Securely checks your account balance."
            variant="light"
          >
            <p className="mb-6 text-gray-400">
              The solution doesn't force a new behavior. It simply offers an option where none existed.
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0" />
                <span><strong className="text-white font-medium">Optional:</strong> Doesn't block the "Done" path.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0" />
                <span><strong className="text-white font-medium">Contextual:</strong> Keeps the user in the success state.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0" />
                <span><strong className="text-white font-medium">Private:</strong> Balance is hidden by default.</span>
              </li>
            </ul>
          </TextBlock>
        </div>
      </div>
    </Section>
  );
};
