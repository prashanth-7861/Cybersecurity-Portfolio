import { useEffect, useRef, useState } from 'react';
import { Send, Mail, MapPin, Phone, Linkedin, Github, ExternalLink, Terminal, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '> System initialized...',
    '> Waiting for connection...',
  ]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    setTerminalLines(prev => [
      ...prev,
      `> Received message from: ${formData.name}`,
      '> Encrypting data...',
      '> Establishing secure channel...',
    ]);

    setTimeout(() => {
      setFormState('sent');
      setTerminalLines(prev => [
        ...prev,
        '> Message transmitted successfully!',
        '> Connection established.',
        '> Awaiting response...',
      ]);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section 
      id="contact" 
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
            <span className="font-mono text-sm text-[#00f0ff] uppercase tracking-widest">Secure Channel</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">ESTABLISH_CONNECTION</span>
          </h2>
          <p className="text-[#a0a0a0] max-w-2xl">
            Ready to contribute to your security team. Let's discuss how my skills 
            can help protect your digital assets.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Terminal Form */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="border-2 border-[#00ff41]/40 bg-[#0a0a0a] overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-[#00ff41]/20">
                <div className="w-3 h-3 rounded-full bg-[#ff003c]" />
                <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                <div className="w-3 h-3 rounded-full bg-[#00ff41]" />
                <span className="ml-4 font-mono text-xs text-[#a0a0a0]">secure_terminal.exe</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6">
                {/* Terminal Output */}
                <div className="mb-6 font-mono text-sm text-[#00ff41]/70 space-y-1">
                  {terminalLines.map((line, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-[#00f0ff]">$</span>
                      <span>{line}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <span className="text-[#00f0ff]">$</span>
                    <span className="terminal-cursor w-2 h-4 bg-[#00ff41]" />
                  </div>
                </div>

                {formState === 'sent' ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-[#00ff41] mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[#00ff41] mb-2">TRANSMISSION COMPLETE</h3>
                    <p className="text-[#a0a0a0] font-mono text-sm">
                      Message encrypted and sent successfully.<br />
                      Will respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div className="group">
                      <label className="flex items-center gap-2 font-mono text-xs text-[#a0a0a0] mb-2">
                        <span className="text-[#00ff41]">{'>'}</span>
                        <span>ENTER_NAME:</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        disabled={formState === 'sending'}
                        className="w-full bg-[#050505] border border-[#00ff41]/30 px-4 py-3 font-mono text-sm text-[#e0e0e0] focus:border-[#00ff41] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all disabled:opacity-50"
                        placeholder="your_name"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="group">
                      <label className="flex items-center gap-2 font-mono text-xs text-[#a0a0a0] mb-2">
                        <span className="text-[#00ff41]">{'>'}</span>
                        <span>ENTER_EMAIL:</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        disabled={formState === 'sending'}
                        className="w-full bg-[#050505] border border-[#00ff41]/30 px-4 py-3 font-mono text-sm text-[#e0e0e0] focus:border-[#00ff41] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all disabled:opacity-50"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="group">
                      <label className="flex items-center gap-2 font-mono text-xs text-[#a0a0a0] mb-2">
                        <span className="text-[#00ff41]">{'>'}</span>
                        <span>ENTER_MESSAGE:</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                        disabled={formState === 'sending'}
                        rows={4}
                        className="w-full bg-[#050505] border border-[#00ff41]/30 px-4 py-3 font-mono text-sm text-[#e0e0e0] focus:border-[#00ff41] focus:outline-none focus:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all resize-none disabled:opacity-50"
                        placeholder="Your message here..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === 'sending'}
                      className="w-full cyber-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formState === 'sending' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#00ff41] border-t-transparent rounded-full animate-spin" />
                          <span>ENCRYPTING...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>TRANSMIT_DATA</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Contact Cards */}
            <div className="grid gap-4">
              {[
                { icon: Mail, label: 'Email', value: 'contact@securityanalyst.dev', color: '#00ff41' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 000-0000', color: '#00f0ff' },
                { icon: MapPin, label: 'Location', value: 'Montgomery, AL, USA', color: '#00ff41' },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-4 p-4 border border-[#00ff41]/20 hover:border-[#00ff41]/60 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div 
                    className="p-3 border-2 transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: item.color }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[#a0a0a0] uppercase tracking-wider">
                      {item.label}
                    </span>
                    <p className="font-mono text-sm text-[#e0e0e0]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-[2px] bg-[#00f0ff]" />
                <span className="font-mono text-sm text-[#00f0ff] uppercase tracking-wider">
                  Social Links
                </span>
              </div>

              <div className="flex gap-4">
                {[
                  { icon: Linkedin, label: 'LinkedIn', href: '#' },
                  { icon: Github, label: 'GitHub', href: 'https://github.com/prashanth-7861' },
                  { icon: ExternalLink, label: 'Portfolio', href: '#' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-3 border border-[#00ff41]/30 hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-[#00ff41] group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-sm text-[#00ff41]">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Status Card */}
            <div className="border border-[#00ff41]/20 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-5 h-5 text-[#00ff41]" />
                <span className="font-mono text-sm text-[#00ff41]">SYSTEM_STATUS</span>
              </div>
              
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Availability:</span>
                  <span className="text-[#00ff41]">OPEN_TO_WORK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Response Time:</span>
                  <span className="text-[#00f0ff]">{'<24h'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Preferred Roles:</span>
                  <span className="text-[#00ff41]">SOC Analyst</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#a0a0a0]">Location:</span>
                  <span className="text-[#00f0ff]">Remote/Hybrid</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="mt-6 space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#a0a0a0]">Job Search Progress</span>
                    <span className="text-[#00ff41]">85%</span>
                  </div>
                  <div className="h-1 bg-[#111]">
                    <div className="h-full bg-[#00ff41] skill-bar-fill" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#a0a0a0]">Certification Progress</span>
                    <span className="text-[#00f0ff]">70%</span>
                  </div>
                  <div className="h-1 bg-[#111]">
                    <div className="h-full bg-[#00f0ff] skill-bar-fill" style={{ width: '70%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
