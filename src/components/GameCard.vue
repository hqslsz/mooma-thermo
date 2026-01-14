<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { GamePhase } from '../types'

const props = defineProps<{
  index: number
  imageSrc: string
  isRevealed: boolean
  isScanning: boolean
  phase: GamePhase
}>()

// Track if the card face should be visible
const isFaceVisible = computed(() => 
  (props.phase === 'reveal' && props.isRevealed) || props.phase === 'scan'
)

// Delayed image update - only change image when card is face-down
const displayImage = ref(props.imageSrc)

watch(() => props.imageSrc, (newSrc) => {
  if (newSrc !== displayImage.value) {
    // If card face is hidden (back is showing), update immediately
    if (!isFaceVisible.value) {
      displayImage.value = newSrc
    } else {
      // If card face is visible, wait a tiny bit for the flip animation
      // This shouldn't happen often since round changes when cards flip to back
      setTimeout(() => {
        displayImage.value = newSrc
      }, 50)
    }
  }
})
</script>

<template>
  <div
    class="relative rounded-2xl overflow-hidden transition-all duration-150"
    :class="[
      'bg-cyber-card border-4',
      isScanning
        ? 'border-neon-green scanning scale-105 z-10'
        : 'border-cyber-border',
      phase === 'reveal' && isRevealed
        ? 'card-reveal'
        : ''
    ]"
  >
    <!-- Card Face (Image) -->
    <div
      class="absolute inset-0 transition-opacity duration-200"
      :class="isFaceVisible ? 'opacity-100' : 'opacity-0'"
    >
      <img
        :src="displayImage"
        class="w-full h-full object-cover"
        :alt="`Card ${index + 1}`"
      />
    </div>

    <!-- Card Back -->
    <div
      class="absolute inset-0 flex items-center justify-center bg-cyber-dark transition-opacity duration-200"
      :class="isFaceVisible ? 'opacity-0' : 'opacity-100'"
    >
      <div class="text-6xl font-black text-cyber-border">
        {{ index + 1 }}
      </div>
    </div>

    <!-- Card Index Badge -->
    <div
      class="absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded"
      :class="isScanning ? 'bg-neon-green text-black' : 'bg-cyber-dark/80 text-gray-400'"
    >
      #{{ index + 1 }}
    </div>
  </div>
</template>

