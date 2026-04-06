import React from 'react';
import { Section } from '../Section';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const ThoughtExperimentSection: React.FC = () => {
  return (
    <Section variant="alt" className="relative overflow-hidden py-20 md:py-24" id="thought-experiment">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative">
        <div className="lg:col-span-5 flex flex-col">
          <div className="sticky top-32">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4 w-max">
              <span className="text-slate-900 text-[11px] font-bold tracking-[0.25em] uppercase">
                The Premise
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-[1.1]">
              The Thought That Clarified It
            </h2>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col lg:pl-16 lg:border-l border-slate-200">
          <div className="prose prose-lg text-slate-600 font-light leading-relaxed mb-12">
            <p className="text-2xl text-slate-900 mb-8 leading-snug">
              To make this clearer, think about a simple cash transaction.
            </p>
            <p>
              You pay ₹150 using a ₹500 note and receive ₹350 back. As you take the notes, your mind adjusts without effort. You don’t consciously calculate it, but you leave knowing what you have. Now imagine the same moment through UPI. ₹150 is deducted, the screen confirms success, and the interaction ends. The transaction is complete, but nothing helps you register what changed.
            </p>
          </div>

          <div className="bg-slate-50 p-8 md:p-10 border border-slate-200 relative">
            <div className="absolute top-0 left-0 w-[3px] h-full bg-slate-300"></div>
            <p className="text-xl md:text-2xl text-slate-900 font-medium leading-relaxed">
              With UPI, the payment completes instantly. <br className="hidden md:block" /><span className="text-blue-600 mt-2 inline-block">Your balance isn’t visible in that moment unless<br className="hidden md:block" /> you decide to go looking for it.</span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};