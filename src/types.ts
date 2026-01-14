// ============================================================================
// Game Types
// ============================================================================

export type GamePhase = 'reveal' | 'scan'

export type GameState = 'setup' | 'playing'

// ============================================================================
// Component Props Types
// ============================================================================

export interface GameSettings {
  bpm: number
  audioOffset: number
  totalRounds: number
}

export interface GameStatus {
  currentPhase: GamePhase
  displayPhase: string
  displayBeat: number
  progressPercent: number
  currentRound: number
  isPlaying: boolean
}

