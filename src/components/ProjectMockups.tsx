import React from 'react'
import { Utensils, Search, Bot, Briefcase, KeyRound, Mic, Database, Shield, Zap } from 'lucide-react'

export const ProjectMockup: React.FC<{ projectId: string }> = ({ projectId }) => {
  switch (projectId) {
    case 'zavio-pos':
      return (
        <div className="w-full h-40 rounded-lg bg-[#07090e] border border-white/10 p-3 font-mono text-[11px] flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Utensils className="w-3.5 h-3.5 text-blue-400" />
              <span>ZAVIO POS // TERMINAL</span>
            </div>
            <span className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              PostgreSQL
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-1">
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
              <span className="text-[9px] text-zinc-500 block">Table 04</span>
              <span className="text-white font-bold text-xs">$48.50</span>
              <span className="text-[9px] text-[#87834F] block">Active</span>
            </div>
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
              <span className="text-[9px] text-zinc-500 block">Table 07</span>
              <span className="text-white font-bold text-xs">$112.00</span>
              <span className="text-[9px] text-blue-400 block">Prep</span>
            </div>
            <div className="p-2 rounded bg-white/[0.03] border border-white/[0.05]">
              <span className="text-[9px] text-zinc-500 block">Items</span>
              <span className="text-white font-bold text-xs">94 SKU</span>
              <span className="text-[9px] text-zinc-400 block">Prisma</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/[0.08]">
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3 text-blue-400" /> Next.js App Router
            </span>
            <span className="text-zinc-300">Sync: Connected</span>
          </div>
        </div>
      )

    case 'pau-university-finder':
      return (
        <div className="w-full h-40 rounded-lg bg-[#07090e] border border-white/10 p-3 font-mono text-[11px] flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>PAU // DECISION ENGINE</span>
            </div>
            <span className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              Pakistan Search
            </span>
          </div>

          <div className="space-y-1.5 my-1 text-[10px]">
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">National University of Sciences & Tech</span>
                <span className="text-zinc-500">Merit: 82% • Scholarship Eligible</span>
              </div>
              <span className="text-[#87834F] font-bold">Match</span>
            </div>
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center justify-between">
              <span className="text-zinc-300">The University of Faisalabad</span>
              <span className="text-blue-400">AI / CS Focus</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/[0.08]">
            <span>Algorithm: Decision Tree</span>
            <span className="text-zinc-300">Indexed DB</span>
          </div>
        </div>
      )

    case 'custom-ai-chatbot':
      return (
        <div className="w-full h-40 rounded-lg bg-[#07090e] border border-white/10 p-3 font-mono text-[11px] flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Bot className="w-3.5 h-3.5 text-[#87834F]" />
              <span>GEMINI // CONTEXT STREAM</span>
            </div>
            <span className="text-[10px] text-blue-400 bg-blue-600/10 px-2 py-0.5 rounded border border-blue-500/20">
              Active Memory
            </span>
          </div>

          <div className="space-y-1 my-1 text-[10px]">
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.05] text-zinc-300">
              <span className="text-zinc-500 block text-[9px]">QUERY:</span>
              "Summarize the conversation state and return next steps."
            </div>
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.05] text-white">
              <span className="text-blue-400 block text-[9px]">GEMINI API:</span>
              "State loaded. Context vector parsed with memory continuity."
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/[0.08]">
            <span>Python Backend</span>
            <span className="text-zinc-300">Streaming Output</span>
          </div>
        </div>
      )

    case 'hire-orbit':
      return (
        <div className="w-full h-40 rounded-lg bg-[#07090e] border border-white/10 p-3 font-mono text-[11px] flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span>HIREORBIT // TALENT PIPELINE</span>
            </div>
            <span className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              Edge Live
            </span>
          </div>

          <div className="space-y-1.5 my-1 text-[10px]">
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">AI Engineer Role</span>
                <span className="text-zinc-500">Full-Time Remote</span>
              </div>
              <span className="text-[#87834F]">Reviewed</span>
            </div>
            <div className="p-1.5 rounded bg-white/[0.03] border border-white/[0.05] flex items-center justify-between">
              <span className="text-zinc-300">Full-Stack Application</span>
              <span className="text-blue-400">Verified</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/[0.08]">
            <span>Responsive Architecture</span>
            <span className="text-zinc-300">Vercel Edge</span>
          </div>
        </div>
      )

    case 'login-system':
      return (
        <div className="w-full h-40 rounded-lg bg-[#07090e] border border-white/10 p-3 font-mono text-[11px] flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <KeyRound className="w-3.5 h-3.5 text-white" />
              <span>AUTH GATEWAY // SESSION</span>
            </div>
            <span className="text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#87834F]" /> Hashed DB
            </span>
          </div>

          <div className="bg-black/60 rounded p-2 border border-white/[0.06] my-1 space-y-1 text-[10px]">
            <div className="flex justify-between">
              <span className="text-zinc-500">Hash:</span>
              <span className="text-zinc-300">bcrypt salted (rounds: 10)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Session:</span>
              <span className="text-blue-400">HttpOnly; Secure; SameSite</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/[0.08]">
            <span>Netlify Hosted</span>
            <span className="text-zinc-300">Verified DB Layer</span>
          </div>
        </div>
      )

    case 'ai-voice-call-trainer':
      return (
        <div className="w-full h-40 rounded-lg bg-[#07090e] border border-white/10 p-3 font-mono text-[11px] flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Mic className="w-3.5 h-3.5 text-blue-400" />
              <span>FASTAPI // VOICE ENGINE</span>
            </div>
            <span className="text-[10px] text-[#87834F] bg-white/5 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
              <Zap className="w-3 h-3" /> 42ms Latency
            </span>
          </div>

          <div className="my-1 space-y-1.5">
            <div className="flex items-center justify-between h-7 px-2 bg-black/60 rounded border border-white/[0.06] gap-1">
              {[30, 60, 25, 80, 50, 70, 40, 90, 65, 45, 75, 85, 55, 30, 80, 40].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-blue-500 rounded-full"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] px-1 text-zinc-500">
              <span>Dialogue Scoring: <b className="text-white">Active</b></span>
              <span>Async Engine</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/[0.08]">
            <span>Call Training Pipeline</span>
            <span className="text-zinc-300">FastAPI Async</span>
          </div>
        </div>
      )

    default:
      return null
  }
}
