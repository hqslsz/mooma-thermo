<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import SetupScreen from './components/SetupScreen.vue'
import GameScreen from './components/GameScreen.vue'
import { useGameEngine, useAssetLoader } from './composables'
import { DEFAULT_GAME_MODE } from './constants'
import type { GameState, GameMode } from './types'

// ============================================================================
// GAME MODE
// ============================================================================
const gameMode = ref<GameMode>(DEFAULT_GAME_MODE)

// ============================================================================
// COMPOSABLES
// ============================================================================
const {
  bpm,
  audioOffset,
  totalRounds,
  currentPhase,
  revealedCards,
  scanIndex,
  isPlaying,
  audioElement,
  currentRound,
  displayBeat,
  displayPhase,
  progressPercent,
  startEngine,
  stopEngine,
  togglePlayPause,
  handleAudioEnded,
} = useGameEngine()

const {
  allImages,
  audioFile,
  audioUrl,
  currentRoundImages,
  canStart,
  handleImageFolder,
  handleAudioFile,
  refreshRoundImages,
} = useAssetLoader(totalRounds, gameMode)

// ============================================================================
// GAME STATE
// ============================================================================
const gameState = ref<GameState>('setup')

function startGame() {
  if (!canStart.value) return
  gameState.value = 'playing'
  refreshRoundImages(1) // Refresh images for round 1 when game starts
  startEngine()
}

function stopGame() {
  stopEngine()
  gameState.value = 'setup'
}

function handleAudioRef(el: HTMLAudioElement | null) {
  audioElement.value = el
}

// ============================================================================
// KEYBOARD CONTROLS
// ============================================================================
function handleKeydown(e: KeyboardEvent) {
  if (gameState.value === 'playing') {
    if (e.code === 'Space') {
      e.preventDefault()
      togglePlayPause()
    } else if (e.code === 'Escape') {
      stopGame()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Watch for audio URL changes to reload audio element
watch(audioUrl, (newUrl) => {
  if (newUrl && audioElement.value) {
    audioElement.value.load()
  }
})

// Watch for round changes to refresh images (for random mode)
watch(currentRound, (newRound) => {
  if (gameState.value === 'playing') {
    refreshRoundImages(newRound)
  }
})
</script>

<template>
  <div class="min-h-screen bg-cyber-black flex flex-col">
    <!-- Setup Screen -->
    <SetupScreen
      v-if="gameState === 'setup'"
      :bpm="bpm"
      :audio-offset="audioOffset"
      :total-rounds="totalRounds"
      :game-mode="gameMode"
      :images="allImages"
      :audio-file-name="audioFile?.name ?? null"
      :can-start="canStart"
      @update:bpm="bpm = $event"
      @update:audio-offset="audioOffset = $event"
      @update:total-rounds="totalRounds = $event"
      @update:game-mode="gameMode = $event"
      @select-images="handleImageFolder"
      @select-audio="handleAudioFile"
      @start="startGame"
    />

    <!-- Game Screen -->
    <GameScreen
      v-else
      :bpm="bpm"
      :images="currentRoundImages"
      :audio-url="audioUrl"
      :current-phase="currentPhase"
      :display-phase="displayPhase"
      :display-beat="displayBeat"
      :progress-percent="progressPercent"
      :revealed-cards="revealedCards"
      :scan-index="scanIndex"
      :is-playing="isPlaying"
      :current-round="currentRound"
      :total-rounds="totalRounds"
      @exit="stopGame"
      @toggle-play="togglePlayPause"
      @audio-ended="handleAudioEnded"
      @audio-ref="handleAudioRef"
    />
  </div>
</template>
