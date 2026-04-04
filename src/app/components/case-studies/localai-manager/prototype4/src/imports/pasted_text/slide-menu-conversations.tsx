One file changes: OverlayManager.tsx.
Read the full file before starting.

═══════════════════════════════════════════════════
CHANGE 1 — SlideMenu: add conversation 
delete + rename with 3-dot menu
═══════════════════════════════════════════════════

── Step 1: Update SlideMenu destructure ──────────

Find:
  const { 
    setOverlay, 
    pcDevices, 
    usePC, setUsePC, 
    activePCId, setActivePCId, 
    messages, setMessages,
    conversations,
    newChat,
    isComputing, computeSource,
    stopComputing,
  } = useAppStore();

Replace with:
  const { 
    setOverlay, 
    pcDevices, 
    usePC, setUsePC, 
    activePCId, setActivePCId, 
    messages, setMessages,
    conversations, setConversations,
    newChat,
    isComputing, computeSource,
    stopComputing,
  } = useAppStore();

── Step 2: Add local state ───────────────────────

Immediately after the useAppStore 
destructure in SlideMenu, before 
noPCPaired const, add:

  const [convMenuId, setConvMenuId] = 
    useState<string | null>(null);
  const [renamingId, setRenamingId] = 
    useState<string | null>(null);
  const [renameVal, setRenameVal] = 
    useState('');

── Step 3: Close popover when menu closes ────────

In the SlideMenu outer backdrop:
  onClick={() => setOverlay('menuOpen', false)}

Replace with:
  onClick={() => {
    setConvMenuId(null);
    setOverlay('menuOpen', false);
  }}

── Step 4: Replace past conversations block ──────

Find the entire past conversations block:

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
          if (isComputing) stopComputing();
          setMessages([...conv.messages]);
          setOverlay('menuOpen', false);
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

Replace with:

  {/* Past conversations */}
  {conversations.slice(0, 20).map(conv => (
    <div
      key={conv.id}
      className="relative flex items-center 
        group border-l-[2px] 
        border-transparent"
    >
      {renamingId === conv.id ? (

        /* ── Rename mode ── */
        <div className="flex-1 
          p-[6px_12px_6px_20px] 
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
                  prev.map(c => 
                    c.id === conv.id 
                      ? { ...c, 
                          title: renameVal
                            .trim() 
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
            onBlur={() => setRenamingId(null)}
            className="flex-1 bg-bg-elevated 
              border border-accent-border 
              rounded-[6px] px-2 py-1 
              font-sans text-[13px] 
              font-light text-text-primary 
              outline-none"
          />
          <button
            className="font-mono text-[9px] 
              text-accent shrink-0"
            onMouseDown={e => {
              e.preventDefault();
              if (renameVal.trim()) {
                setConversations(prev =>
                  prev.map(c => 
                    c.id === conv.id
                      ? { ...c, 
                          title: renameVal
                            .trim() 
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

        /* ── Normal row ── */
        <>
          <div
            className="flex-1 
              p-[9px_40px_9px_20px] 
              cursor-pointer 
              hover:bg-bg-surface 
              transition-colors 
              flex flex-col gap-1"
            onClick={() => {
              if (convMenuId === conv.id) {
                setConvMenuId(null);
                return;
              }
              if (isComputing) 
                stopComputing();
              setMessages(
                [...conv.messages]
              );
              setOverlay('menuOpen', false);
            }}
          >
            <div className="font-sans 
              text-[13px] font-light 
              text-text-secondary truncate">
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

          {/* Three-dot button */}
          <button
            className="absolute right-[12px] 
              top-1/2 -translate-y-1/2 
              w-[24px] h-[24px] 
              rounded-full 
              flex items-center 
              justify-center
              opacity-0 
              group-hover:opacity-100 
              hover:bg-bg-elevated 
              transition-opacity 
              duration-150"
            onClick={e => {
              e.stopPropagation();
              setConvMenuId(
                convMenuId === conv.id 
                  ? null 
                  : conv.id
              );
            }}
          >
            <MoreVertical 
              className="w-[11px] h-[11px] 
                text-text-subtle" 
            />
          </button>

          {/* Inline popover */}
          <AnimatePresence>
            {convMenuId === conv.id && (
              <motion.div
                initial={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  y: -4 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  y: -4 
                }}
                transition={{ duration: 0.12 }}
                className="absolute 
                  right-[10px] 
                  top-[calc(100%-4px)] 
                  z-10 
                  bg-[#1A1A1A] 
                  border border-[#2A2A2A] 
                  rounded-[10px] 
                  shadow-[0_4px_16px_rgba(0,0,0,0.5)] 
                  overflow-hidden 
                  min-w-[120px]"
                onClick={e => 
                  e.stopPropagation()
                }
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
                  <Edit2 
                    className="w-[11px] 
                      h-[11px] 
                      text-text-subtle" 
                  />
                  <span className="font-mono 
                    text-[11px] 
                    text-text-secondary">
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
                  <Trash2 
                    className="w-[11px] 
                      h-[11px] 
                      text-[#FF5555]" 
                  />
                  <span className="font-mono 
                    text-[11px] 
                    text-[#FF5555]">
                    delete
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  ))}

═══════════════════════════════════════════════════
CHANGE 2 — Models screen: show "about" 
for all models, not just insufficient
═══════════════════════════════════════════════════

Find the isInsufficient conditional for 
the "about this model" menu item:

  {isInsufficient && (
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
      <Info className="..." />
      <span className="...">
        about this model
      </span>
    </div>
  )}

Replace with (remove the isInsufficient 
condition — show for all models):

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

═══════════════════════════════════════════════════
CHANGE 3 — About model sheet: 
context-aware content
═══════════════════════════════════════════════════

Find the about model sheet content block:

  const m = models.find(
    x => x.id === aboutModelId
  );
  if (!m) return null;
  return (
    <>
      <div className="text-center font-mono 
        text-[14px] text-text-primary mb-2">
        {m.name} {m.variant}
      </div>
      <div className="font-sans text-[13px] 
        font-light text-text-secondary 
        text-center mb-2">
        this model requires more RAM than 
        is available on this device
      </div>
      ... (pair a pc button, etc)
    </>
  );

Replace the entire return block with:

  return (
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
          <div className="font-sans 
            text-[13px] font-light 
            text-text-secondary text-center 
            mb-3 leading-[1.6]">
            this model requires more RAM 
            than is currently available
          </div>
          <div className="font-sans 
            text-[12px] text-text-subtle 
            text-center mb-6">
            pair a PC with sufficient 
            memory to run this model
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
              justify-center gap-2 
              bg-bg-surface border border-borders 
              text-text-primary font-mono 
              text-[12px] rounded-[14px] py-4 
              hover:bg-bg-elevated 
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
          text-center leading-[1.7] mb-4 px-2">
          {m.desc ?? 
            `a ${m.tier} tier model. 
             runs fully on-device 
             with no network required.`}
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
  );

═══════════════════════════════════════════════════
DO NOT CHANGE
═══════════════════════════════════════════════════

Everything else in OverlayManager — 
unchanged.
All other files — unchanged.
All imports are already correct 
(MoreVertical, Edit2, Trash2, 
AnimatePresence, motion all imported).
All color tokens — unchanged.
All animation values — unchanged.
