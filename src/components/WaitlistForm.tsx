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
    opacity: 0.2;
  }
  50% {
    opacity: 0.6;
  }
  100% { 
    background-position: 200% 0;
    opacity: 0.2;
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
  
  /* Enhanced dark liquid glass effect */
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(80px) saturate(200%) contrast(120%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  
  /* Enhanced shadow for depth */
  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.05) inset,
    0 -1px 0 rgba(0, 0, 0, 0.3) inset;
  
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
      rgba(30, 64, 175, 0.03), /* Dark blue shimmer */
      transparent
    );
    animation: ${liquidShimmer} 8s ease-in-out infinite;
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
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(30, 64, 175, 0.8) 100%); /* Blue gradient */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  z-index: 1;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: rgba(248, 250, 252, 0.6);
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
  
  /* Enhanced dark liquid input styling */
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(60px) saturate(180%) contrast(110%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  
  color: ${darkTheme.colors.text.primary};
  font-size: 15px;
  font-weight: 300;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-sizing: border-box;
  
  /* Enhanced inner shadow */
  box-shadow: 
    0 2px 6px rgba(0, 0, 0, 0.3) inset,
    0 1px 0 rgba(255, 255, 255, 0.03);

  &::placeholder {
    color: rgba(248, 250, 252, 0.35);
    font-weight: 300;
  }

  &:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(30, 64, 175, 0.3); /* Blue focus */
    box-shadow: 
      0 0 0 3px rgba(30, 64, 175, 0.08),
      0 2px 6px rgba(0, 0, 0, 0.3) inset,
      0 1px 0 rgba(255, 255, 255, 0.03);
    transform: translateY(-1px);
  }

  &:hover:not(:focus) {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(248, 250, 252, 0.35);
  pointer-events: none;
  transition: color 0.3s ease;
`;

const Button = styled.button<{ $isLoading?: boolean; $isSuccess?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${darkTheme.spacing.xs}px;
  padding: 16px ${darkTheme.spacing.lg}px;
  
  /* Enhanced dark liquid button styling */
  background: ${props => 
    props.$isSuccess ? 
    'linear-gradient(135deg, rgba(55, 65, 81, 0.8) 0%, rgba(75, 85, 99, 0.8) 100%)' : /* Dark gray for success */
    'linear-gradient(135deg, rgba(30, 64, 175, 0.7) 0%, rgba(37, 99, 235, 0.7) 100%)' /* Blue gradient */
  };
  backdrop-filter: blur(60px) saturate(200%) contrast(110%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  
  color: ${darkTheme.colors.text.primary};
  font-size: 15px;
  font-weight: 400;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  transform: translateY(0);
  letter-spacing: 0.02em;
  
  /* Enhanced shadow for depth */
  box-shadow: 
    0 4px 20px rgba(30, 64, 175, 0.15),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 30px rgba(30, 64, 175, 0.2),
      0 1px 0 rgba(255, 255, 255, 0.12) inset;
    background: ${props => 
      props.$isSuccess ? 
      'linear-gradient(135deg, rgba(55, 65, 81, 0.9) 0%, rgba(75, 85, 99, 0.9) 100%)' :
      'linear-gradient(135deg, rgba(30, 64, 175, 0.8) 0%, rgba(37, 99, 235, 0.8) 100%)'
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
  color: rgba(107, 114, 128, 0.9); /* Gray for success */
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
      <Title>Enhance Your Dreams</Title>
      <Subtitle>
        What AI won't replace is your ability to dream. And only you can make it better.
      </Subtitle>
      <Subtitle>
        Explore your dreams and dreams of the world-wide community, with your personalized guide. 
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