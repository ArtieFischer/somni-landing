import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../theme';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: ${darkTheme.spacing.lg}px ${darkTheme.spacing.xl}px;

  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.md}px ${darkTheme.spacing.lg}px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${darkTheme.spacing.md}px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: ${darkTheme.spacing.sm}px ${darkTheme.spacing.md}px;
  border-radius: 16px;
  
  /* Subtle floating effect */
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(30px) saturate(150%);
    border: 1px solid rgba(139, 92, 246, 0.2);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15);
  }

  @media (max-width: 480px) {
    gap: ${darkTheme.spacing.sm}px;
    padding: ${darkTheme.spacing.xs}px ${darkTheme.spacing.sm}px;
  }
`;

const LogoSignature = styled.img`
  height: 28px;
  width: auto;
  filter: brightness(1.1) saturate(1.1);
  opacity: 0.95;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${Logo}:hover & {
    transform: scale(1.05);
    filter: brightness(1.3) saturate(1.3);
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 24px;
  }

  @media (max-width: 480px) {
    height: 20px;
  }
`;

const LogoText = styled.img`
  height: 18px;
  width: auto;
  filter: brightness(1.1) saturate(1.1);
  opacity: 0.9;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${Logo}:hover & {
    transform: scale(1.05);
    filter: brightness(1.3) saturate(1.3);
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 16px;
  }

  @media (max-width: 480px) {
    height: 14px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${darkTheme.spacing.sm}px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: rgba(248, 250, 252, 0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 300;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  letter-spacing: 0.05em;
  padding: ${darkTheme.spacing.sm}px ${darkTheme.spacing.md}px;
  border-radius: 12px;
  
  /* Floating glass effect */
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.03);

  &:hover {
    color: rgba(139, 92, 246, 0.9);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(30px) saturate(150%);
    border: 1px solid rgba(139, 92, 246, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(139, 92, 246, 0.6), rgba(167, 139, 250, 0.6));
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover::after {
    width: 60%;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <LogoSignature src="/src/assets/logo_somni_sig.svg" alt="Somni Symbol" />
          <LogoText src="/src/assets/logo_somni_txt.svg" alt="Somni" />
        </Logo>
        <NavLinks>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;