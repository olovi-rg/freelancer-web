'use client'
import React, { useState, useRef } from 'react'
import { 
  ArrowRight, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Calendar,
  CheckCircle2,
  Phone
} from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type FormState = 'idle' | 'sending' | 'success'

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '' 
  })
  const [formState, setFormState] = useState<FormState>('idle')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('sending')
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setFormState('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setFormState('idle'), 5000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-28 bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Content & Socials */}
          <div className="space-y-12">
            <header className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Available for new projects
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Let's build <br /> 
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">something great.</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                I help brands and startups build high-performance web applications with a focus on motion and user experience.
              </p>
            </header>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Email me at</p>
                  <p className="font-medium cursor-pointer hover:text-indigo-400 transition-colors" onClick={() => window.location.href='mailto:hello@freelancer.design'}>
                    hello@freelancer.design
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Phone</p>
                  <p className="font-medium">+91 9876543210</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                  <p className="font-medium">Hyderabad, Telangana</p>
                </div>
              </div>
            </div>

            {/* Social Links using Magnetic Interaction */}
            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:bg-slate-800/50 shadow-lg hover:shadow-xl">
                  <Github className="w-4 h-4" /> <span className="text-sm font-medium">GitHub</span>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:bg-slate-800/50 shadow-lg hover:shadow-xl">
                  <Linkedin className="w-4 h-4" /> <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-600 transition-all duration-300 hover:bg-slate-800/50 shadow-lg hover:shadow-xl">
                  <Twitter className="w-4 h-4" /> <span className="text-sm font-medium">Twitter</span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-2xl rounded-[2rem] -z-10 animate-pulse" />
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl">
              {formState === 'success' ? (
                <div className="py-20 text-center space-y-6">
                  <div className="inline-flex items-center justify-center p-6 rounded-full bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-500 mx-auto w-24 h-24">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                  <p className="text-xl text-slate-300 max-w-md mx-auto leading-relaxed">Thanks for reaching out! I'll get back to you within 24 hours.</p>
                  <button 
                    onClick={() => {
                      setFormState('idle')
                      setLoading(false)
                    }}
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600/80 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    Send Another Message
                    <ArrowRight className="w-4 h-4 transition-transform hover:translate-x-1" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                        placeholder="Rahul"
                        className="w-full h-14 bg-slate-950/50 border border-slate-800 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 text-white placeholder:text-slate-600 shadow-sm hover:shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                        placeholder="rahul@example.com"
                        className="w-full h-14 bg-slate-950/50 border border-slate-800 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 text-white placeholder:text-slate-600 shadow-sm hover:shadow-md"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Subject</label>
                    <select 
                      value={formData.subject}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, subject: e.target.value})}
                      className="w-full h-14 bg-slate-950/50 border border-slate-800 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 text-white appearance-none shadow-sm hover:shadow-md"
                    >
                      <option value="" className="bg-slate-900">Select a subject</option>
                      <option value="New Project" className="bg-slate-900">New Project</option>
                      <option value="Consultation" className="bg-slate-900">Consultation</option>
                      <option value="Collaboration" className="bg-slate-900">Collaboration</option>
                      <option value="General Inquiry" className="bg-slate-900">General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell me about your project..."
                      className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 text-white placeholder:text-slate-600 resize-vertical shadow-sm hover:shadow-md"
                    />
                  </div>

                  {/* Shimmer Submit Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="group relative w-full h-16 items-center justify-center overflow-hidden rounded-2xl bg-indigo-600 px-8 font-bold text-white transition-all duration-300 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                      {loading ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" /></>
                      )}
                    </span>
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                      <div className="relative h-full w-16 bg-white/20" />
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * MagneticButton Wrapper Component - FULLY TYPED
 */
interface MagneticButtonProps {
  children: React.ReactNode
}

const MagneticButton = ({ children }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const { clientX, clientY } = e
    const x = clientX - (rect.left + rect.width / 2)
    const y = clientY - (rect.top + rect.height / 2)
    setPosition({ x: x * 0.35, y: y * 0.35 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
      className="inline-block"
    >
      {children}
    </div>
  )
}

export default ContactPage
