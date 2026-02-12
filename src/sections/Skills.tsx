import { useEffect, useRef, useState } from 'react';
import { 
  Code, Terminal, Database, Globe, Shield, 
  Lock, Search, FileSearch, Bug, Wifi 
} from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  level: number;
  icon: React.ElementType;
  color: string;
}

const skillsData: Skill[] = [
  // Programming
  { name: 'Python', category: 'Programming', level: 90, icon: Code, color: '#00ff41' },
  { name: 'Java', category: 'Programming', level: 75, icon: Code, color: '#00ff41' },
  { name: 'C++', category: 'Programming', level: 70, icon: Code, color: '#00ff41' },
  { name: 'Bash', category: 'Programming', level: 85, icon: Terminal, color: '#00ff41' },
  
  // Web Technologies
  { name: 'HTML/CSS', category: 'Web', level: 80, icon: Globe, color: '#00f0ff' },
  { name: 'PHP', category: 'Web', level: 70, icon: Globe, color: '#00f0ff' },
  
  // Database
  { name: 'MySQL', category: 'Database', level: 80, icon: Database, color: '#ff003c' },
  
  // Operating Systems
  { name: 'Kali Linux', category: 'OS', level: 95, icon: Terminal, color: '#00ff41' },
  { name: 'Parrot OS', category: 'OS', level: 90, icon: Terminal, color: '#00ff41' },
  { name: 'Ubuntu', category: 'OS', level: 85, icon: Terminal, color: '#00ff41' },
  { name: 'Windows', category: 'OS', level: 80, icon: Terminal, color: '#00ff41' },
  
  // Security Tools
  { name: 'Wireshark', category: 'Tools', level: 90, icon: Wifi, color: '#00f0ff' },
  { name: 'Nmap', category: 'Tools', level: 85, icon: Search, color: '#00f0ff' },
  { name: 'Burp Suite', category: 'Tools', level: 80, icon: Bug, color: '#00f0ff' },
  { name: 'Metasploit', category: 'Tools', level: 75, icon: Shield, color: '#00f0ff' },
  { name: 'Nessus', category: 'Tools', level: 70, icon: Lock, color: '#00f0ff' },
  
  // Forensics
  { name: 'Autopsy', category: 'Forensics', level: 80, icon: FileSearch, color: '#ff003c' },
  { name: 'Photorec', category: 'Forensics', level: 75, icon: FileSearch, color: '#ff003c' },
];

const categories = ['All', 'Programming', 'OS', 'Tools', 'Web', 'Database', 'Forensics'];

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
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

  const filteredSkills = activeCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Animated Network Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00ff41]/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#00ff41]" />
            <span className="font-mono text-sm text-[#00ff41] uppercase tracking-widest">Technical Arsenal</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">SKILL_MATRIX</span>
          </h2>
          <p className="text-[#a0a0a0] max-w-2xl">
            A comprehensive toolkit honed through 1000+ hours of hands-on lab work, 
            certifications, and real-world security projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap gap-2 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-mono text-sm uppercase tracking-wider border transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#00ff41]/20 border-[#00ff41] text-[#00ff41]'
                  : 'border-[#00ff41]/30 text-[#a0a0a0] hover:border-[#00ff41]/60 hover:text-[#00ff41]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredSkill === skill.name;
            
            return (
              <div
                key={skill.name}
                className={`group relative p-4 border transition-all duration-500 cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${isHovered ? 'border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.2)]' : 'border-[#00ff41]/20'}`}
                style={{ 
                  transitionDelay: `${index * 0.05}s`,
                  borderColor: isHovered ? skill.color : `${skill.color}30`,
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Icon */}
                <div className="flex items-center justify-between mb-3">
                  <Icon 
                    className="w-6 h-6 transition-all duration-300 group-hover:scale-110" 
                    style={{ color: skill.color }}
                  />
                  <span 
                    className="font-mono text-xs px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: `${skill.color}20`,
                      color: skill.color,
                    }}
                  >
                    {skill.category}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="font-mono text-sm font-bold text-[#e0e0e0] mb-2 group-hover:text-white transition-colors">
                  {skill.name}
                </h3>

                {/* Progress Bar */}
                <div className="relative h-1 bg-[#111] overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 transition-all duration-1000 skill-bar-fill"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      backgroundColor: skill.color,
                      transitionDelay: `${index * 0.1}s`,
                    }}
                  />
                </div>

                {/* Level Indicator */}
                <div className="flex justify-between items-center mt-2">
                  <span className="font-mono text-xs text-[#a0a0a0]">Proficiency</span>
                  <span className="font-mono text-xs" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </div>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.color}10 0%, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Kali Linux Tools Section */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-5 h-5 text-[#00f0ff]" />
            <h3 className="font-mono text-xl text-[#00f0ff]">KALI_LINUX_TOOLCHAIN</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[
              'nmap', 'wireshark', 'msfconsole', 'msfvenom', 'Nessus',
              'social-engineering toolkit', 'Burpsuite', 'Beef', 
              'sqlmap', 'aircrack-ng', 'enum4linux', 'hydra', 
              'medusa', 'hashlib'
            ].map((tool, index) => (
              <span
                key={tool}
                className="px-4 py-2 font-mono text-sm border border-[#00f0ff]/30 text-[#00f0ff] hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Python Libraries */}
        <div className={`mt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-6">
            <Code className="w-5 h-5 text-[#00ff41]" />
            <h3 className="font-mono text-xl text-[#00ff41]">PYTHON_LIBRARIES</h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[
              'NumPy', 'Pandas', 'Flask', 'Django', 'Matplotlib',
              'Scipy', 'Scikit-learn', 'Seaborn', 'PyQt5', 'MySQLdb'
            ].map((lib, index) => (
              <span
                key={lib}
                className="px-4 py-2 font-mono text-sm border border-[#00ff41]/30 text-[#00ff41] hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {lib}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
