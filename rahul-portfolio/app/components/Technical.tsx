'use client'
import { motion } from 'framer-motion'
import { Terminal, Cpu, Globe, Layers } from 'lucide-react'

export default function Technical() {
  const skills = [
    { 
      name: 'Next.js', 
      icon: <Terminal className="w-6 h-6" />, 
      level: '95%', 
      desc: 'Server-side rendering & Static Generation experts.',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      name: 'React', 
      icon: <Cpu className="w-6 h-6" />, 
      level: '98%', 
      desc: 'Building scalable, component-driven user interfaces.',
      color: 'from-cyan-400 to-blue-500'
    },
    { 
      name: 'Sanity CMS', 
      icon: <Layers className="w-6 h-6" />, 
      level: '92%', 
      desc: 'Headless CMS with GROQ querying and real-time editing.',
      color: 'from-indigo-400 to-purple-500'
    },
    { 
      name: 'Tailwind CSS', 
      icon: <Globe className="w-6 h-6" />, 
      level: '96%', 
      desc: 'Utility-first CSS framework for rapid UI development.',
      color: 'from-emerald-400 to-teal-500'
    },
  ]

  return (
    <section id="expertise" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#050A1A] to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-indigo-500 font-mono text-sm mb-3 tracking-widest uppercase flex items-center gap-2">
              <span className="w-8 h-[1px] bg-indigo-500" /> Technical Arsenal
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Expertise & Specialized Stack</h3>
          </div>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              className="group relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800/50 hover:bg-slate-900/60 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${skill.color} blur-xl rounded-3xl transition-opacity duration-500 -z-10`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.color} p-[1px] mb-6 shadow-lg`}>
                  <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-inner">
                    {skill.icon}
                  </div>
                </div>
                
                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors duration-300">
                  {skill.name}
                </h4>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
                  {skill.desc}
                </p>
                
                <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-md`}
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
