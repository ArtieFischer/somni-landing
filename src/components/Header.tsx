import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../theme';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 24px;
  
  /* Frosted glass effect */
  background: rgba(42, 42, 42, 0.8);
  backdrop-filter: blur(8px);
  border: none;
  
  /* Clean shadow */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const LogoSignature = styled.img`
  height: 32px;
  width: auto;
  filter: brightness(1.1);
  transition: all 0.3s ease;

  ${Logo}:hover & {
    transform: scale(1.05);
    filter: brightness(1.2);
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
  filter: brightness(1.1);
  transition: all 0.3s ease;

  ${Logo}:hover & {
    transform: scale(1.05);
    filter: brightness(1.2);
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
  gap: 32px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${darkTheme.colors.text.primary};
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 8px;
  
  background: transparent;

  &:hover {
    color: ${darkTheme.colors.secondary};
    background: rgba(42, 42, 42, 0.8);
    backdrop-filter: blur(8px);
    transform: translateY(-1px);
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