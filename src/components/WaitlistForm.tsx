import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { darkTheme } from '../theme';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 400px;
  width: 100%;
  padding: 24px;
  
  /* Frosted glass effect */
  background: rgba(42, 42, 42, 0.8);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 16px;
  
  /* Clean shadow */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 768px) {
    max-width: 360px;
    padding: 24px 20px;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 300;
  color: ${darkTheme.colors.text.primary};
  text-align: center;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${darkTheme.colors.text.secondary};
  text-align: center;
  margin: 0;
  line-height: 1.5;
  max-width: 320px;
  font-weight: 400;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ $hasError?: boolean; $isSuccess?: boolean }>`
  width: 100%;
  padding: 16px 16px 16px 48px;
  
  /* Frosted glass input */
  background: rgba(42, 42, 42, 0.8);
  backdrop-filter: blur(8px);
  border: 1px solid ${props => 
    props.$hasError ? darkTheme.colors.status.error :
    props.$isSuccess ? darkTheme.colors.status.success :
    darkTheme.colors.border.primary
  };
  border-radius: 12px;
  
  color: ${darkTheme.colors.text.primary};
  font-size: 15px;
  font-weight: 400;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &::placeholder {
    color: ${darkTheme.colors.text.disabled};
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-color: ${darkTheme.colors.border.focus};
    box-shadow: 0 0 0 3px rgba(0, 255, 157, 0.1);
    transform: translateY(-1px);
  }

  &:hover:not(:focus) {
    border-color: ${darkTheme.colors.border.secondary};
    transform: translateY(-0.5px);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${darkTheme.colors.text.disabled};
  pointer-events: none;
  transition: color 0.3s ease;
`;

const Button = styled.button<{ $isLoading?: boolean; $isSuccess?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  
  /* Solid purple button */
  background: ${props => 
    props.$isSuccess ? 
    darkTheme.colors.status.success :
    darkTheme.colors.primary
  };
  border: none;
  border-radius: 12px;
  
  color: ${darkTheme.colors.text.primary};
  font-size: 15px;
  font-weight: 500;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  
  /* Clean shadow */
  box-shadow: 0 4px 16px rgba(138, 79, 255, 0.2);

  &:hover:not(:disabled) {
    background: ${props => 
      props.$isSuccess ? 
      darkTheme.colors.status.success :
      darkTheme.colors.secondary
    };
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 255, 157, 0.3);
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
  gap: 8px;
  color: ${darkTheme.colors.status.error};
  font-size: 12px;
  font-weight: 400;
  margin-top: 8px;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${darkTheme.colors.status.success};
  font-size: 12px;
  font-weight: 400;
  margin-top: 8px;
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