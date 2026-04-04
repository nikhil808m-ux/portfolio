Two files change: store.tsx and a mix of 
ChatScreen.tsx + OverlayManager.tsx.
Read all three files fully before starting.
Fix only what is listed. Nothing else changes.

═══════════════════════════════════════════════════
FILE 1 — store.tsx
═══════════════════════════════════════════════════

── FIX 1: usePC initialises false ────────────────

Find:
  const [usePC, setUsePCState] = useState(true);

Change to:
  const [usePC, setUsePCState] = useState(false);

Pairing triggers setUsePC(true) explicitly.
Nothing should be "on" before a PC exists.

── FIX 2: Unpair resets usePC ────────────────────

usePC and activePCId are reset in 
OverlayManager's unpair onClick. But the 
store is the right place for this. We'll fix 
it in OverlayManager below.

No store change needed for this one.

── FIX 3: computeSource after response ───────────

In handleSend (ChatScreen, not store), 
the setTimeout resets computeSource to 
'phone' unconditionally. Fix is in 
ChatScreen — see below.

No store change needed here either.

═══════════════════════════════════════════════════
FILE 2 — ChatScreen.tsx
═══════════════════════════════════════════════════

── FIX 4: computeSource reset after response ─────

In handleSend, inside the setTimeout callback,
find:

  setIsComputing(false);
  setComputeSource('phone');

Change to:

  setIsComputing(false);
  // Only reset to phone if not in PC session
  if (!isPCSession) {
    setComputeSource('phone');
  }

isPCSession is already destructured in 
ChatScreen's useAppStore call.

── FIX 5: No send debounce ───────────────────────

Add a ref at the top of ChatScreen 
(alongside isComputingRef):

  const isSendingRef = useRef(false);

In handleSend, add guard at the very top:

  const handleSend = () => {
    if (!inputText.trim()) return;
    if (isSendingRef.current) return;  // ← add
    if (isComputing) return;           // ← add
    isSendingRef.current = true;
    
    // ... existing code ...
    
    setIsComputing(true);
    // ... setTimeout etc ...
  };

Inside the setTimeout callback, after 
setIsComputing(false), add:

  isSendingRef.current = false;

Also add it inside the isComputingRef.current 
early-return:

  if (!isComputingRef.current) {
    isSendingRef.current = false;
    return;
  }

── FIX 6: Send guard during edit mode ────────────

In handleSend, in the guards at the top, add:

  if (overlays.editingMessageId) return;

overlays is already destructured in 
ChatScreen's useAppStore call.

── FIX 7: Enter key to send ──────────────────────

In InputArea, add onKeyDown to the textarea:

  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputText.trim() && !isComputing) {
        handleSend();
      }
    }
  }}

Shift+Enter still allows newlines.
isComputing is already destructured in 
InputArea from useAppStore.

═══════════════════════════════════════════════════
FILE 3 — OverlayManager.tsx
═══════════════════════════════════════════════════

── FIX 8: Settings opens over SlideMenu ──────────

In SlideMenu, find the settings MenuAction:

  <MenuAction 
    icon={SlidersHorizontal} 
    label="settings" 
    onClick={() => 
      setOverlay('settingsOpen', true)
    } 
  />

Replace with:

  <MenuAction 
    icon={SlidersHorizontal} 
    label="settings" 
    onClick={() => {
      setOverlay('menuOpen', false);
      setTimeout(() => 
        setOverlay('settingsOpen', true)
      , 200);
    }} 
  />

200ms matches the existing pattern used for 
models and QR screens.

── FIX 9: Unpair doesn't reset usePC ─────────────

In SettingsScreen, add setUsePC to the 
useAppStore destructure:

  const { setOverlay, internetFetch, 
    setInternetFetch, pcDevices, setPCDevices, 
    activePCId, setActivePCId, usePC,
    setMessages, setConversations,
    setUsePC                          // ← add
  } = useAppStore();

Find the unpair onClick:

  onClick={(e) => {
    e.stopPropagation();
    setPCDevices(prev => 
      prev.filter(p => p.id !== pc.id));
    if (activePCId === pc.id) 
      setActivePCId(null);
  }}

Replace with:

  onClick={(e) => {
    e.stopPropagation();
    const remainingPCs = pcDevices.filter(
      p => p.id !== pc.id
    );
    setPCDevices(remainingPCs);
    if (activePCId === pc.id) {
      setActivePCId(null);
      // If no PCs left, disable PC compute
      if (remainingPCs.length === 0) {
        setUsePC(false);
      } else {
        // Switch active to first remaining
        setActivePCId(remainingPCs[0].id);
      }
    }
  }}

── FIX 10: Delete orphans AI response ────────────

In MessageActionSheet, find the delete ActionRow:

  <ActionRow 
    icon={Trash2} 
    label="delete message" 
    color="#FF5555" 
    hoverColor="#2A1515" 
    disabled={isComputing} 
    onClick={() => { 
      setOverlay('activeMessageId', null); 
      setMessages(prev => 
        prev.filter(m => m.id !== msg.id));
    }} 
  />

Replace with:

  <ActionRow 
    icon={Trash2} 
    label="delete message" 
    color="#FF5555" 
    hoverColor="#2A1515" 
    disabled={isComputing} 
    onClick={() => { 
      setOverlay('activeMessageId', null);
      setMessages(prev => {
        const idx = prev.findIndex(
          m => m.id === msg.id
        );
        if (idx === -1) return prev;
        
        if (isUser) {
          // Delete user message + the AI 
          // response immediately after it
          const next = prev[idx + 1];
          const deleteTwo = next && 
            next.sender === 'local';
          return prev.filter((_, i) => 
            i !== idx && 
            !(deleteTwo && i === idx + 1)
          );
        } else {
          // Deleting AI message: also remove
          // the user message before it
          const prev2 = prev[idx - 1];
          const deleteTwo = prev2 && 
            prev2.sender === 'user';
          return prev.filter((_, i) => 
            i !== idx && 
            !(deleteTwo && i === idx - 1)
          );
        }
      });
    }} 
  />

isUser is already defined in MessageActionSheet 
as const isUser = msg?.sender === 'user'.

── FIX 11: All models removed → undefined mode ───

In ModelsScreen, there are two places where 
model removal calls setMode with a potential 
undefined fallback. Both look like:

  const fallback = ['fast','balanced','thorough']
    .find(t => updated.some(
      m => m.tier === t && m.status === 'ready'
    ));
  if (fallback) setMode(fallback as Mode);

This is already guarded by `if (fallback)` — 
so setMode only fires when fallback is defined.
The bug was that if fallback is undefined, 
mode stays at the old value (e.g. 'thorough') 
even though no thorough model exists anymore.

Replace both instances with:

  const fallback = ['fast','balanced','thorough']
    .find(t => updated.some(
      m => m.tier === t && m.status === 'ready'
    ));
  if (fallback) {
    setMode(fallback as Mode);
  } else {
    // No models at all — mode becomes stale
    // but we can't set it to undefined.
    // Leave mode as-is; ModeDropdown will 
    // show all tiers as unavailable.
    // This is the correct graceful state.
  }

The existing guard is actually correct — 
the real fix is ensuring the ModeDropdown 
handles all-unavailable gracefully, which 
it already does (shows red "insufficient 
memory" or "no model installed" on all rows).
So this needs no code change — just confirm 
the existing guard is present in both 
removal locations and leave it.

── FIX 12: Double download prevention ────────────

In ModelsScreen, find handleDownload.
Add a guard at the top:

  const handleDownload = (dm: typeof discoverModels[0]) => {
    // Prevent re-download if already in progress
    if (downloadingMap.has(dm.id)) return;  // ← add
    // Prevent re-download if already installed
    const alreadyInstalled = models.some(
      m => m.name === dm.name && 
           m.variant === dm.variant
    );
    if (alreadyInstalled) return;            // ← add
    
    // ... rest of existing code unchanged ...
  };

── FIX 13: Pin message silent fail ───────────────

Two options: implement a real pin, or remove 
the action. For a prototype, show a toast 
instead of silently failing.

In ModelsScreen, showToast is a local function.
In MessageActionSheet we need our own toast.

Add local toast state to MessageActionSheet:

  const [toastMsg, setToastMsg] = useState
    string | null
  >(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

Find the Pin ActionRow:

  <ActionRow 
    icon={Pin} 
    label="pin message" 
    onClick={() => 
      setOverlay('activeMessageId', null)
    } 
  />

Replace with:

  <ActionRow 
    icon={Pin} 
    label="pin message" 
    onClick={() => {
      showToast('pinning coming soon');
    }} 
  />

Add the toast just inside the outer 
motion.div of MessageActionSheet, 
above the drag-handle div:

  <AnimatePresence>
    {toastMsg && (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        className="absolute bottom-[calc(100%+8px)] 
          left-1/2 -translate-x-1/2 
          bg-bg-elevated border border-borders 
          rounded-full px-4 py-2 font-mono 
          text-[10px] text-text-subtle 
          whitespace-nowrap"
      >
        {toastMsg}
      </motion.div>
    )}
  </AnimatePresence>

Don't close the action sheet on pin — 
let the toast show while sheet is still open.

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

WelcomeScreen — unchanged.
App.tsx — unchanged.
Glyph — unchanged.
PCSessionDropdown — unchanged.
ModeDropdown — unchanged.
QRPairingScreen — unchanged.
ModelsScreen download progress UI — unchanged.
All animation values — unchanged.
All color tokens — unchanged.
All existing overlay logic not mentioned — unchanged.

Files that change:
  store.tsx — usePC initial value only
  ChatScreen.tsx — computeSource reset fix,
    isSendingRef debounce, edit mode guard,
    Enter key handler
  OverlayManager.tsx — settings closes menu,
    unpair resets usePC, delete pairs messages,
    download guard, pin toast