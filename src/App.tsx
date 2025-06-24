import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import DreamGuidesSection from './components/sections/DreamGuidesSection';
import PlatformsSection from './components/sections/PlatformsSection';
import WaitlistSection from './components/sections/WaitlistSection';
import Footer from './components/Footer';
import ThreeBackground from './components/background/ThreeBackground';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 10;
`;

function App() {
  return (
    <AppContainer>
      <ThreeBackground />
      <Header />
      <MainContent>
        <HeroSection />
        <FeaturesSection />
        <DreamGuidesSection />
        <PlatformsSection />
        <WaitlistSection />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;