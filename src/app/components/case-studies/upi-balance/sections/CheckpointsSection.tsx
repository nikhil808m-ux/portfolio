import React from 'react';
import { Section, TextBlock } from '../Section';
import { CheckpointsIllustration } from '../illustrations/CheckpointsIllustration';

export const CheckpointsSection: React.FC = () => {
  return (
    <Section variant="alt">
      <div className="flex flex-col gap-8">
        <TextBlock 
          eyebrow="02 — Two Financial Checkpoints"
          title={
            <>
              Physical currency had two.<br />
              Digital kept one.
            </>
          } 
          subtitle=""
        >
          <p className="mb-4 text-slate-500 font-light text-[17px] leading-relaxed">
            Checkpoint 1 is the moment before paying, when you estimate your balance. Checkpoint 2 is right after, when it updates. With cash, both happen within the interaction. With UPI, the second requires a separate check.
          </p>
        </TextBlock>

        <CheckpointsIllustration />
      </div>
    </Section>
  );
};