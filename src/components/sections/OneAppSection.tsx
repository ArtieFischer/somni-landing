import React from "react";
import styled from "styled-components";
import { darkTheme } from "../../theme";
import { Moon, Brain, Radio, ScrollText, Eye, Sparkles } from "lucide-react";

const Section = styled.section`
  padding: ${darkTheme.spacing.xxl}px ${darkTheme.spacing.xl}px 0;
  margin: 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.h2`
  font-family: "Anton", sans-serif;
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 400;
  color: white;
  margin: 0 0 ${darkTheme.spacing.xl}px 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  opacity: 0.95;
`;

const MainText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 300;
  color: rgba(248, 250, 252, 0.9);
  line-height: 1.5;
  margin: 0 auto ${darkTheme.spacing.xxl * 2}px;
  max-width: 800px;

  strong {
    font-weight: 600;
    color: ${darkTheme.colors.primary.light};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${darkTheme.spacing.xl}px;
  margin-top: ${darkTheme.spacing.xxl * 2}px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${darkTheme.spacing.large}px;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: ${darkTheme.spacing.xl}px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(139, 92, 246, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto ${darkTheme.spacing.large}px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 52px;
    height: 52px;
    color: white;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
    transition: all 0.3s ease;
  }

  &:hover svg {
    filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.6));
    transform: scale(1.1);
  }
`;

const FeatureTitle = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 ${darkTheme.spacing.sm}px 0;
  text-transform: capitalize;
`;

const FeatureDescription = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.7);
  line-height: 1.5;
  margin: 0;
`;

const features = [
  {
    icon: Moon,
    title: "Circadian Rhythm Control",
    description:
      "Optimize your sleep-wake cycle with REM-phase-aware smart alarm, sleep tracking, and reward system",
  },
  {
    icon: Brain,
    title: "Dream Recall Enhancement",
    description:
      "Scientifically and empirically proven methods to remember dreams better",
  },
  {
    icon: Radio,
    title: "Voice-First Dream Journaling",
    description:
      "Capture dreams instantly with natural voice recording, access them on multiple devices, and share with friends",
  },
  {
    icon: ScrollText,
    title: "Flexible Dream Analysis",
    description:
      "Psychology? Neuroscience? Transcendency? Choose from multiple analytical methods resonates with you",
  },
  {
    icon: Eye,
    title: "Lucid Dreaming Training",
    description: "Master awareness techniques to take control of your dreams",
  },
  {
    icon: Sparkles,
    title: "Human-like Conversations",
    description:
      "Dig deeper into history of your dreams in voice chats with your personalized dream guide",
  },
];

const OneAppSection: React.FC = () => {
  return (
    <Section>
      <Container>
        <Header>One App</Header>
        <MainText>
          The most powerful processor is still <strong>your imagination</strong>
          . Learn to control it. And learn from it. Somni is the first app to
          offer it all.
        </MainText>

        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <IconWrapper>
                <feature.icon />
              </IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </Section>
  );
};

export default OneAppSection;
