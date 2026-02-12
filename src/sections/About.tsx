import { useEffect, useRef, useState } from 'react';
import { User, Award, BookOpen, Target } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [decryptedText, setDecryptedText] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const originalText = `Recent MS Cybersecurity graduate (3.79 GPA) with extensive hands-on experience across real-time operating systems, virtualization (VirtualBox), and security-focused distributions (Kali Linux, Parrot OS, Omarchy, Ubuntu). While new to professional roles, brings battle-tested familiarity with multi-OS environments through 1000+ hours of lab work, ethical hacking training (C|EH v12), and academic security projects.

Comfortable operating at the systems level—kernel parameters, service hardening, network stack configuration—across Linux/Unix, Windows, and RTOS platforms. Actively dissects production-like traffic patterns using Wireshark and Kali toolchains (nmap, Burp Suite, msfconsole) to understand attack surfaces before they become vulnerabilities. Ready for entry-level SOC/Network Security Analyst roles where deep OS/network intuition accelerates ramp-up time.`;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

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

  // Text decryption effect
  useEffect(() => {
    if (!isVisible) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDecryptedText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === '\n') return '\n';
            if (char === ' ') return ' ';
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 2;
    }, 15);

    return () => clearInterval(interval);
  }, [isVisible]);

  const highlights = [
    { icon: Award, label: 'GPA', value: '3.79', color: '#00ff41' },
    { icon: BookOpen, label: 'Lab Hours', value: '1000+', color: '#00f0ff' },
    { icon: Target, label: 'Focus', value: 'Security', color: '#00ff41' },
    { icon: User, label: 'Status', value: 'C|EH v12', color: '#00f0ff' },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Rotating Wireframe Globe Effect */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none">
        <div className="relative w-full h-full animate-rotate-slow">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-[#00f0ff] rounded-full"
              style={{
                transform: `rotateX(${i * 15}deg) rotateY(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#00ff41]" />
            <span className="font-mono text-sm text-[#00ff41] uppercase tracking-widest">Identity Verification</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="text-gradient">IDENTITY_VERIFY</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Scan Line Effect */}
              <div className="absolute inset-0 scan-line z-10 pointer-events-none" />
              
              {/* Image Container */}
              <div className="relative overflow-hidden border-2 border-[#00ff41]/30 group">
                <img
                  src="/profile_photo.png"
                  alt="Profile"
                  className="w-full max-w-md mx-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-[#00ff41]" />
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-[#00ff41]" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#00ff41]" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-[#00ff41]" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#111] border border-[#00ff41] px-4 py-2">
                <span className="font-mono text-xs text-[#00ff41]">STATUS: ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Decrypted Bio Text */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
                <span className="font-mono text-xs text-[#00f0ff]">DECRYPTING_PROFILE...</span>
              </div>
              <div className="font-mono text-sm md:text-base text-[#e0e0e0] leading-relaxed whitespace-pre-line border-l-2 border-[#00ff41]/30 pl-4">
                {decryptedText}
                <span className="terminal-cursor text-[#00ff41]" />
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.label}
                  className="group relative p-4 border border-[#00ff41]/20 hover:border-[#00ff41]/60 transition-all duration-300 hover-glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon 
                    className="w-5 h-5 mb-2 transition-colors duration-300" 
                    style={{ color: item.color }}
                  />
                  <div 
                    className="font-mono text-xl font-bold"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </div>
                  <div className="font-mono text-xs text-[#a0a0a0] uppercase tracking-wider">
                    {item.label}
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ff41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
