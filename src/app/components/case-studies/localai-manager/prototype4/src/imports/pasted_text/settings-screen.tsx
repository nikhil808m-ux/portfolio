One file changes: OverlayManager.tsx.
Replace SettingsScreen, Section, and Row 
components entirely. Read the full file 
before starting. Touch nothing outside 
these three components.

═══════════════════════════════════════════════════
IMPORTS — add to existing lucide import line
═══════════════════════════════════════════════════

Add Download to the existing lucide import.
The line currently ends with ...Info, Check }.
Add Download to that list.

═══════════════════════════════════════════════════
REPLACE: Section component
═══════════════════════════════════════════════════

Find and replace the entire Section component:

OLD:
const Section = ({ title, children }: any) => (
  <div className="mb-6">
    <div className="font-mono text-[9px] 
      uppercase tracking-[0.14em] 
      text-text-subtle mb-2 px-2">
      {title}
    </div>
    <div className="flex flex-col">{children}</div>
  </div>
);

NEW:
const Section = ({ title, children }: any) => (
  <div className="mb-8">
    <div className="font-mono text-[9px] 
      uppercase tracking-[0.14em] 
      text-text-subtle mb-3 px-1">
      {title}
    </div>
    <div className="flex flex-col 
      border border-borders rounded-[12px] 
      overflow-hidden">
      {children}
    </div>
  </div>
);

═══════════════════════════════════════════════════
REPLACE: Row component
═══════════════════════════════════════════════════

OLD:
const Row = ({ children, className = '', 
  onClick }: any) => (
  <div 
    className={`flex items-center 
      justify-between p-[12px_8px] 
      border-b border-borders 
      hover:bg-bg-surface transition-colors 
      rounded-sm ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

NEW:
const Row = ({ children, className = '', 
  onClick, interactive = true }: any) => (
  <div 
    className={`flex items-center 
      justify-between p-[14px_16px] 
      border-b border-[#1A1A1A] last:border-0
      transition-colors
      ${interactive && onClick 
        ? 'cursor-pointer hover:bg-bg-surface' 
        : ''}
      ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

The interactive prop defaults true but 
only applies hover styles when onClick 
is also provided. Static rows get no hover.

═══════════════════════════════════════════════════
REPLACE: SettingsScreen component entirely
═══════════════════════════════════════════════════

Replace from:
  const SettingsScreen = () => {
to just before:
  const Section = ...

With the following:

const SettingsScreen = () => {
  const { 
    setOverlay, 
    internetFetch, 
    setInternetFetch, 
    pcDevices, 
    setPCDevices, 
    activePCId, 
    setActivePCId,
    setUsePC,
    setMessages, 
    setConversations,
    models,
  } = useAppStore();

  // Tap-to-confirm state for clear action
  const [clearPending, setClearPending] = 
    useState(false);
  const clearTimerRef = useRef
    ReturnType<typeof setTimeout> | null
  >(null);

  const handleClearTap = () => {
    if (clearPending) {
      // Second tap — execute
      if (clearTimerRef.current) 
        clearTimeout(clearTimerRef.current);
      setMessages([]);
      setConversations([]);
      setClearPending(false);
      setOverlay('settingsOpen', false);
    } else {
      // First tap — arm
      setClearPending(true);
      clearTimerRef.current = setTimeout(() => {
        setClearPending(false);
      }, 3000);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (clearTimerRef.current)
        clearTimeout(clearTimerRef.current);
    };
  }, []);

  const canAddMore = pcDevices.length < 3;

  return (
    <motion.div
      className="absolute inset-0 z-50 
        bg-bg-primary flex flex-col pt-[59px]"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30 
      }}
    >
      {/* Header — consistent with ModelsScreen */}
      <div className="h-[60px] flex items-center 
        justify-between px-4 shrink-0 
        border-b border-borders">
        <button 
          className="flex items-center gap-2"
          onClick={() => 
            setOverlay('settingsOpen', false)
          }
        >
          <ArrowLeft className="w-[18px] h-[18px] 
            text-text-primary" />
        </button>
        <span className="font-mono text-[14px] 
          font-medium text-text-primary">
          settings
        </span>
        <div className="w-[18px]" />
      </div>

      <div className="flex-1 overflow-y-auto 
        px-4 pt-6 pb-12">

        {/* ── PRIVACY ── */}
        <Section title="privacy">

          {/* Web access toggle */}
          <Row interactive={true} onClick={undefined}>
            <div className="flex flex-col gap-[3px]">
              <span className="font-mono text-[13px] 
                text-text-primary">
                allow web access
              </span>
              <span className="font-mono text-[10px] 
                text-text-subtle leading-[1.5]">
                model may fetch current info
              </span>
            </div>
            <div 
              className={`w-[36px] h-[20px] 
                rounded-full p-[2px] cursor-pointer 
                transition-colors flex shrink-0 ml-4
                ${internetFetch 
                  ? 'bg-accent justify-end' 
                  : 'bg-bg-elevated justify-start'}`}
              onClick={() => 
                setInternetFetch(!internetFetch)
              }
            >
              <motion.div layout 
                className="w-[16px] h-[16px] 
                  bg-[#000] rounded-full" />
            </div>
          </Row>

          {/* Export */}
          <Row 
            onClick={() => {
              // Prototype: toast only
              // Real: trigger file export
            }}
          >
            <span className="font-mono text-[13px] 
              text-text-primary">
              export conversations
            </span>
            <Download className="w-[15px] h-[15px] 
              text-text-subtle" />
          </Row>

          {/* Clear all — tap twice to confirm */}
          <Row onClick={handleClearTap}>
            <div className="flex flex-col gap-[3px]">
              <span className="font-mono text-[13px] 
                text-[#FF5555]">
                clear all conversations
              </span>
              <AnimatePresence>
                {clearPending && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-mono text-[10px] 
                      text-[#FF5555] opacity-70"
                  >
                    tap again to confirm
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Row>

        </Section>

        {/* ── DEVICE ── */}
        <Section title="device">

          {pcDevices.length === 0 ? (

            <Row 
              onClick={() => { 
                setOverlay('settingsOpen', false); 
                setTimeout(() => 
                  setOverlay('qrOpen', true)
                , 200);
              }}
            >
              <span className="font-mono text-[13px] 
                text-text-primary">
                pair a pc
              </span>
              <ChevronRight className="w-[15px] 
                h-[15px] text-text-subtle" />
            </Row>

          ) : (
            <>
              {pcDevices.map(pc => {
                // Count models for this PC
                const modelCount = pc.models?.length 
                  ?? 0;
                
                return (
                  <div 
                    key={pc.id}
                    className="p-[14px_16px] 
                      border-b border-[#1A1A1A] 
                      last:border-0"
                  >
                    <div className="flex items-center 
                      justify-between">
                      <div className="flex items-center 
                        gap-3">
                        <Monitor className="w-[15px] 
                          h-[15px] text-text-subtle 
                          shrink-0" />
                        <div className="flex flex-col 
                          gap-[3px]">
                          <span className="font-mono 
                            text-[13px] 
                            text-text-primary">
                            {pc.name}
                          </span>
                          <span className="font-mono 
                            text-[10px] text-text-subtle">
                            {modelCount > 0 
                              ? `${modelCount} model${modelCount !== 1 ? 's' : ''} · ` 
                              : ''}
                            <span className={
                              pc.connected 
                                ? 'text-accent' 
                                : 'text-[#5C5A57]'
                            }>
                              {pc.connected 
                                ? 'online' 
                                : 'offline'}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Unpair button */}
                      <button
                        className="font-mono text-[11px] 
                          text-[#FF5555] 
                          border border-[rgba(255,85,85,0.2)] 
                          rounded-[8px] 
                          px-[10px] py-[5px]
                          hover:bg-[rgba(255,85,85,0.08)] 
                          transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          const remaining = 
                            pcDevices.filter(
                              p => p.id !== pc.id
                            );
                          setPCDevices(remaining);
                          if (activePCId === pc.id) {
                            if (remaining.length === 0) {
                              setActivePCId(null);
                              setUsePC(false);
                            } else {
                              setActivePCId(
                                remaining[0].id
                              );
                            }
                          }
                        }}
                      >
                        unpair
                      </button>
                    </div>
                  </div>
                );
              })}

              {canAddMore && (
                <Row 
                  onClick={() => { 
                    setOverlay('settingsOpen', false); 
                    setTimeout(() => 
                      setOverlay('qrOpen', true)
                    , 200);
                  }}
                >
                  <span className="font-mono 
                    text-[13px] text-text-primary">
                    pair new device
                  </span>
                  <ChevronRight className="w-[15px] 
                    h-[15px] text-text-subtle" />
                </Row>
              )}
            </>
          )}

        </Section>

        {/* ── ABOUT ── */}
        <Section title="about">
          <Row interactive={false}>
            <span className="font-mono text-[12px] 
              text-text-subtle">
              version
            </span>
            <span className="font-mono text-[12px] 
              text-text-subtle">
              0.1.0
            </span>
          </Row>
        </Section>

      </div>
    </motion.div>
  );
};

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

MessageActionSheet — unchanged.
ActionRow — unchanged.
All other overlay components — unchanged.
Store — unchanged.
ChatScreen — unchanged.
All animation values — unchanged.
All color tokens — unchanged.

The only things that change in this file:
  1. lucide import line (add Download)
  2. Section component (replaced)
  3. Row component (replaced, adds interactive prop)
  4. SettingsScreen component (replaced entirely)
