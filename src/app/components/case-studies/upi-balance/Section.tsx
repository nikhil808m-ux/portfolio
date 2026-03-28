import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'motion/react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'base' | 'alt' | 'dark' | 'emerald';
}

export const Section: React.FC<SectionProps> = ({ id, className, children, variant = 'base' }) => {
  const bgColors = {
    base: 'bg-[#F6F7F9] text-[#1F2937]',
    alt: 'bg-[#EEF2F7] text-[#1F2937]',
    dark: 'bg-[#121417] text-[#F9FAFB]',
    emerald: 'bg-[#1FA774] text-white',
  };

  return (
    <section 
      id={id}
      className={clsx(
        'w-full py-20 px-6 md:px-12 lg:px-24 flex justify-center',
        bgColors[variant],
        className
      )}
    >
      <div className="max-w-4xl w-full">
        {children}
      </div>
    </section>
  );
};

interface TextBlockProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark'; 
}

export const TextBlock: React.FC<TextBlockProps> = ({ 
  title, 
  subtitle, 
  children, 
  className,
  align = 'left',
  variant = 'dark'
}) => {
  const isDark = variant === 'dark';
  
  return (
    <div className={clsx(
      'flex flex-col gap-4 mb-12', 
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      className
    )}>
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className={clsx(
            "text-3xl md:text-4xl font-semibold tracking-tight",
            isDark ? "text-gray-900" : "text-white"
          )}
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className={clsx(
            "text-xl md:text-2xl font-medium",
            isDark ? "text-[#5C6AC4]" : "text-emerald-200"
          )}
        >
          {subtitle}
        </motion.h3>
      )}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className={clsx(
          "text-lg leading-relaxed max-w-2xl",
          isDark ? "text-gray-600" : "text-gray-300"
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};
