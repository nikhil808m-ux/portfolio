Three files change: store.tsx, WelcomeScreen.tsx, 
and ChatScreen.tsx.
Read all three fully before starting.

═══════════════════════════════════════════════════
FILE 1 — store.tsx
═══════════════════════════════════════════════════

── ADD: onboarding step to Screen type ───────────

Find:
  export type Screen = 'welcome' | 'chat';

Replace with:
  export type Screen = 'onboarding' | 'chat';

The WelcomeScreen component becomes the 
multi-step OnboardingScreen. 
'welcome' is gone. 'onboarding' is the 
initial screen.

Update the initial state:
  const [screen, setScreen] = useState<Screen>(
    'onboarding'
  );

═══════════════════════════════════════════════════
FILE 2 — App.tsx
═══════════════════════════════════════════════════

── UPDATE: screen routing ────────────────────────

Find:
  {screen === 'welcome' && 
    <WelcomeScreen key="welcome" />}

Replace with:
  {screen === 'onboarding' && 
    <WelcomeScreen key="onboarding" />}

The component name WelcomeScreen stays — 
only the key and condition change.

═══════════════════════════════════════════════════
FILE 3 — WelcomeScreen.tsx
═══════════════════════════════════════════════════

── REWRITE: entire file ──────────────────────────

Replace the entire file with the following.
Three internal steps managed by local state: 
'brand' | 'models' | 'pc'

The Screen type 'onboarding' maps to this 
component. setScreen('chat') fires on 
completion.

─────────────────────────────────────────────────

import React, { useState } from 'react';
import { motion, AnimatePresence } from 
  'motion/react';
import { Monitor, ChevronRight, Cpu } from 
  'lucide-react';
import { useAppStore } from '../store';
import { Glyph } from './Glyph';

type OnboardingStep = 'brand' | 'models' | 'pc';

export const WelcomeScreen = () => {
  const { setScreen, setOverlay, models } = 
    useAppStore();
  const [step, setStep] = 
    useState<OnboardingStep>('brand');

  // Models that are ready (not 
  // insufficient_memory)
  const readyModels = models.filter(
    m => m.status === 'ready'
  );

  // Group by tier for display
  const fastModels = readyModels.filter(
    m => m.tier === 'fast'
  );
  const balancedModels = readyModels.filter(
    m => m.tier === 'balanced'
  );
  const thoroughModels = readyModels.filter(
    m => m.tier === 'thorough'
  );

  const tierSummary = [
    fastModels.length > 0 && {
      tier: 'fast',
      model: fastModels.find(m => m.isActive) 
        || fastModels[0],
    },
    balancedModels.length > 0 && {
      tier: 'balanced',
      model: balancedModels.find(m => m.isActive) 
        || balancedModels[0],
    },
    thoroughModels.length > 0 && {
      tier: 'thorough',
      model: thoroughModels.find(m => m.isActive) 
        || thoroughModels[0],
    },
  ].filter(Boolean) as { 
    tier: string; 
    model: typeof models[0];
  }[];

  const goToChat = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    setScreen('chat');
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col 
        bg-bg-primary pt-[59px] pb-[34px] 
        overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        x: '-100%', 
        transition: { 
          type: 'spring',
          stiffness: 300, 
          damping: 30 
        } 
      }}
    >
      {/* Step indicator — three dots */}
      <div className="flex justify-center 
        items-center gap-[6px] pt-3 pb-0 
        shrink-0">
        {(['brand', 'models', 'pc'] as 
          OnboardingStep[]).map(s => (
          <motion.div
            key={s}
            animate={{
              width: step === s ? 16 : 5,
              opacity: step === s ? 1 : 0.3,
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 28 
            }}
            className="h-[5px] rounded-full 
              bg-accent"
          />
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">

        {/* ── STEP 1: Brand ── */}
        {step === 'brand' && (
          <motion.div
            key="brand"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 28 
            }}
            className="flex-1 flex flex-col 
              items-center justify-center 
              px-6 gap-0"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.1, 
                duration: 0.6 
              }}
              className="mb-8"
            >
              <Glyph size={80} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="font-mono text-[11px] 
                uppercase tracking-[0.22em] 
                text-text-subtle mb-5"
            >
              local/ai
            </motion.div>

            <motion.h1
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.25, 
                duration: 0.5 
              }}
              className="font-mono text-[22px] 
                font-normal text-text-primary 
                tracking-[-0.02em] mb-3 
                text-center"
            >
              your ai. your device.
            </motion.h1>

            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.35, 
                duration: 0.4 
              }}
              className="font-sans text-[13px] 
                font-light text-text-secondary 
                text-center max-w-[260px] 
                leading-[1.7] mb-12"
            >
              AI that runs entirely on your 
              hardware. No accounts, no cloud, 
              no exceptions.
            </motion.p>

            {/* Three principles */}
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.45, 
                duration: 0.4 
              }}
              className="flex flex-col gap-[10px] 
                w-full max-w-[300px] mb-12"
            >
              {[
                { 
                  label: 'runs offline', 
                  sub: 'no internet required' 
                },
                { 
                  label: 'stays on device', 
                  sub: 'nothing leaves your hardware' 
                },
                { 
                  label: 'extends to your pc', 
                  sub: 'pair once for larger models' 
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.5 + i * 0.08, 
                    duration: 0.3 
                  }}
                  className="flex items-center 
                    gap-3"
                >
                  <div className="w-[4px] h-[4px] 
                    rounded-full bg-accent 
                    shrink-0" />
                  <span className="font-mono 
                    text-[11px] text-text-secondary">
                    {item.label}
                    <span className="text-text-subtle 
                      ml-2">
                      · {item.sub}
                    </span>
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep('models')}
              className="w-full max-w-[300px] 
                bg-bg-elevated text-accent 
                font-mono text-[12px] uppercase 
                tracking-[0.08em] 
                border border-[#2E2E2E] 
                rounded-[14px] p-[14px] 
                hover:border-accent-border 
                hover:bg-[#2A2A2A] 
                transition-colors outline-none 
                flex items-center 
                justify-center gap-2"
            >
              get started
              <ChevronRight 
                className="w-[13px] h-[13px]" 
              />
            </motion.button>
          </motion.div>
        )}

        {/* ── STEP 2: Models ── */}
        {step === 'models' && (
          <motion.div
            key="models"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 28 
            }}
            className="flex-1 flex flex-col 
              px-6 pt-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <div className="font-mono 
                text-[10px] uppercase 
                tracking-[0.16em] 
                text-text-subtle mb-2">
                what's on your device
              </div>
              <h2 className="font-mono 
                text-[20px] text-text-primary 
                tracking-[-0.01em] mb-2 
                leading-[1.3]">
                ready to use.
              </h2>
              <p className="font-sans text-[13px] 
                font-light text-text-secondary 
                leading-[1.7] mb-8 
                max-w-[280px]">
                these models are already on your 
                device. no download needed.
              </p>
            </motion.div>

            {/* Model tier cards */}
            <div className="flex flex-col gap-3 
              mb-6">
              {tierSummary.map((t, i) => (
                <motion.div
                  key={t.tier}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.15 + i * 0.08 
                  }}
                  className="bg-bg-surface 
                    border border-borders 
                    rounded-[12px] 
                    p-[14px_16px] 
                    flex items-center 
                    justify-between"
                >
                  <div className="flex flex-col 
                    gap-[4px]">
                    <div className="flex items-baseline 
                      gap-2">
                      <span className="font-mono 
                        text-[13px] 
                        text-text-primary">
                        {t.model.name}
                      </span>
                      <span className="font-mono 
                        text-[13px] 
                        text-text-subtle">
                        {t.model.variant}
                      </span>
                    </div>
                    <span className="font-mono 
                      text-[10px] 
                      text-text-subtle">
                      {t.model.sizeGB.toFixed(1)} GB
                    </span>
                  </div>
                  <div className="flex items-center 
                    gap-2">
                    <span className="font-mono 
                      text-[9px] uppercase 
                      tracking-[0.1em] 
                      text-text-subtle 
                      bg-bg-elevated 
                      border border-[#2A2A2A] 
                      rounded-[4px] 
                      px-[8px] py-[3px]">
                      {t.tier}
                    </span>
                    <div className="w-[6px] 
                      h-[6px] rounded-full 
                      bg-accent 
                      shadow-[0_0_6px_rgba(200,185,138,0.5)]" 
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-[10px] 
                text-text-subtle mb-auto 
                leading-[1.6]"
            >
              you can add or remove models 
              anytime from the menu.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep('pc')}
              className="w-full bg-bg-elevated 
                text-accent font-mono text-[12px] 
                uppercase tracking-[0.08em] 
                border border-[#2E2E2E] 
                rounded-[14px] p-[14px] mt-6 
                hover:border-accent-border 
                hover:bg-[#2A2A2A] 
                transition-colors outline-none 
                flex items-center 
                justify-center gap-2"
            >
              next
              <ChevronRight 
                className="w-[13px] h-[13px]" 
              />
            </motion.button>
          </motion.div>
        )}

        {/* ── STEP 3: PC pairing ── */}
        {step === 'pc' && (
          <motion.div
            key="pc"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 28 
            }}
            className="flex-1 flex flex-col 
              items-center px-6 pt-10"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.1, 
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              className="w-[72px] h-[72px] 
                rounded-[20px] 
                bg-[rgba(200,185,138,0.06)] 
                border border-[rgba(200,185,138,0.14)] 
                flex items-center 
                justify-center mb-8"
            >
              <Monitor className="w-[28px] 
                h-[28px] text-accent" 
                strokeWidth={1.5} 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-center mb-3"
            >
              <div className="font-mono text-[10px] 
                uppercase tracking-[0.16em] 
                text-text-subtle mb-2">
                optional
              </div>
              <h2 className="font-mono text-[20px] 
                text-text-primary 
                tracking-[-0.01em] mb-0 
                leading-[1.3]">
                have a pc nearby?
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="font-sans text-[13px] 
                font-light text-text-secondary 
                text-center leading-[1.75] 
                max-w-[260px] mb-10"
            >
              pair your pc once to unlock 
              larger models and faster 
              responses. your phone stays 
              the controller.
            </motion.p>

            {/* What you unlock */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full 
                bg-[rgba(200,185,138,0.04)] 
                border border-[rgba(200,185,138,0.10)] 
                rounded-[12px] 
                p-[14px_16px] mb-10 
                flex flex-col gap-[10px]"
            >
              {[
                'models up to 70B parameters',
                'faster inference on your hardware',
                'still fully private — local network only',
              ].map((line, i) => (
                <div key={i} className="flex 
                  items-start gap-3">
                  <div className="w-[4px] 
                    h-[4px] rounded-full 
                    bg-accent mt-[6px] 
                    shrink-0" />
                  <span className="font-mono 
                    text-[11px] 
                    text-text-secondary 
                    leading-[1.6]">
                    {line}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full flex flex-col 
                gap-3 mt-auto"
            >
              {/* Primary: pair now */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setScreen('chat');
                  setTimeout(() => 
                    setOverlay('qrOpen', true)
                  , 300);
                }}
                className="w-full 
                  bg-[rgba(200,185,138,0.10)] 
                  text-accent font-mono 
                  text-[12px] uppercase 
                  tracking-[0.08em] 
                  border border-accent-border 
                  rounded-[14px] p-[14px] 
                  hover:bg-[rgba(200,185,138,0.16)] 
                  transition-colors outline-none 
                  flex items-center 
                  justify-center gap-2"
              >
                <Monitor 
                  className="w-[13px] h-[13px]" 
                />
                pair my pc
              </motion.button>

              {/* Secondary: skip */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={goToChat}
                className="w-full 
                  text-text-subtle font-mono 
                  text-[12px] p-[10px] 
                  hover:text-text-secondary 
                  transition-colors outline-none"
              >
                skip for now
              </motion.button>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};

═══════════════════════════════════════════════════
FILE 4 — ChatScreen.tsx
═══════════════════════════════════════════════════

── UPDATE: lucide imports ────────────────────────

Find the import line:
  import { Menu, ChevronDown, Monitor, Copy, 
    RefreshCcw, Pin, Trash2, Edit2, Check, 
    X, Square } from 'lucide-react';

Change Square → ArrowUp.
Remove Square. Add ArrowUp.

Result:
  import { Menu, ChevronDown, Monitor, Copy, 
    RefreshCcw, Pin, Trash2, Edit2, Check, 
    X, ArrowUp, Square } from 'lucide-react';

Keep Square for the stop button.
Add ArrowUp for the send button.

── UPDATE: Send button ───────────────────────────

In InputArea, find the send button:

  <motion.button
    key="send"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    whileTap={{ scale: 0.9 }}
    onClick={handleSend}
    className="w-[34px] h-[34px] ml-2 
      shrink-0 rounded-full bg-text-primary 
      text-bg-primary flex items-center 
      justify-center hover:bg-accent 
      transition-colors"
  >
    <motion.div className="w-3.5 h-3.5 
      bg-current rounded-[2px] rotate-45 
      transform translate-y-[1px] 
      translate-x-[-1px]" />
  </motion.button>

Replace with:

  <motion.button
    key="send"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    whileTap={{ scale: 0.9 }}
    onClick={handleSend}
    className="w-[34px] h-[34px] ml-2 
      shrink-0 rounded-full bg-text-primary 
      flex items-center justify-center 
      hover:bg-accent transition-colors"
  >
    <ArrowUp 
      className="w-[15px] h-[15px] 
        text-bg-primary" 
      strokeWidth={2.5} 
    />
  </motion.button>

── UPDATE: Stop button ───────────────────────────

Find the stop button:

  <motion.button
    key="stop"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    whileTap={{ scale: 0.9 }}
    onClick={stopComputing}
    className="w-[34px] h-[34px] ml-2 
      shrink-0 rounded-[10px] bg-bg-elevated 
      border border-accent-border text-accent 
      flex items-center justify-center"
  >
    <Square className="w-3.5 h-3.5 
      fill-current" />
  </motion.button>

Replace with:

  <motion.button
    key="stop"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    whileTap={{ scale: 0.9 }}
    onClick={stopComputing}
    className="w-[34px] h-[34px] ml-2 
      shrink-0 rounded-full bg-bg-elevated 
      border border-accent-border 
      flex items-center justify-center"
  >
    <Square 
      className="w-[11px] h-[11px] 
        fill-accent text-accent" 
    />
  </motion.button>

Both buttons are now circles (rounded-full).
Send: white fill, ArrowUp icon in dark.
Stop: dark fill, amber border, 
      amber filled Square icon.
Visually distinct, formally consistent.

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

Glyph.tsx — unchanged.
OverlayManager.tsx — unchanged.
store.tsx aside from Screen type 
  and initial state — unchanged.
App.tsx aside from screen condition — unchanged.
All spring/animation values — unchanged.
All color tokens — unchanged.
QRPairingScreen — unchanged.
All existing chat functionality — unchanged.
