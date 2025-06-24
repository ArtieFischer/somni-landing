import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface FloatingTextMeshesProps {
  scene: THREE.Scene;
}

const FloatingTextMeshes: React.FC<FloatingTextMeshesProps> = ({ scene }) => {
  const textSpritesRef = useRef<THREE.Sprite[]>([]);
  const animationTimelineRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!scene) return;

    console.log('🔤 Creating floating text meshes...');

    const createTextSprite = (text: string, size: number = 512) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Set up text styling - much more subtle
      ctx.font = `200 ${size * 0.1}px Inter, sans-serif`; // Lighter weight, smaller
      ctx.fillStyle = 'rgba(248, 250, 252, 0.4)'; // Much more transparent
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '0.15em';
      
      // Very subtle glow effect using theme colors
      ctx.shadowColor = 'rgba(139, 92, 246, 0.2)'; // Much more subtle purple
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Draw text
      ctx.fillText(text.toUpperCase(), size / 2, size / 2);
      
      // Create texture and sprite
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      
      const material = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true,
        opacity: 0,
        alphaTest: 0.001
      });
      
      return new THREE.Sprite(material);
    };

    // Fewer, more meaningful words for subtlety
    const words = [
      'TRANSCEND',
      'LUCIDITY', 
      'CONSCIOUSNESS',
      'SERENITY',
      'MINDFUL',
      'INFINITE'
    ];

    // Create text sprites
    const sprites = words.map((word, index) => {
      const sprite = createTextSprite(word);
      
      // Position sprites in 3D space - more spread out
      sprite.position.set(
        (Math.random() - 0.5) * 80, // More spread
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40 + 15
      );
      
      // Smaller, more subtle scale
      const scale = 2 + Math.random() * 2; // Smaller range
      sprite.scale.setScalar(scale);
      
      scene.add(sprite);
      return sprite;
    });

    textSpritesRef.current = sprites;

    // Create GSAP timeline for very subtle text animations
    const timeline = gsap.timeline({ repeat: -1 });
    
    sprites.forEach((sprite, index) => {
      const delay = index * 3; // Longer delays between appearances
      const duration = 6 + Math.random() * 4; // Longer duration
      
      // Very subtle fade in animation
      timeline.to(sprite.material, {
        opacity: 0.3 + Math.random() * 0.2, // Much lower max opacity
        duration: 2, // Slower fade in
        ease: "power2.out"
      }, delay);
      
      // Very slow floating movement
      timeline.to(sprite.position, {
        x: sprite.position.x + (Math.random() - 0.5) * 10, // Smaller movement
        y: sprite.position.y + (Math.random() - 0.5) * 8,
        z: sprite.position.z + (Math.random() - 0.5) * 5,
        duration: duration,
        ease: "power1.inOut"
      }, delay);
      
      // Very subtle scale pulsing
      timeline.to(sprite.scale, {
        x: sprite.scale.x * (0.9 + Math.random() * 0.2), // Smaller scale variation
        y: sprite.scale.y * (0.9 + Math.random() * 0.2),
        z: sprite.scale.z * (0.9 + Math.random() * 0.2),
        duration: duration * 0.7,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }, delay + 1);
      
      // Slow fade out animation
      timeline.to(sprite.material, {
        opacity: 0,
        duration: 2, // Slower fade out
        ease: "power2.in"
      }, delay + duration - 2);
    });

    animationTimelineRef.current = timeline;
    console.log('✅ Subtle floating text meshes created and animated');

    return () => {
      console.log('🧹 Cleaning up floating text meshes...');
      
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
      console.log('✅ Text meshes cleanup completed');
    };
  }, [scene]);

  return null; // This component doesn't render anything directly
};

export default FloatingTextMeshes;