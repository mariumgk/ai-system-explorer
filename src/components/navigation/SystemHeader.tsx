import { motion } from 'framer-motion';

interface SystemHeaderProps {
  currentSection: string;
  sectionIndex: number;
  totalSections: number;
}

export const SystemHeader = ({ currentSection, sectionIndex, totalSections }: SystemHeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-30 p-4 md:p-6"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo / Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-mono text-sm font-bold">AI</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-mono text-xs text-muted-foreground">portfolio://</span>
            <span className="font-mono text-xs text-primary">{currentSection.toLowerCase().replace(' ', '-')}</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="hidden sm:inline">Section</span>
            <span className="text-primary">{String(sectionIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(totalSections).padStart(2, '0')}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">Live</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
