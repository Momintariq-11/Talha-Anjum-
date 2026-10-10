// Web Speech Synthesis Controller for Muhammad Talha Anjum's Voice Intro
// Configured with a deeper, heavier baritone masculine voice profile

export const INTRO_SCRIPT =
  "Hello, I am Muhammad Talha Anjum, an Artificial Intelligence student and Full-Stack Developer from Pakistan. I specialize in building practical intelligent applications with Python and the Gemini API, full-stack web platforms using Next.js and PostgreSQL, and driving digital growth through targeted Meta Ads. Explore my work below, or let's connect to build something impactful."

export interface VoiceState {
  isSpeaking: boolean
  isPaused: boolean
  progressText?: string
  isGreeting?: boolean
}

export class VoiceIntroManager {
  private utterance: SpeechSynthesisUtterance | null = null
  private isSpeaking = false
  private isPaused = false
  private isMuted = false
  private isGreeting = false
  private greetingTimer: number | null = null
  private onStateChange: ((state: VoiceState) => void) | null = null

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }

  public setListener(listener: (state: { isSpeaking: boolean; isPaused: boolean; progressText?: string }) => void) {
    this.onStateChange = listener
  }

  private pickBestVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null
    const voices = window.speechSynthesis.getVoices()
    if (!voices.length) return null

    // Search for articulate, clear voices
    const preferredNames = ['Google US English', 'Samantha', 'Victoria', 'Karen', 'Daniel', 'Alex', 'en-US', 'en-GB']
    for (const name of preferredNames) {
      const match = voices.find((v) => v.name.includes(name) && v.lang.startsWith('en'))
      if (match) return match
    }

    return voices.find((v) => v.lang.startsWith('en')) || voices[0]
  }

  public play() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    if (this.isPaused) {
      window.speechSynthesis.resume()
      this.isPaused = false
      this.isSpeaking = true
      this.notify()
      return
    }

    window.speechSynthesis.cancel()

    this.utterance = new SpeechSynthesisUtterance(INTRO_SCRIPT)
    const voice = this.pickBestVoice()
    if (voice) {
      this.utterance.voice = voice
    }

    // High-tone voice configuration as requested
    this.utterance.pitch = 1.25 // Higher, brighter, clear tone
    this.utterance.rate = 1.02  // Articulate, natural cadence
    this.utterance.volume = this.isMuted ? 0 : 1.0

    this.utterance.onstart = () => {
      this.isSpeaking = true
      this.isPaused = false
      this.isGreeting = true
      this.notify()

      if (this.greetingTimer) window.clearTimeout(this.greetingTimer)
      this.greetingTimer = window.setTimeout(() => {
        this.isGreeting = false
        this.notify()
      }, 3600)
    }

    this.utterance.onend = () => {
      this.isSpeaking = false
      this.isPaused = false
      this.isGreeting = false
      if (this.greetingTimer) window.clearTimeout(this.greetingTimer)
      this.notify()
    }

    this.utterance.onerror = () => {
      this.isSpeaking = false
      this.isPaused = false
      this.isGreeting = false
      if (this.greetingTimer) window.clearTimeout(this.greetingTimer)
      this.notify()
    }

    this.utterance.onboundary = (e) => {
      if (e.charIndex !== undefined) {
        const spokenSoFar = INTRO_SCRIPT.slice(0, e.charIndex + (e.charLength || 10))
        this.notify(spokenSoFar)
      }
    }

    window.speechSynthesis.speak(this.utterance)
    this.isSpeaking = true
    this.isPaused = false
    this.notify()
  }

  public pause() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.pause()
    this.isPaused = true
    this.isSpeaking = false
    this.isGreeting = false
    if (this.greetingTimer) window.clearTimeout(this.greetingTimer)
    this.notify()
  }

  public stop() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    this.isSpeaking = false
    this.isPaused = false
    this.isGreeting = false
    if (this.greetingTimer) window.clearTimeout(this.greetingTimer)
    this.notify()
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted
    if (this.utterance) {
      this.utterance.volume = this.isMuted ? 0 : 1.0
    }
    if (this.isSpeaking) {
      this.stop()
      this.play()
    }
    return this.isMuted
  }

  private notify(progressText?: string) {
    if (this.onStateChange) {
      this.onStateChange({
        isSpeaking: this.isSpeaking,
        isPaused: this.isPaused,
        isGreeting: this.isGreeting,
        progressText: progressText || (this.isSpeaking ? INTRO_SCRIPT : undefined)
      })
    }
  }
}

export const voiceIntroManager = new VoiceIntroManager()
