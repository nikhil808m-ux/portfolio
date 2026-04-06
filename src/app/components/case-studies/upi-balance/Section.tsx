import React from 'react';
import { clsx } from 'clsx';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'base' | 'alt' | 'dark' | 'emerald';
}

export const Section: React.FC<SectionProps> = ({ id, className, children, variant = 'base' }) => {
  const bgColors = {
    base: 'bg-[#F8FAFC] text-slate-900',
    alt: 'bg-white text-slate-900',
    dark: 'bg-[#0F172A] text-slate-50',
    emerald: 'bg-[#10B981] text-white',
  };

  return (
    <section 
      id={id}
      className={clsx(
        'w-full py-20 md:py-24 px-6 md:px-12 lg:px-24 xl:px-32 flex justify-center transition-colors duration-500 relative',
        bgColors[variant],
        className
      )}
    >
      <div className="max-w-screen-xl w-full">
        {children}
      </div>
    </section>
  );
};

interface TextBlockProps {
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark'; 
}

export const TextBlock: React.FC<TextBlockProps> = ({ 
  eyebrow,
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
      'flex flex-col gap-6 mb-16', 
      align === 'center' ? 'items-center text-center' : 'items-start text-left',
      className
    )}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-4">
          <span className={clsx(
            "px-3 py-1 bg-transparent rounded-[2px] text-[11px] font-bold tracking-[0.2em] uppercase border",
            isDark ? "text-slate-900 border-slate-200" : "text-slate-300 border-slate-700"
          )}>
            {eyebrow}
          </span>
        </div>
      )}
      {title && (
        <h2 
          className={clsx(
            "text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]",
            isDark ? "text-slate-900" : "text-white"
          )}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <h3 
          className={clsx(
            "text-2xl md:text-3xl font-light tracking-tight leading-snug",
            isDark ? "text-slate-500" : "text-slate-300"
          )}
        >
          {subtitle}
        </h3>
      )}
      <div 
        className={clsx(
          "text-lg leading-relaxed max-w-3xl font-light",
          isDark ? "text-slate-600" : "text-slate-300"
        )}
      >
        {children}
      </div>
    </div>
  );
};