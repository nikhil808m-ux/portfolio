import { motion } from 'motion/react';
import { Palette, Braces, ChevronRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export function AboutSection() {
  const { setCursorType } = useCursor();

  return (
    <section id="about" className="min-h-screen px-6 md:px-12 py-20 md:py-32 bg-stone-100 relative z-10 border-t border-stone-200 snap-start flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">

        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ willChange: "transform, opacity" }}
            className="text-xs font-mono text-stone-500 mb-8 block tracking-widest uppercase"
          >
            My Philosophy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] text-stone-900 mb-8 font-display tracking-tight"
          >
            Design is not just about pixels. It's about <span className="text-stone-500 italic font-serif">solving problems</span> for real people.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
            className="relative pl-8 border-l border-stone-300"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2 font-display">
              <Palette className="w-5 h-5 text-stone-500" /> Visual Storyteller
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed font-sans">
              "I believe good design should be invisible. It should guide the user effortlessly through their journey without friction, creating moments of delight along the way."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ willChange: "transform, opacity" }}
            className="relative pl-8 border-l border-stone-300"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-3 flex items-center gap-2 font-display">
              <Braces className="w-5 h-5 text-stone-600" /> Tech-Savvy Designer
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed font-sans">
              "With a background in CS, I speak the language of developers. I design systems that are not just beautiful, but scalable, maintainable, and built for the real world."
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ willChange: "transform, opacity" }}
          className="flex justify-center"
        >
          <a href="#" className="group interactive inline-flex items-center gap-4 px-8 py-4 rounded-full border border-stone-300 hover:border-stone-900 hover:bg-white transition-all duration-300 bg-stone-50/50">
            <span className="font-sans text-sm tracking-wide text-stone-600 group-hover:text-stone-900 font-medium">About Me</span>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
