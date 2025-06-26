import React from "react";
import styled from "styled-components";
import { darkTheme } from "../../theme";
import { Network, Infinity, Send } from "lucide-react";
import DreamMap from "../DreamMap";

const Section = styled.section`
  padding: ${darkTheme.spacing.xxl * 3}px ${darkTheme.spacing.xl}px;
  margin: ${darkTheme.spacing.xxl}px 0;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px) saturate(120%);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.h2`
  font-family: "Anton", sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  color: white;
  margin: 0 0 ${darkTheme.spacing.xl}px 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  opacity: 0.95;
`;

const Description = styled.p`
  font-family: "Inter", sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 300;
  color: rgba(248, 250, 252, 0.8);
  line-height: 1.6;
  margin: 0 auto 0;
  max-width: 800px;
`;

const FeaturesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${darkTheme.spacing.xl}px;
  margin-bottom: ${darkTheme.spacing.xxl * 2}px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${darkTheme.spacing.large}px;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${darkTheme.spacing.medium}px;
`;

const IconCircle = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    width: 56px;
    height: 56px;
    color: white;
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.4));
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.1);

    svg {
      filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.7));
      transform: rotate(5deg);
    }
  }
`;

const FeatureText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(248, 250, 252, 0.9);
  margin: 0;
`;

const WorldOfDreamersSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <Header>Whole World of Dreamers</Header>
        <Description>
          Do you like to share your dreams with friends? Ever wondered what
          people dream around the world? Who dreamed about the same things as
          you last night? All possible with Somni.
        </Description>

        <DreamMap />
      </Container>
    </Section>
  );
};

export default WorldOfDreamersSection;
