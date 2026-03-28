import React from 'react';
import { Section } from '../Section';
import { motion } from 'motion/react';
import { Wallet, Smartphone, ArrowRight, X, Check, Coins, Zap } from 'lucide-react';

const ComparisonCard = ({ 
  title, 
  icon: Icon, 
  points, 
  type, 
  delay 
}: { 
  title: string; 
  icon: React.ElementType; 
  points: { label: string; sub: string }[]; 
  type: 'cash' | 'upi';
  delay: number;
}) => {
  const isCash = type === 'cash';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative p-8 md:p-10 rounded-[32px] overflow-hidden h-full flex flex-col ${
        isCash 
          ? 'bg-[#F8F9FA] border border-[#DADCE0]' 
          : 'bg-white border border-[#D2E3FC] shadow-[0_8px_24px_rgba(66,133,244,0.12)]'
      }`}
    >
      {/* Background Decor */}
      {!isCash && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/3 -translate-y-1/3" />
      )}

      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-8 ${
        isCash ? 'bg-[#E8EAED] text-[#5F6368]' : 'bg-[#E8F0FE] text-[#1967D2]'
      }`}>
        <Icon size={28} strokeWidth={isCash ? 2 : 2.5} />
      </div>

      <h3 className={`text-2xl font-normal mb-2 tracking-tight ${isCash ? 'text-[#202124]' : 'text-[#1967D2]'}`}>
        {title}
      </h3>
      
      <div className="space-y-8 mt-8 flex-1">
        {points.map((point, idx) => (
          <div key={idx} className="flex gap-4 items-start">
             <div className={`mt-1 min-w-[24px] h-6 rounded-full flex items-center justify-center ${
               isCash ? 'bg-[#F1F3F4]' : 'bg-[#E6F4EA]'
             }`}>
               {isCash ? (
                 <X size={14} className="text-[#5F6368]" />
               ) : (
                 <Check size={14} className="text-[#137333]" strokeWidth={3} />
               )}
             </div>
             <div>
               <p className={`text-[15px] font-medium mb-1 ${isCash ? 'text-[#3C4043]' : 'text-[#202124]'}`}>
                 {point.label}
               </p>
               <p className={`text-sm leading-relaxed ${isCash ? 'text-[#5F6368]' : 'text-[#5F6368]'}`}>
                 {point.sub}
               </p>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const CashVsUpiSection: React.FC = () => {
  return (
    <Section className="bg-white py-32" id="cash-vs-upi">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20 items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[11px] font-bold tracking-wider uppercase">Context</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight"
          >
            The Friction of Cash vs. <br/>
            <span className="text-[#1A73E8] font-medium">The Fluidity of UPI</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg text-[#5F6368] leading-relaxed max-w-xl"
          >
            We often forget the micro-stressors of physical currency. UPI didn't just digitize money; it eliminated the cognitive load of the transaction itself.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        {/* Connector Arrow */}
        <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
           <div className="bg-white p-3 rounded-full shadow-sm border border-gray-100 text-gray-300">
             <ArrowRight size={24} />
           </div>
        </div>

        <ComparisonCard 
          type="cash"
          title="Physical Cash"
          icon={Wallet}
          delay={0.3}
          points={[
            {
              label: "The Burden of Carrying",
              sub: "Physical money occupies mental and physical space. The fear of loss, the bulk of a wallet, and the constant need to 'withdraw' create ongoing friction."
            },
            {
              label: "Availability of Change",
              sub: "The exact change problem—scrambling for coins or accepting unwanted items in return. It forced transactions to be approximate, not precise."
            }
          ]}
        />

        <ComparisonCard 
          type="upi"
          title="Unified Payments"
          icon={Zap}
          delay={0.5}
          points={[
            {
              label: "Zero Physical Friction",
              sub: "Money is no longer an object to be carried. It is accessible instantly, anywhere, removing the 'preparation' phase of purchasing."
            },
            {
              label: "Absolute Precision",
              sub: "Every transaction is exact. ₹253.45 is transferred as easily as ₹100. The concept of 'change' has become obsolete."
            }
          ]}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="mt-20 bg-[#F8F9FA] rounded-2xl p-8 md:p-12 text-center border border-[#F1F3F4]"
      >
        <p className="text-xl md:text-2xl text-[#202124] font-normal leading-relaxed max-w-3xl mx-auto font-google-sans">
          "By removing these friction points, UPI made paying <span className="bg-blue-50 text-[#1967D2] px-2 py-0.5 rounded font-medium">too smooth</span>. It removed the moment of pause where we consciously acknowledge the expense."
        </p>
      </motion.div>
    </Section>
  );
};
