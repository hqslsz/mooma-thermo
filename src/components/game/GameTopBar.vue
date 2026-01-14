<script setup lang="ts">
import { ref, watch } from 'vue'
import { TOTAL_BEATS } from '../../constants'
import type { GamePhase } from '../../types'

const props = defineProps<{
  bpm: number
  currentPhase: GamePhase
  displayPhase: string
  displayBeat: number
  currentRound: number
  totalRounds: number
  isPlaying: boolean
}>()

const emit = defineEmits<{
  'exit': []
  'toggle-play': []
}>()

// Round change animation
const roundPulse = ref(false)
watch(() => props.currentRound, () => {
  roundPulse.value = true
  setTimeout(() => {
    roundPulse.value = false
  }, 500)
})
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <!-- Exit Button -->
    <button
      @click="emit('exit')"
      class="px-4 py-2 text-sm font-bold tracking-wider text-neon-pink border border-neon-pink rounded-lg hover:bg-neon-pink hover:text-black transition-colors"
    >
      ← EXIT
    </button>

    <!-- Status Display -->
    <div class="flex items-center gap-6 font-mono">
      <div class="text-center">
        <div class="text-xs text-gray-500 tracking-widest">PHASE</div>
        <div class="text-2xl font-bold" :class="currentPhase === 'reveal' ? 'text-neon-blue' : 'text-neon-green'">
          {{ displayPhase }}
        </div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-500 tracking-widest">ROUND</div>
        <div
          class="text-2xl font-bold text-neon-orange transition-all duration-300"
          :class="roundPulse ? 'scale-125 round-glow' : ''"
        >
          {{ currentRound }}/{{ totalRounds }}
        </div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-500 tracking-widest">BEAT</div>
        <div class="text-2xl font-bold text-neon-purple">
          {{ displayBeat + 1 }}/{{ TOTAL_BEATS }}
        </div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-500 tracking-widest">BPM</div>
        <div class="text-2xl font-bold text-white">{{ bpm }}</div>
      </div>
    </div>

    <!-- Play/Pause Button -->
    <button
      @click="emit('toggle-play')"
      class="px-6 py-2 text-sm font-bold tracking-wider rounded-lg transition-colors"
      :class="isPlaying ? 'bg-neon-pink text-black' : 'bg-neon-green text-black'"
    >
      {{ isPlaying ? '⏸ PAUSE' : '▶ PLAY' }}
    </button>
  </div>
</template>

