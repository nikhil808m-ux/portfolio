import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Magnetic } from './Magnetic';

export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Premium easing curve for a "crafted" feel (Expo Out / Quart Out)
  const revealTransition: any = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

  return (
    <section
      id="hero"
      className="h-screen w-full flex flex-col justify-center px-6 md:px-12 relative overflow-hidden bg-transparent snap-start cursor-none"
    >
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <motion.div
          style={{ y: y1, opacity, willChange: "transform, opacity" }}
          className="flex flex-col items-start gap-8"
        >
          {/* 1. Badge - Subtle Entry */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...revealTransition, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="h-[1px] w-8 bg-stone-400 block"></span>
            <span className="font-mono text-sm text-stone-500 tracking-widest uppercase">
              Product Designer
            </span>
          </motion.div>

          {/* 2. Main Title Group - Masked Reveal for cleaner look */}
          <div className="relative z-20 cursor-none flex flex-col items-start select-none -space-y-2 md:-space-y-4">

            {/* "Hi, I'm" */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ ...revealTransition, delay: 0.2 }}
                className="relative pb-2"
              >
                <span className="text-4xl md:text-5xl font-display font-light text-stone-600 block">
                  Hi, I'm
                </span>
              </motion.div>
            </div>

            {/* "Nikhil" - The Star */}
            <div className="relative -ml-3 md:-ml-6 overflow-visible p-2 md:p-4">
              <Magnetic strength={0.25}>
                <motion.h1
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ ...revealTransition, duration: 1.4, delay: 0.3 }}
                  className="font-display font-semibold text-[15vw] md:text-[12vw] leading-[0.8] tracking-tighter text-stone-900"
                >
                  Nikhil
                </motion.h1>
              </Magnetic>
            </div>
          </div>

          {/* 3. Description & CTA - Unified Fade Up */}
          <div className="flex flex-col gap-10 w-full max-w-2xl mt-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.5 }}
              className="text-xl md:text-2xl text-stone-600 font-light leading-relaxed"
            >
              I craft <span className="text-stone-900 font-medium">intuitive interfaces</span> that simplify complexity. Bringing <span className="text-stone-800 font-serif italic">joy</span> back to digital interactions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...revealTransition, delay: 0.6 }}
              className="flex items-center gap-8"
            >
              <a href="#work" className="group relative px-8 py-4 bg-stone-900 text-stone-50 font-medium rounded-full overflow-hidden interactive shadow-lg hover:shadow-xl transition-all duration-500">
                <span className="relative z-10 flex items-center gap-2">
                  Selected Work <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-stone-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out z-0" />
              </a>

              <a href="#about" className="text-sm font-mono text-stone-500 hover:text-stone-900 transition-colors interactive tracking-wide">
                READ MY STORY
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - subtle fade in very last */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 text-stone-400 text-xs font-mono uppercase tracking-widest"
      >
        <div className="w-12 h-[1px] bg-stone-300" />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
}
