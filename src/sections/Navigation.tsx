import { useState, useEffect } from 'react';
import { Shield, Menu, X, Terminal } from 'lucide-react';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CERTIFICATIONS', href: '#certifications' },
  { label: 'CONTACT', href: '#contact' },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Determine active section
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#00ff41]/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <Shield className="w-8 h-8 text-[#00ff41] group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-[#00ff41] blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <span className="font-mono text-sm font-bold text-[#00ff41]">SEC</span>
                <span className="font-mono text-sm text-[#e0e0e0]">_ANALYST</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className={`relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    activeSection === item.href.slice(1)
                      ? 'text-[#00ff41]'
                      : 'text-[#a0a0a0] hover:text-[#00ff41]'
                  }`}
                >
                  {activeSection === item.href.slice(1) && (
                    <span className="absolute inset-0 bg-[#00ff41]/10 border border-[#00ff41]/30" />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className="cyber-button text-xs py-2 px-4"
              >
                <span className="flex items-center gap-2">
                  <Terminal className="w-3 h-3" />
                  CONNECT
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 border border-[#00ff41]/30 hover:border-[#00ff41] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#00ff41]" />
              ) : (
                <Menu className="w-5 h-5 text-[#00ff41]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-[#050505]/95 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-6">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              className={`font-mono text-2xl uppercase tracking-wider transition-all duration-300 ${
                activeSection === item.href.slice(1)
                  ? 'text-[#00ff41]'
                  : 'text-[#a0a0a0] hover:text-[#00ff41]'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: isMobileMenuOpen ? 'fadeInUp 0.5s forwards' : 'none',
                opacity: isMobileMenuOpen ? 1 : 0,
              }}
            >
              {item.label}
            </a>
          ))}
          
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
            className="mt-8 cyber-button"
            style={{ 
              animation: isMobileMenuOpen ? 'fadeInUp 0.5s 0.6s forwards' : 'none',
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              ESTABLISH_CONNECTION
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
