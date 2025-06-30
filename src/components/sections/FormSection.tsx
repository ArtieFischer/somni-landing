import React from "react";
import styled from "styled-components";
import { darkTheme } from "../../theme";
import Button from "../common/Button";
import { ArrowRight } from "lucide-react";

const Section = styled.section`
  padding: ${darkTheme.spacing.xxl * 2}px ${darkTheme.spacing.xl}px;
  margin: ${darkTheme.spacing.xl}px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  max-width: 1200px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${darkTheme.spacing.xl}px;
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 2.5rem;
  font-weight: 600;
  color: ${darkTheme.colors.text.primary};
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.7);
  margin: 0;
  line-height: 1.5;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FormSection: React.FC = () => {
  return (
    <Section>
      <Container id="waitlist-form">
        <ContentWrapper>
          <Title>Join the Waitlist</Title>
          <Description>Be among the first to experience the dream enhancement.</Description>
          <Button
            size="large"
            as="a"
            href="mailto:waitforsomnidreams@proton.me?subject=Waitlist Sign-up&body=Hi, I want early access!"
          >
            Join the Waitlist
            <ArrowRight size={24} />
          </Button>
        </ContentWrapper>
      </Container>
    </Section>
  );
};

export default FormSection;
