# Local AI Manager Case Study Reference

*This is an automatically generated structure of the text, headings, and images used in the case study.*


---
### File: `src\app\components\case-studies\localai-manager\index.tsx`
---

{` Case Study`}

local /ai

A privacy-first AI chat app. Runs on your phone. No account or cloud.

- A privacy-first AI chat app. Runs on your phone. No account or cloud.
{`Every major AI assistant requires you to send your most sensitive thinking to a server you don't control.`}

Solution was a structural alternative.

- Solution was a structural alternative.
Product Design

UI UX

); } function Container1() { return ( ); } function Container5() { return ( ); } function Container() { return ( ); } function HeroSection() { return ( ); } function Heading1() { return ( {`"you give AI your drafts, your notes, your half-formed thoughts. is your data really `} private? {`"`}

02 —

{` The Problem Space`}

Cloud AI Paradigms

{`You open ChatGPT, type something private, and somewhere a server logs it. You agreed to that when you signed up. Most people don't think about it until they type something they wish they hadn't.`}

); } function Container11() { return ( Current Local Tools

{`Ollama and LM Studio are genuinely good — the problem isn't that they exist, it's that they assume too much. They assume you have a spare PC, that you're comfortable in a terminal, and that you don't mind being tethered to a desk. Most people who want private AI don't fit that description.`}

); } function Container7() { return ( ); } function ProblemSection() { return ( ); } function Text3() { return ( 03 —

{` The Design Hypothesis`}

I wanted to build an AI app that works like any other app on your phone. You download it, open it, it works. No account. No internet required. No configuration. The model runs on your device and what you type stays there. That is the whole product.

- I wanted to build an AI app that works like any other app on your phone. You download it, open it, it works. No account. No internet required. No configuration. The model runs on your device and what you type stays there. That is the whole product.
If you have a PC and want access to larger models, you can pair it once. The app uses it when available and falls back to the phone when not. But that is extra. The app does not need it to be useful and most users will never think about it.

- If you have a PC and want access to larger models, you can pair it once. The app uses it when available and falls back to the phone when not. But that is extra. The app does not need it to be useful and most users will never think about it.
); } function HypothesisSection() { return ( ); } function Text4() { return ( 04 —

{` Who is this for?`}

The person with something to protect.

- The person with something to protect.
{`A lawyer drafting arguments. A therapist writing session notes. A journalist protecting sources. They use AI every day but cannot afford to send that work to a server they don't control. LOCAL/AI gives them the tool without the exposure.`}

); } function Container16() { return ( No good option today.

- No good option today.
The person who just wants it to work.

- The person who just wants it to work.
{`They don't want to sign up. They don't want to think about which company has their data or what the terms say. They want to open an app, ask a question, and get an answer. No account. No cloud. Just the phone in their hand.`}

); } function Container19() { return ( No good option today.

- No good option today.
The person who knows exactly what they want.

- The person who knows exactly what they want.
{`Already runs Ollama. Has opinions about model quantisation. Wants a well-designed mobile interface that doesn't make them choose between privacy and usability. LOCAL/AI is the app this person has been waiting for someone to build.`}

); } function Container22() { return ( No good option today.

- No good option today.
05 —

{` What Needed Solving`}

{`Three commitments defined this product before any screen was designed. They weren't constraints in the limiting sense — they were the product. Every layout decision, every label, every interaction pattern had to be consistent with all three at once. That turned out to be more generative than restrictive.`}

); } function Text6() { return ( 01.

No internet required.

- No internet required.
The app had to be completely useful with airplane mode on. This ruled out any feature that phoned home, any onboarding that needed a connection check, any trust signal that came from a server response. It also meant the first launch experience had to feel complete — not a promise of what the app would do once configured, but the actual thing, working, right now.

- The app had to be completely useful with airplane mode on. This ruled out any feature that phoned home, any onboarding that needed a connection check, any trust signal that came from a server response. It also meant the first launch experience had to feel complete — not a promise of what the app would do once configured, but the actual thing, working, right now.
); } function Text7() { return ( 02.

No account. No signup.

- No account. No signup.
Identity is where privacy collapses. The moment you create an account, there is a record that you exist as a user, that you used the app, and potentially when. Removing the account entirely meant the product had to establish trust through behaviour rather than through a privacy policy. Every interaction had to be self-evidently local. The absence of a login screen is itself a design statement.

- Identity is where privacy collapses. The moment you create an account, there is a record that you exist as a user, that you used the app, and potentially when. Removing the account entirely meant the product had to establish trust through behaviour rather than through a privacy policy. Every interaction had to be self-evidently local. The absence of a login screen is itself a design statement.
); } function Text8() { return ( 03.

Nothing leaves by default.

- Nothing leaves by default.
Web access exists as an optional toggle — the model can fetch live information when the user explicitly enables it. But the default is off. And even when on, no account means no identity is attached to the request. The constraint shaped where the toggle lives in settings — not under Compute, where it would read as a capability, but under Privacy, where it reads as a disclosure. The label does the explaining. The toggle just confirms the choice.

- Web access exists as an optional toggle — the model can fetch live information when the user explicitly enables it. But the default is off. And even when on, no account means no identity is attached to the request. The constraint shaped where the toggle lives in settings — not under Compute, where it would read as a capability, but under Privacy, where it reads as a disclosure. The label does the explaining. The toggle just confirms the choice.
); } function Container24() { return ( ); } function Paragraph13() { return ( these three commitments made the design problems obvious — and the solutions follow from them.

- these three commitments made the design problems obvious — and the solutions follow from them.
); } function Text9() { return ( 06 —

{` System Architecture`}

The phone runs models locally on its NPU — no network, no account, no server. That is the baseline and the complete product for most users. For those who want more, a PC can be paired over local Wi-Fi to run larger models. For users away from home the connection tunnels peer-to-peer through a minimal relay that brokers the handshake and steps aside — it never sees inference content.

- The phone runs models locally on its NPU — no network, no account, no server. That is the baseline and the complete product for most users. For those who want more, a PC can be paired over local Wi-Fi to run larger models. For users away from home the connection tunnels peer-to-peer through a minimal relay that brokers the handshake and steps aside — it never sees inference content.
); } function Container41() { return ; } function Icon() { return ( ); } function Text10() { return ( local network · direct

- local network · direct
remote · peer-to-peer via relay

- remote · peer-to-peer via relay
relay brokers connection only — never sees inference content.

- relay brokers connection only — never sees inference content.
); } function Container47() { return ( ); } function Container49() { return ( On-Device NPU

1-3B Parameters

); } function Container52() { return ( ); } function Container54() { return ( Desktop GPU

7-34B Parameters

07 —

{` Ideation`}

Before color, type, or interaction, every screen existed as proportional blocks inside a phone frame. These lo-fi wireframes show the spatial structure of each screen — what goes where and how much room it takes — before any visual decisions were made.

- Before color, type, or interaction, every screen existed as proportional blocks inside a phone frame. These lo-fi wireframes show the spatial structure of each screen — what goes where and how much room it takes — before any visual decisions were made.
); } function Text14() { return ( Chat — empty state

Chat — active

Mode dropdown

Side menu

Models screen

Settings screen

QR pairing screen

4-digit confirmation

lo-fi · proportional wireframes · structural layout only

- lo-fi · proportional wireframes · structural layout only
08 —

{` The Interface`}

The key states of the app across onboarding, active chat sessions, and system configuration.

- The key states of the app across onboarding, active chat sessions, and system configuration.
); } function Heading15() { return ( Onboarding Phases

Onboarding — phase 1

Establish the core premise immediately. No servers, absolute privacy.

- Establish the core premise immediately. No servers, absolute privacy.
local/ai

your ai. your device.

- your ai. your device.
AI that runs entirely on your hardware. No accounts, no cloud, no exceptions.

- AI that runs entirely on your hardware. No accounts, no cloud, no exceptions.
runs offline {` · no internet required`}

stays on device {` · nothing leaves your hardware`}

extends to your pc {` · pair once for larger models`}

get started

); } function Button() { return ( ); } function Container255() { return ; } function Container256() { return ; } function Container257() { return ; } function Container254() { return ( ); } function ScreensSection2() { return ( ); } function Group() { return ( ); } function Group1() { return ( ); } function MaskGroup() { return ( ); } function MaskGroup1() { return ( ); } function MaskGroup2() { return ( ); } function Group2() { return ( ); } function ClipPathGroup() { return ( ); } function Frame() { return ( ); } function PhoneFrame() { return ( ); } function Container236() { return ( ); } function Container260() { return ( Onboarding — phase 2

{`The model list appears before the first message. No surprises about what's on the device.`}

); } function Container263() { return ; } function Container264() { return ; } function Container265() { return ; } function Container262() { return ( ); } function ScreensSection3() { return ( ); } function Container266() { return ( {`what's on your device`}

ready to use.

these models are already on your device. no download needed.

- these models are already on your device. no download needed.
); } function Text24() { return ( Phi-3 Mini

3.8B

2.3 GB

fast

Llama 3.2

7B

4.1 GB

balanced

Llama 3.1

13B

7.8 GB

thorough

you can add or remove models anytime from the menu.

- you can add or remove models anytime from the menu.
); } function Text33() { return ( next

); } function ScreensSection6() { return ( ); } function PhoneFrame1() { return ( ); } function Container258() { return ( ); } function Container287() { return ( Onboarding — phase 3

Introduce the PC extension paradigm as strictly optional but highly beneficial.

- Introduce the PC extension paradigm as strictly optional but highly beneficial.
); } function Container290() { return ; } function Container291() { return ; } function Container292() { return ; } function Container289() { return ( ); } function ScreensSection7() { return ( ); } function Icon7() { return ( ); } function Container293() { return ( ); } function Container294() { return ( optional

have a pc nearby?

pair your pc once to unlock larger models and faster responses. your phone stays the controller.

- pair your pc once to unlock larger models and faster responses. your phone stays the controller.
run larger models than your phone supports alone

- run larger models than your phone supports alone
faster inference on your hardware

- faster inference on your hardware
still fully private — local network only

- still fully private — local network only
requires local network access · no data leaves your network

- requires local network access · no data leaves your network
); } function Icon8() { return ( ); } function Text37() { return ( pair my pc

skip for now

); } function Container235() { return ( ); } function Container234() { return ( ); } function Heading19() { return ( {`Active Usage & Configuration`}

Chat — phone mode

A system pill records the switch in the conversation. The monitor icon on the right shows the PC is still available.

- A system pill records the switch in the conversation. The monitor icon on the right shows the PC is still available.
); } function Icon10() { return ( ); } function Container308() { return ( {`balanced `}

); } function Container309() { return ( ); } function ScreensSection10() { return ( ); } function Container310() { return ( switched to on-device

- switched to on-device
LOCAL

Quantum gravity attempts to unify general relativity, which describes macro-scale gravity, with quantum mechanics...

- Quantum gravity attempts to unify general relativity, which describes macro-scale gravity, with quantum mechanics...
ask anything_

); } function Container316() { return ( Chat — PC session active

- Chat — PC session active
The header pill and byline both name the PC. The user always knows where compute is happening.

- The header pill and byline both name the PC. The user always knows where compute is happening.
MacBook Pro

Explain quantum gravity simply.

- Explain quantum gravity simply.
MacBook Pro

24.2 tk/s

ask anything_

); } function Container330() { return ( Side Menu

History and compute toggle. The PC connection lives alongside previous chats, easily accessible.

- History and compute toggle. The PC connection lives alongside previous chats, easily accessible.
); } function Container332() { return ( ); } function ScreensSection16() { return ( ); } function Container334() { return ( LOCAL/AI

Today

Explain quantum grav...

- Explain quantum grav...
Python script debug

Mediterranean recipes

- Mediterranean recipes
Yesterday

Local LLM benchmarking

- Local LLM benchmarking
Use PC

); } function Container343() { return ( ); } function Icon14() { return ( ); } function Text43() { return ( MacBook Pro

); } function MaskGroup4() { return ( ); } function MaskGroup5() { return ( ); } function MaskGroup6() { return ( ); } function Group5() { return ( ); } function ClipPathGroup2() { return ( ); } function Group6() { return ( ); } function ClipPathGroup3() { return ( ); } function Group7() { return ( ); } function MaskGroup7() { return ( ); } function MaskGroup8() { return ( ); } function MaskGroup9() { return ( ); } function Group4() { return ( ); } function ClipPathGroup1() { return ( ); } function Group3() { return ( ); } function MaskGroup10() { return ( ); } function MaskGroup11() { return ( ); } function MaskGroup12() { return ( ); } function Group8() { return ( ); } function ClipPathGroup4() { return ( ); } function Group9() { return ( ); } function ClipPathGroup5() { return ( ); } function MaskGroup13() { return ( ); } function Group11() { return ( ); } function ClipPathGroup7() { return ( ); } function Group10() { return ( ); } function ClipPathGroup6() { return ( ); } function MaskGroup14() { return ( ); } function Frame1() { return ( ); } function PhoneFrame5() { return ( ); } function Container328() { return ( ); } function Container348() { return ( Model Selection

Tapping the header drops down the tier list. The user thinks in tiers (fast/balanced), not model weights.

- Tapping the header drops down the tier list. The user thinks in tiers (fast/balanced), not model weights.
ask anything

); } function Icon16() { return ( ); } function Container356() { return ( {`balanced `}

F

fast

quick answers, less detail

- quick answers, less detail
T

thorough

deep, careful thought

- deep, careful thought
manage models

); } function Container365() { return ( ); } function Container367() { return ; } function Text52() { return ( models run offline on your device

- models run offline on your device
B

balanced

good middle ground

); } function MaskGroup16() { return ( ); } function Group13() { return ( ); } function MaskGroup17() { return ( ); } function Group14() { return ( ); } function ClipPathGroup8() { return ( ); } function Group15() { return ( ); } function Group12() { return ( ); } function Group16() { return ( ); } function ClipPathGroup9() { return ( ); } function MaskGroup18() { return ( ); } function Frame2() { return ( ); } function PhoneFrame6() { return ( ); } function Container346() { return ( ); } function Container303() { return ( ); } function Container302() { return ( ); } function Heading20() { return ( Header Compute States

- Header Compute States
); } function HeaderStateCard() { return ( ); } function Icon18() { return ( ); } function Text56() { return ( pc available

balanced

); } function Container375() { return ; } function ScreensSection23() { return ( ); } function HeaderStateCard1() { return ( ); } function Icon20() { return ( ); } function Container377() { return ; } function Text57() { return ( MacBook Pro

); } function Group17() { return ( ); } function Group18() { return ( ); } function ClipPathGroup10() { return ( ); } function Group19() { return ( ); } function ClipPathGroup11() { return ( ); } function Group20() { return ( ); } function Frame4() { return ( ); } function HeaderStateCard2() { return ( ); } function MaskGroup22() { return ; } function Frame5() { return ( ); } function HeaderStateCard3() { return ( ); } function MaskGroup23() { return ; } function Group21() { return ( ); } function Frame6() { return ( ); } function Container373() { return ( ); } function Container372() { return ( ); } function Heading21() { return ( Key Screens — Settings

- Key Screens — Settings
Side menu

The compute zone only appears after a PC is paired.

- The compute zone only appears after a PC is paired.
); } function Text58() { return ( LOCAL/AI

Today

Explain quantum grav...

- Explain quantum grav...
Python script debug

Mediterranean recipes

- Mediterranean recipes
Yesterday

Local LLM benchmarking

- Local LLM benchmarking
Use PC

); } function Container392() { return ( ); } function Icon23() { return ( ); } function Text60() { return ( MacBook Pro

); } function Container397() { return ( Settings

Web access lives under Privacy, not Compute. The label does the reframing.

- Web access lives under Privacy, not Compute. The label does the reframing.
); } function MaskGroup25() { return ( ); } function MaskGroup26() { return ( ); } function MaskGroup27() { return ( ); } function MaskGroup28() { return ( ); } function MaskGroup29() { return ( ); } function Group22() { return ( ); } function ClipPathGroup12() { return ( ); } function MaskGroup30() { return ( ); } function MaskGroup31() { return ( ); } function Frame7() { return ( ); } function Text61() { return ( Storage

16.4 GB of 256 GB

Active Models

fast

Phi-3 Mini 3.8B

balanced

Llama 3.2 7B

thorough

Llama 3.1 13B

Download Models

); } function Container423() { return ( Models

Fast, balanced, thorough abstracts model names from the user entirely.

- Fast, balanced, thorough abstracts model names from the user entirely.
Privacy

Allow web access

); } function Container427() { return ( ); } function Text64() { return ( Export conversations

); } function Container428() { return ( ); } function Text65() { return ( Clear all conversations

- Clear all conversations
Device

); } function Text66() { return ( MacBook Pro

3 models online

unpair

); } function Group23() { return ( ); } function ClipPathGroup13() { return ( ); } function Group24() { return ( ); } function ClipPathGroup14() { return ( ); } function Frame8() { return ( ); } function PhoneFrame9() { return ( ); } function Container421() { return ( ); } function Container436() { return ( PIN Confirmation

{`Confirms the PC`}

and phone handshake before pairing

- and phone handshake before pairing
Network

Local Network Only

); } function Container440() { return ( ); } function Text69() { return ( Background Sync

); } function Container441() { return ( ); } function Text70() { return ( Auto-download Models

); } function Container442() { return ( ); } function Container439() { return ( ); } function Container443() { return ( P2P Relay

); } function Text71() { return ( Direct Link

Disabled

configure

); } function PhoneFrame10() { return ( ); } function Container434() { return ( ); } function Container379() { return ( ); } function Container378() { return ( ); } function Container233() { return ( ); } function Container232() { return ( ); } function ScreensSection() { return ( ); } function Text73() { return ( 09 —

{` One Flow in Detail`}

This section shows the PC pairing interaction flow — the moment a user connects their phone to their PC for the first time. It is the most interaction-design-dense moment in the product.

- This section shows the PC pairing interaction flow — the moment a user connects their phone to their PC for the first time. It is the most interaction-design-dense moment in the product.
); } function Paragraph23() { return ( This sequence is the only moment in the product that requires user attention to infrastructure. Every other interaction is designed to make the underlying architecture invisible.

- This sequence is the only moment in the product that requires user attention to infrastructure. Every other interaction is designed to make the underlying architecture invisible.
Step 01

Entry point

{`A single row in the side menu reads 'extend with pc →'. It only appears when no PC is paired. The invite disappears once it's no longer relevant.`}

); } function Container452() { return ( ); } function Container460() { return ; } function Container462() { return ; } function Container463() { return ; } function Container464() { return ; } function Container461() { return ( ); } function Text74() { return ( Extend with PC

→

); } function MaskGroup34() { return ( ); } function MaskGroup35() { return ( ); } function MaskGroup36() { return ( ); } function Group27() { return ( ); } function ClipPathGroup16() { return ( ); } function Group28() { return ( ); } function ClipPathGroup17() { return ( ); } function Group29() { return ( ); } function MaskGroup37() { return ( ); } function MaskGroup38() { return ( ); } function MaskGroup39() { return ( ); } function Group26() { return ( ); } function ClipPathGroup15() { return ( ); } function Group25() { return ( ); } function MaskGroup40() { return ( ); } function MaskGroup41() { return ( ); } function MaskGroup42() { return ( ); } function Group30() { return ( ); } function ClipPathGroup18() { return ( ); } function Group31() { return ( ); } function ClipPathGroup19() { return ( ); } function MaskGroup43() { return ( ); } function Group33() { return ( ); } function ClipPathGroup21() { return ( ); } function Group32() { return ( ); } function ClipPathGroup20() { return ( ); } function MaskGroup44() { return ( ); } function Frame10() { return ( ); } function Container457() { return ( ); } function Container456() { return ( ); } function Container468() { return ; } function Container467() { return ( ); } function Container451() { return ( ); } function Container473() { return ; } function Container474() { return ; } function Container477() { return ; } function Container478() { return ; } function Container479() { return ; } function Container476() { return ( ); } function Text76() { return ( Scan with your phone

to connect

); } function MaskGroup46() { return ( ); } function MaskGroup47() { return ( ); } function MaskGroup48() { return ( ); } function Group35() { return ( ); } function Group34() { return ( ); } function ClipPathGroup22() { return ( ); } function Frame11() { return ( ); } function Container472() { return ( ); } function Container471() { return ( ); } function Container470() { return ( ); } function Container539() { return ( Step 02

QR handshake

The PC displays a QR code encoding its local network address. The phone scans it to discover the PC and initiate a direct connection. Public keys are exchanged over that connection — no server involved at any point.

- The PC displays a QR code encoding its local network address. The phone scans it to discover the PC and initiate a direct connection. Public keys are exchanged over that connection — no server involved at any point.
); } function Container536() { return ( ); } function Container541() { return ; } function Container540() { return ( ); } function Container469() { return ( ); } function Container546() { return ( Step 03

4-digit confirmation

Both devices display the same 4-digit code — a hash of the exchanged keys. If the codes match, no man-in-the-middle attack occurred. The user confirms visually.

- Both devices display the same 4-digit code — a hash of the exchanged keys. If the codes match, no man-in-the-middle attack occurred. The user confirms visually.
); } function Container543() { return ( ); } function Container550() { return ( Verify Connection

4

2

8

9

Confirm Match

); } function Container549() { return ( ); } function Container548() { return ( ); } function Container547() { return ( ); } function Container559() { return ; } function Container558() { return ( ); } function Container542() { return ( ); } function Container566() { return ( Compute Zone

MacBook Pro

Apple Silicon · Unified Memory

- Apple Silicon · Unified Memory
Step 04

Pairing complete

The side menu compute zone expands from the single invite row into the full section — toggle, device name, online status. The UI reflects the new system state immediately.

- The side menu compute zone expands from the single invite row into the full section — toggle, device name, online status. The UI reflects the new system state immediately.
); } function Container574() { return ( ); } function Container579() { return ; } function Container578() { return ( ); } function Container560() { return ( ); } function Container584() { return ( Step 05

First PC session

{`The header centre changes from mode selector to the amber PC pill. The byline on AI responses changes from 'LOCAL' to the PC name. The user knows exactly what changed and why.`}

); } function Container581() { return ( ); } function Container590() { return ; } function Container591() { return ; } function Container589() { return ( ); } function Container593() { return ( MacBook Pro

); } function Text80() { return ( 10 —

{` Honest Reflections`}

What Worked

The privacy constraints were generative rather than limiting. No account meant the product had to establish trust through behaviour rather than brand. No cloud meant every interaction had to feel complete and self-contained. No data revelation by default meant every outbound action — even optional ones like web access — had to be surfaced as a deliberate choice. Each constraint eliminated whole categories of bad design decisions before I had to think about them.

- The privacy constraints were generative rather than limiting. No account meant the product had to establish trust through behaviour rather than brand. No cloud meant every interaction had to feel complete and self-contained. No data revelation by default meant every outbound action — even optional ones like web access — had to be surfaced as a deliberate choice. Each constraint eliminated whole categories of bad design decisions before I had to think about them.
); } function Heading30() { return ( {`What I'd Do Differently`}

{`I defined the hybrid model before defining the user precisely enough. The prototype implicitly assumes some technical literacy — a user who understands what a model tier means. A real product needs to work equally well for someone who just wants private AI and has never heard of Ollama. I'd start there next time.`}

); } function Heading31() { return ( What Surprised Me

{`How much design work the absence of a loading state does. On-device inference starts responding in under 300ms when the model is warm. There's no spinner, no progress bar, no latency to fill with reassurance. The UI has to communicate trust through immediacy rather than through the familiar rhythm of waiting. That constraint shaped more decisions than I expected going in.`}

); } function Heading32() { return ( Still Unresolved

{`The remote connection mode needs a relay server to broker the initial handshake between phone and PC when they're on different networks. The relay never sees inference content — only "these two devices want to connect." But explaining that distinction to a user who just heard "no servers, absolute privacy" is genuinely hard. The UI for this moment doesn't exist yet. It's the most important interaction design problem still open in this product.`}

); } function Container601() { return ( ); } function ReflectionSection() { return ( ); } function Text81() { return ( 11 —

{` What's Next`}

01

{`Prototyping the initial `} PC client app {` to anchor the desktop experience.`}

); } function Text83() { return ( 02

{`Designing robust `} error states {` and recovery flows for mid-session PC disconnections.`}

); } function Text84() { return ( 03

{`Tackling the honest problem of `} explaining a signal server {` to users while maintaining the core promise that no personal data goes through a cloud server.`}

- explaining a signal server
