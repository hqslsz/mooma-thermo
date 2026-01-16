<script setup lang="ts">
const emit = defineEmits<{
  'back': []
}>()
</script>

<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold text-neon-green mb-2 tracking-wider">
      感谢使用
    </h1>
    <p class="text-gray-500 text-sm font-mono mb-16">
      THANKS FOR USING
    </p>
    <button
      @click="emit('back')"
      class="min-w-[70px] h-[35px] text-xs font-bold tracking-wider text-neon-pink border-2 border-neon-pink rounded-xl hover:bg-neon-pink hover:text-black transition-colors"
    >
      ← EXIT
    </button>
  </div>
</template>
