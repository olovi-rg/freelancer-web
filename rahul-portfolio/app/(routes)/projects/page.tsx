'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { client } from '@/app/lib/sanity.client'
import { PROJECTS_QUERY } from '@/app/lib/sanity.queries'
import Image from 'next/image'
import { ArrowRight, Code, ExternalLink } from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(PROJECTS_QUERY)
        setProjects(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <section className='bg-slate-950'>
    <div className="min-h-screen  py-28 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-24 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-6 leading-tight">
          Projects Portfolio
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Production-grade web applications and digital experiences for modern businesses
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/projects/${project.slug.current}`} className="block h-full">
              <div className="h-full bg-slate-900/80 backdrop-blur-sm border border-slate-800/70 rounded-3xl p-8 hover:border-slate-600/80 hover:bg-slate-900/90 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-900/30 group-hover:-translate-y-2">
                {/* Image */}
                <div className="relative mb-8 rounded-2xl overflow-hidden h-48 md:h-56 bg-slate-800/60 border border-slate-700/70 hover:border-slate-600/80 transition-all duration-500 group-hover:shadow-lg">
                  {project.imageUrl ? (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800/80 to-slate-900/60">
                      <Code className="w-16 h-16 text-slate-500" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Tech Stack */}
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-slate-800/70 border border-slate-700/80 text-xs font-mono tracking-wider text-slate-300 rounded-lg hover:bg-slate-700/90 hover:border-slate-600 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight hover:text-slate-100 transition-colors group-hover:text-white line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed line-clamp-3">
                    {project.description || 'Modern web application with responsive design and optimal performance.'}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-800/50 mt-4">
                    <span className="text-sm text-slate-500 font-medium">View Details</span>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-32 pt-24 border-t border-slate-800/50">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 px-10 py-5 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-lg font-semibold text-white rounded-2xl transition-all duration-400 hover:shadow-2xl hover:shadow-slate-900/50"
        >
          <span>View All Work</span>
          <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
    </section>
  )
}
