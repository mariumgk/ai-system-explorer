import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SectionNavProps {
  sections: string[];
  currentSection: number;
  onNavigate: (index: number) => void;
}

export const SectionNav = ({ sections, currentSection, onNavigate }: SectionNavProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-2"
    >
      {/* Up arrow */}
      <button
        onClick={() => onNavigate(Math.max(0, currentSection - 1))}
        disabled={currentSection === 0}
        className="p-2 rounded-full glass-panel hover:border-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Section indicators */}
      <div className="flex flex-col gap-3 py-4">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => onNavigate(index)}
            className="group relative flex items-center"
          >
            {/* Dot indicator */}
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-primary scale-125 glow-border'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
            
            {/* Label on hover */}
            <span
              className="absolute right-6 px-2 py-1 rounded text-xs font-mono whitespace-nowrap
                         bg-card/90 border border-border opacity-0 group-hover:opacity-100
                         transition-opacity pointer-events-none"
            >
              {section}
            </span>
          </button>
        ))}
      </div>

      {/* Down arrow */}
      <button
        onClick={() => onNavigate(Math.min(sections.length - 1, currentSection + 1))}
        disabled={currentSection === sections.length - 1}
        className="p-2 rounded-full glass-panel hover:border-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
