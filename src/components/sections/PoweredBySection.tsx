import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../../theme';

const Section = styled.section`
  width: 100%;
  padding: ${darkTheme.spacing.xxl * 2}px ${darkTheme.spacing.xl}px;
  margin: ${darkTheme.spacing.xl}px 0;
  
  /* Liquid glass effect matching header */
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  box-shadow: 
    0 0 30px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: rgba(248, 250, 252, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 ${darkTheme.spacing.xl}px 0;
`;

const LogoGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${darkTheme.spacing.xxl}px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: ${darkTheme.spacing.xl}px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${darkTheme.spacing.medium}px ${darkTheme.spacing.large}px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.15);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
  }
`;

const LogoText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: rgba(248, 250, 252, 0.8);
  letter-spacing: -0.02em;
`;

// Placeholder logos - replace with actual tech stack
const technologies = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Three.js', color: '#8B5CF6' },
  { name: 'TypeScript', color: '#3178C6' },
];

const PoweredBySection: React.FC = () => {
  return (
    <Section>
      <Container>
        <Title>Powered By</Title>
        <LogoGrid>
          {technologies.map((tech) => (
            <LogoWrapper key={tech.name}>
              <LogoText style={{ color: tech.color }}>{tech.name}</LogoText>
            </LogoWrapper>
          ))}
        </LogoGrid>
      </Container>
    </Section>
  );
};

export default PoweredBySection;