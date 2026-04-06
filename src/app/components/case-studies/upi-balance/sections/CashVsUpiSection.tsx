import React from 'react';
import { Section, TextBlock } from '../Section';
import { Wallet, Smartphone, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const ComparisonCard = ({ 
  title, 
  icon: Icon, 
  headline,
  body, 
  type
}: { 
  title: string; 
  icon: React.ElementType; 
  headline?: string;
  body: string; 
  type: 'cash' | 'digital';
}) => {
  const isCash = type === 'cash';
  
  return (
    <div
      className={`relative p-10 md:p-12 rounded-[2px] overflow-hidden h-full flex flex-col transition-all duration-500 ${
        isCash 
          ? 'bg-transparent border border-slate-200' 
          : 'bg-white border border-slate-300'
      }`}
    >
      <div className={`w-16 h-16 rounded-[2px] border flex items-center justify-center mb-10 ${
        isCash ? 'bg-transparent border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-900 text-white'
      }`}>
        <Icon size={24} strokeWidth={isCash ? 1.5 : 2} />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className={`px-3 py-1 border text-[11px] font-bold tracking-[0.2em] uppercase ${
          isCash ? 'border-slate-200 text-slate-900' : 'border-slate-300 text-slate-900'
        }`}>{title}</span>
      </div>
      
      {headline && (
        <h3 className={`text-3xl font-light mb-8 tracking-tight leading-[1.2] text-slate-900`}>
          {headline}
        </h3>
      )}
      
      <div className={`text-[17px] leading-relaxed flex-1 font-light ${isCash ? 'text-slate-500' : 'text-slate-600'}`}>
        {body}
      </div>
    </div>
  );
};

export const CashVsUpiSection: React.FC = () => {
  return (
    <Section className="bg-white py-20 md:py-24 border-b border-slate-200" id="cash-vs-digital">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 items-center">
        <div>
          <TextBlock
             eyebrow="01 — The Vanished Ritual"
             title="The mental math that cash made automatic"
             subtitle=""
          >
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl font-light">
              With physical currency, the payment and the recalibration happened together. You saw the notes leave. You felt the change returning. By the time the transaction was done, you already had a rough number in your head. You didn't choose to do that math. The physical act did it for you.
            </p>
          </TextBlock>
        </div>

        <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] border border-slate-200 bg-slate-50 p-2 lg:p-4">
          <div className="w-full h-full relative border border-slate-200 overflow-hidden">
            <ImageWithFallback 
              src="/upiwallet.png"
              alt="Person checking cash in a wallet"
              className="w-full h-full object-cover filter grayscale mix-blend-multiply opacity-80"
            />
          </div>
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
          body="The act of giving and receiving naturally carried information. As notes came back into your hand, your balance updated without requiring a separate step or deliberate action."
          icon={Wallet}
        />

        <ComparisonCard 
          type="digital"
          title="UPI Payment"
          body="The payment completes within the interface, but balance is not part of that same moment. To see it, users have to leave the confirmation screen and check it separately from the home screen."
          icon={Smartphone}
        />
      </div>

      <div 
        className="mt-32 max-w-6xl mx-auto"
      >
        <p className="text-slate-900 mb-10 font-bold uppercase tracking-[0.2em] text-[11px]">Want to check your balance after paying? Here's what that actually takes:</p>
        
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-6 mb-16">
          {[
            "Exit confirmation screen",
            "Go to home screen",
            "Find 'Check Balance'",
            "Select Account & Authenticate",
            "View account balance"
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
        
        <p className="text-slate-500 font-light italic mb-0 text-center text-lg">Five steps. By which point most people have moved on entirely.</p>
      </div>
    </Section>
  );
};