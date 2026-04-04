import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, ChevronDown, Monitor, Copy, RefreshCcw, Pin, Trash2, Edit2, Check, X, ArrowUp, Square, Plus, FileText } from 'lucide-react';
import { useAppStore, Message } from './store';
import { Glyph } from './Glyph';

export const ChatScreen = () => {
  const { messages, setMessages, mode, setMode, pcDevices, activePCId, overlays, setOverlay, isComputing, setIsComputing, stopComputing, internetFetch, computeSource, setComputeSource, isPCSession, activePC } = useAppStore();
  const [inputText, setInputText] = useState('');
  const [attachment, setAttachment] = useState<{ name: string, extension: string, size: string } | null>(null);
  const [scrollPill, setScrollPill] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isSendingRef = useRef(false);

  // Use a ref to keep track of isComputing inside the timeout
  const isComputingRef = useRef(isComputing);
  useEffect(() => {
    isComputingRef.current = isComputing;
  }, [isComputing]);

  const isNearBottom = () => {
    if (!scrollRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    return scrollHeight - scrollTop - clientHeight < 100;
  };

  const generateRealisticResponse = (input: string, hasAttachment?: boolean) => {
    if (hasAttachment && (!input || !input.trim())) {
      return "I've received your file. I'm analyzing its contents locally on your device now. What would you like to know about it?";
    }
    const lowerInput = input ? input.toLowerCase() : "";
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) return "Hello! How can I assist you today?";
    if (lowerInput.includes('explain') || lowerInput.includes('what is')) return "That's a great question. In simple terms, it's a concept that refers to the underlying mechanics of how things interact in a system. To understand it fully, we can break it down into three main components: structure, function, and purpose.";
    if (lowerInput.includes('help') || lowerInput.includes('write')) return "I can certainly help you with that. Here is a quick draft you could use as a starting point:\n\n'Thank you for reaching out. I've reviewed the information and would be happy to proceed.'\n\nLet me know if you need any adjustments!";
    if (lowerInput.includes('code') || lowerInput.includes('react')) return "Here's a simple React component that demonstrates this:\n\n```jsx\nconst App = () => {\n  return <div>Hello World</div>;\n};\n```\n\nYou can easily expand on this by adding state and effects.";
    if (lowerInput.includes('think')) return "Let's think through this step by step. First, we need to identify the core constraints. Second, we can brainstorm potential solutions that fit within those boundaries. Finally, we can evaluate the trade-offs of each option to find the optimal path forward.";
    return "I understand what you're asking. Based on the context provided, the best approach would be to analyze the requirements carefully and iterate on the possible solutions. Since I'm processing this locally on your device, your data remains completely private.";
  };

  const handleSend = (override?: string | React.MouseEvent | React.KeyboardEvent) => {
    // If override is an event object, we don't want to use it as the text
    const textToUse = typeof override === 'string' ? override : inputText;
    if ((!textToUse || typeof textToUse !== 'string' || !textToUse.trim()) && !attachment) return;
    if (isSendingRef.current) return;
    if (isComputing) return;
    if (overlays.editingMessageId) return;
    isSendingRef.current = true;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: textToUse,
      sender: 'user',
      timestamp: Date.now(),
      ...(attachment ? { attachment } : {})
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setAttachment(null);
    setIsComputing(true);

    setTimeout(scrollToBottom, 50);

    // Check for compute source
    if (isPCSession) {
      setComputeSource('pc');
    }

    // Simulate computing
    setTimeout(() => {
      // Check if still computing
      if (!isComputingRef.current) {
        isSendingRef.current = false;
        return;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: generateRealisticResponse(textToUse, !!newMsg.attachment),
        sender: 'local',
        timestamp: Date.now() + 1000,
        responseTime: "1.2s",
        tokensPerSecond: "34 tok/s",
        generatedOn: isPCSession ? 'pc' : 'phone',
      };

      if (!isNearBottom()) setHasNewMessage(true);
      setMessages(prev => [...prev, aiMsg]);
      setIsComputing(false);
      isSendingRef.current = false;

      setTimeout(scrollToBottom, 50);

      // Only reset to phone if not in PC session
      if (!isPCSession) {
        setComputeSource('phone');
      }
    }, 2000);
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    setScrollPill(false);
    setHasNewMessage(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollHeight - scrollTop - clientHeight > 50) {
      setScrollPill(true);
    } else {
      setScrollPill(false);
      setHasNewMessage(false);
    }
  };

  useEffect(() => {
    // Timeout ensures DOM has updated and animations have started before scrolling
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages.length, isComputing]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col bg-bg-primary pt-[59px] pb-[34px] box-border"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <Header />

      <div className="flex-1 relative min-h-0 flex flex-col">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col p-[18px_16px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center m-auto max-w-[280px] gap-6">
              <Glyph size={40} />
              <div className="flex flex-col gap-2 w-full">
                {['explain something complex', 'help me write', 'think through a problem'].map(chip => (
                  <button
                    key={chip}
                    className="bg-bg-surface border border-[#222] rounded-[8px] p-[8px_14px] font-mono text-[11px] text-text-subtle hover:border-[#2A2A2A] hover:text-[#D4D4D4] transition-colors"
                    onClick={() => handleSend(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-0 w-full pb-12">
              <div className="flex items-center gap-2 w-full my-2">
                <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]"></div>
                <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-subtle">TODAY</div>
                <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]"></div>
              </div>
              {(() => {
                const lastAIIndex = [...messages].reverse().findIndex(m => m.sender === 'local');
                const lastAIId = lastAIIndex >= 0 ? messages[messages.length - 1 - lastAIIndex].id : null;

                return messages.map((msg, i) => {
                  const prev = messages[i - 1];
                  // System messages always get fixed margin,
                  // never collapse with adjacent messages
                  const isSystemMsg = msg.sender === 'system';
                  const prevIsSystem = prev?.sender === 'system';
                  const sameSender = !isSystemMsg
                    && !prevIsSystem
                    && prev?.sender === msg.sender;

                  const marginTop = i === 0
                    ? 0
                    : isSystemMsg || prevIsSystem
                      ? 20
                      : sameSender ? 16 : 28;

                  return (
                    <div
                      key={msg.id}
                      style={{ marginTop }}
                    >
                      <MessageBubble msg={msg} isLatestAI={msg.id === lastAIId} showToast={showToast} />
                    </div>
                  );
                });
              })()}
              {isComputing && (
                <div className="flex flex-col items-start w-full mt-[28px]">
                  <div className="font-mono text-[8.5px] uppercase text-accent opacity-80 mb-2 tracking-[0.12em]">
                    {isPCSession && computeSource === 'pc'
                      ? (activePC?.name ?? 'pc')
                      : 'local'}
                  </div>
                  <div className="flex items-center">
                    <div className="flex gap-[4px]">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-[5px] h-[5px] bg-accent rounded-full"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <AnimatePresence>
          {scrollPill && (
            <motion.button
              key="scroll-pill"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollToBottom}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-bg-elevated text-accent font-mono text-[10px] border border-accent-border rounded-[20px] p-[6px_14px] shadow-lg z-10 flex items-center gap-1"
            >
              ↓
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col shrink-0">
        <InputArea
          inputText={inputText}
          setInputText={setInputText}
          handleSend={handleSend}
          inputRef={inputRef}
          attachment={attachment}
          setAttachment={setAttachment}
        />
      </div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key="toast-msg"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="absolute bottom-[130px] left-1/2 bg-bg-elevated border border-accent-border rounded-[20px] px-4 py-2 font-mono text-[10px] text-accent shadow-lg z-50 whitespace-nowrap pointer-events-none"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Header = () => {
  const {
    mode, pcMode, overlays, setOverlay,
    isComputing, isPCSession, activePC, usePC,
    pcDevices, switchToPC
  } = useAppStore();

  // A PC is "available" if it's paired, connected, but usePC is false
  const pcAvailable = pcDevices.some(pc => pc.connected) && !usePC;

  // A PC is "known but offline" if paired but not connected (and not in session)
  const pcOffline = pcDevices.length > 0 && !pcDevices.some(pc => pc.connected) && !isPCSession;

  // Mutual exclusion helpers
  const toggleModeDropdown = () => {
    setOverlay('pcDropdownOpen', false);
    setOverlay('modeDropdownOpen',
      !overlays.modeDropdownOpen);
  };
  const togglePCDropdown = () => {
    setOverlay('modeDropdownOpen', false);
    setOverlay('pcDropdownOpen',
      !overlays.pcDropdownOpen);
  };

  return (
    <div className="h-[60px] border-b border-[rgba(255,255,255,0.04)] flex items-center justify-between px-4 shrink-0 bg-bg-primary">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
      `}</style>
      {/* Left — hamburger */}
      <button
        className="w-10 h-10 flex flex-col justify-center gap-[4px] items-start"
        onClick={() => setOverlay('menuOpen', true)}
      >
        <div className="h-[1.5px] bg-text-secondary w-[18px] rounded-full" />
        <div className="h-[1.5px] bg-text-secondary w-[12px] rounded-full" />
        <div className="h-[1.5px] bg-text-secondary w-[15px] rounded-full" />
      </button>

      {/* Centre — mode selector or empty */}
      {isPCSession ? (
        <motion.button
          key="pc-pill-centre"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={togglePCDropdown}
          className="flex items-center gap-[5px] bg-[rgba(200,185,138,0.08)] border border-[rgba(200,185,138,0.18)] rounded-full px-[10px] h-[30px] cursor-pointer whitespace-nowrap"
        >
          <AnimatePresence>
            {isComputing && (
              <motion.div
                key="pulse-dot"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="w-[4px] h-[4px] bg-accent rounded-full shrink-0"
                style={{ animation: isComputing ? 'pulse 1.2s ease-in-out infinite' : 'none' }}
              />
            )}
          </AnimatePresence>

          <Monitor className="w-[11px] h-[11px] text-accent shrink-0" />

          <span className="font-mono text-[10px] text-accent tracking-[0.02em] max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
            {activePC?.name ?? 'your pc'}
          </span>

          <ChevronDown className="w-[9px] h-[9px] text-accent opacity-50 shrink-0" />
        </motion.button>
      ) : (
        <button
          className="flex flex-col items-center"
          onClick={toggleModeDropdown}
        >
          <div className="flex items-center gap-1 font-mono text-[13px] font-medium text-text-primary">
            {mode}
            <ChevronDown className="w-3.5 h-3.5 text-text-subtle" />
          </div>
        </button>
      )}

      {/* Right — compute source switcher */}
      <div className="flex items-center justify-end w-10 h-10 relative">
        <AnimatePresence mode="wait">

          {/* PC SESSION active: empty — pill in centre is the focus */}
          {isPCSession && (
            <div key="session-empty" className="w-10 h-10" />
          )}

          {/* PC available, user on phone: lit amber icon — tappable to switch */}
          {!isPCSession && pcAvailable && (
            <motion.button
              key="pc-available"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={switchToPC}
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
              title="switch to pc compute"
            >
              <div className="relative">
                <Monitor className="w-[15px] h-[15px] text-accent group-hover:opacity-80 transition-opacity" />
                <div className="absolute -top-[2px] -right-[2px] w-[5px] h-[5px] bg-accent rounded-full shadow-[0_0_6px_rgba(200,185,138,0.6)]" />
              </div>
            </motion.button>
          )}

          {/* PC known but offline: dim icon, not interactive */}
          {!isPCSession && pcOffline && (
            <motion.div
              key="pc-offline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Monitor className="w-[15px] h-[15px] text-text-subtle opacity-25" />
            </motion.div>
          )}

          {/* No PC paired: empty */}
          {!isPCSession && !pcAvailable && !pcOffline && (
            <div key="no-pc" className="w-10 h-10" />
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

const InputArea = ({ inputText, setInputText, handleSend, inputRef, attachment, setAttachment }: any) => {
  const [focused, setFocused] = useState(false);
  const { isComputing, stopComputing } = useAppStore();

  const textareaRef = inputRef;

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  useEffect(() => {
    autoResize();
  }, [inputText]);

  return (
    <motion.div
      className="px-[16px] pb-[12px] pt-[10px] shrink-0 bg-bg-primary"
      animate={{ y: focused ? -2 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      <div className={`relative flex flex-col bg-bg-surface border rounded-[26px] p-[8px_8px_8px_8px] min-h-[50px] transition-all ${focused ? 'border-[#333] shadow-[0_0_0_3px_rgba(200,185,138,0.04)]' : 'border-transparent'}`}>

        <AnimatePresence>
          {attachment && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              className="mx-2 mt-1 mb-2 overflow-hidden"
            >
              <div className="flex items-center gap-3 bg-bg-elevated border border-[#2C2C2C] rounded-[10px] p-[8px_12px] w-fit relative group">
                <div className="w-[30px] h-[30px] rounded-[6px] bg-[#1E1E1E] flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-text-secondary" />
                </div>
                <div className="flex flex-col pr-6">
                  <span className="font-mono text-[12px] text-text-primary truncate max-w-[120px]">{attachment.name}</span>
                  <span className="font-mono text-[9px] text-text-subtle uppercase">{attachment.extension} • {attachment.size}</span>
                </div>
                <button
                  onClick={() => setAttachment(null)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-subtle hover:text-[#FF5555] transition-colors"
                >
                  <X className="w-[14px] h-[14px]" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-end relative w-full">
          <button
            className="w-[34px] h-[34px] shrink-0 rounded-full flex items-center justify-center text-text-subtle hover:text-text-primary transition-colors mr-1 mb-[1px]"
            onClick={() => {
              setAttachment({
                name: 'project_brief',
                extension: 'PDF',
                size: '2.4 MB'
              });
            }}
          >
            <Plus className="w-[18px] h-[18px]" />
          </button>

          <div className="relative flex-1 flex items-end min-h-[34px]">
            {!inputText && !focused && (
              <div className="absolute left-[2px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center h-full">
                <span className="font-mono text-[12px] text-text-subtle tracking-[0.03em]">
                  ask anything
                </span>
                <span
                  className="font-mono text-[12px] text-text-subtle ml-[1px]"
                  style={{ animation: 'blink 1.1s step-end infinite' }}
                >
                  _
                </span>
              </div>
            )}
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if ((inputText.trim() || attachment) && !isComputing) {
                    handleSend();
                  }
                }
              }}
              onInput={autoResize}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full bg-transparent font-sans text-[15px] font-light text-text-primary outline-none resize-none max-h-[120px] pb-[7px] pt-[7px] px-[2px]"
              rows={1}
              style={{
                overflowY: inputText.split('\n').length > 4 ? 'auto' : 'hidden'
              }}
            />
          </div>

          <AnimatePresence mode="popLayout">
            {isComputing ? (
              <motion.button
                key="stop"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={stopComputing}
                className="w-[34px] h-[34px] ml-2 mb-[1px] shrink-0 rounded-full bg-bg-elevated border border-accent-border flex items-center justify-center"
              >
                <Square className="w-[11px] h-[11px] fill-accent text-accent" />
              </motion.button>
            ) : (inputText.trim().length > 0 || attachment) ? (
              <motion.button
                key="send"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                className="w-[34px] h-[34px] ml-2 mb-[1px] shrink-0 rounded-full bg-text-primary flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ArrowUp className="w-[15px] h-[15px] text-bg-primary" strokeWidth={2.5} />
              </motion.button>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const MessageBubble = ({ msg, isLatestAI, showToast }: { msg: Message, isLatestAI?: boolean, showToast: (msg: string) => void }) => {
  const { overlays, setOverlay, setMessages, setIsComputing, isComputing, isPCSession } = useAppStore();
  const isUser = msg.sender === 'user';
  const isEditing = overlays.editingMessageId === msg.id;
  const [editVal, setEditVal] = useState(msg.text);
  const [showMeta, setShowMeta] = useState(false);

  const isComputingRef = useRef(isComputing);
  useEffect(() => {
    isComputingRef.current = isComputing;
  }, [isComputing]);

  useEffect(() => {
    setEditVal(msg.text);
  }, [msg.text, isEditing]);

  if (msg.sender === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full flex justify-center"
      >
        <div className="font-mono text-[9px] text-text-subtle bg-bg-surface px-3 py-1.5 rounded-full border border-borders">
          {msg.text}
        </div>
      </motion.div>
    );
  }

  if (isEditing && isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col w-full items-end"
      >
        <div className="font-mono text-[8.5px] uppercase tracking-[0.12em] mb-1 text-text-subtle">
          you
        </div>
        <div className="max-w-[82%] w-full flex flex-col items-end">
          <textarea
            autoFocus
            value={editVal}
            onChange={e => setEditVal(e.target.value)}
            className="w-full bg-bg-surface border border-accent rounded-[14px] rounded-br-[4px] p-[10px_13px] font-sans text-[14px] font-light text-text-primary leading-[1.6] outline-none shadow-[0_0_0_2px_rgba(200,185,138,0.1)] resize-none"
            rows={Math.max(1, editVal.split('\n').length)}
          />
          <div className="flex items-center gap-2 mt-2">
            <button
              className="w-[28px] h-[28px] rounded-full bg-bg-elevated border border-borders flex items-center justify-center text-text-subtle hover:text-[#FF5555]"
              onClick={() => { setOverlay('editingMessageId', null); setEditVal(msg.text); }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <button
              className={`w-[28px] h-[28px] rounded-full bg-bg-elevated border border-accent-border flex items-center justify-center text-accent transition-colors ${editVal.trim().length === 0 ? 'opacity-30 cursor-not-allowed pointer-events-none' : 'hover:bg-accent hover:text-bg-primary'
                }`}
              disabled={editVal.trim().length === 0}
              onClick={() => {
                if (editVal.trim().length === 0) return;
                setOverlay('editingMessageId', null);

                setMessages(prev => {
                  const idx = prev.findIndex(m => m.id === msg.id);
                  if (idx === -1) return prev;
                  // Remove subsequent messages and update this one
                  const newMsgs = prev.slice(0, idx + 1);
                  newMsgs[idx].text = editVal;
                  return newMsgs;
                });

                // Simulate re-generation after edit
                setIsComputing(true);
                setTimeout(() => {
                  if (!isComputingRef.current) return;
                  const aiMsg: Message = {
                    id: `regen-${Date.now()}`,
                    text: "I've processed your updated request. Here is a revised perspective taking your new instructions into account. As always, everything is running privately on your local hardware.",
                    sender: 'local',
                    timestamp: Date.now(),
                    responseTime: '0.9s',
                    tokensPerSecond: '41 tok/s',
                    generatedOn: isPCSession ? 'pc' : 'phone',
                  };
                  setMessages(prev => [...prev, aiMsg]);
                  setIsComputing(false);
                }, 1800);
              }}
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex flex-col w-full ${isUser ? 'items-end' : 'items-start'}`}
    >
      {!isUser && (
        <div className={`font-mono text-[8.5px] uppercase tracking-[0.12em] mb-2 text-accent transition-opacity ${isLatestAI ? 'opacity-80' : 'opacity-30'}`}>
          local
        </div>
      )}

      <motion.div
        onContextMenu={(e) => {
          e.preventDefault();
          if (navigator.vibrate) navigator.vibrate(20);
          setOverlay('activeMessageId', msg.id);
        }}
        onDoubleClick={() => {
          if (navigator.vibrate) navigator.vibrate(20);
          if (isUser) setOverlay('editingMessageId', msg.id);
        }}
        whileTap={isUser ? { scale: 0.98 } : {}}
        className={
          isUser
            ? 'max-w-[82%] border border-[#2C2C2C] p-[10px_13px] relative cursor-pointer bg-bg-elevated rounded-[14px] rounded-br-[4px]'
            : 'w-full relative cursor-pointer p-0'
        }
      >
        {msg.attachment && (
          <div className={`flex items-center gap-3 bg-bg-surface border border-[#2C2C2C] rounded-[8px] p-[8px_10px] ${msg.text.trim() ? 'mb-2' : ''} max-w-fit`}>
            <div className="w-[28px] h-[28px] rounded-[6px] bg-[#222] flex items-center justify-center flex-shrink-0">
              <FileText className="w-3.5 h-3.5 text-text-secondary" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[11px] text-text-primary truncate max-w-[140px]">{msg.attachment.name}</span>
              <span className="font-mono text-[9px] text-text-subtle uppercase">{msg.attachment.extension} {msg.attachment.size ? `• ${msg.attachment.size}` : ''}</span>
            </div>
          </div>
        )}
        {msg.text.trim() && (
          <div className={`font-sans text-[14px] font-light text-text-primary leading-[1.6] whitespace-pre-wrap break-words ${isUser ? '' : 'w-full'}`}>
            {msg.text}
          </div>
        )}

        {msg.stopped && (
          <div className="mt-2 font-mono text-[9px] text-text-subtle italic">
            · stopped
          </div>
        )}
      </motion.div>

      {isUser ? (
        <div className="mt-1.5 flex items-center gap-1.5 font-mono text-[8.5px] text-text-subtle">
          <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      ) : (
        <div className="mt-1.5 flex items-center justify-between w-full">
          <div className="flex items-center gap-1 -ml-2">
            <button
              className="text-text-subtle hover:text-text-secondary transition-colors p-2"
              title="Regenerate"
              onClick={() => {
                if (isComputing) return;
                setIsComputing(true);
                // Simple regen simulation
                setTimeout(() => {
                  if (!isComputingRef.current) return;
                  const aiMsg: Message = {
                    id: `regen-${Date.now()}`,
                    text: "Here is an alternative response. By rethinking the context, we can explore a different angle to this problem while maintaining the same privacy guarantees.",
                    sender: 'local',
                    timestamp: Date.now(),
                    responseTime: '1.1s',
                    tokensPerSecond: '38 tok/s',
                    generatedOn: isPCSession ? 'pc' : 'phone',
                  };
                  setMessages(prev => {
                    const idx = prev.findIndex(m => m.id === msg.id);
                    if (idx === -1) return prev;
                    const newMsgs = [...prev];
                    newMsgs[idx] = aiMsg;
                    return newMsgs;
                  });
                  setIsComputing(false);
                }, 1500);
              }}
            >
              <RefreshCcw className="w-[15px] h-[15px]" />
            </button>
            <button
              className="text-text-subtle hover:text-text-secondary transition-colors p-2"
              title="Copy"
              onClick={() => {
                const fallbackCopy = (text: string) => {
                  const textArea = document.createElement('textarea');
                  textArea.value = text;
                  // Avoid scrolling to bottom
                  textArea.style.top = '0';
                  textArea.style.left = '0';
                  textArea.style.position = 'fixed';
                  document.body.appendChild(textArea);
                  textArea.focus();
                  textArea.select();
                  try {
                    document.execCommand('copy');
                  } catch (err) {
                    console.error('Fallback copy failed', err);
                  }
                  document.body.removeChild(textArea);
                };

                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(msg.text).then(() => showToast('copied to clipboard')).catch(() => {
                    // Fallback silently if Clipboard API is blocked by permissions
                    fallbackCopy(msg.text);
                    showToast('copied to clipboard');
                  });
                } else {
                  fallbackCopy(msg.text);
                  showToast('copied to clipboard');
                }
              }}
            >
              <Copy className="w-[15px] h-[15px]" />
            </button>
          </div>

          <div
            className="flex items-center gap-1.5 font-mono text-[8.5px] text-text-subtle cursor-pointer p-2 -mr-2"
            onClick={() => setShowMeta(prev => !prev)}
          >
            <AnimatePresence mode="wait">
              {showMeta && msg.responseTime && (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  <span className="text-text-secondary">{msg.responseTime}</span>
                  <span className="text-text-subtle">·</span>
                  <span className="text-text-secondary">{msg.tokensPerSecond}</span>
                </motion.div>
              )}
            </AnimatePresence>
            {msg.generatedOn === 'pc' && (
              <>
                {showMeta && msg.responseTime && <span className="text-text-subtle ml-0.5">·</span>}
                <Monitor className="w-[9px] h-[9px] text-text-subtle opacity-40" />
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};