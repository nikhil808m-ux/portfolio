import { motion } from 'motion/react';
import React, { useEffect } from 'react';
import { ProjectCard } from './ProjectCard';
import { Hero } from './Hero';
import { GridBackground } from './GridBackground';
import { AboutSection } from './AboutSection';
import { ChevronRight, Braces, Palette, GraduationCap, Briefcase, MousePointer, ArrowDown, MapPin, Layers, Code2 } from 'lucide-react';
import { FaBehance, FaLinkedin } from 'react-icons/fa';
import { useCursor } from '../context/CursorContext';
import { projects } from '../data/projects';

/**
 * A crafted "scroll-aware" reveal.
 */
const ScrollReveal = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function Home() {
  const { setCursorType } = useCursor();

  // Silently prefetch all case study chunks once the browser is fully idle.
  // requestIdleCallback fires only when the browser has nothing else to render or paint.
  // A 3s deadline timeout ensures it still runs on slow connections.
  // Falls back to setTimeout for Safari which doesn't support requestIdleCallback.
  useEffect(() => {
    const prefetch = () => {
      import('../components/case-studies/localai-manager/index');
      import('../components/case-studies/upi-balance/index');
      import('../components/case-studies/nirmaan-financial/index');
      import('../components/case-studies/fluxkey-console/index');
    };

    let handle: number;
    if (typeof window.requestIdleCallback === 'function') {
      handle = window.requestIdleCallback(prefetch, { timeout: 3000 });
    } else {
      // Safari fallback — still waits for load event before scheduling
      const onLoad = () => {
        handle = window.setTimeout(prefetch, 500) as unknown as number;
      };
      if (document.readyState === 'complete') {
        onLoad();
      } else {
        window.addEventListener('load', onLoad, { once: true });
      }
    }

    return () => {
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
    };
  }, []);
  return (
    <>
      <style>{`
          /* Custom scrollbar - Cleaner Mono */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #fafaf9; 
          }
          ::-webkit-scrollbar-thumb {
            background: #d6d3d1; 
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #78716c; 
          }
        `}</style>

      {/* Subtle Backgrounds */}
      <GridBackground />

      {/* Hero Section */}
      <div className="min-h-screen w-full relative flex items-center snap-start">
        <Hero />
      </div>

      {/* Selected Work Section */}
      <section id="work" className="min-h-screen px-6 md:px-12 py-20 md:py-32 relative z-10 bg-white/90 border-t border-stone-200 snap-start">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-32 flex flex-col md:flex-row items-end justify-between gap-6 border-b border-stone-200 pb-8"
          >
            <div>
              <span className="text-xs font-mono text-stone-500 mb-4 block tracking-widest uppercase">
                Selected Works
              </span>
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-stone-900 font-display">
                Designing for <span className="text-stone-400 italic font-serif">clarity.</span>
              </h2>
            </div>
            <div className="hidden md:block text-right pb-2">
              <p className="text-stone-500 max-w-xs text-sm font-sans leading-relaxed text-right ml-auto">
                A selection of projects focused on real problems and thoughtful interactions.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-32">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.slug}
                className={index % 2 !== 0 ? "md:mt-32" : ""}
              >
                <ProjectCard {...project} index={index} />
              </ScrollReveal>
            ))}
          </div>
          {/* View All Projects button removed as requested */}
        </div>
      </section>

      {/* Philosophy / About Section */}
      <AboutSection />

      {/* Contact Section */}
      <section id="contact" className="min-h-screen px-6 md:px-12 py-20 md:py-32 bg-neutral-900 text-stone-50 relative z-10 flex flex-col justify-center border-t border-neutral-800 snap-start">
        <div className="max-w-4xl w-full mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-stone-700 bg-stone-800 rounded-full text-stone-400 text-xs font-mono tracking-widest uppercase mb-12">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-stone-500"></span>
              </span>
              Available for new projects
            </div>

            <h2 className="text-[6vw] md:text-[5vw] leading-[1] font-medium tracking-tight mb-12 font-display text-stone-50 hover:text-stone-300 transition-colors duration-500 interactive">
              Let's build something <br /> <span className="font-serif italic text-stone-500">delightful</span> together.
            </h2>

            <div className="flex flex-col items-center gap-8">
              <a
                href="mailto:hello@nikhilmanoj.me"
                className="text-2xl md:text-3xl font-light hover:text-stone-300 transition-all interactive font-sans border-b border-stone-700 hover:border-stone-500 pb-1"
              >
                hello@nikhilmanoj.me
              </a>

              <div className="flex gap-6 mt-8">
                {[
                  { icon: <FaBehance className="w-5 h-5" />, label: "Behance", url: "https://www.behance.net/nikhilmanoj" },
                  { icon: <FaLinkedin className="w-5 h-5" />, label: "LinkedIn", url: "https://www.linkedin.com/in/nikhilmanoj/" },
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full border border-stone-700 bg-stone-800 hover:bg-stone-100 hover:text-stone-900 hover:border-white transition-all duration-300 interactive group" aria-label={social.label}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-32 border-t border-stone-800 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-stone-500 uppercase tracking-widest">
              <span>Nikhil Manoj · Portfolio · {new Date().getFullYear()}</span>
              <div className="flex items-center gap-6 mt-4 md:mt-0">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Bengaluru, India
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}