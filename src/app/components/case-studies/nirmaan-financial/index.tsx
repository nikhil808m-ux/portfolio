import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NirmaanFinancialCaseStudy() {
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
        Nirmaan Financial
      </h1>
      <p className="mt-4 text-stone-400 font-mono text-sm">
        — Replace this placeholder with your Figma Make case study export.
      </p>
    </div>
  );
}
