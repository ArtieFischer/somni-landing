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

const BoltBadgeLink = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    transform: translateY(-3px) scale(1.05);
  }
`;

const BoltBadge = styled.img`
  height: 84px;
  width: auto;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.3));
  cursor: pointer;

  ${BoltBadgeLink}:hover & {
    filter: drop-shadow(0 0 30px rgba(139, 92, 246, 0.5));
  }

  @media (max-width: 768px) {
    height: 76px;
  }

  @media (max-width: 480px) {
    height: 67px;
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
        <BoltBadgeLink href="https://bolt.new/" target="_blank" rel="noopener noreferrer">
          <BoltBadge src="/src/assets/bolt_badge.svg" alt="Bolt Badge" />
        </BoltBadgeLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;