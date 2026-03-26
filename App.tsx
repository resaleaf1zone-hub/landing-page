import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Check, Camera, Cpu, Battery, Maximize, Wifi, Shield, MessageSquare, Settings } from 'lucide-react';

function PhoneMockup() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const [activeApp, setActiveApp] = useState<string | null>(null);

  const handleAppClick = (appName: string) => {
    setActiveApp(appName);
    setTimeout(() => setActiveApp(null), 1000);
  };

  return (
    <section ref={ref} className="relative py-32 flex justify-center overflow-hidden" style={{ perspective: 2000 }}>
      <motion.div 
        style={{ rotateX, rotateY, y, opacity }}
        className="relative w-64 h-[500px] md:w-80 md:h-[600px] z-10"
      >
        <motion.div 
          className="w-full h-full rounded-2xl phone-frame bg-black relative overflow-hidden border border-gray-800"
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Screen Content - Pure black reflective slab */}
          <div className="phone-screen absolute inset-1 rounded-xl border-2 border-gray-900 flex flex-col justify-end p-4">
            <div className="phone-reflection pointer-events-none"></div>
            
            {/* Interactive Dock */}
            <div className="relative z-20 flex justify-around items-center bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/5">
              <motion.button 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick('camera')}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeApp === 'camera' ? 'bg-white text-black' : 'bg-gray-800/80 text-white hover:bg-gray-700'}`}
              >
                <Camera className="w-6 h-6" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick('messages')}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeApp === 'messages' ? 'bg-green-500 text-white' : 'bg-green-500/80 text-white hover:bg-green-400'}`}
              >
                <MessageSquare className="w-6 h-6" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleAppClick('settings')}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeApp === 'settings' ? 'bg-gray-400 text-black' : 'bg-gray-600/80 text-white hover:bg-gray-500'}`}
              >
                <Settings className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('idle');
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('idle');
      alert('Network error. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12">
      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center space-x-2 text-green-400 bg-green-500/10 py-4 px-6 rounded-2xl border border-green-500/20"
        >
          <Check className="w-5 h-5" />
          <span className="font-medium">You're on the list.</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative flex items-center bg-white/5 backdrop-blur-md rounded-2xl shadow-sm border border-white/10 p-1 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all duration-300">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:outline-none"
              disabled={status === 'loading'}
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              ) : (
                <>
                  Notify Me
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function ScrollSequence() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Text 1: 0 to 0.33
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.33], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.33], [50, 0, 0, -50]);

  // Text 2: 0.33 to 0.66
  const opacity2 = useTransform(scrollYProgress, [0.33, 0.48, 0.58, 0.66], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.33, 0.48, 0.58, 0.66], [50, 0, 0, -50]);

  // Text 3: 0.66 to 1
  const opacity3 = useTransform(scrollYProgress, [0.66, 0.81, 0.91, 1], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.66, 0.81, 0.91, 1], [50, 0, 0, -50]);

  return (
    <div ref={ref} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.h2 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute text-5xl md:text-7xl font-semibold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        >
          Built differently.
        </motion.h2>
        <motion.h2 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute text-5xl md:text-7xl font-semibold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        >
          Designed for the future.
        </motion.h2>
        <motion.h2 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute text-5xl md:text-7xl font-semibold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        >
          Made to last.
        </motion.h2>
      </div>
    </div>
  );
}

function FeatureBlocks() {
  const features = [
    { icon: <Camera className="w-6 h-6" />, title: "Optics", desc: "Pro-level camera system with computational photography." },
    { icon: <Cpu className="w-6 h-6" />, title: "Silicon", desc: "Next-generation neural engine processing." },
    { icon: <Battery className="w-6 h-6" />, title: "Power", desc: "High-density cell for multi-day endurance." },
    { icon: <Maximize className="w-6 h-6" />, title: "Display", desc: "120Hz ProMotion OLED panel." },
    { icon: <Wifi className="w-6 h-6" />, title: "Connectivity", desc: "Ultra-wideband and Wi-Fi 7 ready." },
    { icon: <Shield className="w-6 h-6" />, title: "Security", desc: "Hardware-level encryption enclave." },
  ];

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto relative z-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">Every detail, perfected.</h2>
        <p className="text-gray-400 text-lg">Engineered from the ground up.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-gray-400 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-animated-gradient selection:bg-blue-500/30 selection:text-blue-200">
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 p-6 flex justify-between items-center text-white">
        <div className="font-semibold tracking-tighter text-xl">Aura.</div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 px-6 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>

        <div className="z-30 text-center max-w-3xl mx-auto relative">
          <motion.h1 
            className="text-6xl md:text-8xl font-semibold tracking-tighter text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Something new <br className="hidden md:block" /> is coming.
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 font-medium tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Be the first to experience it.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <EmailCapture />
          </motion.div>
        </div>
      </section>

      {/* Feature Blocks */}
      <FeatureBlocks />

      {/* Phone Mockup */}
      <PhoneMockup />

      {/* Scroll Sections */}
      <ScrollSequence />

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="font-semibold tracking-tighter text-xl text-white mb-4 md:mb-0">Aura.</div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Aura Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
