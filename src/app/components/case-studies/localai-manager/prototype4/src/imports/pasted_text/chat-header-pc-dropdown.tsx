Two focused changes only. Read the full existing 
code before touching anything. Do not change 
any component, style, animation, or behaviour 
not explicitly listed below.

═══════════════════════════════════════════════════
CHANGE 1 — HEADER: PILL REPLACES CENTRE SELECTOR
(ChatScreen.tsx — Header component only)
═══════════════════════════════════════════════════

The current header has two interactive elements 
that both open the PC dropdown during a PC session 
(centre mode button + right pill). This is 
redundant. Fix: when isPCSession is true, the 
centre selector disappears entirely and the pill 
expands to carry both jobs — device identity 
and current tier.

── PHONE SESSION (isPCSession = false) ───────────
Header layout: unchanged.
  Left:   hamburger
  Centre: mode selector (phone mode + chevron)
  Right:  dim monitor icon if paired, empty if not

── PC SESSION (isPCSession = true) ───────────────
Header layout changes:
  Left:   hamburger (unchanged)
  Centre: empty — render nothing here
  Right:  expanded pill (now the sole control)

The pill in PC session must show BOTH the device 
name AND the current tier. Update the pill content:

Current pill shows:
  [pulse dot?] [monitor icon] [device name] [∨]

New pill shows:
  [pulse dot?] [monitor icon] [device name · tier] [∨]

Implementation — update the pill's name span:

  Change:
    <span className="font-mono text-[10px] 
      text-accent tracking-[0.02em] 
      max-w-[72px] overflow-hidden text-ellipsis">
      {activePC?.name ?? 'your pc'}
    </span>

  To:
    <span className="font-mono text-[10px] 
      text-accent tracking-[0.02em] 
      max-w-[120px] overflow-hidden text-ellipsis
      whitespace-nowrap">
      {(() => {
        const name = activePC?.name ?? 'your pc';
        // Truncate device name if needed to 
        // keep tier always visible
        const truncated = name.length > 10 
          ? name.slice(0, 10) + '…' 
          : name;
        return `${truncated} · ${pcMode}`;
      })()}
    </span>

  Also: bump max-w from [72px] to [120px] on 
  this span since it now carries more content.

The pill stays right-anchored. Its width will 
grow naturally with the added tier text.
No position change needed — it just gets wider.

── CENTRE SLOT IN PC SESSION ─────────────────────

Replace the current centre button with a 
conditional render:

  {/* Centre — mode selector or empty */}
  {isPCSession ? (
    <div className="w-10 h-10" /> 
    {/* empty spacer to maintain flex layout */}
  ) : (
    <button 
      className="flex flex-col items-center"
      onClick={toggleModeDropdown}
    >
      <div className="flex items-center gap-1 
        font-mono text-[13px] font-medium 
        text-text-primary">
        {mode}
        <ChevronDown className="w-3.5 h-3.5 
          text-text-subtle" />
      </div>
    </button>
  )}

Note: remove the now-unused togglePCDropdown 
call from the centre button. The centre button 
in phone session only ever opens modeDropdownOpen.
openPCDropdown and togglePCDropdown helpers 
can be removed if unused elsewhere — clean up.

── PILL CLICK ALWAYS OPENS PC DROPDOWN ───────────

The pill's onClick stays as togglePCDropdown.
No change needed there — it already does this.

── EDGE CASE: pill width on small screens ─────────

The pill now contains "MacBook Pro · thorough" 
at max — approximately 22 chars at text-[10px] 
mono. At 375px wide (iPhone SE), this is ~132px. 
The header has px-4 (16px each side) + 40px 
hamburger + pill. Total: 16 + 40 + 16 + pill.
That leaves ~303px for the pill — more than enough.
No overflow handling needed beyond the 
existing max-w-[120px] truncation on device name.

═══════════════════════════════════════════════════
CHANGE 2 — PC DROPDOWN: DISCONNECT ACTION
(OverlayManager.tsx — PCSessionDropdown only)
═══════════════════════════════════════════════════

Add a disconnect row to PCSessionDropdown, 
below the existing "conversation is mirrored" 
footer. The footer stays — disconnect sits 
beneath it as a second footer row.

Update PCSessionDropdown to destructure 
disconnectPC from useAppStore:

  const { 
    pcMode, setPCMode, setOverlay, isComputing, 
    activePC, messages, setMessages, disconnectPC 
  } = useAppStore();

── DISCONNECT ROW ─────────────────────────────────

Insert after the existing footer div 
(the "conversation is mirrored" row), 
still inside the rounded dropdown container:

  <div className="h-[1px] bg-[#1A1A1A]" />

  <div
    className={`flex items-center justify-between 
      p-[11px_16px] transition-colors
      ${isComputing 
        ? 'opacity-40 cursor-not-allowed' 
        : 'cursor-pointer hover:bg-[rgba(255,85,85,0.06)]'
      }`}
    onClick={() => {
      if (isComputing) return;
      disconnectPC();
      setOverlay('pcDropdownOpen', false);
    }}
  >
    <span className="font-mono text-[11px] 
      text-[#FF5555] tracking-[0.02em]">
      disconnect {activePC?.name ?? 'pc'}
    </span>
    <svg width="12" height="12" viewBox="0 0 12 12" 
      fill="none">
      <path 
        d="M7.5 4.5L10 7L7.5 9.5M10 7H4M4 2.5H2.5A1 
           1 0 0 0 1.5 3.5V10.5A1 1 0 0 0 2.5 11.5H4" 
        stroke="#FF5555" strokeWidth="1.2" 
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  </div>

The SVG is a logout/disconnect icon — arrow 
exiting a bracket. Keep it inline, no lucide 
dependency needed.

── DISCONNECT WHILE COMPUTING ─────────────────────

When isComputing is true:
  Row renders at opacity-40, cursor-not-allowed.
  onClick does nothing (guarded by if check).
  
  Additionally, show a "computing..." subtext 
  below the disconnect label:

  Replace the label span with a flex-col:

  <div className="flex flex-col gap-[2px]">
    <span className="font-mono text-[11px] 
      text-[#FF5555] tracking-[0.02em]
      ${isComputing ? 'opacity-40' : ''}">
      disconnect {activePC?.name ?? 'pc'}
    </span>
    {isComputing && (
      <span className="font-mono text-[9px] 
        text-text-subtle">
        finish or stop to disconnect
      </span>
    )}
  </div>

This tells the user *why* they can't disconnect 
right now, not just that they can't.

── WHAT DISCONNECT DOES ───────────────────────────

disconnectPC() is already implemented in store:
  - Sets activePC.connected = false
  - Calls stopComputing() if computing
  - Sets computeSource to 'phone'
  - isPCSession becomes false (derived)

The useEffect in ChatScreen already handles:
  - Injecting system message on isPCSession → false
  - "macbook pro disconnected · switching to 
    on-device"

So the full disconnect flow is already wired.
This change only adds the UI trigger.

After disconnectPC():
  - Dropdown closes (setOverlay pcDropdownOpen false)
  - isPCSession flips to false
  - Header pill AnimatePresences out
  - Centre mode selector AnimatePresences in
  - Dim monitor icon appears in right slot
  - System message appears in chat thread
  All of this happens automatically from 
  existing code. No additional wiring needed.

── DISTINCTION: DISCONNECT VS UNPAIR ──────────────

Disconnect (this dropdown) = session ends, 
device stays paired, reconnects automatically 
when available on network again.

Unpair (Settings screen) = permanent removal 
from paired devices list.

The disconnect label copy makes this clear:
"disconnect macbook pro" (not "unpair" or "remove").

Do NOT change the Settings screen unpair behaviour.
These are two different actions.

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

Everything not listed above.

PCSessionDropdown tier rows — unchanged.
PCSessionDropdown header row — unchanged.
PCSessionDropdown "conversation is mirrored" 
  footer — unchanged, disconnect sits below it.
ModeDropdown — unchanged.
SlideMenu — unchanged.
ModelsScreen — unchanged.
All popover logic — unchanged.
All spring values — unchanged.
All color tokens — unchanged.
Store — unchanged.
WelcomeScreen — unchanged.
Glyph — unchanged.
InputArea — unchanged.
MessageBubble — unchanged.
All disconnect/session logic already in store 
  and ChatScreen useEffect — unchanged.
