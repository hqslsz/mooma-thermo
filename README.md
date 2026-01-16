
<p align="center">
  <img src="https://img.shields.io/badge/A%20beat--synchronized%20memory%20card%20game%20with%20cyberpunk%20neon%20aesthetics-bf00ff?style=for-the-badge" alt="Description">
</p>
<p align="center">
  <img src="src/assets/Mooma-logo.png" alt="Mooma Logo" width="500">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js" alt="Vue">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=flat-square&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?style=flat-square&logo=tailwindcss" alt="TailwindCSS">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

---

## 📖 About

A rhythm-based memory game where players memorize and recall images on cards following the music beat. The game uses a **16-beat cycle mechanism**:

- **Reveal Phase (Beat 0-7)**: 8 cards flip open one by one to show images
- **Scan Phase (Beat 8-15)**: Cards flip back, highlighted sequentially for players to recall each card's content

## ✨ Features

### Core Gameplay
- 🎵 **16-Beat Cycle Engine** - Reveal + Scan dual-phase loop
- 🔄 **Multi-Round Games** - Configurable rounds with auto-loop playback
- 🎲 **Dual Game Modes**
  - **Standard Mode**: Display images in file order
  - **Random Mode**: Randomly select 8 unique images per round (Fisher-Yates shuffle algorithm)

### Customization
- ⚡ **BPM Configuration** - Customize music tempo
- ⏱️ **Audio Offset** - Precise music-to-beat synchronization
- 🔢 **Round Settings** - Set custom game rounds

### UI & Experience
- 🌈 **Cyberpunk Neon UI** - Stunning visual effects
- 📊 **Real-time Progress Bar** - Shows current beat position
- 🎯 **Smooth Card Flip Animations** - Optimized transitions without flickering
- 👁️ **UI Toggle** - Press H to hide/show control buttons

## 🎹 Keyboard Shortcuts

| Key | Function |
|-----|----------|
| `Space` | Play/Pause |
| `Escape` | Exit Game |
| `H` | Hide/Show UI (EXIT button, PLAY button, bottom hints) |

## 🚀 Quick Start

### Requirements

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Quasi2317/mwzzwdjs.git
cd mwzzwdjs

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Production build
npm run build

# Preview build
npm run preview
```

## 🎯 How to Play

1. **Select Image Folder** - Click "IMAGE FOLDER" to choose a folder containing images
2. **Select Audio File** - Click "AUDIO FILE" to choose background music (MP3 supported)
3. **Configure Advanced Settings** (Optional)
   - Adjust BPM to match your music
   - Set audio offset for precise sync
   - Choose number of rounds
   - Select game mode (Standard/Random)
4. **Start Game** - Click "PLAY" button

## 🏗️ Project Structure

```
src/
├── assets/
│   └── Mooma-logo.jpg          # Project logo
├── components/
│   ├── game/
│   │   ├── GameGrid.vue        # Card grid component
│   │   ├── GameProgressBar.vue # Progress bar component
│   │   └── GameTopBar.vue      # Top bar controls
│   ├── setup/
│   │   ├── AdvancedSettings.vue # Advanced settings panel
│   │   └── FileInput.vue       # File selection component
│   ├── FinishedScreen.vue      # Game finished screen
│   ├── GameCard.vue            # Single card component
│   ├── GameScreen.vue          # Game screen
│   ├── SetupScreen.vue         # Setup screen
│   └── index.ts
├── composables/
│   ├── useAssetLoader.ts       # Asset loading logic
│   ├── useGameEngine.ts        # Core game engine
│   ├── useImageSelector.ts     # Image selection (shuffle algorithm)
│   └── index.ts
├── App.vue                     # App entry component
├── constants.ts                # Game constants
├── types.ts                    # TypeScript definitions
├── style.css                   # Global styles (cyberpunk theme)
└── main.ts                     # App entry point
```

## 🎨 Tech Stack

- **Vue 3** - Composition API + `<script setup>`
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS 4** - Atomic CSS
- **Modular Architecture** - Composables design pattern

## 📝 Changelog

### v1.0.1
- ✅ Added game finished screen with delayed transition
- ✅ Added finish delay setting (customizable in OPTIONS)
- ✅ Game now stops at max rounds instead of looping

### v1.0.0
- ✅ Implemented 16-beat cycle game engine (reveal + scan phases)
- ✅ Multi-round game support with configurable rounds
- ✅ Cyberpunk neon-style UI
- ✅ Image folder and audio file selection
- ✅ Advanced settings (BPM, audio offset, rounds)
- ✅ Fixed image flickering on round transitions
- ✅ Optimized top bar button layout
- ✅ Added random mode (Fisher-Yates shuffle algorithm)
- ✅ Added H key to toggle UI visibility

## 📄 License

[MIT License](LICENSE) © 2026 Quasi2317
