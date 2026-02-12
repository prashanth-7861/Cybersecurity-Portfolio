import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Folder, Lock, Shield, Activity } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  features: string[];
  image: string;
  github: string;
  tags: string[];
  icon: React.ElementType;
  color: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'File Signature Analyzer',
    description: 'A Python tool for identifying file types based on their binary signatures, regardless of their extensions. Performs deep content inspection to accurately identify files that share common signatures.',
    features: [
      'Analyzes files using binary signatures and deep content inspection',
      'Identifies files that share common signatures (ZIP, EPUB, DOCX, etc.)',
      'Handles files with incorrect or missing extensions',
      'Creates multiple copies for ambiguous file types',
      'Generates detailed analysis report',
    ],
    image: '/project_file_analyzer.jpg',
    github: 'https://github.com/prashanth-7861/file-signature-analyzer',
    tags: ['Python', 'Forensics', 'File Analysis'],
    icon: Folder,
    color: '#00ff41',
  },
  {
    id: 2,
    title: 'AES Encryption Engine',
    description: 'A custom AES encryption pipeline built in Python to understand block cipher internals first-hand, implementing each transformation step instead of relying on high-level crypto libraries.',
    features: [
      'Implements each AES transformation step (SubBytes, ShiftRows, MixColumns, AddRoundKey)',
      'Custom key-schedule routine deriving round keys from 128-bit master key',
      'Handles byte/bit/hex encoding and matrix-style state representation',
      'File-driven inputs/outputs for practical usage',
      'Reinforces practical knowledge of key expansion and diffusion',
    ],
    image: '/project_aes_encryption.jpg',
    github: '#',
    tags: ['Python', 'Cryptography', 'AES'],
    icon: Lock,
    color: '#00f0ff',
  },
  {
    id: 3,
    title: 'COVID-19 ML Detection',
    description: 'Machine Learning-based Detection of COVID-19 Using Clinical Text Data. Implemented multiple ML models to classify clinical text data as COVID-related or not.',
    features: [
      'Multiple ML models: Logistic Regression, Naive Bayes, SVM, Decision Tree',
      'Ensemble methods: Bagging, AdaBoost, Random Forest, Stochastic Gradient Boosting',
      'Data preprocessing and feature engineering pipeline',
      'Model evaluation and performance metrics',
      'Directly transferable to anomaly detection in security operations',
    ],
    image: '/project_covid_ml.jpg',
    github: '#',
    tags: ['Python', 'Machine Learning', 'Data Science'],
    icon: Activity,
    color: '#ff003c',
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevProject = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#00f0ff]" />
            <span className="font-mono text-sm text-[#00f0ff] uppercase tracking-widest">Security Operations</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">PROJECT_LOGS</span>
          </h2>
          <p className="text-[#a0a0a0] max-w-2xl">
            Hands-on projects demonstrating expertise in forensics, cryptography, 
            and machine learning for security applications.
          </p>
        </div>

        {/* 3D Carousel */}
        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Navigation Buttons */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 p-3 border border-[#00ff41]/30 hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-[#00ff41]" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 p-3 border border-[#00ff41]/30 hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-[#00ff41]" />
          </button>

          {/* Project Cards */}
          <div className="flex justify-center items-center gap-4 md:gap-8 px-12 md:px-20">
            {projectsData.map((project, index) => {
              const ProjectIcon = project.icon;
              const isActive = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + projectsData.length) % projectsData.length;
              const isNext = index === (activeIndex + 1) % projectsData.length;

              return (
                <div
                  key={project.id}
                  className={`relative transition-all duration-500 ${
                    isActive 
                      ? 'w-full max-w-3xl opacity-100 scale-100 z-10' 
                      : isPrev || isNext
                        ? 'w-0 md:w-64 opacity-40 scale-90 hidden md:block'
                        : 'w-0 opacity-0 scale-80 hidden'
                  }`}
                  style={{
                    transform: isPrev ? 'perspective(1000px) rotateY(25deg) translateX(-50px)' :
                                isNext ? 'perspective(1000px) rotateY(-25deg) translateX(50px)' :
                                'perspective(1000px) rotateY(0deg)',
                  }}
                >
                  <div 
                    className={`border-2 transition-all duration-500 ${
                      isActive 
                        ? 'border-[#00ff41] shadow-[0_0_40px_rgba(0,255,65,0.2)]' 
                        : 'border-[#00ff41]/20'
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-48 md:h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                      
                      {/* Project Icon Badge */}
                      <div className="absolute top-4 left-4">
                        <div 
                          className="p-2 border-2"
                          style={{ borderColor: project.color }}
                        >
                          <ProjectIcon className="w-5 h-5" style={{ color: project.color }} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-[#0a0a0a]">
                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-[#e0e0e0] mb-3">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#a0a0a0] text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Features - Only show for active */}
                      {isActive && (
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-4 h-4 text-[#00ff41]" />
                            <span className="font-mono text-xs text-[#00ff41] uppercase tracking-wider">
                              Key Features
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {project.features.slice(0, 3).map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-[#a0a0a0]">
                                <span className="w-1 h-1 bg-[#00ff41] rounded-full mt-2 flex-shrink-0" />
                                <span className="line-clamp-2">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-mono border"
                            style={{ 
                              borderColor: `${project.color}40`,
                              color: project.color,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      {isActive && (
                        <div className="flex gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300 text-sm font-mono"
                          >
                            <Github className="w-4 h-4" />
                            <span>VIEW_CODE</span>
                          </a>
                          <button className="flex items-center gap-2 px-4 py-2 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all duration-300 text-sm font-mono">
                            <ExternalLink className="w-4 h-4" />
                            <span>DEMO</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: project.color }} />
                    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: project.color }} />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: project.color }} />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: project.color }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-3 h-3 transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#00ff41] shadow-[0_0_10px_#00ff41]'
                    : 'bg-[#00ff41]/30 hover:bg-[#00ff41]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Projects List */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-[#00f0ff]" />
            <span className="font-mono text-sm text-[#00f0ff] uppercase tracking-wider">
              Additional Operations
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Bash Compression Script', desc: 'File compression and extraction automation', icon: Folder },
              { name: 'Subway Passenger Flow Forecasting', desc: 'Time-series analysis with Django dashboard', icon: Activity },
            ].map((project) => (
              <div
                key={project.name}
                className="group p-4 border border-[#00ff41]/20 hover:border-[#00ff41]/60 transition-all duration-300 flex items-center gap-4"
              >
                <project.icon className="w-8 h-8 text-[#00ff41] group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-mono text-sm font-bold text-[#e0e0e0] group-hover:text-[#00ff41] transition-colors">
                    {project.name}
                  </h4>
                  <p className="font-mono text-xs text-[#a0a0a0]">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
