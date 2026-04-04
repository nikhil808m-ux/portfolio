Two files change: store.tsx and OverlayManager.tsx.
Read both files fully before starting.
Touch only what is listed. Nothing else changes.

═══════════════════════════════════════════════════
FILE 1 — store.tsx
═══════════════════════════════════════════════════

── ADD: Conversation type, conversations state,
   newChat, setConversations ──────────────────

Add after the Message type definition:

  export type Conversation = {
    id: string;
    messages: Message[];
    mode: Mode;
    createdAt: number;
    title: string; // first 6 words of first 
                   // user message
  };

Add to AppState interface:

  conversations: Conversation[];
  setConversations: React.Dispatch
    React.SetStateAction<Conversation[]>
  >;
  newChat: () => void;

Add state in AppStoreProvider:

  const [conversations, setConversations] = 
    useState<Conversation[]>([]);

Implement newChat — place it after 
the disconnectPC function:

  const newChat = () => {
    // Stop any ongoing computation first
    if (isComputing) {
      stopComputing();
    }
    // Save current conversation if it has 
    // user messages
    if (messages.some(m => m.sender === 'user')) {
      const firstUserMsg = messages.find(
        m => m.sender === 'user'
      );
      const words = (firstUserMsg?.text ?? '')
        .split(' ')
        .slice(0, 6)
        .join(' ');
      const title = words.length > 0 
        ? words 
        : 'conversation';
      setConversations(prev => [
        {
          id: Date.now().toString(),
          messages: [...messages],
          mode,
          createdAt: Date.now(),
          title,
        },
        ...prev,
      ]);
    }
    setMessages([]);
    setComputeSource('phone');
  };

Add to context provider value:
  conversations, setConversations, newChat,

── FIX: switchToPhone + switchToPC message 
   guards ──────────────────────────────────

In switchToPhone, wrap the setMessages call:

  if (messages.length > 0) {
    setMessages(prev => [...prev, {
      id: `system-${Date.now()}`,
      text: 'switched to on-device',
      sender: 'system',
      timestamp: Date.now(),
    }]);
  }

Same fix in switchToPC:

  if (messages.length > 0) {
    setMessages(prev => [...prev, {
      id: `system-${Date.now()}`,
      text: `switched to ${activePC.name
        .toLowerCase()}`,
      sender: 'system',
      timestamp: Date.now(),
    }]);
  }

═══════════════════════════════════════════════════
FILE 2 — OverlayManager.tsx
═══════════════════════════════════════════════════

── UPDATE: lucide imports ────────────────────────

Replace HelpCircle and Clock with 
Cpu and SlidersHorizontal:

  Find:
    ChevronRight, Clock, Plus, HelpCircle, 
    Monitor, ArrowLeft, ...

  Change Clock → SlidersHorizontal
  Change HelpCircle → Cpu

── REWRITE: SlideMenu component entirely ─────────

Replace the entire SlideMenu component 
(from const SlideMenu = () => { 
to the closing }; before MenuAction)
with the following:

const SlideMenu = () => {
  const { 
    setOverlay, 
    pcDevices, 
    usePC, 
    setUsePC, 
    activePCId, 
    setActivePCId, 
    messages, 
    conversations,
    newChat,
    isComputing,
    computeSource,
    stopComputing,
  } = useAppStore();

  // Scroll position memory for recent zone
  const recentScrollRef = useRef<HTMLDivElement>(
    null
  );

  // Max 3 PCs enforced in UI
  const displayedPCs = pcDevices.slice(0, 3);
  const canAddMore = pcDevices.length < 3;

  // Title helper — first 6 words
  const shortTitle = (text: string) =>
    text.split(' ').slice(0, 6).join(' ');

  // Is the toggle dangerous right now?
  const toggleWillInterrupt = 
    isComputing && computeSource === 'pc' && usePC;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 
         bg-[rgba(0,0,0,0.5)] 
        flex justify-start"
      onClick={() => setOverlay('menuOpen', false)}
    >
      <motion.div
        className="w-[280px] h-full bg-bg-primary 
          border-r border-borders flex flex-col 
          box-border pt-[59px]"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 28 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── ZONE 1: Brand header — fixed ── */}
        <div className="px-[20px] pb-[20px] 
          border-b border-borders flex flex-col 
          shrink-0">
          <div className="font-mono text-[12px] 
            font-semibold tracking-[0.16em] 
            uppercase text-text-primary">
            local/ai
          </div>
          <div className="font-mono text-[9px] 
            text-text-subtle mt-1">
            on-device · private · yours
          </div>
        </div>

        {/* ── ZONE 2: Actions — fixed ── */}
        <div className="shrink-0 pt-2 pb-1 
          border-b border-borders">
          <div className="font-mono text-[9px] 
            uppercase tracking-[0.14em] 
            text-text-subtle 
            p-[8px_20px_4px]">
            actions
          </div>
          <div className="flex flex-col">
            <MenuAction 
              icon={Plus} 
              label="new chat" 
              onClick={() => {
                newChat();
                setOverlay('menuOpen', false);
              }} 
            />
            <MenuAction 
              icon={Cpu} 
              label="models" 
              onClick={() => {
                setOverlay('menuOpen', false);
                setTimeout(() => 
                  setOverlay('modelsOpen', true)
                , 200);
              }} 
            />
            <MenuAction 
              icon={SlidersHorizontal} 
              label="settings" 
              onClick={() => 
                setOverlay('settingsOpen', true)
              } 
            />
          </div>
        </div>

        {/* ── ZONE 3: Recent — scrollable ── */}
        <div 
          ref={recentScrollRef}
          className="flex-1 min-h-0 
            overflow-y-auto"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="font-mono text-[9px] 
            uppercase tracking-[0.14em] 
            text-text-subtle 
            p-[14px_20px_4px]">
            recent
          </div>

          {conversations.length === 0 && 
           messages.length === 0 ? (
            <div className="flex items-center 
              justify-center py-8">
              <span className="font-mono 
                text-[11px] text-text-subtle 
                text-center px-[20px]">
                no conversations yet
              </span>
            </div>
          ) : (
            <div className="flex flex-col mt-1 
              pb-2">

              {/* Current conversation */}
              {messages.some(
                m => m.sender === 'user'
              ) && (
                <div
                  className="p-[9px_20px] 
                    hover:bg-bg-surface 
                    transition-colors 
                    cursor-pointer 
                    flex flex-col gap-1 
                    border-l-[2px] 
                    border-accent"
                  onClick={() =>
                    setOverlay('menuOpen', false)
                  }
                >
                  <div className="font-sans 
                    text-[13px] font-light 
                    text-text-secondary truncate">
                    {shortTitle(
                      messages.find(
                        m => m.sender === 'user'
                      )?.text ?? ''
                    )}
                  </div>
                  <div className="font-mono 
                    text-[9px] text-accent">
                    now
                  </div>
                </div>
              )}

              {/* Past conversations */}
              {conversations.slice(0, 20).map(
                conv => (
                  <div
                    key={conv.id}
                    className="p-[9px_20px] 
                      hover:bg-bg-surface 
                      transition-colors 
                      cursor-pointer 
                      flex flex-col gap-1
                      border-l-[2px] 
                      border-transparent"
                    onClick={() => {
                      // Restore conversation
                      if (isComputing) {
                        stopComputing();
                      }
                      // Import setMessages 
                      // from store
                      setOverlay('menuOpen', 
                        false);
                    }}
                  >
                    <div className="font-sans 
                      text-[13px] font-light 
                      text-text-secondary 
                      truncate">
                      {conv.title}
                    </div>
                    <div className="font-mono 
                      text-[9px] text-text-subtle">
                      {new Date(conv.createdAt)
                        .toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })} · {conv.mode}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* ── ZONE 4: Compute — pinned 
            bottom, fixed ── */}
        <div className="shrink-0 border-t 
          border-borders">

          {/* Header row with toggle — only 
              show toggle if PCs exist */}
          <div className="flex items-center 
            justify-between 
            p-[14px_20px_8px]">
            <span className="font-mono 
              text-[9px] uppercase 
              tracking-[0.14em] 
              text-text-subtle">
              use pc
            </span>
            {pcDevices.length > 0 && (
              <div className="flex flex-col 
                items-end gap-[3px]">
                <div
                  className={`w-[32px] h-[18px] 
                    rounded-full p-[2px] 
                    cursor-pointer 
                    transition-colors flex
                    ${usePC 
                      ? 'bg-accent justify-end' 
                      : 'bg-bg-elevated 
                         justify-start'
                    }
                    ${toggleWillInterrupt 
                      ? 'ring-1 ring-[#FF5555] 
                         ring-opacity-60' 
                      : ''
                    }`}
                  onClick={() => 
                    setUsePC(!usePC)
                  }
                >
                  <motion.div 
                    layout 
                    className="w-[14px] h-[14px] 
                      bg-[#000] rounded-full" 
                  />
                </div>
                {toggleWillInterrupt && (
                  <span className="font-mono 
                    text-[8px] text-[#FF5555] 
                    opacity-70">
                    stops response
                  </span>
                )}
              </div>
            )}
          </div>

          {/* PC device list */}
          <div className={`flex flex-col 
            transition-opacity
            ${!usePC 
              ? 'opacity-40 pointer-events-none' 
              : ''
            }`}>
            {displayedPCs.map(pc => {
              const isActive = 
                pc.id === activePCId;
              const canSelect = pc.connected;
              
              return (
                <div
                  key={pc.id}
                  className={`flex items-center 
                    justify-between 
                    p-[10px_20px] 
                    transition-colors
                    ${canSelect 
                      ? 'cursor-pointer hover:bg-bg-surface' 
                      : 'cursor-not-allowed'
                    }`}
                  onClick={() => {
                    if (canSelect) 
                      setActivePCId(pc.id);
                  }}
                >
                  <div className="flex 
                    items-center">
                    <Monitor className="w-[14px] 
                      h-[14px] text-text-subtle 
                      mr-3" />
                    <div className="flex 
                      flex-col">
                      <span className={`
                        font-mono text-[12px] 
                        ${isActive && canSelect 
                          ? 'text-text-primary' 
                          : 'text-text-secondary'
                        }`}>
                        {pc.name}
                      </span>
                      <span className={`
                        font-mono text-[9px] 
                        ${pc.connected 
                          ? 'text-accent' 
                          : 'text-[#5C5A57]'
                        }`}>
                        {pc.connected 
                          ? 'online' 
                          : 'offline'}
                      </span>
                    </div>
                  </div>

                  {/* Active dot — amber if 
                      online+active, 
                      grey if offline */}
                  {isActive ? (
                    <div className={`
                      w-[6px] h-[6px] 
                      rounded-full
                      ${pc.connected 
                        ? 'bg-accent shadow-[0_0_6px_rgba(200,185,138,0.5)]' 
                        : 'bg-[#3A3A3A]'
                      }`} 
                    />
                  ) : (
                    <div className="w-[6px] 
                      h-[6px] border 
                      border-[#3A3A3A] 
                      rounded-full" />
                  )}
                </div>
              );
            })}

            {/* Add PC — hidden if at 3 */}
            {canAddMore && (
              <div
                className="flex items-center 
                  gap-3 p-[10px_20px] 
                  cursor-pointer 
                  hover:bg-bg-surface 
                  transition-colors"
                onClick={() => {
                  setOverlay('menuOpen', false);
                  setTimeout(() => 
                    setOverlay('qrOpen', true)
                  , 200);
                }}
              >
                <Plus className="w-[14px] 
                  h-[14px] text-text-subtle" />
                <span className="font-mono 
                  text-[12px] text-text-subtle">
                  add pc
                </span>
              </div>
            )}

            {/* Empty state */}
            {pcDevices.length === 0 && (
              <div
                className="flex items-center 
                  gap-3 p-[10px_20px] 
                  cursor-pointer 
                  hover:bg-bg-surface 
                  transition-colors"
                onClick={() => {
                  setOverlay('menuOpen', false);
                  setTimeout(() => 
                    setOverlay('qrOpen', true)
                  , 200);
                }}
              >
                <Plus className="w-[14px] 
                  h-[14px] text-text-subtle" />
                <span className="font-mono 
                  text-[12px] text-text-subtle">
                  pair a pc
                </span>
              </div>
            )}
          </div>

          {/* Bottom safe area */}
          <div className="h-[20px]" />
        </div>

      </motion.div>
    </motion.div>
  );
};

── NOTE on conversation restore ──────────────────

The past conversation onClick above closes 
the menu but doesn't restore messages yet —
the comment notes this. To fully implement 
conversation restore, add setMessages to 
SlideMenu's useAppStore destructure and 
replace the onClick body with:

  onClick={() => {
    if (isComputing) stopComputing();
    setMessages([...conv.messages]);
    setOverlay('menuOpen', false);
  }}

This is the complete restore flow.
Add setMessages to the destructure list 
at the top of SlideMenu.

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

ChatScreen — unchanged.
WelcomeScreen — unchanged.
App.tsx — unchanged.
All overlay components other than SlideMenu 
  — unchanged.
PCSessionDropdown — unchanged.
ModeDropdown — unchanged.
ModelsScreen — unchanged.
QRPairingScreen — unchanged.
SettingsScreen — unchanged.
MessageActionSheet — unchanged.
All store actions except additions — unchanged.
All spring/animation values — unchanged.
All color tokens — unchanged.
MenuAction component — unchanged.

Files that change:
  store.tsx — Conversation type, conversations,
    setConversations, newChat, message guards
    in switchToPhone/switchToPC
  OverlayManager.tsx — lucide imports updated,
    SlideMenu rewritten
