import React, { useState } from "react";
import styled from "styled-components";
import { darkTheme } from "../../theme";
import { Monitor, Smartphone, Watch } from "lucide-react";

const Section = styled.section`
  padding: ${darkTheme.spacing.xxl * 2}px ${darkTheme.spacing.xl}px;
  margin: ${darkTheme.spacing.xl}px 0;
`;

const Container = styled.div`
  text-align: center;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: "Anton", sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  color: white;
  margin: 0 0 ${darkTheme.spacing.medium}px 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const SectionSubtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 300;
  color: rgba(248, 250, 252, 0.7);
  margin: 0 0 ${darkTheme.spacing.xxl}px 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const PlatformsContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${darkTheme.spacing.xl}px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
`;

const PlatformCard = styled.div<{ $active: boolean; $position: number }>`
  position: relative;
  padding: ${darkTheme.spacing.xxl * 1.5}px;
  background: ${(props) =>
    props.$active ? "rgba(139, 92, 246, 0.1)" : "rgba(255, 255, 255, 0.02)"};
  border: 1px solid
    ${(props) =>
      props.$active ? "rgba(139, 92, 246, 0.3)" : "rgba(255, 255, 255, 0.05)"};
  border-radius: 24px;
  backdrop-filter: blur(20px) saturate(120%);
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      ${(props) => (props.$active ? "rgba(139, 92, 246, 0.1)" : "transparent")}
        0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    border-color: rgba(139, 92, 246, 0.4);
    background: rgba(139, 92, 246, 0.12);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
  }
`;

const PlatformIcon = styled.div<{ $active: boolean }>`
  width: 120px;
  height: 120px;
  margin: 0 auto ${darkTheme.spacing.large}px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;

  svg {
    width: ${(props) => (props.$active ? "68px" : "60px")};
    height: ${(props) => (props.$active ? "68px" : "60px")};
    color: white;
    filter: ${(props) =>
      props.$active
        ? "drop-shadow(0 0 16px rgba(139, 92, 246, 0.8)) drop-shadow(0 0 32px rgba(255, 255, 255, 0.4))"
        : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))"};
    transition: all 0.5s ease;
  }

  &:hover svg {
    filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.9))
      drop-shadow(0 0 40px rgba(255, 255, 255, 0.6));
    transform: scale(1.1) rotate(2deg);
  }
`;

const PlatformTitle = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 ${darkTheme.spacing.sm}px 0;
`;

const PlatformSubtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${darkTheme.colors.primary.light};
  margin: 0 0 ${darkTheme.spacing.medium}px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const PlatformDescription = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.7);
  line-height: 1.6;
  margin: 0;
`;

const PlatformFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${darkTheme.spacing.large}px 0 0 0;
  text-align: left;
`;

const Feature = styled.li`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  color: rgba(248, 250, 252, 0.6);
  margin: ${darkTheme.spacing.sm}px 0;
  padding-left: 20px;
  position: relative;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${darkTheme.colors.primary.main};
  }
`;

const platforms = [
  {
    icon: Monitor,
    title: "Desktop Dashboard",
    description: "Visualize long-term sleep and dream trends.",
    features: [
      "Full-scale sleep metrics",
      "Trend & timeline charts",
      "Searchable dream journal",
      "Custom reports",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Capture dreams and stats on the go.",
    features: [
      "One-tap voice recorder",
      "Guide conversations",
      "Daily insight cards",
      "Smart reminders",
    ],
  },
  {
    icon: Watch,
    title: "Smartwatch",
    description: "Track sleep live with phase-aware alarms.",
    features: [
      "Sleep-stage tracking",
      "Vibrating smart alarm",
      "Lucid cue pulses",
      "Circadian rhythm guidance",
    ],
  },
];

const PlatformsSection: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState(1); // Mobile app active by default

  return (
    <Section>
      <Container>
        <SectionTitle>three Platforms</SectionTitle>
        <SectionSubtitle>
          Unified dream ecosystem across all your devices.
        </SectionSubtitle>

        <PlatformsContainer>
          {platforms.map((platform, index) => (
            <PlatformCard
              key={index}
              $active={activePlatform === index}
              $position={index}
              onClick={() => setActivePlatform(index)}
            >
              <PlatformIcon $active={activePlatform === index}>
                <platform.icon />
              </PlatformIcon>
              <PlatformTitle>{platform.title}</PlatformTitle>
              <PlatformSubtitle>{platform.subtitle}</PlatformSubtitle>
              <PlatformDescription>{platform.description}</PlatformDescription>
              <PlatformFeatures>
                {platform.features.map((feature, idx) => (
                  <Feature key={idx}>{feature}</Feature>
                ))}
              </PlatformFeatures>
            </PlatformCard>
          ))}
        </PlatformsContainer>
      </Container>
    </Section>
  );
};

export default PlatformsSection;
