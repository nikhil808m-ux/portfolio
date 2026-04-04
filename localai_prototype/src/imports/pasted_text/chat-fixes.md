Multiple fixes across store.tsx, ChatScreen.tsx, 
and OverlayManager.tsx. Read every file fully 
before starting. Make only the changes listed. 
Nothing else changes.

═══════════════════════════════════════════════════
FILE 1 — store.tsx
═══════════════════════════════════════════════════

── FIX 1: Add Conversation type + conversations 
   array + newChat action ──────────────────────

Add to the top of the file, after Message type:

  export type Conversation = {
    id: string;
    messages: Message[];
    mode: Mode;
    createdAt: number;
    // first user message used as title
    title: string;
  };

Add to AppState interface:

  conversations: Conversation[];
  newChat: () => void;

Add state in AppStoreProvider:

  const [conversations, setConversations] = 
    useState<Conversation[]>([]);

Implement newChat:

  const newChat = () => {
    // Save current conversation if it has messages
    if (messages.length > 0) {
      const firstUserMsg = messages.find(
        m => m.sender === 'user'
      );
      setConversations(prev => [
        {
          id: Date.now().toString(),
          messages: [...messages],
          mode,
          createdAt: Date.now(),
          title: firstUserMsg?.text ?? 'conversation',
        },
        ...prev,
      ]);
    }
    // Reset chat state
    setMessages([]);
    setIsComputing(false);
    setComputeSource('phone');
    setScreen('chat'); // stay on chat, show empty state
  };

Add to context provider value:
  conversations, newChat,

── FIX 2: Guard system messages in 
   switchToPhone + switchToPC ─────────────────

In switchToPhone, change:

  setMessages(prev => [
    ...prev,
    { ... 'switched to on-device' ... }
  ]);

To:

  if (messages.length > 0) {
    setMessages(prev => [
      ...prev,
      {
        id: `system-${Date.now()}`,
        text: 'switched to on-device',
        sender: 'system',
        timestamp: Date.now(),
      }
    ]);
  }

Apply the identical guard to switchToPC:

  if (messages.length > 0) {
    setMessages(prev => [
      ...prev,
      {
        id: `system-${Date.now()}`,
        text: `switched to ${activePC.name.toLowerCase()}`,
        sender: 'system',
        timestamp: Date.now(),
      }
    ]);
  }

═══════════════════════════════════════════════════
FILE 2 — ChatScreen.tsx
═══════════════════════════════════════════════════

── FIX 3: Computing indicator label ──────────────

In the chat scroll area, find the computing 
indicator:

  <div className="font-mono text-[8.5px] 
    uppercase text-accent opacity-80 mb-2 
    tracking-[0.12em]">local</div>

The label should reflect actual compute source.
Replace with:

  <div className="font-mono text-[8.5px] 
    uppercase text-accent opacity-80 mb-2 
    tracking-[0.12em]">
    {isPCSession && computeSource === 'pc' 
      ? (activePC?.name ?? 'pc') 
      : 'local'}
  </div>

Add computeSource and activePC to ChatScreen's 
useAppStore destructure if not already present.
isPCSession is already destructured.

── FIX 4: AI message byline — show on all 
   AI messages, not just latest ───────────────

Currently the "local" byline only renders when 
isLatestAI is true. This means scrolling up 
shows AI messages with no label.

Find in MessageBubble:

  {!isUser && isLatestAI && (
    <div className="font-mono text-[8.5px] 
      uppercase tracking-[0.12em] mb-2 
      text-accent opacity-80">
      local
    </div>
  )}

Change to show on ALL AI messages, but dim 
non-latest ones:

  {!isUser && (
    <div className={`font-mono text-[8.5px] 
      uppercase tracking-[0.12em] mb-2 
      text-accent transition-opacity
      ${isLatestAI ? 'opacity-80' : 'opacity-30'}`}>
      local
    </div>
  )}

── FIX 5: System message double margin ───────────

The system message bubble has className 
containing "my-4" which adds 16px top AND 
bottom margin. The outer wrapper already 
applies marginTop via the spacing logic.

Find in MessageBubble, system sender branch:

  className="w-full flex justify-center my-4"

Change to:

  className="w-full flex justify-center"

The outer div's marginTop handles spacing.
The bottom margin is no longer needed either 
since subsequent messages have their own marginTop.

── FIX 6: Textarea auto-resize ───────────────────

The textarea needs to grow with content.

In InputArea, find the textarea element.
Add an onInput handler and a useEffect to 
set height on mount:

  const textareaRef = inputRef; // inputRef is 
  // already passed in and attached to textarea

  // Auto-resize function
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = 
      Math.min(el.scrollHeight, 120) + 'px';
  };

Add onInput={autoResize} to the textarea.

Also add a useEffect in InputArea:

  useEffect(() => {
    autoResize();
  }, [inputText]);

Remove the fixed style={{ overflowY: 'auto' }} 
from the textarea — replace with:

  style={{ 
    overflowY: inputText.split('\n').length > 4 
      ? 'auto' 
      : 'hidden' 
  }}

This way the textarea grows silently up to 
max-h-[120px] then scrolls internally.

── FIX 7: Edit flow — simulate re-generation ─────

In MessageBubble, the edit confirm onClick:

  onClick={() => {
    if (editVal.trim().length === 0) return;
    setOverlay('editingMessageId', null);
    setMessages(prev => {
      const idx = prev.findIndex(m => m.id === msg.id);
      if (idx === -1) return prev;
      const newMsgs = prev.slice(0, idx + 1);
      newMsgs[idx] = { ...newMsgs[idx], text: editVal };
      return newMsgs;
    });
    // In a real app we'd trigger re-generation here
  }}

Replace with:

  onClick={() => {
    if (editVal.trim().length === 0) return;
    setOverlay('editingMessageId', null);
    
    setMessages(prev => {
      const idx = prev.findIndex(m => m.id === msg.id);
      if (idx === -1) return prev;
      const newMsgs = prev.slice(0, idx + 1);
      newMsgs[idx] = { ...newMsgs[idx], text: editVal };
      return newMsgs;
    });

    // Simulate re-generation after edit
    setIsComputing(true);
    setTimeout(() => {
      if (!isComputingRef.current) return;
      const aiMsg: Message = {
        id: `regen-${Date.now()}`,
        text: 'This is a regenerated response based on your edited message.',
        sender: 'local',
        timestamp: Date.now(),
        responseTime: '0.9s',
        tokensPerSecond: '41 tok/s',
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsComputing(false);
    }, 1800);
  }}

For this to work, MessageBubble needs access to 
setIsComputing and isComputingRef. 
Add to MessageBubble's useAppStore destructure:
  const { ..., setIsComputing, isComputing } = 
    useAppStore();

Add a local ref inside MessageBubble:
  const isComputingRef = useRef(isComputing);
  useEffect(() => {
    isComputingRef.current = isComputing;
  }, [isComputing]);

── FIX 8: Scroll pill — show whenever 
   not near bottom ────────────────────────────

Currently scrollPill only triggers the pill 
when combined with hasNewMessage.

Find:

  {scrollPill && hasNewMessage && (

Change to:

  {scrollPill && (

This shows the scroll pill whenever the user 
has scrolled up, regardless of new messages.
The pill already disappears when near bottom 
via handleScroll setting scrollPill to false.

── FIX 9: Placeholder cursor blink ───────────────

The `<style>` tag already exists in Header.
Add a second keyframe there for the cursor:

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

Then in the textarea placeholder, we can't 
directly animate placeholder text. Instead, 
show a fake cursor when the textarea is empty 
and unfocused.

Replace the textarea placeholder approach:
Remove placeholder="ask anything_" from textarea.

Add a sibling element rendered when 
inputText is empty AND not focused:

  {!inputText && !focused && (
    <div className="absolute left-[18px] 
      top-1/2 -translate-y-1/2 
      pointer-events-none flex items-center">
      <span className="font-mono text-[12px] 
        text-text-subtle tracking-[0.03em]">
        ask anything
      </span>
      <span 
        className="font-mono text-[12px] 
          text-text-subtle ml-[1px]"
        style={{ 
          animation: 'blink 1.1s step-end infinite' 
        }}
      >
        _
      </span>
    </div>
  )}

The textarea's positioning context is 
already relative. The fake placeholder sits 
on top until the user starts typing.

Move the `<style>` tag with the keyframes 
from Header into a shared location — either 
keep it in Header (it's global once injected) 
or add a second `<style>` tag inside InputArea. 
Both work since injected styles are global.

═══════════════════════════════════════════════════
FILE 3 — OverlayManager.tsx
═══════════════════════════════════════════════════

── FIX 10: New chat — wire SlideMenu action ──────

In SlideMenu, add newChat to useAppStore 
destructure:

  const { setOverlay, pcDevices, usePC, 
    setUsePC, activePCId, setActivePCId, 
    messages, newChat } = useAppStore();

Find the "new chat" MenuAction:

  <MenuAction icon={Plus} label="new chat" 
    onClick={() => {}} />

Replace with:

  <MenuAction 
    icon={Plus} 
    label="new chat" 
    onClick={() => {
      newChat();
      setOverlay('menuOpen', false);
    }} 
  />

── FIX 11: Recent chats — show all 
   conversations + make tappable ─────────────

In SlideMenu, add conversations to destructure:
  const { ..., conversations } = useAppStore();

Find the recent section:

  <div className="flex flex-col mt-1">
    {messages.length === 0 ? (
      <div ...>no conversations yet</div>
    ) : (
      <div className="p-[9px_20px] ...">
        <div ...>{messages[0].text}</div>
        <div ...>today · balanced</div>
      </div>
    )}
  </div>

Replace entirely with:

  <div className="flex flex-col mt-1">
    {conversations.length === 0 && 
     messages.length === 0 ? (
      <div className="font-mono text-[11px] 
        text-text-subtle text-center p-[20px]">
        no conversations yet
      </div>
    ) : (
      <>
        {/* Current conversation if it has 
            messages — shown at top */}
        {messages.length > 0 && (
          <div 
            className="p-[9px_20px] 
              hover:bg-bg-surface transition-colors 
              cursor-pointer flex flex-col gap-1 
              border-l-[2px] border-accent"
            onClick={() => 
              setOverlay('menuOpen', false)
            }
          >
            <div className="font-sans text-[13px] 
              font-light text-text-secondary truncate">
              {messages.find(m => 
                m.sender === 'user')?.text ?? 
                'new conversation'}
            </div>
            <div className="font-mono text-[9px] 
              text-accent">
              now
            </div>
          </div>
        )}

        {/* Past conversations */}
        {conversations.slice(0, 5).map(conv => (
          <div
            key={conv.id}
            className="p-[9px_20px] 
              hover:bg-bg-surface transition-colors 
              cursor-pointer flex flex-col gap-1
              border-l-[2px] border-transparent"
            onClick={() => {
              // Load this conversation
              // In prototype: just close menu
              // Real app would restore messages
              setOverlay('menuOpen', false);
            }}
          >
            <div className="font-sans text-[13px] 
              font-light text-text-secondary truncate">
              {conv.title}
            </div>
            <div className="font-mono text-[9px] 
              text-text-subtle">
              {new Date(conv.createdAt)
                .toLocaleDateString([], { 
                  month: 'short', 
                  day: 'numeric' 
                })} · {conv.mode}
            </div>
          </div>
        ))}
      </>
    )}
  </div>

── FIX 12: Compute toggle label ──────────────────

In SlideMenu, find:

  <span className="font-mono text-[9px] 
    uppercase tracking-[0.14em] 
    text-text-subtle">compute</span>

Change to:

  <span className="font-mono text-[9px] 
    uppercase tracking-[0.14em] 
    text-text-subtle">use pc</span>

── FIX 13: Settings — wire clear conversations ───

In SettingsScreen, add setMessages and newChat 
to destructure (or just setMessages):
  const { ..., setMessages, setConversations,
    conversations } = useAppStore();

Add setConversations to AppState interface 
and to the context value in store.tsx:

  setConversations: React.Dispatch
    React.SetStateAction<Conversation[]>
  >;

In the provider value add:
  setConversations,

Then in SettingsScreen, find:

  <Row className="text-[#FF5555] cursor-pointer">
    <span className="font-mono text-[13px]">
      clear all conversations
    </span>
  </Row>

Replace with:

  <Row 
    className="cursor-pointer"
    onClick={() => {
      setMessages([]);
      setConversations([]);
      setOverlay('settingsOpen', false);
    }}
  >
    <span className="font-mono text-[13px] 
      text-[#FF5555]">
      clear all conversations
    </span>
  </Row>

── FIX 14: MessageActionSheet — remove 
   non-functional regenerate or wire it ──────

In MessageActionSheet, find:

  {!isUser && 
    <ActionRow 
      icon={RefreshCcw} 
      label="regenerate" 
      disabled={isComputing} 
      onClick={() => 
        setOverlay('activeMessageId', null)
      } 
    />
  }

Replace with:

  {!isUser && (
    <ActionRow 
      icon={RefreshCcw} 
      label="regenerate" 
      disabled={isComputing} 
      onClick={() => {
        setOverlay('activeMessageId', null);
        // Remove this AI message and 
        // re-trigger generation
        setMessages(prev => {
          const idx = prev.findIndex(
            m => m.id === overlays.activeMessageId
          );
          if (idx === -1) return prev;
          return prev.slice(0, idx);
        });
        setIsComputing(true);
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: `regen-${Date.now()}`,
              text: 'This is a regenerated response.',
              sender: 'local',
              timestamp: Date.now(),
              responseTime: '1.1s',
              tokensPerSecond: '38 tok/s',
            }
          ]);
          setIsComputing(false);
        }, 1800);
      }} 
    />
  )}

Add setIsComputing to MessageActionSheet's 
useAppStore destructure.

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

WelcomeScreen — unchanged.
App.tsx — unchanged.
Glyph — unchanged.
All spring/animation values — unchanged.
All color tokens — unchanged.
All PC session logic — unchanged.
Models screen — unchanged.
QRPairingScreen — unchanged.
PCSessionDropdown — unchanged.
ModeDropdown — unchanged.
Header — unchanged (except the blink keyframe 
  addition which is additive only).
All existing store actions — unchanged.
All existing overlay logic — unchanged.

Files that change:
  store.tsx — Conversation type, conversations 
    state, newChat action, setConversations, 
    message guards in switchToPhone/switchToPC
  ChatScreen.tsx — computing label, AI byline, 
    system message margin, textarea auto-resize, 
    edit re-generation, scroll pill condition, 
    placeholder cursor
  OverlayManager.tsx — new chat wiring, recent 
    chats list, compute toggle label, clear 
    conversations, regenerate action