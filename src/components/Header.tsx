import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../theme';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: ${darkTheme.spacing.md}px ${darkTheme.spacing.xl}px;
  
  /* Enhanced dark liquid glass effect */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(80px) saturate(200%) contrast(120%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  
  /* Enhanced shadow for depth */
  box-shadow: 
    0 1px 30px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.02) inset;

  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.sm}px ${darkTheme.spacing.lg}px;
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
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    gap: ${darkTheme.spacing.sm}px;
  }
`;

const LogoSignature = styled.img`
  height: 32px;
  width: auto;
  filter: brightness(0.9) saturate(1.2) contrast(1.1);
  opacity: 0.85;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${Logo}:hover & {
    transform: scale(1.05);
    filter: brightness(1.1) saturate(1.3) contrast(1.2);
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 28px;
  }

  @media (max-width: 480px) {
    height: 24px;
  }
`;

const LogoText = styled.img`
  height: 20px;
  width: auto;
  filter: brightness(0.9) saturate(1.2) contrast(1.1);
  opacity: 0.8;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  ${Logo}:hover & {
    transform: scale(1.05);
    filter: brightness(1.1) saturate(1.3) contrast(1.2);
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 18px;
  }

  @media (max-width: 480px) {
    height: 16px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${darkTheme.spacing.xl}px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: rgba(248, 250, 252, 0.6);
  text-decoration: none;
  font-size: 14px;
  font-weight: 300;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  letter-spacing: 0.05em;
  padding: 8px 16px;
  border-radius: 12px;
  
  /* Enhanced dark liquid background on hover */
  background: transparent;
  backdrop-filter: blur(0px);

  &:hover {
    color: rgba(139, 92, 246, 0.9); /* Aurora purple - PRIMARY COLOR */
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(40px) saturate(150%);
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, rgba(139, 92, 246, 0.6), rgba(167, 139, 250, 0.6)); /* Purple gradient - PRIMARY */
    transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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