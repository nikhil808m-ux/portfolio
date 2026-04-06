// src/app/components/case-studies/upi-balance/index.tsx
// UPI Balance Visibility — Case Study
// Full-width layout, no outer padding restrictors.

import { CaseStudyFooter } from '../../CaseStudyFooter';
import { HeroSection } from './sections/HeroSection';
import { ThoughtExperimentSection } from './sections/ThoughtExperimentSection';
import { CashVsUpiSection } from './sections/CashVsUpiSection';
import { CheckpointsSection } from './sections/CheckpointsSection';
import { ObservedBehaviorSection } from './sections/ObservedBehaviorSection';
import { DesignBoundarySection } from './sections/DesignBoundarySection';
import { ExploringDirectionsSection } from './sections/ExploringDirectionsSection';
import { TechnicalFeasibilitySection } from './sections/TechnicalFeasibilitySection';
import { ConceptImageSection } from './sections/ConceptImageSection';
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

      <main className="relative z-10 flex flex-col w-full">
        <HeroSection />
        <ThoughtExperimentSection />
        <CashVsUpiSection />
        <CheckpointsSection />
        <ObservedBehaviorSection />
        <DesignBoundarySection />
        <ExploringDirectionsSection />
        <TechnicalFeasibilitySection />
        <ConceptImageSection />
        <FinalInterventionSection />
        <FlowComparisonSection />
        <PrototypeValidationSection />
        <MeasuringImpactSection />
        <ReflectionSection />
      </main>

      <CaseStudyFooter currentSlug="upi-balance" />
    </div>
  );
}