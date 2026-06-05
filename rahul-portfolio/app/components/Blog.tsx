'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, ArrowUpRight, Calendar, ChevronRight } from 'lucide-react'
import { client } from '@/app/lib/sanity.client'
import { POSTS_QUERY } from '@/app/lib/sanity.queries' // ✅ Optional - fallback works


// ✅ TypeScript Interface
interface BlogPost {
  _id?: string
  title: string
  excerpt?: string
  description?: string
  slug: { current: string }
  publishedAt?: string
  readTime?: string
  category?: string
  imageUrl?: string
  date?: string
}
// ✅ Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ✅ Try Sanity first
        const data = await client.fetch<BlogPost[]>(POSTS_QUERY || '*[_type == "post"] | order(_createdAt desc)[0...3]')
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
        // ✅ Fallback demo posts
        setPosts(demoPosts)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-[#020617] to-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4" />
          <p className="text-slate-400">Loading latest insights...</p>
        </div>
      </section>
    )
  }

  // ✅ Demo fallback posts
  const demoPosts: BlogPost[] = [
    {
      title: "Next.js 16 App Router Deep Dive",
      excerpt: "Mastering Server Components, PPR, and the new streaming architecture.",
      date: "Jan 25, 2026",
      readTime: "8 min read",
      category: "Next.js",
      slug: { current: "nextjs-16-app-router" },
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Sanity CMS + Next.js Production Setup",
      excerpt: "Complete guide to GROQ queries, webhooks, and ISR for blogs & e-commerce.",
      date: "Jan 20, 2026", 
      readTime: "12 min read",
      category: "CMS",
      slug: { current: "sanity-nextjs-production" },
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Core Web Vitals Optimization Guide",
      excerpt: "Achieving perfect Lighthouse scores with Next.js and Tailwind CSS.",
      date: "Jan 15, 2026",
      readTime: "6 min read",
      category: "Performance",
      slug: { current: "core-web-vitals-guide" },
      imageUrl: "https://images.unsplash.com/photo-1504868584819-f8eec0b21750?auto=format&fit=crop&q=80&w=800"
    }
  ]

  return (
    <section id="insights" className="py-24 relative bg-gradient-to-b from-[#0E1629] to-slate-950 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-indigo-600/8 blur-[60px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[300px] h-[200px] bg-cyan-500/6 blur-[50px] rounded-full animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-2xl">
            <motion.h2 
              className="text-indigo-500 font-mono text-sm mb-3 tracking-widest uppercase flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="w-4 h-4" /> Engineering Insights
            </motion.h2>
            <motion.h3 
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Latest from the Journal
            </motion.h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/blog" 
              className="group flex items-center gap-2 text-lg font-bold text-slate-400 hover:text-white transition-all hover:underline"
            >
              Read all articles 
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          {posts.map((post: BlogPost, idx: number) => (
         <Link key={post._id} href={`/blog/${post.slug.current}`} className="block">

            <motion.article
              key={post._id || idx}
              className="group cursor-pointer bg-slate-950/50 backdrop-blur-sm rounded-3xl border border-slate-800/50 hover:border-slate-700/80 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Featured Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/5 transition-all duration-500 z-10" />
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-100 group-hover:brightness-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-slate-600" />
                  </div>
                )}
                
                {/* Category Badge */}
                <motion.div 
                  className="absolute top-6 left-6 z-20 px-3 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-800/50 text-xs font-bold uppercase tracking-wider text-indigo-400 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                >
                  {post.category || 'Development'}
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.publishedAt ? formatDate(post.publishedAt) : 'New'}                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span>{post.readTime || '5 min read'}</span>
                </div>
                
                {/* Title */}
                <motion.h4 
                  className="text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:text-indigo-400 transition-all duration-500"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                >
                  {post.title}
                </motion.h4>
                
                {/* Excerpt */}
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt || post.description || 'Explore the latest insights on modern web development.'}
                </p>
                
                {/* Read More */}
                <motion.div 
                  className="pt-4 flex items-center gap-2 text-indigo-400 font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.7 }}
                >
                  Read full article 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </div>
            </motion.article>
            </Link>
          ))}
          
        </motion.div>
      </div>
    </section>
  )
}
