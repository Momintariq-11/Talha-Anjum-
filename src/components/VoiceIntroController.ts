// Web Speech Synthesis Controller for Muhammad Talha Anjum's Voice Intro
// Configured STRICTLY for authentic, articulate MALE voice profile with anti-stall safeguards

export const INTRO_SCRIPT =
  "Hello, I am Muhammad Talha Anjum, an Artificial Intelligence student and Full-Stack Developer from Pakistan. I specialize in building practical intelligent applications with Python and the Gemini API, full-stack web platforms using Next.js and PostgreSQL, and driving digital growth through targeted Meta Ads. Explore my work below, or let's connect to build something impactful."

export interface VoiceState {
  isSpeaking: boolean
  isPaused: boolean
  progressText?: string
  isGreeting?: boolean
  mouthOpen?: boolean
}

// Global reference to prevent Chrome's V8 garbage-collecting the utterance mid-speech
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
  private isGreeting = false
  private mouthOpen = false
  private greetingTimer: number | null = null
  private resumeHeartbeatTimer: number | null = null
  private lipSyncTimer: number | null = null
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
   * Strictly filters and selects an articulate, natural MALE voice.
   * Explicitly purges all female voices (Samantha, Victoria, Karen, etc.)
   */
  public pickBestVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null
    const voices = window.speechSynthesis.getVoices()
    if (!voices || !voices.length) return null

    // Comprehensive blacklist of female voices
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

    // High-priority male voices known for natural resonance and masculine tone
    const preferredMaleNames = [
      'Daniel',                  // macOS British Male (natural, articulate baritone)
      'Eddy',                    // macOS US/UK Male
      'Alex',                    // macOS Classic Male
      'Fred',                    // macOS US Male
      'Reed',                    // macOS Male
      'Rishi',                   // English (India) Male
      'Aman',                    // English (India) Male
      'Google UK English Male',  // Chrome UK Male
      'Google US English Male',  // Chrome US Male
      'Microsoft David',         // Windows Male
      'Microsoft Mark',          // Windows Male
      'Microsoft Guy',           // Windows Male
      'Male'
    ]

    // 1. Check priority male voices first
    for (const name of preferredMaleNames) {
      const match = voices.find(
        (v) => !isFemale(v) && v.name.toLowerCase().includes(name.toLowerCase()) && v.lang.startsWith('en')
      )
      if (match) return match
    }

    // 2. Fallback: Any English voice that is NOT female
    const englishMale = voices.find((v) => v.lang.startsWith('en') && !isFemale(v))
    if (englishMale) return englishMale

    // 3. Any non-female voice
    const anyMale = voices.find((v) => !isFemale(v))
    if (anyMale) return anyMale

    return voices[0]
  }

  public play() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    // Resume from paused state
    if (this.isPaused) {
      window.speechSynthesis.resume()
      this.isPaused = false
      this.isSpeaking = true
      this.startLipSync()
      this.startHeartbeat()
      this.notify()
      return
    }

    // Cancel any stale/stuck speech and immediately resume queue
    window.speechSynthesis.cancel()
    window.speechSynthesis.resume()

    const utterance = new SpeechSynthesisUtterance(INTRO_SCRIPT)
    this.utterance = utterance
    window.__talhaActiveUtterance = utterance // Retain on window to defeat Chrome GC bug

    const voice = this.pickBestVoice()
    if (voice) {
      utterance.voice = voice
    }

    // Natural masculine pitch and articulate delivery speed
    utterance.pitch = 0.98 // Grounded, clear male pitch
    utterance.rate = 1.0   // Natural conversational cadence
    utterance.volume = this.isMuted ? 0 : 1.0

    utterance.onstart = () => {
      this.isSpeaking = true
      this.isPaused = false
      this.isGreeting = true
      this.startLipSync()
      this.startHeartbeat()
      this.notify()

      if (this.greetingTimer) window.clearTimeout(this.greetingTimer)
      // Waving greeting for the opening 3.5 seconds
      this.greetingTimer = window.setTimeout(() => {
        this.isGreeting = false
        this.notify()
      }, 3500)
    }

    utterance.onend = () => {
      this.cleanUpSpeech()
    }

    utterance.onerror = () => {
      this.cleanUpSpeech()
    }

    utterance.onboundary = (e) => {
      // Mouth movement on word boundaries
      this.mouthOpen = !this.mouthOpen
      if (e.charIndex !== undefined) {
        const spokenSoFar = INTRO_SCRIPT.slice(0, e.charIndex + (e.charLength || 10))
        this.notify(spokenSoFar)
      } else {
        this.notify()
      }
    }

    // Execute speak
    window.speechSynthesis.speak(utterance)
    this.isSpeaking = true
    this.isPaused = false
    this.notify()

    // Safety watchdog: In Chrome, speech queue can sleep until explicit resume
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
    this.isGreeting = false
    this.mouthOpen = false
    this.stopLipSync()
    this.stopHeartbeat()
    if (this.greetingTimer) window.clearTimeout(this.greetingTimer)
    this.notify()
  }

  public stop() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    this.cleanUpSpeech()
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

  private startLipSync() {
    this.stopLipSync()
    // Rapid lip movement flap while speaking (220ms cadence)
    this.lipSyncTimer = window.setInterval(() => {
      if (this.isSpeaking && !this.isPaused) {
        this.mouthOpen = !this.mouthOpen
        this.notify()
      }
    }, 220)
  }

  private stopLipSync() {
    if (this.lipSyncTimer) {
      window.clearInterval(this.lipSyncTimer)
      this.lipSyncTimer = null
    }
    this.mouthOpen = false
  }

  // Prevents Chrome 15-second speech cutoff timeout
  private startHeartbeat() {
    this.stopHeartbeat()
    this.resumeHeartbeatTimer = window.setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window && this.isSpeaking) {
        window.speechSynthesis.resume()
      }
    }, 4500)
  }

  private stopHeartbeat() {
    if (this.resumeHeartbeatTimer) {
      window.clearInterval(this.resumeHeartbeatTimer)
      this.resumeHeartbeatTimer = null
    }
  }

  private cleanUpSpeech() {
    this.isSpeaking = false
    this.isPaused = false
    this.isGreeting = false
    this.mouthOpen = false
    this.stopLipSync()
    this.stopHeartbeat()
    if (this.greetingTimer) window.clearTimeout(this.greetingTimer)
    window.__talhaActiveUtterance = null
    this.notify()
  }

  private notify(progressText?: string) {
    if (this.onStateChange) {
      this.onStateChange({
        isSpeaking: this.isSpeaking,
        isPaused: this.isPaused,
        isGreeting: this.isGreeting,
        mouthOpen: this.mouthOpen,
        progressText: progressText || (this.isSpeaking ? INTRO_SCRIPT : undefined)
      })
    }
  }
}

export const voiceIntroManager = new VoiceIntroManager()
