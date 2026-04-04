Multiple focused changes across store.tsx, 
ChatScreen.tsx, and OverlayManager.tsx.
Read every file in full before starting.
Touch only what is listed. Nothing else changes.

═══════════════════════════════════════════════════
CHANGE 1 — STORE: ADD switchToPhone + switchToPC
(store.tsx)
═══════════════════════════════════════════════════

Add two new actions to AppState interface:

  switchToPhone: () => void;
  switchToPC: () => void;

Implement both in AppStoreProvider:

  const switchToPhone = () => {
    if (!usePC) return; // already on phone
    setUsePCState(false);
    if (isComputing && computeSource === 'pc') {
      stopComputing();
    }
    setMessages(prev => [
      ...prev,
      {
        id: `system-${Date.now()}`,
        text: 'switched to on-device',
        sender: 'system',
        timestamp: Date.now(),
      }
    ]);
  };

  const switchToPC = () => {
    if (!activePC?.connected) return; // PC not available
    if (usePC) return; // already on PC
    setUsePCState(true);
    setMessages(prev => [
      ...prev,
      {
        id: `system-${Date.now()}`,
        text: `switched to ${activePC.name.toLowerCase()}`,
        sender: 'system',
        timestamp: Date.now(),
      }
    ]);
  };

Note: switchToPhone injects system message itself —
remove the existing system message injection from
the useEffect in ChatScreen that watches isPCSession.
That useEffect currently handles the disconnect
case (PC goes offline/unreachable involuntarily).
Keep that useEffect but change its message text to
distinguish involuntary disconnect from user choice:

  text: `${pcName || 'pc'} went offline · 
    using on-device`

This way:
  - User taps "use phone instead" → 
      "switched to on-device"
  - PC drops off network → 
      "macbook pro went offline · using on-device"

Add both to the context provider value:
  switchToPhone, switchToPC,

═══════════════════════════════════════════════════
CHANGE 2 — STORE: FIX handleSend compute routing
(ChatScreen.tsx — handleSend only)
═══════════════════════════════════════════════════

Find in handleSend:

  // Check for compute source
  const activePC = pcDevices.find(p => p.id === activePCId);
  if (activePC?.connected) {
    setComputeSource('pc');
  }

Replace with:

  if (isPCSession) {
    setComputeSource('pc');
  }

isPCSession is already destructured at the top
of ChatScreen. No other change to handleSend.

═══════════════════════════════════════════════════
CHANGE 3 — HEADER: RIGHT SLOT BECOMES 
COMPUTE SOURCE SWITCHER
(ChatScreen.tsx — Header component only)
═══════════════════════════════════════════════════

Add switchToPC to Header's useAppStore destructure.

The right slot currently has three branches:
  1. isPCSession → expanded pill (move to centre)
  2. !isPCSession && isPaired → dim monitor icon
  3. !isPCSession && !isPaired → empty div

Replace isPaired with more precise state:

  // A PC is "available" if it's paired, 
  // connected, but usePC is false —
  // user is on phone but PC is reachable
  const pcAvailable = pcDevices.some(
    pc => pc.connected
  ) && !usePC;

  // A PC is "known but offline" if paired 
  // but not connected (and not in session)
  const pcOffline = pcDevices.length > 0 
    && !pcDevices.some(pc => pc.connected) 
    && !isPCSession;

Replace the entire right slot AnimatePresence 
content with:

  <AnimatePresence mode="wait">

    {/* PC SESSION active: empty — pill in 
        centre is the focus */}
    {isPCSession && (
      <div key="session-empty" 
        className="w-10 h-10" />
    )}

    {/* PC available, user on phone:
        lit amber icon — tappable to switch */}
    {!isPCSession && pcAvailable && (
      <motion.button
        key="pc-available"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 28 
        }}
        onClick={switchToPC}
        className="absolute inset-0 flex 
          items-center justify-center 
          cursor-pointer group"
        title="switch to pc compute"
      >
        <div className="relative">
          <Monitor className="w-[15px] h-[15px] 
            text-accent 
            group-hover:opacity-80 
            transition-opacity" />
          <div className="absolute -top-[2px] 
            -right-[2px] w-[5px] h-[5px] 
            bg-accent rounded-full 
            shadow-[0_0_6px_rgba(200,185,138,0.6)]" 
          />
        </div>
      </motion.button>
    )}

    {/* PC known but offline: dim icon, 
        not interactive */}
    {!isPCSession && pcOffline && (
      <motion.div
        key="pc-offline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 flex 
          items-center justify-center"
      >
        <Monitor className="w-[15px] h-[15px] 
          text-text-subtle opacity-25" />
      </motion.div>
    )}

    {/* No PC paired: empty */}
    {!isPCSession && !pcAvailable && !pcOffline && (
      <div key="no-pc" className="w-10 h-10" />
    )}

  </AnimatePresence>

Note on opacity distinction:
  pcAvailable (online, not in use): 
    full amber Monitor + amber dot — clearly 
    interactive, invites tap
  pcOffline (known but unreachable): 
    opacity-25 grey Monitor — clearly passive,
    signals awareness not action

Also: clean up the unused openModeDropdown,
openPCDropdown, and togglePCDropdown helpers
if they are no longer called anywhere in Header.
Keep toggleModeDropdown (used by centre button).
Keep togglePCDropdown only if pill uses it —
the centre pill should call togglePCDropdown.

═══════════════════════════════════════════════════
CHANGE 4 — HEADER: CENTRE SLOT — PILL SHOWS 
PC NAME ONLY (no tier)
(ChatScreen.tsx — Header component, centre slot)
═══════════════════════════════════════════════════

The centre pill currently shows 
"{truncated name} · {pcMode}".

Change pill content to show PC name only.
Remove the tier suffix entirely.

Find the span inside the centre pill:

  <span className="font-mono text-[10px] 
    text-accent tracking-[0.02em] 
    max-w-[120px] overflow-hidden 
    text-ellipsis whitespace-nowrap">
    {(() => {
      const name = activePC?.name ?? 'your pc';
      const truncated = name.length > 10 
        ? name.slice(0, 10) + '…' 
        : name;
      return `${truncated} · ${pcMode}`;
    })()}
  </span>

Replace with:

  <span className="font-mono text-[10px] 
    text-accent tracking-[0.02em] 
    max-w-[120px] overflow-hidden 
    text-ellipsis whitespace-nowrap">
    {activePC?.name ?? 'your pc'}
  </span>

═══════════════════════════════════════════════════
CHANGE 5 — PC DROPDOWN: REPLACE DISCONNECT 
WITH "USE PHONE INSTEAD"
(OverlayManager.tsx — PCSessionDropdown only)
═══════════════════════════════════════════════════

Add switchToPhone to PCSessionDropdown's 
useAppStore destructure.

Find the entire disconnect row block:

  <div className="h-[1px] bg-[#1A1A1A]" />

  <div
    className={`flex items-center 
      justify-between p-[11px_16px] 
      transition-colors ${...}`}
    onClick={() => {
      if (isComputing) return;
      disconnectPC();
      setOverlay('pcDropdownOpen', false);
    }}
  >
    ... disconnect content ...
  </div>

Replace entirely with:

  <div className="h-[1px] bg-[#1A1A1A]" />

  <div
    className={`flex items-center 
      justify-between p-[11px_16px] 
      transition-colors
      ${isComputing 
        ? 'opacity-40 cursor-not-allowed' 
        : 'cursor-pointer hover:bg-bg-surface'
      }`}
    onClick={() => {
      if (isComputing) return;
      switchToPhone();
      setOverlay('pcDropdownOpen', false);
    }}
  >
    <div className="flex flex-col gap-[2px]">
      <span className={`font-mono text-[11px] 
        text-text-secondary tracking-[0.02em]
        ${isComputing ? 'opacity-40' : ''}`}>
        use phone instead
      </span>
      {isComputing && (
        <span className="font-mono text-[9px] 
          text-text-subtle">
          finish or stop first
        </span>
      )}
    </div>
    <svg width="12" height="12" 
      viewBox="0 0 12 12" fill="none">
      <rect x="1.5" y="3.5" width="5" height="6" 
        rx="1" stroke="#9A9690" strokeWidth="1.2"/>
      <path d="M8 5.5L10.5 6L8 6.5" 
        stroke="#9A9690" strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"/>
      <path d="M10.5 6H6.5" 
        stroke="#9A9690" strokeWidth="1.2" 
        strokeLinecap="round"/>
    </svg>
  </div>

The SVG is a phone/exit icon — box with arrow 
pointing right. Neutral grey, not red.
"Use phone instead" is a preference switch, 
not a destructive action — no red colour.

Also: remove disconnectPC from 
PCSessionDropdown's useAppStore destructure
since it's no longer used here.

═══════════════════════════════════════════════════
CHANGE 6 — USEEFFECT: UPDATE DISCONNECT 
MESSAGE TEXT
(ChatScreen.tsx — the isPCSession useEffect)
═══════════════════════════════════════════════════

Find in ChatScreen the useEffect watching isPCSession:

  text: `${pcName || 'pc'} disconnected · 
    switching to on-device`,

Change to:

  text: `${pcName || 'pc'} went offline · 
    using on-device`,

This fires only when isPCSession drops due to
PC becoming unreachable (involuntary).
The voluntary "use phone instead" path now
shows "switched to on-device" via switchToPhone().

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

disconnectPC() in store — keep it, 
  it's still used by Settings unpair flow.
Settings screen — unchanged.
SlideMenu usePC toggle — unchanged 
  (secondary control, still valid).
QRPairingScreen — unchanged.
PCSessionDropdown tier rows — unchanged.
PCSessionDropdown header row — unchanged.
PCSessionDropdown "mirrored" footer — unchanged.
ModeDropdown — unchanged.
ModelsScreen — unchanged.
All popover logic — unchanged.
MessageBubble — unchanged.
InputArea — unchanged.
WelcomeScreen — unchanged.
All spring/animation values — unchanged.
All color tokens — unchanged.

Files that change:
  store.tsx — switchToPhone, switchToPC added
  ChatScreen.tsx — handleSend fix, Header right 
    slot, centre pill content, useEffect text
  OverlayManager.tsx — PCSessionDropdown 
    disconnect → use phone instead