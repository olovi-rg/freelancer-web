'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Activity, TrendingUp, ShieldCheck, BarChart3 } from 'lucide-react'

export default function SEOSection() {
  const [seoScore, setSeoScore] = useState(0)

  // SEO Counter Animation
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const timer = setInterval(() => {
          setSeoScore(prev => prev < 98 ? prev + 1 : 98)
        }, 25)
        return () => clearInterval(timer)
      }
    })
    
    const element = document.querySelector('#seo-metrics')
    if (element) observer.observe(element)
    
    return () => observer.disconnect()
  }, [])

  const seoFeatures = [
    {
      title: "Technical SEO",
      icon: <Search className="w-5 h-5" />,
      desc: "Optimized XML sitemaps, robots.txt, and schema markup implementation for enhanced crawling."
    },
    {
      title: "Performance First",
      icon: <Activity className="w-5 h-5" />,
      desc: "Perfect Core Web Vitals. Optimizing LCP, FID, and CLS for better ranking signals."
    },
    {
      title: "Search Strategy",
      icon: <TrendingUp className="w-5 h-5" />,
      desc: "Keyword mapping and semantic HTML structure to ensure content reaches the right audience."
    }
  ]

  return (
    <section id="seo" className="py-24 bg-slate-900/20 border-y border-slate-900 relative overflow-hidden bg-gradient-to-b from-[#020617] to-slate-950">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm mb-4 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <BarChart3 className="w-4 h-4" /> Visibility Metrics
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Optimization for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-2xl">Search Supremacy</span>
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 text-lg mb-10 leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Coding with a "Search-First" mindset. I ensure your Next.js and Sanity builds aren't just pretty—they're discoverable, blazing fast, and ranked.
          </motion.p>
          
          <div className="space-y-6">
            {seoFeatures.map((feature, i) => (
              <motion.div 
                key={feature.title}
                className="flex gap-4 group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-900/80 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.6 }}
                whileHover={{ x: 8 }}
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 mt-1">
                  {feature.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-bold text-lg mb-1 truncate">{feature.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Metrics */}
        <motion.div 
          id="seo-metrics"
          className="relative order-1 lg:order-2 group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 -z-10" />
          
          <div className="relative bg-slate-950 rounded-3xl border border-slate-800 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-800/50">
              <div className="space-y-1">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-tighter">Site Performance Audit</p>
                <p className="text-lg font-bold text-white">Google Lighthouse Live</p>
              </div>
              <div className="flex gap-2 p-3 bg-slate-900/50 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{animationDelay: '0.2s'}} />
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" style={{animationDelay: '0.4s'}} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center hover:bg-emerald-500/10 transition-all cursor-pointer group">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-emerald-500 stroke-current transition-all duration-1000 ease-out" strokeWidth="3" strokeDasharray={`${seoScore}, 100`} strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{seoScore}</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-emerald-400 transition-colors">SEO Score</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center hover:bg-cyan-500/10 transition-all cursor-pointer group">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-slate-800 stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-cyan-400 stroke-current transition-all duration-1000 ease-out" strokeWidth="3" strokeDasharray="99, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">99</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">Performance</p>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-emerald-400 text-sm font-semibold">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" /> All Core Web Vitals Passing
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
