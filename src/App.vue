<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import SetupScreen from './components/SetupScreen.vue'
import GameScreen from './components/GameScreen.vue'
import { useGameEngine, useAssetLoader } from './composables'
import type { GameState } from './types'

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
  canStart,
  handleImageFolder,
  handleAudioFile,
  getImagesForRound,
} = useAssetLoader(totalRounds)

// Get images for the current round
const currentRoundImages = computed(() => getImagesForRound(currentRound.value))

// ============================================================================
// GAME STATE
// ============================================================================
const gameState = ref<GameState>('setup')

function startGame() {
  if (!canStart.value) return
  gameState.value = 'playing'
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
</script>

<template>
  <div class="min-h-screen bg-cyber-black flex flex-col">
    <!-- Setup Screen -->
    <SetupScreen
      v-if="gameState === 'setup'"
      :bpm="bpm"
      :audio-offset="audioOffset"
      :total-rounds="totalRounds"
      :images="allImages"
      :audio-file-name="audioFile?.name ?? null"
      :can-start="canStart"
      @update:bpm="bpm = $event"
      @update:audio-offset="audioOffset = $event"
      @update:total-rounds="totalRounds = $event"
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
