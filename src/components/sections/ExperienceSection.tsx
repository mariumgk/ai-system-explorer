import { motion } from 'framer-motion';
import { GitBranch, Lock } from 'lucide-react';

interface Experience {
  version: string;
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  systems: string[];
  models?: string[];
  isProprietary?: boolean;
}

const experiences: Experience[] = [
  {
    version: 'v0.4',
    title: 'Software Engineer Intern',
    company: 'AI Backend Team',
    period: '2024',
    responsibilities: [
      'Designed and deployed AI-powered backend services',
      'Built MCP (Model Context Protocol) systems',
      'Optimized inference pipelines for production'
    ],
    systems: ['FastAPI', 'LangChain', 'Docker', 'AWS'],
    models: ['GPT-4', 'Claude', 'Custom fine-tuned models'],
    isProprietary: true
  },
  {
    version: 'v0.3',
    title: 'Data Analyst Intern',
    company: 'Analytics Division',
    period: '2023',
    responsibilities: [
      'Built automated reporting dashboards',
      'Developed predictive models for business metrics',
      'Created data pipelines for real-time analytics'
    ],
    systems: ['Python', 'SQL', 'Tableau', 'Airflow'],
    models: ['XGBoost', 'Time series forecasting']
  }
];

interface ExperienceSectionProps {
  isVisible: boolean;
}

export const ExperienceSection = ({ isVisible }: ExperienceSectionProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-4xl px-6 py-20 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="system-label mb-2 block">Version History</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.version}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative mb-12 md:w-1/2 ${
                index % 2 === 0 ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'
              } pl-12 md:pl-0`}
            >
              {/* Version badge on timeline */}
              <div className={`absolute top-0 ${
                index % 2 === 0 
                  ? 'left-0 md:left-auto md:right-0 md:translate-x-1/2' 
                  : 'left-0 md:left-0 md:-translate-x-1/2'
              } md:left-1/2`}>
                <div className="version-badge flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  {exp.version}
                </div>
              </div>

              {/* Content card */}
              <div className="glass-panel p-6 mt-10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-primary/80 text-sm font-mono">{exp.company}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2 mb-4">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                      <span className="text-primary mt-1">›</span>
                      {resp}
                    </li>
                  ))}
                </ul>

                {/* Systems */}
                <div className="mb-3">
                  <span className="text-xs text-muted-foreground font-mono block mb-2">SYSTEMS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.systems.map((sys) => (
                      <span key={sys} className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Models */}
                {exp.models && (
                  <div>
                    <span className="text-xs text-muted-foreground font-mono block mb-2">MODELS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.models.map((model) => (
                        <span key={model} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Proprietary notice */}
                {exp.isProprietary && (
                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                    <Lock className="w-3 h-3" />
                    <span className="font-mono">Proprietary system — details available on request</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
