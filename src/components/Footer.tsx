import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../theme';

const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  padding: ${darkTheme.spacing.xl}px ${darkTheme.spacing.xl}px;
  margin-top: ${darkTheme.spacing.xxl}px;
  
  /* Apple liquid glass effect */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(60px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  
  /* Subtle shadow */
  box-shadow: 
    0 -1px 20px rgba(0, 0, 0, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.05) inset;

  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.large}px ${darkTheme.spacing.large}px;
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
  color: rgba(248, 250, 252, 0.5);
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
  color: rgba(248, 250, 252, 0.6);
  text-decoration: none;
  font-size: 12px;
  font-weight: 300;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  letter-spacing: 0.03em;
  padding: 6px 12px;
  border-radius: 10px;
  
  /* Subtle liquid background on hover */
  background: transparent;
  backdrop-filter: blur(0px);

  &:hover {
    color: rgba(139, 92, 246, 0.8);
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
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