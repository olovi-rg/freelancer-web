'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, ChevronRight } from 'lucide-react'

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full animate-blob" />
        <div className="absolute -bottom-20 right-10 w-[600px] h-[400px] bg-cyan-500/8 blur-[100px] rounded-full animate-blob animation-delay-2000" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full h-full">
        {/* Hero Content */}
        <motion.div 
          className="space-y-8 max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Status Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[#27CFEE] text-sm font-[600] tracking-wider uppercase"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="relative flex h-2.5 w-2.5"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2cd2f0] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#27CFEE]" />
            </motion.span>
            Available for new projects
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Engineering{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Digital
            </motion.span>{' '}
            Excellence
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Full-stack developer specializing in high-performance Next.js applications, React ecosystems, 
            and enterprise-grade Sanity CMS integrations.
          </motion.p>

          {/* CTA Buttons + Social */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a 
              href="#projects"
              className="group bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-slate-200 transition-all hover:shadow-2xl hover:-translate-y-1 shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects 
              <motion.div 
                initial={{ x: 0 }}
                animate={{ x: "8px" }}
                transition={{ duration: 0.3 }}
                className="w-5 h-5"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </motion.a>
            
            <div className="flex gap-4 pt-2 sm:pt-0">
  {/* GitHub - FIXED */}
  <motion.a 
    href="https://github.com"
    className="w-12 h-12 bg-slate-900/50 hover:bg-indigo-500/20 rounded-xl flex items-center justify-center border border-slate-800 group relative overflow-hidden"
    whileHover={{ 
      scale: 1.1, 
      rotate: [0, -10, 10, 0],
      borderColor: '#6366f1' // indigo-500
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ 
      scale: { duration: 0.2 },
      rotate: { duration: 0.4 },
      borderColor: { duration: 0.2 }
    }}
    aria-label="GitHub"
  >
    <Github className="w-6 h-6 text-white group-hover:text-indigo-300 transition-colors duration-300 z-10 relative" />
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
  </motion.a>

  {/* LinkedIn - FIXED */}
  <motion.a 
    href="https://linkedin.com"
    className="w-12 h-12 bg-slate-900/50 hover:bg-indigo-500/20 rounded-xl flex items-center justify-center border border-slate-800 group relative overflow-hidden"
    whileHover={{ 
      scale: 1.1, 
      rotate: [0, 10, -10, 0],
      borderColor: '#6366f1' // indigo-500
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ 
      scale: { duration: 0.2 },
      rotate: { duration: 0.4 },
      borderColor: { duration: 0.2 }
    }}
    aria-label="LinkedIn"
  >
    <Linkedin className="w-6 h-6 text-white group-hover:text-indigo-200 transition-colors duration-300 z-10 relative" />
    {/* Glow effect */}
    <div className="absolute inset-0 bg-gradient-to-l from-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
  </motion.a>
</div>

          </motion.div>
        </motion.div>

        {/* Code Terminal */}
        <motion.div 
          className="relative lg:ml-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {/* Decorative orbs */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

          {/* Terminal */}
          <motion.div 
            className="relative z-10 bg-slate-900 border-4 border-slate-800/50 rounded-3xl p-4 shadow-2xl backdrop-blur-sm bg-slate-900/90 hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex gap-2 mb-6 px-4 pt-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            
            <div className="bg-slate-950/50 rounded-2xl p-8 font-mono text-sm overflow-hidden">
              <code className="text-white">
                <motion.div 
                  className="text-slate-400 mb-4 opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  // Rahul&apos;s Core Stack
                </motion.div>
                <motion.div className="text-pink-400 mb-3 font-semibold animate-pulse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.4 }}>
                  const
                </motion.div>
                <motion.div className="mb-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.6 }}>
                  stack <span className="text-emerald-400">=</span> <span className="text-emerald-500">{"{"}</span>
                </motion.div>
                <motion.div className="pl-8 mb-1 text-emerald-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.8 }}>
                  frontend: <span>["Next.js", "React", "TypeScript"]</span>,
                </motion.div>
                <motion.div className="pl-8 mb-1 text-emerald-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.0 }}>
                  cms: <span>["Sanity", "Tailwind"]</span>,
                </motion.div>
                <motion.div className="pl-8 mb-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.2 }}>
                  experience: <span className="text-amber-400">"5+ Years"</span>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.4 }}>
                  <span className="text-emerald-500">{"}"}</span>;
                </motion.div>
              </code>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}
