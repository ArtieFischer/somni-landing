import React from 'react';
import styled, { css } from 'styled-components';
import { darkTheme } from '../../theme';

const ButtonBase = styled.button<{ 
  $variant?: 'primary' | 'secondary' | 'ghost';
  $size?: 'small' | 'medium' | 'large';
  $fullWidth?: boolean;
  $isLoading?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${darkTheme.spacing.sm}px;
  position: relative;
  overflow: hidden;
  
  /* Size variations */
  padding: ${props => 
    props.$size === 'large' ? '20px 40px' :
    props.$size === 'small' ? '12px 24px' :
    '16px 32px'
  };
  
  font-size: ${props => 
    props.$size === 'large' ? '18px' :
    props.$size === 'small' ? '14px' :
    '16px'
  };
  
  /* Base styles */
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  border-radius: 16px;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  letter-spacing: 0.02em;
  text-transform: uppercase;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* Primary variant - gradient with glass effect */
  ${props => props.$variant === 'primary' && css`
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(167, 139, 250, 0.9) 100%);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 
      0 8px 32px rgba(139, 92, 246, 0.3),
      0 1px 0 rgba(255, 255, 255, 0.2) inset,
      0 -1px 0 rgba(0, 0, 0, 0.1) inset;
    
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
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.6s ease;
    }
    
    &:hover:not(:disabled) {
      box-shadow: 
        0 8px 32px rgba(139, 92, 246, 0.4),
        0 1px 0 rgba(255, 255, 255, 0.3) inset,
        0 -1px 0 rgba(0, 0, 0, 0.1) inset;
      background: linear-gradient(135deg, rgba(139, 92, 246, 1) 0%, rgba(167, 139, 250, 1) 100%);
      
      &::before {
        left: 100%;
      }
    }
    
    &:active {
      opacity: 0.95;
    }
  `}
  
  /* Secondary variant - glass effect only */
  ${props => props.$variant === 'secondary' && css`
    background: rgba(255, 255, 255, 0.08);
    color: ${darkTheme.colors.text.primary};
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px) saturate(150%);
    box-shadow: 
      0 4px 16px rgba(0, 0, 0, 0.2),
      0 1px 0 rgba(255, 255, 255, 0.1) inset;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(139, 92, 246, 0.3);
      box-shadow: 
        0 4px 20px rgba(139, 92, 246, 0.3),
        0 1px 0 rgba(255, 255, 255, 0.15) inset;
    }
    
    &:active {
      opacity: 0.95;
    }
  `}
  
  /* Ghost variant - minimal style */
  ${props => props.$variant === 'ghost' && css`
    background: transparent;
    color: ${darkTheme.colors.text.primary};
    border: 1px solid transparent;
    box-shadow: none;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `}
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <ButtonBase
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

export default Button;