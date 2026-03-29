import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { useCursor } from '../context/CursorContext';
import { ArrowUpRight } from 'lucide-react';
import { useLocation } from 'react-router';

export function Cursor() {
  const { cursorType } = useCursor();
  const { pathname } = useLocation();
  const isCaseStudy = pathname.startsWith('/case-studies/');
  const [isHovered, setIsHovered] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 1. The Dot (Pointer) - Real-time speed (Instant)
  const dotX = useSpring(mouseX, { stiffness: 4000, damping: 60, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 4000, damping: 60, mass: 0.1 });

  // 2. The Blob (Chaser) - Smoother, heavier delay
  const blobSpringConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const blobX = useSpring(mouseX, blobSpringConfig);
  const blobY = useSpring(mouseY, blobSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const target = e.target;

      // 1. Fast Interactive Check using native DOM capabilities (no getComputedStyle)
      const isInteractive = target.closest('a, button, input, textarea, select, label, .interactive, [role="button"]') !== null;

      setIsHovered(isInteractive);

      // 2. Fast Content Check without any tree traversal
      const isTextOrMedia = target.closest('p, span, h1, h2, h3, h4, h5, h6, li, img, svg, blockquote, code, pre, strong, em, b, i, th, td, caption, figcaption, dt, dd') !== null;

      // If it's interactive or text/media, it is "content" and should hide the dot
      setIsContent(isInteractive || isTextOrMedia);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  // Simple cursor for case study pages
  if (isCaseStudy) {
    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 14,
          height: 14,
          opacity: 0.7,
          mixBlendMode: 'difference',
        }}
      />
    );
  }

  const isCardState = cursorType === 'card';
  const isMenuItem = cursorType === 'menu-item';

  // Combine all conditions that should hide the dot
  // The rule: visible only in empty area without any content
  const shouldHideDot = isCardState || isMenuItem || isContent;

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
      >
        {/* The Blob (Chaser) */}
        <motion.div
          className="absolute top-0 left-0 bg-white rounded-full will-change-transform"
          style={{
            x: blobX,
            y: blobY,
            translateX: "-50%",
            translateY: "-50%",
            mixBlendMode: 'difference'
          }}
          initial={{ width: 40, height: 40, opacity: 1 }}
          animate={{
            width: isCardState ? 100 : isMenuItem ? 60 : isHovered ? 60 : 40,
            height: isCardState ? 100 : isMenuItem ? 60 : isHovered ? 60 : 40,
            scale: isClicking ? 0.9 : 1,
            opacity: 1
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.5
          }}
        />

        {/* The Dot (Pointer) */}
        <motion.div
          className="absolute top-0 left-0 bg-white rounded-full will-change-transform"
          style={{
            x: dotX,
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            mixBlendMode: 'difference'
          }}
          animate={{
            width: shouldHideDot ? 0 : 8,
            height: shouldHideDot ? 0 : 8,
            opacity: shouldHideDot ? 0 : 1
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[101] mix-blend-exclusion text-black will-change-transform"
        style={{
          x: blobX,
          y: blobY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: isCardState ? 1 : 0,
            scale: isCardState ? 1 : 0.5
          }}
          transition={{ duration: 0.2 }}
          className="font-medium text-[10px] uppercase tracking-widest flex items-center gap-1"
        >
          <span>View</span>
          <ArrowUpRight className="w-3 h-3" />
        </motion.div>
      </motion.div>
    </>
  );
}