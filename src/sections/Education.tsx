import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  year: string;
  location: string;
  gpa: string;
  concentration: string[];
  image: string;
  color: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    institution: 'AUBURN UNIVERSITY',
    degree: 'MS Computer & Information Systems Security',
    year: '2023 - 2025',
    location: 'Montgomery, AL, USA',
    gpa: '3.79',
    concentration: [
      'Malware Analysis & Digital Forensics',
      'Ethical Hacking & Penetration Testing',
      'Linux & Python',
      'Network Security & Reliability',
      'Advanced Operating Systems',
    ],
    image: '/auburn_campus.jpg',
    color: '#00ff41',
  },
  {
    id: 2,
    institution: 'JNTU HYDERABAD',
    degree: 'BTech Computer Science Engineering',
    year: '2018 - 2022',
    location: 'Hyderabad, India',
    gpa: '6.23',
    concentration: [
      'Design and Analysis of Algorithms',
      'Data Structures',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
    ],
    image: '/jntu_campus.jpg',
    color: '#00f0ff',
  },
];

const Education = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="education" 
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
            <span className="font-mono text-sm text-[#00f0ff] uppercase tracking-widest">Academic Records</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient">EDUCATION_LOG</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00ff41]/20 via-[#00f0ff]/40 to-[#00ff41]/20 transform -translate-y-1/2 hidden lg:block" />
          
          {/* Data Packets Animation */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] transform -translate-y-1/2 hidden lg:block overflow-hidden">
            <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#00ff41] rounded-sm animate-pulse"
              style={{
                animation: 'dataPacket 4s linear infinite',
              }}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {educationData.map((edu, index) => (
              <div
                key={edu.id}
                className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.3}s` }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Card */}
                <div className={`group relative border-2 transition-all duration-500 ${
                  activeIndex === index 
                    ? 'border-[#00ff41] shadow-[0_0_30px_rgba(0,255,65,0.2)]' 
                    : 'border-[#00ff41]/20 hover:border-[#00ff41]/50'
                }`}>
                  
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={edu.image}
                      alt={edu.institution}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                    
                    {/* Institution Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" style={{ color: edu.color }} />
                        <span className="font-mono text-sm uppercase tracking-wider" style={{ color: edu.color }}>
                          {edu.institution}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-[#0a0a0a]">
                    {/* Degree */}
                    <h3 className="text-xl md:text-2xl font-bold text-[#e0e0e0] mb-4">
                      {edu.degree}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-[#a0a0a0]">
                        <Calendar className="w-4 h-4" style={{ color: edu.color }} />
                        <span className="font-mono text-sm">{edu.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#a0a0a0]">
                        <MapPin className="w-4 h-4" style={{ color: edu.color }} />
                        <span className="font-mono text-sm">{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" style={{ color: edu.color }} />
                        <span className="font-mono text-sm font-bold" style={{ color: edu.color }}>
                          GPA: {edu.gpa}
                        </span>
                      </div>
                    </div>

                    {/* Concentration */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: edu.color }} />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#a0a0a0]">
                          Concentration Areas
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.concentration.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-mono border transition-all duration-300 hover:scale-105"
                            style={{ 
                              borderColor: `${edu.color}40`,
                              color: edu.color,
                              backgroundColor: `${edu.color}10`,
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Corner Decorations */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: edu.color }} />
                  <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: edu.color }} />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: edu.color }} />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: edu.color }} />
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:flex absolute -top-8 left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div 
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      activeIndex === index ? 'scale-150' : ''
                    }`}
                    style={{ 
                      backgroundColor: edu.color,
                      boxShadow: `0 0 20px ${edu.color}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dataPacket {
          0% { left: 0; }
          100% { left: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Education;
