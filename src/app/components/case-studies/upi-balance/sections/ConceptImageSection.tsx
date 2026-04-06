import React from 'react';
import { Section } from '../Section';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export const ConceptImageSection: React.FC = () => {
  return (
    <Section className="py-20 md:py-24 bg-white">
      <div className="w-full max-w-6xl mx-auto relative overflow-hidden">
        <ImageWithFallback 
          src="/upiconcept.png"
          alt="UPI Concept Design"
          className="w-full h-auto object-cover"
        />
      </div>
    </Section>
  );
};
