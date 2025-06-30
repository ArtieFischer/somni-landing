import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { darkTheme } from "../../theme";
import GlassCard from "../common/GlassCard";

const SectionContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${darkTheme.spacing.xxl}px 5%;
  background: linear-gradient(
    180deg,
    rgba(11, 20, 38, 0.95) 0%,
    rgba(15, 25, 42, 0.98) 50%,
    rgba(11, 20, 38, 0.95) 100%
  );
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  color: ${darkTheme.colors.text.primary};
  margin-bottom: ${darkTheme.spacing.lg}px;
  text-align: center;

  background: linear-gradient(
    135deg,
    rgba(248, 250, 252, 0.95) 0%,
    rgba(167, 139, 250, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionDescription = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.7);
  text-align: center;
  margin-bottom: ${darkTheme.spacing.xxl}px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const CarouselTrack = styled.div<{ $currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${(props) => props.$currentIndex * 100}%);
`;

const TestimonialCard = styled(GlassCard)`
  min-width: 100%;
  text-align: center;
  flex-shrink: 0;
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: ${darkTheme.spacing.lg}px;

  svg {
    color: #ffd700;
    fill: #ffd700;
  }
`;

const Quote = styled.blockquote`
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.9);
  line-height: 1.6;
  margin: 0 0 ${darkTheme.spacing.lg}px 0;
  font-style: italic;
`;

const Author = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${darkTheme.spacing.xs}px;
`;

const AuthorName = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: ${darkTheme.colors.text.primary};
`;

const AuthorTitle = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(248, 250, 252, 0.6);
`;

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${darkTheme.spacing.lg}px;
  margin-top: ${darkTheme.spacing.xl}px;
`;

const CarouselButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: ${darkTheme.colors.text.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.3);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Indicators = styled.div`
  display: flex;
  gap: ${darkTheme.spacing.sm}px;
`;

const Indicator = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${(props) =>
    props.$active ? "rgba(139, 92, 246, 0.8)" : "rgba(255, 255, 255, 0.3)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.$active ? "rgba(139, 92, 246, 1)" : "rgba(255, 255, 255, 0.5)"};
  }
`;

const testimonials = [
  {
    quote:
      "Somni completely transformed my relationship with sleep. I went from barely remembering my dreams to having lucid dreams almost every night. The AI analysis helped me understand patterns I never noticed before.",
    author: "Sarah Chen",
    title: "Meditation Teacher",
  },
  {
    quote:
      "As a neuroscientist, I was skeptical at first. But the depth of analysis and the accuracy of the insights genuinely impressed me. This is the future of sleep optimization.",
    author: "Dr. Michael Rodriguez",
    title: "Sleep Researcher",
  },
  {
    quote:
      "The dream journaling features are incredible. Being able to track my emotional patterns through my dreams has been life-changing for my mental health journey.",
    author: "Emma Thompson",
    title: "Artist & Writer",
  },
  {
    quote:
      "I've been practicing lucid dreaming for years, but Somni's techniques and real-time monitoring took my practice to a completely new level. Absolutely revolutionary.",
    author: "James Park",
    title: "Lucid Dreaming Enthusiast",
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionContainer id="testimonials">
      <ContentWrapper>
        <SectionTitle>Join the Waitlist</SectionTitle>
        <SectionDescription>
          Be among the first to experience Somni.
        </SectionDescription>

        <CarouselContainer>
          <CarouselTrack $currentIndex={currentIndex}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} size="large" padding="large">
                <Stars>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} />
                  ))}
                </Stars>

                <Quote>"{testimonial.quote}"</Quote>

                <Author>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorTitle>{testimonial.title}</AuthorTitle>
                </Author>
              </TestimonialCard>
            ))}
          </CarouselTrack>
        </CarouselContainer>

        <CarouselControls>
          <CarouselButton onClick={prevTestimonial}>
            <ChevronLeft size={24} />
          </CarouselButton>

          <Indicators>
            {testimonials.map((_, index) => (
              <Indicator
                key={index}
                $active={index === currentIndex}
                onClick={() => goToTestimonial(index)}
              />
            ))}
          </Indicators>

          <CarouselButton onClick={nextTestimonial}>
            <ChevronRight size={24} />
          </CarouselButton>
        </CarouselControls>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default TestimonialsSection;
