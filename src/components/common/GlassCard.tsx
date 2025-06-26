import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { darkTheme } from '../../theme';


const liquidShimmer = keyframes`
  0% { 
    background-position: -200% 0;
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% { 
    background-position: 200% 0;
    opacity: 0.3;
  }
`;

const Card = styled.div<{ 
  $size?: 'small' | 'medium' | 'large';
  $animated?: boolean;
}>`
  position: relative;
  overflow: hidden;
  border-radius: ${props => 
    props.$size === 'large' ? '32px' : 
    props.$size === 'medium' ? '24px' : '20px'
  };
  
  /* Subtle glass effect matching header */
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  /* Softer shadows */
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.05) inset;
  
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(139, 92, 246, 0.05),
      transparent
    );
    animation: ${css`${liquidShimmer}`} 6s ease-in-out infinite;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(139, 92, 246, 0.2);
    box-shadow: 
      0 4px 30px rgba(139, 92, 246, 0.15),
      0 1px 0 rgba(255, 255, 255, 0.08) inset;
  }
`;

const CardContent = styled.div<{ $padding?: 'small' | 'medium' | 'large' }>`
  padding: ${props => 
    props.$padding === 'large' ? `${darkTheme.spacing.xxl * 2}px` :
    props.$padding === 'medium' ? `${darkTheme.spacing.xxl * 1.5}px` :
    `${darkTheme.spacing.xl}px`
  };
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface GlassCardProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  padding?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  size = 'medium',
  padding = 'medium',
  animated = false,
  className,
  onClick
}) => {
  return (
    <Card 
      $size={size} 
      $animated={animated}
      className={className}
      onClick={onClick}
    >
      <CardContent $padding={padding}>
        {children}
      </CardContent>
    </Card>
  );
};

export default GlassCard;