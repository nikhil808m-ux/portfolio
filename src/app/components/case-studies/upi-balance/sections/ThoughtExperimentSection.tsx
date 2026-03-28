import React from 'react';
import { Section, TextBlock } from '../Section';
import { ThoughtExperimentIllustration } from '../illustrations/ThoughtExperimentIllustration';

export const ThoughtExperimentSection: React.FC = () => {
  return (
    <Section variant="alt" className="py-32">
      <div className="flex flex-col gap-16">
        <TextBlock 
          title="The Thought That Clarified It" 
          subtitle="To make the idea clearer to myself, I imagined something simple."
        >
          <p className="mb-4">
            Two people are given ₹10,000. One receives it as 20 notes of ₹500. The other sees ₹10,000 in their UPI balance.
            The amount is the same. But intuitively, the cash feels more controlled. Why?
          </p>
          <p className="mb-4">
            Because with cash, every transaction reduces something visible. You see the stack shrink. You feel the wallet lighten. 
            You adjust mentally.
          </p>
          <p>
            With UPI, the payment is confirmed — but the depletion isn’t physically experienced. The number changes somewhere in the system, 
            but it doesn’t anchor itself in the moment. The difference isn’t about the amount. It’s about the experience of reduction.
          </p>
        </TextBlock>

        <ThoughtExperimentIllustration />

        <div className="text-center italic text-gray-500 mt-8">
          The money is the same. The experience is not.
        </div>
      </div>
    </Section>
  );
};
