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

        <TextBlock
          eyebrow="03 — Observed Behaviour"
          title={<>Users knew something was off. <br /> They just couldn't name it.</>}
          subtitle=""
          className="!mb-0"
        >
          <p className="mb-4 text-slate-500 font-light text-[17px] leading-relaxed">
            I spoke to people who use UPI multiple times a day. Most don’t check their balance after a payment, not because they don’t care, but because it takes effort. You have to leave the screen, navigate elsewhere, and authenticate again.<br /><br />
            For a small payment, most people don’t bother. The balance is there. Just not where you need it.
          </p>
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

        {/* Behaviour patterns */}
        <div className="bg-transparent rounded-[2px] border border-slate-200 overflow-hidden">
          {[
            { num: 1, text: "Balance checks happen after the fact. A declined payment at a counter. A big purchase coming up. Not as a natural part of everyday paying." },
            { num: 2, text: "The confirmation screen reads as a hard stop. Once the user taps Done, the cognitive window is closed. Checking balance after that feels like starting a new task." },
            { num: 3, text: 'For most users, "Insufficient Balance" is the only thing that ever corrects the drift. A payment failing at the counter is now doing the job that a physical wallet once did naturally.', highlight: true },
          ].map(({ num, text, highlight }) => (
            <div key={num} className={`flex items-start gap-6 px-10 py-8 border-b border-slate-200 last:border-0 transition-colors ${highlight ? 'bg-slate-50' : 'bg-transparent'}`}>
              <span className={`w-8 h-8 rounded-[2px] border border-slate-200 flex items-center justify-center flex-shrink-0 text-[13px] font-bold mt-0.5 ${highlight ? 'text-slate-900' : 'text-slate-500'}`}>{num}</span>
              <span className={`text-[17px] leading-relaxed font-light ${highlight ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{text}</span>
            </div>
          ))}
        </div>

        {/* Quotes */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 pl-2">What users reported</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <QuoteCard
              text="I used to always have a rough idea of what was left. Now I just assume it's fine and find out I'm wrong at the worst time."
              author="Rohan, 24"
              role="Software Engineer"
              avatarColor="bg-indigo-400"
            />
            <QuoteCard
              text="The worst part is it happens at the shop, with people standing behind you waiting. There's no warning beforehand."
              author="Priya, 21"
              role="Student"
              avatarColor="bg-emerald-400"
            />
            <QuoteCard
              text="I could physically feel the wallet getting lighter. That itself was enough to slow me down. Now, there's nothing like that."
              author="Vikram, 38"
              role="Shopkeeper"
              avatarColor="bg-amber-400"
            />
          </div>
        </div>

        {/* Key Insight */}
        <div
          className="bg-transparent rounded-[2px] border border-slate-200 p-10 md:p-16 relative overflow-hidden"
        >
          <div
            className="absolute top-0 left-0 w-1 h-full bg-slate-900"
            style={{ transform: 'translateZ(0)' }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <span className="px-3 py-1 bg-transparent text-slate-900 rounded-[2px] text-[11px] font-bold tracking-[0.2em] uppercase border border-slate-200">Key Insight</span>
            </div>
            <h3 className="text-3xl md:text-4xl text-slate-900 font-light mb-6 leading-tight tracking-tight">
              The issue isn't awareness. <br />It's the cognitive cost of accessing it.
            </h3>
            <p className="text-slate-600 text-lg font-light leading-relaxed max-w-3xl">
              The balance is available in the app. Anyone can go look for it. But looking means leaving the confirmation screen, navigating to another view, and re-authenticating — enough friction that most people simply don't bother after an everyday payment. The problem isn't that people stopped caring. It's that caring became too inconvenient.
            </p>
          </div>
        </div>

      </div>
    </Section>
  );
};