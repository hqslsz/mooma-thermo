<script setup lang="ts">
import type { GamePhase } from '../../types'

defineProps<{
  currentPhase: GamePhase
  progressPercent: number
}>()
</script>

<template>
  <div class="relative h-2 bg-cyber-card rounded-full mb-8 overflow-hidden">
    <!-- Reveal/Scan division marker -->
    <div class="absolute top-0 left-1/2 w-0.5 h-full bg-cyber-border z-10"></div>
    <!-- Progress fill -->
    <div
      class="absolute top-0 left-0 h-full rounded-full transition-all duration-75"
      :class="currentPhase === 'reveal' ? 'bg-neon-blue' : 'bg-neon-green'"
      :style="{ width: `${progressPercent}%` }"
    ></div>
  </div>
</template>

