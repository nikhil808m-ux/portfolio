import { CaseStudyFooter } from "../../CaseStudyFooter";

export default function LocalAIManagerPage() {
  return (
    <div className="snap-none w-full bg-[#F8FAFC] min-h-screen relative flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center py-32 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-stone-900 tracking-tight mb-4">LocalAI Manager</h1>
        <p className="text-stone-500 font-light max-w-lg mb-8">This case study is currently being documented. Please check back later.</p>
      </main>
      <CaseStudyFooter currentSlug="localai-manager" />
    </div>
  );
}