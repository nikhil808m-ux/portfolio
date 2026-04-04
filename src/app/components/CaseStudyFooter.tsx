// src/app/components/CaseStudyFooter.tsx
// Minimal next/prev project navigation footer.
// Reads the global projects list, finds current position, and renders
// a dark footer with matching left/right navigation targets.

import { Link } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '../data/projects';

interface CaseStudyFooterProps {
    currentSlug: string;
}

export function CaseStudyFooter({ currentSlug }: CaseStudyFooterProps) {
    const idx = projects.findIndex((p) => p.slug === currentSlug);
    const prev = idx > 0 ? projects[idx - 1] : null;
    const next = idx < projects.length - 1 ? projects[idx + 1] : null;

    return (
        <footer className="w-full bg-white text-stone-900 border-t border-stone-200">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex items-center justify-between gap-8">

                {/* Previous */}
                <div className="flex-1">
                    {prev ? (
                        <Link
                            to={`/case-studies/${prev.slug}`}
                            className="group inline-flex flex-col gap-2 text-left"
                        >
                            <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">
                                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                Previous
                            </span>
                            <span className="text-lg font-display font-medium text-stone-900 group-hover:text-stone-600 transition-colors tracking-tight leading-snug">
                                {prev.title}
                            </span>
                            <span className="text-xs font-mono text-stone-500 group-hover:text-stone-900 transition-colors">
                                {prev.category}
                            </span>
                        </Link>
                    ) : (
                        // Filler so "Back to all work" stays centered when no prev
                        <div />
                    )}
                </div>

                {/* Centre — Back to portfolio */}
                <div className="flex-shrink-0 text-center">
                    <Link
                        to="/#work"
                        className="inline-flex flex-col items-center gap-1 group"
                    >
                        <div className="w-8 h-[1px] bg-stone-300 group-hover:bg-stone-900 transition-colors mx-auto" />
                        <span className="text-[9px] font-mono uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">
                            All Work
                        </span>
                    </Link>
                </div>

                {/* Next */}
                <div className="flex-1 flex justify-end">
                    {next ? (
                        <Link
                            to={`/case-studies/${next.slug}`}
                            className="group inline-flex flex-col gap-2 text-right"
                        >
                            <span className="flex items-center justify-end gap-2 text-[10px] font-mono uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">
                                Next
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="text-lg font-display font-medium text-stone-900 group-hover:text-stone-600 transition-colors tracking-tight leading-snug">
                                {next.title}
                            </span>
                            <span className="text-xs font-mono text-stone-500 group-hover:text-stone-900 transition-colors">
                                {next.category}
                            </span>
                        </Link>
                    ) : (
                        <Link
                            to="/about"
                            className="group inline-flex flex-col gap-2 text-right"
                        >
                            <span className="flex items-center justify-end gap-2 text-[10px] font-mono uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">
                                Next
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="text-lg font-display font-medium text-stone-900 group-hover:text-stone-600 transition-colors tracking-tight leading-snug">
                                About Me
                            </span>
                        </Link>
                    )}
                </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t border-stone-200 px-6 md:px-12 py-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-stone-400 tracking-widest uppercase">
                    Nikhil Manoj · Portfolio
                </span>
                <span className="text-[10px] font-mono text-stone-400 tracking-widest uppercase">
                    {new Date().getFullYear()}
                </span>
            </div>
        </footer>
    );
}
