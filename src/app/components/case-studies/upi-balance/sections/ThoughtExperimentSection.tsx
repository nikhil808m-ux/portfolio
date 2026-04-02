import React from 'react';
import { Section } from '../Section';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const ThoughtExperimentSection: React.FC = () => {
  return (
    <Section variant="alt" className="relative overflow-hidden py-20 md:py-24" id="thought-experiment">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-200 pb-4 w-max">
            <span className="text-slate-900 text-[11px] font-bold tracking-[0.25em] uppercase">
              The Premise
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-8 tracking-tight leading-[1.1]">
            The Thought <br /> That Clarified It
          </h2>

          <div className="prose prose-lg text-slate-500 font-light leading-relaxed">
            <p className="mb-6">
              To make this clearer, think about a simple cash transaction.
            </p>
            <p>
              You hand over a ₹500 note for something that costs ₹150. The cashier counts and gives you ₹350 back.
            </p>
            <p className="mt-6">
              In that moment, without trying, you know what’s left.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-200 pt-12 lg:pt-0 lg:pl-16">
          <div
            className="mb-10"
          >
            <p className="text-xl md:text-2xl font-light text-slate-600 leading-relaxed mb-8">
              You don’t calculate it step by step. It just clicks.
            </p>
          </div>

          <div
            className="bg-slate-50 p-8 border border-slate-200"
          >
            <p className="text-lg text-slate-900 font-medium leading-relaxed">
              With UPI, the payment is confirmed instantly, but nothing replaces that moment. You see the green tick, but you don’t really register what remains. <span className="text-blue-600">That small pause, where your balance updated in your head, is simply gone.</span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};