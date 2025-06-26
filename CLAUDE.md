# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on http://localhost:5173
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

### Dependencies
- `npm install` - Install all dependencies
- `npm update` - Update dependencies

## Architecture Overview

This is a React + TypeScript landing page for Somni, a dream enhancement application. The codebase uses modern web technologies with a focus on visual effects and 3D graphics.

### Technology Stack
- **React 18.3.1** with TypeScript 5.5.3
- **Vite** for fast development and building
- **Styled-components** for component styling + **Tailwind CSS** for utilities
- **Three.js** for 3D background effects with custom WebGL shaders
- **GSAP** for animations

### Key Architectural Decisions

1. **Hybrid Styling Approach**: 
   - Styled-components for component-specific styles with theme integration
   - Tailwind CSS for utility classes and rapid prototyping
   - Custom theme system in `src/theme/` with comprehensive design tokens

2. **3D Background System**:
   - `ThreeBackground.tsx` implements complex WebGL effects including:
     - Custom cloth simulation shader (`src/shaders/clothShader.ts`)
     - Particle systems with physics
     - Post-processing effects (bloom)
     - Floating geometric shapes and text meshes
   - Performance optimized with requestAnimationFrame and proper cleanup

3. **Component Structure**:
   - `src/components/common/` - Reusable components (FormCard, GlassCard)
   - `src/components/sections/` - Page sections (Hero, Features, About, Testimonials)
   - Components use TypeScript interfaces for props

4. **Theme System** (`src/theme/index.ts`):
   - Comprehensive dark theme with purple/teal color scheme
   - Typography scale, spacing system, shadows, and animations
   - Responsive breakpoints for mobile-first design

### Important Patterns

1. **Form Handling**: FormCard component handles email collection with validation
2. **Responsive Design**: Mobile-first approach using theme breakpoints
3. **3D Performance**: Three.js setup uses proper disposal patterns to prevent memory leaks
4. **Type Safety**: Strict TypeScript configuration with proper type definitions

### Development Notes

- No testing framework is currently set up
- ESLint is configured but no Prettier formatting
- The app is a static landing page with no backend integration
- All text content is hardcoded (no i18n system)