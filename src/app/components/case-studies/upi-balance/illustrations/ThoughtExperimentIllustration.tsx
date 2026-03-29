import React from 'react';
import { motion } from 'motion/react';
import { Check, Wallet, Smartphone, IndianRupee } from 'lucide-react';

export const ThoughtExperimentIllustration = () => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-12">
      {/* Cash side */}
      <motion.div 
        style={{ transform: 'translateZ(0)' }}
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Stack of notes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-14 bg-emerald-50 border border-emerald-200 rounded shadow-sm flex items-center justify-center"
              style={{
                transform: 'translateZ(0)',
                top: `${i * 6}px`,
                right: `${i * 4}px`,
                zIndex: 5 - i
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
               <span className="text-emerald-700/30 text-[10px] font-mono absolute top-1 left-1">500</span>
               <IndianRupee size={12} className="text-emerald-600/50" />
            </motion.div>
          ))}
          <div className="absolute -bottom-4 right-0 transform translate-x-4">
             <motion.div
               style={{ transform: 'translateZ(0)' }}
               initial={{ opacity: 0, scale: 0.8, x: -10 }}
               whileInView={{ opacity: 1, scale: 1, x: 10, y: 20 }}
               viewport={{ once: true }}
               transition={{ delay: 0.8, duration: 0.3 }}
               className="w-24 h-14 bg-white border border-gray-200 rounded shadow flex items-center justify-center -rotate-12 origin-bottom-left"
             >
                <span className="text-gray-400 text-[10px] font-mono absolute top-1 left-1">500</span>
                <IndianRupee size={12} className="text-gray-300" />
             </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="h-px w-12 bg-gray-200 md:w-px md:h-12 hidden md:block shrink-0" />

      {/* UPI side */}
      <motion.div 
        style={{ transform: 'translateZ(0)' }}
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="relative w-32 h-32 flex items-center justify-center">
          <motion.div 
            style={{ transform: 'translateZ(0)' }}
            className="w-28 h-56 bg-gray-50 border-2 border-gray-200 rounded-[24px] shadow-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
             <div className="absolute top-0 left-0 w-full h-8 bg-white border-b border-gray-100 flex items-center justify-center">
                <div className="w-8 h-1 bg-gray-200 rounded-full" />
             </div>
             
             <div className="flex flex-col items-center justify-center h-full gap-3 pt-4">
                <motion.div 
                  style={{ transform: 'translateZ(0)' }}
                  className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  <Check size={24} className="text-emerald-500" strokeWidth={3} />
                </motion.div>
                <motion.div 
                  style={{ transform: 'translateZ(0)' }}
                  className="h-2 w-16 bg-gray-200 rounded-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                />
             </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};