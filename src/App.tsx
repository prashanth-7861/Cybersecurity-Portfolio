import { useEffect, useState } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { Terminal, Shield, Lock } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    // Simulate loading sequence
    const loadingSteps = [
      { progress: 10, text: 'Loading security modules...' },
      { progress: 25, text: 'Initializing encryption protocols...' },
      { progress: 40, text: 'Establishing secure connection...' },
      { progress: 60, text: 'Loading portfolio assets...' },
      { progress: 80, text: 'Verifying credentials...' },
      { progress: 100, text: 'Access granted.' },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-50">
        <div className="w-full max-w-md px-8">
          {/* Loading Animation */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <Shield className="w-16 h-16 text-[#00ff41] animate-pulse" />
              <div className="absolute inset-0 bg-[#00ff41] blur-xl opacity-30" />
            </div>
            <h2 className="font-mono text-2xl text-[#00ff41] mb-2">SYSTEM_BOOT</h2>
            <p className="font-mono text-sm text-[#a0a0a0]">{loadingText}</p>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-[#111] overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00ff41] to-[#00f0ff] transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          {/* Progress Stats */}
          <div className="flex justify-between mt-2 font-mono text-xs text-[#a0a0a0]">
            <span>Loading...</span>
            <span className="text-[#00ff41]">{loadingProgress}%</span>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 grid grid-cols-3 gap-2">
            {[Terminal, Shield, Lock].map((Icon, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-3 border border-[#00ff41]/20"
                style={{ 
                  opacity: loadingProgress > (index + 1) * 30 ? 1 : 0.3,
                  transition: 'opacity 0.3s'
                }}
              >
                <Icon className="w-5 h-5 text-[#00ff41]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] overflow-x-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Scan Line */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 50%, rgba(0, 255, 65, 0.01) 50%)',
            backgroundSize: '100% 4px',
          }}
        />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
