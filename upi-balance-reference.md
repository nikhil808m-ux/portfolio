# UPI Balance Visibility Case Study Reference

*Detailed metadata: typography, bounding boxes, and screen placement.*


---
## File: `src\app\components\case-studies\upi-balance\illustrations\CheckpointsIllustration.tsx`
---

- {showCheckpoint && ( {showCheckpoint} )} {title} {description}
  - **Tag**: `motion.div`
  - **Font/Style/Layout**: `relative flex flex-col items-center z-10 w-1/3`
- {/* Cash Flow */} Physical Cash Experience {/* Flow Arrows */} {/* Solid Line Background */}
  - **Tag**: `div`
  - **Font/Style/Layout**: `w-full max-w-4xl mx-auto py-8 flex flex-col gap-12`
- Digital Experience {/* Flow Arrows */} {/* Line Background */}
  - **Tag**: `div`
  - **Font/Style/Layout**: `relative p-10 md:p-12 bg-white rounded-[2px] border border-slate-300 overflow-hidden`

---
## File: `src\app\components\case-studies\upi-balance\illustrations\ConstraintsIllustration.tsx`
---

- {/* Background Grid Pattern */} {/* 1. Payment Flow Path (Straight) */} {/* 2. Balance Check Path (Curved Top) */} {/* Static Payment Indicator */} {/* Static Balance Indicator */} {/* Nodes positioned to avoid overlap */} {/* Middle Node - Slightly offset to show complexity */} {/* Legend / Caption */} Payment
  - **Tag**: `div`
  - **Font/Style/Layout**: `w-full h-[360px] relative bg-white rounded-[24px] border border-gray-200 shadow-sm mt-8 overflow-visible`
📦 **Structural Box**: `div` | `flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full border border-gray-200 shadow-sm`

---
## File: `src\app\components\case-studies\upi-balance\illustrations\FinalInterventionIllustration.tsx`
---

- {/* Status Bar */} 9:41
  - **Tag**: `div`
  - **Font/Style/Layout**: `flex flex-col items-center justify-center py-6 w-full font-sans`
📦 **Structural Box**: `div` | `flex flex-col items-center pt-[80px] px-6 h-full relative z-0 bg-white`
📦 **Structural Box**: `div` | `absolute top-[60px] left-6`
- ₹ 250
  - **Tag**: `motion.div`
  - **Font/Style/Layout**: `flex items-start justify-center text-[#202124] mb-3`
- Paid to Coffee Shop merchant@upi
  - **Tag**: `motion.div`
  - **Font/Style/Layout**: `flex flex-col items-center text-center mb-10`
- Feb 28, 2026 09:41 AM UPI transaction ID: 230821123456
  - **Tag**: `motion.div`
  - **Font/Style/Layout**: `w-full mb-auto flex flex-col items-center`
- setShowBalance(true)} className="flex-[1.2] py-3.5 px-4 bg-white border border-[#DADCE0] text-[#1A73E8] rounded-full font-medium flex items-center justify-center hover:bg-[#F1F3F4] transition-colors" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 1.2, duration: 0.3 }} > View balance Done
  - **Tag**: `div`
  - **Font/Style/Layout**: `flex flex-col w-full gap-4 mb-8`
- Powered by UPI
  - **Tag**: `motion.div`
  - **Font/Style/Layout**: `flex items-center justify-center gap-2 text-[12px] text-[#5F6368] mt-4`
📦 **Structural Box**: `div` | `absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full opacity-20`

---
## File: `src\app\components\case-studies\upi-balance\illustrations\FlowComparisonIllustration.tsx`
---

📦 **Structural Box**: `div` | `flex items-center`
📦 **Structural Box**: `div` | `flex flex-col gap-4`
- 
  - **Tag**: `div`
  - **Font/Style/Layout**: `flex flex-col gap-8 w-full max-w-4xl mx-auto py-8 font-sans`

---
## File: `src\app\components\case-studies\upi-balance\illustrations\HeroIllustration.tsx`
---

- {/* Strict Grid Background - Maintained from the new style */} {/* Main Composition - Restored Hardware Accelerated Phone Silhouette */} {/* Phone Body */} {/* Success Stamp Circle */} {/* Checkmark SVG inside the hardware accelerated div */} {/* Floating UI Elements */} {/* Animated Confetti Burst */} {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => { const colors = ['bg-indigo-400', 'bg-emerald-400', 'bg-amber-400']; // Pre-calculate positions to avoid inline layout thrashing const radian = (angle * Math.PI) / 180; const startX = 0; const startY = 0; const endX = Math.cos(radian) * 80; const endY = Math.sin(radian) * 80; return ( ); })}
  - **Tag**: `div`
  - **Font/Style/Layout**: `relative w-full h-[500px] lg:h-[600px] flex items-center justify-center mb-16`
- Fig. 1 / Friction Loss The green tick. And then — nothing.
  - **Tag**: `motion.div`
  - **Font/Style/Layout**: `absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white border border-slate-200 px-4 py-3 max-w-[260px] shadow-sm z-20`

---
## File: `src\app\components\case-studies\upi-balance\illustrations\ThoughtExperimentIllustration.tsx`
---

- {/* Cash side */} {/* Stack of notes */} {[...Array(5)].map((_, i) => ( 500 ))} 500
  - **Tag**: `div`
  - **Font/Style/Layout**: `w-full max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 py-12`
📦 **Structural Box**: `div` | `h-px w-12 bg-gray-200 md:w-px md:h-12 hidden md:block shrink-0`
📦 **Structural Box**: `div` | `flex flex-col items-center justify-center h-full gap-3 pt-4`

---
## File: `src\app\components\case-studies\upi-balance\index.tsx`
---

📦 **Structural Box**: `div` | `snap-none w-full bg-[#F8FAFC] min-h-screen relative`

---
## File: `src\app\components\case-studies\upi-balance\Section.tsx`
---


### {title}
   - **Tag**: `h2`
   - **Font/Placement Styles**: ``

### {subtitle}
   - **Tag**: `h3`
   - **Font/Placement Styles**: ``

---
## File: `src\app\components\case-studies\upi-balance\sections\CashVsUpiSection.tsx`
---

📦 **Structural Box**: `div` | `flex items-center gap-2 mb-6`

### {headline}
   - **Tag**: `h3`
   - **Font/Placement Styles**: ``

---
## File: `src\app\components\case-studies\upi-balance\sections\DesignBoundarySection.tsx`
---

📦 **Structural Box**: `div` | `flex flex-col md:flex-row gap-6 w-full`
- {allowText}
  - **Tag**: `span`
  - **Font/Style/Layout**: `text-[17px] font-medium text-slate-900 leading-relaxed`
- ···
  - **Tag**: `div`
  - **Font/Style/Layout**: `hidden md:flex items-center text-slate-300`
📦 **Structural Box**: `div` | `flex-1 p-8 rounded-[2px] bg-transparent border border-slate-200 flex items-start gap-6`
- {avoidText}
  - **Tag**: `span`
  - **Font/Style/Layout**: `text-[17px] text-slate-500 leading-relaxed font-light`

---
## File: `src\app\components\case-studies\upi-balance\sections\ExploringDirectionsSection.tsx`
---

📦 **Structural Box**: `div` | `flex gap-6 items-start group cursor-pointer`
📦 **Structural Box**: `div` | `flex-1 p-5 flex flex-col items-center`
📦 **Structural Box**: `div` | `w-full mt-auto mb-6 p-4 bg-transparent border border-slate-200 rounded-[2px] flex flex-col items-center gap-1.5`
📦 **Structural Box**: `div` | `mt-auto mb-6 w-full p-3 border border-slate-200 bg-transparent rounded-[2px] flex items-center justify-center gap-2`
- 
  - **Tag**: `div`
  - **Font/Style/Layout**: `absolute top-4 right-4 w-6 h-6 bg-slate-900 rounded-[2px] flex items-center justify-center text-white`

---
## File: `src\app\components\case-studies\upi-balance\sections\HeroSection.tsx`
---

- {/* Strict Grid Background - Replaced AI Blurs */} UX Case Study 2026 The Lost Reflection. How digital payments inadvertently erased the natural pause for mental math. When we paid with physical currency, we always had an intuitive sense of our balance. Handing over notes and receiving change forced an automatic, unconscious calculation. That ritual is gone. Modern interfaces offer seamless speed, but they left behind the friction that kept us grounded. "Every cash transaction ended with a quiet recalibration. Every digital payment ends with a green tick and nothing else." Domain Behavioral UX Focus Post-Payment Cognition
  - **Tag**: `Section`
  - **Font/Style/Layout**: `min-h-screen flex items-center pt-32 pb-24 relative overflow-hidden bg-[#F8FAFC]`

---
## File: `src\app\components\case-studies\upi-balance\sections\MeasuringImpactSection.tsx`
---

📦 **Structural Box**: `div` | `mt-auto flex flex-col gap-6`

---
## File: `src\app\components\case-studies\upi-balance\sections\ObservedBehaviorSection.tsx`
---

📦 **Structural Box**: `div` | `bg-transparent p-10 border border-slate-200 rounded-[2px] relative overflow-hidden flex flex-col justify-between group transition-all duration-500 min-h-[260px]`
📦 **Structural Box**: `div` | `relative z-10 mb-10 flex-1`
📦 **Structural Box**: `div` | `relative z-10 flex items-center gap-4`

---
## File: `src\app\components\case-studies\upi-balance\sections\ReflectionSection.tsx`
---

- {/* Strict Grid Background - Replaced AI Blurs */} 11 — Conclusion Interfaces should empower speed, but protect reflection. When we design strictly for metrics like completion rate and time-on-screen, we risk removing the natural human pauses that keep us grounded. True efficiency isn't just about moving fast. It's about moving with intent.
  - **Tag**: `Section`
  - **Font/Style/Layout**: `!bg-[#1C1C1C] py-20 md:py-24 relative overflow-hidden border-t border-zinc-800`

---
## File: `src\app\components\case-studies\upi-balance\sections\ThoughtExperimentSection.tsx`
---

- The Premise The Thought That Clarified It To make the core problem clearer, I looked at the mechanics of a simple cash transaction. You hand over a ₹500 note for a ₹150 coffee. The cashier counts out and hands you back ₹350. In that brief, physical exchange of receiving change, something crucial happens in the background. As you receive the physical notes, your brain instinctively registers the new total. You do the math. You mentally recalibrate exactly what is left in your possession. The medium forces you to acknowledge the remainder. With UPI, the payment is confirmed instantly, but the change is invisible. A green tick shows the money left, but you are never forced to calculate what remains. The cognitive pause—the mental adjustment of your balance—has been engineered out entirely.
  - **Tag**: `Section`
  - **Font/Style/Layout**: `relative overflow-hidden py-20 md:py-24`

---
## File: `src\app\components\case-studies\upi-balance\ui\accordion.tsx`
---

- svg]:rotate-180", className, )} {...props} > {children}
  - **Tag**: `AccordionPrimitive.Header`
  - **Font/Style/Layout**: `flex`
- {children}
  - **Tag**: `AccordionPrimitive.Content`
  - **Font/Style/Layout**: `data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm`

---
## File: `src\app\components\case-studies\upi-balance\ui\carousel.tsx`
---

📦 **Structural Box**: `div` | `overflow-hidden`

---
## File: `src\app\components\case-studies\upi-balance\ui\chart.tsx`
---


### {children}
   - **Tag**: `ChartContext.Provider`
   - **Font/Placement Styles**: ``
- {item.value.toLocaleString()}
  - **Tag**: `span`
  - **Font/Style/Layout**: `text-foreground font-mono font-medium tabular-nums`

---
## File: `src\app\components\case-studies\upi-balance\ui\command.tsx`
---

📦 **Structural Box**: `div` | `flex h-9 items-center gap-2 border-b px-3`

---
## File: `src\app\components\case-studies\upi-balance\ui\context-menu.tsx`
---


### {children}
   - **Tag**: `ContextMenuPrimitive.CheckboxItem`
   - **Font/Placement Styles**: ``

---
## File: `src\app\components\case-studies\upi-balance\ui\dropdown-menu.tsx`
---

- ); } function DropdownMenuTrigger({ ...props }: React.ComponentProps) { return ( ); } function DropdownMenuContent({ className, sideOffset = 4, ...props }: React.ComponentProps) { return (
  - **Tag**: `DropdownMenuPrimitive.Portal`
  - **Font/Style/Layout**: ``

### {children}
   - **Tag**: `DropdownMenuPrimitive.CheckboxItem`
   - **Font/Placement Styles**: ``

---
## File: `src\app\components\case-studies\upi-balance\ui\form.tsx`
---

- ); } function FormMessage({ className, ...props }: React.ComponentProps) { const { error, formMessageId } = useFormField(); const body = error ? String(error?.message ?? "") : props.children; if (!body) { return null; } return ( {body}
  - **Tag**: `p`
  - **Font/Style/Layout**: ``

---
## File: `src\app\components\case-studies\upi-balance\ui\menubar.tsx`
---


### {children}
   - **Tag**: `MenubarPrimitive.CheckboxItem`
   - **Font/Placement Styles**: ``

---
## File: `src\app\components\case-studies\upi-balance\ui\pagination.tsx`
---

- More pages
  - **Tag**: `span`
  - **Font/Style/Layout**: ``

---
## File: `src\app\components\case-studies\upi-balance\ui\sheet.tsx`
---


### ; } function SheetPortal({ ...props }: React.ComponentProps) { return ; } function SheetOverlay({ className, ...props }: React.ComponentProps) { return ( ); } function SheetContent({ className, children, side = "right", ...props }: React.ComponentProps & { side?: "top" | "right" | "bottom" | "left"; }) { return ( {children} Close
   - **Tag**: `SheetPrimitive.Close`
   - **Font/Placement Styles**: ``

---
## File: `src\app\components\case-studies\upi-balance\ui\sidebar.tsx`
---


### button]:hidden" style={ { "--sidebar-width": SIDEBAR_WIDTH_MOBILE, } as React.CSSProperties } side={side} > Sidebar Displays the mobile sidebar. {children}
   - **Tag**: `Sheet`
   - **Font/Placement Styles**: ``
- {/* This is what handles the sidebar gap on desktop */} {children}
  - **Tag**: `div`
  - **Font/Style/Layout**: `group peer text-sidebar-foreground hidden md:block`

---
## File: `src\app\components\case-studies\upi-balance\ui\table.tsx`
---

📦 **Structural Box**: `div` | `relative w-full overflow-x-auto`

---
## File: `src\app\components\case-studies\upi-balance\ui\toggle-group.tsx`
---

- {children}
  - **Tag**: `ToggleGroupPrimitive.Root`
  - **Font/Style/Layout**: ``

---
## File: `src\app\components\case-studies\upi-balance\ui\tooltip.tsx`
---

- {children}
  - **Tag**: `TooltipPrimitive.Portal`
  - **Font/Style/Layout**: ``
