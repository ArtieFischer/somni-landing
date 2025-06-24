import React from 'react';
import styled from 'styled-components';
import { Brain, Moon, Sparkles, Zap } from 'lucide-react';
import { darkTheme } from '../../theme';
import GlassCard from '../common/GlassCard';

const SectionContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${darkTheme.spacing.xxl}px 5%;
  background: linear-gradient(
    180deg,
    rgba(11, 20, 38, 0.95) 0%,
    rgba(16, 24, 40, 0.98) 50%,
    rgba(11, 20, 38, 0.95) 100%
  );
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
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
`;

const SectionDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.7);
  text-align: center;
  margin-bottom: ${darkTheme.spacing.xxl}px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${darkTheme.spacing.xl}px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${darkTheme.spacing.lg}px;
  }
`;

const FeatureCard = styled(GlassCard)`
  text-align: center;
  height: 100%;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(16, 185, 129, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${darkTheme.spacing.lg}px;
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
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.md}px;
  line-height: 1.3;
`;

const FeatureDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.7);
  line-height: 1.6;
  margin: 0;
`;

const features = [
  {
    icon: Brain,
    title: 'AI Dream Analysis',
    description: 'Advanced neural networks decode your dream patterns, revealing hidden meanings and psychological insights.'
  },
  {
    icon: Moon,
    title: 'Sleep Optimization',
    description: 'Personalized sleep cycles and REM enhancement techniques to maximize dream quality and lucidity.'
  },
  {
    icon: Sparkles,
    title: 'Lucid Dream Training',
    description: 'Progressive techniques and reality checks to achieve conscious dreaming states and explore your mind.'
  },
  {
    icon: Zap,
    title: 'Real-time Monitoring',
    description: 'Continuous sleep stage tracking with smart notifications for optimal dream recall and lucidity triggers.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <SectionContainer id="features">
      <ContentWrapper>
        <SectionTitle>Powerful Features</SectionTitle>
        <SectionDescription>
          Discover the tools that will transform your relationship with sleep and dreams through cutting-edge technology.
        </SectionDescription>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index} size="medium" padding="large">
              <FeatureIcon>
                <feature.icon size={28} />
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default FeaturesSection;