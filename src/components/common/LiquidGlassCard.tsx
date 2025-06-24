import React from 'react';
import styled, { keyframes } from 'styled-components';
import { darkTheme } from '../../theme';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
`;

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

const liquidHover = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.02) rotate(0.5deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const Card = styled.div<{ 
  $variant?: 'default' | 'feature' | 'guide' | 'platform'; 
  $size?: 'small' | 'medium' | 'large';
  $animated?: boolean;
}>`
  position: relative;
  overflow: hidden;
  border-radius: ${props => 
    props.$size === 'large' ? '32px' : 
    props.$size === 'medium' ? '24px' : '20px'
  };
  
  /* Glass-morphic effect */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* Enhanced shadows for depth */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1) inset,
    0 -1px 0 rgba(0, 0, 0, 0.2) inset;
  
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  ${props => props.$animated && `
    animation: ${float} 6s ease-in-out infinite;
  `}

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
      rgba(139, 92, 246, 0.1),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(15px) saturate(200%);
    border: 1px solid rgba(139, 92, 246, 0.3);
    box-shadow: 
      0 16px 64px rgba(139, 92, 246, 0.2),
      0 1px 0 rgba(255, 255, 255, 0.2) inset;
    animation: ${liquidHover} 0.6s ease-in-out;
  }

  &:hover::before {
    left: 100%;
  }
`;

const CardContent = styled.div<{ $padding?: 'small' | 'medium' | 'large' }>`
  padding: ${props => 
    props.$padding === 'large' ? `${darkTheme.spacing.xxl}px` :
    props.$padding === 'medium' ? `${darkTheme.spacing.xl}px` :
    `${darkTheme.spacing.lg}px`
  };
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface LiquidGlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'feature' | 'guide' | 'platform';
  size?: 'small' | 'medium' | 'large';
  padding?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  padding = 'medium',
  animated = false,
  className,
  onClick
}) => {
  return (
    <Card 
      $variant={variant} 
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

export default LiquidGlassCard;