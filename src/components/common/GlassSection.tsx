import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../../theme';

const Section = styled.section<{ $variant?: 'default' | 'darker' }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: ${darkTheme.spacing.xl}px 0;
  
  /* Liquid glass effect matching FormCard */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 
    0 0 30px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
`;

const Container = styled.div<{ $maxWidth?: 'small' | 'medium' | 'large' | 'full' }>`
  width: 100%;
  max-width: ${props => 
    props.$maxWidth === 'small' ? '800px' :
    props.$maxWidth === 'medium' ? '1200px' :
    props.$maxWidth === 'large' ? '1400px' :
    '100%'
  };
  margin: 0 auto;
  padding: ${darkTheme.spacing.xxl * 1.5}px ${darkTheme.spacing.xl}px;
  
  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.xl}px ${darkTheme.spacing.large}px;
  }
  
  @media (max-width: 480px) {
    padding: ${darkTheme.spacing.large}px ${darkTheme.spacing.medium}px;
  }
`;

interface GlassSectionProps {
  children: React.ReactNode;
  variant?: 'default' | 'darker';
  maxWidth?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
}

const GlassSection: React.FC<GlassSectionProps> = ({
  children,
  variant = 'default',
  maxWidth = 'medium',
  className
}) => {
  return (
    <Section $variant={variant} className={className}>
      <Container $maxWidth={maxWidth}>
        {children}
      </Container>
    </Section>
  );
};

export default GlassSection;