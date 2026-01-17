<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GameTopBar from './game/GameTopBar.vue'
import GameProgressBar from './game/GameProgressBar.vue'
import GameGrid from './game/GameGrid.vue'
import type { GamePhase } from '../types'

defineProps<{
  bpm: number
  images: string[]
  audioUrl: string
  currentPhase: GamePhase
  displayPhase: string
  displayBeat: number
  progressPercent: number
  revealedCards: boolean[]
  scanIndex: number
  isPlaying: boolean
  currentRound: number
  totalRounds: number
}>()

const hideUI = ref(false)

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'h' || e.key === 'H') {
    hideUI.value = !hideUI.value
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const emit = defineEmits<{
  exit: []
  'toggle-play': []
  'audio-ended': []
  'audio-ref': [el: HTMLAudioElement | null]
}>()

function setAudioRef(el: HTMLAudioElement | null) {
  emit('audio-ref', el)
}
</script>

<template>
  <div class="flex-1 flex flex-col p-6">
    <!-- Hidden Audio Element -->
    <audio
      :ref="(el) => setAudioRef(el as HTMLAudioElement | null)"
      :src="audioUrl"
      preload="auto"
      @ended="emit('audio-ended')"
    />

    <!-- Top Bar -->
    <GameTopBar
      :bpm="bpm"
      :current-phase="currentPhase"
      :display-phase="displayPhase"
      :display-beat="displayBeat"
      :current-round="currentRound"
      :total-rounds="totalRounds"
      :is-playing="isPlaying"
      @exit="emit('exit')"
      @toggle-play="emit('toggle-play')"
    />

    <!-- Progress Bar -->
    <GameProgressBar :current-phase="currentPhase" :progress-percent="progressPercent" />

    <!-- Game Grid -->
    <GameGrid
      :images="images"
      :revealed-cards="revealedCards"
      :scan-index="scanIndex"
      :current-phase="currentPhase"
      :current-round="currentRound"
    />

    <!-- Bottom Instructions -->
    <div v-show="!hideUI" class="text-center text-gray-500 text-sm font-mono mt-6">
      <span class="text-neon-green">SPACE</span> Play/Pause •
      <span class="text-neon-pink">ESC</span> Exit • <span class="text-neon-blue">H</span> Hide UI
    </div>
  </div>
</template>
