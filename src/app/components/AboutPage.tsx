import { motion } from 'motion/react';
import { Braces, GraduationCap, Briefcase, MapPin, ArrowUpRight } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

export default function AboutPage() {
    const { setCursorType } = useCursor();

    const journeySteps = [
        {
            role: 'B.Tech in Computer Science and Engineering',
            institution: 'Government Engineering College, Idukki',
            icon: <Braces className="w-5 h-5 text-stone-500" />,
        },
        {
            role: 'UI/UX Designer',
            institution: 'flxiidesk Workspaces, Kochi',
            icon: <Briefcase className="w-5 h-5 text-stone-500" />,
        },
        {
            role: 'M.Des in Product Design',
            institution: 'National Institute of Design (NID), Ahmedabad',
            icon: <GraduationCap className="w-5 h-5 text-stone-500" />,
        }
    ];

    // A breathed, slow fade transition
    const fadeUp = {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 1.2 }
    };

    return (
        <div className="min-h-screen bg-stone-100 flex flex-col">
            <div className="pt-32 pb-24 md:pb-32 w-full max-w-5xl mx-auto px-6 md:px-12 space-y-32 flex-grow">

                {/* Who I Am Section */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                    <div className="md:w-1/3">
                        <motion.h1
                            {...fadeUp}
                            className="text-4xl md:text-5xl font-medium leading-[1.1] text-stone-900 font-display tracking-tight"
                        >
                            Who I Am
                        </motion.h1>
                    </div>
                    <div className="md:w-2/3 md:pt-2">
                        <motion.p
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: 0.1 }}
                            className="text-stone-600 text-xl leading-relaxed font-sans"
                        >
                            I like making, breaking, and reworking things until they feel simple and natural. Most of the time, I’m either exploring a small idea, observing how people use everyday things, or paying attention to details that most people don’t consciously notice, but still experience.
                        </motion.p>
                    </div>
                </div>

                {/* My Journey Section */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                    <div className="md:w-1/3">
                        <motion.h2
                            {...fadeUp}
                            className="text-4xl md:text-5xl font-medium leading-[1.1] text-stone-900 font-display tracking-tight"
                        >
                            My Journey
                        </motion.h2>
                    </div>
                    <div className="md:w-2/3">
                        <div className="relative border-l border-stone-300 ml-4 pl-8 md:ml-6 md:pl-10 space-y-16 py-4">
                            {journeySteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    {...fadeUp}
                                    transition={{ ...fadeUp.transition, delay: index * 0.2 + 0.1 }}
                                    className="relative"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[54px] md:-left-[64px] top-1 w-10 h-10 md:w-12 md:h-12 bg-stone-100 border focus:outline-none border-stone-300 rounded-full flex items-center justify-center z-10 mt-[-4px]">
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="group">
                                        <h4 className="text-xl md:text-2xl font-medium text-stone-900 font-display mb-2 transition-colors">
                                            {step.role}
                                        </h4>
                                        <div className="flex items-start gap-2 text-stone-500 text-sm font-sans">
                                            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span>{step.institution}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* What's not on my resume Section */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                    <div className="md:w-1/3">
                        <motion.h2
                            {...fadeUp}
                            className="text-4xl md:text-5xl font-medium leading-[1.1] text-stone-900 font-display tracking-tight"
                        >
                            What’s not on my resume
                        </motion.h2>
                    </div>
                    <div className="md:w-2/3 md:pt-2">
                        <motion.div
                            {...fadeUp}
                            transition={{ ...fadeUp.transition, delay: 0.1 }}
                            className="space-y-6 text-stone-600 text-lg md:text-xl leading-relaxed font-sans"
                        >
                            <p>
                                I build electronic things. Sometimes small experiments, sometimes more involved stuff. Usually the kind that needs both hardware and code to make sense.
                            </p>
                            <p>
                                I like the whole process. Trying things, breaking them, debugging, and slowly getting them to work.
                            </p>
                            <p>
                                I also love skating. Mostly for how it feels when you get the balance right.
                            </p>
                        </motion.div>
                    </div>
                </div>

            </div>

            {/* Tall, Dark Footer Section (Full Width) */}
            <div className="bg-[#1c1c1c] w-full py-24 md:py-32 flex flex-col items-center justify-center text-center px-6 mt-auto">
                <motion.h2
                    {...fadeUp}
                    className="text-5xl md:text-7xl font-display text-stone-100 mb-10 tracking-tight"
                >
                    Get in touch
                </motion.h2>

                <motion.div
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.1 }}
                    className="flex flex-col items-center gap-6"
                >
                    <a
                        href="mailto:hello@nikhilmanoj.me"
                        className="text-stone-300 hover:text-white text-2xl md:text-3xl font-sans transition-colors border-b border-transparent hover:border-white pb-1 tracking-wide"
                    >
                        hello@nikhilmanoj.me
                    </a>

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-white text-lg md:text-xl font-sans transition-all flex items-center gap-2 group mt-4 px-6 py-3 rounded-full border border-stone-700 hover:border-stone-500 hover:bg-stone-800"
                    >
                        View my resume
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
