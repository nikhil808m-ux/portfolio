─── FIX 13: QR FLOW REVERSAL ───────────────────────────────

The pairing flow direction must be corrected.
The PC generates and displays the QR code.
The phone scans it using its camera.

In QRPairingScreen (phone side), replace the QR display 
UI with a camera viewfinder experience:

SCAN step — phone shows camera UI:
- Full dark screen with a centered square viewfinder frame
  Size: 240×240px
  Style: corner guides only — NOT a full border.
  Four L-shaped corner brackets, each 24px on each arm,
  2px stroke, color accent #C8B98A
  No fill, no full border — just the four corners
  This visually signals "aim your camera here"

- Instruction text above viewfinder:
  "point at your pc screen"
  font-mono 11px uppercase tracking-[0.1em] text-text-subtle
  centered

- Below viewfinder:
  "qr code is displayed on your pc"
  font-mono 10px text-text-subtle centered

- Scanning animation inside the viewfinder frame:
  Same horizontal amber line, y: 0→240→0, 2s linear infinite
  opacity 0.3, glow rgba(200,185,138,0.6)

- A faint camera-like vignette inside the viewfinder area:
  bg: rgba(0,0,0,0.15) with radial gradient clearing 
  in the center — simulates camera preview depth

- "tap to simulate scan" as a very subtle hint text 
  below the countdown: font-mono 9px text-text-subtle 
  opacity 0.4 — this is just for prototype demo purposes

Tapping anywhere on the viewfinder frame advances 
to the CONFIRM step (same as before).

CONFIRM and DONE steps remain unchanged.

On the PC interface (future build):
Note in code comments that the PC app generates 
and renders the QR code. Phone is always the scanner.

─── FIX 14: REMOVE STYLE PILLS ROW ────────────────────────

Remove the StyleSelector component entirely from ChatScreen.

Delete:
- The <StyleSelector /> render in ChatScreen's JSX
- The StyleSelector component definition
- The border-top spacing it occupied

The header mode dropdown (ModeDropdown in OverlayManager) 
is the single control for conversation mode.

Update InputArea padding:
Change pt-[8px] to pt-[10px] to slightly compensate 
for the removed element and keep input area 
breathing room consistent.

The mode pill in StatusBar remains — it passively 
shows the current mode without being a control.

─── FIX 15: AI MESSAGE BUBBLE REMOVAL ──────────────────────

AI responses should render like Claude.ai or ChatGPT — 
free-flowing text, no bubble container, no background,
no border. Full width. 

In MessageBubble component:

For AI messages (sender === 'local'):
Remove: bg-bg-surface, border, border-borders, 
  rounded-[14px], rounded-bl-[4px], p-[10px_13px]
  max-width constraint of 82%

Replace with:
- Full width (w-full)
- No background, no border, no border-radius
- padding: 0 (let it breathe naturally)
- Keep: font-sans text-[14px] font-light 
  text-text-primary leading-[1.6]
- The "local" label above stays exactly as is
- Performance metadata row below stays exactly as is
- The "· stopped" indicator stays

So the AI message structure becomes:
<div className="flex flex-col w-full items-start">
  <span className="font-mono text-[8.5px] uppercase 
    tracking-[0.12em] mb-2 text-accent opacity-80">
    local
  </span>
  <div className="font-sans text-[14px] font-light 
    text-text-primary leading-[1.6] w-full 
    whitespace-pre-wrap">
    {msg.text}
  </div>
  {/* stopped indicator */}
  {/* performance metadata */}
</div>

User messages keep their bubble exactly as is:
bg-bg-elevated, border-[#2C2C2C], rounded-[14px] 
rounded-br-[4px], max-width 82%, right-aligned.
No changes to user bubble styling.

Increase gap between messages from gap-[18px] 
to gap-[24px] in the messages container — 
the removed bubble border means messages need 
slightly more vertical separation to read clearly.

Also increase bottom padding on the messages 
container from pb-8 to pb-12 to ensure the last 
message doesn't sit too close to the input area.