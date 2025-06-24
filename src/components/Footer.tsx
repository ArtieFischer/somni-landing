import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../theme';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: ${darkTheme.spacing.md}px ${darkTheme.spacing.xl}px;
  
  /* Enhanced Apple liquid glass effect - 25% more opacity */
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(60px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  
  /* Enhanced shadow for better depth */
  box-shadow: 
    0 -1px 20px rgba(0, 0, 0, 0.15),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;

  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.sm}px ${darkTheme.spacing.lg}px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${darkTheme.spacing.sm}px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(248, 250, 252, 0.65);
  font-size: 12px;
  font-weight: 300;
  margin: 0;
  letter-spacing: 0.03em;
`;

const Links = styled.div`
  display: flex;
  gap: ${darkTheme.spacing.xl}px;
  align-items: center;

  @media (max-width: 768px) {
    gap: ${darkTheme.spacing.lg}px;
  }
`;

const Link = styled.a`
  color: rgba(248, 250, 252, 0.75);
  text-decoration: none;
  font-size: 12px;
  font-weight: 300;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  letter-spacing: 0.03em;
  padding: 6px 12px;
  border-radius: 10px;
  
  /* Enhanced liquid background on hover */
  background: transparent;
  backdrop-filter: blur(0px);

  &:hover {
    color: rgba(16, 185, 129, 0.9);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
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