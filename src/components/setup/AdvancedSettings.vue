<script setup lang="ts">
import { ref } from 'vue'
import type { GameMode } from '../../types'

defineProps<{
  bpm: number
  audioOffset: number
  totalRounds: number
  gameMode: GameMode
  finishDelay: number
}>()

const emit = defineEmits<{
  'update:bpm': [value: number]
  'update:audioOffset': [value: number]
  'update:totalRounds': [value: number]
  'update:gameMode': [value: GameMode]
  'update:finishDelay': [value: number]
}>()

const showOptions = ref(false)
</script>

<template>
  <div class="space-y-2">
    <!-- Toggle Button -->
    <button
      class="flex items-center justify-between w-full pl-4 pr-3 py-2.5 bg-cyber-card border border-cyber-border rounded-lg text-gray-400 hover:border-neon-purple hover:text-neon-purple transition-all duration-200"
      @click="showOptions = !showOptions"
    >
      <span class="flex items-center gap-2 text-xs font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        OPTIONS
      </span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="showOptions ? 'rotate-180' : ''"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Settings Panel -->
    <div
      v-show="showOptions"
      class="space-y-3 p-4 bg-cyber-black/50 border border-cyber-border rounded-lg"
    >
      <!-- Game Mode -->
      <div class="space-y-1.5">
        <label class="flex items-center gap-2 text-xs font-medium text-neon-cyan pl-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          MODE
        </label>
        <div class="flex gap-2">
          <button
            class="flex-1 py-2.5 text-xs font-medium rounded-lg border transition-all duration-200"
            :class="
              gameMode === 'standard'
                ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan'
                : 'bg-cyber-card border-cyber-border text-gray-400 hover:border-neon-cyan/50'
            "
            @click="emit('update:gameMode', 'standard')"
          >
            STANDARD
          </button>
          <button
            class="flex-1 py-2.5 text-xs font-medium rounded-lg border transition-all duration-200"
            :class="
              gameMode === 'random'
                ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan'
                : 'bg-cyber-card border-cyber-border text-gray-400 hover:border-neon-cyan/50'
            "
            @click="emit('update:gameMode', 'random')"
          >
            RANDOM
          </button>
        </div>
        <p class="text-[10px] text-gray-500 pl-1">
          {{ gameMode === 'standard' ? '按文件顺序展示图片' : '每轮随机选择8张不重复图片' }}
        </p>
      </div>

      <!-- BPM -->
      <div class="space-y-1.5">
        <label class="flex items-center gap-2 text-xs font-medium text-neon-purple pl-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          BPM
        </label>
        <input
          type="number"
          :value="bpm"
          min="60"
          max="300"
          step="1"
          class="w-full pl-4 pr-3 py-2.5 bg-cyber-card border border-cyber-border rounded-lg text-white text-sm font-mono focus:border-neon-purple focus:outline-none transition-colors"
          placeholder="183"
          @input="emit('update:bpm', Number(($event.target as HTMLInputElement).value))"
        />
      </div>

      <!-- Audio Offset -->
      <div class="space-y-1.5">
        <label class="flex items-center gap-2 text-xs font-medium text-neon-purple pl-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          AUDIO OFFSET (seconds)
        </label>
        <input
          type="number"
          :value="audioOffset"
          step="0.001"
          class="w-full pl-4 pr-3 py-2.5 bg-cyber-card border border-cyber-border rounded-lg text-white text-sm font-mono focus:border-neon-purple focus:outline-none transition-colors"
          placeholder="2.622951"
          @input="emit('update:audioOffset', Number(($event.target as HTMLInputElement).value))"
        />
      </div>

      <!-- Rounds -->
      <div class="space-y-1.5">
        <label class="flex items-center gap-2 text-xs font-medium text-neon-orange pl-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          ROUNDS
        </label>
        <input
          type="number"
          :value="totalRounds"
          min="1"
          max="20"
          step="1"
          class="w-full pl-4 pr-3 py-2.5 bg-cyber-card border border-cyber-border rounded-lg text-white text-sm font-mono focus:border-neon-orange focus:outline-none transition-colors"
          placeholder="5"
          @input="emit('update:totalRounds', Number(($event.target as HTMLInputElement).value))"
        />
      </div>

      <!-- Finish Delay -->
      <div class="space-y-1.5">
        <label class="flex items-center gap-2 text-xs font-medium text-neon-pink pl-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          FINISH DELAY (seconds)
        </label>
        <input
          type="number"
          :value="finishDelay"
          min="0"
          max="10"
          step="0.5"
          class="w-full pl-4 pr-3 py-2.5 bg-cyber-card border border-cyber-border rounded-lg text-white text-sm font-mono focus:border-neon-pink focus:outline-none transition-colors"
          placeholder="3"
          @input="emit('update:finishDelay', Number(($event.target as HTMLInputElement).value))"
        />
        <p class="text-[10px] text-gray-500 pl-1">游戏结束后等待的时间，再跳转到结算页面</p>
      </div>
    </div>
  </div>
</template>
