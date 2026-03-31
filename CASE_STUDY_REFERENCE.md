# Case Study Content Reference

This file contains the text content extracted from the case studies to provide context for AI assistants.

## Local AI Case Study

### src\app\components\case-studies\localai-manager\index.tsx
- A privacy-first AI chat app. Runs on your phone. No account or cloud.
- Solution was a structural alternative.
- Cloud AI Paradigms
- Current Local Tools
- I wanted to build an AI app that works like any other app on your phone. You download it, open it, it works. No account. No internet required. No configuration. The model runs on your device and what you type stays there. That is the whole product.
- If you have a PC and want access to larger models, you can pair it once. The app uses it when available and falls back to the phone when not. But that is extra. The app does not need it to be useful and most users will never think about it.
- The person with something to protect.
- No good option today.
- The person who just wants it to work.
- No good option today.
- The person who knows exactly what they want.
- No good option today.
- No internet required.
- The app had to be completely useful with airplane mode on. This ruled out any feature that phoned home, any onboarding that needed a connection check, any trust signal that came from a server response. It also meant the first launch experience had to feel complete — not a promise of what the app would do once configured, but the actual thing, working, right now.
- No account. No signup.
- Identity is where privacy collapses. The moment you create an account, there is a record that you exist as a user, that you used the app, and potentially when. Removing the account entirely meant the product had to establish trust through behaviour rather than through a privacy policy. Every interaction had to be self-evidently local. The absence of a login screen is itself a design statement.
- Nothing leaves by default.
- Web access exists as an optional toggle — the model can fetch live information when the user explicitly enables it. But the default is off. And even when on, no account means no identity is attached to the request. The constraint shaped where the toggle lives in settings — not under Compute, where it would read as a capability, but under Privacy, where it reads as a disclosure. The label does the explaining. The toggle just confirms the choice.
- these three commitments made the design problems obvious — and the solutions follow from them.
- The phone runs models locally on its NPU — no network, no account, no server. That is the baseline and the complete product for most users. For those who want more, a PC can be paired over local Wi-Fi to run larger models. For users away from home the connection tunnels peer-to-peer through a minimal relay that brokers the handshake and steps aside — it never sees inference content.
- local network · direct
- remote · peer-to-peer via relay
- relay brokers connection only — never sees inference content.
- 7-34B Parameters
- Before color, type, or interaction, every screen existed as proportional blocks inside a phone frame. These lo-fi wireframes show the spatial structure of each screen — what goes where and how much room it takes — before any visual decisions were made.
- Chat — empty state
- QR pairing screen
- 4-digit confirmation
- lo-fi · proportional wireframes · structural layout only
- The key states of the app across onboarding, active chat sessions, and system configuration.
- Onboarding Phases
- Onboarding — phase 1
- Establish the core premise immediately. No servers, absolute privacy.
- your ai. your device.
- AI that runs entirely on your hardware. No accounts, no cloud, no exceptions.
- extends to your pc
- Onboarding — phase 2
- these models are already on your device. no download needed.
- you can add or remove models anytime from the menu.
- Onboarding — phase 3
- Introduce the PC extension paradigm as strictly optional but highly beneficial.
- have a pc nearby?
- pair your pc once to unlock larger models and faster responses. your phone stays the controller.
- run larger models than your phone supports alone
- faster inference on your hardware
- still fully private — local network only
- requires local network access · no data leaves your network
- Chat — phone mode
- A system pill records the switch in the conversation. The monitor icon on the right shows the PC is still available.
- switched to on-device
- Quantum gravity attempts to unify general relativity, which describes macro-scale gravity, with quantum mechanics...
- Chat — PC session active
- The header pill and byline both name the PC. The user always knows where compute is happening.
- Explain quantum gravity simply.
- History and compute toggle. The PC connection lives alongside previous chats, easily accessible.
- Explain quantum grav...
- Python script debug
- Mediterranean recipes
- Local LLM benchmarking
- Tapping the header drops down the tier list. The user thinks in tiers (fast/balanced), not model weights.
- quick answers, less detail
- deep, careful thought
- models run offline on your device
- good middle ground
- Header Compute States
- Key Screens — Settings
- The compute zone only appears after a PC is paired.
- Explain quantum grav...
- Python script debug
- Mediterranean recipes
- Local LLM benchmarking
- Web access lives under Privacy, not Compute. The label does the reframing.
- 16.4 GB of 256 GB
- Fast, balanced, thorough abstracts model names from the user entirely.
- Allow web access
- Export conversations
- Clear all conversations
- PIN Confirmation
- and phone handshake before pairing
- Local Network Only
- Auto-download Models
- This section shows the PC pairing interaction flow — the moment a user connects their phone to their PC for the first time. It is the most interaction-design-dense moment in the product.
- This sequence is the only moment in the product that requires user attention to infrastructure. Every other interaction is designed to make the underlying architecture invisible.
- Scan with your phone
- The PC displays a QR code encoding its local network address. The phone scans it to discover the PC and initiate a direct connection. Public keys are exchanged over that connection — no server involved at any point.
- 4-digit confirmation
- Both devices display the same 4-digit code — a hash of the exchanged keys. If the codes match, no man-in-the-middle attack occurred. The user confirms visually.
- Verify Connection
- Apple Silicon · Unified Memory
- Pairing complete
- The side menu compute zone expands from the single invite row into the full section — toggle, device name, online status. The UI reflects the new system state immediately.
- First PC session
- The privacy constraints were generative rather than limiting. No account meant the product had to establish trust through behaviour rather than brand. No cloud meant every interaction had to feel complete and self-contained. No data revelation by default meant every outbound action — even optional ones like web access — had to be surfaced as a deliberate choice. Each constraint eliminated whole categories of bad design decisions before I had to think about them.
- What Surprised Me
- Still Unresolved
- explaining a signal server

## UPI Balance Case Study

### src\app\components\case-studies\upi-balance\illustrations\CheckpointsIllustration.tsx
- Physical Cash Experience
- Digital Experience

### src\app\components\case-studies\upi-balance\illustrations\FinalInterventionIllustration.tsx
- Paid to Coffee Shop
- Feb 28, 2026 09:41 AM
- UPI transaction ID: 230821123456
- State Bank of India •••• 1234

### src\app\components\case-studies\upi-balance\illustrations\HeroIllustration.tsx
- And then — nothing.

### src\app\components\case-studies\upi-balance\sections\CashVsUpiSection.tsx
- With physical currency, the payment and the recalibration happened together. You saw the notes leave. You felt the change returning. By the time the transaction was done, you already had a rough number in your head. You didn't choose to do that math. The physical act did it for you.
- Want to check your balance after paying? Here's what that actually takes:
- Five steps. By which point most people have moved on entirely.
- The Core Problem
- Cash inherently provided a sense of balance. That awareness didn't disappear because people stopped caring—it disappeared because UPI gave it nowhere to happen.

### src\app\components\case-studies\upi-balance\sections\CheckpointsSection.tsx
- Physical currency had two.
- Digital kept one.
- Talking to 28 high-frequency digital payment users made one thing undeniably clear. Around every transaction, there are two natural moments of financial awareness — one before, one after. Physical currency naturally supported both. Modern interfaces only carried one of them across.

### src\app\components\case-studies\upi-balance\sections\DesignBoundarySection.tsx
- The goal is not to add friction or recreate what physical currency did manually. It's to put the post-payment check back into the confirmation flow — quietly, voluntarily, without getting in the way of people who don't need it. We must solve for awareness, but protect for privacy.

### src\app\components\case-studies\upi-balance\sections\ExploringDirectionsSection.tsx
- You've spent ₹1,200 today
- (null);    return (
- Before looking for solutions, I spent time with the existing Payment Successful screen. What is it actually designed to do? Get you out. Efficiently. It is a very well-designed dead end.
- Figure 01 — The Dead End
- Four directions explored
- The constraint was clear: bring the recalibration moment back without slowing the transaction down, exposing balance by default, or adding a mandatory step. These four directions were explored in order. The first was ruled out by architecture. The next two by UX problems. That left one.
- Concept 1: Auto-Display
- Simplest on the surface. Show the balance as soon as the payment confirms.
- Privacy: Exposed
- Technical: Unviable
- Concept 2: Voluntary Chip
- An optional "View Balance" chip. User-initiated, stays firmly within context.
- Private by default
- Zero extra navigation
- Concept 3: Masked Row
- Balance present but masked. Tap the row to reveal it.
- Ambiguous affordance
- Interaction confusion
- Concept 4: Contextual Nudge
- A smart nudge: once spending crosses a threshold, show an alert.
- Feels like surveillance
- Crosses into force-feeding

### src\app\components\case-studies\upi-balance\sections\FinalInterventionSection.tsx
- We return to the final moment. The payment is successful, the transaction is logged, but the cognitive loop is left open. Here is how we close it—without breaking the flow, without forcing an interaction, and without violating the architecture.
- Voluntary & seamless
- The core 'Done' flow remains completely untouched. The reflection opportunity sits alongside it—revealed smoothly via a bottom sheet within the success screen. The user never leaves the moment; the financial context remains intact.
- Restores the mental math
- Seeing the updated balance immediately after paying achieves what counting change once did. "Spent ₹250. ₹9,750 left." Two steps instead of five, exactly when it matters most.
- Tap View balance

### src\app\components\case-studies\upi-balance\sections\FlowComparisonSection.tsx
- The previous process of checking a balance post-payment required completely abandoning the transaction context. By placing the action inside the success state, we reduce cognitive load and friction significantly.
- Previous Flow (5 Steps)
- Optimized Flow (2 Steps)
- 60% Reduction in Interaction Cost

### src\app\components\case-studies\upi-balance\sections\HeroSection.tsx
- How digital payments inadvertently erased the
- for mental math.
- When we paid with physical currency, we always had an intuitive sense of our balance. Handing over notes and receiving change forced an automatic, unconscious calculation. That ritual is gone. Modern interfaces offer seamless speed, but they left behind the friction that kept us grounded.
- "Every cash transaction ended with a quiet recalibration. Every digital payment ends with a green tick and nothing else."
- Post-Payment Cognition

### src\app\components\case-studies\upi-balance\sections\MeasuringImpactSection.tsx
- By analyzing the qualitative outcomes of the prototype testing, three core behavioral shifts emerged. The intervention didn't just solve a navigation issue; it restored a missing psychological need.

### src\app\components\case-studies\upi-balance\sections\ObservedBehaviorSection.tsx
- Observations from 28 people, all performing 15 or more digital transactions a day. Three questions: when did you last check your balance after a payment — not before, after? Has a transaction ever failed because of insufficient balance? When you regularly used physical currency, did you have a sense of what was left?
- Qualitative and observational — not statistically validated.
- What users reported
- The issue isn't awareness.
- It's the cognitive cost of accessing it.
- The balance is available in the app. Anyone can go look for it. But looking means leaving the confirmation screen, navigating to another view, and re-authenticating — enough friction that most people simply don't bother after an everyday payment. The problem isn't that people stopped caring. It's that caring became too inconvenient.

### src\app\components\case-studies\upi-balance\sections\PrototypeValidationSection.tsx
- The working prototype was tested with 30+ individuals — some from the initial interviews, most completely cold. The phone was handed over on the payment success screen with no introduction. The only prompt: "You've just paid for something. What do you do next?"
- The vast majority tapped "View Balance" intuitively without any prompting. A few tapped "Done" out of pure muscle memory, realized what they missed, and actively returned to try it.
- The universal reaction across both behavioral groups was simple:
- "Why wasn't this always there?"

### src\app\components\case-studies\upi-balance\sections\ReflectionSection.tsx
- Interfaces should empower speed, but
- protect reflection.
- When we design strictly for metrics like completion rate and time-on-screen, we risk removing the natural human pauses that keep us grounded. True efficiency isn't just about moving fast. It's about moving with intent.

### src\app\components\case-studies\upi-balance\sections\TechnicalFeasibilitySection.tsx
- The obvious solution doesn't exist.
- And that's not a design choice.
- Showing the balance automatically on the confirmation screen seems like the obvious fix. But digging into the payment stack architecture reveals why that isn't possible. The answer closes the door on automatic solutions completely.
- The Architectural Constraint
- The payload contains transaction results, not the updated account balance. That number sits with the issuer bank and requires a separate, explicit API call.
- The Regulatory Reality
- Mandatory SMS notifications arrive out of context, often displaying sensitive info on the lock screen. The checkpoint happens at the wrong place and time.
- Voluntary Action
- Balance enquiries must be user-initiated by mandate. A deliberate, voluntary tap is the only architecturally viable and privacy-respecting solution.
- "You tap it. The system responds. In a small way, that deliberate action is closer to counting physical change than any automatic display could ever be."

### src\app\components\case-studies\upi-balance\sections\ThoughtExperimentSection.tsx
- The Thought That Clarified It
- To make the core problem clearer, I looked at the mechanics of a simple cash transaction.
- You hand over a ₹500 note for a ₹150 coffee. The cashier counts out and hands you back ₹350. In that brief, physical exchange of receiving change, something crucial happens in the background.
- As you receive the physical notes, your brain instinctively registers the new total. You do the math. You mentally recalibrate exactly what is left in your possession. The medium forces you to acknowledge the remainder.
- With UPI, the payment is confirmed instantly, but the change is invisible. A green tick shows the money left, but you are never forced to calculate what remains.
- The cognitive pause—the mental adjustment of your balance—has been engineered out entirely.

### src\app\components\case-studies\upi-balance\ui\badge.tsx
- &   VariantProps

### src\app\components\case-studies\upi-balance\ui\button.tsx
- &   VariantProps

### src\app\components\case-studies\upi-balance\ui\carousel.tsx
- [0];   api: ReturnType

### src\app\components\case-studies\upi-balance\ui\chart.tsx
- &   React.ComponentProps
- ) : (                     !hideIndicator && (

### src\app\components\case-studies\upi-balance\ui\pagination.tsx
- , "size"> &   React.ComponentProps

### src\app\components\case-studies\upi-balance\ui\sidebar.tsx
- Displays the mobile sidebar.

### src\app\components\case-studies\upi-balance\ui\toggle-group.tsx
- &   VariantProps
- &   VariantProps

### src\app\components\case-studies\upi-balance\ui\toggle.tsx
- &   VariantProps

