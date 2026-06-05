'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/95 backdrop-blur-xl py-3 border-b border-slate-800/50' 
        : 'bg-transparent/80 py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
          RAHUL
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 items-center">
          <Link href="/projects" className="text-lg font-semibold text-slate-300 hover:text-indigo-400 transition-all duration-300 hover:underline underline-offset-4">
            Projects
          </Link>
          <Link href="/blog" className="text-lg font-semibold text-slate-300 hover:text-indigo-400 transition-all duration-300 hover:underline underline-offset-4">
            Blog
          </Link>
          <Link href="/contact" className="text-lg font-semibold text-slate-300 hover:text-indigo-400 transition-all duration-300 hover:underline underline-offset-4">
            Contact
          </Link>
          <Link 
            href="/contact" 
            className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:-translate-y-0.5 border border-indigo-500/30"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-slate-300" />
          ) : (
            <Menu className="w-6 h-6 text-slate-300" />
          )}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/50 lg:hidden">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-4">
              <Link 
                href="#projects" 
                className="text-xl font-semibold text-slate-200 py-3 px-4 rounded-xl hover:bg-slate-800/50 hover:text-indigo-400 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                href="#blog" 
                className="text-xl font-semibold text-slate-200 py-3 px-4 rounded-xl hover:bg-slate-800/50 hover:text-indigo-400 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="#contact" 
                className="text-xl font-semibold text-slate-200 py-3 px-4 rounded-xl hover:bg-slate-800/50 hover:text-indigo-400 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/contact"
                className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-bold text-lg mt-2 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:-translate-y-0.5 border border-indigo-500/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hire Me
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
