This is a continuation of the LocalAI prototype. 
Do not change anything not explicitly mentioned below.
Preserve all existing springs, color tokens, 
typography, and component behaviour.

Read the full existing code before making any changes.

═══════════════════════════════════════════════════
SECTION 1 — STORE ADDITIONS
═══════════════════════════════════════════════════

Add to store.tsx:

── PC MODEL TYPE ─────────────────────────────────

type PCModel = {
  id: string;
  name: string;        // "Llama 3.1"
  variant: string;     // "70B"
  sizeGB: number;
  tier: 'fast' | 'balanced' | 'thorough';
  isActive: boolean;   // active for its tier on PC
};

── ADD TO PCDevice TYPE ──────────────────────────

Add to the existing PCDevice type:
  models: PCModel[];   // models installed on this PC

── PC SEED DATA ──────────────────────────────────

When a PC is added via QR pairing, give it 
these default models (the whole point — 
PC runs models the phone cannot):

models: [
  { id: 'pc-llama32-3b', name: 'Llama 3.2', 
    variant: '3B', sizeGB: 1.8, 
    tier: 'fast', isActive: true },
  { id: 'pc-mistral-7b', name: 'Mistral', 
    variant: '7B', sizeGB: 4.1, 
    tier: 'balanced', isActive: true },
  { id: 'pc-llama31-70b', name: 'Llama 3.1', 
    variant: '70B', sizeGB: 39.0, 
    tier: 'thorough', isActive: true },
]

These are the models the PC is running.
The 70B model is the key one — phone can never 
run it, but through PC the user gets access.

── ADD TO AppState ───────────────────────────────

pcMode: Mode;  
// Which tier the user has selected for PC session.
// Independent of the phone's `mode`.
// Defaults to 'balanced'.

setPCMode: (m: Mode) => void;

pcDropdownOpen: boolean;
// Add to OverlayState

── ADD TO STORE LOGIC ────────────────────────────

isPCSession: boolean;
// Computed: pcDevices.some(pc => 
//   pc.id === activePCId && pc.connected) && usePC
// When true, user is talking to the PC AI.
// Derive this from existing state, don't store it.
// Expose as a getter in the context value:
//   isPCSession: pcDevices.some(pc => 
//     pc.id === activePCId && pc.connected) && usePC

── ACTIVE PC HELPER ──────────────────────────────

Expose activePC from store:
  activePC: pcDevices.find(
    pc => pc.id === activePCId
  ) ?? null

═══════════════════════════════════════════════════
SECTION 2 — HEADER REDESIGN (ChatScreen.tsx)
═══════════════════════════════════════════════════

The Header component needs a full rethink.
Two states: phone session and PC session.

── STATE 1: PHONE SESSION (isPCSession = false) ──

Header is exactly as it is now:
  Left: hamburger menu button
  Centre: mode selector (phone mode, chevron)
  Right: dim monitor icon if PC paired + usePC on,
         nothing if no PC paired

No changes to this state.

── STATE 2: PC SESSION (isPCSession = true) ──────

The header transforms. The right side expands 
into a pill. The centre mode selector adapts.

RIGHT SIDE — PC Session Pill:

Replace the 40px monitor icon slot with 
an animated pill that expands from the right:

  <motion.button
    initial={{ width: 40, opacity: 0.4 }}
    animate={{ width: 'auto', opacity: 1 }}
    transition={{ type: 'spring', stiffness: 300, 
      damping: 28 }}
    className="flex items-center gap-[6px] 
      bg-[rgba(200,185,138,0.08)] 
      border border-[rgba(200,185,138,0.18)]
      rounded-full px-[10px] h-[32px]
      cursor-pointer"
    onClick={() => setOverlay('pcDropdownOpen', 
      !overlays.pcDropdownOpen)}
  >
    <Monitor className="w-[12px] h-[12px] 
      text-accent shrink-0" />
    <span className="font-mono text-[10px] 
      text-accent tracking-[0.03em] 
      whitespace-nowrap max-w-[80px] 
      overflow-hidden text-ellipsis">
      {activePC?.name ?? 'your pc'}
    </span>
    <ChevronDown className="w-[10px] h-[10px] 
      text-accent opacity-60 shrink-0" />
  </motion.button>

The pill sits flush right, replacing the 
monitor icon entirely during PC session.

CENTRE — Mode selector during PC session:

Change the centre button label to show 
pcMode instead of mode:

  onClick: opens pcDropdownOpen instead of 
  modeDropdownOpen

  Display: pcMode + ChevronDown
  Same visual treatment as before, but 
  it now controls PC tier selection.

  This makes the centre button always show 
  the active conversation's tier — phone mode 
  when on phone, PC mode when on PC.

  When isPCSession is false: behaviour unchanged,
  opens modeDropdownOpen, shows `mode`.

IMPORTANT — mutual exclusion:
  Opening pcDropdownOpen must close modeDropdownOpen.
  Opening modeDropdownOpen must close pcDropdownOpen.
  Both close on outside tap.

═══════════════════════════════════════════════════
SECTION 3 — PC SESSION DROPDOWN (OverlayManager)
═══════════════════════════════════════════════════

New component: PCSessionDropdown

Add to OverlayManager AnimatePresence block:
  {overlays.pcDropdownOpen && 
    <PCSessionDropdown key="pc-session-dropdown" />}

Position: same as ModeDropdown — 
  absolute top-[68px], but anchored RIGHT:
  right-[16px] (not centred)
  width: 260px

Animation: same scale + opacity as ModeDropdown.

── DROPDOWN HEADER ───────────────────────────────

  <div className="p-[12px_16px] border-b 
    border-borders flex items-center 
    justify-between">
    
    Left:
      Monitor icon w-[13px] text-accent mr-2
      PC name: font-mono 12px text-text-primary
    
    Right:
      Connected dot: w-[5px] h-[5px] bg-accent 
        rounded-full 
        shadow-[0_0_6px_rgba(200,185,138,0.5)]
      "online" font-mono 9px text-accent ml-2
  </div>

── PC TIER ROWS ──────────────────────────────────

Show the PC's models grouped by tier.
Use activePC.models to build the list.

const pcTiers = ['fast', 'balanced', 'thorough'];

For each tier:
  Find models in activePC.models for that tier.
  Find the active one (isActive: true).

Row layout — same as phone ModeDropdown rows:
  Left: tier letter badge [F/B/T]
    Active tier: bg-accent-dim text-accent 
      border-accent-border
    Inactive: bg-bg-elevated text-text-subtle 
      border-[#2A2A2A]
  
  Centre col:
    Top: tier name font-mono 12px
    Bottom: model name + variant 
      font-sans 11px font-light text-text-subtle
      e.g. "llama 3.1 70B"
  
  Right: amber dot if this is pcMode

Tap behaviour:
  If isComputing: row is non-interactive.
    Show "computing..." at 9px text-subtle 
    on the active row right side instead of dot.
    Other rows: opacity-40.
  
  If not computing:
    setPCMode(tier)
    setOverlay('pcDropdownOpen', false)
    If messages.length > 0: inject system message:
      "switched to {tier} on macbook pro"

── EMPTY STATE ───────────────────────────────────

If activePC has no models (shouldn't happen 
with seed data, but handle it):
  
  Centred text in the dropdown body:
  font-mono 11px text-text-subtle
  "no models on {activePC.name}"
  
  Below: font-mono 10px text-accent
  "set up models on your pc to get started"

── DROPDOWN FOOTER ───────────────────────────────

  <div className="h-[1px] bg-[#1E1E1E]" />
  
  <div className="p-[10px_16px] bg-[#0D0D0D] 
    border-t border-[#1A1A1A] flex items-center 
    gap-2">
    <div className="w-[4px] h-[4px] 
      bg-[#2A2A2A] rounded-full" />
    <span className="font-mono text-[9px] 
      text-text-subtle">
      conversation is mirrored on both devices
    </span>
  </div>

This footer replaces "models run offline" 
for the PC dropdown — different truth when 
talking to PC AI. Language reinforces the 
"window to PC" mental model.

═══════════════════════════════════════════════════
SECTION 4 — PC DISCONNECT HANDLING
═══════════════════════════════════════════════════

Add to store: 
  disconnectPC: () => void
  
  Logic:
    Find the active PC, set connected: false.
    If isComputing: call stopComputing().
    setComputeSource('phone').
    // isPCSession will become false automatically
    // since connected is now false.

Simulate disconnect in prototype:
In the SlideMenu PC section, add a long-press 
(800ms) on any connected PC row that calls 
disconnectPC(). Show a brief visual feedback 
(row flashes red briefly) before disconnecting.

This lets reviewers demo the disconnect flow.

When isPCSession flips from true to false 
mid-conversation (because PC disconnected):

Inject a system message automatically:
  "{pc.name} disconnected · switching to 
   on-device"

Toast simultaneously (slides from top, 3s):
  Same amber toast style.
  "{pc.name} disconnected"

The pill in the header collapses back to 
the dim monitor icon via AnimatePresence.
Centre mode selector reverts to showing 
`mode` (phone mode) and opening modeDropdownOpen.

Use a useEffect in ChatScreen watching isPCSession:
  useEffect(() => {
    if (!isPCSession && prevIsPCSession) {
      // PC session just ended
      // Inject disconnect system message
      // if there are messages in the thread
    }
  }, [isPCSession]);

Track prevIsPCSession with a useRef.

═══════════════════════════════════════════════════
SECTION 5 — MODELS SCREEN BANNER
═══════════════════════════════════════════════════

When isPCSession is true and the user opens 
the Models screen (phone models), show a 
contextual banner at the very top of the 
scrollable content, above the first tier section:

  <div className="mx-0 mb-4 mt-2 
    bg-[rgba(200,185,138,0.06)] 
    border border-[rgba(200,185,138,0.14)] 
    rounded-[12px] p-[12px_14px]
    flex items-start gap-3">
    
    <Monitor className="w-[13px] h-[13px] 
      text-accent mt-[1px] shrink-0" />
    
    <span className="font-mono text-[10px] 
      text-text-subtle leading-[1.6]">
      {activePC?.name ?? 'your pc'} is handling 
      compute · these are your on-device models 
      for when it's offline
    </span>
  </div>

Only show when isPCSession === true.
No banner in phone session.

═══════════════════════════════════════════════════
SECTION 6 — POPOVER CLIPPING FIX (OverlayManager)
═══════════════════════════════════════════════════

The three-dot popover on installed model rows 
is clipped by the tier card's overflow-hidden.

Fix: use fixed positioning anchored to 
button screen coordinates.

Add to ModelsScreen state:
  const [menuAnchor, setMenuAnchor] = useState
    { x: number; y: number } | null
  >(null);

On three-dot button click, replace current 
openMenuId logic with:

  onClick={(e) => {
    e.stopPropagation();
    const rect = e.currentTarget
      .getBoundingClientRect();
    if (openMenuId === model.id) {
      setOpenMenuId(null);
      setMenuAnchor(null);
    } else {
      setOpenMenuId(model.id);
      setMenuAnchor({ 
        x: rect.right, 
        y: rect.bottom + 4 
      });
    }
  }}

Render the popover as a FIXED position element 
outside the card hierarchy entirely.

Move the popover OUT of the motion.div row.
Render it inside ModelsScreen but AFTER the 
tier sections list, inside an AnimatePresence:

  <AnimatePresence>
    {openMenuId && menuAnchor && (() => {
      const model = models.find(
        m => m.id === openMenuId
      );
      if (!model) return null;
      const tier = tiers.find(
        t => t.id === model.tier
      );
      const isReady = model.status === 'ready';
      const isInsufficient = 
        model.status === 'insufficient_memory';
      
      return (
        <>
          {/* Transparent overlay to catch 
              outside clicks */}
          <div 
            className="fixed inset-0 z-[60]"
            onClick={() => {
              setOpenMenuId(null);
              setMenuAnchor(null);
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, 
              scale: 0.95, y: -6 }}
            animate={{ opacity: 1, 
              scale: 1, y: 0 }}
            exit={{ opacity: 0, 
              scale: 0.95, y: -6 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: menuAnchor.y,
              right: window.innerWidth 
                - menuAnchor.x,
            }}
            className="bg-[#1A1A1A] border 
              border-[#2A2A2A] rounded-[12px] 
              shadow-[0_4px_24px_rgba(0,0,0,0.6)] 
              min-w-[164px] z-[61] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Context-sensitive rows */}
            {model.isActive && (
              <div className="flex items-center 
                gap-3 px-4 py-3 cursor-default">
                <div className="w-[5px] h-[5px] 
                  bg-accent rounded-full 
                  shadow-[0_0_8px_rgba(200,185,138,
                  0.5)]" />
                <span className="font-mono 
                  text-[12px] text-text-primary">
                  active for {tier?.name}
                </span>
              </div>
            )}
            
            {!model.isActive && isReady && (
              <div 
                className="flex items-center 
                  gap-3 px-4 py-3 cursor-pointer 
                  hover:bg-[#222] transition-colors"
                onClick={() => {
                  setModelActive(model.id);
                  showToast(`${tier?.name} · 
                    ${model.name} ${model.variant}`);
                  setOpenMenuId(null);
                  setMenuAnchor(null);
                }}
              >
                <Check className="w-[13px] 
                  h-[13px] text-text-primary" />
                <span className="font-mono 
                  text-[12px] text-text-primary">
                  set as active
                </span>
              </div>
            )}
            
            {isInsufficient && (
              <div 
                className="flex items-center 
                  gap-3 px-4 py-3 cursor-pointer 
                  hover:bg-[#222] transition-colors"
                onClick={() => {
                  setOpenMenuId(null);
                  setMenuAnchor(null);
                  setAboutModelId(model.id);
                }}
              >
                <Info className="w-[13px] 
                  h-[13px] text-text-primary" />
                <span className="font-mono 
                  text-[12px] text-text-primary">
                  about this model
                </span>
              </div>
            )}
            
            <div className="h-[1px] bg-[#222]" />
            
            <div 
              className="flex items-center gap-3 
                px-4 py-3 cursor-pointer 
                hover:bg-[#222] transition-colors"
              onClick={() => {
                setModels(prev => {
                  const updated = prev.filter(
                    m => m.id !== model.id
                  );
                  const tierOk = updated.some(
                    m => m.tier === mode 
                      && m.status === 'ready'
                  );
                  if (!tierOk) {
                    const fallback = [
                      'fast','balanced','thorough'
                    ].find(t => updated.some(
                      m => m.tier === t 
                        && m.status === 'ready'
                    ));
                    if (fallback) 
                      setMode(fallback as Mode);
                  }
                  return updated;
                });
                showToast(
                  `${model.name} ${model.variant} 
                  removed`
                );
                setOpenMenuId(null);
                setMenuAnchor(null);
              }}
            >
              <Trash2 className="w-[13px] 
                h-[13px] text-[#FF5555]" />
              <span className="font-mono 
                text-[12px] text-[#FF5555]">
                remove from device
              </span>
            </div>
          </motion.div>
        </>
      );
    })()}
  </AnimatePresence>

Apply the SAME fixed-position pattern to the 
Discover section three-dot popovers.
They have the same clipping risk since they're 
inside overflow-hidden card containers.

═══════════════════════════════════════════════════
SECTION 7 — MINOR FIXES (from previous audit)
═══════════════════════════════════════════════════

─── FIX 1: usePC toggle mid-compute ────────────────

In store.tsx, modify setUsePC:

  setUsePC: (v: boolean) => {
    setUsePCState(v);
    if (!v && isComputing 
      && computeSource === 'pc') {
      stopComputing();
      setComputeSource('phone');
    }
  }

─── FIX 2: System message double margin ────────────

In ChatScreen message render loop:
  System messages should not receive the 
  same marginTop logic as user/local messages.
  
  Change:
    const sameSender = prev?.sender === msg.sender;
  
  To:
    const sameSender = prev?.sender === msg.sender
      && msg.sender !== 'system'
      && prev?.sender !== 'system';
  
  System messages always get marginTop: 20 
  regardless of adjacent sender.
  Add a special case:
    if (msg.sender === 'system') 
      return { marginTop: 20 };

─── FIX 3: "conversation mode" label in dropdown ───

In ModeDropdown, remove the header row:

  <div className="p-[10px_16px] border-b 
    border-borders font-mono text-[9px] 
    uppercase tracking-[0.1em] text-text-subtle">
    conversation mode
  </div>

Delete this entire div. The modes are 
self-explanatory. This label is redundant.

═══════════════════════════════════════════════════
SECTION 8 — PROTOTYPE DEMO FLOW
═══════════════════════════════════════════════════

To make the PC session demoable without 
actually being on a network:

In QRPairingScreen 'done' step, the PC is 
now added with connected: true and the 
seed model list above. This already works.

Add a demo trigger in the chat:
When the user sends any message AND 
isPCSession is true AND computeSource is 
still 'phone', set computeSource to 'pc' 
immediately in handleSend.

This ensures the header pill appears and 
the computing dots show as PC-sourced 
on every message when PC is paired.

The pill should appear as soon as 
isPCSession becomes true (PC paired 
and usePC on), not only during computation.
The pill is a presence indicator, not 
a computation indicator.

Adjust Header logic:
  Show pill when isPCSession === true 
  regardless of isComputing.
  
  Dim dot indicator on pill when idle:
    No dot when not computing.
  
  Pulsing dot on pill when computing:
    Small animated dot to the left of 
    the Monitor icon inside the pill,
    w-[4px] h-[4px] bg-accent rounded-full
    animate pulse scale 1→1.4→1 
    duration 1.2s repeat infinite

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

WelcomeScreen
All existing spring values
All color tokens
ChatScreen message bubble styles
Input area styles and animations
Glyph component
All existing overlay animations
QR pairing flow steps
Settings screen (except if pcDevices 
needs the new models field — update 
display only, no structural change)
SlideMenu PC section toggle behaviour
Long-press disconnect sim (new in this 
build, preserve after implementing)