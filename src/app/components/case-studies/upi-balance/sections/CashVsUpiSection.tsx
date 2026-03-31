import React from 'react';
import { Section, TextBlock } from '../Section';
import { Wallet, Smartphone, ArrowRight } from 'lucide-react';

const ComparisonCard = ({
  title,
  icon: Icon,
  headline,
  body,
  type
}: {
  title: string;
  icon: React.ElementType;
  headline: string;
  body: string;
  type: 'cash' | 'digital';
}) => {
  const isCash = type === 'cash';

  return (
    <div
      className={`relative p-10 md:p-12 rounded-[2px] overflow-hidden h-full flex flex-col transition-all duration-500 ${isCash
        ? 'bg-transparent border border-slate-200'
        : 'bg-white border border-slate-300'
        }`}
    >
      <div className={`w-16 h-16 rounded-[2px] border flex items-center justify-center mb-10 ${isCash ? 'bg-transparent border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-900 text-white'
        }`}>
        <Icon size={24} strokeWidth={isCash ? 1.5 : 2} />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className={`px-3 py-1 border text-[11px] font-bold tracking-[0.2em] uppercase ${isCash ? 'border-slate-200 text-slate-900' : 'border-slate-300 text-slate-900'
          }`}>{title}</span>
      </div>

      <h3 className={`text-3xl font-light mb-8 tracking-tight leading-[1.2] text-slate-900`}>
        {headline}
      </h3>

      <div className={`text-[17px] leading-relaxed flex-1 font-light ${isCash ? 'text-slate-500' : 'text-slate-600'}`}>
        {body}
      </div>
    </div>
  );
};

export const CashVsUpiSection: React.FC = () => {
  return (
    <Section className="bg-white py-20 md:py-24 border-b border-slate-200" id="cash-vs-digital">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-12 items-end">
        <div>
          <TextBlock
            eyebrow="01 — The Vanished Ritual"
            title="The mental math that cash made automatic"
            subtitle=""
          >
            <div className="text-lg text-slate-500 leading-relaxed max-w-xl font-light">
              <p className="mb-4">With cash, you always knew what was left.</p>
              <p className="mb-4">You saw the money leave. You felt the change come back.</p>
              <p className="mb-4">It just clicked.</p>
              <p>With UPI, that moment is missing.</p>
            </div>
          </TextBlock>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative">
        <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="text-slate-300 bg-white px-2">
            <ArrowRight size={24} strokeWidth={1.5} />
          </div>
        </div>

        <ComparisonCard
          type="cash"
          title="Physical Cash"
          headline="The math happened whether you wanted it to or not"
          body="Every step of a cash transaction produced a signal. Notes leaving your hand. Change coming back. You didn't plan to recalculate. The physical exchange forced the estimate out of you. &quot;I had ₹1,000. I spent ₹250. Roughly ₹750 left.&quot; Automatic. Every time."
          icon={Wallet}
        />

        <ComparisonCard
          type="digital"
          title="Digital Payment"
          headline="Payment done. Financial moment: closed."
          body="Payment confirms in under two seconds. Green tick. Done button. The flow is over before the financial moment can even begin. No notes left your hand. Nothing came back. There is no signal, so there is no recalibration. Not because people stopped caring about their balance, but because the system gave that moment nowhere to live."
          icon={Smartphone}
        />
      </div>

      <div
        className="mt-32 max-w-6xl mx-auto"
      >
        <p className="text-slate-900 mb-10 font-bold uppercase tracking-[0.2em] text-[11px]">Want to check your balance after paying? Here's what that actually takes:</p>

        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-6 mb-16">
          {[
            "Exit the confirmation screen",
            "Navigate to the balance section",
            "Select the specific bank account",
            "Enter PIN or authenticate",
            "View balance"
          ].map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-white border border-slate-200 rounded-[2px] p-6 flex-1 w-full lg:w-[calc(20%-1.2rem)] min-h-[140px] flex flex-col justify-between">
                <div className="w-8 h-8 rounded-[2px] border border-slate-200 bg-transparent text-slate-900 flex items-center justify-center text-[11px] font-bold tracking-[0.2em] mb-4">
                  0{idx + 1}
                </div>
                <p className="text-[14px] text-slate-600 font-light leading-relaxed">{step}</p>
              </div>

              {idx < 4 && (
                <div className="hidden lg:flex shrink-0 text-slate-300 items-center justify-center">
                  <ArrowRight size={20} strokeWidth={1.5} />
                </div>
              )}
              {idx < 4 && (
                <div className="flex lg:hidden shrink-0 text-slate-300 rotate-90 items-center justify-center">
                  <ArrowRight size={20} strokeWidth={1.5} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="text-slate-500 font-light italic mb-16 text-center text-lg">Five steps. By which point most people have moved on entirely.</p>

        <div className="bg-transparent rounded-[2px] p-10 md:p-16 border border-slate-200 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-1 h-full bg-slate-900"
            style={{ transform: 'translateZ(0)' }}
          />
          <div className="flex items-center gap-2 mb-8">
            <span className="px-3 py-1 border border-slate-200 text-slate-900 text-[11px] font-bold tracking-[0.2em] uppercase">The Core Problem</span>
          </div>
          <h3 className="text-3xl lg:text-4xl text-slate-900 font-light mb-0 leading-[1.3] tracking-tight">
            Cash gave you awareness by default.<br />
            UPI just gave you speed.
          </h3>
        </div>
      </div>
    </Section>
  );
};