import React, { useState } from 'react';
import { AppStoreProvider, useAppStore } from './store';
import { WelcomeScreen } from './WelcomeScreen';
import { ChatScreen } from './ChatScreen';
import { OverlayManager } from './OverlayManager';
import { AnimatePresence, motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';

const DynamicGuides = () => {
  const { screen, onboardingStep, overlays, messages, isPCSession } = useAppStore();

  // Track what the user has seen so the guides can point to unseen features
  const [explored, setExplored] = React.useState({
    menu: false,
    models: false,
    settings: false,
    pcDropdown: false,
    sentMessagePhone: false,
    sentMessagePC: false,
  });

  // Track view counts so we don't repeat identical overlay guide texts
  const [viewCounts, setViewCounts] = React.useState({
    qr: 0,
    settings: 0,
    models: 0,
    menu: 0,
    pcDropdown: 0,
  });

  const prevOverlays = React.useRef(overlays);
  React.useEffect(() => {
    setViewCounts(prev => {
      const next = { ...prev };
      let changed = false;
      if (overlays.qrOpen && !prevOverlays.current.qrOpen) { next.qr++; changed = true; }
      if (overlays.settingsOpen && !prevOverlays.current.settingsOpen) { next.settings++; changed = true; }
      if (overlays.modelsOpen && !prevOverlays.current.modelsOpen) { next.models++; changed = true; }
      if (overlays.menuOpen && !prevOverlays.current.menuOpen) { next.menu++; changed = true; }
      if (overlays.pcDropdownOpen && !prevOverlays.current.pcDropdownOpen) { next.pcDropdown++; changed = true; }
      return changed ? next : prev;
    });
    prevOverlays.current = overlays;
  }, [overlays]);

  // Track if they've completely explored everything to lock the guide text
  const [isFullyExplored, setIsFullyExplored] = React.useState(false);

  const getExplorationSuggestion = React.useCallback(() => {
    if (!explored.menu) return "Suggestion: Tap the hamburger icon in the top left to open the side menu.";
    if (!explored.models) return "Suggestion: Open the menu and tap 'Models' to check out the local AI tiers.";
    if (!explored.settings) return "Suggestion: Open the menu and tap 'Settings' to see how privacy is handled.";
    if (!explored.pcDropdown) return "Suggestion: Open the menu and tap a desktop device (or 'Connect') at the bottom to explore PC pairing.";
    if (isPCSession && !explored.sentMessagePC) return "Suggestion: You're connected to desktop power! Try sending a message.";
    return "You've explored all the major features! Feel free to keep chatting or try out different settings.";
  }, [explored, isPCSession]);

  React.useEffect(() => {
    if (!isFullyExplored && getExplorationSuggestion() === "You've explored all the major features! Feel free to keep chatting or try out different settings.") {
      setIsFullyExplored(true);
    }
  }, [getExplorationSuggestion, isFullyExplored]);

  React.useEffect(() => {
    setExplored(prev => {
      const next = {
        menu: prev.menu || overlays.menuOpen,
        models: prev.models || overlays.modelsOpen,
        settings: prev.settings || overlays.settingsOpen,
        pcDropdown: prev.pcDropdown || overlays.pcDropdownOpen,
        sentMessagePhone: prev.sentMessagePhone || (messages.length > 0 && !isPCSession),
        sentMessagePC: prev.sentMessagePC || (messages.length > 0 && isPCSession),
      };

      if (
        next.menu !== prev.menu ||
        next.models !== prev.models ||
        next.settings !== prev.settings ||
        next.pcDropdown !== prev.pcDropdown ||
        next.sentMessagePhone !== prev.sentMessagePhone ||
        next.sentMessagePC !== prev.sentMessagePC
      ) {
        return next;
      }
      return prev;
    });
  }, [overlays.menuOpen, overlays.modelsOpen, overlays.settingsOpen, overlays.pcDropdownOpen, messages.length, isPCSession]);

  let guideText = "";

  if (isFullyExplored) {
    guideText = "You've explored all the major features! Feel free to keep chatting or try out different settings.";
  }
  // 1. Active overlays taking priority over onboarding
  else if (overlays.qrOpen) {
    if (viewCounts.qr > 1) {
      guideText = getExplorationSuggestion();
    } else {
      guideText = "Secure pairing made simple. This mock shows how you'd quickly confirm the connection between your phone and desktop. Complete the mock pairing to return to the chat.";
    }
  } else if (overlays.settingsOpen) {
    if (viewCounts.settings > 1) {
      guideText = getExplorationSuggestion();
    } else {
      guideText = "In the Settings panel, you can control web access, memory limits, and manage your privacy. Feel free to explore and tap the back button to close.";
    }
  } else if (overlays.modelsOpen) {
    if (viewCounts.models > 1) {
      guideText = getExplorationSuggestion();
    } else {
      guideText = "Here you can manage the AI models. Notice how the complex technical details have been abstracted into friendly tiers. Tap the back button when done looking.";
    }
  } else if (overlays.menuOpen) {
    if (viewCounts.menu > 1) {
      guideText = getExplorationSuggestion();
    } else {
      guideText = "Awesome, you've found the side menu! From here, you can access your chat history, models, and settings. Take a peek at the Models or Settings sections next.";
    }
  }
  // 2. Onboarding progression
  else if (screen === 'onboarding') {
    if (onboardingStep === 'brand') {
      guideText = "Welcome to the interactive prototype! Tap 'Get Started' on the phone screen to dive in.";
    } else if (onboardingStep === 'models') {
      guideText = "This screen shows the local AI models currently available on the device. Notice how they are grouped into Fast, Balanced, and Thorough. Tap 'Next' to continue.";
    } else if (onboardingStep === 'pc') {
      guideText = "This highlights the 'pairing' feature, which connects your phone to a stronger desktop GPU. You can tap 'Pair My PC' to see the mock flow, or skip to start chatting.";
    }
  } else if (overlays.pcDropdownOpen) {
    if (viewCounts.pcDropdown > 1) {
      guideText = getExplorationSuggestion();
    } else {
      if (isPCSession) {
        guideText = "You're connected! The desktop's GPU is now doing the heavy lifting. Try switching back to the phone or tap outside to close this menu.";
      } else {
        guideText = "This is the connection menu. Try tapping a desktop device (or 'Connect') to link your PC's GPU for heavier, more thorough tasks.";
      }
    }
  }
  // 3. Main chat area (Fallback & Exploration Reminders)
  else {
    if (messages.length === 0) {
      guideText = "Here's your empty canvas. Try typing and sending a message to see the local AI in action, or tap the top-left menu icon to explore the app structure.";
    } else {
      guideText = getExplorationSuggestion();
    }
  }

  return (
    <div className="p-6 bg-[#111]/80 backdrop-blur-md rounded-2xl border border-[#222] shadow-2xl w-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-2.5 h-2.5 rounded-full bg-accent opacity-50 animate-ping" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
        </div>
        <p className="text-[11px] text-accent font-medium uppercase tracking-[0.2em]">Context Guide</p>
      </div>
      <motion.p
        key={guideText}
        initial={{ opacity: 0, filter: "blur(4px)", y: 4 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="text-sm text-text-secondary leading-relaxed"
      >
        {guideText}
      </motion.p>
    </div>
  );
};

const AppMockup = () => {
  const { screen } = useAppStore();

  return (
    <div className="relative w-[340px] h-[736px] sm:w-[393px] sm:h-[852px] border-[8px] border-[#161616] rounded-[48px] sm:rounded-[54px] bg-bg-deep overflow-hidden font-sans text-text-primary selection:bg-accent-dim selection:text-accent shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] shrink-0 ring-1 ring-white/5">
      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.03]"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}
      ></div>

      {/* Dynamic Island Mock */}
      <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[120px] h-[37px] bg-black rounded-full z-[100] pointer-events-none shadow-[0_0_1px_rgba(255,255,255,0.1)]"></div>

      <AnimatePresence mode="wait">
        {screen === 'onboarding' && <WelcomeScreen key="onboarding" />}
        {screen === 'chat' && <ChatScreen key="chat" />}
      </AnimatePresence>

      <OverlayManager />
    </div>
  );
};

const CaseStudyLayout = ({ hasStarted, setHasStarted }: { hasStarted: boolean, setHasStarted: (v: boolean) => void }) => {
  const { screen, onboardingStep, resetApp } = useAppStore();
  const [guideResetKey, setGuideResetKey] = React.useState(0);

  const handleReset = () => {
    resetApp();
    setGuideResetKey(k => k + 1);
    setHasStarted(false);
  };

  const [scaleProps, setScaleProps] = React.useState({ scale: 1, width: 393, height: 852 });

  React.useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      const phoneHeight = isMobile ? 736 : 852;
      const phoneWidth = isMobile ? 340 : 393;

      const availableHeight = window.innerHeight - 80;

      // Calculate max width for the phone portion (half screen on desktop, full screen minus padding on mobile)
      const availableWidth = isMobile ? window.innerWidth - 40 : (window.innerWidth / 2.2);

      // Find the scaling factors
      const scaleH = availableHeight / phoneHeight;
      const scaleW = availableWidth / phoneWidth;

      // Use the smallest scale to guarantee it fits (max 1)
      const newScale = Math.min(1, scaleH, scaleW);

      setScaleProps({
        scale: newScale,
        width: phoneWidth * newScale,
        height: phoneHeight * newScale
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track if user has navigated past the initial brand screen
  React.useEffect(() => {
    if (screen !== 'onboarding' || onboardingStep !== 'brand') {
      setHasStarted(true);
    }
  }, [screen, onboardingStep, setHasStarted]);

  return (
    <div className="min-h-screen bg-[#050505] w-full flex items-center justify-center font-sans overflow-x-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-[1920px] p-6 sm:p-12 gap-12 lg:gap-24 mx-auto">

        {/* Left side: Case Study Text & Guides */}
        <div className="flex flex-col w-full max-w-[440px] items-start text-left order-1 lg:order-1 pt-8 lg:pt-0">
          <h2 className="text-3xl sm:text-4xl font-light text-accent tracking-tight mb-6">
            Interactive Prototype
          </h2>
          <p className="text-text-secondary text-[15px] sm:text-base leading-relaxed mb-10">
            Please interact with the prototype to experience the application flow firsthand. This interactive version demonstrates the core chat mechanics, the side menu structure, and the local AI settings panels presented in the static mocks.
          </p>

          <div className="h-[50px] flex items-center mb-6">
            <AnimatePresence>
              {hasStarted && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#111] hover:bg-[#1a1a1a] border border-[#222] hover:border-[#333] transition-colors text-sm font-medium text-text-primary shadow-sm group"
                >
                  <RotateCcw className="w-4 h-4 text-text-muted group-hover:text-text-primary transition-colors" />
                  Reset Prototype
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full mt-12 min-h-[160px]">
            <DynamicGuides key={guideResetKey} />
          </div>
        </div>

        {/* Right side: App Mockup */}
        <div
          className="order-2 lg:order-2 flex justify-center relative w-full lg:w-auto pb-12 lg:pb-0 shrink-0"
          style={{ height: scaleProps.height, width: scaleProps.width }}
        >
          <div
            className="absolute top-0 left-1/2"
            style={{
              transform: `translateX(-50%) scale(${scaleProps.scale})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Glow effect behind the phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <AppMockup />
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <AppStoreProvider>
      <CaseStudyLayout
        hasStarted={hasStarted}
        setHasStarted={setHasStarted}
      />
    </AppStoreProvider>
  );
}
