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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${darkTheme.spacing.lg}px;
  max-width: 500px;
  width: 100%;
  padding: ${darkTheme.spacing.xxl}px ${darkTheme.spacing.xl}px;
  
  /* Enhanced glass morphism effect matching header buttons */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  
  /* Enhanced shadow for depth */
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1) inset,
    0 -1px 0 rgba(0, 0, 0, 0.2) inset;
  
  animation: ${float} 8s ease-in-out infinite, ${fadeInUp} 1s ease-out 0.6s both;
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
    max-width: 400px;
    padding: ${darkTheme.spacing.xl}px ${darkTheme.spacing.lg}px;
  }

  @media (max-width: 480px) {
    max-width: 340px;
    padding: ${darkTheme.spacing.lg}px ${darkTheme.spacing.md}px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${darkTheme.spacing.lg}px;
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
  padding: 20px 20px 20px 56px;
  
  /* Enhanced glass input styling matching header buttons */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid ${props => 
    props.$hasError ? 'rgba(248, 113, 113, 0.5)' :
    props.$isSuccess ? 'rgba(16, 185, 129, 0.5)' :
    'rgba(255, 255, 255, 0.1)'
  };
  border-radius: 16px;
  
  color: ${darkTheme.colors.text.primary};
  font-size: 16px;
  font-weight: 300;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-sizing: border-box;
  
  /* Enhanced shadow matching header style */
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.2) inset,
    0 1px 0 rgba(255, 255, 255, 0.05);

  &::placeholder {
    color: rgba(248, 250, 252, 0.4);
    font-weight: 300;
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(139, 92, 246, 0.4);
    box-shadow: 
      0 0 0 3px rgba(139, 92, 246, 0.1),
      0 1px 3px rgba(0, 0, 0, 0.2) inset,
      0 1px 0 rgba(255, 255, 255, 0.05);
    transform: translateY(-2px);
  }

  &:hover:not(:focus) {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 20px;
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
  gap: ${darkTheme.spacing.sm}px;
  padding: 20px ${darkTheme.spacing.xl}px;
  
  /* Enhanced glass button styling matching header buttons */
  background: ${props => 
    props.$isSuccess ? 
    'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.8) 100%)' :
    'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(167, 139, 250, 0.8) 100%)'
  };
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  
  color: ${darkTheme.colors.text.primary};
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  transform: translateY(0);
  letter-spacing: 0.02em;
  
  /* Enhanced shadow matching header style */
  box-shadow: 
    0 4px 16px rgba(139, 92, 246, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 
      0 12px 40px rgba(139, 92, 246, 0.3),
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

const Message = styled.div<{ $type: 'error' | 'success' }>`
  display: flex;
  align-items: center;
  gap: ${darkTheme.spacing.sm}px;
  color: ${props => props.$type === 'error' ? 'rgba(248, 113, 113, 0.9)' : 'rgba(16, 185, 129, 0.9)'};
  font-size: 14px;
  font-weight: 300;
  padding: ${darkTheme.spacing.sm}px ${darkTheme.spacing.md}px;
  background: ${props => props.$type === 'error' ? 'rgba(248, 113, 113, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
  border: 1px solid ${props => props.$type === 'error' ? 'rgba(248, 113, 113, 0.2)' : 'rgba(16, 185, 129, 0.2)'};
  border-radius: 12px;
  backdrop-filter: blur(10px);
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

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <InputIcon>
            <Mail size={20} />
          </InputIcon>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            $hasError={!!error}
            $isSuccess={isSuccess}
            disabled={isLoading || isSuccess}
          />
        </InputContainer>
        
        {error && (
          <Message $type="error">
            <AlertCircle size={16} />
            {error}
          </Message>
        )}
        
        {isSuccess && (
          <Message $type="success">
            <Check size={16} />
            Welcome to the dream collective.
          </Message>
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
              <Check size={20} />
              Joined
            </>
          ) : (
            <>
              Join Waitlist
              <ArrowRight size={20} />
            </>
          )}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default WaitlistForm;