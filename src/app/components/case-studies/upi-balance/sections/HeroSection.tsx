import React from 'react';
import { Section } from '../Section';
import { HeroIllustration } from '../illustrations/HeroIllustration';
import { motion } from 'motion/react';

const GoogleGridPattern = () => (
  <svg className="absolute inset-0 w-full h-full -z-10" width="100%" height="100%">
    <defs>
      <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#E8EAED" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
);

export const HeroSection: React.FC = () => {
  return (
    <Section className="min-h-screen flex items-center pt-32 pb-24 relative overflow-hidden bg-white">
      <GoogleGridPattern />
      
      {/* Abstract Gradient Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-50 mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-[30%] right-[0%] w-[400px] h-[400px] rounded-full bg-green-50 mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-yellow-50 mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full relative z-10">
        <div className="flex flex-col gap-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold tracking-wider uppercase rounded-full border border-blue-100">
                UX Case Study
              </span>
              <span className="h-px w-12 bg-gray-200"></span>
              <span className="text-gray-400 text-xs font-medium tracking-wide">Feb 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-gray-900 leading-[1.05] mb-6 font-sans">
              After Payment <br/>
              <span className="text-gray-900 font-bold">Successful</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-normal text-gray-500 mb-8 leading-snug max-w-lg">
              When payments became <span className="text-gray-900 font-medium">too smooth</span>, we lost our <span className="text-gray-900 font-medium">passive control</span>.
            </h2>
          </motion.div>

          <motion.div 
            className="prose prose-lg text-gray-600 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="mb-6">
              Cash had physical friction—bulk, counting, and the visual thinning of a wallet. This friction acted as a <strong>passive control mechanism</strong>, keeping us aware of our spending without active effort.
            </p>
            <p className="border-l-4 border-[#4285F4] pl-6 py-2 italic text-gray-500 bg-gray-50 rounded-r-lg">
              "UPI removed this friction entirely. The result? We spend faster, track less, and often face the shock of <span className="text-red-500 font-medium">Insufficient Balance</span>."
            </p>
          </motion.div>
          
          <motion.div
             className="flex gap-4 mt-4"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.6 }}
          >
            <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 font-bold">
                   U{i}
                 </div>
               ))}
            </div>
            <p className="text-sm text-gray-400 self-center">Based on interviews with daily UPI users.</p>
          </motion.div>
        </div>

        <div className="flex justify-center items-center lg:justify-end relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-green-100/30 rounded-full blur-3xl -z-10 transform scale-150 opacity-80" />
          <HeroIllustration />
        </div>
      </div>
    </Section>
  );
};
