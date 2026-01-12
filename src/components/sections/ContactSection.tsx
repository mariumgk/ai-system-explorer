import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, RotateCcw, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContactSectionProps {
  onRestart: () => void;
}

export const ContactSection = ({ onRestart }: ContactSectionProps) => {

  const contactLinks = [
    {
      name: 'Email',
      value: 'marium.imranrauf@gmail.com',
      href: 'mailto:marium.imranrauf@gmail.com',
      icon: <Mail className="w-5 h-5" />,
      external: true
    },
    {
      name: 'GitHub',
      value: 'github.com/mariumgk',
      href: 'https://github.com/mariumgk',
      icon: <Github className="w-5 h-5" />,
      external: true
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/marium-imran',
      href: 'https://www.linkedin.com/in/marium-imran-1139072a1',
      icon: <Linkedin className="w-5 h-5" />,
      external: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex items-center justify-center"
    >
      <div className="text-center max-w-xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="system-label mb-2 block">Session Complete</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-4">
            Connect
          </h2>
          <p className="text-muted-foreground">
            Ready to collaborate on AI systems and research
          </p>
        </motion.div>

        {/* Contact links */}
        <div className="space-y-4 mb-8">
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-4 flex items-center justify-between group hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {link.icon}
                </div>
                <div className="text-left">
                  <span className="text-xs text-muted-foreground font-mono block">{link.name}</span>
                  <span className="text-sm">{link.value}</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.a>
          ))}

          {/* Resume link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/resume"
              className="glass-panel p-4 flex items-center justify-between group hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs text-muted-foreground font-mono block">Resume</span>
                  <span className="text-sm">View ATS-friendly version</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onRestart}
            className="group glass-panel px-6 py-3 flex items-center justify-center gap-2
                       hover:border-primary/30 transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 text-primary group-hover:rotate-[-360deg] transition-transform duration-500" />
            <span className="text-sm">Run Another Pass</span>
          </button>
        </motion.div>

        {/* System status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-xs text-muted-foreground/50 font-mono"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            System stable • All modules loaded
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
