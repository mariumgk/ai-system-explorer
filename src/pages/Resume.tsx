import { ArrowLeft, Download, Mail, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resume = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-12">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to System</span>
          </Link>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Download PDF</span>
          </button>
        </nav>

        {/* Resume Content */}
        <article className="prose prose-invert max-w-none">
          {/* Header */}
          <header className="mb-8 pb-8 border-b border-border">
            <h1 className="text-3xl font-bold mb-2">Your Name</h1>
            <p className="text-lg text-primary mb-4">Data Science & AI Undergraduate</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <a href="mailto:your.email@example.com" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                your.email@example.com
              </a>
              <a href="https://github.com/yourusername" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Github className="w-4 h-4" />
                github.com/yourusername
              </a>
              <a href="https://linkedin.com/in/yourusername" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
                linkedin.com/in/yourusername
              </a>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Summary</h2>
            <p className="text-muted-foreground leading-relaxed">
              Data Science & AI undergraduate with hands-on experience building production AI systems. 
              Specialized in LLMs, RAG architectures, and ML pipelines. Passionate about making AI 
              systems that are both powerful and interpretable.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Experience</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-foreground">Software Engineer Intern (AI Backend)</h3>
                  <span className="text-sm text-muted-foreground">2024</span>
                </div>
                <p className="text-primary text-sm mb-2">Company Name</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Designed and deployed AI-powered backend services using FastAPI and LangChain</li>
                  <li>Built Model Context Protocol (MCP) systems for multi-model orchestration</li>
                  <li>Optimized inference pipelines reducing latency by 40%</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-foreground">Data Analyst Intern</h3>
                  <span className="text-sm text-muted-foreground">2023</span>
                </div>
                <p className="text-primary text-sm mb-2">Company Name</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Built automated reporting dashboards using Python and Tableau</li>
                  <li>Developed predictive models for business metrics with XGBoost</li>
                  <li>Created data pipelines for real-time analytics with Airflow</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Projects</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground">QuizBolt</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered quiz generation system using GPT-4 and RAG pipelines. 
                  Transforms documents into adaptive assessments.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground">Resume Screening System</h3>
                <p className="text-sm text-muted-foreground">
                  NLP-based resume analysis with explainable AI. Uses fine-tuned BERT 
                  and SHAP for transparent scoring.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground">Query Bee</h3>
                <p className="text-sm text-muted-foreground">
                  RAG chatbot for document Q&A. Built with OpenAI embeddings, 
                  Pinecone vector store, and conversational memory.
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Technical Skills</h2>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Languages:</strong> Python, SQL, TypeScript, JavaScript</p>
              <p><strong className="text-foreground">ML/AI:</strong> PyTorch, TensorFlow, Scikit-learn, LangChain, OpenAI, Claude</p>
              <p><strong className="text-foreground">Data:</strong> Pandas, NumPy, PostgreSQL, MongoDB, Pinecone</p>
              <p><strong className="text-foreground">Tools:</strong> Docker, AWS, Git, FastAPI, Flask</p>
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3 text-foreground">Education</h2>
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-foreground">B.S. in Data Science & Artificial Intelligence</h3>
                <span className="text-sm text-muted-foreground">Expected 2025</span>
              </div>
              <p className="text-primary text-sm">University Name</p>
            </div>
          </section>

          {/* Awards */}
          <section>
            <h2 className="text-xl font-semibold mb-3 text-foreground">Awards</h2>
            <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
              <li>Star Performer Award – Internship Recognition</li>
              <li>#1 Ranked Project – Data Science Department Capstone</li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Resume;
