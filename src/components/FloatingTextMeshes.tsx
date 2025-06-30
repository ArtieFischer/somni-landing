import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { threeDWords } from '../config/floatingWords';

interface FloatingTextMeshesProps {
  scene: THREE.Scene;
}

const FloatingTextMeshes: React.FC<FloatingTextMeshesProps> = ({ scene }) => {
  const textSpritesRef = useRef<THREE.Sprite[]>([]);
  const animationTimelineRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!scene) return;

    console.log('🔤 Creating sophisticated floating text meshes...');

    const createTextSprite = (text: string, size: number = 512) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size; // Full resolution for clarity
      const ctx = canvas.getContext('2d')!;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Set up text styling - using Inter for consistency
      ctx.font = `600 ${size * 0.12}px 'Inter', sans-serif`; // Larger, more readable text
      ctx.fillStyle = 'rgba(248, 250, 252, 0.85)'; // Slightly more visible
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Enhanced multi-layer glow effect for sophistication
      // Layer 1: Deep purple glow (largest)
      ctx.shadowColor = 'rgba(139, 92, 246, 0.8)'; // Aurora purple
      ctx.shadowBlur = 40;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillText(text.toUpperCase(), size / 2, size / 2);
      
      // Layer 2: Teal accent glow (medium)
      ctx.shadowColor = 'rgba(16, 185, 129, 0.6)'; // Ethereal teal
      ctx.shadowBlur = 25;
      ctx.fillText(text.toUpperCase(), size / 2, size / 2);
      
      // Layer 3: Lavender highlight (smallest)
      ctx.shadowColor = 'rgba(167, 139, 250, 0.4)'; // Mystic lavender
      ctx.shadowBlur = 15;
      ctx.fillText(text.toUpperCase(), size / 2, size / 2);
      
      // Final layer: Clean text on top
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(248, 250, 252, 0.9)';
      ctx.fillText(text.toUpperCase(), size / 2, size / 2);
      
      // Create texture and sprite
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      
      const material = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true,
        opacity: 0,
        alphaTest: 0.001,
        blending: THREE.AdditiveBlending // Enhanced blending for glow
      });
      
      return new THREE.Sprite(material);
    };

    // Use words from configuration file
    const words = threeDWords;

    // Create text sprites with positioning around hero element
    const sprites = words.map((word, index) => {
      const sprite = createTextSprite(word);
      
      // Position texts around the hero, avoiding the center
      // Create left and right clusters with some in the middle edges
      const isLeftSide = index % 2 === 0;
      const groupIndex = Math.floor(index / 2);
      const totalGroups = Math.ceil(words.length / 2);
      
      // Calculate position to avoid center (hero area) with better balance
      let x, y, z;
      
      // Minimum distance from center to keep texts away from hero
      const minDistanceFromCenter = 20;
      const maxDistanceFromCenter = 45;
      
      // Better distribution algorithm
      const positionIndex = index % 8; // Create 8 position zones
      const radiusVariation = minDistanceFromCenter + Math.random() * (maxDistanceFromCenter - minDistanceFromCenter);
      
      switch (positionIndex) {
        case 0: // Far left
          x = -radiusVariation * 1.2;
          break;
        case 1: // Left-top diagonal
          x = -radiusVariation * 0.8;
          break;
        case 2: // Left-bottom diagonal
          x = -radiusVariation * 0.7;
          break;
        case 3: // Near left
          x = -radiusVariation * 0.5;
          break;
        case 4: // Near right
          x = radiusVariation * 0.5;
          break;
        case 5: // Right-bottom diagonal
          x = radiusVariation * 0.7;
          break;
        case 6: // Right-top diagonal
          x = radiusVariation * 0.8;
          break;
        case 7: // Far right
          x = radiusVariation * 1.2;
          break;
      }
      
      // Add organic variation
      x += (Math.random() - 0.5) * 4;
      
      // Vertical distribution - more dynamic spread
      const verticalSpread = 35;
      const heightZones = [-0.7, -0.4, -0.1, 0.1, 0.4, 0.7];
      y = heightZones[index % heightZones.length] * verticalSpread + (Math.random() - 0.5) * 12;
      
      // Z positioning - create depth layers
      const depthLayers = [0, 10, 20, -10, -20];
      z = depthLayers[index % depthLayers.length] + (Math.random() - 0.5) * 5;
      
      sprite.position.set(x, y, z);
      
      // Varied sizes: small, medium, large - distributed randomly
      const sizeCategories = [
        { min: 4.0, max: 6.0 },   // Small
        { min: 6.0, max: 8.0 },   // Medium
        { min: 8.0, max: 12.0 }   // Large
      ];
      
      // Important words are more likely to be large and appear early
      const importantWords = ['TRANSCENDENCE', 'CONSCIOUSNESS', 'ENLIGHTENMENT', 'INFINITE', 'AWAKENING', 'LUCIDITY'];
      const isImportant = importantWords.includes(word);
      
      let sizeCategory;
      if (isImportant) {
        // 70% chance to be large, 30% medium
        sizeCategory = Math.random() < 0.7 ? sizeCategories[2] : sizeCategories[1];
      } else {
        // Random distribution for other words
        const rand = Math.random();
        if (rand < 0.4) sizeCategory = sizeCategories[0]; // 40% small
        else if (rand < 0.7) sizeCategory = sizeCategories[1]; // 30% medium
        else sizeCategory = sizeCategories[2]; // 30% large
      }
      
      const scale = sizeCategory.min + Math.random() * (sizeCategory.max - sizeCategory.min);
      sprite.scale.setScalar(scale);
      
      scene.add(sprite);
      return sprite;
    });

    textSpritesRef.current = sprites;

    // Create sophisticated GSAP timeline with staggered, elegant animations
    const timeline = gsap.timeline({ repeat: -1 });
    
    sprites.forEach((sprite, index) => {
      // Much faster staggering - multiple texts appear quickly
      const delayGroups = [
        0,      // First 2 texts appear immediately
        0.5,
        1.2,    // Next 2 appear very quickly
        1.8,
        3,      // Next group slightly delayed
        3.5,
        5,      // Final group for smooth continuation
        6
      ];
      const delay = delayGroups[index % delayGroups.length] + (Math.random() * 0.5);
      const duration = 25 + Math.random() * 15; // Slightly longer for smoother movement
      
      // Store initial position to maintain general area
      const initialX = sprite.position.x;
      const initialY = sprite.position.y;
      const initialZ = sprite.position.z;
      const isLeftSide = initialX < 0;
      
      // Faster fade in for immediate visibility
      const fadeInDuration = 1.5 + Math.random() * 0.5; // Much faster fade in
      timeline.to(sprite.material, {
        opacity: 0.6 + Math.random() * 0.3, // More visible overall
        duration: fadeInDuration,
        ease: "power2.out"
      }, delay);
      
      // Movement that maintains positioning around hero
      // Vertical floating movement
      timeline.to(sprite.position, {
        y: initialY + (Math.random() - 0.5) * 4,
        duration: duration * 0.4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1
      }, delay);
      
      // Horizontal drift - keeping texts on their respective sides
      const horizontalDrift = isLeftSide 
        ? initialX - Math.random() * 4 // Left side drifts more left
        : initialX + Math.random() * 4; // Right side drifts more right
        
      timeline.to(sprite.position, {
        x: horizontalDrift,
        duration: duration * 0.6,
        ease: "power2.inOut"
      }, delay + 2);
      
      // Z-axis movement for depth perception
      timeline.to(sprite.position, {
        z: initialZ + (Math.random() - 0.5) * 8,
        duration: duration * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1
      }, delay + 1);
      
      // Subtle, breathing-like scale animation
      timeline.to(sprite.scale, {
        x: sprite.scale.x * (0.9 + Math.random() * 0.2),
        y: sprite.scale.y * (0.9 + Math.random() * 0.2),
        z: sprite.scale.z * (0.9 + Math.random() * 0.2),
        duration: duration * 0.3,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut"
      }, delay + 2);
      
      // Very subtle rotation for organic feel
      timeline.to(sprite.rotation, {
        z: sprite.rotation.z + (Math.random() - 0.5) * Math.PI * 0.1,
        duration: duration * 0.8,
        ease: "sine.inOut"
      }, delay);
      
      // Elegant fade out with depth consideration
      timeline.to(sprite.material, {
        opacity: 0,
        duration: 3,
        ease: "power3.in"
      }, delay + duration - 3);
      
      // Return to original position for seamless loop
      timeline.set(sprite.position, {
        x: initialX,
        y: initialY,
        z: initialZ
      }, delay + duration);
    });

    animationTimelineRef.current = timeline;
    console.log('✅ Sophisticated floating text meshes created with Inter font');

    return () => {
      console.log('🧹 Cleaning up sophisticated text meshes...');
      
      // Stop GSAP animations
      if (animationTimelineRef.current) {
        animationTimelineRef.current.kill();
      }
      
      // Remove sprites from scene and dispose materials
      textSpritesRef.current.forEach(sprite => {
        scene.remove(sprite);
        if (sprite.material.map) {
          sprite.material.map.dispose();
        }
        sprite.material.dispose();
      });
      
      textSpritesRef.current = [];
      console.log('✅ Sophisticated text meshes cleanup completed');
    };
  }, [scene]);

  return null; // This component doesn't render anything directly
};

export default FloatingTextMeshes;