import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../theme';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 24px;
  
  /* Frosted glass effect */
  background: rgba(42, 42, 42, 0.8);
  backdrop-filter: blur(8px);
  border: none;
  
  /* Clean shadow */
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${darkTheme.colors.text.secondary};
  font-size: 12px;
  font-weight: 400;
  margin: 0;
`;

const Links = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const Link = styled.a`
  color: ${darkTheme.colors.text.secondary};
  text-decoration: none;
  font-size: 12px;
  font-weight: 400;
  transition: all 0.3s ease;
  padding: 6px 12px;
  border-radius: 8px;
  
  background: transparent;

  &:hover {
    color: ${darkTheme.colors.secondary};
    background: rgba(42, 42, 42, 0.8);
    backdrop-filter: blur(8px);
    transform: translateY(-1px);
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © 2025 Somni. All rights reserved.
        </Copyright>
        <Links>
          <Link href="#privacy">Privacy Policy</Link>
          <Link href="#terms">Terms of Service</Link>
          <Link href="#support">Support</Link>
        </Links>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;