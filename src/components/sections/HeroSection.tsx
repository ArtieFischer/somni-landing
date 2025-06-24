import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { darkTheme } from '../../theme';

const floatLogo1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -15px) rotate(2deg); }
  50% { transform: translate(-10px, -25px) rotate(-1deg); }
  75% { transform: translate(15px, -10px) rotate(1deg); }
`;

const floatLogo2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-25px, -20px) rotate(-2deg); }
  66% { transform: translate(20px, -30px) rotate(1deg); }
`;

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

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 10%;
  background: linear-gradient(
    135deg,
    rgba(11, 20, 38, 1) 0%,
    rgba(26, 35, 50, 0.95) 50%,
    rgba(11, 20, 38, 1) 100%
  );
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at 30% 50%,
      rgba(139, 92, 246, 0.1) 0%,
      transparent 50%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 0 5%;
  }
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  z-index: 2;
  position: relative;
`;

const MainTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  color: ${darkTheme.colors.text.primary};
  margin: 0 0 ${darkTheme.spacing.xl}px 0;
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
  
  animation: ${textGlow} 4s ease-in-out infinite;
  
  opacity: 0;
  transform: translateY(30px);
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  animation-name: fadeInUp, ${textGlow};
  animation-duration: 1s, 4s;
  animation-timing-function: ease-out, ease-in-out;
  animation-iteration-count: 1, infinite;
`;

const LogosContainer = styled.div`
  display: flex;
  gap: ${darkTheme.spacing.xl}px;
  align-items: center;
  margin-top: ${darkTheme.spacing.xxl}px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out 1s forwards;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${darkTheme.spacing.lg}px;
  }
`;

const LogoWrapper = styled.div<{ $animation: any }>`
  display: flex;
  align-items: center;
  gap: ${darkTheme.spacing.md}px;
  padding: ${darkTheme.spacing.md}px ${darkTheme.spacing.lg}px;
  
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  
  animation: ${props => props.$animation} 8s ease-in-out infinite;
  
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.3);
    transform: scale(1.05);
  }
`;

const LogoText = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: rgba(248, 250, 252, 0.8);
  letter-spacing: 0.05em;
`;

const CreatedBy = styled.span`
  font-size: 12px;
  color: rgba(248, 250, 252, 0.5);
  margin-right: ${darkTheme.spacing.sm}px;
`;

const BrandName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${darkTheme.colors.text.primary};
`;

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <HeroContainer ref={sectionRef} id="hero">
      <ContentWrapper>
        <MainTitle>
          Enhance your dreams
        </MainTitle>
        
        <LogosContainer>
          <LogoWrapper $animation={floatLogo1}>
            <CreatedBy>Created with</CreatedBy>
            <BrandName>Bolt</BrandName>
          </LogoWrapper>
          
          <LogoWrapper $animation={floatLogo2}>
            <CreatedBy>Powered by</CreatedBy>
            <BrandName>Eleven Labs</BrandName>
          </LogoWrapper>
        </LogosContainer>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection;