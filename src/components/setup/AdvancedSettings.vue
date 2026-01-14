<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  bpm: number
  audioOffset: number
  totalRounds: number
}>()

const emit = defineEmits<{
  'update:bpm': [value: number]
  'update:audioOffset': [value: number]
  'update:totalRounds': [value: number]
}>()

const showAdvanced = ref(false)
</script>

<template>
  <div class="space-y-3">
    <!-- Toggle Button -->
    <button
      @click="showAdvanced = !showAdvanced"
      class="flex items-center justify-between w-full px-4 py-3 bg-cyber-card border border-cyber-border rounded-xl text-gray-400 hover:border-neon-purple hover:text-neon-purple transition-colors"
    >
      <span class="flex items-center gap-3 text-sm font-medium">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        ADVANCED
      </span>
      <svg
        class="w-5 h-5 transition-transform duration-200"
        :class="showAdvanced ? 'rotate-180' : ''"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Settings Panel -->
    <div
      v-show="showAdvanced"
      class="space-y-4 p-4 bg-cyber-black/50 border border-cyber-border rounded-xl"
    >
      <!-- BPM -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-neon-purple">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          BPM
        </label>
        <input
          type="number"
          :value="bpm"
          @input="emit('update:bpm', Number(($event.target as HTMLInputElement).value))"
          min="60"
          max="300"
          step="1"
          class="w-full px-4 py-3 bg-cyber-card border border-cyber-border rounded-xl text-white font-mono focus:border-neon-purple focus:outline-none"
          placeholder="183"
        />
      </div>

      <!-- Audio Offset -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-neon-purple">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          AUDIO OFFSET (seconds)
        </label>
        <input
          type="number"
          :value="audioOffset"
          @input="emit('update:audioOffset', Number(($event.target as HTMLInputElement).value))"
          step="0.001"
          class="w-full px-4 py-3 bg-cyber-card border border-cyber-border rounded-xl text-white font-mono focus:border-neon-purple focus:outline-none"
          placeholder="2.622951"
        />
      </div>

      <!-- Rounds -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm font-medium text-neon-orange">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          ROUNDS
        </label>
        <input
          type="number"
          :value="totalRounds"
          @input="emit('update:totalRounds', Number(($event.target as HTMLInputElement).value))"
          min="1"
          max="20"
          step="1"
          class="w-full px-4 py-3 bg-cyber-card border border-cyber-border rounded-xl text-white font-mono focus:border-neon-orange focus:outline-none"
          placeholder="5"
        />
      </div>
    </div>
  </div>
</template>

