import React from 'react';
import styled from 'styled-components';
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
    rgba(20, 30, 48, 0.98) 50%,
    rgba(11, 20, 38, 0.95) 100%
  );
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
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
    rgba(16, 185, 129, 0.9) 100%
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

const AboutCard = styled(GlassCard)`
  text-align: left;
`;

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${darkTheme.spacing.xl}px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${darkTheme.spacing.lg}px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.md}px;
  line-height: 1.3;
`;

const ColumnText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.7);
  line-height: 1.6;
  margin: 0;
`;

const AboutSection: React.FC = () => {
  return (
    <SectionContainer id="about">
      <ContentWrapper>
        <SectionTitle>About Somni</SectionTitle>
        <SectionDescription>
          We believe that dreams are the gateway to understanding our deepest selves and unlocking human potential.
        </SectionDescription>
        
        <AboutCard size="large" padding="large">
          <ColumnsContainer>
            <Column>
              <ColumnTitle>Our Mission</ColumnTitle>
              <ColumnText>
                To democratize dream enhancement and make the profound insights of sleep accessible to everyone. 
                We combine cutting-edge neuroscience with ancient wisdom to create tools that help you explore 
                the limitless landscape of your subconscious mind.
              </ColumnText>
            </Column>
            
            <Column>
              <ColumnTitle>The Science</ColumnTitle>
              <ColumnText>
                Our platform leverages advanced AI algorithms trained on decades of sleep research and dream analysis. 
                By monitoring your sleep patterns and analyzing dream content, we provide personalized insights 
                that help you achieve lucidity and deeper self-understanding.
              </ColumnText>
            </Column>
            
            <Column>
              <ColumnTitle>Your Journey</ColumnTitle>
              <ColumnText>
                Every dream is a unique window into your psyche. Our tools help you remember, analyze, and learn 
                from your dreams while developing the skills for lucid dreaming. Join thousands of dreamers 
                who have transformed their sleep into a powerful tool for growth.
              </ColumnText>
            </Column>
          </ColumnsContainer>
        </AboutCard>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default AboutSection;