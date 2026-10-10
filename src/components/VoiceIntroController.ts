// Web Speech Synthesis Controller for Muhammad Talha Anjum's Voice Intro
// Configured with a deeper, heavier baritone masculine voice profile

export const INTRO_SCRIPT =
  "Hi, I'm Muhammad Talha Anjum, an Artificial Intelligence student and AI & Full-Stack Developer from Pakistan. I specialize in building practical intelligent applications with Python and the Gemini API, full-stack web platforms using React, Next.js, and PostgreSQL, and driving digital growth through targeted Meta Ads. Explore my work below, or let's connect to build something intelligent."

export class VoiceIntroManager {
  private utterance: SpeechSynthesisUtterance | null = null
  private isSpeaking = false
  private isPaused = false
  private isMuted = false
  private onStateChange: ((state: { isSpeaking: boolean; isPaused: boolean; progressText?: string }) => void) | null = null

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

    // Search for deeper male voices across platforms
    const maleNames = ['Daniel', 'Arthur', 'Aaron', 'Fred', 'George', 'Google UK English Male', 'en-GB', 'en-US']
    for (const name of maleNames) {
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

    // Heavy, deep pitch configuration
    this.utterance.pitch = 0.74 // Lowered pitch for a heavier, deeper resonance
    this.utterance.rate = 0.95  // Confident, paced speaking cadence
    this.utterance.volume = this.isMuted ? 0 : 1.0

    this.utterance.onstart = () => {
      this.isSpeaking = true
      this.isPaused = false
      this.notify()
    }

    this.utterance.onend = () => {
      this.isSpeaking = false
      this.isPaused = false
      this.notify()
    }

    this.utterance.onerror = () => {
      this.isSpeaking = false
      this.isPaused = false
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
    this.notify()
  }

  public stop() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    this.isSpeaking = false
    this.isPaused = false
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
        progressText: progressText || (this.isSpeaking ? INTRO_SCRIPT : undefined)
      })
    }
  }
}

export const voiceIntroManager = new VoiceIntroManager()
