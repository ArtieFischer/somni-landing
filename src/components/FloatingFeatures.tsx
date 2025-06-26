import React from "react";
import styled, { keyframes } from "styled-components";
import { darkTheme } from "../theme";
import { cssFloatingWords } from "../config/floatingWords";

const fadeInOut = keyframes`
  0%, 100% { 
    opacity: 0; 
    transform: translate(0, 0) scale(0.9);
    filter: blur(12px);
  }
  50% { 
    opacity: 0.6; 
    transform: translate(0, -12px) scale(1.05);
    filter: blur(3px);
  }
`;

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(40px, -30px) rotate(90deg); }
  50% { transform: translate(20px, 40px) rotate(180deg); }
  75% { transform: translate(-30px, 10px) rotate(270deg); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-35px, -40px) rotate(120deg); }
  66% { transform: translate(45px, 20px) rotate(240deg); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  20% { transform: translate(30px, 35px) rotate(72deg); }
  40% { transform: translate(-20px, -25px) rotate(144deg); }
  60% { transform: translate(40px, -15px) rotate(216deg); }
  80% { transform: translate(-35px, 30px) rotate(288deg); }
`;

const float4 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-50px, -30px) rotate(180deg); }
`;

const float5 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  30% { transform: translate(25px, -45px) rotate(108deg); }
  70% { transform: translate(-40px, 25px) rotate(252deg); }
`;

const FeatureContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 3; /* Above Three.js background */
`;

const FeatureText = styled.div<{
  $animation: any;
  $delay: number;
  $size?: "large" | "medium" | "small";
}>`
  position: absolute;
  text-transform: uppercase;
  color: ${darkTheme.colors.text.primary};
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: ${(props) =>
    props.$size === "large"
      ? "28px"
      : props.$size === "medium"
      ? "24px"
      : "19px"};
  font-weight: ${(props) =>
    props.$size === "large" ? "700" : props.$size === "medium" ? "600" : "700"};
  opacity: 0;
  animation: ${(props) => props.$animation} 35s ease-in-out infinite,
    ${fadeInOut} 12s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s,
    ${(props) => props.$delay * 0.8}s;
  white-space: nowrap;
  letter-spacing: ${(props) => (props.$size === "large" ? "0.12em" : "0.08em")};
  text-shadow: 0 0 30px rgba(139, 92, 246, 0.7),
    0 0 60px rgba(139, 92, 246, 0.4), 0 0 90px rgba(16, 185, 129, 0.3);
  filter: blur(0.05px); /* Always have minimum blur */

  @media (max-width: 768px) {
    font-size: ${(props) =>
      props.$size === "large"
        ? "24px"
        : props.$size === "medium"
        ? "18px"
        : "14px"};
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const FloatingFeatures: React.FC = () => {
  // Position configurations for floating words
  const positions = [
    // Top left area
    { top: "8%", left: "15%", animation: float1, delay: 0 },
    { top: "15%", left: "5%", animation: float2, delay: 3 },

    // Top center area
    { top: "12%", left: "45%", animation: float3, delay: 6 },
    { top: "6%", left: "60%", animation: float4, delay: 9 },

    // Top right area
    { top: "10%", left: "85%", animation: float5, delay: 12 },
    { top: "18%", left: "90%", animation: float1, delay: 15 },

    // Left side - middle
    { top: "35%", left: "3%", animation: float2, delay: 18 },
    { top: "50%", left: "8%", animation: float3, delay: 21 },

    // Center left
    { top: "30%", left: "25%", animation: float4, delay: 24 },
    { top: "45%", left: "20%", animation: float5, delay: 27 },

    // Center area
    { top: "40%", left: "70%", animation: float1, delay: 30 },
    { top: "55%", left: "65%", animation: float2, delay: 33 },

    // Right side - middle
    { top: "35%", left: "88%", animation: float3, delay: 36 },
    { top: "60%", left: "85%", animation: float4, delay: 39 },

    // Bottom left area
    { top: "75%", left: "10%", animation: float5, delay: 42 },
    { top: "85%", left: "5%", animation: float1, delay: 45 },

    // Bottom center area
    { top: "80%", left: "40%", animation: float2, delay: 48 },
    { top: "88%", left: "55%", animation: float3, delay: 51 },

    // Bottom right area
    { top: "70%", left: "75%", animation: float4, delay: 54 },
    { top: "82%", left: "80%", animation: float5, delay: 57 },
  ];

  // Combine words from config with positions
  const features = cssFloatingWords
    .slice(0, positions.length)
    .map((word, index) => ({
      ...word,
      ...positions[index],
    }));

  return (
    <FeatureContainer>
      {features.map((feature, index) => (
        <FeatureText
          key={index}
          style={{
            top: feature.top,
            left: feature.left,
          }}
          $animation={feature.animation}
          $delay={feature.delay}
          $size={feature.size}
        >
          {feature.text}
        </FeatureText>
      ))}
    </FeatureContainer>
  );
};

export default FloatingFeatures;
