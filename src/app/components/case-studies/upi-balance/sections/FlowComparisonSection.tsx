import React from 'react';
import { Section, TextBlock } from '../Section';
import { FlowComparisonIllustration } from '../illustrations/FlowComparisonIllustration';

export const FlowComparisonSection: React.FC = () => {
  return (
    <Section variant="alt" className="py-24">
      <div className="flex flex-col gap-12">
        <TextBlock 
          title="Before and After" 
          subtitle="The transaction remains smooth. Checkpoint 2 becomes accessible without leaving the confirmation context."
        />
        
        <FlowComparisonIllustration />
      </div>
    </Section>
  );
};
