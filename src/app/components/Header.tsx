import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router';
import { Magnetic } from './Magnetic';
import { useCursor } from '../context/CursorContext';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  scrollContainerId?: string;
}

export function Header({ scrollContainerId }: HeaderProps) {
  const { setCursorType } = useCursor();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // State for visibility and background
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs to track scroll position
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Determine the scroll target: Window or specific container
    const target = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : window;

    if (!target) return;

    const handleScroll = () => {
      // Get current scroll position based on target type
      const currentScrollY = scrollContainerId && target instanceof HTMLElement
        ? target.scrollTop
        : window.scrollY;

      const diff = currentScrollY - lastScrollY.current;

      // Update background state (threshold 50px)
      if (currentScrollY > 50 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentScrollY <= 50 && isScrolled) {
        setIsScrolled(false);
      }

      // Logic for hiding/showing
      // 1. Always show at the very top
      if (currentScrollY < 50) {
        if (!isVisible) setIsVisible(true);
      }
      // 2. Hide when scrolling down significantly
      // Reduced threshold to 5px to make it more responsive
      else if (diff > 5 && isVisible) {
        setIsVisible(false);
      }
      // 3. Show when scrolling up significantly
      // "Accelerated" feel: any upward movement > 5px
      else if (diff < -5 && !isVisible) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Add passive listener
    target.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerId, isScrolled, isVisible]);

  const navVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5
      }
    },
    hidden: {
      y: "-100%",
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3
      }
    }
  };

  return (
    <motion.nav
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      variants={navVariants}
      style={{ willChange: "transform, opacity" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center pointer-events-auto"
    >
      {/* Background - Fades in only when scrolled */}
      <motion.div
        className="absolute inset-0 z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-stone-50/95 border-b border-stone-200/50 shadow-sm" />
      </motion.div>

      {/* Logo or Back button depending on route */}
      <div className="interactive font-display font-bold text-xl tracking-tighter cursor-none z-10 text-stone-900">
        {isHome ? (
          <a href="/" className="hover:text-stone-600 transition-colors block">
            NM<span className="text-stone-400">.</span>
          </a>
        ) : (
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors group"
            onMouseEnter={() => setCursorType('menu-item')}
            onMouseLeave={() => setCursorType('default')}
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Portfolio
          </Link>
        )}
      </div>

      <div className="hidden md:flex gap-8 text-xs font-mono tracking-widest uppercase z-10">
        {['Work', 'About', 'Contact'].map((item) => (
          <Magnetic key={item} strength={0.3}>
            <a
              href={`#${item.toLowerCase()}`}
              onMouseEnter={() => setCursorType('menu-item')}
              onMouseLeave={() => setCursorType('default')}
              className="hover:text-stone-600 transition-colors interactive relative group cursor-none font-medium text-stone-500 block px-2 py-1"
            >
              <span className="group-hover:text-stone-900 transition-colors">
                {'//'} {item}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-stone-900 group-hover:w-full transition-all duration-300" />
            </a>
          </Magnetic>
        ))}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden interactive text-xs font-mono tracking-widest z-10 text-stone-500">
        MENU
      </div>
    </motion.nav>
  );
}