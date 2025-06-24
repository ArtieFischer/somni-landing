import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Monitor, Smartphone, Watch, Zap } from 'lucide-react';
import { darkTheme } from '../../theme';
import LiquidGlassCard from '../common/LiquidGlassCard';

const connectLine = keyframes`
  0% { 
    stroke-dashoffset: 100;
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% { 
    stroke-dashoffset: 0;
    opacity: 0.3;
  }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }
  50% { 
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
  }
`;

const PlatformsContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${darkTheme.spacing.xxl}px 10%;
  background: linear-gradient(
    180deg,
    rgba(11, 20, 38, 1) 0%,
    rgba(15, 25, 42, 0.98) 50%,
    rgba(11, 20, 38, 1) 100%
  );
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at 50% 50%,
      rgba(139, 92, 246, 0.05) 0%,
      transparent 60%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.xxl}px 5%;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.lg}px;
  text-align: center;
  
  background: linear-gradient(
    135deg, 
    rgba(248, 250, 252, 0.95) 0%, 
    rgba(139, 92, 246, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(248, 250, 252, 0.6);
  margin-bottom: ${darkTheme.spacing.xxl}px;
  font-weight: 300;
  line-height: 1.6;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out 0.2s;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PlatformsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${darkTheme.spacing.xl}px;
  margin-bottom: ${darkTheme.spacing.xxl}px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${darkTheme.spacing.lg}px;
  }
`;

const PlatformCard = styled(LiquidGlassCard)<{ $delay: number }>`
  text-align: center;
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.$delay * 0.2}s;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const PlatformIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(16, 185, 129, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${darkTheme.spacing.lg}px;
  transition: all 0.4s ease;
  animation: ${pulseGlow} 3s ease-in-out infinite;
  
  svg {
    color: rgba(139, 92, 246, 0.9);
    transition: all 0.4s ease;
  }
  
  ${PlatformCard}:hover & {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(16, 185, 129, 0.4));
    transform: scale(1.1) rotate(5deg);
    animation-play-state: paused;
    box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
    
    svg {
      color: rgba(139, 92, 246, 1);
      transform: scale(1.2);
    }
  }
`;

const PlatformTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.sm}px;
  line-height: 1.3;
`;

const PlatformDescription = styled.p`
  font-size: 1rem;
  color: rgba(248, 250, 252, 0.7);
  line-height: 1.6;
  font-weight: 300;
  margin-bottom: ${darkTheme.spacing.lg}px;
`;

const PlatformFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    font-size: 0.9rem;
    color: rgba(248, 250, 252, 0.6);
    margin-bottom: ${darkTheme.spacing.xs}px;
    position: relative;
    padding-left: ${darkTheme.spacing.lg}px;
    
    &::before {
      content: '✦';
      position: absolute;
      left: 0;
      color: rgba(139, 92, 246, 0.7);
    }
  }
`;

const UnifiedAccessCard = styled(LiquidGlassCard)`
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(16, 185, 129, 0.1) 100%
  );
  border: 1px solid rgba(139, 92, 246, 0.3);
  
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out 0.6s;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const UnifiedIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(16, 185, 129, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${darkTheme.spacing.lg}px;
  
  svg {
    color: rgba(139, 92, 246, 1);
  }
`;

const UnifiedTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.md}px;
  
  background: linear-gradient(
    135deg, 
    rgba(139, 92, 246, 0.9) 0%, 
    rgba(16, 185, 129, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const UnifiedDescription = styled.p`
  font-size: 1.1rem;
  color: rgba(248, 250, 252, 0.8);
  line-height: 1.6;
  font-weight: 300;
`;

const platforms = [
  {
    icon: Monitor,
    title: 'Web Platform',
    description: 'Full-featured desktop experience with advanced analytics and comprehensive dream journaling.',
    features: [
      'Advanced dream analysis dashboard',
      'Detailed sleep pattern visualization',
      'Community dream sharing',
      'Export and backup capabilities'
    ]
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Capture dreams instantly with voice recording and quick note-taking on the go.',
    features: [
      'Voice-to-text dream recording',
      'Push notifications for dream recall',
      'Offline dream journaling',
      'Quick reality check reminders'
    ]
  },
  {
    icon: Watch,
    title: 'Wearable Integration',
    description: 'Seamless sleep tracking with smart wake-up calls during optimal dream phases.',
    features: [
      'Real-time sleep stage monitoring',
      'Smart lucid dream triggers',
      'Heart rate variability tracking',
      'Silent vibration alerts'
    ]
  }
];

const PlatformsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-element');
            elements.forEach((el) => el.classList.add('animate-in'));
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
    <PlatformsContainer ref={sectionRef} id="platforms">
      <ContentWrapper>
        <SectionTitle className="animate-element">
          Available Everywhere
        </SectionTitle>
        
        <SectionSubtitle className="animate-element">
          Experience seamless dream enhancement across all your devices with synchronized data and unified access.
        </SectionSubtitle>
        
        <PlatformsGrid>
          {platforms.map((platform, index) => (
            <PlatformCard
              key={index}
              variant="platform"
              size="medium"
              $delay={index}
              className="animate-element"
            >
              <PlatformIcon>
                <platform.icon size={36} />
              </PlatformIcon>
              <PlatformTitle>{platform.title}</PlatformTitle>
              <PlatformDescription>{platform.description}</PlatformDescription>
              <PlatformFeatures>
                {platform.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </PlatformFeatures>
            </PlatformCard>
          ))}
        </PlatformsGrid>
        
        <UnifiedAccessCard size="large" className="animate-element">
          <UnifiedIcon>
            <Zap size={28} />
          </UnifiedIcon>
          <UnifiedTitle>One Account, All Platforms</UnifiedTitle>
          <UnifiedDescription>
            Your dreams, insights, and progress sync seamlessly across all devices. 
            Start on your phone, continue on your computer, and track with your wearable - 
            all with a single account and unified experience.
          </UnifiedDescription>
        </UnifiedAccessCard>
      </ContentWrapper>
    </PlatformsContainer>
  );
};

export default PlatformsSection;