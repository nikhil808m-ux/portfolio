import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Check, X, Share2 } from 'lucide-react';

export const FinalInterventionIllustration: React.FC = () => {
  const [showBalance, setShowBalance] = useState(false);
  
  // Google Blue, Green, etc.
  const googleBlue = "#4285F4";
  const googleGreen = "#34A853";
  const googleGray = "#F1F3F4";
  
  return (
    <div className="flex flex-col items-center justify-center py-12 w-full font-sans">
      {/* iPhone 17 Pro Silhouette (No Dynamic Island, Clean Bezel) */}
      <div className="relative w-[375px] h-[760px] bg-white rounded-[56px] shadow-2xl overflow-hidden border-[6px] border-gray-950 ring-1 ring-gray-950/50">
        
        {/* Status Bar Area */}
        <div className="absolute top-0 left-0 right-0 h-14 flex items-end justify-between px-8 pb-3 text-black z-10">
          <span className="text-[15px] font-semibold tracking-wide">9:41</span>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-black rounded-full opacity-20" /> {/* Signal */}
            <div className="h-3 w-3 bg-black rounded-full opacity-20" /> {/* WiFi */}
            <div className="h-3 w-6 bg-black rounded-md opacity-20" />   {/* Battery */}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center pt-24 px-8 pb-10 h-full relative">
          
          {/* Share Icon (Top Right) */}
          <div className="absolute top-16 right-8">
            <button className="p-2.5 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
              <Share2 size={20} strokeWidth={2} />
            </button>
          </div>

          {/* GPay Style Stamp Animation */}
          <div className="relative mb-8 mt-4">
             <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25, 
                delay: 0.2 
              }}
              className="w-24 h-24 bg-[#1A73E8] rounded-full flex items-center justify-center shadow-blue-200 shadow-xl"
            >
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Check size={48} className="text-white stroke-[4px]" />
              </motion.div>
            </motion.div>
            
            {/* Ripple Effects */}
             <motion.div 
               className="absolute inset-0 rounded-full border-4 border-[#1A73E8]"
               initial={{ scale: 1, opacity: 0.8 }}
               whileInView={{ scale: 1.5, opacity: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
             />
          </div>

          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[26px] leading-tight font-normal text-gray-900 mb-2 tracking-tight text-center"
          >
            Payment to Merchant
          </motion.h2>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-start justify-center text-gray-900 mb-14"
          >
            <span className="text-3xl font-medium mt-1.5 mr-1">₹</span>
            <span className="text-6xl font-medium tracking-tighter">250</span>
          </motion.div>

          {/* Transaction Details Card - "Material Card" style */}
          <motion.div 
            className="w-full bg-white border border-gray-100 rounded-2xl p-5 mb-auto shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
             <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-50">
               <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                 M
               </div>
               <div className="flex-1">
                 <p className="text-[15px] font-medium text-gray-900 leading-snug">Merchant Name</p>
                 <p className="text-[13px] text-gray-500 leading-snug">bankingname@oksbi</p>
               </div>
               <ChevronRight size={20} className="text-gray-300" />
             </div>
             <div className="flex justify-between items-center text-[13px] text-gray-500">
                <span>Transaction ID</span>
                <span className="font-mono text-gray-400">T23082112345</span>
             </div>
          </motion.div>

          <div className="flex flex-col w-full gap-4 mb-2">
            <div className="flex flex-row gap-3 w-full">
               {/* Secondary Action: View Balance - "Chip" style */}
              <motion.button 
                onClick={() => setShowBalance(true)}
                className="flex-1 py-3 px-6 bg-white border border-[#DADCE0] text-[#1A73E8] rounded-full font-medium flex items-center justify-center gap-2 hover:bg-blue-50 active:bg-blue-100 transition-colors shadow-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <span className="text-[14px] font-medium font-sans">View balance</span>
              </motion.button>

               {/* Primary Action: Done - "Filled Button" style */}
              <motion.button 
                className="flex-1 py-3 px-6 bg-[#1A73E8] text-white rounded-full font-medium hover:bg-[#1557B0] active:shadow-md transition-all shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-[14px] font-medium font-sans">Done</span>
              </motion.button>
            </div>
            
            <motion.div 
               className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-2"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 1.5 }}
            >
              <div className="w-3 h-3 bg-gray-200 rounded-full flex items-center justify-center text-[8px] font-serif font-bold text-gray-500">i</div>
              <span>Powered by UPI</span>
            </motion.div>
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full opacity-20" />
        </div>

        {/* Bottom Sheet - Google Style */}
        <AnimatePresence>
          {showBalance && (
            <motion.div 
              key="backdrop"
              className="absolute inset-0 bg-black/30 z-20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBalance(false)}
            />
          )}
          {showBalance && (
            <motion.div 
              key="sheet"
              className="absolute bottom-0 left-0 right-0 bg-[#F8F9FA] rounded-t-[32px] p-6 pb-12 z-30 shadow-[0_-4px_30px_rgba(0,0,0,0.15)]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-8 opacity-40" />
              
              <div className="flex justify-between items-center mb-8 px-2">
                <h3 className="text-xl font-normal text-gray-900">Balance updated</h3>
                <button onClick={() => setShowBalance(false)} className="p-2 bg-gray-200/50 rounded-full hover:bg-gray-200 transition-colors">
                  <X size={22} className="text-gray-600" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center gap-5 py-2">
                  <div className="w-12 h-12 border border-gray-100 bg-gray-50 rounded-full p-2.5 flex items-center justify-center">
                     {/* Bank Logo Placeholder */}
                     <div className="w-full h-full bg-[#280071] rounded-full flex items-center justify-center text-[10px] text-white font-bold">SBI</div>
                  </div>
                  <div className="flex flex-col flex-1 gap-0.5">
                    <span className="text-[16px] text-gray-900 font-medium">State Bank of India •••• 1234</span>
                    <span className="text-sm text-gray-500">Savings Account</span>
                  </div>
                </div>
                
                <div className="mt-6 pl-[68px]">
                   <p className="text-xs text-gray-500 mb-2 font-medium tracking-wide uppercase">Account Balance</p>
                   <p className="text-[32px] font-normal text-gray-900 tracking-tight">₹9,750.00</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-10 text-center">
         <p className="text-gray-400 text-xs mt-1">Tap "Check balance" to see the interaction</p>
      </div>
    </div>
  );
};
