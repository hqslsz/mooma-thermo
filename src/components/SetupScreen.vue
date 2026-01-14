<script setup lang="ts">
import FileInput from './setup/FileInput.vue'
import AdvancedSettings from './setup/AdvancedSettings.vue'

defineProps<{
  bpm: number
  audioOffset: number
  totalRounds: number
  images: string[]
  audioFileName: string | null
  canStart: boolean
}>()

const emit = defineEmits<{
  'update:bpm': [value: number]
  'update:audioOffset': [value: number]
  'update:totalRounds': [value: number]
  'select-images': [event: Event]
  'select-audio': [event: Event]
  'start': []
}>()
</script>

<template>
  <div class="flex-1 flex items-center justify-center p-8">
    <div class="w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1
          class="text-5xl font-black tracking-wider text-neon-green mb-2"
          style="text-shadow: 0 0 20px var(--color-neon-green), 0 0 40px var(--color-neon-green-dim);"
        >
          RHYTHM<span class="text-neon-pink">MEMORY</span>
        </h1>
        <p class="text-cyber-border text-lg tracking-widest font-mono">
          {{ bpm }} BPM • 16-BEAT CYCLE • 8 CARDS
        </p>
      </div>

      <!-- Setup Form -->
      <div class="space-y-8 bg-cyber-dark/80 backdrop-blur-sm p-8 rounded-2xl border border-cyber-border">
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
          @update:bpm="emit('update:bpm', $event)"
          @update:audio-offset="emit('update:audioOffset', $event)"
          @update:total-rounds="emit('update:totalRounds', $event)"
        />

        <!-- Start Button -->
        <button
          @click="emit('start')"
          :disabled="!canStart"
          class="w-full py-4 text-xl font-bold tracking-widest rounded-xl transition-all duration-300"
          :class="canStart
            ? 'bg-neon-green text-black hover:shadow-[0_0_30px_var(--color-neon-green)] active:scale-95'
            : 'bg-cyber-card text-gray-600 cursor-not-allowed'"
        >
          {{ canStart ? 'START GAME' : 'LOAD ASSETS FIRST' }}
        </button>
      </div>
    </div>
  </div>
</template>
