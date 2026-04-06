import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Share2, X } from 'lucide-react';

export const FinalInterventionIllustration: React.FC = () => {
  const [showBalance, setShowBalance] = useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center py-6 w-full font-sans">
      <div 
        className="relative w-[375px] h-[760px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-slate-900 ring-1 ring-slate-800 origin-center"
        style={{ transform: 'scale(0.95) translateZ(0)' }}
      >
        
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-[44px] flex items-center justify-between px-6 text-slate-800 z-10 bg-white">
          <span className="text-[14px] font-semibold tracking-wide">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 bg-slate-800 rounded-full" />
            <div className="h-3 w-3 bg-slate-800 rounded-full" />
            <div className="h-3 w-6 bg-slate-800 rounded-md" />
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center pt-[80px] px-6 h-full relative z-0 bg-white">
          
          <div className="absolute top-[60px] right-6">
            <button className="p-2 text-[#5F6368]">
              <Share2 size={24} strokeWidth={2} />
            </button>
          </div>

          {/* GPay Success Stamp */}
          <div className="relative mb-6 mt-16">
             <motion.div 
              style={{ transform: 'translateZ(0)' }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.1 }}
              className="w-[100px] h-[100px] bg-[#1A73E8] rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(26,115,232,0.3)]"
            >
              <motion.div
                style={{ transform: 'translateZ(0)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Check size={56} className="text-white stroke-[3.5px]" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            style={{ transform: 'translateZ(0)' }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-start justify-center text-[#202124] mb-3"
          >
            <span className="text-4xl font-normal mt-1 mr-1">₹</span>
            <span className="text-[56px] font-normal leading-none tracking-tight">250</span>
          </motion.div>

          <motion.div 
            style={{ transform: 'translateZ(0)' }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center text-center mb-10"
          >
            <span className="text-[#202124] text-[20px] font-medium mb-1">Paid to Coffee Shop</span>
            <span className="text-[#5F6368] text-[14px]">merchant@upi</span>
          </motion.div>

          {/* Transaction Details */}
          <motion.div 
            style={{ transform: 'translateZ(0)' }}
            className="w-full mb-auto flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
             <div className="flex flex-col items-center text-[13px] text-[#5F6368] gap-1.5">
                <span>Feb 28, 2026 09:41 AM</span>
                <span>UPI transaction ID: 230821123456</span>
             </div>
          </motion.div>

          <div className="flex flex-col w-full gap-4 mb-8">
            <div className="flex flex-row gap-3 w-full">
              <motion.button 
                style={{ transform: 'translateZ(0)' }}
                onClick={() => setShowBalance(true)}
                className="flex-[1.2] py-3.5 px-4 bg-white border border-[#DADCE0] text-[#1A73E8] rounded-full font-medium flex items-center justify-center hover:bg-[#F1F3F4] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.3 }}
              >
                <span className="text-[14px]">View balance</span>
              </motion.button>

              <motion.button 
                style={{ transform: 'translateZ(0)' }}
                className="flex-1 py-3.5 px-6 bg-[#1A73E8] text-white rounded-full font-medium flex items-center justify-center hover:bg-[#1557B0] transition-colors shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, duration: 0.3 }}
              >
                <span className="text-[14px]">Done</span>
              </motion.button>
            </div>
            
            <motion.div 
               style={{ transform: 'translateZ(0)' }}
               className="flex items-center justify-center gap-2 text-[12px] text-[#5F6368] mt-4"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 1.5 }}
            >
              <span className="font-medium">Powered by UPI</span>
            </motion.div>
          </div>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full opacity-20" />
        </div>

        {/* Bottom Sheet */}
        <AnimatePresence>
          {showBalance && (
            <motion.div 
              key="backdrop"
              style={{ transform: 'translateZ(0)' }}
              className="absolute inset-0 bg-[#202124]/40 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowBalance(false)}
            />
          )}
          {showBalance && (
            <motion.div 
              key="sheet"
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] p-6 pb-12 z-30 shadow-2xl"
              style={{ transform: 'translateZ(0)' }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[18px] font-medium text-[#202124]">Account balance</h3>
                <button onClick={() => setShowBalance(false)} className="p-2 text-[#5F6368]">
                  <X size={24} />
                </button>
              </div>

              <div className="border border-[#DADCE0] rounded-[20px] p-6 bg-white shadow-sm mb-2">
                <div className="pb-5 border-b border-[#F1F3F4] mb-5">
                   <p className="text-[32px] font-medium text-[#202124] tracking-tight">₹9,750.00</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F1F3F4] rounded-full flex items-center justify-center text-[#1A73E8] font-bold text-sm">
                     SB
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[15px] text-[#202124] font-medium">State Bank of India •••• 1234</span>
                    <span className="text-[13px] text-[#5F6368]">Savings Account</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};