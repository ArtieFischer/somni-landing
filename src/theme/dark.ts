import { spacing } from './spacing';
import { typography } from './typography';
import { Theme } from './types';

export const darkTheme: Theme = {
  colors: {
    primary: '#8A4FFF', // Primary purple for buttons
    secondary: '#00FF9D', // Hover green effect
    accent: '#2A2A2A', // Base dark gray
    background: {
      primary: '#2A2A2A', // Base dark gray
      secondary: '#1A1A1A', // Darker variant
      elevated: '#333333', // Elevated surface
      overlay: 'rgba(42, 42, 42, 0.8)', // Frosted glass base
    },
    text: {
      primary: '#F5F5F5', // Light headers
      secondary: '#CCCCCC', // Secondary text
      inverse: '#2A2A2A', // Dark text on light backgrounds
      disabled: '#666666', // Disabled text
    },
    button: {
      primary: {
        background: '#8A4FFF', // Solid purple
        text: '#F5F5F5', // Light text
        border: '#8A4FFF',
      },
      secondary: {
        background: 'rgba(42, 42, 42, 0.8)',
        text: '#F5F5F5',
        border: 'rgba(245, 245, 245, 0.2)',
      },
      ghost: {
        background: 'transparent',
        text: '#CCCCCC',
        border: 'transparent',
      },
    },
    status: {
      error: '#FF6B6B',
      warning: '#FFD93D',
      success: '#00FF9D',
      info: '#4DABF7',
      recording: '#FF4757',
    },
    border: {
      primary: 'rgba(245, 245, 245, 0.1)',
      secondary: 'rgba(245, 245, 245, 0.2)',
      focus: '#00FF9D',
    },
  },
  spacing,
  typography,
  borderRadius: {
    small: 8,
    medium: 12,
    large: 16,
    round: 9999,
  },
  shadows: {
    small: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
    large: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 8,
    },
  },
};