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
  20%, 80% { 
    opacity: 0.25; 
    transform: translate(0, -8px) scale(1);
    filter: blur(1px);
  }
`;

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, -15px) rotate(90deg); }
  50% { transform: translate(10px, 20px) rotate(180deg); }
  75% { transform: translate(-15px, 5px) rotate(270deg); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-18px, -20px) rotate(120deg); }
  66% { transform: translate(22px, 10px) rotate(240deg); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  20% { transform: translate(15px, 18px) rotate(72deg); }
  40% { transform: translate(-10px, -12px) rotate(144deg); }
  60% { transform: translate(20px, -8px) rotate(216deg); }
  80% { transform: translate(-18px, 15px) rotate(288deg); }
`;

const float4 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-25px, -15px) rotate(180deg); }
`;

const float5 = keyframes`
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  30% { transform: translate(12px, -22px) rotate(108deg); }
  70% { transform: translate(-20px, 12px) rotate(252deg); }
`;

const FeatureContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 3; /* Above Three.js background */
`;

const FeatureText = styled.div<{
  $animation: ReturnType<typeof keyframes>;
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
      : "20px"};
  font-weight: ${(props) =>
    props.$size === "large" ? "600" : props.$size === "medium" ? "500" : "600"};
  opacity: 0;
  animation: ${(props) => props.$animation} ${(props) => 40 + (props.$delay % 3) * 10}s ease-in-out infinite,
    ${fadeInOut} ${(props) => 18 + (props.$delay % 4) * 4}s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay}s, ${(props) => props.$delay}s;
  white-space: nowrap;
  letter-spacing: ${(props) => (props.$size === "large" ? "0.12em" : "0.08em")};
  text-shadow: 0 0 15px rgba(139, 92, 246, 0.3),
    0 0 30px rgba(139, 92, 246, 0.2);
  filter: blur(0.05px); /* Always have minimum blur */

  @media (max-width: 768px) {
    font-size: ${(props) =>
      props.$size === "large"
        ? "24px"
        : props.$size === "medium"
        ? "20px"
        : "18px"};
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const FloatingFeatures: React.FC = () => {
  // Position configurations for floating words with staggered groups
  const positions = [
    // Group 1: Top-left cluster (0-2s)
    { top: "8%", left: "12%", animation: float1, delay: 0 },
    { top: "15%", left: "8%", animation: float2, delay: 0.8 },
    { top: "12%", left: "20%", animation: float3, delay: 1.6 },

    // Group 2: Top-center cluster (1-3s)
    { top: "5%", left: "45%", animation: float4, delay: 1 },
    { top: "10%", left: "55%", animation: float5, delay: 1.8 },
    { top: "18%", left: "50%", animation: float1, delay: 2.6 },

    // Group 3: Top-right cluster (2-4s)
    { top: "12%", left: "75%", animation: float2, delay: 2 },
    { top: "8%", left: "85%", animation: float3, delay: 2.8 },
    { top: "20%", left: "80%", animation: float4, delay: 3.6 },

    // Group 4: Mid-left cluster (3-5s)
    { top: "35%", left: "10%", animation: float5, delay: 3 },
    { top: "45%", left: "15%", animation: float1, delay: 3.8 },
    { top: "40%", left: "5%", animation: float2, delay: 4.6 },

    // Group 5: Center cluster (4-6s)
    { top: "40%", left: "48%", animation: float3, delay: 4 },
    { top: "50%", left: "52%", animation: float4, delay: 4.8 },
    { top: "45%", left: "58%", animation: float5, delay: 5.6 },

    // Group 6: Bottom clusters (5-8s)
    { top: "70%", left: "20%", animation: float1, delay: 5 },
    { top: "75%", left: "70%", animation: float2, delay: 6 },
    { top: "85%", left: "40%", animation: float3, delay: 7 },
    { top: "80%", left: "85%", animation: float4, delay: 7.5 },
    { top: "88%", left: "15%", animation: float5, delay: 8 },
    { top: "82%", left: "60%", animation: float1, delay: 8.5 },
  ];

  // Combine words from config with positions, ensuring proper typing
  const features = cssFloatingWords
    .slice(0, positions.length)
    .map((word, index) => ({
      text: word.text,
      size: word.size as "large" | "medium" | "small",
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
