import React from 'react';
import { Section, TextBlock } from '../Section';
import { Quote } from 'lucide-react';

const StatCard = ({ number, label, sublabel, accent }: { number: string, label: string, sublabel?: string, accent?: boolean }) => (
  <div
    className={`p-10 border rounded-[2px] flex flex-col gap-4 transition-all duration-300 ${accent ? 'bg-transparent border-slate-900' : 'bg-transparent border-slate-200'}`}
  >
    <span className={`text-6xl font-light tracking-tighter ${accent ? 'text-slate-900' : 'text-slate-900'}`}>{number}</span>
    <p className={`text-[17px] font-medium leading-snug tracking-tight ${accent ? 'text-slate-900' : 'text-slate-800'}`}>{label}</p>
    {sublabel && <p className="text-[15px] font-light text-slate-500 leading-relaxed">{sublabel}</p>}
  </div>
);

const QuoteCard = ({ text, author, role, avatarColor }: { text: string, author: string, role: string, avatarColor: string }) => (
  <div
    className="bg-transparent p-10 border border-slate-200 rounded-[2px] relative overflow-hidden flex flex-col justify-between group transition-all duration-500 min-h-[260px]"
  >
    <div className="absolute -top-4 -right-4 text-slate-100 opacity-50 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(0)' }}>
      <Quote size={140} strokeWidth={1} />
    </div>
    <div className="relative z-10 mb-10 flex-1">
      <p className="text-lg md:text-xl font-light text-slate-700 leading-relaxed">"{text}"</p>
    </div>
    <div className="relative z-10 flex items-center gap-4">
      <div className={`w-12 h-12 flex items-center justify-center text-sm font-semibold border rounded-[2px] border-slate-200 text-slate-900 bg-transparent`}>
        {author.charAt(0)}
      </div>
      <div>
        <p className="text-[15px] font-medium text-slate-900">{author}</p>
        <p className="text-[13px] font-light text-slate-500">{role}</p>
      </div>
    </div>
  </div>
);

export const ObservedBehaviorSection: React.FC = () => {
  return (
    <Section variant="base" className="py-20 md:py-24">
      <div className="flex flex-col gap-20">

        <div className="flex flex-col gap-8">
          <TextBlock
            eyebrow="03 — Observed Behaviour"
            title={<>Users knew something was off.<br/>They just couldn't name it.</>}
            subtitle=""
            className="mb-0"
          >
            <p className="mb-4 text-slate-500 font-light text-[17px] leading-relaxed">
              For most users, the interaction ended with the payment. <span className="font-semibold">Many closed the app immediately, without checking their balance.</span> Checks were often delayed until later, sometimes after multiple transactions, and occasionally only after an insufficient balance error.
            </p>
            <p className="text-[13px] text-slate-400 font-light italic tracking-wide">Based on observations and conversations with 28 people making an average of 10 or more UPI transactions a day.</p>
          </TextBlock>

          {/* Stat grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatCard
              number="71%"
              label="had no sense of what was left after paying"
              sublabel="Most hadn't checked their balance after a single payment all week. They only looked when something went wrong."
            />
            <StatCard
              number="1 out of 3"
              label="hit Insufficient Balance errors regularly"
              sublabel="All were among the heaviest users. The more you pay without checking, the further your mental number drifts from reality."
              accent
            />
          </div>
        </div>

        {/* Quotes */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 pl-2">What users reported</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <QuoteCard
              text="I usually don’t know what’s in my account after a UPI payment. I just assume it’s fine, and then find out at the worst time."
              author="Adil, 25"
              role="Software Engineer"
              avatarColor="bg-indigo-400"
            />
            <QuoteCard
              text="I used to check my balance once in a while. But as payments became more frequent, it got harder to keep track."
              author="Sourav Jith, 26"
              role="Student"
              avatarColor="bg-emerald-400"
            />
            <QuoteCard
              text="I assume I have enough and go ahead with the payment. When I’m wrong, I find out through an insufficient balance message."
              author="Manu, 25"
              role="Student"
              avatarColor="bg-amber-400"
            />
          </div>
        </div>

        {/* Key Insight */}
        <div
          className="bg-transparent rounded-[2px] border border-slate-200 py-8 px-8 md:py-10 md:px-12 relative overflow-hidden"
        >
          <div 
            className="absolute top-0 left-0 w-1 h-full bg-slate-900"
            style={{ transform: 'translateZ(0)' }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-transparent text-slate-900 rounded-[2px] text-[11px] font-bold tracking-[0.2em] uppercase border border-slate-200">Key Insight</span>
            </div>
            <h3 className="text-3xl md:text-4xl text-slate-900 font-light leading-tight tracking-tight">
              The issue isn’t awareness. <br/>Balance sits outside the payment flow.
            </h3>
          </div>
        </div>

      </div>
    </Section>
  );
};