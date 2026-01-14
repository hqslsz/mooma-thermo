<script setup lang="ts">
import { TOTAL_BEATS } from '../../constants'
import type { GamePhase } from '../../types'

defineProps<{
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

</script>

<template>
  <div class="flex items-center justify-between mb-6 px-4 py-2 bg-cyber-dark/50 rounded-xl">
    <!-- Exit Button -->
    <button
      @click="emit('exit')"
      class="min-w-[70px] h-[35px] text-xs font-bold tracking-wider text-neon-pink border-2 border-neon-pink rounded-xl hover:bg-neon-pink hover:text-black transition-colors"
    >
      ← EXIT
    </button>

    <!-- Status Display -->
    <div class="flex items-center gap-8 font-mono">
      <div class="text-center">
        <div class="text-xs text-gray-500 tracking-widest">PHASE</div>
        <div class="text-2xl font-bold" :class="currentPhase === 'reveal' ? 'text-neon-blue' : 'text-neon-green'">
          {{ displayPhase }}
        </div>
      </div>
      <div class="text-center">
        <div class="text-xs text-gray-500 tracking-widest">ROUND</div>
        <div class="text-2xl font-bold text-neon-orange">
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
      class="min-w-[70px] h-[35px] text-xs font-bold tracking-wider rounded-xl transition-colors"
      :class="isPlaying ? 'bg-neon-pink text-black' : 'bg-neon-green text-black'"
    >
      {{ isPlaying ? '⏸ PAUSE' : '▶ PLAY' }}
    </button>
  </div>
</template>



