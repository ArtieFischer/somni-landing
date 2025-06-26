import React from 'react';
import styled from 'styled-components';
import { darkTheme } from '../../theme';
import FormCard from '../common/FormCard';

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

const FormWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  
  /* Override FormCard's max-width */
  & > div {
    max-width: 100%;
  }
`;

const FormSection: React.FC = () => {
  return (
    <Section>
      <Container id="waitlist-form">
        <FormWrapper>
          <FormCard 
            title="Ready to Transform Your Dreams?"
            description="Join thousands who are already exploring the depths of their consciousness. Be among the first to experience the future of dream enhancement."
            placeholder="Enter your email to secure your spot"
            buttonText="Claim Your Access"
            successMessage="Welcome to the dream collective. We'll be in touch soon with your exclusive access."
          />
        </FormWrapper>
      </Container>
    </Section>
  );
};

export default FormSection;