import React from 'react';
import styled from 'styled-components';
import ThreeBackground from './components/ThreeBackground';
import Header from './components/Header';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';
import FloatingFeatures from './components/FloatingFeatures';
import { darkTheme } from './theme';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const MainContent = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${darkTheme.spacing.xl}px ${darkTheme.spacing.lg}px;
  position: relative;
  z-index: 10;
`;

const BlurOverlay = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(0.5px);
  z-index: 2; /* Between Three.js and floating features */
  pointer-events: none;
`;

function App() {
  return (
    <AppContainer>
      <ThreeBackground />
      <BlurOverlay />
      <FloatingFeatures />
      <Header />
      <MainContent>
        <WaitlistForm />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App;