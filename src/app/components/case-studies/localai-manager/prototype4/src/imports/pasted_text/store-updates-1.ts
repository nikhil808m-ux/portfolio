Four files change: store.tsx, ChatScreen.tsx, 
WelcomeScreen.tsx, OverlayManager.tsx.
Read all four fully before starting.
Make only the listed changes. Nothing else moves.

═══════════════════════════════════════════════════
FILE 1 — store.tsx
═══════════════════════════════════════════════════

── FIX 1: Device has 256 GB — fix seed models ────

The llama31-13b model has status 
'insufficient_memory'. A 256 GB device 
has no reason to flag a 7.8 GB model as 
insufficient. Change it to ready and active.

Find:
  { id: 'llama31-13b', name: 'Llama 3.1', 
    variant: '13B', sizeGB: 7.8, 
    tier: 'thorough', 
    status: 'insufficient_memory', 
    isActive: false },

Replace with:
  { id: 'llama31-13b', name: 'Llama 3.1', 
    variant: '13B', sizeGB: 7.8, 
    tier: 'thorough', 
    status: 'ready', 
    isActive: true },

── FIX 2: Add generatedOn to Message type ────────

Find the Message type:
  export type Message = {
    id: string;
    text: string;
    sender: 'user' | 'local' | 'system';
    timestamp: number;
    responseTime?: string;
    tokensPerSecond?: string;
    stopped?: boolean;
  };

Add one optional field:
    generatedOn?: 'phone' | 'pc';

═══════════════════════════════════════════════════
FILE 2 — ChatScreen.tsx
═══════════════════════════════════════════════════

── FIX 3: Set generatedOn on AI messages ─────────

In handleSend, inside the setTimeout callback,
find where aiMsg is constructed:

  const aiMsg: Message = {
    id: (Date.now() + 1).toString(),
    text: "This is a local...",
    sender: 'local',
    timestamp: Date.now() + 1000,
    responseTime: "1.2s",
    tokensPerSecond: "34 tok/s"
  };

Add generatedOn:
  const aiMsg: Message = {
    id: (Date.now() + 1).toString(),
    text: "This is a local, privacy-first 
      response generated entirely on your 
      device. The connection is secure, 
      and no data was sent to the cloud.",
    sender: 'local',
    timestamp: Date.now() + 1000,
    responseTime: "1.2s",
    tokensPerSecond: "34 tok/s",
    generatedOn: isPCSession ? 'pc' : 'phone',
  };

── FIX 4: Chips auto-send ────────────────────────

The empty state chips currently only fill 
the textarea. They should send immediately.

Find in ChatScreen (not InputArea):
  onClick={() => setInputText(chip)}

Replace with:
  onClick={() => {
    setInputText(chip);
    // Use timeout to let state settle 
    // before handleSend reads inputText
    setTimeout(() => {
      handleSend();
    }, 0);
  }}

Wait — handleSend reads inputText from 
closure, not the updated state. Better approach:

Replace with a direct send that bypasses 
inputText state entirely. Modify handleSend 
to accept an optional override:

  const handleSend = (override?: string) => {
    const text = override ?? inputText;
    if (!text.trim()) return;
    if (isSendingRef.current) return;
    if (isComputing) return;
    if (overlays.editingMessageId) return;
    isSendingRef.current = true;
    
    const newMsg: Message = { 
      id: Date.now().toString(), 
      text: text,           // ← use text not inputText
      sender: 'user', 
      timestamp: Date.now() 
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    // ... rest unchanged
  };

Then the chip onClick becomes:
  onClick={() => handleSend(chip)}

── FIX 5: PC-generated message indicator ─────────

In MessageBubble, find the AI timestamp row:

  {isUser ? (
    <div className="mt-1.5 flex items-center 
      gap-1.5 font-mono text-[8.5px] 
      text-text-subtle">
      <span>{timestamp...}</span>
    </div>
  ) : (
    <div 
      className="mt-1.5 flex items-center 
        gap-1.5 font-mono text-[8.5px] 
        text-text-subtle cursor-pointer"
      onClick={() => setShowMeta(prev => !prev)}
    >
      <span>{timestamp...}</span>
      <AnimatePresence>
        {showMeta && msg.responseTime && (
          ...meta span...
        )}
      </AnimatePresence>
    </div>
  )}

In the AI branch (the else/`: (` path), 
add a PC indicator before the timestamp span:

  <div 
    className="mt-1.5 flex items-center 
      gap-1.5 font-mono text-[8.5px] 
      text-text-subtle cursor-pointer"
    onClick={() => setShowMeta(prev => !prev)}
  >
    {msg.generatedOn === 'pc' && (
      <Monitor 
        className="w-[9px] h-[9px] 
          text-text-subtle opacity-40" 
      />
    )}
    <span>
      {new Date(msg.timestamp)
        .toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
    </span>
    <AnimatePresence>
      {showMeta && msg.responseTime && (
        ...existing meta...
      )}
    </AnimatePresence>
  </div>

Monitor is already imported in ChatScreen.

Also set generatedOn on the regen message
inside the edit confirm flow in MessageBubble.
Find the regen aiMsg inside the edit confirm:

  const aiMsg: Message = {
    id: `regen-${Date.now()}`,
    text: 'This is a regenerated response...',
    sender: 'local',
    timestamp: Date.now(),
    responseTime: '0.9s',
    tokensPerSecond: '41 tok/s',
  };

Add:
    generatedOn: isPCSession ? 'pc' : 'phone',

isPCSession needs to be destructured in 
MessageBubble. Add it:
  const { overlays, setOverlay, setMessages, 
    setIsComputing, isComputing, 
    isPCSession   // ← add
  } = useAppStore();

═══════════════════════════════════════════════════
FILE 3 — WelcomeScreen.tsx
═══════════════════════════════════════════════════

── FIX 6: Back navigation on steps 2 and 3 ──────

Step 2 ('models') needs a back button 
to return to step 1 ('brand').
Step 3 ('pc') needs a back button 
to return to step 2 ('models').

In the step 2 motion.div, add at the 
very top before the title block:

  <div className="flex items-center 
    justify-between w-full mb-6">
    <button
      className="flex items-center gap-1 
        font-mono text-[12px] text-text-subtle 
        hover:text-text-secondary 
        transition-colors"
      onClick={() => setStep('brand')}
    >
      <ChevronRight 
        className="w-[13px] h-[13px] 
          rotate-180" 
      />
      back
    </button>
    <div className="w-12" />
  </div>

In the step 3 motion.div, add the same 
pattern at the very top:

  <div className="flex items-center 
    justify-between w-full mb-4">
    <button
      className="flex items-center gap-1 
        font-mono text-[12px] text-text-subtle 
        hover:text-text-secondary 
        transition-colors"
      onClick={() => setStep('models')}
    >
      <ChevronRight 
        className="w-[13px] h-[13px] 
          rotate-180" 
      />
      back
    </button>
    <div className="w-12" />
  </div>

ChevronRight is already imported.

── FIX 7: Local network permissions note ─────────

In step 3, find the "what you unlock" 
feature bullets block. After it (between 
the bullet block and the buttons div), add:

  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.35 }}
    className="font-mono text-[9px] 
      text-text-subtle text-center 
      leading-[1.7] mb-2 mt-[-4px]"
  >
    requires local network access
    · no data leaves your network
  </motion.p>

═══════════════════════════════════════════════════
FILE 4 — OverlayManager.tsx
═══════════════════════════════════════════════════

── FIX 8: Remove insufficient_memory 
   treatment — device has 256 GB ─────────────────

The 'insufficient_memory' status type still 
exists in the store for future use, but no 
installed model on this 256 GB device should 
trigger it. The UI treatment however should 
still be graceful if it ever appears.

No removal of the status handling code —
just leave it. The seed data change in 
store.tsx means it will never render now.

The one visible remnant is in ModeDropdown:
  {!hasModel ? 'no model installed' : 
    'insufficient memory'}

Leave this as-is. It's a valid edge case 
the UI should handle.

── FIX 9: Remove "requires paired PC" note 
   from Discover section ─────────────────────────

With a 256 GB device, the 70B model 
can run on-device. The note is wrong now.

Find in the Discover model cards:
  {dm.tier === 'thorough' && 
   dm.sizeGB > 10 && (
    <div className="flex items-center 
      gap-1 mt-1">
      <Monitor className="w-[10px] 
        h-[10px] text-text-subtle" />
      <span className="font-mono text-[9px] 
        text-text-subtle">
        requires paired PC
      </span>
    </div>
  )}

Remove this block entirely.

── FIX 10: Storage bar on Models screen ──────────

In ModelsScreen, find the header:
  <span className="font-mono text-[10px] 
    text-text-subtle">
    {usedGB} GB used
  </span>

Replace with a storage bar + label:

  <div className="flex flex-col items-end 
    gap-[4px]">
    <span className="font-mono text-[10px] 
      text-text-subtle">
      {usedGB} GB of 256 GB
    </span>
    <div className="w-[80px] h-[3px] 
      bg-bg-elevated rounded-full overflow-hidden">
      <div 
        className="h-full bg-accent 
          rounded-full transition-all 
          duration-500"
        style={{ 
          width: `${Math.min(
            (parseFloat(usedGB) / 256) * 100, 
            100
          )}%` 
        }}
      />
    </div>
  </div>

The bar fills proportional to 256 GB total.
At current seed data (~16 GB used) it will 
show a very thin sliver — correct for a 
256 GB device.

── FIX 11: Cancel download button ────────────────

In ModelsScreen, find the downloading state 
in the Discover cards:

  ) : isDownloading ? (
    <span className="font-mono text-[10px] 
      text-text-subtle">
      {dm.sizeGB.toFixed(1)} GB · 
      downloading...
    </span>

Replace with:
  ) : isDownloading ? (
    <button
      className="font-mono text-[10px] 
        text-text-subtle border 
        border-[#2A2A2A] rounded-[6px] 
        px-3 py-1.5 
        hover:border-[#FF5555] 
        hover:text-[#FF5555] 
        transition-colors flex items-center 
        gap-[5px]"
      onClick={() => {
        // Cancel the interval
        const interval = 
          downloadIntervals.current.get(dm.id);
        if (interval) {
          clearInterval(interval);
          downloadIntervals.current
            .delete(dm.id);
        }
        // Remove from progress map
        setDownloadingMap(prev => {
          const next = new Map(prev);
          next.delete(dm.id);
          return next;
        });
      }}
    >
      <X className="w-[10px] h-[10px]" />
      cancel
    </button>

X icon needs to be imported. Add X to 
the lucide import line at the top of 
OverlayManager.tsx. The line currently 
imports: ChevronRight, SlidersHorizontal, 
Plus, Cpu, Monitor, ArrowLeft, RefreshCcw, 
Pin, Trash2, Edit2, Copy, MoreVertical, 
Info, Check, Download.

Add X to that list.

── FIX 12: Delete + rename past conversations ────

In SlideMenu, add setConversations to the 
useAppStore destructure:

  const { 
    setOverlay, 
    pcDevices, usePC, setUsePC, 
    activePCId, setActivePCId, 
    messages, setMessages,
    conversations, setConversations,  // ← add setConversations
    newChat, isComputing, computeSource, 
    stopComputing,
  } = useAppStore();

Add local state for the conv context menu 
and rename mode at the top of SlideMenu:

  const [convMenuId, setConvMenuId] = 
    useState<string | null>(null);
  const [renamingId, setRenamingId] = 
    useState<string | null>(null);
  const [renameVal, setRenameVal] = 
    useState('');

Replace the past conversations map block:

OLD (the entire conversations.slice block):
  {conversations.slice(0, 20).map(
    conv => (
      <div
        key={conv.id}
        className="p-[9px_20px] ..."
        onClick={() => { ... }}
      >
        <div ...>{conv.title}</div>
        <div ...>{date} · {mode}</div>
      </div>
    )
  )}

NEW:
  {conversations.slice(0, 20).map(conv => (
    <div
      key={conv.id}
      className="relative flex items-center 
        group border-l-[2px] 
        border-transparent 
        hover:border-bg-surface 
        transition-colors"
    >
      {renamingId === conv.id ? (
        /* Rename mode */
        <div className="flex-1 p-[6px_12px_6px_20px] 
          flex items-center gap-2">
          <input
            autoFocus
            value={renameVal}
            onChange={e => 
              setRenameVal(e.target.value)
            }
            onKeyDown={e => {
              if (e.key === 'Enter' && 
                  renameVal.trim()) {
                setConversations(prev => 
                  prev.map(c => c.id === conv.id 
                    ? { ...c, 
                        title: renameVal.trim() 
                      } 
                    : c
                  )
                );
                setRenamingId(null);
              }
              if (e.key === 'Escape') {
                setRenamingId(null);
              }
            }}
            className="flex-1 bg-bg-elevated 
              border border-accent-border 
              rounded-[6px] px-2 py-1 
              font-sans text-[13px] font-light 
              text-text-primary outline-none"
          />
          <button
            className="font-mono text-[9px] 
              text-accent"
            onClick={() => {
              if (renameVal.trim()) {
                setConversations(prev =>
                  prev.map(c => c.id === conv.id
                    ? { ...c, 
                        title: renameVal.trim() 
                      }
                    : c
                  )
                );
              }
              setRenamingId(null);
            }}
          >
            save
          </button>
        </div>
      ) : (
        /* Normal row */
        <div
          className="flex-1 p-[9px_12px_9px_20px] 
            cursor-pointer 
            hover:bg-bg-surface 
            transition-colors 
            flex flex-col gap-1"
          onClick={() => {
            if (convMenuId === conv.id) {
              setConvMenuId(null);
              return;
            }
            if (isComputing) stopComputing();
            setMessages([...conv.messages]);
            setOverlay('menuOpen', false);
          }}
        >
          <div className="font-sans text-[13px] 
            font-light text-text-secondary 
            truncate pr-6">
            {conv.title}
          </div>
          <div className="font-mono text-[9px] 
            text-text-subtle">
            {new Date(conv.createdAt)
              .toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
              })} · {conv.mode}
          </div>
        </div>
      )}

      {/* Three-dot menu button — 
          visible on hover */}
      {renamingId !== conv.id && (
        <button
          className="absolute right-[14px] 
            top-1/2 -translate-y-1/2 
            w-[24px] h-[24px] rounded-full 
            flex items-center justify-center
            opacity-0 group-hover:opacity-100 
            hover:bg-bg-elevated 
            transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            setConvMenuId(
              convMenuId === conv.id 
                ? null 
                : conv.id
            );
          }}
        >
          <MoreVertical 
            className="w-[12px] h-[12px] 
              text-text-subtle" 
          />
        </button>
      )}

      {/* Inline popover */}
      <AnimatePresence>
        {convMenuId === conv.id && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-[10px] 
              top-[calc(100%-4px)] z-10 
              bg-[#1A1A1A] border border-[#2A2A2A] 
              rounded-[10px] 
              shadow-[0_4px_16px_rgba(0,0,0,0.5)] 
              overflow-hidden min-w-[120px]"
            onClick={e => e.stopPropagation()}
          >
            <div
              className="flex items-center 
                gap-2 px-3 py-[9px] 
                cursor-pointer 
                hover:bg-[#222] 
                transition-colors"
              onClick={() => {
                setRenamingId(conv.id);
                setRenameVal(conv.title);
                setConvMenuId(null);
              }}
            >
              <Edit2 className="w-[11px] 
                h-[11px] text-text-subtle" />
              <span className="font-mono 
                text-[11px] text-text-secondary">
                rename
              </span>
            </div>
            <div className="h-[1px] 
              bg-[#222]" />
            <div
              className="flex items-center 
                gap-2 px-3 py-[9px] 
                cursor-pointer 
                hover:bg-[#1A0A0A] 
                transition-colors"
              onClick={() => {
                setConversations(prev => 
                  prev.filter(
                    c => c.id !== conv.id
                  )
                );
                setConvMenuId(null);
              }}
            >
              <Trash2 className="w-[11px] 
                h-[11px] text-[#FF5555]" />
              <span className="font-mono 
                text-[11px] text-[#FF5555]">
                delete
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ))}

Edit2 and Trash2 and MoreVertical are 
already imported. AnimatePresence and 
motion are already imported.

Also close the popover when user clicks 
elsewhere — in the SlideMenu outer backdrop 
onClick, add:
  setConvMenuId(null);

The backdrop already calls 
setOverlay('menuOpen', false) — add 
setConvMenuId(null) before or after.

── FIX 13: Model info sheet for ready models ─────

In ModelsScreen, in the three-dot menu 
popover for installed models, currently:
- Active model: shows "active for {tier}"
- Ready inactive: shows "set as active"
- Insufficient: shows "about this model"

Add "about" for ALL models (active and ready).

Find the three-dot menu popover content.
After the existing rows (active/set-as-active/
insufficient blocks) and BEFORE the 
divider + remove row, add:

  <div 
    className="flex items-center gap-3 
      px-4 py-3 cursor-pointer 
      hover:bg-[#222] transition-colors"
    onClick={() => {
      setOpenMenuId(null);
      setMenuAnchor(null);
      setAboutModelId(model.id);
    }}
  >
    <Info className="w-[13px] h-[13px] 
      text-text-subtle" />
    <span className="font-mono text-[12px] 
      text-text-secondary">
      about
    </span>
  </div>

This replaces the isInsufficient-only 
"about this model" conditional. Remove 
the isInsufficient conditional block 
for about and replace with the above 
(shown for all models always).

The aboutModelId bottom sheet already 
exists — it just needs richer content 
for ready models. Find the about sheet:

  const m = models.find(x => x.id === aboutModelId);

After finding m, update the sheet content.
Currently shows:
  - model name
  - "requires more RAM" message
  - "pair a PC" button

Replace the content block with:

  <>
    <div className="text-center font-mono 
      text-[14px] text-text-primary mb-1">
      {m.name} {m.variant}
    </div>
    <div className="font-mono text-[9px] 
      uppercase tracking-[0.12em] 
      text-text-subtle text-center mb-4">
      {m.tier} · {m.sizeGB.toFixed(1)} GB
    </div>

    <div className="h-[1px] bg-borders 
      w-full mb-4" />

    {m.status === 'insufficient_memory' ? (
      <>
        <div className="font-sans text-[13px] 
          font-light text-text-secondary 
          text-center mb-3">
          this model requires more RAM than 
          is currently available
        </div>
        <div className="font-sans text-[12px] 
          text-text-subtle text-center mb-6">
          pair a PC with sufficient memory 
          to run this model
        </div>
        <button
          onClick={() => {
            setAboutModelId(null);
            setOverlay('modelsOpen', false);
            setTimeout(() => 
              setOverlay('qrOpen', true)
            , 200);
          }}
          className="w-full flex items-center 
            justify-center gap-2 bg-bg-surface 
            border border-borders 
            text-text-primary font-mono 
            text-[12px] rounded-[14px] 
            py-4 hover:bg-bg-elevated 
            transition-colors"
        >
          <Monitor className="w-[14px] 
            h-[14px]" /> 
          pair a pc
        </button>
      </>
    ) : (
      <div className="font-sans text-[13px] 
        font-light text-text-secondary 
        text-center leading-[1.7] mb-6 
        px-2">
        {m.desc ?? 
          `a ${m.tier} tier model optimised 
           for local inference. 
           runs fully on-device.`}
      </div>
    )}

    <button
      onClick={() => setAboutModelId(null)}
      className="w-full text-text-subtle 
        font-mono text-[12px] uppercase 
        py-2 mt-2"
    >
      close
    </button>
  </>

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

App.tsx — unchanged.
Glyph.tsx — unchanged.
QRPairingScreen — unchanged.
PCSessionDropdown — unchanged.
ModeDropdown — unchanged.
SettingsScreen — unchanged.
MessageActionSheet — unchanged.
All spring/animation values — unchanged.
All color tokens — unchanged.
All existing overlay logic not 
  mentioned above — unchanged.

Files that change:
  store.tsx — seed model status fix, 
    generatedOn field on Message type
  ChatScreen.tsx — handleSend override param,
    chips auto-send, generatedOn on aiMsg,
    PC icon in AI message timestamp row
  WelcomeScreen.tsx — back buttons on 
    steps 2+3, permissions note on step 3
  OverlayManager.tsx — storage bar, 
    cancel download, conv delete/rename,
    model about sheet for all models,
    remove "requires paired PC" note,
    add X to lucide imports