You are refining LocalAI v3. Apply targeted changes only.
Do not rebuild from scratch. Architecture stays identical.

─── CHANGE 1: REMOVE STATUS BAR ENTIRELY ───────────────────

Delete the <StatusBar /> component and its render call 
in ChatScreen completely.

All the information it contained moves to two places:

A) PC compute indicator — in the Header, right slot:
   Currently the right slot is a dead <div className="w-10 h-10" />
   
   Replace it with a conditional PC indicator:
   
   const { device, isComputing } = useAppStore();
   const showPCIndicator = device?.connected && isComputing;
   
   When showPCIndicator is true:
   - Show a Monitor icon (lucide, 15px, text-text-subtle)
   - With a small amber dot (4px) positioned 
     top-right of the icon, absolute
   - Entire element: w-10 h-10, flex items-center 
     justify-center, relative
   - Entry animation: opacity 0→1, scale 0.8→1, 
     200ms ease-out
   - Exit animation: opacity 1→0, 100ms
   - Wrap in AnimatePresence
   
   When showPCIndicator is false: 
   - Render empty <div className="w-10 h-10" /> 
     (preserves header balance)
   - No icon, no text, nothing

   This means: phone-only mode = completely clean header.
   PC computing = subtle monitor icon appears top right.
   That's the only signal needed.

B) Mode — stays in header center (already there, keep as-is)

─── CHANGE 2: HEADER SUBLABEL REMOVAL ──────────────────────

In Header component, remove the sublabel line entirely:
DELETE: 
<div className="font-mono text-[9px] tracking-[0.12em] 
  uppercase text-text-subtle">
  conversation mode
</div>

The mode name alone is sufficient. The dropdown's own 
header label provides context when opened.

Header center button now shows only:
{mode} + ChevronDown icon
Single line, font-mono 13px font-medium text-text-primary

─── CHANGE 3: SENDER LABELS — REMOVE "you", FADE "local" ───

In MessageBubble:

For USER messages:
Remove the "you" label entirely.
The right-alignment and bubble style is sufficient 
visual cue — same convention as iMessage, WhatsApp, 
Claude.ai. No label needed.

For AI messages:
Keep the "local" label BUT make it ephemeral:
- Show "local" label only for the most recent 
  AI message (last message where sender === 'local')
- For all older AI messages: no label shown
- Implementation: pass a prop isLatestAI: boolean 
  to MessageBubble. True only for the last AI message.
  
  In the messages.map():
  const lastAIIndex = [...messages].reverse()
    .findIndex(m => m.sender === 'local');
  const lastAIId = lastAIIndex >= 0 
    ? messages[messages.length - 1 - lastAIIndex].id 
    : null;
  
  <MessageBubble 
    key={msg.id} 
    msg={msg} 
    isLatestAI={msg.id === lastAIId}
  />

Also applies to the computing indicator — 
it already has the "local" label above it, keep that.

─── CHANGE 4: MESSAGE METADATA — PROGRESSIVE DISCLOSURE ────

In MessageBubble, for AI messages:

Default state (always visible):
- Timestamp only: mono 8.5px text-subtle

Hidden state (revealed on tap of timestamp):
- Response time + tok/s appear inline after timestamp
- Animate in: opacity 0→1, x: -4→0, 200ms ease

Implementation:
const [showMeta, setShowMeta] = useState(false);

Timestamp row becomes:
<div 
  className="mt-1.5 flex items-center gap-1.5 
    font-mono text-[8.5px] text-text-subtle cursor-pointer"
  onClick={() => setShowMeta(prev => !prev)}
>
  <span>{formattedTime}</span>
  <AnimatePresence>
    {showMeta && msg.responseTime && (
      <motion.span
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -4 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-1.5"
      >
        <span className="text-text-subtle">·</span>
        <span className="text-text-secondary">
          {msg.responseTime}
        </span>
        <span className="text-text-subtle">·</span>
        <span className="text-text-secondary">
          {msg.tokensPerSecond}
        </span>
      </motion.span>
    )}
  </AnimatePresence>
</div>

User messages: timestamp stays as-is, no tap interaction, 
no meta to reveal.

─── CHANGE 5: EMPTY STATE SIMPLIFICATION ───────────────────

In the empty state (messages.length === 0):

Remove: "what's on your mind?" text entirely
Keep: Glyph at size 40, centered
Keep: suggestion chips below

New structure:
<div className="flex-1 flex flex-col items-center 
  justify-center m-auto max-w-[280px] gap-6">
  <Glyph size={40} />
  <div className="flex flex-col gap-2 w-full">
    {chips...}
  </div>
</div>

The glyph breathing animation is sufficient ambient 
signal. The chips explain themselves. No heading needed.

─── CHANGE 6: PC INDICATOR — STORE AWARENESS ───────────────

In store.tsx, add a derived convenience:
The Header needs to know if PC is actively being used 
for the current computation.

Add to store state:
computeSource: 'phone' | 'pc' — defaults to 'phone'

In the simulated handleSend in ChatScreen:
When device?.connected is true, set computeSource to 'pc' 
at start of computation, back to 'phone' when done.

In stopComputing: also reset computeSource to 'phone'.

Header then reads computeSource directly:
const showPCIndicator = computeSource === 'pc';

This is cleaner than combining device.connected + isComputing.

─── CHANGE 7: HEADER BORDER SOFTENING ──────────────────────

The header border-bottom border-borders creates a hard 
visual line that separates the header too aggressively 
from the content.

Change header border:
From: border-b border-borders (#1E1E1E solid)
To: border-b border-[rgba(255,255,255,0.04)]

Same treatment for the date separator lines:
From: bg-borders
To: bg-[rgba(255,255,255,0.06)]

This makes the interface feel more like one continuous 
surface rather than stacked boxes.

─── CHANGE 8: INPUT AREA — REMOVE BORDER ON UNFOCUSED ──────

Currently the input pill has a visible border even when 
unfocused: border-[#252525].

This creates a box that draws attention even when idle.

Change unfocused state:
border-transparent (no visible border)
background stays bg-bg-surface

Focus state remains:
border-[#333] + glow shadow

This makes the input feel integrated into the screen 
rather than a separate element when not in use.
The contrast between idle (borderless) and focused 
(bordered + glow) makes the focus state feel more 
meaningful.

─── CHANGE 9: MESSAGE SPACING REFINEMENT ───────────────────

Current gap-[24px] between messages works but 
user→AI transitions need more breathing room than 
AI→user transitions to create visual grouping.

Replace uniform gap with contextual spacing:

In the messages.map(), between consecutive messages:
- Same sender as previous: gap 16px (tight grouping)
- Different sender: gap 28px (clear turn change)

Implementation: wrap each MessageBubble in a div 
with dynamic margin-top:

{messages.map((msg, i) => {
  const prev = messages[i - 1];
  const sameSender = prev?.sender === msg.sender;
  return (
    <div 
      key={msg.id} 
      style={{ marginTop: i === 0 ? 0 : sameSender ? 16 : 28 }}
    >
      <MessageBubble msg={msg} isLatestAI={...} />
    </div>
  );
})}

Remove the gap-[24px] from the container, 
use gap-0 instead (spacing now handled per-item).

─── CHANGE 10: COMPUTING INDICATOR REFINEMENT ──────────────

Current computing state shows dots + "computing" text.
The "computing" label is redundant with the dots.

Remove "computing" text label entirely.
Keep: three amber bouncing dots only.
Increase dot size slightly: 5px instead of 4px.
Increase gap between dots: gap-[4px] instead of gap-[2px].

The dots alone are universally understood as "thinking."
The label adds no information.

─── DO NOT CHANGE ───────────────────────────────────────────

- All existing spring animation values
- QR pairing flow (all three steps)  
- Message action sheet (long press, drag dismiss)
- Inline message editing (double tap)
- Scroll-to-bottom pill
- Mode dropdown overlay
- Slide menu structure
- Settings screen
- All color tokens
- Font definitions
- Safe area insets pt-[59px] pb-[34px]
- Send/stop button behavior
- Welcome screen

─── PHILOSOPHY NOTE FOR THIS ITERATION ─────────────────────

The guiding principle is: only show information when 
it changes user behavior or understanding.

- PC icon: only when PC is actually computing (changes 
  understanding of where computation is happening)
- "local" label: only on latest AI message 
  (reminds user of source without repeating it)
- Performance meta: only on tap 
  (available for curious users, hidden for everyone else)
- "computing" text: removed 
  (the dots already communicate this universally)
- Status bar: removed 
  (it was always-on information that rarely changed)

Every element that remains should either:
1. Be directly interactive, OR
2. Change state frequently enough to warrant 
   permanent screen real estate

If it does neither, it should be hidden by default.