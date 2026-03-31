# UPI Balance Visibility Case Study Reference

*This is an automatically generated structure of the text, headings, and images used in the case study.*


---
### File: `src\app\components\case-studies\upi-balance\illustrations\CheckpointsIllustration.tsx`
---


## {title}

{description}


## Physical Cash Experience

- Physical Cash Experience

## Digital Experience


---
### File: `src\app\components\case-studies\upi-balance\illustrations\FinalInterventionIllustration.tsx`
---

- Feb 28, 2026 09:41 AM
- UPI transaction ID: 230821123456

## Account balance

₹9,750.00

- State Bank of India •••• 1234

---
### File: `src\app\components\case-studies\upi-balance\illustrations\FlowComparisonIllustration.tsx`
---


## {title}


---
### File: `src\app\components\case-studies\upi-balance\illustrations\HeroIllustration.tsx`
---

Fig. 1 / Friction Loss

The green tick. And then — nothing.


---
### File: `src\app\components\case-studies\upi-balance\Section.tsx`
---


## {title}


## {subtitle}


---
### File: `src\app\components\case-studies\upi-balance\sections\CashVsUpiSection.tsx`
---


## {headline}

With physical currency, the payment and the recalibration happened together. You saw the notes leave. You felt the change returning. By the time the transaction was done, you already had a rough number in your head. You didn't choose to do that math. The physical act did it for you.

- With physical currency, the payment and the recalibration happened together. You saw the notes leave. You felt the change returning. By the time the transaction was done, you already had a rough number in your head. You didn't choose to do that math. The physical act did it for you.
Want to check your balance after paying? Here's what that actually takes:

- Want to check your balance after paying? Here's what that actually takes:
{step}

Five steps. By which point most people have moved on entirely.

- Five steps. By which point most people have moved on entirely.

## Cash inherently provided a sense of balance. That awareness didn't disappear because people stopped caring—it disappeared because UPI gave it nowhere to happen.

- Cash inherently provided a sense of balance. That awareness didn't disappear because people stopped caring—it disappeared because UPI gave it nowhere to happen.

---
### File: `src\app\components\case-studies\upi-balance\sections\CheckpointsSection.tsx`
---

- Physical currency had two.
Talking to 28 high-frequency digital payment users made one thing undeniably clear. Around every transaction, there are two natural moments of financial awareness — one before, one after. Physical currency naturally supported both. Modern interfaces only carried one of them across.

- Talking to 28 high-frequency digital payment users made one thing undeniably clear. Around every transaction, there are two natural moments of financial awareness — one before, one after. Physical currency naturally supported both. Modern interfaces only carried one of them across.

---
### File: `src\app\components\case-studies\upi-balance\sections\DesignBoundarySection.tsx`
---

The goal is not to add friction or recreate what physical currency did manually. It's to put the post-payment check back into the confirmation flow — quietly, voluntarily, without getting in the way of people who don't need it. We must solve for awareness, but protect for privacy.

- The goal is not to add friction or recreate what physical currency did manually. It's to put the post-payment check back into the confirmation flow — quietly, voluntarily, without getting in the way of people who don't need it. We must solve for awareness, but protect for privacy.

---
### File: `src\app\components\case-studies\upi-balance\sections\ExploringDirectionsSection.tsx`
---


## {title}

{desc}

- You've spent ₹1,200 today
Before looking for solutions, I spent time with the existing Payment Successful screen. What is it actually designed to do? Get you out. Efficiently. It is a very well-designed dead end.

- Before looking for solutions, I spent time with the existing Payment Successful screen. What is it actually designed to do? Get you out. Efficiently. It is a very well-designed dead end.
Figure 01 — The Dead End

- Figure 01 — The Dead End

## Four directions explored

- Four directions explored
The constraint was clear: bring the recalibration moment back without slowing the transaction down, exposing balance by default, or adding a mandatory step. These four directions were explored in order. The first was ruled out by architecture. The next two by UX problems. That left one.

- The constraint was clear: bring the recalibration moment back without slowing the transaction down, exposing balance by default, or adding a mandatory step. These four directions were explored in order. The first was ruled out by architecture. The next two by UX problems. That left one.

## Concept 1: Auto-Display

- Concept 1: Auto-Display
Simplest on the surface. Show the balance as soon as the payment confirms.

- Simplest on the surface. Show the balance as soon as the payment confirms.

## Concept 2: Voluntary Chip

- Concept 2: Voluntary Chip
An optional "View Balance" chip. User-initiated, stays firmly within context.

- An optional "View Balance" chip. User-initiated, stays firmly within context.
- Zero extra navigation

## Concept 3: Masked Row

- Concept 3: Masked Row
Balance present but masked. Tap the row to reveal it.

- Balance present but masked. Tap the row to reveal it.
- Interaction confusion

## Concept 4: Contextual Nudge

- Concept 4: Contextual Nudge
A smart nudge: once spending crosses a threshold, show an alert.

- A smart nudge: once spending crosses a threshold, show an alert.
- Feels like surveillance
- Crosses into force-feeding

---
### File: `src\app\components\case-studies\upi-balance\sections\FinalInterventionSection.tsx`
---

We return to the final moment. The payment is successful, the transaction is logged, but the cognitive loop is left open. Here is how we close it—without breaking the flow, without forcing an interaction, and without violating the architecture.

- We return to the final moment. The payment is successful, the transaction is logged, but the cognitive loop is left open. Here is how we close it—without breaking the flow, without forcing an interaction, and without violating the architecture.

## Voluntary & seamless

The core 'Done' flow remains completely untouched. The reflection opportunity sits alongside it—revealed smoothly via a bottom sheet within the success screen. The user never leaves the moment; the financial context remains intact.

- The core 'Done' flow remains completely untouched. The reflection opportunity sits alongside it—revealed smoothly via a bottom sheet within the success screen. The user never leaves the moment; the financial context remains intact.

## Restores the mental math

- Restores the mental math
Seeing the updated balance immediately after paying achieves what counting change once did. "Spent ₹250. ₹9,750 left." Two steps instead of five, exactly when it matters most.

- Seeing the updated balance immediately after paying achieves what counting change once did. "Spent ₹250. ₹9,750 left." Two steps instead of five, exactly when it matters most.

---
### File: `src\app\components\case-studies\upi-balance\sections\FlowComparisonSection.tsx`
---

The previous process of checking a balance post-payment required completely abandoning the transaction context. By placing the action inside the success state, we reduce cognitive load and friction significantly.

- The previous process of checking a balance post-payment required completely abandoning the transaction context. By placing the action inside the success state, we reduce cognitive load and friction significantly.

## Previous Flow (5 Steps)

- Previous Flow (5 Steps)

## Optimized Flow (2 Steps)

- Optimized Flow (2 Steps)
- 60% Reduction in Interaction Cost

---
### File: `src\app\components\case-studies\upi-balance\sections\HeroSection.tsx`
---


## The Lost 
              Reflection.


## How digital payments inadvertently erased the natural pause for mental math.

- How digital payments inadvertently erased the
When we paid with physical currency, we always had an intuitive sense of our balance. Handing over notes and receiving change forced an automatic, unconscious calculation. That ritual is gone. Modern interfaces offer seamless speed, but they left behind the friction that kept us grounded.

- When we paid with physical currency, we always had an intuitive sense of our balance. Handing over notes and receiving change forced an automatic, unconscious calculation. That ritual is gone. Modern interfaces offer seamless speed, but they left behind the friction that kept us grounded.
"Every cash transaction ended with a quiet recalibration. Every digital payment ends with a green tick and nothing else."

- "Every cash transaction ended with a quiet recalibration. Every digital payment ends with a green tick and nothing else."
- Post-Payment Cognition

---
### File: `src\app\components\case-studies\upi-balance\sections\MeasuringImpactSection.tsx`
---


## {title}

{desc}

By analyzing the qualitative outcomes of the prototype testing, three core behavioral shifts emerged. The intervention didn't just solve a navigation issue; it restored a missing psychological need.

- By analyzing the qualitative outcomes of the prototype testing, three core behavioral shifts emerged. The intervention didn't just solve a navigation issue; it restored a missing psychological need.

---
### File: `src\app\components\case-studies\upi-balance\sections\ObservedBehaviorSection.tsx`
---

{label}

{sublabel}

"{text}"

{author}

{role}

Observations from 28 people, all performing 15 or more digital transactions a day. Three questions: when did you last check your balance after a payment — not before, after? Has a transaction ever failed because of insufficient balance? When you regularly used physical currency, did you have a sense of what was left?

- Observations from 28 people, all performing 15 or more digital transactions a day. Three questions: when did you last check your balance after a payment — not before, after? Has a transaction ever failed because of insufficient balance? When you regularly used physical currency, did you have a sense of what was left?
Qualitative and observational — not statistically validated.

- Qualitative and observational — not statistically validated.
What users reported


## The issue isn't awareness. It's the cognitive cost of accessing it.

- The issue isn't awareness.
- It's the cognitive cost of accessing it.
The balance is available in the app. Anyone can go look for it. But looking means leaving the confirmation screen, navigating to another view, and re-authenticating — enough friction that most people simply don't bother after an everyday payment. The problem isn't that people stopped caring. It's that caring became too inconvenient.

- The balance is available in the app. Anyone can go look for it. But looking means leaving the confirmation screen, navigating to another view, and re-authenticating — enough friction that most people simply don't bother after an everyday payment. The problem isn't that people stopped caring. It's that caring became too inconvenient.

---
### File: `src\app\components\case-studies\upi-balance\sections\PrototypeValidationSection.tsx`
---

The working prototype was tested with 30+ individuals — some from the initial interviews, most completely cold. The phone was handed over on the payment success screen with no introduction. The only prompt: "You've just paid for something. What do you do next?"

- The working prototype was tested with 30+ individuals — some from the initial interviews, most completely cold. The phone was handed over on the payment success screen with no introduction. The only prompt: "You've just paid for something. What do you do next?"
The vast majority tapped "View Balance" intuitively without any prompting. A few tapped "Done" out of pure muscle memory, realized what they missed, and actively returned to try it.

- The vast majority tapped "View Balance" intuitively without any prompting. A few tapped "Done" out of pure muscle memory, realized what they missed, and actively returned to try it.
The universal reaction across both behavioral groups was simple: "Why wasn't this always there?"

- The universal reaction across both behavioral groups was simple:
- "Why wasn't this always there?"

---
### File: `src\app\components\case-studies\upi-balance\sections\ReflectionSection.tsx`
---


## Interfaces should empower speed, but protect reflection.

- Interfaces should empower speed, but
When we design strictly for metrics like completion rate and time-on-screen, we risk removing the natural human pauses that keep us grounded. True efficiency isn't just about moving fast. It's about moving with intent.

- When we design strictly for metrics like completion rate and time-on-screen, we risk removing the natural human pauses that keep us grounded. True efficiency isn't just about moving fast. It's about moving with intent.

---
### File: `src\app\components\case-studies\upi-balance\sections\TechnicalFeasibilitySection.tsx`
---

- The obvious solution doesn't exist.
- And that's not a design choice.
Showing the balance automatically on the confirmation screen seems like the obvious fix. But digging into the payment stack architecture reveals why that isn't possible. The answer closes the door on automatic solutions completely.

- Showing the balance automatically on the confirmation screen seems like the obvious fix. But digging into the payment stack architecture reveals why that isn't possible. The answer closes the door on automatic solutions completely.

## The Architectural Constraint

- The Architectural Constraint
The payload contains transaction results, not the updated account balance. That number sits with the issuer bank and requires a separate, explicit API call.

- The payload contains transaction results, not the updated account balance. That number sits with the issuer bank and requires a separate, explicit API call.

## The Regulatory Reality

- The Regulatory Reality
Mandatory SMS notifications arrive out of context, often displaying sensitive info on the lock screen. The checkpoint happens at the wrong place and time.

- Mandatory SMS notifications arrive out of context, often displaying sensitive info on the lock screen. The checkpoint happens at the wrong place and time.

## Voluntary Action

Balance enquiries must be user-initiated by mandate. A deliberate, voluntary tap is the only architecturally viable and privacy-respecting solution.

- Balance enquiries must be user-initiated by mandate. A deliberate, voluntary tap is the only architecturally viable and privacy-respecting solution.
"You tap it. The system responds. In a small way, that deliberate action is closer to counting physical change than any automatic display could ever be."

- "You tap it. The system responds. In a small way, that deliberate action is closer to counting physical change than any automatic display could ever be."

---
### File: `src\app\components\case-studies\upi-balance\sections\ThoughtExperimentSection.tsx`
---


## The Thought That Clarified It

- The Thought That Clarified It
To make the core problem clearer, I looked at the mechanics of a simple cash transaction.

- To make the core problem clearer, I looked at the mechanics of a simple cash transaction.
You hand over a ₹500 note for a ₹150 coffee. The cashier counts out and hands you back ₹350. In that brief, physical exchange of receiving change, something crucial happens in the background.

As you receive the physical notes, your brain instinctively registers the new total. You do the math. You mentally recalibrate exactly what is left in your possession. The medium forces you to acknowledge the remainder.

- As you receive the physical notes, your brain instinctively registers the new total. You do the math. You mentally recalibrate exactly what is left in your possession. The medium forces you to acknowledge the remainder.
With UPI, the payment is confirmed instantly, but the change is invisible. A green tick shows the money left, but you are never forced to calculate what remains. The cognitive pause—the mental adjustment of your balance—has been engineered out entirely.

- With UPI, the payment is confirmed instantly, but the change is invisible. A green tick shows the money left, but you are never forced to calculate what remains.
- The cognitive pause—the mental adjustment of your balance—has been engineered out entirely.

---
### File: `src\app\components\case-studies\upi-balance\ui\chart.tsx`
---

- & React.ComponentProps
- ) : ( !hideIndicator && (

---
### File: `src\app\components\case-studies\upi-balance\ui\form.tsx`
---

); } function FormMessage({ className, ...props }: React.ComponentProps) { const { error, formMessageId } = useFormField(); const body = error ? String(error?.message ?? "") : props.children; if (!body) { return null; } return ( {body}


---
### File: `src\app\components\case-studies\upi-balance\ui\pagination.tsx`
---

- , "size"> & React.ComponentProps

---
### File: `src\app\components\case-studies\upi-balance\ui\sidebar.tsx`
---

{children} ); } function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }: React.ComponentProps & { side?: "left" | "right"; variant?: "sidebar" | "floating" | "inset"; collapsible?: "offcanvas" | "icon" | "none"; }) { const { isMobile, state, openMobile, setOpenMobile } = useSidebar(); if (collapsible === "none") { return ( {children} ); } if (isMobile) { return ( button]:hidden" style={ { "--sidebar-width": SIDEBAR_WIDTH_MOBILE, } as React.CSSProperties } side={side} > Sidebar Displays the mobile sidebar. {children} ); } return ( {/* This is what handles the sidebar gap on desktop */} {children} ); } function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps) { const { toggleSidebar } = useSidebar(); return ( { onClick?.(event); toggleSidebar(); }} {...props} > Toggle Sidebar ); } function SidebarRail({ className, ...props }: React.ComponentProps) { const { toggleSidebar } = useSidebar(); return ( ); } function SidebarInset({ className, ...props }: React.ComponentProps) { return ( ); } function SidebarInput({ className, ...props }: React.ComponentProps) { return ( ); } function SidebarHeader({ className, ...props }: React.ComponentProps) { return ( ); } function SidebarFooter({ className, ...props }: React.ComponentProps) { return ( ); } function SidebarSeparator({ className, ...props }: React.ComponentProps) { return ( ); } function SidebarContent({ className, ...props }: React.ComponentProps) { return ( ); } function SidebarGroup({ className, ...props }: React.ComponentProps) { return ( ); } function SidebarGroupLabel({ className, asChild = false, ...props }: React.ComponentProps & { asChild?: boolean }) { const Comp = asChild ? Slot : "div"; return ( svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className, )} {...props} /> ); } function SidebarGroupAction({ className, asChild = false, ...props }: React.ComponentProps & { asChild?: boolean }) { const Comp = asChild ? Slot : "button"; return ( svg]:size-4 [&>svg]:shrink-0", // Increases the hit area of the button on mobile. "after:absolute after:-inset-2 md:after:hidden", "group-data-[collapsible=icon]:hidden", className, )} {...props} /> ); } function SidebarGroupContent({ className, ...props }: React.ComponentProps) { return ( ); } function SidebarMenu({ className, ...props }: React.ComponentProps) { return ( ); } function SidebarMenuItem({ className, ...props }: React.ComponentProps) { return ( ); } const sidebarMenuButtonVariants = cva( "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0", { variants: { variant: { default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]", }, size: { default: "h-8 text-sm", sm: "h-7 text-xs", lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!", }, }, defaultVariants: { variant: "default", size: "default", }, }, ); function SidebarMenuButton({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }: React.ComponentProps & { asChild?: boolean; isActive?: boolean; tooltip?: string | React.ComponentProps; } & VariantProps) { const Comp = asChild ? Slot : "button"; const { isMobile, state } = useSidebar(); const button = ( ); if (!tooltip) { return button; } if (typeof tooltip === "string") { tooltip = { children: tooltip, }; } return ( {button}

- Displays the mobile sidebar.
