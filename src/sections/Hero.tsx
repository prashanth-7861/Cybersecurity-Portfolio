import { useEffect, useRef, useState } from 'react';
import { Shield, Terminal, Lock, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [displaySubtext, setDisplaySubtext] = useState('');
  const fullText = 'SECURITY ANALYST';
  const fullSubtext = 'DEFENDING DIGITAL FRONTIERS';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typing effect for main title
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Typing effect for subtitle
  useEffect(() => {
    const delay = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullSubtext.length) {
          setDisplaySubtext(fullSubtext.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }, 1500);
    return () => clearTimeout(delay);
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    let frameCount = 0;
    const draw = () => {
      frameCount++;
      if (frameCount % 2 !== 0) {
        requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px 'Share Tech Mono'`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const opacity = Math.random() > 0.98 ? 1 : 0.5;
        ctx.globalAlpha = opacity;
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0.4 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] z-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg opacity-30 z-5" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        {/* Status Badge */}
        <div className="animate-fade-in-up mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#00ff41]/30 rounded-full bg-[#00ff41]/5">
            <span className="w-2 h-2 bg-[#00ff41] rounded-full animate-pulse" />
            <span className="font-mono text-xs text-[#00ff41] uppercase tracking-widest">
              System Online
            </span>
          </div>
        </div>

        {/* Main Title with Glitch Effect */}
        <h1 
          className="glitch text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-wider"
          data-text={displayText}
          style={{ 
            textShadow: '0 0 20px rgba(0, 255, 65, 0.5), 0 0 40px rgba(0, 255, 65, 0.3)' 
          }}
        >
          <span className="text-gradient">{displayText}</span>
          <span className="typing-cursor" />
        </h1>

        {/* Subtitle */}
        <p className="font-mono text-lg md:text-xl lg:text-2xl text-[#a0a0a0] mb-8 tracking-[0.3em] uppercase animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {displaySubtext}
          <span className="typing-cursor" />
        </p>

        {/* Description */}
        <p className="text-[#a0a0a0] max-w-2xl mx-auto mb-12 text-base md:text-lg animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          Entry-level cybersecurity professional with expertise in ethical hacking, 
          digital forensics, and network security. Ready to defend your digital assets.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <button 
            onClick={scrollToAbout}
            className="cyber-button group flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            <span>[ INITIATE_PROTOCOL ]</span>
          </button>
          <a 
            href="#contact"
            className="px-8 py-3 font-mono text-sm uppercase tracking-wider border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all duration-300 flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>ESTABLISH_CONNECTION</span>
          </a>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Shield className="w-6 h-6 text-[#00ff41]" />
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-[#00ff41]">1000+</div>
            <div className="font-mono text-xs text-[#a0a0a0] uppercase tracking-wider">Lab Hours</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Terminal className="w-6 h-6 text-[#00f0ff]" />
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-[#00f0ff]">3.79</div>
            <div className="font-mono text-xs text-[#a0a0a0] uppercase tracking-wider">GPA</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Lock className="w-6 h-6 text-[#00ff41]" />
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold text-[#00ff41]">C|EH</div>
            <div className="font-mono text-xs text-[#a0a0a0] uppercase tracking-wider">Certified</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <button onClick={scrollToAbout} className="text-[#00ff41]/50 hover:text-[#00ff41] transition-colors">
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 z-20">
        <div className="w-16 h-16 border-l-2 border-t-2 border-[#00ff41]/30" />
      </div>
      <div className="absolute top-8 right-8 z-20">
        <div className="w-16 h-16 border-r-2 border-t-2 border-[#00ff41]/30" />
      </div>
      <div className="absolute bottom-8 left-8 z-20">
        <div className="w-16 h-16 border-l-2 border-b-2 border-[#00ff41]/30" />
      </div>
      <div className="absolute bottom-8 right-8 z-20">
        <div className="w-16 h-16 border-r-2 border-b-2 border-[#00ff41]/30" />
      </div>
    </section>
  );
};

export default Hero;
