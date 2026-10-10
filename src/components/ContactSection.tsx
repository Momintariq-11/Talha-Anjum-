import React, { useState } from 'react'
import { Mail, Phone, Send, Copy, Check, MessageSquare, MapPin, ExternalLink } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'
import { GithubIcon } from './Icons'

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const [clientName, setClientName] = useState('')
  const [projectType, setProjectType] = useState('AI Development')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contact.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contact.phone)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(`Project Inquiry: ${projectType} - from ${clientName || 'Collaborator'}`)
    const body = encodeURIComponent(
      `Hello Talha,\n\nMy name is ${clientName || '[Your Name]'}.\n\nI am reaching out regarding a project in: ${projectType}.\n\nDetails:\n${message || 'I would like to discuss working together.'}\n\nLooking forward to speaking with you!`
    )

    window.open(`mailto:${PERSONAL_INFO.contact.email}?subject=${subject}&body=${body}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Talha! I came across your portfolio. I'm interested in working with you on ${projectType}. ${message ? `Note: "${message}"` : ''}`
    )
    window.open(`https://wa.me/923106505299?text=${text}`, '_blank')
  }

  return (
    <section id="contact" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-400 bg-white/5 border border-white/10 uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Have an Idea? Let’s Build Something Intelligent.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            I'm available for remote and freelance opportunities. Tell me what you want to build and let's turn it into a working product.
          </p>
        </div>

        {/* 2-Column Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl p-6 bg-[#0d1117] border border-white/10">
              <h3 className="text-base font-bold text-white mb-1">
                Direct Contact
              </h3>
              <p className="text-xs font-mono text-zinc-500 mb-5">
                Response within 24 hours
              </p>

              <div className="space-y-3">
                {/* Email Direct */}
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block">Email</span>
                      <a
                        href={`mailto:${PERSONAL_INFO.contact.email}`}
                        className="text-xs sm:text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                      >
                        {PERSONAL_INFO.contact.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone / WhatsApp */}
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block">Phone / WhatsApp</span>
                      <a
                        href={PERSONAL_INFO.contact.phoneTel}
                        className="text-xs sm:text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                      >
                        {PERSONAL_INFO.contact.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* GitHub */}
                <div className="p-3.5 rounded-lg bg-black/40 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block">GitHub</span>
                      <a
                        href={PERSONAL_INFO.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                      >
                        github.com/maliktalha2006
                      </a>
                    </div>
                  </div>
                  <a
                    href={PERSONAL_INFO.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] grid grid-cols-3 gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="py-2 text-center rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs transition-colors"
                >
                  Email
                </a>
                <a
                  href={PERSONAL_INFO.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 text-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href={PERSONAL_INFO.contact.phoneTel}
                  className="py-2 text-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-colors"
                >
                  Call / WA
                </a>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-[#0d1117] border border-white/10 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {PERSONAL_INFO.education.location}
              </span>
              <span className="text-emerald-400 font-semibold">
                {PERSONAL_INFO.availability}
              </span>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl p-6 sm:p-7 bg-[#0d1117] border border-white/10">
              <h3 className="text-base font-bold text-white mb-4">
                Send a Message
              </h3>

              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Focus Area
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      'AI Development',
                      'Full-Stack Web',
                      'Meta Ads & Growth',
                      'Consultation'
                    ].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`p-2 rounded-lg text-xs font-mono text-center transition-colors border ${
                          projectType === type
                            ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                            : 'bg-black/30 text-zinc-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your goals, requirements, or timeline..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send via Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2 border border-white/15"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct</span>
                  </button>
                </div>

                {submitted && (
                  <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center">
                    Email draft launched! Check your email client to send.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
