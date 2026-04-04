import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Mode = 'fast' | 'balanced' | 'thorough';

export type PCModel = {
  id: string;
  name: string;        // "Llama 3.1"
  variant: string;     // "70B"
  sizeGB: number;
  tier: 'fast' | 'balanced' | 'thorough';
  isActive: boolean;   // active for its tier on PC
};

export type PCDevice = {
  id: string;
  name: string;
  connected: boolean;
  isActiveCompute: boolean;
  models: PCModel[];
};

export type Attachment = {
  name: string;
  extension: string;
  size?: string;
};

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'local' | 'system';
  timestamp: number;
  responseTime?: string;
  tokensPerSecond?: string;
  stopped?: boolean;
  generatedOn?: 'phone' | 'pc';
  attachment?: Attachment;
};

export type Conversation = {
  id: string;
  messages: Message[];
  mode: Mode;
  createdAt: number;
  // first user message used as title
  title: string;
};

export type Screen = 'onboarding' | 'chat';
export type OnboardingStep = 'brand' | 'models' | 'pc';

export type ModelStatus = 
  | 'ready'           // downloaded, can run
  | 'downloading'     // in progress
  | 'insufficient_memory'  // downloaded but can't load

export type InstalledModel = {
  id: string;
  name: string;        // "Llama 3.2"
  variant: string;     // "3B" / "7B" / "13B"
  sizeGB: number;      // 2.3
  tier: 'fast' | 'balanced' | 'thorough';
  status: ModelStatus;
  downloadProgress?: number;  // 0-100 when downloading
  isActive: boolean;   // currently powering its tier
  desc?: string;
};

type OverlayState = {
  menuOpen: boolean;
  qrOpen: boolean;
  settingsOpen: boolean;
  modeDropdownOpen: boolean;
  pcDropdownOpen: boolean;
  activeMessageId: string | null; // For action sheet
  editingMessageId: string | null; // For inline edit
  modelsOpen: boolean;
};

interface AppState {
  screen: Screen;
  setScreen: (s: Screen) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  newChat: () => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  pcMode: Mode;
  setPCMode: (m: Mode) => void;
  pcDevices: PCDevice[];
  setPCDevices: React.Dispatch<React.SetStateAction<PCDevice[]>>;
  usePC: boolean;
  setUsePC: (v: boolean) => void;
  activePCId: string | null;
  setActivePCId: (id: string | null) => void;
  activePC: PCDevice | null;
  isPCSession: boolean;
  disconnectPC: () => void;
  switchToPhone: () => void;
  switchToPC: () => void;
  internetFetch: boolean;
  setInternetFetch: (v: boolean) => void;
  overlays: OverlayState;
  setOverlay: (key: keyof OverlayState, value: any) => void;
  isComputing: boolean;
  setIsComputing: (v: boolean) => void;
  computeSource: 'phone' | 'pc';
  setComputeSource: (s: 'phone' | 'pc') => void;
  stopComputing: () => void;
  models: InstalledModel[];
  setModels: React.Dispatch<React.SetStateAction<InstalledModel[]>>;
  setModelActive: (modelId: string) => void;
  onboardingStep: OnboardingStep;
  setOnboardingStep: (s: OnboardingStep) => void;
  resetApp: () => void;
}

const AppContext = (globalThis as any).__AppContext || createContext<AppState | null>(null);
(globalThis as any).__AppContext = AppContext;

export const AppStoreProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [mode, setMode] = useState<Mode>('balanced');
  const [pcMode, setPCMode] = useState<Mode>('balanced');
  const [pcDevices, setPCDevices] = useState<PCDevice[]>([]);
  const [usePC, setUsePCState] = useState(false);
  const [activePCId, setActivePCId] = useState<string | null>(null);
  const [internetFetch, setInternetFetch] = useState(false);
  const [isComputing, setIsComputing] = useState(false);
  const [computeSource, setComputeSource] = useState<'phone' | 'pc'>('phone');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('brand');

  const activePC = pcDevices.find(pc => pc.id === activePCId) ?? null;
  const isPCSession = !!(activePC?.connected && usePC);

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

  const stopComputing = () => {
    setIsComputing(false);
    setComputeSource('phone');
    // Mark last message as stopped if it's local
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[newMessages.length - 1].sender === 'local') {
        newMessages[newMessages.length - 1].stopped = true;
      }
      return newMessages;
    });
  };

  const setUsePC = (v: boolean) => {
    setUsePCState(v);
    if (!v && isComputing && computeSource === 'pc') {
      stopComputing();
      setComputeSource('phone');
    }
  };

  const disconnectPC = () => {
    if (activePC) {
      setPCDevices(prev => prev.map(pc => pc.id === activePC.id ? { ...pc, connected: false } : pc));
      if (isComputing) {
        stopComputing();
      }
      setComputeSource('phone');
    }
  };

  const switchToPhone = () => {
    if (!usePC) return; // already on phone
    setUsePCState(false);
    if (isComputing && computeSource === 'pc') {
      stopComputing();
    }
    if (messages.length > 0) {
      setMessages(prev => [...prev, {
        id: `system-${Date.now()}`,
        text: 'switched to on-device',
        sender: 'system',
        timestamp: Date.now(),
      }]);
    }
  };

  const switchToPC = () => {
    if (!activePC?.connected) return; // PC not available
    if (usePC) return; // already on PC
    setUsePCState(true);
    if (messages.length > 0) {
      setMessages(prev => [...prev, {
        id: `system-${Date.now()}`,
        text: `switched to ${activePC.name.toLowerCase()}`,
        sender: 'system',
        timestamp: Date.now(),
      }]);
    }
  };
  
  const [models, setModels] = useState<InstalledModel[]>([
    { id: 'phi3-mini', name: 'Phi-3 Mini', variant: '3.8B', sizeGB: 2.3, tier: 'fast', status: 'ready', isActive: true },
    { id: 'llama32-3b', name: 'Llama 3.2', variant: '3B', sizeGB: 1.8, tier: 'fast', status: 'ready', isActive: false },
    { id: 'llama32-7b', name: 'Llama 3.2', variant: '7B', sizeGB: 4.1, tier: 'balanced', status: 'ready', isActive: true },
    { id: 'llama31-13b', name: 'Llama 3.1', variant: '13B', sizeGB: 7.8, tier: 'thorough', status: 'ready', isActive: true },
  ]);

  const [overlays, setOverlays] = useState<OverlayState>({
    menuOpen: false,
    qrOpen: false,
    settingsOpen: false,
    modeDropdownOpen: false,
    pcDropdownOpen: false,
    activeMessageId: null,
    editingMessageId: null,
    modelsOpen: false,
  });

  const setOverlay = (key: keyof OverlayState, value: any) => {
    setOverlays(prev => ({ ...prev, [key]: value }));
  };

  const setModelActive = (modelId: string) => {
    setModels(prev => {
      const model = prev.find(m => m.id === modelId);
      if (!model) return prev;
      
      const newModels = prev.map(m => {
        if (m.tier === model.tier) {
          return { ...m, isActive: m.id === modelId };
        }
        return m;
      });
      return newModels;
    });
  };

  const resetApp = () => {
    setScreen('onboarding');
    setOnboardingStep('brand');
    setMessages([]);
    setConversations([]);
    setMode('balanced');
    setPCMode('balanced');
    setPCDevices([]);
    setUsePCState(false);
    setActivePCId(null);
    setInternetFetch(false);
    setIsComputing(false);
    setComputeSource('phone');
    setModels([
      { id: 'phi3-mini', name: 'Phi-3 Mini', variant: '3.8B', sizeGB: 2.3, tier: 'fast', status: 'ready', isActive: true },
      { id: 'llama32-3b', name: 'Llama 3.2', variant: '3B', sizeGB: 1.8, tier: 'fast', status: 'ready', isActive: false },
      { id: 'llama32-7b', name: 'Llama 3.2', variant: '7B', sizeGB: 4.1, tier: 'balanced', status: 'ready', isActive: true },
      { id: 'llama31-13b', name: 'Llama 3.1', variant: '13B', sizeGB: 7.8, tier: 'thorough', status: 'ready', isActive: true },
    ]);
    setOverlays({
      menuOpen: false,
      qrOpen: false,
      settingsOpen: false,
      modeDropdownOpen: false,
      pcDropdownOpen: false,
      activeMessageId: null,
      editingMessageId: null,
      modelsOpen: false,
    });
  };

  return (
    <AppContext.Provider value={{
      screen, setScreen,
      messages, setMessages,
      conversations, setConversations,
      newChat,
      mode, setMode,
      pcMode, setPCMode,
      pcDevices, setPCDevices,
      usePC, setUsePC,
      activePCId, setActivePCId,
      activePC, isPCSession, disconnectPC, switchToPhone, switchToPC,
      internetFetch, setInternetFetch,
      overlays, setOverlay,
      isComputing, setIsComputing,
      computeSource, setComputeSource,
      stopComputing,
      models, setModels,
      setModelActive,
      onboardingStep, setOnboardingStep,
      resetApp
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider.");
  return ctx;
};
