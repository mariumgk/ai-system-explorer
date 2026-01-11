import { motion } from 'framer-motion';
import { Play, Terminal, Cpu } from 'lucide-react';

interface BootSectionProps {
  onStart: () => void;
  isVisible: boolean;
}

export const BootSection = ({ onStart, isVisible }: BootSectionProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-20 flex items-center justify-center"
    >
      <div className="text-center max-w-2xl px-6">
        {/* System status indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="system-label">System Online</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-4 glow-text text-gradient-primary"
        >
          Your Name
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-foreground/80 mb-6 font-light"
        >
          Data Science & AI Undergraduate
        </motion.p>

        {/* System line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="font-mono text-muted-foreground text-sm md:text-base mb-12 flex items-center justify-center gap-2"
        >
          <Terminal className="w-4 h-4 text-primary" />
          <span>Building AI systems. Inspecting models. Iterating fast.</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onStart}
            className="group glass-panel-strong px-8 py-4 flex items-center justify-center gap-3 
                       hover:border-primary/50 transition-all duration-300 glow-soft hover:glow-border"
          >
            <Play className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-lg font-medium">Run Forward Pass</span>
          </button>
          
          <button
            onClick={onStart}
            className="group glass-panel px-8 py-4 flex items-center justify-center gap-3
                       hover:border-primary/30 transition-all duration-300"
          >
            <Cpu className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
            <span className="text-lg text-foreground/80 group-hover:text-foreground transition-colors">
              Enter Model
            </span>
          </button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <span className="text-xs font-mono">scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border border-primary/30 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 bg-primary/50 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
