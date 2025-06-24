import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { darkTheme } from '../../theme';
import LiquidGlassCard from '../common/LiquidGlassCard';

const GuidesContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${darkTheme.spacing.xxl}px 10%;
  background: linear-gradient(
    180deg,
    rgba(11, 20, 38, 1) 0%,
    rgba(20, 30, 48, 0.98) 50%,
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
      ellipse at 20% 70%,
      rgba(167, 139, 250, 0.08) 0%,
      transparent 50%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.xxl}px 5%;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.lg}px;
  text-align: left;
  
  background: linear-gradient(
    135deg, 
    rgba(248, 250, 252, 0.95) 0%, 
    rgba(167, 139, 250, 0.9) 100%
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
  max-width: 600px;
  
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out 0.2s;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GuidesScrollContainer = styled.div`
  overflow-x: auto;
  padding-bottom: ${darkTheme.spacing.lg}px;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 4px;
  }
`;

const GuidesGrid = styled.div`
  display: flex;
  gap: ${darkTheme.spacing.xl}px;
  min-width: max-content;
  padding: ${darkTheme.spacing.md}px 0;
  
  @media (max-width: 768px) {
    gap: ${darkTheme.spacing.lg}px;
  }
`;

const GuideCard = styled(LiquidGlassCard)<{ $delay: number; $direction: 'left' | 'right' }>`
  min-width: 320px;
  height: 480px;
  opacity: 0;
  transform: ${props => props.$direction === 'left' ? 'translateX(-60px)' : 'translateX(60px)'};
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.$delay * 0.3}s;
  
  &.animate-in {
    opacity: 1;
    transform: translateX(0);
  }
  
  @media (max-width: 768px) {
    min-width: 280px;
    height: 420px;
  }
`;

const GuideImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.2) 0%,
    rgba(16, 185, 129, 0.2) 50%,
    rgba(167, 139, 250, 0.2) 100%
  );
  border-radius: 16px;
  margin-bottom: ${darkTheme.spacing.lg}px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    backdrop-filter: blur(10px);
  }
  
  &::after {
    content: '📸';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    opacity: 0.6;
  }
  
  transition: all 0.3s ease;
  
  ${GuideCard}:hover & {
    transform: scale(1.05);
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.3) 0%,
      rgba(16, 185, 129, 0.3) 50%,
      rgba(167, 139, 250, 0.3) 100%
    );
  }
`;

const GuideTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.sm}px;
  line-height: 1.3;
`;

const GuideMethod = styled.span`
  display: inline-block;
  padding: ${darkTheme.spacing.xs}px ${darkTheme.spacing.sm}px;
  background: rgba(139, 92, 246, 0.2);
  color: rgba(139, 92, 246, 0.9);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: ${darkTheme.spacing.md}px;
  letter-spacing: 0.05em;
`;

const GuideDescription = styled.p`
  font-size: 0.95rem;
  color: rgba(248, 250, 252, 0.7);
  line-height: 1.6;
  font-weight: 300;
  flex: 1;
`;

const guides = [
  {
    title: 'Jungian Analysis',
    method: 'Archetypal Interpretation',
    description: 'Explore the collective unconscious through archetypal symbols and personal mythology. Discover how universal patterns manifest in your unique dream landscape.'
  },
  {
    title: 'Cognitive Behavioral',
    method: 'Pattern Recognition',
    description: 'Identify recurring themes and emotional patterns in your dreams. Transform negative dream experiences into positive psychological insights and behavioral changes.'
  },
  {
    title: 'Lucid Dreaming',
    method: 'Consciousness Training',
    description: 'Master the art of conscious dreaming through reality checks, dream journals, and meditation techniques. Take control of your dream narrative and explore limitless possibilities.'
  },
  {
    title: 'Neuroscientific',
    method: 'Brain Wave Analysis',
    description: 'Understand your dreams through the lens of modern neuroscience. Analyze REM patterns, memory consolidation, and the neurological basis of dream formation.'
  }
];

const DreamGuidesSection: React.FC = () => {
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
    <GuidesContainer ref={sectionRef} id="guides">
      <ContentWrapper>
        <SectionTitle className="animate-element">
          Dream Analysis Methods
        </SectionTitle>
        
        <SectionSubtitle className="animate-element">
          Choose from four distinct approaches to understanding your dreams, each offering unique insights into your subconscious mind.
        </SectionSubtitle>
        
        <GuidesScrollContainer>
          <GuidesGrid>
            {guides.map((guide, index) => (
              <GuideCard
                key={index}
                variant="guide"
                size="medium"
                $delay={index}
                $direction={index % 2 === 0 ? 'left' : 'right'}
                className="animate-element"
              >
                <GuideImagePlaceholder />
                <GuideMethod>{guide.method}</GuideMethod>
                <GuideTitle>{guide.title}</GuideTitle>
                <GuideDescription>{guide.description}</GuideDescription>
              </GuideCard>
            ))}
          </GuidesGrid>
        </GuidesScrollContainer>
      </ContentWrapper>
    </GuidesContainer>
  );
};

export default DreamGuidesSection;