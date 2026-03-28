import { Outlet } from "react-router";
import { Cursor } from "./components/Cursor";
import { Header } from "./components/Header";
import { NoiseOverlay } from "./components/NoiseOverlay";
import { useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { CursorProvider } from "./context/CursorContext";
import { useCursor } from "./context/CursorContext";

// Inner component that resets cursor on route change
function CursorResetter() {
  const { setCursorType } = useCursor();
  const { pathname } = useLocation();

  useEffect(() => {
    setCursorType('default');
  }, [pathname, setCursorType]);

  return null;
}

export function Root() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Reset scroll on route change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <CursorProvider>
      <CursorResetter />
      <div
        ref={scrollRef}
        id="scroll-container"
        className={`h-screen w-full overflow-y-auto overflow-x-hidden relative ${isHome ? "snap-y snap-mandatory" : "snap-none"} scroll-smooth bg-stone-50 text-stone-900 font-sans selection:bg-stone-200 selection:text-stone-900 cursor-none`}
      >
        <NoiseOverlay />
        <Cursor />
        <Header scrollContainerId="scroll-container" />
        <Outlet />
      </div>
    </CursorProvider>
  );
}