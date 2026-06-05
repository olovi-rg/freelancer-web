'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BookOpen, Calendar, ChevronRight, Search, ArrowLeft, Tag } from 'lucide-react'
import { client } from '@/app/lib/sanity.client'

// ✅ FIXED: No dateFormat() - Format date in React
const POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) [0...12]{
  _id, 
  title, 
  slug, 
  excerpt, 
  "imageUrl": image.asset->url, 
  publishedAt,
  readTime,
  category
}`

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  imageUrl?: string
  publishedAt: string
  readTime?: string
  category?: string
}

// ✅ Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch<BlogPost[]>(POSTS_QUERY)
        console.log('🔍 Blog page posts:', data)
        setPosts(data)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setPosts(demoPosts)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Demo fallback posts
  const demoPosts: BlogPost[] = [
    {
      _id: '1',
      title: "Next.js 16 App Router Deep Dive",
      excerpt: "Mastering Server Components, Partial Pre-rendering, and streaming architecture.",
      publishedAt: "2026-01-29T00:00:00Z",
      readTime: "8 min read",
      category: "Next.js",
      slug: { current: "nextjs-16-app-router" },
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
    },
    {
      _id: '2',
      title: "Sanity CMS + Next.js Production Setup",
      excerpt: "Complete guide to GROQ queries, webhooks, revalidation, and ISR for blogs.",
      publishedAt: "2026-01-25T00:00:00Z",
      readTime: "12 min read",
      category: "CMS",
      slug: { current: "sanity-nextjs-production" },
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
    },
    {
      _id: '3',
      title: "Core Web Vitals Optimization Guide",
      excerpt: "Achieving perfect 100 Lighthouse scores with Next.js, Tailwind, and React optimization.",
      publishedAt: "2026-01-20T00:00:00Z",
      readTime: "6 min read",
      category: "Performance",
      slug: { current: "core-web-vitals-guide" },
      imageUrl: "https://images.unsplash.com/photo-1504868584819-f8eec0b21750?auto=format&fit=crop&q=80&w=800"
    },
    {
      _id: '4',
      title: "Building Headless WordPress with Next.js",
      excerpt: "Decouple your WordPress backend from frontend with REST API and React.",
      publishedAt: "2026-01-15T00:00:00Z",
      readTime: "10 min read",
      category: "WordPress",
      slug: { current: "headless-wordpress-nextjs" },
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
    },
    {
      _id: '5',
      title: "TypeScript Best Practices for React",
      excerpt: "Level up your React skills with advanced TypeScript patterns and techniques.",
      publishedAt: "2026-01-10T00:00:00Z",
      readTime: "7 min read",
      category: "TypeScript",
      slug: { current: "typescript-react-best-practices" },
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
    },
    {
      _id: '6',
      title: "SEO Optimization for SPA Applications",
      excerpt: "How to implement SSR, dynamic sitemaps, and schema markup for React apps.",
      publishedAt: "2026-01-05T00:00:00Z",
      readTime: "9 min read",
      category: "SEO",
      slug: { current: "seo-spa-applications" },
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    }
  ]

  const displayPosts = posts.length > 0 ? posts : demoPosts

  const filteredPosts = displayPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <section className="min-h-screen py-32 bg-gradient-to-b from-[#020617] to-slate-950 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          <motion.p 
            className="text-xl text-slate-400 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Loading articles...
          </motion.p>
        </motion.div>
      </section>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-[#020617] to-slate-950 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/8 blur-[80px] rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-[500px] h-[300px] bg-cyan-500/6 blur-[60px] rounded-full animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-500/10 border-2 border-indigo-500/30 backdrop-blur-sm mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="relative flex h-3 w-3 animate-pulse"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
              </motion.span>
              <span className="text-indigo-300 font-bold uppercase tracking-wider text-sm">
                {filteredPosts.length} Articles
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Engineering <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl">Insights</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-slate-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Deep dives into Next.js, React, TypeScript, SEO, and modern web development best practices.
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-slate-900/60 border-2 border-slate-800/50 rounded-2xl text-white placeholder-slate-500 focus:border-indigo-500/50 focus:outline-none transition-all duration-300 "
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 bg-gradient-to-b bg-[#0E1628] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {filteredPosts.length === 0 ? (
            <motion.div 
              className="text-center py-24 space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BookOpen className="w-16 h-16 mx-auto text-slate-600" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-slate-400">Try adjusting your search query</p>
              </div>
              <motion.button 
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear search
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredPosts.map((post: BlogPost, idx: number) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Link 
                    href={`/blog/${post.slug?.current || post._id}`}
                    className="group cursor-pointer bg-slate-950/50 backdrop-blur-sm rounded-3xl border border-slate-800/50 hover:border-slate-700/80 block h-full hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 overflow-hidden transition-all duration-500"
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
                        className="absolute top-6 left-6 z-20 px-3 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-800/50 text-xs font-bold uppercase tracking-wider text-indigo-400 shadow-lg flex items-center gap-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + 0.3 }}
                      >
                        <Tag className="w-3 h-3" />
                        {post.category || 'Development'}
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 space-y-4">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span>{post.readTime || '5 min read'}</span>
                      </div>
                      
                      {/* Title */}
                      <motion.h3 
                        className="text-2xl font-bold text-white leading-snug line-clamp-2 group-hover:text-indigo-400 transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 + 0.5 }}
                      >
                        {post.title}
                      </motion.h3>
                      
                      {/* Excerpt */}
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      {/* Read More */}
                      <motion.div 
                        className="pt-4 flex items-center gap-2 text-indigo-400 font-bold text-sm opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 + 0.7 }}
                      >
                        Read article
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="py-16 bg-gradient-to-b from-[#020617] to-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900/50 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/50 text-white rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
