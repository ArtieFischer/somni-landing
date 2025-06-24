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
  
  /* Apple liquid glass effect */
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(60px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  /* Subtle shadow */
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);

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
`;

const LogoImage = styled.img`
  height: 32px;
  width: auto;
  filter: brightness(1.1) saturate(1.1);
  opacity: 0.95;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2) saturate(1.2);
  }
`;

const LogoText = styled.span`
  font-size: 18px;
  font-weight: 300;
  color: rgba(248, 250, 252, 0.9);
  letter-spacing: 0.12em;
  opacity: 0.9;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    opacity: 1;
    color: rgba(139, 92, 246, 0.9);
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
  color: rgba(248, 250, 252, 0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 300;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  letter-spacing: 0.05em;
  padding: 8px 16px;
  border-radius: 12px;
  
  /* Subtle liquid background on hover */
  background: transparent;
  backdrop-filter: blur(0px);

  &:hover {
    color: rgba(139, 92, 246, 0.9);
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
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
    background: linear-gradient(90deg, rgba(139, 92, 246, 0.6), rgba(167, 139, 250, 0.6));
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
          <LogoImage src="/src/assets/logo_somni_sig.svg" alt="Somni" />
          <LogoText>SOMNI</LogoText>
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