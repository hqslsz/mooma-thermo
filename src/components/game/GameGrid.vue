<script setup lang="ts">
import GameCard from '../GameCard.vue'
import type { GamePhase } from '../../types'

defineProps<{
  images: string[]
  revealedCards: boolean[]
  scanIndex: number
  currentPhase: GamePhase
}>()
</script>

<template>
  <div class="flex-1 flex items-center justify-center">
    <div class="grid grid-cols-4 grid-rows-2 gap-4 w-full max-w-4xl aspect-[2/1]">
      <GameCard
        v-for="index in 8"
        :key="`card-${index - 1}`"
        :index="index - 1"
        :image-src="images[index - 1] || ''"
        :is-revealed="revealedCards[index - 1]"
        :is-scanning="scanIndex === index - 1"
        :phase="currentPhase"
      />
    </div>
  </div>
</template>

