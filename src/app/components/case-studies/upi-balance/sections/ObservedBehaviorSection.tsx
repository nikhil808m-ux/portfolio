import React from 'react';
import { Section, TextBlock } from '../Section';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const QuoteCard = ({ text, delay, author, avatarColor }: { text: string, delay: number, author: string, avatarColor: string }) => (
  <motion.div 
    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col justify-between h-full group hover:shadow-lg transition-shadow duration-300"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="absolute -top-4 -right-4 text-gray-50 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
        <Quote size={120} />
    </div>

    <div className="relative z-10 mb-8">
      <p className="text-xl md:text-2xl font-medium text-gray-800 leading-snug font-google-sans">
        “{text}”
      </p>
    </div>

    <div className="relative z-10 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${avatarColor}`}>
            {author.charAt(0)}
        </div>
        <div>
            <p className="text-sm font-semibold text-gray-900">{author}</p>
            <p className="text-xs text-gray-400">Frequent UPI User</p>
        </div>
    </div>
  </motion.div>
);

export const ObservedBehaviorSection: React.FC = () => {
  return (
    <Section variant="alt" className="py-24 md:py-32">
      <div className="flex flex-col gap-16 md:gap-24">
        <TextBlock 
          title="Observed Behavior" 
          subtitle="I spoke to users ranging from students to shopkeepers to understand their mental models during and after transactions."
        >
          <p className="mb-8 text-gray-600 leading-relaxed">
            Patterns emerged not just in what they did, but in what they avoided. The anxiety of "not knowing" was often suppressed until it became unavoidable.
          </p>
          <ul className="space-y-4 mt-4 text-gray-700 mb-8">
            <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                <span>Most people do not check balance after every payment.</span>
            </li>
            <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                <span>They rely on rough mental estimation ("I have enough").</span>
            </li>
            <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                <span>Balance checks usually happen <span className="font-medium text-coral-600 bg-coral-50 px-1 rounded">only when anxiety peaks</span>.</span>
            </li>
            <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                <span>The "Insufficient Balance" error is the primary wake-up call for many.</span>
            </li>
          </ul>
        </TextBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <QuoteCard 
            text="I assume I have enough. I only check if I'm making a big payment." 
            author="Rohan"
            avatarColor="bg-blue-500"
            delay={0.2} 
          />
          <QuoteCard 
            text="The worst feeling is seeing 'Insufficient Balance' at the shop. It's embarrassing." 
            author="Priya"
            avatarColor="bg-emerald-500"
            delay={0.4} 
          />
          <QuoteCard 
            text="I don’t calculate after every payment. It feels like too much work." 
            author="Amit"
            avatarColor="bg-amber-500"
            delay={0.6} 
          />
        </div>

        <motion.div 
          className="mt-8 p-10 md:p-12 bg-white rounded-[40px] border border-indigo-100 shadow-xl shadow-indigo-50/50 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400" />
          
          <h4 className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-6">Key Insight</h4>
          <p className="text-2xl md:text-3xl text-gray-900 font-normal leading-tight font-google-sans max-w-3xl mx-auto">
            The issue wasn't visibility. It was <span className="text-indigo-600 font-medium bg-indigo-50 px-2 rounded-lg">timing</span>.
          </p>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto">
            The system became "too smooth," removing the passive control we had with cash. Users don't need more data; they need a moment to recalibrate.
          </p>
        </motion.div>
      </div>
    </Section>
  );
};
