// Web Speech Synthesis Controller for Muhammad Talha Anjum's Voice Intro
// Configured STRICTLY for authentic, articulate MALE voice profiles with anti-stall safeguards

export const INTRO_SCRIPT =
  "Hello, I am Muhammad Talha Anjum, an Artificial Intelligence student and Full-Stack Developer from Pakistan. I specialize in building practical intelligent applications with Python and the Gemini API, full-stack web platforms using Next.js and PostgreSQL, and driving digital growth through targeted Meta Ads. Explore my work below, or let's connect to build something impactful."

export type VoiceProfileId = 'daniel' | 'alex' | 'rishi'

export interface VoiceProfile {
  id: VoiceProfileId
  label: string
  accent: string
  description: string
  keywords: string[]
  pitch: number
  rate: number
}

export const VOICE_PROFILES: VoiceProfile[] = [
  {
    id: 'daniel',
    label: 'Daniel',
    accent: 'UK English',
    description: 'Executive & articulate baritone (Recommended)',
    keywords: ['Daniel', 'Google UK English Male', 'Oliver', 'George', 'en-GB'],
    pitch: 0.98,
    rate: 1.0
  },
  {
    id: 'alex',
    label: 'Alex / Eddy',
    accent: 'US English',
    description: 'Modern, friendly product developer',
    keywords: ['Alex', 'Eddy', 'Fred', 'Google US English Male', 'Microsoft David', 'Microsoft Mark', 'en-US'],
    pitch: 1.0,
    rate: 1.02
  },
  {
    id: 'rishi',
    label: 'Rishi',
    accent: 'South Asian',
    description: 'Authentic regional cadence & clear delivery',
    keywords: ['Rishi', 'Aman', 'en-IN', 'en_IN'],
    pitch: 1.0,
    rate: 1.0
  }
]

export interface VoiceState {
  isSpeaking: boolean
  isPaused: boolean
  progressText?: string
  isGreeting?: boolean
  mouthOpen?: boolean
  currentProfileId: VoiceProfileId
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
  private activeProfileId: VoiceProfileId = 'daniel'
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

  public setProfile(profileId: VoiceProfileId) {
    this.activeProfileId = profileId
    if (this.isSpeaking) {
      this.stop()
      this.play()
    } else {
      this.notify()
    }
  }

  public getActiveProfile(): VoiceProfile {
    return VOICE_PROFILES.find((p) => p.id === this.activeProfileId) || VOICE_PROFILES[0]
  }

  /**
   * Strictly filters and selects an articulate, natural MALE voice according to selected profile.
   * Explicitly purges all female voices (Samantha, Victoria, Karen, etc.)
   */
  public pickBestVoice(profileId: VoiceProfileId = this.activeProfileId): SpeechSynthesisVoice | null {
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

    const targetProfile = VOICE_PROFILES.find((p) => p.id === profileId) || VOICE_PROFILES[0]

    // 1. Search for profile's specific target keywords among non-female voices
    for (const kw of targetProfile.keywords) {
      const match = voices.find(
        (v) => !isFemale(v) && v.name.toLowerCase().includes(kw.toLowerCase())
      )
      if (match) return match
    }

    // 2. Fallback: Any English voice that is NOT female
    const englishMale = voices.find((v) => v.lang.startsWith('en') && !isFemale(v))
    if (englishMale) return englishMale

    // 3. Fallback: Any non-female voice
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

    const profile = this.getActiveProfile()
    const voice = this.pickBestVoice(profile.id)
    if (voice) {
      utterance.voice = voice
    }

    utterance.pitch = profile.pitch
    utterance.rate = profile.rate
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
        currentProfileId: this.activeProfileId,
        progressText: progressText || (this.isSpeaking ? INTRO_SCRIPT : undefined)
      })
    }
  }
}

export const voiceIntroManager = new VoiceIntroManager()
