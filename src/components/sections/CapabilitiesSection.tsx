import { motion } from 'framer-motion';
import { Database, Brain, Wrench, Server, HardDrive } from 'lucide-react';

interface CapabilityGroup {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}

const capabilities: CapabilityGroup[] = [
  {
    name: 'Data & Modeling',
    icon: <Database className="w-5 h-5" />,
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'PyTorch', 'TensorFlow', 'Data Pipelines', 'Feature Engineering']
  },
  {
    name: 'LLMs & GenAI',
    icon: <Brain className="w-5 h-5" />,
    skills: ['GPT-4', 'Claude', 'LangChain', 'Prompt Engineering', 'Fine-tuning', 'Embeddings', 'RAG Systems', 'Vector Databases']
  },
  {
    name: 'Agents & Tooling',
    icon: <Wrench className="w-5 h-5" />,
    skills: ['LangGraph', 'AutoGPT Patterns', 'Tool Use', 'Function Calling', 'Multi-Agent Systems', 'Orchestration']
  },
  {
    name: 'Backend & APIs',
    icon: <Server className="w-5 h-5" />,
    skills: ['FastAPI', 'Flask', 'REST APIs', 'WebSockets', 'Authentication', 'Rate Limiting', 'Caching']
  },
  {
    name: 'Databases & Infra',
    icon: <HardDrive className="w-5 h-5" />,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Pinecone', 'Docker', 'AWS', 'CI/CD', 'Git']
  }
];

interface CapabilitiesSectionProps {
  isVisible: boolean;
}

export const CapabilitiesSection = ({ isVisible }: CapabilitiesSectionProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-5xl px-6 py-20 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="system-label mb-2 block">System Components</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary">
            Capabilities
          </h2>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {group.icon}
                </div>
                <h3 className="font-semibold">{group.name}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="capability-tag"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-muted-foreground text-sm mt-8 font-mono"
        >
          Components loaded and initialized. Ready for deployment.
        </motion.p>
      </div>
    </motion.div>
  );
};
