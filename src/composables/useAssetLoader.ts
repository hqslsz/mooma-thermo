import { ref, computed, onUnmounted, type Ref } from 'vue'
import { CARD_COUNT } from '../constants'

// ============================================================================
// Asset Loader Composable
// ============================================================================
export function useAssetLoader(totalRounds: Ref<number>) {
  const allImages = ref<string[]>([])
  const audioFile = ref<File | null>(null)
  const audioUrl = ref<string>('')

  const hasImages = computed(() => allImages.value.length > 0)
  const hasAudio = computed(() => !!audioUrl.value)
  const canStart = computed(() => hasImages.value && hasAudio.value)

  // Get images for a specific round (1-indexed)
  function getImagesForRound(round: number): string[] {
    const startIdx = (round - 1) * CARD_COUNT
    return allImages.value.slice(startIdx, startIdx + CARD_COUNT)
  }

  // ============================================================================
  // IMAGE HANDLING
  // ============================================================================
  function handleImageFolder(event: Event) {
    const input = event.target as HTMLInputElement
    const files = input.files
    if (!files) return

    // Clear previous images
    allImages.value.forEach(url => URL.revokeObjectURL(url))
    allImages.value = []

    // Filter for image files and convert to blob URLs
    const imageFiles = Array.from(files).filter(file =>
      file.type.startsWith('image/')
    )

    if (imageFiles.length === 0) {
      alert('No image files found in the selected folder.')
      return
    }

    // Create blob URLs
    let loadedImages = imageFiles.map(file => URL.createObjectURL(file))

    // We need totalRounds * CARD_COUNT images
    const requiredImages = totalRounds.value * CARD_COUNT

    // Repeat images if not enough
    while (loadedImages.length < requiredImages) {
      loadedImages = [...loadedImages, ...loadedImages]
    }
    allImages.value = loadedImages.slice(0, requiredImages)
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
    allImages.value.forEach(url => URL.revokeObjectURL(url))
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
    // Computed
    hasImages,
    hasAudio,
    canStart,
    // Methods
    handleImageFolder,
    handleAudioFile,
    getImagesForRound,
    cleanup,
  }
}
