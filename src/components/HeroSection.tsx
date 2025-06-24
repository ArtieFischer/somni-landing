import React from 'react';
import styled, { keyframes } from 'styled-components';
import { darkTheme } from '../theme';

const textGlow = keyframes`
  0%, 100% { 
    text-shadow: 
      0 0 20px rgba(139, 92, 246, 0.5),
      0 0 40px rgba(139, 92, 246, 0.3),
      0 0 60px rgba(16, 185, 129, 0.2);
  }
  50% { 
    text-shadow: 
      0 0 30px rgba(139, 92, 246, 0.7),
      0 0 60px rgba(139, 92, 246, 0.5),
      0 0 90px rgba(16, 185, 129, 0.3);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${darkTheme.spacing.xl}px ${darkTheme.spacing.lg}px;
  text-align: center;
  position: relative;
  z-index: 10;
  gap: ${darkTheme.spacing.xxl}px;

  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.lg}px ${darkTheme.spacing.md}px;
    gap: ${darkTheme.spacing.xl}px;
  }
`;

const MainTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  color: ${darkTheme.colors.text.primary};
  margin: 0;
  line-height: 1.1;
  letter-spacing: 0.02em;
  
  background: linear-gradient(
    135deg, 
    rgba(248, 250, 252, 0.95) 0%, 
    rgba(139, 92, 246, 0.9) 50%,
    rgba(16, 185, 129, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  animation: ${textGlow} 4s ease-in-out infinite, ${fadeInUp} 1s ease-out;
`;

const Subtitle = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 400;
  color: rgba(248, 250, 252, 0.8);
  margin: 0;
  line-height: 1.4;
  letter-spacing: 0.01em;
  max-width: 600px;
  
  animation: ${fadeInUp} 1s ease-out 0.3s both;
  
  @media (max-width: 768px) {
    max-width: 400px;
  }
`;

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <div>
        <MainTitle>Enhance your dreams</MainTitle>
        <Subtitle>
          What AI will never replace is your ability to dream
        </Subtitle>
      </div>
    </HeroContainer>
  );
};

export default HeroSection;