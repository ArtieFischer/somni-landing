import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { darkTheme } from '../theme';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
`;

const liquidShimmer = keyframes`
  0% { 
    background-position: -200% 0;
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% { 
    background-position: 200% 0;
    opacity: 0.3;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${darkTheme.spacing.lg}px;
  max-width: 380px;
  width: 100%;
  padding: ${darkTheme.spacing.xl}px ${darkTheme.spacing.lg}px;
  
  /* Apple liquid glass effect */
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(60px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  
  /* Subtle shadow for depth */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1) inset,
    0 -1px 0 rgba(0, 0, 0, 0.2) inset;
  
  animation: ${float} 8s ease-in-out infinite;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(139, 92, 246, 0.05),
      transparent
    );
    animation: ${liquidShimmer} 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    max-width: 340px;
    padding: ${darkTheme.spacing.lg}px ${darkTheme.spacing.md}px;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
  font-weight: 300;
  color: ${darkTheme.colors.text.primary};
  text-align: center;
  margin: 0;
  line-height: 1.3;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(139, 92, 246, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: rgba(248, 250, 252, 0.65);
  text-align: center;
  margin: 0;
  line-height: 1.5;
  max-width: 320px;
  font-weight: 300;
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${darkTheme.spacing.md}px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ $hasError?: boolean; $isSuccess?: boolean }>`
  width: 100%;
  padding: 16px 16px 16px 48px;
  
  /* Apple liquid input styling */
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(40px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  
  color: ${darkTheme.colors.text.primary};
  font-size: 15px;
  font-weight: 300;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-sizing: border-box;
  
  /* Subtle inner shadow */
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.2) inset,
    0 1px 0 rgba(255, 255, 255, 0.05);

  &::placeholder {
    color: rgba(248, 250, 252, 0.4);
    font-weight: 300;
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(139, 92, 246, 0.3);
    box-shadow: 
      0 0 0 3px rgba(139, 92, 246, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.2) inset,
      0 1px 0 rgba(255, 255, 255, 0.05);
    transform: translateY(-1px);
  }

  &:hover:not(:focus) {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(248, 250, 252, 0.4);
  pointer-events: none;
  transition: color 0.3s ease;
`;

const Button = styled.button<{ $isLoading?: boolean; $isSuccess?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${darkTheme.spacing.xs}px;
  padding: 16px ${darkTheme.spacing.lg}px;
  
  /* Apple liquid button styling */
  background: ${props => 
    props.$isSuccess ? 
    'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.8) 100%)' :
    'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(167, 139, 250, 0.8) 100%)'
  };
  backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  
  color: ${darkTheme.colors.text.primary};
  font-size: 15px;
  font-weight: 400;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  transform: translateY(0);
  letter-spacing: 0.02em;
  
  /* Subtle shadow for depth */
  box-shadow: 
    0 4px 16px rgba(139, 92, 246, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(139, 92, 246, 0.3),
      0 1px 0 rgba(255, 255, 255, 0.15) inset;
    background: ${props => 
      props.$isSuccess ? 
      'linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)' :
      'linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(167, 139, 250, 0.9) 100%)'
    };
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${darkTheme.spacing.xs}px;
  color: rgba(248, 113, 113, 0.9);
  font-size: 12px;
  font-weight: 300;
  margin-top: ${darkTheme.spacing.xs}px;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: ${darkTheme.spacing.xs}px;
  color: rgba(16, 185, 129, 0.9);
  font-size: 12px;
  font-weight: 300;
  margin-top: ${darkTheme.spacing.xs}px;
`;

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Enter Your Dreams</Title>
      <Subtitle>
        Join the exclusive community exploring consciousness and sleep enhancement.
      </Subtitle>
      
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputIcon>
            <Mail size={18} />
          </InputIcon>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            $hasError={!!error}
            $isSuccess={isSuccess}
            disabled={isLoading || isSuccess}
          />
        </InputContainer>
        
        {error && (
          <ErrorMessage>
            <AlertCircle size={14} />
            {error}
          </ErrorMessage>
        )}
        
        {isSuccess && (
          <SuccessMessage>
            <Check size={14} />
            Welcome to the dream collective.
          </SuccessMessage>
        )}
        
        <Button
          type="submit"
          $isLoading={isLoading}
          $isSuccess={isSuccess}
          disabled={isLoading || isSuccess}
        >
          {isLoading ? (
            'Joining...'
          ) : isSuccess ? (
            <>
              <Check size={18} />
              Joined
            </>
          ) : (
            <>
              Join Waitlist
              <ArrowRight size={18} />
            </>
          )}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default WaitlistForm;