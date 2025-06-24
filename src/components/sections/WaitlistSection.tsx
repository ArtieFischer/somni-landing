import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { darkTheme } from '../../theme';
import LiquidGlassCard from '../common/LiquidGlassCard';

const particleFloat = keyframes`
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.3;
  }
  25% { 
    transform: translate(20px, -20px) rotate(90deg);
    opacity: 0.6;
  }
  50% { 
    transform: translate(-10px, -40px) rotate(180deg);
    opacity: 0.8;
  }
  75% { 
    transform: translate(-30px, -20px) rotate(270deg);
    opacity: 0.6;
  }
`;

const liquidPulse = keyframes`
  0%, 100% { 
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(167, 139, 250, 0.8) 100%);
    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
  }
  50% { 
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(167, 139, 250, 0.9) 100%);
    box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
  }
`;

const WaitlistContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${darkTheme.spacing.xxl}px 10%;
  background: linear-gradient(
    180deg,
    rgba(11, 20, 38, 1) 0%,
    rgba(18, 28, 45, 0.98) 50%,
    rgba(11, 20, 38, 1) 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at 80% 20%,
      rgba(16, 185, 129, 0.08) 0%,
      transparent 50%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: ${darkTheme.spacing.xxl}px 5%;
  }
`;

const BackgroundParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Particle = styled.div<{ $delay: number; $size: number; $x: number; $y: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent);
  border-radius: 50%;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  animation: ${particleFloat} ${props => 8 + props.$delay}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.lg}px;
  text-align: center;
  
  background: linear-gradient(
    135deg, 
    rgba(248, 250, 252, 0.95) 0%, 
    rgba(139, 92, 246, 0.9) 50%,
    rgba(16, 185, 129, 0.8) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(248, 250, 252, 0.6);
  margin-bottom: ${darkTheme.spacing.xxl}px;
  font-weight: 300;
  line-height: 1.6;
  text-align: center;
  
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out 0.2s;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FormCard = styled(LiquidGlassCard)`
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out 0.4s;
  
  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${darkTheme.spacing.lg}px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input<{ $hasError?: boolean; $isSuccess?: boolean }>`
  width: 100%;
  padding: 18px 18px 18px 54px;
  
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px) saturate(150%);
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
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
`;

const InputIcon = styled.div<{ $isSuccess?: boolean }>`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.$isSuccess ? 'rgba(16, 185, 129, 0.8)' : 'rgba(248, 250, 252, 0.4)'};
  pointer-events: none;
  transition: color 0.3s ease;
`;

const Button = styled.button<{ $isLoading?: boolean; $isSuccess?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${darkTheme.spacing.sm}px;
  padding: 18px ${darkTheme.spacing.xl}px;
  
  background: ${props => 
    props.$isSuccess ? 
    'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.8) 100%)' :
    'linear-gradient(135deg, rgba(139, 92, 246, 0.8) 0%, rgba(167, 139, 250, 0.8) 100%)'
  };
  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  
  color: ${darkTheme.colors.text.primary};
  font-size: 16px;
  font-weight: 500;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  letter-spacing: 0.02em;
  
  box-shadow: 
    0 4px 16px rgba(139, 92, 246, 0.2),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;

  ${props => props.$isSuccess && `
    animation: ${liquidPulse} 2s ease-in-out infinite;
  `}

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

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-element');
            elements.forEach((el) => el.classList.add('animate-in'));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate background particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <WaitlistContainer ref={sectionRef} id="waitlist">
      <BackgroundParticles>
        {particles.map((particle) => (
          <Particle
            key={particle.id}
            $delay={particle.delay}
            $size={particle.size}
            $x={particle.x}
            $y={particle.y}
          />
        ))}
      </BackgroundParticles>
      
      <ContentWrapper>
        <SectionTitle className="animate-element">
          Join the Dream Revolution
        </SectionTitle>
        
        <SectionSubtitle className="animate-element">
          Be among the first to experience the future of dream enhancement. 
          Get early access and exclusive insights into your subconscious mind.
        </SectionSubtitle>
        
        <FormCard size="large" className="animate-element">
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <InputIcon $isSuccess={isSuccess}>
                {isSuccess ? <Check size={20} /> : <Mail size={20} />}
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
                Welcome to the dream collective. Check your email for next steps.
              </Message>
            )}
            
            <Button
              type="submit"
              $isLoading={isLoading}
              $isSuccess={isSuccess}
              disabled={isLoading || isSuccess}
            >
              {isLoading ? (
                'Joining the collective...'
              ) : isSuccess ? (
                <>
                  <Check size={20} />
                  Successfully Joined
                </>
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight size={20} />
                </>
              )}
            </Button>
          </Form>
        </FormCard>
      </ContentWrapper>
    </WaitlistContainer>
  );
};

export default WaitlistSection;