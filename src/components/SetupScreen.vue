<script setup lang="ts">
import FileInput from './setup/FileInput.vue'
import AdvancedSettings from './setup/AdvancedSettings.vue'
import type { GameMode } from '../types'

defineProps<{
  bpm: number
  audioOffset: number
  totalRounds: number
  gameMode: GameMode
  finishDelay: number
  images: string[]
  audioFileName: string | null
  canStart: boolean
}>()

const emit = defineEmits<{
  'update:bpm': [value: number]
  'update:audioOffset': [value: number]
  'update:totalRounds': [value: number]
  'update:gameMode': [value: GameMode]
  'update:finishDelay': [value: number]
  'select-images': [event: Event]
  'select-audio': [event: Event]
  start: []
}>()
</script>

<template>
  <div class="flex-1 flex items-center justify-center p-8">
    <div class="w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold tracking-wide text-neon-green mb-2 opacity-90">
          Mooma Thermo<span class="text-neon-pink"> 123GO！</span>
        </h1>
        <p class="text-cyber-border text-sm tracking-widest font-mono">
          {{ bpm }} BPM • 16-BEAT CYCLE • 8 CARDS
        </p>
      </div>

      <!-- Setup Form -->
      <div
        class="space-y-5 bg-cyber-dark/80 backdrop-blur-sm p-6 rounded-xl border border-cyber-border"
      >
        <!-- Image Folder Input -->
        <FileInput
          type="image"
          label="IMAGE FOLDER"
          placeholder="Click to select folder..."
          :display-text="images.length > 0 ? `${images.length} images loaded` : ''"
          :images="images"
          @select="emit('select-images', $event)"
        />

        <!-- Audio File Input -->
        <FileInput
          type="audio"
          label="AUDIO FILE (MP3)"
          placeholder="Click to select audio file..."
          :display-text="audioFileName ?? ''"
          @select="emit('select-audio', $event)"
        />

        <!-- Advanced Settings -->
        <AdvancedSettings
          :bpm="bpm"
          :audio-offset="audioOffset"
          :total-rounds="totalRounds"
          :game-mode="gameMode"
          :finish-delay="finishDelay"
          @update:bpm="emit('update:bpm', $event)"
          @update:audio-offset="emit('update:audioOffset', $event)"
          @update:total-rounds="emit('update:totalRounds', $event)"
          @update:game-mode="emit('update:gameMode', $event)"
          @update:finish-delay="emit('update:finishDelay', $event)"
        />

        <!-- Start Button -->
        <button
          :disabled="!canStart"
          class="w-full py-3.5 text-sm font-bold tracking-wider rounded-md transition-all duration-200 flex items-center justify-center gap-2"
          :class="
            canStart
              ? 'bg-neon-green text-black hover:shadow-[0_0_16px_var(--color-neon-green)] hover:brightness-110 active:scale-[0.98]'
              : 'bg-cyber-card text-gray-600 cursor-not-allowed'
          "
          @click="emit('start')"
        >
          <svg v-if="canStart" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          {{ canStart ? 'PLAY' : 'LOAD ASSETS FIRST' }}
        </button>
      </div>
    </div>
  </div>
</template>
