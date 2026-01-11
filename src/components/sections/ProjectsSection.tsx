import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Eye, Code, ArrowRight, Layers, Bot, Search } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  tagline: string;
  liveDescription: string;
  liveDetails: string[];
  inspectDetails: {
    model: string;
    architecture: string;
    iterations: string;
    tradeoffs: string;
  };
  icon: React.ReactNode;
  color: string;
}

const projects: Project[] = [
  {
    id: 'quizbolt',
    name: 'QuizBolt',
    tagline: 'AI-Powered Quiz Generation',
    liveDescription: 'Transforms any content into interactive quizzes using LLMs',
    liveDetails: [
      'Document → Structured Questions',
      'Multi-format support (PDF, text, URLs)',
      'Adaptive difficulty calibration',
      'Real-time generation pipeline'
    ],
    inspectDetails: {
      model: 'GPT-4 / Claude with custom prompting',
      architecture: 'RAG pipeline with chunking optimization',
      iterations: 'Tested 5 prompt strategies, settled on chain-of-thought',
      tradeoffs: 'Quality vs speed: batched generation with caching'
    },
    icon: <Layers className="w-6 h-6" />,
    color: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    id: 'resume-screener',
    name: 'Resume Screening System',
    tagline: 'NLP + Explainability',
    liveDescription: 'Automated resume analysis with transparent scoring',
    liveDetails: [
      'Resume → Skill extraction → Scoring',
      'Explainable AI: shows why scores assigned',
      'Bias detection and mitigation',
      'Customizable criteria weighting'
    ],
    inspectDetails: {
      model: 'Fine-tuned BERT + custom NER',
      architecture: 'Two-stage: extraction → classification',
      iterations: 'Iterated on explainability—SHAP values for transparency',
      tradeoffs: 'Accuracy vs interpretability: chose hybrid approach'
    },
    icon: <Search className="w-6 h-6" />,
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'query-bee',
    name: 'Query Bee',
    tagline: 'RAG Chatbot',
    liveDescription: 'Conversational AI grounded in your documents',
    liveDetails: [
      'Upload docs → Instant Q&A',
      'Context-aware responses',
      'Source citations for every answer',
      'Multi-turn conversation memory'
    ],
    inspectDetails: {
      model: 'OpenAI Embeddings + GPT-4',
      architecture: 'Vector store (Pinecone) + retrieval + generation',
      iterations: 'Chunking strategy: semantic vs fixed-size comparison',
      tradeoffs: 'Retrieval precision vs recall—tuned top-k dynamically'
    },
    icon: <Bot className="w-6 h-6" />,
    color: 'from-green-500/20 to-teal-500/20'
  }
];

interface ProjectsSectionProps {
  isVisible: boolean;
}

export const ProjectsSection = ({ isVisible }: ProjectsSectionProps) => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [inspectMode, setInspectMode] = useState<Record<string, boolean>>({});

  if (!isVisible) return null;

  const toggleInspect = (projectId: string) => {
    setInspectMode(prev => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-6xl px-6 py-20 overflow-y-auto max-h-screen scrollbar-thin">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="system-label mb-2 block">Core Modules</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary">
            Projects
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`project-module p-6 cursor-pointer bg-gradient-to-br ${project.color}`}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {project.icon}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleInspect(project.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all
                    ${inspectMode[project.id] 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                >
                  {inspectMode[project.id] ? (
                    <>
                      <Code className="w-3 h-3" />
                      Inspect
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" />
                      Live
                    </>
                  )}
                </button>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
              <p className="text-sm text-primary/80 font-mono mb-4">{project.tagline}</p>

              {/* Content based on mode */}
              <AnimatePresence mode="wait">
                {inspectMode[project.id] ? (
                  <motion.div
                    key="inspect"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-3"
                  >
                    <div>
                      <span className="text-xs text-muted-foreground font-mono">MODEL</span>
                      <p className="text-sm">{project.inspectDetails.model}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-mono">ARCHITECTURE</span>
                      <p className="text-sm">{project.inspectDetails.architecture}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-mono">ITERATIONS</span>
                      <p className="text-sm">{project.inspectDetails.iterations}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground font-mono">TRADE-OFFS</span>
                      <p className="text-sm">{project.inspectDetails.tradeoffs}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="live"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <p className="text-sm text-foreground/80 mb-4">
                      {project.liveDescription}
                    </p>
                    <ul className="space-y-2">
                      {project.liveDetails.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
