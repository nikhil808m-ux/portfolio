import React from 'react';
import { Section, TextBlock } from '../Section';
import { CheckpointsIllustration } from '../illustrations/CheckpointsIllustration';

export const CheckpointsSection: React.FC = () => {
  return (
    <Section variant="alt">
      <div className="flex flex-col gap-16">
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
            Talking to 28 high-frequency digital payment users made one thing undeniably clear. Around every transaction, there are two natural moments of financial awareness — one before, one after. Physical currency naturally supported both. Modern interfaces only carried one of them across.
          </p>
        </TextBlock>

        <CheckpointsIllustration />
      </div>
    </Section>
  );
};