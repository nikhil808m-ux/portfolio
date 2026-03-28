import React from 'react';
import { Section, TextBlock } from '../Section';
import { CheckpointsIllustration } from '../illustrations/CheckpointsIllustration';

export const CheckpointsSection: React.FC = () => {
  return (
    <Section variant="base">
      <div className="flex flex-col gap-12">
        <TextBlock 
          title="Two Natural Financial Checkpoints" 
          subtitle="Through conversations and observation, I noticed that people tend to think about money at two moments."
        >
          <p className="mb-4">
            Before payment — when checking what they have.
            <br />
            After payment — when recalculating what remains.
          </p>
          <p className="mb-4">
            Most UPI apps already support the first checkpoint. Users can reveal their balance on the home screen.
          </p>
          <p>
            The second checkpoint feels compressed. After the green tick, the system moves forward. 
            If someone wants to check balance, they can — but it requires navigating away from the confirmation screen.
            The recalibration moment exists, but it is no longer embedded in the flow.
          </p>
        </TextBlock>

        <CheckpointsIllustration />
      </div>
    </Section>
  );
};
