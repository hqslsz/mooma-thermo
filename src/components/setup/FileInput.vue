<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'image' | 'audio'
  label: string
  placeholder: string
  displayText: string
  images?: string[]
}>()

const emit = defineEmits<{
  select: [event: Event]
}>()

// For image preview
const previewImages = computed(() => props.images?.slice(0, 8) ?? [])
const hasMoreImages = computed(() => (props.images?.length ?? 0) > 8)

// Accent color: image=blue, audio=pink (keep static class names for Tailwind)
const accentClasses = computed(() => {
  if (props.type === 'image') {
    return [
      'group-hover:border-neon-blue',
      'group-focus-within:border-neon-blue',
      'group-focus-within:shadow-[0_0_0_1px_var(--color-neon-blue)]',
      'group-hover:text-neon-blue',
    ]
  }
  return [
    'group-hover:border-neon-pink',
    'group-focus-within:border-neon-pink',
    'group-focus-within:shadow-[0_0_0_1px_var(--color-neon-pink)]',
    'group-hover:text-neon-pink',
  ]
})
</script>

<template>
  <div class="space-y-2">
    <label
      :class="[
        'flex items-center gap-2 text-sm font-medium pl-1',
        props.type === 'image' ? 'text-neon-blue' : 'text-neon-pink',
      ]"
    >
      <!-- Image Icon -->
      <svg
        v-if="type === 'image'"
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <!-- Audio Icon -->
      <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
      {{ label }}
    </label>

    <div class="relative group">
      <input
        type="file"
        :webkitdirectory="type === 'image'"
        :accept="type === 'audio' ? 'audio/*' : undefined"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        @change="emit('select', $event)"
      />
      <div
        :class="[
          'pl-4 pr-3 py-2.5 bg-cyber-card border border-cyber-border rounded-lg text-gray-400 font-mono text-sm truncate transition-all duration-200',
          ...accentClasses,
        ]"
      >
        {{ displayText || placeholder }}
      </div>
    </div>

    <!-- Image Preview -->
    <div v-if="type === 'image' && images && images.length > 0" class="grid grid-cols-8 gap-2 mt-4">
      <div
        v-for="(img, i) in previewImages"
        :key="i"
        class="relative aspect-square rounded-lg overflow-hidden border border-cyber-border"
      >
        <img
          :src="img"
          class="w-full h-full object-contain"
          :class="hasMoreImages && i === 7 ? 'blur-sm' : ''"
        />
        <div
          v-if="hasMoreImages && i === 7"
          class="absolute inset-0 flex items-center justify-center bg-black/40"
        >
          <span class="text-2xl font-bold text-white tracking-widest">...</span>
        </div>
      </div>
    </div>
  </div>
</template>
