import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Brain, Moon, Sparkles, Zap, Eye, Heart } from 'lucide-react';
import { darkTheme } from '../../theme';
import LiquidGlassCard from '../common/LiquidGlassCard';

const FeaturesContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${darkTheme.spacing.xxl}px 10%;
  background: linear-gradient(
    180deg,
    rgba(11, 20, 38, 1) 0%,
    rgba(16, 24, 40, 0.98) 50%,
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
      ellipse at 70% 30%,
      rgba(16, 185, 129, 0.08) 0%,
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
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.xxl}px;
  text-align: left;
  
  background: linear-gradient(
    135deg, 
    rgba(248, 250, 252, 0.95) 0%, 
    rgba(16, 185, 129, 0.9) 100%
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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${darkTheme.spacing.xl}px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${darkTheme.spacing.lg}px;
  }
`;

const FeatureCard = styled(LiquidGlassCard)<{ $delay: number }>`
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out;
  transition-delay: ${props => props.$delay * 0.2}s;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(16, 185, 129, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${darkTheme.spacing.lg}px;
  transition: all 0.3s ease;
  
  svg {
    color: rgba(139, 92, 246, 0.9);
    transition: all 0.3s ease;
  }
  
  ${FeatureCard}:hover & {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(16, 185, 129, 0.4));
    transform: scale(1.1) rotate(5deg);
    
    svg {
      color: rgba(139, 92, 246, 1);
      transform: scale(1.1);
    }
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.md}px;
  line-height: 1.3;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: rgba(248, 250, 252, 0.7);
  line-height: 1.6;
  font-weight: 300;
`;

const features = [
  {
    icon: Brain,
    title: 'AI Dream Analysis',
    description: 'Advanced neural networks decode your dream patterns, revealing hidden meanings and psychological insights with unprecedented accuracy.'
  },
  {
    icon: Moon,
    title: 'Sleep Optimization',
    description: 'Personalized sleep cycles and REM enhancement techniques to maximize dream quality and lucidity potential.'
  },
  {
    icon: Sparkles,
    title: 'Lucid Dream Training',
    description: 'Progressive techniques and reality checks to achieve conscious dreaming states and explore your subconscious mind.'
  },
  {
    icon: Zap,
    title: 'Real-time Monitoring',
    description: 'Continuous sleep stage tracking with smart notifications for optimal dream recall and lucidity triggers.'
  },
  {
    icon: Eye,
    title: 'Dream Visualization',
    description: 'Transform your dreams into stunning visual narratives with AI-powered imagery and immersive storytelling.'
  },
  {
    icon: Heart,
    title: 'Community Insights',
    description: 'Connect with fellow dreamers, share experiences, and discover collective dream patterns and meanings.'
  }
];

const FeaturesSection: React.FC = () => {
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
    <FeaturesContainer ref={sectionRef} id="features">
      <ContentWrapper>
        <SectionTitle className="animate-element">
          Powerful Features
        </SectionTitle>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variant="feature"
              size="medium"
              $delay={index}
              className="animate-element"
            >
              <FeatureIcon>
                <feature.icon size={28} />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </ContentWrapper>
    </FeaturesContainer>
  );
};

export default FeaturesSection;