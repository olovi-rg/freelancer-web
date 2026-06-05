'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag, BookOpen, ChevronLeft } from 'lucide-react'
import { client } from '@/app/lib/sanity.client'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  content: any[]
  excerpt: string
  imageUrl?: string
  author?: { name: string }
  publishedAt: string
  categories?: string[]
  readTime?: string
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ FIXED: Single effect that properly awaits params + fetches data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Unwrap params Promise directly
        const { slug } = await params
        
        console.log('Fetching post for slug:', slug) // Debug log
        
        const data = await client.fetch<BlogPost | null>(
          `*[_type == "blogPost" && slug.current == $slug][0]{
            _id,
            title,
            slug,
            content,
            excerpt,
            "imageUrl": image.asset->url,
            author->{
              name
            },
            publishedAt,
            categories,
            readTime
          }`,
          { slug }
        )
        
        console.log('Fetched post:', data) // Debug log
        
        setPost(data)
        
        if (!data) {
          setError('Post not found')
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        setError('Failed to load post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen py-32 bg-gradient-to-b from-[#020617] to-slate-950 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          <p className="text-xl text-slate-400 font-medium">Loading article...</p>
        </motion.div>
      </section>
    )
  }

  // Error state
  if (error || !post) {
    return (
      <section className="min-h-screen py-32 bg-gradient-to-b from-[#020617] to-slate-950 flex items-center justify-center">
        <motion.div 
          className="text-center space-y-8 max-w-md mx-auto px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-24 h-24 bg-slate-900/50 rounded-3xl flex items-center justify-center mx-auto border border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-600" />
          </div>
          <div className="space-y-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-black text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Post Not Found
            </motion.h1>
            <motion.p 
              className="text-xl text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {error || "The article you're looking for doesn't exist."}
            </motion.p>
          </div>
          <Link 
            href="/blog"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900/50 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/50 text-white rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </motion.div>
      </section>
    )
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-[#020617] to-slate-950 py-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/8 blur-[80px] rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-20 w-[400px] h-[300px] bg-cyan-500/6 blur-[60px] rounded-full animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link 
            href="/blog"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900/50 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Featured Image */}
        {post.imageUrl && (
          <motion.div 
            className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-16 shadow-2xl border border-slate-800/50 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover brightness-105 hover:brightness-110 transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </motion.div>
        )}

        {/* Article Header */}
        <motion.header 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            className="inline-flex items-center gap-6 text-sm text-slate-400 bg-slate-900/50 backdrop-blur-sm px-8 py-4 rounded-2xl border border-slate-800/50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            {post.readTime && (
              <>
                <span className="w-px h-4 bg-slate-700" />
                <span>{post.readTime}</span>
              </>
            )}
            {post.author?.name && (
              <>
                <span className="w-px h-4 bg-slate-700" />
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author.name}
                </span>
              </>
            )}
          </motion.div>
        </motion.header>

        {/* Excerpt */}
        {post.excerpt && (
          <motion.div 
            className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-500/30 backdrop-blur-sm rounded-3xl p-12 mb-20 shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <blockquote className="text-xl md:text-2xl text-slate-200 italic leading-relaxed max-w-3xl mx-auto">
              "{post.excerpt}"
            </blockquote>
          </motion.div>
        )}

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-3 mb-16 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {post.categories.map((category: string, idx: number) => (
              <motion.span
                key={category}
                className="px-4 py-2 bg-slate-900/50 hover:bg-indigo-600/20 border border-slate-800/50 hover:border-indigo-500/50 text-sm font-bold text-indigo-400 rounded-full transition-all duration-300 hover:shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {category}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Main Content */}
        <motion.section 
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-slate-950/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-800/50 shadow-2xl">
            {post.content && post.content.length > 0 ? (
              post.content.map((block: any, blockIndex: number) => (
                <div key={blockIndex} className="mb-12 last:mb-0">
                  {block.children?.map((child: any, childIndex: number) => {
                    if (child._type === 'span' && child.text) {
                      return (
                        <p key={childIndex} className="text-lg leading-relaxed text-slate-200 mb-8">
                          {child.text}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-700">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-6" />
                <motion.p 
                  className="text-2xl text-slate-400 font-medium"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  Content coming soon...
                </motion.p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Spacer */}
        <div className="h-24" />
      </div>
    </article>
  )
}
