One file changes: OverlayManager.tsx.
SlideMenu component only. Read the full 
file before starting. Touch nothing else.

═══════════════════════════════════════════════════
REWRITE: SlideMenu component
═══════════════════════════════════════════════════

Replace the entire SlideMenu component 
with the following. Keep MenuAction unchanged.

The menu has 4 zones:
  Zone 1 — brand header   — shrink-0, fixed
  Zone 2 — actions        — shrink-0, fixed
  Zone 3 — recent         — flex-1 min-h-0, 
                            scrollable only
  Zone 4 — compute        — shrink-0, fixed 
                            bottom, content 
                            depends on state

── COMPUTE ZONE — 3 STATES ───────────────────────

Derive these from store values:

  const noPCPaired = pcDevices.length === 0;
  const hasPCPaired = pcDevices.length > 0;
  const displayedPCs = pcDevices.slice(0, 3);
  const canAddMore = pcDevices.length < 3;
  const toggleWillInterrupt = 
    isComputing && computeSource === 'pc' && usePC;

STATE A — noPCPaired:
  Render a single borderless row that opens 
  QR pairing. No toggle. No section header.
  No device list. No italic hint.

  <div className="shrink-0 border-t 
    border-borders">
    <div
      className="flex items-center 
        justify-between p-[14px_20px] 
        cursor-pointer hover:bg-bg-surface 
        transition-colors"
      onClick={() => {
        setOverlay('menuOpen', false);
        setTimeout(() => 
          setOverlay('qrOpen', true), 200);
      }}
    >
      <div className="flex items-center gap-3">
        <Monitor className="w-[14px] h-[14px] 
          text-text-subtle" />
        <span className="font-mono text-[12px] 
          text-text-secondary">
          extend with pc
        </span>
      </div>
      <ChevronRight className="w-[13px] 
        h-[13px] text-text-subtle" />
    </div>
    <div className="h-[20px]" />
  </div>

STATE B + C — hasPCPaired:
  Show the full compute zone with toggle, 
  device rows, and conditional add pc.

  <div className="shrink-0 border-t 
    border-borders">

    {/* Toggle row */}
    <div className="flex items-center 
      justify-between p-[14px_20px_8px]">
      <span className="font-mono text-[9px] 
        uppercase tracking-[0.14em] 
        text-text-subtle">
        use pc
      </span>
      <div className="flex flex-col 
        items-end gap-[3px]">
        <div
          className={`w-[32px] h-[18px] 
            rounded-full p-[2px] 
            cursor-pointer 
            transition-colors flex
            ${usePC 
              ? 'bg-accent justify-end' 
              : 'bg-bg-elevated justify-start'}
            ${toggleWillInterrupt 
              ? 'ring-1 ring-[#FF5555] 
                 ring-opacity-60' 
              : ''}`}
          onClick={() => setUsePC(!usePC)}
        >
          <motion.div layout 
            className="w-[14px] h-[14px] 
              bg-[#000] rounded-full" />
        </div>
        {toggleWillInterrupt && (
          <span className="font-mono text-[8px] 
            text-[#FF5555] opacity-70">
            stops response
          </span>
        )}
      </div>
    </div>

    {/* Device rows — always visible when 
        PC is paired, dimmed when usePC off */}
    <div className={`flex flex-col 
      transition-opacity duration-200
      ${!usePC 
        ? 'opacity-40 pointer-events-none' 
        : ''}`}>
      {displayedPCs.map(pc => {
        const isActive = pc.id === activePCId;
        const canSelect = pc.connected;
        return (
          <div
            key={pc.id}
            className={`flex items-center 
              justify-between p-[10px_20px] 
              transition-colors
              ${canSelect 
                ? 'cursor-pointer hover:bg-bg-surface' 
                : 'cursor-default'}`}
            onClick={() => {
              if (canSelect) setActivePCId(pc.id);
            }}
          >
            <div className="flex items-center">
              <Monitor className="w-[14px] 
                h-[14px] text-text-subtle mr-3" />
              <div className="flex flex-col">
                <span className={`font-mono 
                  text-[12px] 
                  ${isActive && canSelect 
                    ? 'text-text-primary' 
                    : 'text-text-secondary'}`}>
                  {pc.name}
                </span>
                <span className={`font-mono 
                  text-[9px] 
                  ${pc.connected 
                    ? 'text-accent' 
                    : 'text-[#5C5A57]'}`}>
                  {pc.connected 
                    ? 'online' 
                    : 'offline'}
                </span>
              </div>
            </div>
            {isActive ? (
              <div className={`w-[6px] h-[6px] 
                rounded-full
                ${pc.connected 
                  ? 'bg-accent shadow-[0_0_6px_rgba(200,185,138,0.5)]' 
                  : 'bg-[#3A3A3A]'}`} />
            ) : (
              <div className="w-[6px] h-[6px] 
                border border-[#3A3A3A] 
                rounded-full" />
            )}
          </div>
        );
      })}

      {/* Add PC — only if under cap */}
      {canAddMore && (
        <div
          className="flex items-center gap-3 
            p-[10px_20px] cursor-pointer 
            hover:bg-bg-surface transition-colors"
          onClick={() => {
            setOverlay('menuOpen', false);
            setTimeout(() => 
              setOverlay('qrOpen', true), 200);
          }}
        >
          <Plus className="w-[14px] h-[14px] 
            text-text-subtle" />
          <span className="font-mono text-[12px] 
            text-text-subtle">
            add pc
          </span>
        </div>
      )}
    </div>

    <div className="h-[20px]" />
  </div>

── FULL SlideMenu STRUCTURE ──────────────────────

const SlideMenu = () => {
  const { 
    setOverlay, 
    pcDevices, 
    usePC, 
    setUsePC, 
    activePCId, 
    setActivePCId, 
    messages,
    isComputing,
    computeSource,
  } = useAppStore();

  const noPCPaired = pcDevices.length === 0;
  const displayedPCs = pcDevices.slice(0, 3);
  const canAddMore = pcDevices.length < 3;
  const toggleWillInterrupt = 
    isComputing && 
    computeSource === 'pc' && 
    usePC;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 
        backdrop-blur-[2px] 
        bg-[rgba(0,0,0,0.5)] 
        flex justify-start"
      onClick={() => setOverlay('menuOpen', false)}
    >
      <motion.div
        className="w-[280px] h-full 
          bg-bg-primary border-r border-borders 
          flex flex-col box-border pt-[59px]"
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

        {/* Zone 1 — Brand header */}
        <div className="px-[20px] pb-[20px] 
          border-b border-borders 
          flex flex-col shrink-0">
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

        {/* Zone 2 — Actions */}
        <div className="shrink-0 pt-2 
          border-b border-borders pb-2">
          <div className="font-mono text-[9px] 
            uppercase tracking-[0.14em] 
            text-text-subtle p-[8px_20px_4px]">
            actions
          </div>
          <div className="flex flex-col">
            <MenuAction 
              icon={Plus} 
              label="new chat" 
              onClick={() => {}} 
            />
            <MenuAction 
              icon={HelpCircle} 
              label="models" 
              onClick={() => {
                setOverlay('menuOpen', false);
                setTimeout(() => 
                  setOverlay('modelsOpen', true)
                , 200);
              }} 
            />
            <MenuAction 
              icon={Clock} 
              label="settings" 
              onClick={() => 
                setOverlay('settingsOpen', true)
              } 
            />
          </div>
        </div>

        {/* Zone 3 — Recent (scrollable) */}
        <div 
          className="flex-1 min-h-0 
            overflow-y-auto"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="font-mono text-[9px] 
            uppercase tracking-[0.14em] 
            text-text-subtle p-[14px_20px_4px]">
            recent
          </div>
          <div className="flex flex-col mt-1">
            {messages.length === 0 ? (
              <div className="flex items-center 
                justify-center py-8">
                <span className="font-mono 
                  text-[11px] text-text-subtle 
                  text-center px-[20px]">
                  no conversations yet
                </span>
              </div>
            ) : (
              <div className="p-[9px_20px] 
                hover:bg-bg-surface 
                transition-colors cursor-pointer 
                flex flex-col gap-1 
                border-l-[2px] border-accent">
                <div className="font-sans 
                  text-[13px] font-light 
                  text-text-secondary truncate">
                  {messages.find(
                    m => m.sender === 'user'
                  )?.text ?? ''}
                </div>
                <div className="font-mono 
                  text-[9px] text-accent">
                  now
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zone 4 — Compute (pinned bottom) */}
        {noPCPaired ? (

          /* State A — no PC: single entry point */
          <div className="shrink-0 
            border-t border-borders">
            <div
              className="flex items-center 
                justify-between p-[14px_20px] 
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
              <div className="flex items-center 
                gap-3">
                <Monitor className="w-[14px] 
                  h-[14px] text-text-subtle" />
                <span className="font-mono 
                  text-[12px] text-text-secondary">
                  extend with pc
                </span>
              </div>
              <ChevronRight className="w-[13px] 
                h-[13px] text-text-subtle" />
            </div>
            <div className="h-[20px]" />
          </div>

        ) : (

          /* State B+C — PC paired: 
             full compute zone */
          <div className="shrink-0 
            border-t border-borders">

            <div className="flex items-center 
              justify-between 
              p-[14px_20px_8px]">
              <span className="font-mono 
                text-[9px] uppercase 
                tracking-[0.14em] 
                text-text-subtle">
                use pc
              </span>
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
                         justify-start'}
                    ${toggleWillInterrupt 
                      ? 'ring-1 ring-[#FF5555] 
                         ring-opacity-60' 
                      : ''}`}
                  onClick={() => setUsePC(!usePC)}
                >
                  <motion.div layout 
                    className="w-[14px] h-[14px] 
                      bg-[#000] rounded-full" />
                </div>
                {toggleWillInterrupt && (
                  <span className="font-mono 
                    text-[8px] text-[#FF5555] 
                    opacity-70">
                    stops response
                  </span>
                )}
              </div>
            </div>

            <div className={`flex flex-col 
              transition-opacity duration-200
              ${!usePC 
                ? 'opacity-40 pointer-events-none' 
                : ''}`}>
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
                        : 'cursor-default'}`}
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
                    {isActive ? (
                      <div className={`
                        w-[6px] h-[6px] 
                        rounded-full
                        ${pc.connected 
                          ? 'bg-accent shadow-[0_0_6px_rgba(200,185,138,0.5)]' 
                          : 'bg-[#3A3A3A]'
                        }`} />
                    ) : (
                      <div className="w-[6px] 
                        h-[6px] border 
                        border-[#3A3A3A] 
                        rounded-full" />
                    )}
                  </div>
                );
              })}

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
            </div>

            <div className="h-[20px]" />
          </div>
        )}

      </motion.div>
    </motion.div>
  );
};

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

MenuAction component — unchanged.
All other overlay components — unchanged.
Store — unchanged.
ChatScreen — unchanged.
Everything else — unchanged.