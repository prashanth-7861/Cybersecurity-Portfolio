import { Shield, Heart, Github, Linkedin, Mail, Terminal } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/prashanth-7861', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mudigondaprashanth', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: '57.farrow-tine@icloud.com' },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative py-16 px-4 border-t border-[#00ff41]/20">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-[#00ff41]" />
              <div>
                <span className="font-mono text-lg font-bold text-[#00ff41]">SECURITY</span>
                <span className="font-mono text-lg text-[#e0e0e0]">_ANALYST</span>
              </div>
            </div>
            <p className="text-sm text-[#a0a0a0] mb-6 max-w-sm">
              Entry-level cybersecurity professional dedicated to protecting digital assets 
              through ethical hacking, forensics, and continuous learning.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-[#00ff41]/30 hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-[#00ff41] group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-sm text-[#00f0ff] uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#a0a0a0] hover:text-[#00ff41] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#00ff41]/50 group-hover:bg-[#00ff41] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-mono text-sm text-[#00f0ff] uppercase tracking-wider mb-4">
              System Status
            </h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
                <span className="text-[#00ff41]">ONLINE</span>
              </div>
              <div className="text-[#a0a0a0]">
                <span className="text-[#00f0ff]">{'>'}</span> Available for opportunities
              </div>
              <div className="text-[#a0a0a0]">
                <span className="text-[#00f0ff]">{'>'}</span> Open to relocation
              </div>
              <div className="text-[#a0a0a0]">
                <span className="text-[#00f0ff]">{'>'}</span> Remote/Hybrid preferred
              </div>
            </div>

            {/* Terminal Decoration */}
            <div className="mt-6 p-3 bg-[#0a0a0a] border border-[#00ff41]/20 font-mono text-xs">
              <div className="text-[#00ff41]/70">
                <span className="text-[#00f0ff]">$</span> echo $STATUS
              </div>
              <div className="text-[#00ff41]">
                ready_to_defend
              </div>
              <div className="text-[#00ff41]/70">
                <span className="text-[#00f0ff]">$</span> <span className="terminal-cursor w-2 h-3 bg-[#00ff41] inline-block" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#00ff41]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
              <Terminal className="w-4 h-4 text-[#00ff41]" />
              <span className="font-mono">
                &copy; {currentYear} Prashanth Mudigonda's Portfolio
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#a0a0a0]">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-[#ff003c] fill-[#ff003c]" />
              <span>and</span>
              <span className="text-[#00ff41] font-mono">React</span>
            </div>

            <div className="font-mono text-xs text-[#a0a0a0]">
              <span className="text-[#00ff41]">C|EH</span> v12 Trained
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
