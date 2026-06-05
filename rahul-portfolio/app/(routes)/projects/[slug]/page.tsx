'use client'  // ✅ ADD THIS LINE
import { client } from '@/app/lib/sanity.client'
import { PROJECT_QUERY } from '@/app/lib/sanity.queries'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Code, ExternalLink, Monitor } from 'lucide-react'
import { useEffect } from 'react'
import React from 'react'

interface Props {
  params: Promise<{ slug: string }>
}

// ✅ Convert to Client Component - move fetch to useEffect
export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const [project, setProject] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { slug } = await params
        const data = await client.fetch(PROJECT_QUERY, { slug })
        setProject(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-6">
        <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-6">
        <div className="text-center max-w-md">
          <motion.div 
            className="w-24 h-24 bg-[#111111] rounded-3xl flex items-center justify-center mx-auto mb-8 border border-[#222222]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Monitor className="w-12 h-12 text-slate-500" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-black text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Project Not Found
          </motion.h1>
          <Link 
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#111111] hover:bg-[#1a1a1a] border border-[#222222] hover:border-[#333333] text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-[#111111]/50"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  // ... rest of your JSX stays exactly the same
  return (
    <section className='bg-slate-950'>

    <article className="min-h-screen  py-24 px-6 max-w-6xl mx-auto">
      {/* Back Link */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-16"
      >
        <Link 
          href="/projects"
          className="group inline-flex items-center gap-3 px-6 py-3 bg-[#111111]/80 backdrop-blur-sm hover:bg-[#1a1a1a] border border-[#222222] hover:border-[#333333] text-slate-300 hover:text-white rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#111111]/50"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Hero Image */}
      <motion.div 
        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden mb-20 shadow-2xl border border-[#222222]/50 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover brightness-105 hover:brightness-110 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#111111] flex items-center justify-center">
            <div className="text-center space-y-3 p-12">
              <div className="w-24 h-24 bg-[#222222]/50 rounded-2xl flex items-center justify-center mx-auto border border-[#333333]">
                <Code className="w-12 h-12 text-slate-500" />
              </div>
              <p className="text-slate-400 text-lg font-medium">Project Preview</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Project Header */}
        <motion.header 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {project.title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {project.description}
          </motion.p>
        </motion.header>

        {/* Details Grid */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Technologies */}
          <motion.section 
            className="bg-[#111111]/80 backdrop-blur-sm rounded-3xl p-10 border border-[#222222]/70 hover:border-[#333333]/80 transition-all duration-500"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-black text-white mb-8 flex items-center gap-3">
              <Code className="w-8 h-8 text-indigo-400" />
              Technologies
            </h2>
            <div className="flex flex-wrap gap-4">
              {project.technologies?.map((tech: string, i: number) => (
                <motion.span
                  key={tech}
                  className="px-6 py-3 bg-[#1a1a1a]/70 hover:bg-[#222222]/90 border border-[#2a2a2a]/80 hover:border-[#333333] text-lg font-bold text-slate-200 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#111111]/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* Links */}
          <motion.section 
            className="bg-[#111111]/80 backdrop-blur-sm rounded-3xl p-10 border border-[#222222]/70 hover:border-[#333333]/80 transition-all duration-500"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-black text-white mb-12 flex items-center gap-3">
              <ExternalLink className="w-8 h-8 text-indigo-400" />
              Live Preview
            </h2>
            <div className="space-y-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block w-full text-center px-10 py-6 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 hover:from-indigo-500 hover:to-purple-500 border border-indigo-500/50 backdrop-blur-sm text-xl font-bold text-white rounded-3xl transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300">
                    Visit Live Site
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block w-full text-center px-10 py-6 bg-[#1a1a1a]/90 hover:bg-[#222222] border border-[#333333] backdrop-blur-sm text-xl font-bold text-white rounded-3xl transition-all duration-500 hover:shadow-xl hover:shadow-[#111111]/50 hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300">
                    View Source Code
                    <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              )}
            </div>
          </motion.section>
        </div>

        <div className="h-32" />
      </div>
    </article>
    </section>
  )
}
