import { CARD_COUNT } from '../constants'
import type { GameMode } from '../types'

// ============================================================================
// Image Selector - Strategy for selecting images based on game mode
// ============================================================================

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Get images for a round based on game mode
 * @param allImages - All available images
 * @param round - Current round (1-indexed)
 * @param mode - Game mode ('standard' or 'random')
 * @returns Array of image URLs for the round
 */
export function getImagesForRoundByMode(
  allImages: string[],
  round: number,
  mode: GameMode,
): string[] {
  if (allImages.length === 0) return []

  if (mode === 'standard') {
    // Standard mode: sequential selection based on round
    const startIdx = (round - 1) * CARD_COUNT
    return allImages.slice(startIdx, startIdx + CARD_COUNT)
  }

  // Random mode: randomly select CARD_COUNT images
  // If we have fewer images than CARD_COUNT, allow duplicates
  if (allImages.length <= CARD_COUNT) {
    // Not enough images, fill with random duplicates
    const result: string[] = []
    const shuffled = shuffleArray(allImages)

    // First, add all unique images
    result.push(...shuffled)

    // Fill remaining slots with random picks
    while (result.length < CARD_COUNT) {
      const randomIdx = Math.floor(Math.random() * allImages.length)
      result.push(allImages[randomIdx])
    }

    // Shuffle the final result so duplicates aren't at the end
    return shuffleArray(result)
  }

  // Enough images: select CARD_COUNT unique random images
  const shuffled = shuffleArray(allImages)
  return shuffled.slice(0, CARD_COUNT)
}
