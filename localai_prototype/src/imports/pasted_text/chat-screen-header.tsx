Targeted fixes only. Read the full existing code 
before changing anything. Touch only what is 
explicitly listed below. Do not change any 
component, style, animation, or behaviour 
not mentioned in this prompt.

═══════════════════════════════════════════════════
FIX 1 — HEADER: PC SESSION PILL + MODE SELECTOR
(ChatScreen.tsx — Header component only)
═══════════════════════════════════════════════════

Replace the entire Header component with this:

const Header = () => {
  const { 
    mode, pcMode, overlays, setOverlay, 
    isComputing, isPCSession, activePC, usePC,
    pcDevices
  } = useAppStore();

  const isPaired = pcDevices.length > 0 && usePC;

  // Mutual exclusion helpers
  const openModeDropdown = () => {
    setOverlay('pcDropdownOpen', false);
    setOverlay('modeDropdownOpen', true);
  };
  const openPCDropdown = () => {
    setOverlay('modeDropdownOpen', false);
    setOverlay('pcDropdownOpen', true);
  };
  const toggleModeDropdown = () => {
    setOverlay('pcDropdownOpen', false);
    setOverlay('modeDropdownOpen', 
      !overlays.modeDropdownOpen);
  };
  const togglePCDropdown = () => {
    setOverlay('modeDropdownOpen', false);
    setOverlay('pcDropdownOpen', 
      !overlays.pcDropdownOpen);
  };

  return (
    <div className="h-[60px] border-b 
      border-[rgba(255,255,255,0.04)] 
      flex items-center justify-between 
      px-4 shrink-0 bg-bg-primary">

      {/* Left — hamburger */}
      <button 
        className="w-10 h-10 flex flex-col 
          justify-center gap-[4px] items-start"
        onClick={() => setOverlay('menuOpen', true)}
      >
        <div className="h-[1.5px] bg-text-secondary 
          w-[18px] rounded-full" />
        <div className="h-[1.5px] bg-text-secondary 
          w-[12px] rounded-full" />
        <div className="h-[1.5px] bg-text-secondary 
          w-[15px] rounded-full" />
      </button>

      {/* Centre — mode selector, context-aware */}
      <button 
        className="flex flex-col items-center"
        onClick={isPCSession 
          ? togglePCDropdown 
          : toggleModeDropdown}
      >
        <div className="flex items-center gap-1 
          font-mono text-[13px] font-medium 
          text-text-primary">
          {isPCSession ? pcMode : mode}
          <ChevronDown className="w-3.5 h-3.5 
            text-text-subtle" />
        </div>
      </button>

      {/* Right — PC pill or monitor icon */}
      <div className="flex items-center 
        justify-end w-10 h-10 relative">
        <AnimatePresence mode="wait">

          {/* PC SESSION: expanded pill */}
          {isPCSession && (
            <motion.button
              key="pc-pill"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 28 
              }}
              onClick={togglePCDropdown}
              className="flex items-center gap-[5px] 
                bg-[rgba(200,185,138,0.08)] 
                border border-[rgba(200,185,138,0.18)]
                rounded-full 
                px-[10px] h-[30px]
                cursor-pointer
                whitespace-nowrap"
            >
              {/* Pulse dot — only when computing */}
              <AnimatePresence>
                {isComputing && (
                  <motion.div
                    key="pulse-dot"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="w-[4px] h-[4px] 
                      bg-accent rounded-full 
                      shrink-0"
                    style={{
                      animation: isComputing 
                        ? 'pulse 1.2s ease-in-out 
                           infinite' 
                        : 'none'
                    }}
                  />
                )}
              </AnimatePresence>

              <Monitor className="w-[11px] h-[11px] 
                text-accent shrink-0" />

              <span className="font-mono 
                text-[10px] text-accent 
                tracking-[0.02em]
                max-w-[72px] overflow-hidden 
                text-ellipsis">
                {activePC?.name ?? 'your pc'}
              </span>

              <ChevronDown className="w-[9px] 
                h-[9px] text-accent opacity-50 
                shrink-0" />
            </motion.button>
          )}

          {/* PAIRED BUT NOT SESSION: dim icon */}
          {!isPCSession && isPaired && (
            <motion.div
              key="pc-icon-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 
                flex items-center justify-center"
            >
              <Monitor className="w-[15px] h-[15px] 
                text-text-subtle opacity-40" />
            </motion.div>
          )}

          {/* NO PC: empty slot */}
          {!isPCSession && !isPaired && (
            <div key="empty" className="w-10 h-10" />
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

Add this keyframe to index.css or as a 
<style> tag inside the component:

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
}

═══════════════════════════════════════════════════
FIX 2 — PC DISCONNECT SYSTEM MESSAGE
(ChatScreen.tsx — ChatScreen component)
═══════════════════════════════════════════════════

Add to ChatScreen component, after existing 
state declarations and before the return:

const { isPCSession, activePC, setMessages, 
  messages } = useAppStore();

// Track previous isPCSession value
const prevIsPCSessionRef = useRef<boolean>(
  isPCSession
);
const prevActivePCNameRef = useRef<string>(
  activePC?.name ?? ''
);

useEffect(() => {
  const wasPC = prevIsPCSessionRef.current;
  const pcName = prevActivePCNameRef.current;
  
  // PC session just ended (was true, now false)
  if (wasPC && !isPCSession && messages.length > 0) {
    setMessages(prev => [
      ...prev,
      {
        id: `system-disconnect-${Date.now()}`,
        text: `${pcName || 'pc'} disconnected · 
          switching to on-device`,
        sender: 'system',
        timestamp: Date.now(),
      }
    ]);
  }
  
  // Update refs for next render
  prevIsPCSessionRef.current = isPCSession;
  if (activePC?.name) {
    prevActivePCNameRef.current = activePC.name;
  }
}, [isPCSession]);

Note: isPCSession and activePC need to be 
destructured from useAppStore() at the top 
of ChatScreen. They are already available 
in the store — just add them to the 
destructuring on the existing useAppStore() 
call in ChatScreen.

═══════════════════════════════════════════════════
FIX 3 — SYSTEM MESSAGE MARGIN
(ChatScreen.tsx — message render loop)
═══════════════════════════════════════════════════

In the messages.map() render loop, find:

  const sameSender = prev?.sender === msg.sender;
  return (
    <div 
      key={msg.id} 
      style={{ marginTop: i === 0 ? 0 
        : sameSender ? 16 : 28 }}
    >

Replace with:

  // System messages always get fixed margin,
  // never collapse with adjacent messages
  const isSystemMsg = msg.sender === 'system';
  const prevIsSystem = prev?.sender === 'system';
  const sameSender = !isSystemMsg 
    && !prevIsSystem 
    && prev?.sender === msg.sender;

  const marginTop = i === 0 
    ? 0 
    : isSystemMsg || prevIsSystem
      ? 20
      : sameSender ? 16 : 28;

  return (
    <div 
      key={msg.id} 
      style={{ marginTop }}
    >

═══════════════════════════════════════════════════
FIX 4 — DISCOVER POPOVER: FIXED POSITION
(OverlayManager.tsx — ModelsScreen component)
═══════════════════════════════════════════════════

The current single AnimatePresence block that 
renders the fixed popover does:
  const model = models.find(m => m.id === openMenuId)

This returns null for discover card IDs 
(e.g. "discover-mistral-7b") because discover 
models are not in the models array.
So the Discover popover never renders.

Fix: add a second AnimatePresence block 
specifically for Discover popovers, placed 
directly after the existing model-row popover 
AnimatePresence block (before the toast block).

Add this state to ModelsScreen:
  const [discoverMenuId, setDiscoverMenuId] = 
    useState<string | null>(null);
  const [discoverMenuAnchor, setDiscoverMenuAnchor] = 
    useState<{ x: number; y: number } | null>(null);

Update the Discover card three-dot button 
onClick to use these new state vars:

  onClick={(e) => {
    e.stopPropagation();
    const rect = e.currentTarget
      .getBoundingClientRect();
    const targetId = dm.id;
    if (discoverMenuId === targetId) {
      setDiscoverMenuId(null);
      setDiscoverMenuAnchor(null);
    } else {
      setDiscoverMenuId(targetId);
      setDiscoverMenuAnchor({
        x: rect.right,
        y: rect.bottom + 4,
      });
    }
  }}

Remove the old targetId / openMenuId logic 
from the Discover three-dot button entirely.

Add the fixed popover AnimatePresence block:

<AnimatePresence>
  {discoverMenuId && discoverMenuAnchor && (() => {
    const dm = discoverModels.find(
      d => d.id === discoverMenuId
    );
    if (!dm) return null;

    return (
      <motion.div
        key={discoverMenuId}
        className="fixed inset-0 z-[60]"
        onClick={() => {
          setDiscoverMenuId(null);
          setDiscoverMenuAnchor(null);
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, 
            y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -6 }}
          transition={{ duration: 0.15 }}
          style={{
            position: 'fixed',
            top: discoverMenuAnchor.y,
            right: window.innerWidth 
              - discoverMenuAnchor.x,
          }}
          className="bg-[#1A1A1A] border 
            border-[#2A2A2A] rounded-[12px] 
            shadow-[0_4px_24px_rgba(0,0,0,0.6)]
            min-w-[164px] z-[61] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Info row — installed state */}
          <div className="flex items-center gap-3 
            px-4 py-3 cursor-default">
            <Check className="w-[13px] h-[13px] 
              text-text-subtle" />
            <span className="font-mono text-[12px] 
              text-text-subtle">
              installed
            </span>
          </div>

          <div className="h-[1px] bg-[#222]" />

          {/* Remove action */}
          <div
            className="flex items-center gap-3 
              px-4 py-3 cursor-pointer 
              hover:bg-[#222] transition-colors"
            onClick={() => {
              setModels(prev => {
                const updated = prev.filter(m => 
                  !(m.name === dm.name 
                    && m.variant === dm.variant)
                );
                const tierOk = updated.some(m => 
                  m.tier === mode 
                  && m.status === 'ready'
                );
                if (!tierOk) {
                  const fallback = [
                    'fast', 'balanced', 'thorough'
                  ].find(t => updated.some(m => 
                    m.tier === t 
                    && m.status === 'ready'
                  ));
                  if (fallback) 
                    setMode(fallback as Mode);
                }
                return updated;
              });
              showToast(
                `${dm.name} ${dm.variant} removed`
              );
              setDiscoverMenuId(null);
              setDiscoverMenuAnchor(null);
            }}
          >
            <Trash2 className="w-[13px] h-[13px] 
              text-[#FF5555]" />
            <span className="font-mono text-[12px] 
              text-[#FF5555]">
              remove from device
            </span>
          </div>
        </motion.div>
      </motion.div>
    );
  })()}
</AnimatePresence>

Also: close the discover popover when the 
screen-level onClick fires (the existing 
onClick={() => setOpenMenuId(null)} on the 
ModelsScreen motion.div).

Change that onClick to:
  onClick={() => {
    setOpenMenuId(null);
    setMenuAnchor(null);
    setDiscoverMenuId(null);
    setDiscoverMenuAnchor(null);
  }}

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

Everything not listed above.

PCSessionDropdown component — unchanged.
ModeDropdown component — unchanged.
SlideMenu — unchanged.
QRPairingScreen — unchanged.
ModelsScreen tier sections — unchanged.
Model row three-dot popover — unchanged.
All store logic — unchanged.
All spring values — unchanged.
All color tokens — unchanged.
MessageBubble — unchanged.
InputArea — unchanged.
WelcomeScreen — unchanged.
Glyph — unchanged.

The only files that change are:
  ChatScreen.tsx — Header component, 
    ChatScreen component (useEffect + 
    destructuring + margin fix)
  OverlayManager.tsx — ModelsScreen component 
    only (discover popover state + render block 
    + screen onClick update)