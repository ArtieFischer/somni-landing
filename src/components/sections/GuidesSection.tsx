import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../../theme';
import freudImg from '../../assets/freud.png';
import jungImg from '../../assets/jung.png';
import lakshmiImg from '../../assets/lakshmi.png';
import maryImg from '../../assets/mary.png';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${darkTheme.spacing.xxl * 2}px ${darkTheme.spacing.xl}px;
`;

const SectionTitle = styled.h2`
  font-family: 'Anton', sans-serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  color: white;
  margin: 0 0 ${darkTheme.spacing.medium}px 0;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  opacity: 0.95;
  text-align: center;
`;

const SectionSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 300;
  color: rgba(248, 250, 252, 0.7);
  margin: 0 0 ${darkTheme.spacing.xxl * 2}px 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  text-align: center;
`;

const GuidesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${darkTheme.spacing.xl}px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${darkTheme.spacing.large}px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const GuideCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: ${darkTheme.spacing.xl * 1.5}px ${darkTheme.spacing.large}px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.2);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
  }
`;

const GuideImage = styled.div<{ $bgImage: string }>`
  width: 120px;
  height: 120px;
  margin: 0 auto ${darkTheme.spacing.large}px;
  border-radius: 50%;
  background-image: url(${props => props.$bgImage});
  background-size: cover;
  background-position: center;
  border: 3px solid rgba(139, 92, 246, 0.3);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 30%, rgba(139, 92, 246, 0.1) 100%);
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const GuideName = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: white;
  margin: 0 0 ${darkTheme.spacing.xs}px 0;
`;

const GuideTitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${darkTheme.colors.primary.light};
  margin: 0 0 ${darkTheme.spacing.medium}px 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const GuideDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.8);
  line-height: 1.5;
  margin: 0 0 ${darkTheme.spacing.large}px 0;
  min-height: 48px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`;

const Feature = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: rgba(248, 250, 252, 0.7);
  padding: ${darkTheme.spacing.xs}px 0;
  padding-left: 20px;
  position: relative;
  
  &::before {
    content: '✦';
    position: absolute;
    left: 0;
    color: ${darkTheme.colors.primary.main};
    font-size: 0.7rem;
  }
`;

const guides = [
  {
    image: freudImg,
    name: "Dr. Sigmund",
    title: "The Analyst",
    description: "Uncovers hidden meanings in your dreams through deep psychoanalytic techniques.",
    features: [
      "Symbol interpretation",
      "Unconscious mapping",
      "Pattern recognition"
    ]
  },
  {
    image: jungImg,
    name: "Dr. Jung",
    title: "The Mystic",
    description: "Connects your dreams to universal archetypes and collective consciousness.",
    features: [
      "Archetype analysis",
      "Shadow work",
      "Synchronicity tracking"
    ]
  },
  {
    image: lakshmiImg,
    name: "Dr. Lakshmi",
    title: "The Healer",
    description: "Guides spiritual transformation through ancient wisdom and modern science.",
    features: [
      "Chakra alignment",
      "Energy healing",
      "Meditation guidance"
    ]
  },
  {
    image: maryImg,
    name: "Dr. Mary",
    title: "The Innovator",
    description: "Applies cutting-edge neuroscience to enhance dream lucidity and recall.",
    features: [
      "Brainwave optimization",
      "Lucidity training",
      "Memory enhancement"
    ]
  }
];

const GuidesSection: React.FC = () => {
  return (
    <Container>
      <SectionTitle>Your Dream Guides</SectionTitle>
      <SectionSubtitle>
        Four AI personalities that learn your unique sleep story and guide you to deeper consciousness
      </SectionSubtitle>
      
      <GuidesGrid>
        {guides.map((guide, index) => (
          <GuideCard key={index}>
            <GuideImage $bgImage={guide.image} />
            <GuideName>{guide.name}</GuideName>
            <GuideTitle>{guide.title}</GuideTitle>
            <GuideDescription>{guide.description}</GuideDescription>
            <FeatureList>
              {guide.features.map((feature, idx) => (
                <Feature key={idx}>{feature}</Feature>
              ))}
            </FeatureList>
          </GuideCard>
        ))}
      </GuidesGrid>
    </Container>
  );
};

export default GuidesSection;