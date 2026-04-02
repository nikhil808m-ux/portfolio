import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useCursor } from '../context/CursorContext';

interface ProjectProps {
  title: string;
  category: string;
  description: string;
  index: number;
  imageUrl: string;
  imageObjectPosition?: string;
  year?: string;
  tags?: string[];
  slug: string;
  status: "published" | "coming-soon";
}

export function ProjectCard({ title, category, description, index, imageUrl, imageObjectPosition = "center", year = "2026", tags = ["UI/UX", "Research"], slug, status }: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setCursorType } = useCursor();
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    const { left, top, width, height } = rectRef.current;

    const mouseX = (e.clientX + window.scrollX) - left;
    const mouseY = (e.clientY + window.scrollY) - top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      rectRef.current = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      };
    }
    setCursorType('card');
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    setCursorType('default');
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const cardContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className="relative w-full group perspective-1000 interactive cursor-none"
    >
      {/* Container - Mono Theme - Warm Stone */}
      <div className="relative bg-white border border-stone-200 hover:border-stone-400 transition-all duration-500 overflow-hidden rounded-[1.5rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">

        {/* Header Strip - Minimal Mono */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 bg-white z-20 relative">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-stone-900" />
            <span className="text-xs font-sans font-medium uppercase tracking-widest text-stone-500 group-hover:text-stone-900 transition-colors">
              {category}
            </span>
          </div>

          {/* Coming Soon Badge */}
          {status === "coming-soon" && (
            <span className="absolute top-4 right-14 text-[10px] font-mono uppercase tracking-widest text-stone-400 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full">
              Coming Soon
            </span>
          )}

          {/* Expand/Collapse Indicator */}
          <div className="w-8 h-8 flex items-center justify-center border border-stone-200 rounded-full bg-stone-50 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all duration-300">
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Image Area - Clean & BW to Color */}
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
          <motion.img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover will-change-transform"
            style={{ objectPosition: imageObjectPosition }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            loading="eager"
            decoding="sync"
          />

          {/* Hover Overlay Gradient - Subtle Stone */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0"
            animate={{ opacity: isHovered ? 0.3 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Tags - Floating Pill Style Mono */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-20">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white/90 backdrop-blur-md border border-stone-200/40 text-stone-900 text-[10px] font-sans font-medium uppercase tracking-wide rounded-full shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Footer - Mono */}
        <div className="p-6 md:p-8 bg-white relative z-20 border-t border-stone-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-medium text-stone-900 tracking-tight font-display group-hover:underline decoration-stone-300 underline-offset-4 decoration-2 transition-all duration-300">
              {title}
            </h3>
            <span className="text-xs font-mono text-stone-400 mt-1">{year}</span>
          </div>

          <div className="relative overflow-hidden">
            <motion.p
              className="text-sm text-stone-500 leading-relaxed font-sans max-w-[95%]"
              animate={{
                opacity: isHovered ? 1 : 0.8,
              }}
            >
              {description}
            </motion.p>
          </div>
        </div>

      </div>
    </motion.div>
  );

  if (status === "published") {
    return (
      <Link to={"/case-studies/" + slug} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
