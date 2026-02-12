import { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle, Clock, ExternalLink, Shield, Lock, Terminal } from 'lucide-react';

interface Certification {
  id: number;
  name: string;
  provider: string;
  status: 'completed' | 'in-progress';
  date?: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const certificationsData: Certification[] = [
  {
    id: 1,
    name: 'Certified Ethical Hacker (C|EH v12)',
    provider: 'EC-Council',
    status: 'Trained',
    date: '2024',
    description: 'Comprehensive ethical hacking and penetration testing certification from an EC-Council Accredited Training Center.',
    icon: Shield,
    color: '#00ff41',
  },
  {
    id: 2,
    name: 'Google Cybersecurity Professional Certificate',
    provider: 'Google / Coursera',
    status: 'in-progress',
    description: 'Professional certificate program covering cybersecurity fundamentals, SIEM tools, and incident response.',
    icon: Lock,
    color: '#00f0ff',
  },
  {
    id: 3,
    name: 'Cisco Junior Cybersecurity Analyst',
    provider: 'Cisco',
    status: 'in-progress',
    description: 'Industry-recognized certification for entry-level cybersecurity analysts.',
    icon: Terminal,
    color: '#00f0ff',
  },
  {
    id: 4,
    name: 'Diploma in Computer Application',
    provider: 'Microsoft Office',
    status: 'completed',
    description: 'Professional certification in Microsoft Office applications.',
    icon: Award,
    color: '#00ff41',
  },
];

const trainingsData = [
  {
    name: 'Learn Ethical Hacking from A-Z',
    provider: 'Udemy - Anthony Timbers',
  },
  {
    name: 'Ethical Hacking: Network Attacks',
    provider: 'Udemy - Peter A',
  },
  {
    name: 'Mastercard Cybersecurity Virtual Experience',
    provider: 'Forage - March 2023',
  },
  {
    name: 'Cybersecurity Webinar',
    provider: 'MoxieHawk',
  },
  {
    name: 'Offensive Security Workshop',
    provider: 'Gautam Kumawat (HackingFlix)',
  },
];

const Certifications = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section 
      id="certifications" 
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#00ff41]" />
            <span className="font-mono text-sm text-[#00ff41] uppercase tracking-widest">Credentials & Training</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">CERTIFICATION_LOG</span>
          </h2>
          <p className="text-[#a0a0a0] max-w-2xl">
            Professional certifications and specialized training demonstrating 
            commitment to continuous learning in cybersecurity.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {certificationsData.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.id}
                className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div 
                  className={`relative p-6 border-2 transition-all duration-500 h-full ${
                    cert.status === 'completed'
                      ? 'border-[#00ff41]/40 hover:border-[#00ff41] hover:shadow-[0_0_30px_rgba(0,255,65,0.2)]'
                      : 'border-[#00f0ff]/40 hover:border-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]'
                  }`}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {cert.status === 'completed' ? (
                      <div className="flex items-center gap-1 px-2 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30">
                        <CheckCircle className="w-3 h-3 text-[#00ff41]" />
                        <span className="font-mono text-xs text-[#00ff41]">VERIFIED</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30">
                        <Clock className="w-3 h-3 text-[#00f0ff]" />
                        <span className="font-mono text-xs text-[#00f0ff]">IN_PROGRESS</span>
                      </div>
                    )}
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <div 
                      className="inline-flex p-3 border-2"
                      style={{ borderColor: cert.color }}
                    >
                      <Icon className="w-6 h-6" style={{ color: cert.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-[#e0e0e0] mb-2 group-hover:text-white transition-colors">
                    {cert.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-sm" style={{ color: cert.color }}>
                      {cert.provider}
                    </span>
                    {cert.date && (
                      <>
                        <span className="text-[#a0a0a0]">|</span>
                        <span className="font-mono text-sm text-[#a0a0a0]">{cert.date}</span>
                      </>
                    )}
                  </div>

                  <p className="text-sm text-[#a0a0a0] mb-4">
                    {cert.description}
                  </p>

                  {/* Action */}
                  <button className="flex items-center gap-2 text-sm font-mono transition-colors hover:opacity-80" style={{ color: cert.color }}>
                    <span>VIEW_CREDENTIAL</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  {/* Corner Decorations */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: cert.color }} />
                  <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: cert.color }} />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: cert.color }} />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: cert.color }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Training */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-[#00f0ff]" />
            <span className="font-mono text-sm text-[#00f0ff] uppercase tracking-wider">
              Additional Training & Experience
            </span>
          </div>

          <div className="border border-[#00ff41]/20 p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainingsData.map((training, index) => (
                <div
                  key={training.name}
                  className="flex items-start gap-3 p-3 border border-[#00ff41]/10 hover:border-[#00ff41]/30 hover:bg-[#00ff41]/5 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Award className="w-4 h-4 text-[#00ff41] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-mono text-sm text-[#e0e0e0]">{training.name}</h4>
                    <p className="font-mono text-xs text-[#a0a0a0]">{training.provider}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extracurricular */}
        <div className={`mt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-[#00f0ff]" />
            <span className="font-mono text-sm text-[#00f0ff] uppercase tracking-wider">
              Extracurricular Activities
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-[#00ff41]/20 hover:border-[#00ff41]/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-[#00ff41]" />
                <span className="font-mono text-sm font-bold text-[#e0e0e0]">Technical Fest Organizer</span>
              </div>
              <p className="text-sm text-[#a0a0a0]">
                Planned and organized technical events at college, demonstrating collaboration, 
                communication, and leadership skills valuable in cross-functional security teams.
              </p>
            </div>
            
            <div className="p-4 border border-[#00f0ff]/20 hover:border-[#00f0ff]/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-[#00f0ff]" />
                <span className="font-mono text-sm font-bold text-[#e0e0e0]">OWASP Juice Shop</span>
              </div>
              <p className="text-sm text-[#a0a0a0]">
                Practiced web penetration testing techniques using OWASP Juice Shop, 
                gaining hands-on experience with common web vulnerabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
