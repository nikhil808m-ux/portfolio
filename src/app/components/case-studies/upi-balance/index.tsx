// src/app/components/case-studies/upi-balance/index.tsx
// 
// CASE STUDY PAGE — UPI Balance Visibility
// Replace this file's contents with your exported Figma Make case study component.
// The component must have a default export.
// Root.tsx wraps this automatically with: Cursor, Header, NoiseOverlay, CursorProvider.
// You do NOT need to import or re-add those in your case study.
//
// SCROLL NOTE: Root.tsx uses snap-y snap-mandatory. Add className="snap-none" to your
// outermost div to allow free scrolling within the case study.

import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

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
import { MeasuringImpactSection } from './sections/MeasuringImpactSection';
import { ReflectionSection } from './sections/ReflectionSection';

export default function UPICaseStudy() {
  return (
    <div className="snap-none min-h-screen bg-stone-50 px-6 md:px-12 py-32">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors mb-16 group"
      >
        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>
      <h1 className="text-5xl font-display font-medium text-stone-900 tracking-tight">
        UPI Balance Visibility
      </h1>
      <GrainOverlay />
      <main className="relative z-10 flex flex-col mt-16">
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
        <MeasuringImpactSection />
        <ReflectionSection />
      </main>
      <footer className="py-12 bg-[#EEF2F7] text-center text-gray-400 text-sm relative z-10">
        <p>© 2024 Nikhil Manoj. UPI Balance Visibility — UX Case Study.</p>
      </footer>
    </div>
  );
}