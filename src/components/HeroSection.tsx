import React from "react";
import styled, { keyframes } from "styled-components";
import { darkTheme } from "../theme";
import Button from "./common/Button";
import { ArrowRight } from "lucide-react";

const textGlow = keyframes`
  0%, 100% { 
    text-shadow: 
      0 0 20px rgba(139, 92, 246, 0.5),
      0 0 40px rgba(139, 92, 246, 0.3),
      0 0 60px rgba(16, 185, 129, 0.2);
  }
  50% { 
    text-shadow: 
      0 0 30px rgba(139, 92, 246, 0.7),
      0 0 60px rgba(139, 92, 246, 0.5),
      0 0 90px rgba(16, 185, 129, 0.3);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${darkTheme.spacing.xl}px ${darkTheme.spacing.large}px;
  text-align: center;
  position: relative;
  z-index: 10;
  gap: ${darkTheme.spacing.xl}px;

  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.large}px ${darkTheme.spacing.medium}px;
    gap: ${darkTheme.spacing.xl}px;
  }
`;

const MainTitle = styled.h1`
  font-family: "Anton", sans-serif;
  text-transform: uppercase;
  font-size: clamp(3.5rem, 10vw, 7rem);
  font-weight: 300;
  color: #ffffff;
  margin: 0;
  line-height: 1.07;
  letter-spacing: 0.02em;

  animation: ${textGlow} 4s ease-in-out infinite, ${fadeInUp} 1s ease-out;

  span {
    display: block;
    margin: -0.1em 0;
  }
`;

const Subtitle = styled.p`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: clamp(0.8rem, 2.5vw, 1.5rem);
  font-weight: 300;
  color: rgba(248, 250, 252, 0.85);
  margin: ${darkTheme.spacing.large}px 0 0 0;
  line-height: 1.6;
  letter-spacing: 0.02em;
  max-width: 600px;

  animation: ${fadeInUp} 1s ease-out 0.4s both;

  @media (max-width: 768px) {
    max-width: 400px;
    font-size: clamp(1rem, 2.5vw, 1.3rem);
  }
`;

const ButtonWrapper = styled.div`
  margin-top: ${darkTheme.spacing.large}px;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
`;

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <div>
        <MainTitle>
          <span>Enhance</span>
          <span>Your</span>
          <span>Dreams</span>
        </MainTitle>
        <Subtitle>AI will not dream for you</Subtitle>
        <ButtonWrapper>
          <Button
            size="large"
            onClick={() => {
              const formSection = document.getElementById("waitlist-form");
              formSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Join the Waitlist
            <ArrowRight size={24} />
          </Button>
        </ButtonWrapper>
      </div>
    </HeroContainer>
  );
};

export default HeroSection;
