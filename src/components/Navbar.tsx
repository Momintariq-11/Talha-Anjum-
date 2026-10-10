import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { PERSONAL_INFO } from '../data/portfolioData'
import { GithubIcon } from './Icons'

interface NavbarProps {
  brandMode?: 'personal' | 'solvix'
  onBrandModeChange?: (mode: 'personal' | 'solvix') => void
}

export const Navbar: React.FC<NavbarProps> = ({
  brandMode = 'personal',
  onBrandModeChange
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['home', 'about', 'skills', 'marketing', 'projects', 'contact']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: brandMode === 'solvix' ? 'Services' : 'About', href: '#about', id: 'about' },
    { label: brandMode === 'solvix' ? 'Toolkit' : 'Skills', href: '#skills', id: 'skills' },
    { label: 'Marketing', href: '#marketing', id: 'marketing' },
    { label: brandMode === 'solvix' ? 'Case Studies' : 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ]

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#08090d]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          onClick={() => handleLinkClick('#home')}
          className="group flex items-center gap-3 select-none"
        >
          {brandMode === 'solvix' ? (
            <div className="flex flex-col">
              <div className="font-gotham font-black text-2xl tracking-tight text-white group-hover:text-emerald-300 transition-colors flex items-center">
                <span>Solviq</span>
                <span className="text-emerald-400">x</span>
              </div>
              <span className="font-gotham text-[10px] tracking-wide text-zinc-400 font-medium -mt-1">
                Your Vision, Our Digital Expertise
              </span>
            </div>
          ) : (
            <>
              <div className="w-8 h-8 rounded-lg bg-[#0d1117] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-white group-hover:border-emerald-500 transition-colors">
                TA
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Muhammad Talha Anjum
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  AI & Full-Stack Developer
                </span>
              </div>
            </>
          )}
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0d1117] px-3 py-1 rounded-full border border-white/10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick(link.href)
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-white/10 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Brand Switcher Pill */}
          {onBrandModeChange && (
            <div className="flex items-center p-0.5 rounded-lg bg-[#0d1117] border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => onBrandModeChange('personal')}
                className={`px-2.5 py-1 rounded-md transition-all font-mono ${
                  brandMode === 'personal'
                    ? 'bg-emerald-500 text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Personal
              </button>
              <button
                type="button"
                onClick={() => onBrandModeChange('solvix')}
                className={`px-2.5 py-1 rounded-md transition-all font-gotham font-bold ${
                  brandMode === 'solvix'
                    ? 'bg-emerald-500 text-black font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Solviqx
              </button>
            </div>
          )}

          {/* GitHub Link */}
          <a
            href={PERSONAL_INFO.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#0d1117] border border-white/10 text-zinc-300 hover:text-white transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick('#contact')
            }}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs tracking-wide transition-colors"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0d1117] border border-white/10 text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08090d] border-b border-white/10 px-6 py-5">
          <div className="flex flex-col gap-3 font-mono text-sm">
            {onBrandModeChange && (
              <div className="pb-3 border-b border-white/10 flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono">View Mode:</span>
                <div className="flex items-center p-0.5 rounded-lg bg-white/5 border border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      onBrandModeChange('personal')
                      setMobileMenuOpen(false)
                    }}
                    className={`px-3 py-1 rounded-md transition-all font-mono ${
                      brandMode === 'personal'
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'text-zinc-400'
                    }`}
                  >
                    Personal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onBrandModeChange('solvix')
                      setMobileMenuOpen(false)
                    }}
                    className={`px-3 py-1 rounded-md transition-all font-gotham font-bold ${
                      brandMode === 'solvix'
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'text-zinc-400'
                    }`}
                  >
                    Solviqx
                  </button>
                </div>
              </div>
            )}
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick(link.href)
                }}
                className="text-zinc-300 hover:text-white py-1 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 flex items-center gap-3">
              <a
                href={PERSONAL_INFO.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center rounded-lg bg-white/5 border border-white/10 text-white text-xs font-semibold"
              >
                GitHub
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick('#contact')
                }}
                className="flex-1 py-2 text-center rounded-lg bg-emerald-500 text-black text-xs font-bold"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
