'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { client } from '@/app/lib/sanity.client'
import { FEATURED_PROJECTS_QUERY, PROJECTS_QUERY } from '@/app/lib/sanity.queries'
import { ChevronRight, Github, ExternalLink } from 'lucide-react'

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([])
  const [allProjects, setAllProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [debug, setDebug] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allDocs = await client.fetch('*[_type in ["projects", "project"]]{_id, _type, title}')
        setDebug(JSON.stringify(allDocs.slice(0, 3), null, 2))

        const featured = await client.fetch(FEATURED_PROJECTS_QUERY)
        setProjects(featured)

        const all = await client.fetch(PROJECTS_QUERY)
        setAllProjects(all)
      } catch (error: any) {
        setDebug(`ERROR: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-[#020617] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-6" />
          <motion.p 
            className="text-xl text-slate-400 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Loading projects...
          </motion.p>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="projects" className="relative min-h-screen py-24 bg-[#020617] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-indigo-600/8 to-purple-600/8 blur-[80px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[300px] bg-gradient-to-l from-cyan-500/6 to-blue-500/6 blur-[60px] rounded-full animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500/10 border-2 border-indigo-500/30 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            <motion.div 
              className="relative flex h-3 w-3"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500 shadow-md" />
            </motion.div>
            <span className="text-indigo-300 font-bold uppercase tracking-wider text-sm">
              Handcrafted Excellence
            </span>
          </motion.div>

          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Featured <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">Projects</span>
          </motion.h2>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div 
            className="text-center py-24 bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-800/50"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-2xl text-slate-400 mb-8 font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              No featured projects yet
            </motion.p>
            <Link 
              href="/projects" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 border border-indigo-500/30"
            >
              View All Projects
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={`/projects/${project.slug?.current || project._id}`}
                  className="group relative bg-slate-900/80 backdrop-blur-sm rounded-3xl border border-slate-800/50 overflow-hidden block h-full hover:border-indigo-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-3 shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                        <span className="text-4xl text-slate-600">📱</span>
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <motion.h3 
                      className="text-2xl lg:text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-all duration-500"
                      whileHover={{ scale: 1.02 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <p className="text-slate-400 mb-8 leading-relaxed line-clamp-3 text-lg">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies?.slice(0, 4).map((tech: string, techIndex: number) => (
                        <motion.span
                          key={tech}
                          className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm text-indigo-300 rounded-xl text-sm font-semibold border border-slate-700/50 hover:bg-indigo-500/20 transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ delay: techIndex * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <motion.span 
                      className="text-indigo-400 hover:text-indigo-300 font-bold text-lg flex items-center gap-2 group-hover:translate-x-2 transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      View Project
                      <ChevronRight className="w-5 h-5" />
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Button */}
       
        <motion.div 
          className="flex flex-col items-center gap-10 mt-5 pt-20"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            href="#projects"
            className="group bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-slate-200 transition-all hover:shadow-2xl hover:-translate-y-1 shadow-xl"
          >
            View All Projects 
            <motion.div 
              initial={{ x: 0 }}
              whileHover={{ x: "8px" }}
              transition={{ duration: 0.3 }}
              className="w-5 h-5 flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
