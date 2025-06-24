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
      
      // Set up text styling - enhanced with theme colors
      ctx.font = `300 ${size * 0.12}px Inter, sans-serif`;
      ctx.fillStyle = 'rgba(248, 250, 252, 0.8)'; // More visible
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '0.15em';
      
      // Enhanced glow effect using theme colors
      ctx.shadowColor = 'rgba(139, 92, 246, 0.6)'; // Aurora purple glow
      ctx.shadowBlur = 25;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Draw text
      ctx.fillText(text.toUpperCase(), size / 2, size / 2);
      
      // Add secondary glow with different color
      ctx.shadowColor = 'rgba(16, 185, 129, 0.4)'; // Ethereal teal glow
      ctx.shadowBlur = 35;
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

    // Enhanced words with more mystical/consciousness themes
    const words = [
      'TRANSCEND',
      'LUCIDITY', 
      'CONSCIOUSNESS',
      'ETHEREAL',
      'AWAKENING',
      'INFINITE',
      'SERENITY',
      'MINDFUL',
      'ASTRAL',
      'ENLIGHTEN'
    ];

    // Create text sprites
    const sprites = words.map((word, index) => {
      const sprite = createTextSprite(word);
      
      // Position sprites in 3D space - more dynamic positioning
      sprite.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60 + 20
      );
      
      // Enhanced scale variation
      const scale = 3 + Math.random() * 4;
      sprite.scale.setScalar(scale);
      
      scene.add(sprite);
      return sprite;
    });

    textSpritesRef.current = sprites;

    // Create enhanced GSAP timeline for dynamic text animations
    const timeline = gsap.timeline({ repeat: -1 });
    
    sprites.forEach((sprite, index) => {
      const delay = index * 2.5;
      const duration = 8 + Math.random() * 4;
      
      // Enhanced fade in animation
      timeline.to(sprite.material, {
        opacity: 0.6 + Math.random() * 0.3, // Higher opacity
        duration: 2.5,
        ease: "power2.out"
      }, delay);
      
      // More dynamic floating movement
      timeline.to(sprite.position, {
        x: sprite.position.x + (Math.random() - 0.5) * 20,
        y: sprite.position.y + (Math.random() - 0.5) * 15,
        z: sprite.position.z + (Math.random() - 0.5) * 10,
        duration: duration,
        ease: "power1.inOut"
      }, delay);
      
      // Enhanced scale pulsing
      timeline.to(sprite.scale, {
        x: sprite.scale.x * (0.8 + Math.random() * 0.4),
        y: sprite.scale.y * (0.8 + Math.random() * 0.4),
        z: sprite.scale.z * (0.8 + Math.random() * 0.4),
        duration: duration * 0.6,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }, delay + 1);
      
      // Rotation animation for more dynamic effect
      timeline.to(sprite.rotation, {
        z: sprite.rotation.z + (Math.random() - 0.5) * Math.PI * 0.5,
        duration: duration,
        ease: "power1.inOut"
      }, delay);
      
      // Enhanced fade out animation
      timeline.to(sprite.material, {
        opacity: 0,
        duration: 2.5,
        ease: "power2.in"
      }, delay + duration - 2.5);
    });

    animationTimelineRef.current = timeline;
    console.log('✅ Enhanced floating text meshes created and animated');

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