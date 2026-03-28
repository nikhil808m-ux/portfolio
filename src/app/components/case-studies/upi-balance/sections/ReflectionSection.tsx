import React from 'react';
import { Section, TextBlock } from '../Section';

export const ReflectionSection: React.FC = () => {
  return (
    <Section variant="alt" className="py-32">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light mb-8 font-google-sans">
          We often confuse <span className="font-medium text-gray-900">friction</span> with <span className="font-medium text-gray-900">inefficiency</span>. 
          But friction was also a form of feedback. It told us we were spending money.
          <br /><br />
          By making payments "too smooth," we lost that signal. This case study isn't just about showing a balance number; 
          it's about restoring the <span className="font-medium text-gray-900">passive control</span> that keeps us financially healthy, 
          preventing the shock of "Insufficient Balance" before it happens.
        </p>
        <div className="w-16 h-1 bg-emerald-500 rounded-full opacity-50" />
      </div>
    </Section>
  );
};
