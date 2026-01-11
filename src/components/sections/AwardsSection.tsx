import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Trophy, Award, ChevronDown, GraduationCap, CheckCircle } from 'lucide-react';

interface AwardItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const awards: AwardItem[] = [
  {
    title: 'Star Performer Award',
    description: 'Recognized for exceptional contribution during internship',
    icon: <Trophy className="w-5 h-5" />
  },
  {
    title: '#1 Project in Data Science',
    description: 'Top-ranked capstone project in department',
    icon: <Award className="w-5 h-5" />
  }
];

const certificates: string[] = [
  'Deep Learning Specialization - Coursera',
  'Machine Learning Engineering - Google',
  'LangChain for LLM Apps - DeepLearning.AI',
  'AWS Machine Learning Specialty'
];

interface AwardsSectionProps {
  isVisible: boolean;
}

export const AwardsSection = ({ isVisible }: AwardsSectionProps) => {
  const [certsExpanded, setCertsExpanded] = useState(false);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-3xl px-6 py-20 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="system-label mb-2 block">Recognition</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary">
            Awards & Certifications
          </h2>
        </motion.div>

        {/* Awards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel-strong p-5 glow-soft"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  {award.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">{award.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates - Collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel overflow-hidden"
        >
          <button
            onClick={() => setCertsExpanded(!certsExpanded)}
            className="w-full p-5 flex items-center justify-between hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="font-medium">Certifications</span>
              <span className="text-xs text-muted-foreground font-mono">
                ({certificates.length} items)
              </span>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                certsExpanded ? 'rotate-180' : ''
              }`} 
            />
          </button>

          <AnimatePresence>
            {certsExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-t border-border"
              >
                <div className="p-5 space-y-3">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};
