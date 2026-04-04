One targeted change only. Touch nothing except 
the Header component in ChatScreen.tsx.

═══════════════════════════════════════════════════
CHANGE — HEADER: MOVE PILL TO CENTRE SLOT
(ChatScreen.tsx — Header component only)
═══════════════════════════════════════════════════

Currently during a PC session:
  Left:   hamburger
  Centre: empty spacer (w-10 h-10 div)
  Right:  pill (device name · tier)

Change to:
  Left:   hamburger
  Centre: pill (device name only)
  Right:  dim monitor icon (same as paired-not-session)

── CENTRE SLOT ────────────────────────────────────

Replace the current isPCSession conditional 
in the centre slot:

  Current:
    {isPCSession ? (
      <div className="w-10 h-10" />
    ) : (
      <button ... phone mode selector ...>
    )}

  Replace with:
    {isPCSession ? (
      <motion.button
        key="pc-pill-centre"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ 
          type: 'spring', stiffness: 300, damping: 28 
        }}
        onClick={togglePCDropdown}
        className="flex items-center gap-[5px] 
          bg-[rgba(200,185,138,0.08)] 
          border border-[rgba(200,185,138,0.18)] 
          rounded-full px-[10px] h-[30px] 
          cursor-pointer whitespace-nowrap"
      >
        <AnimatePresence>
          {isComputing && (
            <motion.div
              key="pulse-dot"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="w-[4px] h-[4px] bg-accent 
                rounded-full shrink-0"
              style={{ 
                animation: 'pulse 1.2s ease-in-out 
                  infinite' 
              }}
            />
          )}
        </AnimatePresence>

        <Monitor className="w-[11px] h-[11px] 
          text-accent shrink-0" />

        <span className="font-mono text-[10px] 
          text-accent tracking-[0.02em] 
          max-w-[120px] overflow-hidden 
          text-ellipsis whitespace-nowrap">
          {activePC?.name ?? 'your pc'}
        </span>

        <ChevronDown className="w-[9px] h-[9px] 
          text-accent opacity-50 shrink-0" />
      </motion.button>
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

── RIGHT SLOT ─────────────────────────────────────

During PC session the right slot should show 
the dim monitor icon — same as the 
"paired but not session" state. This gives 
the header a visual anchor on the right 
without the pill being there.

In the right slot AnimatePresence, the 
isPCSession pill branch currently renders 
the expanded pill. Remove that branch entirely.

The right slot should now only have two states:

  1. PC paired (isPCSession OR isPaired): 
     dim monitor icon
  2. No PC at all: empty div

  Update the right slot to:

  <div className="flex items-center justify-end 
    w-10 h-10 relative">
    <AnimatePresence mode="wait">

      {/* PC PAIRED: dim monitor icon */}
      {(isPCSession || isPaired) && (
        <motion.div
          key="pc-icon-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex 
            items-center justify-center"
        >
          <Monitor className="w-[15px] h-[15px] 
            text-text-subtle opacity-40" />
        </motion.div>
      )}

      {/* NO PC: empty */}
      {!isPCSession && !isPaired && (
        <div key="empty" className="w-10 h-10" />
      )}

    </AnimatePresence>
  </div>

── PILL CONTENT ───────────────────────────────────

The centre pill shows device name only.
No tier. No " · balanced" suffix.

Just: {activePC?.name ?? 'your pc'}

Keep max-w-[120px] and the ellipsis truncation 
— long device names still need to be clipped.

── WHAT STAYS THE SAME ────────────────────────────

The pill's visual style — background, border, 
radius, height, gap, Monitor icon, ChevronDown, 
pulse dot behaviour — all identical to the 
right-side pill that was there before.

The pill still opens togglePCDropdown on click.

The PCSessionDropdown anchors to 
top-[68px] right-[16px] — no change needed 
there, it will still appear top-right and 
that's correct for a centre-triggered dropdown.

Phone mode selector — unchanged.
All other components — unchanged.