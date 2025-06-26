import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';

// Lazy load Three.js background
const ThreeBackground = lazy(() => import('./components/ThreeBackground'));
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PoweredBySection from './components/sections/PoweredBySection';
import GuidesSection from './components/sections/GuidesSection';
import PlatformsSection from './components/sections/PlatformsSection';
import FormSection from './components/sections/FormSection';
import Footer from './components/Footer';
import FloatingFeatures from './components/FloatingFeatures';
import { darkTheme } from './theme';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: radial-gradient(ellipse at center, #0B1426 0%, #000000 100%);
`;

const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${darkTheme.spacing.lg}px;
  position: relative;
  z-index: 10;
  gap: ${darkTheme.spacing.xxl}px;

  @media (max-width: 768px) {
    gap: ${darkTheme.spacing.xl}px;
    padding: 0 ${darkTheme.spacing.md}px;
  }
`;


const BlurOverlay = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(0.5px);
  z-index: 2;
  pointer-events: none;
  display: none; /* Temporarily disable blur overlay */
`;

function App() {
  return (
    <AppContainer>
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      <BlurOverlay />
      <FloatingFeatures />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Header />
        
        <HeroContainer>
          <HeroSection />
        </HeroContainer>
        
        <PoweredBySection />
        <GuidesSection />
        <PlatformsSection />
        <FormSection />
        <Footer />
      </div>
    </AppContainer>
  );
}

export default App;