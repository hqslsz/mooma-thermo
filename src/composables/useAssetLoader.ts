import { ref, computed, onUnmounted, type Ref } from 'vue'
import { CARD_COUNT } from '../constants'
import { getImagesForRoundByMode } from './useImageSelector'
import type { GameMode } from '../types'

// ============================================================================
// Asset Loader Composable
// ============================================================================
export function useAssetLoader(totalRounds: Ref<number>, gameMode: Ref<GameMode>) {
  const allImages = ref<string[]>([])
  const audioFile = ref<File | null>(null)
  const audioUrl = ref<string>('')

  // Current round images - refreshed on each round change
  const currentRoundImages = ref<string[]>([])

  const hasImages = computed(() => allImages.value.length > 0)
  const hasAudio = computed(() => !!audioUrl.value)
  const canStart = computed(() => hasImages.value && hasAudio.value)

  // Refresh images for a specific round (called on round change or game start)
  function refreshRoundImages(round: number): void {
    currentRoundImages.value = getImagesForRoundByMode(allImages.value, round, gameMode.value)
  }

  // ============================================================================
  // IMAGE HANDLING
  // ============================================================================
  function handleImageFolder(event: Event) {
    const input = event.target as HTMLInputElement
    const files = input.files
    if (!files) return

    // Clear previous images
    allImages.value.forEach((url) => URL.revokeObjectURL(url))
    allImages.value = []

    // Filter for image files and convert to blob URLs
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
      alert('No image files found in the selected folder.')
      return
    }

    // Create blob URLs
    let loadedImages = imageFiles.map((file) => URL.createObjectURL(file))

    // For standard mode: pre-duplicate images to fill all rounds
    // For random mode: keep original images (selection happens per round)
    if (gameMode.value === 'standard') {
      const requiredImages = totalRounds.value * CARD_COUNT
      while (loadedImages.length < requiredImages) {
        loadedImages = [...loadedImages, ...loadedImages]
      }
      allImages.value = loadedImages.slice(0, requiredImages)
    } else {
      // Random mode: store all original images
      allImages.value = loadedImages
    }
  }

  // ============================================================================
  // AUDIO HANDLING
  // ============================================================================
  function handleAudioFile(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return

    // Revoke previous URL
    if (audioUrl.value) {
      URL.revokeObjectURL(audioUrl.value)
    }

    audioFile.value = file
    audioUrl.value = URL.createObjectURL(file)
  }

  // ============================================================================
  // CLEANUP
  // ============================================================================
  function cleanup() {
    allImages.value.forEach((url) => URL.revokeObjectURL(url))
    if (audioUrl.value) {
      URL.revokeObjectURL(audioUrl.value)
    }
  }

  onUnmounted(cleanup)

  return {
    // State
    allImages,
    audioFile,
    audioUrl,
    currentRoundImages,
    // Computed
    hasImages,
    hasAudio,
    canStart,
    // Methods
    handleImageFolder,
    handleAudioFile,
    refreshRoundImages,
    cleanup,
  }
}
