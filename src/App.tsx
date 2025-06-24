import React from 'react';
import styled from 'styled-components';
import ThreeBackground from './components/ThreeBackground';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FormCard from './components/common/FormCard';
import FeaturesSection from './components/sections/FeaturesSection';
import AboutSection from './components/sections/AboutSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import Footer from './components/Footer';
import FloatingFeatures from './components/FloatingFeatures';
import { darkTheme } from './theme';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
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
`;

const MainContent = styled.main`
  position: relative;
  z-index: 10;
`;

function App() {
  return (
    <AppContainer>
      <ThreeBackground />
      <BlurOverlay />
      <FloatingFeatures />
      <Header />
      
      <HeroContainer>
        <HeroSection />
        <FormCard 
          title="Join the Dream Revolution"
          description="Be among the first to experience the future of dream enhancement and unlock your subconscious potential."
          placeholder="Enter your email address"
          buttonText="Join Waitlist"
          successMessage="Welcome to the dream collective. Check your email for next steps."
        />
      </HeroContainer>
      
      <MainContent>
        <FeaturesSection />
        <AboutSection />
        <TestimonialsSection />
      </MainContent>
      
      <Footer />
    </AppContainer>
  );
}

export default App;