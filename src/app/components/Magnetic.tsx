import { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // How strong the pull is (default: 0.5)
  active?: boolean;
  className?: string;
}

export function Magnetic({ children, strength = 0.5, active = true, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const handleMouseEnter = () => {
    if (active && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      rectRef.current = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active || !rectRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = rectRef.current;

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const pageX = clientX + window.scrollX;
    const pageY = clientY + window.scrollY;

    const distanceX = (pageX - centerX) * strength;
    const distanceY = (pageY - centerY) * strength;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`} // Default to inline-block for better wrapping behavior
    >
      {children}
    </motion.div>
  );
}
