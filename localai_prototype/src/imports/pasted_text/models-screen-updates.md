Fix all bugs, implement UX improvements, and add PC 
multi-device management. Do not change WelcomeScreen 
or ChatScreen except where explicitly noted below.

═══════════════════════════════════════════════════
SECTION 1 — BUG FIXES
═══════════════════════════════════════════════════

─── BUG 1: Download interval memory leak ───────────

In ModelsScreen, refactor handleDownload to use 
useRef for the interval so it can be cleaned up.

Add at top of ModelsScreen:
  const downloadIntervals = useRef<Map<string, 
    ReturnType<typeof setInterval>>>(new Map());

On unmount, clear all running intervals:
  useEffect(() => {
    return () => {
      downloadIntervals.current.forEach(
        interval => clearInterval(interval)
      );
    };
  }, []);

─── BUG 2: Simultaneous downloads ──────────────────

Replace single downloadingId + downloadProgress 
state with:
  const [downloadingMap, setDownloadingMap] = 
    useState<Map<string, number>>(new Map());

All references to isDownloading per card become:
  const isDownloading = downloadingMap.has(dm.id);
  const downloadProgress = 
    downloadingMap.get(dm.id) ?? 0;

handleDownload updates the map per model ID:
  setDownloadingMap(prev => {
    const next = new Map(prev);
    next.set(dm.id, progress);
    return next;
  });

On complete, delete from map:
  setDownloadingMap(prev => {
    const next = new Map(prev);
    next.delete(dm.id);
    return next;
  });

─── BUG 3: Mode not reset after model removed ──────

In ModelsScreen, after removing a model from store:
  setModels(prev => {
    const updated = prev.filter(
      x => x.id !== longPressId
    );
    // Check if current mode's tier is now empty
    const tierStillHasModel = updated.some(
      m => m.tier === mode && m.status === 'ready'
    );
    if (!tierStillHasModel) {
      // Find first tier with a ready model
      const fallback = 
        ['fast', 'balanced', 'thorough'].find(t =>
          updated.some(
            m => m.tier === t && m.status === 'ready'
          )
        );
      if (fallback) setMode(fallback as Mode);
    }
    return updated;
  });

Same logic must apply when removing via three-dot 
menu (see Section 2) and from Discover section.

─── BUG 4: Empty edit saves ────────────────────────

In MessageBubble edit mode, disable the confirm 
button when editVal.trim().length === 0:
  className={`w-[28px] h-[28px] rounded-full ... 
    ${editVal.trim().length === 0 
      ? 'opacity-30 cursor-not-allowed pointer-events-none' 
      : 'hover:bg-accent hover:text-bg-primary'}`}

─── BUG 5: Scroll pill misleading label ────────────

In ChatScreen, add:
  const [hasNewMessage, setHasNewMessage] = 
    useState(false);

When a message is added (in handleSend, after 
setMessages for the AI response):
  const isNearBottom = () => {
    if (!scrollRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } 
      = scrollRef.current;
    return scrollHeight - scrollTop - clientHeight 
      < 100;
  };

In the AI response setTimeout, before setMessages:
  if (!isNearBottom()) setHasNewMessage(true);

Auto-scroll only if near bottom:
  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom();
    }
  }, [messages.length]);

Show scroll pill only when:
  scrollPill && hasNewMessage

On scrollToBottom: setHasNewMessage(false);

Change pill text from "↓ new message" to "↓" only — 
pill itself already implies new content.

─── BUG 6: Edit during compute ─────────────────────

In MessageActionSheet, import isComputing from store.
Disable the "edit" action row when isComputing:
  {isUser && (
    <ActionRow 
      icon={Edit2} 
      label="edit" 
      disabled={isComputing}
      onClick={...} 
    />
  )}

Add disabled prop to ActionRow:
  If disabled: opacity-30, pointer-events-none, 
  cursor-not-allowed on the row div.

─── BUG 7: QR expiry ────────────────────────────────

In QRPairingScreen, when timeLeft hits 0:
  Show expired state instead of scan UI:
  
  <div className="flex flex-col items-center gap-4">
    <div className="font-mono text-[11px] text-text-subtle">
      code expired
    </div>
    <button 
      className="font-mono text-[10px] text-accent 
        border border-accent-border rounded-[10px] 
        px-4 py-2"
      onClick={() => setTimeLeft(287)}
    >
      generate new code
    </button>
  </div>
  
  Replace the scanning frame when expired.

═══════════════════════════════════════════════════
SECTION 2 — MODELS SCREEN REDESIGN
═══════════════════════════════════════════════════

─── CHANGE 1: Remove section-level "active" badge ──

Delete the right-side "active" span from every tier 
section header. The row-level amber dot is enough.

─── CHANGE 2: Tier section visual separation ────────

Each tier section (fast / balanced / thorough) 
should be wrapped in a thin-stroked container:

  <div className="mt-6 border border-[#1E1E1E] 
    rounded-[14px] overflow-hidden">
    
    {/* Tier header inside the card */}
    <div className="px-4 py-3 border-b 
      border-[#1A1A1A] flex items-center">
      <span className="font-mono text-[10px] 
        uppercase tracking-[0.14em] text-text-subtle">
        {tier.name}
      </span>
    </div>
    
    {/* Model rows inside, no outer margin needed */}
    <div className="flex flex-col p-2">
      {/* model rows here */}
    </div>
    
  </div>

Inside the card, model rows get:
  rounded-[10px] px-3 py-3
  No border needed — the card provides containment.
  Active row: bg-[#1E1E1E] (subtle, not bg-surface)
  Inactive row: bg-transparent
  
Empty tier state (no models):
  Same card structure, but body shows:
  dashed inner div with "no model" text.
  No outer dashed border — the solid card is already 
  the container.

─── CHANGE 3: Three-dot menu replaces long press ───

Remove all long-press logic (pressTimer, 
startPress, cancelPress, longPressId state, 
the longPress bottom sheet AnimatePresence block).

Add to each model row, right side:
  A three-dot button: MoreVertical icon from lucide, 
  w-[14px] h-[14px] text-text-subtle
  Button: w-[28px] h-[28px] rounded-full 
    flex items-center justify-center
    hover:bg-bg-elevated transition-colors
  
  Replaces the "set active" hover text and 
  the amber dot / active / needs memory indicators.

  Wait — keep the amber dot for active models 
  as a status indicator. Just move the dot to 
  be left of the three-dot button.

Three-dot opens a compact popover anchored to the 
button (not a full bottom sheet).

Implement popover as a fixed-position div:
  State: const [openMenuId, setOpenMenuId] = 
    useState<string | null>(null);
  
  Popover position: absolute, top-[calc(row offset)],
  right-4. Use a wrapper div with position-relative 
  on each row and position the popover from there.

Popover styles:
  bg-[#1A1A1A] border border-[#2A2A2A] 
  rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.5)]
  min-w-[160px] z-50 overflow-hidden
  
  Close on outside click: add onClick on the 
  inset-0 overlay div (bg-transparent z-40).

Popover contents — context-sensitive:

IF model.isActive:
  [ amber dot ]  active for {tier.name}   ← info row, no action
  ─────────────────────────────────────
  [ Trash2 ]  remove from device          ← destructive

IF ready, not active:
  [ Check ]  set as active
  ─────────────────────────────────────
  [ Trash2 ]  remove from device

IF insufficient_memory:
  [ Info ]  about this model              ← opens info sheet
  ─────────────────────────────────────
  [ Trash2 ]  remove from device

Popover row styles:
  flex items-center gap-3 px-4 py-3 
  cursor-pointer hover:bg-[#222] transition-colors
  Icon: w-[13px] h-[13px]
  Label: font-mono text-[12px] text-text-primary
  
  Separator: h-[1px] bg-[#222] mx-0

Destructive row (remove):
  text-[#FF5555], icon color #FF5555

─── CHANGE 4: About sheet for insufficient_memory ──

New state: 
  const [aboutModelId, setAboutModelId] = 
    useState<string | null>(null);

When "about this model" tapped in popover:
  setOpenMenuId(null);
  setAboutModelId(model.id);

Render an AnimatePresence bottom sheet 
(same spring as longPress sheet was):
  Shows:
  - Model name + variant (mono 14px)
  - "this model requires more RAM than 
    is available on this device" 
    (sans 13px font-light text-text-secondary)
  - Spacer
  - "to run this model, pair a PC with 
    sufficient memory"
    (sans 12px text-text-subtle)
  - Monitor icon row linking to QR pairing
  - "close" dismiss button

─── CHANGE 5: Remove from Discover section ─────────

For installed models in the Discover section, 
replace the "installed" text with a three-dot button:
  Same MoreVertical style as model rows above.
  
  Popover for installed discover card:
  [ Check ]  installed                    ← info, no action
  ─────────────────────────────────────
  [ Trash2 ]  remove from device
  
  Remove logic:
    setModels(prev => prev.filter(m => 
      !(m.name === dm.name && 
        m.variant === dm.variant)
    ));
    showToast(`${dm.name} ${dm.variant} removed`);
    Apply same mode-reset logic as Bug 3.

─── CHANGE 6: Inline mode-switch system message ────

In ChatScreen, modify setMode calls to also 
insert a system message when mode changes 
mid-conversation (i.e. when messages.length > 0):

In ModeDropdown, after setMode(m.id):
  if (messages.length > 0) {
    const activeModel = models.find(
      model => model.tier === m.id && model.isActive
    );
    const systemMsg: Message = {
      id: Date.now().toString(),
      text: `switched to ${m.id}${activeModel 
        ? ' · ' + activeModel.name.toLowerCase() + 
          ' ' + activeModel.variant.toLowerCase() 
        : ''}`,
      sender: 'system',
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, systemMsg]);
  }

Add 'system' to Message sender type in store:
  sender: 'user' | 'local' | 'system';

In MessageBubble, add system message render:
  if (msg.sender === 'system') {
    return (
      <div className="flex items-center 
        gap-3 py-1 w-full">
        <div className="flex-1 h-[1px] 
          bg-[rgba(255,255,255,0.04)]" />
        <span className="font-mono text-[9px] 
          text-text-subtle tracking-[0.08em]">
          {msg.text}
        </span>
        <div className="flex-1 h-[1px] 
          bg-[rgba(255,255,255,0.04)]" />
      </div>
    );
  }

═══════════════════════════════════════════════════
SECTION 3 — PC MULTI-DEVICE MANAGEMENT
═══════════════════════════════════════════════════

─── STORE CHANGES ───────────────────────────────────

Replace current Device type with:

  export type PCDevice = {
    id: string;
    name: string;         // "MacBook Pro"
    connected: boolean;   // on same network right now
    isActiveCompute: boolean;  // selected for routing
  };

Replace device: Device with:
  pcDevices: PCDevice[]
  setPCDevices: React.Dispatch<...>
  usePC: boolean              // master toggle
  setUsePC: (v: boolean) => void
  activePCId: string | null   // which PC to use
  setActivePCId: (id: string | null) => void

Seed data:
  pcDevices: [] (empty by default)

After QR pairing confirm, instead of setDevice:
  setPCDevices(prev => [...prev, {
    id: Date.now().toString(),
    name: 'MacBook Pro',
    connected: true,
    isActiveCompute: true,
  }]);
  setActivePCId(newId);
  setUsePC(true);

In ChatScreen handleSend, compute source logic:
  const activePC = pcDevices.find(
    pc => pc.id === activePCId && 
      pc.connected && usePC
  );
  if (activePC) setComputeSource('pc');
  else setComputeSource('phone');

─── HEADER: Persistent PC indicator ────────────────

In ChatScreen Header, replace current 
showPCIndicator logic with:

  const activePC = pcDevices.find(
    pc => pc.id === activePCId && pc.connected
  );
  const pcOnline = !!activePC && usePC;
  const pcComputing = computeSource === 'pc' 
    && isComputing;

Monitor icon is always shown when pcOnline:
  - When pcOnline and NOT computing:
      Monitor icon: text-text-subtle (dim, passive)
      No dot
  - When pcOnline and computing:
      Monitor icon: text-accent
      Amber dot: absolute -top-0.5 -right-0.5 
        w-[4px] h-[4px] bg-accent 
        with pulse animation:
        animate={{ scale: [1, 1.3, 1], 
          opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}

AnimatePresence on the whole monitor block — 
appears when first PC is paired, stays as long 
as any PC is connected + usePC is true.

─── SLIDE MENU: PC device manager ───────────────────

Replace the current single "pair a pc" footer 
with a full PC section inside the scrollable area.

Place it between "recent" section and the bottom 
of the menu. The old fixed-position footer 
(pair a pc / device name + dot) is removed.

New PC section:

Section header row (same style as "actions" / 
"recent" labels):
  Left: "compute" label 
    font-mono 9px uppercase tracking-[0.14em] 
    text-text-subtle
  Right: usePC toggle
    Same toggle style as settings screen toggle:
    w-[32px] h-[18px], bg-accent when on, 
    bg-bg-elevated when off

  When toggle is OFF: all PC rows dim to opacity-40,
  non-interactive. Phone computation implied.

PC device rows (one per pcDevices entry):

  <div className="flex items-center justify-between
    p-[10px_20px] cursor-pointer 
    hover:bg-bg-surface transition-colors"
    onClick={() => setActivePCId(pc.id)}
  >
    Left:
      Monitor icon w-[14px] h-[14px] 
        text-text-subtle mr-3
      Flex col:
        Name: font-mono 12px 
          text-text-primary if active, 
          text-text-secondary if not
        Status: font-mono 9px 
          text-accent if connected, 
          text-[#5C5A57] if offline
          "online" / "offline"
    
    Right:
      If pc.id === activePCId:
        Filled circle: w-[6px] h-[6px] 
          bg-accent rounded-full
          shadow-[0_0_6px_rgba(200,185,138,0.5)]
      Else:
        Empty circle: w-[6px] h-[6px] 
          border border-[#3A3A3A] rounded-full
  </div>

"add pc" row (below all PC device rows):
  <div className="flex items-center gap-3
    p-[10px_20px] cursor-pointer 
    hover:bg-bg-surface transition-colors"
    onClick={() => {
      setOverlay('menuOpen', false);
      setTimeout(() => setOverlay('qrOpen', true), 200);
    }}
  >
    <Plus className="w-[14px] h-[14px] 
      text-text-subtle" />
    <span className="font-mono text-[12px] 
      text-text-subtle">
      add pc
    </span>
  </div>

When pcDevices is empty (no paired devices):
  Only show the "add pc" row with a note:
  <div className="font-mono text-[9px] 
    text-text-subtle px-[20px] pb-2 pt-1 
    italic">
    pair to extend compute
  </div>

─── QR PAIRING: Support multiple devices ────────────

In QRPairingScreen step 'done':
  Change "macbook paired" to show the count if 
  more than one PC:
  
  If pcDevices.length === 1:
    "macbook pro paired"
  Else:
    "macbook pro added" + 
    font-mono 10px text-subtle: 
    "{pcDevices.length} pcs available"

  The confirmation flow stays the same.
  Each new pairing appends to pcDevices array.

─── SETTINGS: Update device section ─────────────────

In SettingsScreen "device" section:
  If pcDevices.length === 0:
    "pair new device" row (existing)
  
  If pcDevices.length > 0:
    List each PC with name + connected status
    Each row has a remove option (chevron → detail)
    For simplicity in prototype: tapping a PC row 
    calls setPCDevices(prev => 
      prev.filter(p => p.id !== pc.id)
    ) after a confirm dialog — same destructive 
    pattern as model removal.
    
    "add another device" row at bottom

═══════════════════════════════════════════════════
SECTION 4 — CONSISTENCY PASS
═══════════════════════════════════════════════════

After all changes, verify:

1. All references to old `device` / `setDevice` 
   replaced with pcDevices / setPCDevices / usePC

2. SlideMenu no longer has the bottom-fixed 
   "pair a pc" footer — it's in the scrollable 
   section now

3. Three-dot popovers close when:
   - An action is taken
   - Outside area is tapped
   - Screen is dismissed

4. Toast messages consistent:
   - Model activated: "{tier} · {name} {variant}"
   - Model removed: "{name} {variant} removed"
   - PC added: "{name} paired"

5. No hardcoded hex colors outside established 
   palette

6. All new interactive rows: whileTap={{ scale: 0.97 }}

7. modelsOpen, qrOpen animations unchanged

8. discoverModels array moved outside ModelsScreen 
   component (module-level const)

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

WelcomeScreen (except QR pairing done-step copy)
ChatScreen message bubble styles
Input area styles and animation
All spring values
All established color tokens
Glyph component