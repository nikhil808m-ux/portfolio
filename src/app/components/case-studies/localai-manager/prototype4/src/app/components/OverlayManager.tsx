import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, SlidersHorizontal, Plus, Cpu, Monitor, ArrowLeft, RefreshCcw, Pin, Trash2, Edit2, Copy, MoreVertical, Info, Check, Download, X } from 'lucide-react';
import { useAppStore, Mode } from '../store';

const PCSessionDropdown = () => {
  const { pcMode, setPCMode, setOverlay, isComputing, activePC, messages, setMessages, switchToPhone } = useAppStore();
  const pcTiers = [
    { id: 'fast', letter: 'F', name: 'fast' },
    { id: 'balanced', letter: 'B', name: 'balanced' },
    { id: 'thorough', letter: 'T', name: 'thorough' },
  ] as const;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50  bg-[rgba(0,0,0,0.6)]"
      onClick={() => setOverlay('pcDropdownOpen', false)}
    >
      <motion.div
        className="absolute top-[68px] left-1/2 -translate-x-1/2 w-[260px] bg-[#111] border border-[#2A2A2A] rounded-[16px] origin-top flex flex-col overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-[12px_16px] border-b border-borders flex items-center justify-between">
          <div className="flex items-center">
            <Monitor className="w-[13px] h-[13px] text-accent mr-2" />
            <span className="font-mono text-[12px] text-text-primary">
              {activePC?.name ?? 'your pc'}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-[5px] h-[5px] bg-accent rounded-full shadow-[0_0_6px_rgba(200,185,138,0.5)]" />
            <span className="font-mono text-[9px] text-accent ml-2">online</span>
          </div>
        </div>
        
        <div className="flex flex-col">
          {!activePC?.models || activePC.models.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 gap-2">
              <span className="font-mono text-[11px] text-text-subtle">
                no models on {activePC?.name ?? 'your pc'}
              </span>
              <span className="font-mono text-[10px] text-accent">
                set up models on your pc to get started
              </span>
            </div>
          ) : (
            pcTiers.map(t => {
              const tierModels = activePC.models.filter(m => m.tier === t.id);
              const activeModel = tierModels.find(m => m.isActive) || tierModels[0];
              const isSelected = pcMode === t.id;
              
              return (
                <div 
                  key={t.id}
                  className={`flex items-center gap-3 p-[10px_16px] transition-colors ${
                    isComputing && !isSelected
                      ? 'opacity-40 pointer-events-none'
                      : isComputing && isSelected
                        ? 'pointer-events-none'
                        : isSelected
                          ? 'border-l-[2px] border-accent bg-bg-surface cursor-pointer hover:bg-bg-surface' 
                          : 'border-l-[2px] border-transparent cursor-pointer hover:bg-bg-surface'
                  }`}
                  onClick={() => {
                    if (isComputing) return;
                    if (pcMode !== t.id) {
                      setPCMode(t.id);
                      if (messages.length > 0) {
                        setMessages(prev => [
                          ...prev,
                          {
                            id: `system-${Date.now()}`,
                            text: `switched to ${t.name} on ${activePC?.name?.toLowerCase() ?? 'pc'}`,
                            sender: 'system',
                            timestamp: Date.now()
                          }
                        ]);
                      }
                    }
                    setOverlay('pcDropdownOpen', false);
                  }}
                >
                  <div className={`w-[28px] h-[28px] rounded-[7px] flex items-center justify-center font-mono text-[9px] font-semibold border ${isSelected ? 'bg-accent-dim text-accent border-accent-border' : 'bg-bg-elevated text-text-subtle border-[#2A2A2A]'}`}>
                    {t.letter}
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1">
                    <span className={`font-mono text-[12px] ${isSelected ? 'text-text-primary' : 'text-text-secondary'}`}>{t.name}</span>
                    {activeModel && (
                      <span className="font-sans text-[11px] font-light text-text-subtle">
                        {activeModel.name.toLowerCase()} {activeModel.variant}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    isComputing ? (
                      <span className="font-mono text-[9px] text-text-subtle">computing...</span>
                    ) : (
                      <div className="w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_8px_rgba(200,185,138,0.5)]" />
                    )
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="h-[1px] bg-[#1E1E1E]" />
        
        <div className="p-[10px_16px] bg-[#0D0D0D] border-t border-[#1A1A1A] flex items-center gap-2">
          <div className="w-[4px] h-[4px] bg-[#2A2A2A] rounded-full" />
          <span className="font-mono text-[9px] text-text-subtle">
            conversation is mirrored on both devices
          </span>
        </div>

        <div className="h-[1px] bg-[#1A1A1A]" />

        <div
          className={`flex items-center justify-between p-[11px_16px] transition-colors ${
            isComputing 
              ? 'opacity-40 cursor-not-allowed' 
              : 'cursor-pointer hover:bg-bg-surface'
          }`}
          onClick={() => {
            if (isComputing) return;
            switchToPhone();
            setOverlay('pcDropdownOpen', false);
          }}
        >
          <div className="flex flex-col gap-[2px]">
            <span className={`font-mono text-[11px] text-text-secondary tracking-[0.02em] ${isComputing ? 'opacity-40' : ''}`}>
              use phone instead
            </span>
            {isComputing && (
              <span className="font-mono text-[9px] text-text-subtle">
                finish or stop first
              </span>
            )}
          </div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1.5" y="3.5" width="5" height="6" rx="1" stroke="#9A9690" strokeWidth="1.2"/>
            <path d="M8 5.5L10.5 6L8 6.5" stroke="#9A9690" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.5 6H6.5" stroke="#9A9690" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const OverlayManager = () => {
  const { overlays, setOverlay } = useAppStore();

  return (
    <>
      <AnimatePresence>
        {overlays.modeDropdownOpen && <ModeDropdown key="mode-dropdown" />}
        {overlays.pcDropdownOpen && <PCSessionDropdown key="pc-session-dropdown" />}
        {overlays.menuOpen && <SlideMenu key="slide-menu" />}
        {overlays.qrOpen && <QRPairingScreen key="qr-pairing" />}
        {overlays.settingsOpen && <SettingsScreen key="settings-screen" />}
        {overlays.modelsOpen && <ModelsScreen key="models-screen" />}
        {overlays.activeMessageId && <MessageActionSheet key="message-action-sheet" />}
      </AnimatePresence>
    </>
  );
};

const ModeDropdown = () => {
  const { mode, setMode, setOverlay, models, messages, setMessages } = useAppStore();
  const modes = [
    { id: 'fast', letter: 'F', name: 'fast', desc: 'quick answers, less detail' },
    { id: 'balanced', letter: 'B', name: 'balanced', desc: 'good middle ground' },
    { id: 'thorough', letter: 'T', name: 'thorough', desc: 'deep, careful thought' },
  ] as const;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50  bg-[rgba(0,0,0,0.6)]"
      onClick={() => setOverlay('modeDropdownOpen', false)}
    >
      <motion.div
        className="absolute top-[68px] left-1/2 -translate-x-1/2 w-[280px] bg-[#111] border border-[#2A2A2A] rounded-[16px] origin-top flex flex-col overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          {modes.map(m => {
            const tierModels = models.filter(model => model.tier === m.id);
            const activeModel = tierModels.find(model => model.isActive) || tierModels[0];
            const hasModel = tierModels.length > 0;
            const isInsufficient = hasModel && activeModel?.status === 'insufficient_memory';
            const isUnavailable = !hasModel || isInsufficient;

            return (
              <div 
                key={m.id}
                className={`flex items-center gap-3 p-[10px_16px] transition-colors ${
                  isUnavailable 
                    ? 'opacity-40 cursor-not-allowed border-l-[2px] border-transparent' 
                    : mode === m.id 
                      ? 'border-l-[2px] border-accent bg-bg-surface cursor-pointer hover:bg-bg-surface' 
                      : 'border-l-[2px] border-transparent cursor-pointer hover:bg-bg-surface'
                }`}
                onClick={() => {
                  if (!hasModel) {
                    setOverlay('modeDropdownOpen', false);
                    setTimeout(() => setOverlay('modelsOpen', true), 150);
                    return;
                  }
                  if (isInsufficient) return;
                  if (mode !== m.id) {
                    setMode(m.id);
                    if (messages.length > 0) {
                      const activeModel = models.find(model => model.tier === m.id && model.isActive) || tierModels[0];
                      setMessages(prev => [
                        ...prev,
                        {
                          id: `system-${Date.now()}`,
                          text: `switched to ${m.name} mode (${activeModel?.name} ${activeModel?.variant})`,
                          sender: 'system',
                          timestamp: Date.now()
                        }
                      ]);
                    }
                  }
                  setOverlay('modeDropdownOpen', false);
                }}
              >
                <div className={`w-[28px] h-[28px] rounded-[7px] flex items-center justify-center font-mono text-[9px] font-semibold border ${mode === m.id && !isUnavailable ? 'bg-accent-dim text-accent border-accent-border' : 'bg-bg-elevated text-text-subtle border-[#2A2A2A]'}`}>
                  {m.letter}
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className={`font-mono text-[12px] ${mode === m.id && !isUnavailable ? 'text-text-primary' : 'text-text-secondary'}`}>{m.name}</span>
                  {isUnavailable ? (
                    <span className={`font-mono text-[11px] ${!hasModel ? 'text-text-subtle' : 'text-[#FF5555]'}`}>
                      {!hasModel ? 'no model installed' : 'insufficient memory'}
                    </span>
                  ) : (
                    <span className="font-sans text-[11px] text-text-subtle">{m.desc}</span>
                  )}
                </div>
                {mode === m.id && !isUnavailable && (
                  <div className="w-[6px] h-[6px] rounded-full bg-accent shadow-[0_0_8px_rgba(200,185,138,0.5)]" />
                )}
              </div>
            );
          })}
        </div>

        <div className="h-[1px] bg-[#1E1E1E] mx-0" />
        <div 
          className="flex items-center justify-between p-[11px_16px] cursor-pointer hover:bg-bg-surface transition-colors"
          onClick={() => {
            setOverlay('modeDropdownOpen', false);
            setTimeout(() => setOverlay('modelsOpen', true), 150);
          }}
        >
          <span className="font-mono text-[11px] text-text-secondary tracking-[0.04em]">
            manage models
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2.5L8 6L4.5 9.5" stroke="#5C5A57" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="p-[10px_16px] bg-[#0D0D0D] border-t border-[#1A1A1A] flex items-center gap-2">
          <div className="w-[4px] h-[4px] bg-[#2A2A2A] rounded-full" />
          <span className="font-mono text-[9px] text-text-subtle">models run offline on your device</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SlideMenu = () => {
  const { 
    setOverlay, 
    pcDevices, 
    usePC, 
    setUsePC, 
    activePCId, 
    setActivePCId, 
    messages,
    setMessages,
    conversations, setConversations,
    newChat,
    isComputing,
    computeSource,
    stopComputing,
  } = useAppStore();

  const [convMenuId, setConvMenuId] = 
    useState<string | null>(null);
  const [renamingId, setRenamingId] = 
    useState<string | null>(null);
  const [renameVal, setRenameVal] = 
    useState('');

  const noPCPaired = pcDevices.length === 0;
  const displayedPCs = pcDevices.slice(0, 3);
  const canAddMore = pcDevices.length < 3;
  const toggleWillInterrupt = 
    isComputing && 
    computeSource === 'pc' && 
    usePC;

  // Title helper — first 6 words
  const shortTitle = (text: string) =>
    text.split(' ').slice(0, 6).join(' ');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 
         
        bg-[rgba(0,0,0,0.5)] 
        flex justify-start"
      onClick={() => {
        setConvMenuId(null);
        setOverlay('menuOpen', false);
      }}
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
              onClick={() => {
                setOverlay('menuOpen', false);
                setTimeout(() => 
                  setOverlay('settingsOpen', true)
                , 200);
              }} 
            />
          </div>
        </div>

        {/* Zone 3 — Recent (scrollable) */}
        <div 
          className="flex-1 min-h-0 
            overflow-y-auto [&::-webkit-scrollbar]:hidden"
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
            </div>
          )}
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
                      : 'bg-bg-elevated justify-start'}
                    ${toggleWillInterrupt 
                      ? 'ring-1 ring-[#FF5555] ring-opacity-60' 
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

const MenuAction = ({ icon: Icon, label, onClick }: any) => (
  <div 
    className="flex items-center gap-[12px] p-[10px_20px] cursor-pointer hover:bg-bg-surface transition-colors"
    onClick={onClick}
  >
    <Icon className="w-[14px] h-[14px] text-text-subtle" />
    <span className="font-mono text-[12px] text-text-secondary tracking-[0.03em]">{label}</span>
  </div>
);

const QRPairingScreen = () => {
  const { setOverlay, pcDevices, setPCDevices, setUsePC, setActivePCId } = useAppStore();
  const [step, setStep] = React.useState<'scan' | 'confirm' | 'done'>('scan');

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-bg-primary flex flex-col pt-[59px] pb-[34px] px-[24px]"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between mb-12">
        <button 
          className="font-mono text-[12px] text-text-subtle flex items-center gap-1 z-10 relative cursor-pointer"
          onClick={() => {
            if (step !== 'scan') setStep('scan');
            else setOverlay('qrOpen', false);
          }}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> back
        </button>
        <div className="font-mono text-[14px] font-medium text-text-primary absolute left-1/2 -translate-x-1/2">pair your pc</div>
        <div className="w-[50px]"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-16">
        {step === 'scan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full">
            <>
              <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-text-subtle text-center mb-2">
                point at your pc screen
              </div>
              <div className="font-mono text-[10px] text-text-subtle text-center mb-8">
                qr code is displayed on your pc
              </div>
              
              <div 
                className="w-[240px] h-[240px] relative cursor-pointer"
                onClick={() => setStep('confirm')}
              >
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.15)]" style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.4) 100%)' }} />
                <div className="absolute top-0 left-0 w-[24px] h-[24px] border-t-2 border-l-2 border-[#C8B98A]" />
                <div className="absolute top-0 right-0 w-[24px] h-[24px] border-t-2 border-r-2 border-[#C8B98A]" />
                <div className="absolute bottom-0 left-0 w-[24px] h-[24px] border-b-2 border-l-2 border-[#C8B98A]" />
                <div className="absolute bottom-0 right-0 w-[24px] h-[24px] border-b-2 border-r-2 border-[#C8B98A]" />
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-[2px] bg-[#C8B98A] opacity-30 shadow-[0_0_8px_rgba(200,185,138,0.6)]"
                    animate={{ y: [0, 240, 0] }}
                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                  />
                </div>
              </div>

              <div className="mt-8 font-mono text-[9px] text-text-subtle opacity-40">
                tap to simulate scan
              </div>
            </>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center w-full">
            <div className="font-mono text-[11px] text-text-subtle text-center mb-6">confirm this code matches your pc screen</div>
            <div className="flex gap-4 mb-12">
              {['2','8','4','7'].map(d => (
                <div key={d} className="w-[52px] h-[64px] bg-bg-elevated border border-[#2A2A2A] rounded-[10px] flex items-center justify-center font-mono text-[28px] font-medium text-text-primary">
                  {d}
                </div>
              ))}
            </div>
            
            <button 
              className="w-full bg-bg-elevated border border-accent-border text-accent font-mono text-[12px] uppercase tracking-[0.08em] rounded-[14px] p-[14px] mb-4 hover:bg-[#2A2A2A] transition-colors"
              onClick={() => {
                const newId = Date.now().toString();
                setPCDevices(prev => [...prev, {
                  id: newId,
                  name: 'MacBook Pro',
                  connected: true,
                  isActiveCompute: true,
                  models: [
                    { id: 'pc-llama32-3b', name: 'Llama 3.2', variant: '3B', sizeGB: 1.8, tier: 'fast', isActive: true },
                    { id: 'pc-mistral-7b', name: 'Mistral', variant: '7B', sizeGB: 4.1, tier: 'balanced', isActive: true },
                    { id: 'pc-llama31-70b', name: 'Llama 3.1', variant: '70B', sizeGB: 39.0, tier: 'thorough', isActive: true },
                  ]
                }]);
                setActivePCId(newId);
                setUsePC(true);
                setStep('done');
              }}
            >
              confirm
            </button>
            <button className="font-mono text-[11px] text-text-subtle p-2" onClick={() => setStep('scan')}>
              this doesn't match
            </button>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full">
            <motion.div 
              className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-8 relative"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-4 h-4 bg-accent rounded-full shadow-[0_0_12px_rgba(200,185,138,1)]" />
            </motion.div>
            <div className="font-mono text-[16px] text-text-primary mb-2">
              {pcDevices.length <= 1 ? "macbook pro paired" : "macbook pro added"}
            </div>
            {pcDevices.length > 1 && (
              <div className="font-mono text-[10px] text-text-subtle mb-4">
                {pcDevices.length} pcs available
              </div>
            )}
            <div className="font-sans text-[11px] font-light text-text-subtle text-center max-w-[200px] mb-12">
              your conversations are now synced on your home network
            </div>
            <button 
              className="w-full max-w-[240px] bg-bg-elevated border border-[#2E2E2E] text-text-primary font-mono text-[12px] uppercase tracking-[0.08em] rounded-[14px] p-[14px] hover:bg-[#2A2A2A] transition-colors"
              onClick={() => setOverlay('qrOpen', false)}
            >
              done
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const discoverModels = [
  { id: 'discover-mistral-7b', name: 'Mistral', variant: '7B', sizeGB: 4.1, tier: 'balanced' as const, desc: 'Strong reasoning and instruction following.' },
  { id: 'discover-gemma-2b', name: 'Gemma 2', variant: '2B', sizeGB: 1.6, tier: 'fast' as const, desc: 'Lightweight and fast. Good for quick tasks.' },
  { id: 'discover-llama-70b', name: 'Llama 3.1', variant: '70B', sizeGB: 39.0, tier: 'thorough' as const, desc: 'Most capable. Requires PC compute.' },
  { id: 'discover-phi-14b', name: 'Phi-3', variant: '14B', sizeGB: 7.6, tier: 'thorough' as const, desc: 'Compact but surprisingly deep reasoning.' },
];

const ModelsScreen = () => {
  const { setOverlay, models, setModelActive, setModels, mode, setMode, isPCSession, activePC } = useAppStore();
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [downloadingMap, setDownloadingMap] = useState<Map<string, number>>(new Map());
  const downloadIntervals = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [aboutModelId, setAboutModelId] = useState<string | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number } | null>(null);
  const [discoverMenuId, setDiscoverMenuId] = useState<string | null>(null);
  const [discoverMenuAnchor, setDiscoverMenuAnchor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    return () => {
      downloadIntervals.current.forEach(interval => clearInterval(interval));
    };
  }, []);

  const readyModels = models.filter(m => m.status === 'ready' || m.status === 'insufficient_memory');
  const usedGB = readyModels.reduce((acc, m) => acc + m.sizeGB, 0).toFixed(1);
  
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDownload = (dm: typeof discoverModels[0]) => {
    // Prevent re-download if already in progress
    if (downloadingMap.has(dm.id)) return;
    // Prevent re-download if already installed
    const alreadyInstalled = models.some(
      m => m.name === dm.name && 
           m.variant === dm.variant
    );
    if (alreadyInstalled) return;

    setDownloadingMap(prev => {
      const next = new Map(prev);
      next.set(dm.id, 0);
      return next;
    });
    
    // Simulate download
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadingMap(prev => {
        const next = new Map(prev);
        if (progress >= 100) {
          next.delete(dm.id);
        } else {
          next.set(dm.id, Math.min(progress, 100));
        }
        return next;
      });
      
      if (progress >= 100) {
        clearInterval(interval);
        downloadIntervals.current.delete(dm.id);
        showToast(`${dm.name} ${dm.variant} downloaded`);
        
        setModels(prev => {
          const tierModels = prev.filter(m => m.tier === dm.tier);
          const hasActive = tierModels.some(m => m.isActive);
          return [
            ...prev,
            {
              id: `installed-${Date.now()}`,
              name: dm.name,
              variant: dm.variant,
              sizeGB: dm.sizeGB,
              tier: dm.tier,
              status: 'ready',
              isActive: !hasActive,
            }
          ];
        });
      }
    }, 300);
    
    downloadIntervals.current.set(dm.id, interval);
  };

  const tiers = [
    { id: 'fast', name: 'fast' },
    { id: 'balanced', name: 'balanced' },
    { id: 'thorough', name: 'thorough' },
  ] as const;

  return (
    <motion.div
      id="models-screen"
      className="absolute inset-0 z-50 bg-bg-primary flex flex-col pt-[59px] pb-[34px]"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={() => {
        setOpenMenuId(null);
        setMenuAnchor(null);
        setDiscoverMenuId(null);
        setDiscoverMenuAnchor(null);
      }}
    >
      <div className="h-[60px] flex items-center justify-between px-4 shrink-0 border-b border-borders">
        <button 
          className="flex items-center gap-2"
          onClick={() => setOverlay('modelsOpen', false)}
        >
          <ArrowLeft className="w-[18px] h-[18px] text-text-primary" />
          <span className="font-mono text-[14px] font-medium text-text-primary">models</span>
        </button>
        <div className="flex flex-col items-end gap-[4px]">
          <span className="font-mono text-[10px] text-text-subtle">
            {usedGB} GB of 256 GB
          </span>
          <div className="w-[80px] h-[3px] bg-bg-elevated rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min(
                  (parseFloat(usedGB) / 256) * 100, 
                  100
                )}%` 
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {isPCSession && (
          <div className="mx-0 mb-4 mt-2 bg-[rgba(200,185,138,0.06)] border border-[rgba(200,185,138,0.14)] rounded-[12px] p-[12px_14px] flex items-start gap-3">
            <Monitor className="w-[13px] h-[13px] text-accent mt-[1px] shrink-0" />
            <span className="font-mono text-[10px] text-text-subtle leading-[1.6]">
              {activePC?.name ?? 'your pc'} is handling compute · these are your on-device models for when it's offline
            </span>
          </div>
        )}

        {tiers.map(tier => {
          const tierModels = models.filter(m => m.tier === tier.id);
          const hasActive = tierModels.some(m => m.isActive);

          return (
            <div key={tier.id} className="mt-6 border border-[#1E1E1E] rounded-[14px] overflow-hidden">
              <div className="px-4 py-3 border-b border-[#1A1A1A] flex items-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-subtle">
                  {tier.name}
                </span>
              </div>

              {tierModels.length === 0 ? (
                <div className="p-4 text-center">
                  <div className="border border-dashed border-[#2A2A2A] rounded-[10px] p-4">
                    <div className="font-mono text-[11px] text-text-subtle">no model for this tier</div>
                    <button 
                      className="font-mono text-[10px] text-accent mt-1"
                      onClick={() => {
                        document.getElementById('discover-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      find a model ↓
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col p-2">
                  <AnimatePresence>
                    {tierModels.map(model => {
                      const isReady = model.status === 'ready';
                      const isInsufficient = model.status === 'insufficient_memory';

                      return (
                        <motion.div
                          layout
                          initial={{ opacity: 1, height: 'auto', marginBottom: 2 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0, paddingBottom: 0, paddingTop: 0, overflow: 'hidden' }}
                          transition={{ duration: 0.3, ease: "easeIn" }}
                          key={model.id}
                          className={`group relative p-[12px_14px] rounded-[10px] transition-colors flex justify-between items-center ${
                            model.isActive 
                              ? 'bg-[#1E1E1E]' 
                              : 'bg-transparent'
                          }`}
                          whileTap={!isInsufficient && !model.isActive ? { scale: 0.97 } : {}}
                          onClick={(e) => {
                            if (isInsufficient) {
                              const el = e.currentTarget;
                              el.animate([
                                { transform: 'translateX(0px)' },
                                { transform: 'translateX(-3px)' },
                                { transform: 'translateX(3px)' },
                                { transform: 'translateX(-2px)' },
                                { transform: 'translateX(2px)' },
                                { transform: 'translateX(0px)' }
                              ], { duration: 300 });
                              return;
                            }
                            if (isReady && !model.isActive) {
                              setModelActive(model.id);
                              showToast(`${tier.name} · ${model.name} ${model.variant}`);
                            }
                          }}
                        >
                          <div className="flex flex-col">
                            <div className="flex items-baseline">
                              <span className={`font-mono text-[13px] ${model.isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
                                {model.name}
                              </span>
                              <span className="font-mono text-[13px] text-text-subtle ml-2">
                                {model.variant}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-text-subtle mt-[2px]">
                              {model.sizeGB.toFixed(1)} GB
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {model.isActive && (
                              <div className="w-[5px] h-[5px] bg-accent rounded-full shadow-[0_0_8px_rgba(200,185,138,0.5)]" />
                            )}
                            <button
                              className="w-[28px] h-[28px] rounded-full flex items-center justify-center hover:bg-bg-elevated transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                const rect = e.currentTarget.getBoundingClientRect();
                                const container = document.getElementById('models-screen');
                                if (openMenuId === model.id) {
                                  setOpenMenuId(null);
                                  setMenuAnchor(null);
                                } else {
                                  setOpenMenuId(model.id);
                                  if (container) {
                                    const containerRect = container.getBoundingClientRect();
                                    const scaleX = containerRect.width / container.offsetWidth;
                                    const scaleY = containerRect.height / container.offsetHeight;
                                    setMenuAnchor({ 
                                      x: (containerRect.right - rect.right) / scaleX, 
                                      y: (rect.bottom - containerRect.top) / scaleY + 4 
                                    });
                                  } else {
                                    setMenuAnchor({ 
                                      x: window.innerWidth - rect.right, 
                                      y: rect.bottom + 4 
                                    });
                                  }
                                }
                              }}
                            >
                              <MoreVertical className="w-[14px] h-[14px] text-text-subtle" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          );
        })}

        <div id="discover-section" className="mt-8 mb-3">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-subtle">
            discover
          </div>
        </div>
        <div className="font-mono text-[10px] text-text-subtle mb-4">
          models download directly to your device
        </div>

        <div className="flex flex-col gap-3">
          {discoverModels.map(dm => {
            const isInstalled = models.some(m => m.name === dm.name && m.variant === dm.variant);
            const isDownloading = downloadingMap.has(dm.id);
            const downloadProgress = downloadingMap.get(dm.id) ?? 0;

            return (
              <div key={dm.id} className="bg-bg-surface border border-borders rounded-[12px] p-[14px_16px] flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-baseline">
                    <span className="font-mono text-[13px] text-text-primary">{dm.name}</span>
                    <span className="font-mono text-[13px] text-text-subtle ml-2">{dm.variant}</span>
                  </div>
                  <span className="font-mono text-[10px] bg-bg-elevated border border-[#2A2A2A] rounded px-2 py-0.5 text-text-subtle">
                    {dm.sizeGB.toFixed(1)} GB
                  </span>
                </div>
                
                {isDownloading && (
                  <div className="absolute top-[34px] left-0 right-0 h-[2px] bg-bg-elevated mx-[16px]">
                    <motion.div 
                      className="h-full bg-accent" 
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                )}
                
                <div className={`font-sans text-[12px] font-light text-text-subtle ${isDownloading ? 'mt-2' : ''}`}>
                  {dm.desc}
                </div>

                <div className="flex justify-between items-end mt-3">
                  <span className={`font-mono text-[9px] uppercase tracking-[0.1em] ${
                    dm.tier === 'fast' ? 'text-accent' : 
                    dm.tier === 'balanced' ? 'text-text-secondary' : 
                    'text-text-subtle'
                  }`}>
                    {dm.tier}
                  </span>

                  {isInstalled ? (
                    <div>
                      <button
                        className="w-[28px] h-[28px] rounded-full flex items-center justify-center hover:bg-bg-elevated transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          const targetId = dm.id;
                          const container = document.getElementById('models-screen');
                          
                          if (discoverMenuId === targetId) {
                            setDiscoverMenuId(null);
                            setDiscoverMenuAnchor(null);
                          } else {
                            setDiscoverMenuId(targetId);
                            if (container) {
                              const containerRect = container.getBoundingClientRect();
                              const scaleX = containerRect.width / container.offsetWidth;
                              const scaleY = containerRect.height / container.offsetHeight;
                              setDiscoverMenuAnchor({
                                x: (containerRect.right - rect.right) / scaleX,
                                y: (rect.bottom - containerRect.top) / scaleY + 4,
                              });
                            } else {
                              setDiscoverMenuAnchor({
                                x: window.innerWidth - rect.right,
                                y: rect.bottom + 4,
                              });
                            }
                          }
                        }}
                      >
                        <MoreVertical className="w-[14px] h-[14px] text-text-subtle" />
                      </button>
                    </div>
                  ) : isDownloading ? (
                    <button
                      className="font-mono text-[10px] text-text-subtle border border-[#2A2A2A] rounded-[6px] px-3 py-1.5 hover:border-[#FF5555] hover:text-[#FF5555] transition-colors flex items-center gap-[5px]"
                      onClick={() => {
                        // Cancel the interval
                        const interval = downloadIntervals.current.get(dm.id);
                        if (interval) {
                          clearInterval(interval);
                          downloadIntervals.current.delete(dm.id);
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
                  ) : (
                    <button 
                      className="font-mono text-[10px] text-accent border border-accent-border rounded-[6px] px-3 py-1.5 hover:bg-accent hover:text-bg-primary transition-colors"
                      onClick={() => handleDownload(dm)}
                    >
                      download
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {openMenuId && menuAnchor && (() => {
          const model = models.find(m => m.id === openMenuId);
          if (!model) return null;
          const tier = tiers.find(t => t.id === model.tier);
          const isReady = model.status === 'ready';
          const isInsufficient = model.status === 'insufficient_memory';
          
          return (
            <motion.div
              key={model.id}
              className="fixed inset-0 z-[60]"
              onClick={() => {
                setOpenMenuId(null);
                setMenuAnchor(null);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'fixed',
                  top: menuAnchor.y,
                  right: menuAnchor.x,
                }}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.6)] min-w-[164px] z-[61] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Context-sensitive rows */}
                {model.isActive && (
                  <div className="flex items-center gap-3 px-4 py-3 cursor-default">
                    <div className="w-[5px] h-[5px] bg-accent rounded-full shadow-[0_0_8px_rgba(200,185,138,0.5)]" />
                    <span className="font-mono text-[12px] text-text-primary">
                      active for {tier?.name}
                    </span>
                  </div>
                )}
                
                {!model.isActive && isReady && (
                  <div 
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#222] transition-colors"
                    onClick={() => {
                      setModelActive(model.id);
                      showToast(`${tier?.name} · ${model.name} ${model.variant}`);
                      setOpenMenuId(null);
                      setMenuAnchor(null);
                    }}
                  >
                    <Check className="w-[13px] h-[13px] text-text-primary" />
                    <span className="font-mono text-[12px] text-text-primary">
                      set as active
                    </span>
                  </div>
                )}
                
                <div 
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#222] transition-colors"
                  onClick={() => {
                    setOpenMenuId(null);
                    setMenuAnchor(null);
                    setAboutModelId(model.id);
                  }}
                >
                  <Info className="w-[13px] h-[13px] text-text-subtle" />
                  <span className="font-mono text-[12px] text-text-secondary">
                    about
                  </span>
                </div>
                
                <div className="h-[1px] bg-[#222]" />
                
                <div 
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#222] transition-colors"
                  onClick={() => {
                    setModels(prev => {
                      const updated = prev.filter(m => m.id !== model.id);
                      const tierOk = updated.some(m => m.tier === mode && m.status === 'ready');
                      if (!tierOk) {
                        const fallback = ['fast','balanced','thorough'].find(t => updated.some(m => m.tier === t && m.status === 'ready'));
                        if (fallback) setMode(fallback as Mode);
                      }
                      return updated;
                    });
                    showToast(`${model.name} ${model.variant} removed`);
                    setOpenMenuId(null);
                    setMenuAnchor(null);
                  }}
                >
                  <Trash2 className="w-[13px] h-[13px] text-[#FF5555]" />
                  <span className="font-mono text-[12px] text-[#FF5555]">
                    remove from device
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <AnimatePresence>
        {discoverMenuId && discoverMenuAnchor && (() => {
          const dm = discoverModels.find(d => d.id === discoverMenuId);
          if (!dm) return null;

          return (
            <motion.div
              key={discoverMenuId}
              className="fixed inset-0 z-[60]"
              onClick={() => {
                setDiscoverMenuId(null);
                setDiscoverMenuAnchor(null);
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'fixed',
                  top: discoverMenuAnchor.y,
                  right: discoverMenuAnchor.x,
                }}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.6)] min-w-[164px] z-[61] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Info row — installed state */}
                <div className="flex items-center gap-3 px-4 py-3 cursor-default">
                  <Check className="w-[13px] h-[13px] text-text-subtle" />
                  <span className="font-mono text-[12px] text-text-subtle">
                    installed
                  </span>
                </div>

                <div className="h-[1px] bg-[#222]" />

                {/* Remove action */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#222] transition-colors"
                  onClick={() => {
                    setModels(prev => {
                      const updated = prev.filter(m => !(m.name === dm.name && m.variant === dm.variant));
                      const tierOk = updated.some(m => m.tier === mode && m.status === 'ready');
                      if (!tierOk) {
                        const fallback = ['fast', 'balanced', 'thorough'].find(t => updated.some(m => m.tier === t && m.status === 'ready'));
                        if (fallback) setMode(fallback as Mode);
                      }
                      return updated;
                    });
                    showToast(`${dm.name} ${dm.variant} removed`);
                    setDiscoverMenuId(null);
                    setDiscoverMenuAnchor(null);
                  }}
                >
                  <Trash2 className="w-[13px] h-[13px] text-[#FF5555]" />
                  <span className="font-mono text-[12px] text-[#FF5555]">
                    remove from device
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            key="toast-msg"
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="absolute top-[80px] left-1/2 bg-bg-elevated border border-accent-border rounded-[20px] px-4 py-2 font-mono text-[10px] text-accent shadow-lg z-50"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {aboutModelId && (
          <motion.div
            key="about-model-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-end"
            onClick={() => setAboutModelId(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full bg-bg-primary border-t border-borders rounded-t-[24px] p-6 pb-10 flex flex-col gap-4"
              onClick={e => e.stopPropagation()}
            >
              {(() => {
                const m = models.find(x => x.id === aboutModelId);
                if (!m) return null;
                return (
                  <>
                    <div className="text-center font-mono text-[14px] text-text-primary mb-1">
                      {m.name} {m.variant}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-subtle text-center mb-4">
                      {m.tier} · {m.sizeGB.toFixed(1)} GB
                    </div>

                    <div className="h-[1px] bg-borders w-full mb-4" />

                    {m.status === 'insufficient_memory' ? (
                      <>
                        <div className="font-sans text-[13px] font-light text-text-secondary text-center mb-3 leading-[1.6]">
                          this model requires more RAM than is currently available
                        </div>
                        <div className="font-sans text-[12px] text-text-subtle text-center mb-6">
                          pair a PC with sufficient memory to run this model
                        </div>
                        <button
                          onClick={() => {
                            setAboutModelId(null);
                            setOverlay('modelsOpen', false);
                            setTimeout(() => setOverlay('qrOpen', true), 200);
                          }}
                          className="w-full flex items-center justify-center gap-2 bg-bg-surface border border-borders text-text-primary font-mono text-[12px] rounded-[14px] py-4 hover:bg-bg-elevated transition-colors"
                        >
                          <Monitor className="w-[14px] h-[14px]" /> pair a pc
                        </button>
                      </>
                    ) : (
                      <div className="font-sans text-[13px] font-light text-text-secondary text-center leading-[1.7] mb-4 px-2">
                        {m.desc ?? `a ${m.tier} tier model. runs fully on-device with no network required.`}
                      </div>
                    )}

                    <button
                      onClick={() => setAboutModelId(null)}
                      className="w-full text-text-subtle font-mono text-[12px] uppercase py-2 mt-2"
                    >
                      close
                    </button>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

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
  const clearTimerRef = useRef<
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

      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
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

const MessageActionSheet = () => {
  const { setOverlay, messages, overlays, setMessages, isComputing, setIsComputing } = useAppStore();
  const msg = messages.find(m => m.id === overlays.activeMessageId);
  const isUser = msg?.sender === 'user';
  
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (tmsg: string) => {
    setToastMsg(tmsg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  if (!msg) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex flex-col justify-end"
      onClick={() => setOverlay('activeMessageId', null)}
    >
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
      <motion.div
        className="w-full bg-bg-surface rounded-t-[20px] pb-[34px] flex flex-col items-center"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => { if (info.offset.y > 100) setOverlay('activeMessageId', null); }}
      >
        <div className="w-[32px] h-[4px] bg-[#333] rounded-[2px] m-[12px]" />
        
        <div className="w-full px-[16px] mb-4">
          <div className="bg-bg-elevated border border-[#2A2A2A] rounded-[12px] p-[12px_14px]">
            <div className="font-sans text-[13px] font-light text-text-secondary italic line-clamp-2">
              {msg.text.substring(0, 80)}{msg.text.length > 80 ? '...' : ''}
            </div>
          </div>
        </div>

        <div className="w-full px-[16px] flex flex-col gap-2">
          <ActionRow icon={Copy} label="copy text" onClick={() => { 
            const fallbackCopy = (text: string) => {
              const textArea = document.createElement('textarea');
              textArea.value = text;
              textArea.style.top = '0';
              textArea.style.left = '0';
              textArea.style.position = 'fixed';
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();
              try { document.execCommand('copy'); } catch (err) {}
              document.body.removeChild(textArea);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(msg.text).catch(() => fallbackCopy(msg.text));
            } else {
              fallbackCopy(msg.text);
            }
            setOverlay('activeMessageId', null); 
          }} />
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
          {isUser && <ActionRow icon={Edit2} label="edit" disabled={isComputing} onClick={() => { setOverlay('activeMessageId', null); setOverlay('editingMessageId', msg.id); }} />}
          <ActionRow 
            icon={Pin} 
            label="pin message" 
            onClick={() => {
              showToast('pinning coming soon');
            }} 
          />
          <div className="h-[1px] bg-[#2A2A2A] w-full my-1" />
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
        </div>
      </motion.div>
    </motion.div>
  );
};

const ActionRow = ({ icon: Icon, label, color = "text-text-primary", hoverColor = "#1F1F1F", disabled, onClick }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className={`flex items-center gap-[16px] p-[12px_16px] rounded-[12px] transition-colors ${disabled ? 'opacity-30 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
      style={{ color, backgroundColor: isHovered ? hoverColor : 'transparent' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={disabled ? undefined : onClick}
    >
      <div className="w-[40px] h-[40px] rounded-full bg-bg-elevated flex items-center justify-center">
        <Icon className="w-[20px] h-[20px]" color={color === 'text-text-primary' ? '#E8E4DC' : color} />
      </div>
      <span className="font-mono text-[15px]" style={{ color: color === 'text-text-primary' ? '#E8E4DC' : color }}>{label}</span>
    </div>
  );
};

