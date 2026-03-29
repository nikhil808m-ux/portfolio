// src/app/components/case-studies/upi-balance/index.tsx
// UPI Balance Visibility — Case Study
// Full-width layout, no outer padding restrictors.

import { GrainOverlay } from './GrainOverlay';
import { HeroSection } from './sections/HeroSection';
import { ThoughtExperimentSection } from './sections/ThoughtExperimentSection';
import { CashVsUpiSection } from './sections/CashVsUpiSection';
import { CheckpointsSection } from './sections/CheckpointsSection';
import { ObservedBehaviorSection } from './sections/ObservedBehaviorSection';
import { DesignBoundarySection } from './sections/DesignBoundarySection';
import { ExploringDirectionsSection } from './sections/ExploringDirectionsSection';
import { TechnicalFeasibilitySection } from './sections/TechnicalFeasibilitySection';
import { FinalInterventionSection } from './sections/FinalInterventionSection';
import { FlowComparisonSection } from './sections/FlowComparisonSection';
import { PrototypeValidationSection } from './sections/PrototypeValidationSection';
import { MeasuringImpactSection } from './sections/MeasuringImpactSection';
import { ReflectionSection } from './sections/ReflectionSection';

export default function UPICaseStudy() {
  return (
    // snap-none overrides the Home page snap-y snap-mandatory from Root.tsx
    // so the case study scrolls freely
    <div className="snap-none w-full bg-[#F8FAFC] min-h-screen relative">

      <GrainOverlay />

      <main className="relative z-10 flex flex-col w-full">
        <HeroSection />
        <ThoughtExperimentSection />
        <CashVsUpiSection />
        <CheckpointsSection />
        <ObservedBehaviorSection />
        <DesignBoundarySection />
        <ExploringDirectionsSection />
        <TechnicalFeasibilitySection />
        <FinalInterventionSection />
        <FlowComparisonSection />
        <PrototypeValidationSection />
        <MeasuringImpactSection />
        <ReflectionSection />
      </main>

      <footer className="py-12 bg-[#0F172A] text-center text-slate-500 text-sm relative z-10">
        <p>© 2026 · The Missing Checkpoint · A speculative UX study by Nikhil Manoj</p>
      </footer>
    </div>
  );
}