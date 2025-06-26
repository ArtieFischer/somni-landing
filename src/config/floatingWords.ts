// Configuration for all floating text animations across the site

// Words for Three.js 3D floating text (FloatingTextMeshes component)
export const threeDWords = [
  'TRANSCENDENCE',
  'LUCIDITY',
  'CONSCIOUSNESS',
  'ETHEREAL',
  'AWAKENING',
  'INFINITE',
  'SERENITY',
  'ENLIGHTENMENT',
];

// Words for 2D CSS floating text (FloatingFeatures component)
export const cssFloatingWords = [
  // Large text
  { text: 'TRANSCENDENCE', size: 'large' },
  { text: 'UNCONSCIOUSNESS', size: 'large' },
  { text: 'NEUROPLASTICITY', size: 'large' },
  { text: 'REM CYCLES', size: 'large' },
  { text: 'SYNCHRONICITY', size: 'large' },
  
  // Medium text
  { text: 'Dream Yoga', size: 'medium' },
  { text: 'Sleep Architecture', size: 'medium' },
  { text: 'Mindfulness', size: 'medium' },
  { text: 'Deep Meditation', size: 'medium' },
  
  // Small text
  { text: 'Subliminal Depths', size: 'small' },
  { text: 'Theta Resonance', size: 'small' },
  { text: 'Alpha Waves', size: 'small' },
  { text: 'Inner Vision', size: 'small' },
  { text: 'Astral Projection', size: 'small' },
  { text: 'Dream Recall', size: 'small' },
  { text: 'Circadian Rhythm', size: 'small' },
];

// Type definitions
export type WordSize = 'large' | 'medium' | 'small';
export interface FloatingWord {
  text: string;
  size: WordSize;
}

// Additional words you might want to use:
// 'OMNISCIENCE', 'DREAMS', 'SUBCONSCIOUS', 'MEDITATION',
// 'CLARITY', 'WISDOM', 'HARMONY', 'PEACEFUL', 'VISIONARY',
// 'Delta Waves', 'Hypnagogic State', 'Oneironautics',
// 'Quantum Dreams', 'Cosmic Consciousness', 'Soul Journey'