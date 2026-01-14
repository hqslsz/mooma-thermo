import { ref, computed, onUnmounted } from 'vue'
import {
  TOTAL_BEATS,
  REVEAL_PHASE_END,
  CARD_COUNT,
  DEFAULT_BPM,
  DEFAULT_AUDIO_OFFSET,
  DEFAULT_TOTAL_ROUNDS,
} from '../constants'
import type { GamePhase } from '../types'

// ============================================================================
// Game Engine Composable
// ============================================================================
export function useGameEngine() {
  // Settings
  const bpm = ref(DEFAULT_BPM)
  const audioOffset = ref(DEFAULT_AUDIO_OFFSET)
  const totalRounds = ref(DEFAULT_TOTAL_ROUNDS)

  // State
  const currentBeat = ref(0)
  const currentPhase = ref<GamePhase>('reveal')
  const revealedCards = ref<boolean[]>(new Array(CARD_COUNT).fill(false))
  const scanIndex = ref(-1)
  const isPlaying = ref(false)
  const currentRound = ref(1)

  // Audio
  const audioElement = ref<HTMLAudioElement | null>(null)

  // Animation frame
  let animationFrameId: number | null = null
  let lastBeatInt = -1

  // ============================================================================
  // COMPUTED
  // ============================================================================
  const displayBeat = computed(() => Math.floor(currentBeat.value) % TOTAL_BEATS)
  const displayPhase = computed(() => displayBeat.value < REVEAL_PHASE_END ? 'REVEAL' : 'SCAN')

  const progressPercent = computed(() => {
    const beatInCycle = currentBeat.value % TOTAL_BEATS
    return (beatInCycle / TOTAL_BEATS) * 100
  })

  // ============================================================================
  // GAME LOOP
  // ============================================================================
  function updateBeat() {
    if (!audioElement.value || audioElement.value.paused) {
      animationFrameId = requestAnimationFrame(updateBeat)
      return
    }

    const currentTime = audioElement.value.currentTime - audioOffset.value
    const rawBeat = currentTime * (bpm.value / 60)

    // During offset period (before beat 0), don't process any card logic
    if (rawBeat < 0) {
      currentBeat.value = 0
      currentPhase.value = 'reveal'
      animationFrameId = requestAnimationFrame(updateBeat)
      return
    }

    currentBeat.value = rawBeat

    // Calculate beat within the 16-beat cycle
    const beatInCycle = currentBeat.value % TOTAL_BEATS
    const beatInt = Math.floor(beatInCycle)

    // Detect cycle reset (from beat 15 back to beat 0)
    const isCycleReset = lastBeatInt >= REVEAL_PHASE_END && beatInt < lastBeatInt

    if (isCycleReset) {
      revealedCards.value = new Array(CARD_COUNT).fill(false)
      scanIndex.value = -1
      lastBeatInt = -1
      // Advance to next round, loop back to 1 after reaching totalRounds
      currentRound.value = currentRound.value >= totalRounds.value ? 1 : currentRound.value + 1
    }

    // Determine phase
    if (beatInCycle < REVEAL_PHASE_END) {
      currentPhase.value = 'reveal'

      // Reveal cards one by one during reveal phase (beats 0-7)
      if (beatInt !== lastBeatInt && beatInt >= 0 && beatInt < CARD_COUNT) {
        revealedCards.value[beatInt] = true
      }

      scanIndex.value = -1
    } else {
      currentPhase.value = 'scan'

      // Reset revealed cards at the start of scan phase
      if (lastBeatInt < REVEAL_PHASE_END && beatInt >= REVEAL_PHASE_END) {
        revealedCards.value = new Array(CARD_COUNT).fill(false)
      }

      // Scan cards one by one during scan phase (beats 8-15)
      const scanBeat = beatInt - REVEAL_PHASE_END
      if (scanBeat >= 0 && scanBeat < CARD_COUNT) {
        scanIndex.value = scanBeat
      }
    }

    lastBeatInt = beatInt
    animationFrameId = requestAnimationFrame(updateBeat)
  }

  // ============================================================================
  // CONTROLS
  // ============================================================================
  function startEngine() {
    revealedCards.value = new Array(CARD_COUNT).fill(false)
    scanIndex.value = -1
    lastBeatInt = -1
    currentBeat.value = 0
    currentRound.value = 1
    animationFrameId = requestAnimationFrame(updateBeat)
  }

  function stopEngine() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }

    if (audioElement.value) {
      audioElement.value.pause()
      audioElement.value.currentTime = 0
    }

    isPlaying.value = false
    revealedCards.value = new Array(CARD_COUNT).fill(false)
    scanIndex.value = -1
    currentRound.value = 1
  }

  function togglePlayPause() {
    if (!audioElement.value) return

    if (audioElement.value.paused) {
      audioElement.value.play()
      isPlaying.value = true
    } else {
      audioElement.value.pause()
      isPlaying.value = false
    }
  }

  function handleAudioEnded() {
    if (audioElement.value) {
      audioElement.value.currentTime = 0
      audioElement.value.play()
    }
  }

  // ============================================================================
  // CLEANUP
  // ============================================================================
  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  })

  return {
    // Settings
    bpm,
    audioOffset,
    totalRounds,
    // State
    currentBeat,
    currentPhase,
    revealedCards,
    scanIndex,
    isPlaying,
    audioElement,
    currentRound,
    // Computed
    displayBeat,
    displayPhase,
    progressPercent,
    // Methods
    startEngine,
    stopEngine,
    togglePlayPause,
    handleAudioEnded,
  }
}
