// Web Speech Synthesis Controller for Muhammad Talha Anjum's Voice Intro
// Configured with a single bold, deep masculine baritone voice and exact introduction gestures

export const INTRO_SCRIPT =
  "Hello, I am Muhammad Talha Anjum, an Artificial Intelligence student and Full-Stack Developer from Pakistan. I specialize in building practical intelligent applications with Python and the Gemini API, full-stack web platforms using Next.js and PostgreSQL, and driving digital growth through targeted Meta Ads. Explore my work below, or let's connect to build something impactful."

export type AvatarGesture = 'waving' | 'hand-on-chest' | 'statue'

export interface VoiceState {
  isSpeaking: boolean
  isPaused: boolean
  gesture: AvatarGesture
  typedText: string
  isComplete: boolean
}

// Global reference to defeat Chrome's V8 garbage collection mid-speech
declare global {
  interface Window {
    __talhaActiveUtterance?: SpeechSynthesisUtterance | null
  }
}

export class VoiceIntroManager {
  private utterance: SpeechSynthesisUtterance | null = null
  private isSpeaking = false
  private isPaused = false
  private isMuted = false
  private gesture: AvatarGesture = 'statue'
  private typedText = ''
  private isComplete = false

  private gestureTimer1: number | null = null
  private gestureTimer2: number | null = null
  private typingTimer: number | null = null
  private resumeHeartbeatTimer: number | null = null
  private onStateChange: ((state: VoiceState) => void) | null = null

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices()
      }
    }
  }

  public setListener(listener: (state: VoiceState) => void) {
    this.onStateChange = listener
  }

  /**
   * Selects an authoritative, articulate MALE voice with deep baritone resonance.
   * Completely excludes all female voices.
   */
  public pickBestVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null
    const voices = window.speechSynthesis.getVoices()
    if (!voices || !voices.length) return null

    const femaleNames = [
      'samantha', 'victoria', 'karen', 'tessa', 'moira', 'fiona', 'veena',
      'zira', 'jenny', 'aria', 'sara', 'ava', 'emma', 'sonia', 'zoe',
      'female', 'woman', 'girl', 'kathy', 'flo', 'grandma', 'shelley', 'sandy',
      'allison', 'susan', 'cynthia', 'hazel', 'catherine', 'helena', 'kate', 'laura'
    ]

    const isFemale = (v: SpeechSynthesisVoice): boolean => {
      const lower = (v.name + ' ' + (v.lang || '')).toLowerCase()
      return femaleNames.some((female) => lower.includes(female))
    }

    // Prioritized bold masculine voices (known for deep resonance and clarity)
    const boldMaleKeywords = [
      'Daniel',                  // macOS UK Male (natural deep baritone)
      'Google UK English Male',  // Chrome UK Male
      'Alex',                    // macOS Classic Male
      'Fred',                    // macOS Deep US Male
      'Eddy',                    // macOS US/UK Male
      'Google US English Male',  // Chrome US Male
      'Microsoft David',         // Windows Male
      'Microsoft Mark',          // Windows Male
      'Microsoft Guy',           // Windows Male
      'Rishi',                   // English India Male
      'Aman',                    // English India Male
      'Male'
    ]

    for (const kw of boldMaleKeywords) {
      const match = voices.find(
        (v) => !isFemale(v) && v.name.toLowerCase().includes(kw.toLowerCase()) && v.lang.startsWith('en')
      )
      if (match) return match
    }

    const anyEnglishMale = voices.find((v) => v.lang.startsWith('en') && !isFemale(v))
    if (anyEnglishMale) return anyEnglishMale

    const anyNonFemale = voices.find((v) => !isFemale(v))
    if (anyNonFemale) return anyNonFemale

    return voices[0]
  }

  public play() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    // Resume from paused state
    if (this.isPaused) {
      window.speechSynthesis.resume()
      this.isPaused = false
      this.isSpeaking = true
      this.startHeartbeat()
      this.notify()
      return
    }

    // Cancel any previous speech and reset queue
    window.speechSynthesis.cancel()
    window.speechSynthesis.resume()
    this.clearTimers()

    const utterance = new SpeechSynthesisUtterance(INTRO_SCRIPT)
    this.utterance = utterance
    window.__talhaActiveUtterance = utterance

    const voice = this.pickBestVoice()
    if (voice) {
      utterance.voice = voice
    }

    // BOLD & DEEP MASCULINE CONFIGURATION
    // Lower pitch creates rich, deep baritone authority without losing articulation
    utterance.pitch = 0.84 // Deep, resonant masculine baritone
    utterance.rate = 0.95  // Steady, confident, articulate cadence
    utterance.volume = this.isMuted ? 0 : 1.0

    // Progressive Word-by-Word Typing initialization
    const words = INTRO_SCRIPT.split(' ')
    let currentWordIndex = 0
    this.typedText = ''
    this.isComplete = false

    utterance.onstart = () => {
      this.isSpeaking = true
      this.isPaused = false
      this.isComplete = false

      // Gesture 1: On "Hello", he waves his hand
      this.gesture = 'waving'
      this.typedText = words[0] || 'Hello,'
      this.notify()

      // Gesture 2: On "I am Muhammad Talha Anjum", he places his hand on his chest
      this.gestureTimer1 = window.setTimeout(() => {
        if (this.isSpeaking) {
          this.gesture = 'hand-on-chest'
          this.notify()
        }
      }, 1600)

      // Gesture 3: Afterward, he settles into statue posture (hands clasped in front)
      this.gestureTimer2 = window.setTimeout(() => {
        if (this.isSpeaking) {
          this.gesture = 'statue'
          this.notify()
        }
      }, 4800)

      // Progressive typing engine synchronized with speech
      // Types smoothly word-by-word at speech cadence (~3.2 words per second)
      this.typingTimer = window.setInterval(() => {
        if (this.isSpeaking && !this.isPaused) {
          if (currentWordIndex < words.length) {
            currentWordIndex += 1
            this.typedText = words.slice(0, currentWordIndex).join(' ')
            this.notify()
          } else {
            if (this.typingTimer) window.clearInterval(this.typingTimer)
          }
        }
      }, 290)

      this.startHeartbeat()
    }

    utterance.onboundary = (e) => {
      // Sync exact boundary index if available
      if (e.charIndex !== undefined && e.charIndex > 0) {
        const textUpToChar = INTRO_SCRIPT.slice(0, e.charIndex + (e.charLength || 6))
        if (textUpToChar.length > this.typedText.length) {
          this.typedText = textUpToChar
          this.notify()
        }
      }
    }

    utterance.onend = () => {
      this.finishSpeech()
    }

    utterance.onerror = () => {
      this.finishSpeech()
    }

    window.speechSynthesis.speak(utterance)
    this.isSpeaking = true
    this.isPaused = false
    this.notify()

    // Safety watchdog for Chrome queue resume
    setTimeout(() => {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume()
      }
    }, 150)
  }

  public pause() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.pause()
    this.isPaused = true
    this.isSpeaking = false
    this.gesture = 'statue'
    this.stopHeartbeat()
    this.notify()
  }

  public stop() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    this.finishSpeech()
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

  private startHeartbeat() {
    this.stopHeartbeat()
    this.resumeHeartbeatTimer = window.setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && this.isSpeaking) {
        window.speechSynthesis.resume()
      }
    }, 4000)
  }

  private stopHeartbeat() {
    if (this.resumeHeartbeatTimer) {
      window.clearInterval(this.resumeHeartbeatTimer)
      this.resumeHeartbeatTimer = null
    }
  }

  private clearTimers() {
    if (this.gestureTimer1) window.clearTimeout(this.gestureTimer1)
    if (this.gestureTimer2) window.clearTimeout(this.gestureTimer2)
    if (this.typingTimer) window.clearInterval(this.typingTimer)
    this.gestureTimer1 = null
    this.gestureTimer2 = null
    this.typingTimer = null
    this.stopHeartbeat()
  }

  private finishSpeech() {
    this.isSpeaking = false
    this.isPaused = false
    this.gesture = 'statue'
    this.typedText = INTRO_SCRIPT
    this.isComplete = true
    this.clearTimers()
    window.__talhaActiveUtterance = null
    this.notify()
  }

  private notify() {
    if (this.onStateChange) {
      this.onStateChange({
        isSpeaking: this.isSpeaking,
        isPaused: this.isPaused,
        gesture: this.gesture,
        typedText: this.typedText,
        isComplete: this.isComplete
      })
    }
  }
}

export const voiceIntroManager = new VoiceIntroManager()
