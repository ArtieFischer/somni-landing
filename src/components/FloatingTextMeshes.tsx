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

    console.log('🔤 Creating sophisticated floating text meshes...');

    const createTextSprite = (text: string, size: number = 512) => {
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Set up sophisticated text styling - using Playfair Display for elegance
      ctx.font = `700 ${size * 0.11}px 'Playfair Display', serif`;
      ctx.fillStyle = 'rgba(248, 250, 252, 0.85)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Enhanced multi-layer glow effect with dark blue and gray colors
      // Layer 1: Royal blue glow (largest)
      ctx.shadowColor = 'rgba(30, 64, 175, 0.7)'; // Royal blue
      ctx.shadowBlur = 40;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillText(text.toUpperCase(), size / 2, size / 2);
      
      // Layer 2: Dark gray accent glow (medium)
      ctx.shadowColor = 'rgba(55, 65, 81, 0.6)'; // Dark gray
      ctx.shadowBlur = 25;
      ctx.fillText(text.toUpperCase(), size / 2, size / 2);
      
      // Layer 3: Medium gray highlight (smallest)
      ctx.shadowColor = 'rgba(107, 114, 128, 0.4)'; // Medium gray
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
        blending: THREE.AdditiveBlending
      });
      
      return new THREE.Sprite(material);
    };

    // More sophisticated, consciousness-focused vocabulary
    const words = [
      'TRANSCENDENCE',
      'LUCIDITY', 
      'CONSCIOUSNESS',
      'ETHEREAL',
      'AWAKENING',
      'INFINITE',
      'SERENITY',
      'MINDFULNESS',
      'ASTRAL',
      'ENLIGHTENMENT',
      'METAMORPHOSIS',
      'SUBLIMINAL',
      'NIRVANA',
      'OMNISCIENCE'
    ];

    // Create text sprites with enhanced positioning
    const sprites = words.map((word, index) => {
      const sprite = createTextSprite(word);
      
      // More strategic 3D positioning for better visual flow
      const angle = (index / words.length) * Math.PI * 2;
      const radius = 40 + Math.random() * 30;
      const height = (Math.random() - 0.5) * 60;
      
      sprite.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
        height,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 30 + 10
      );
      
      // Enhanced scale variation based on word importance
      const importantWords = ['TRANSCENDENCE', 'CONSCIOUSNESS', 'ENLIGHTENMENT', 'INFINITE'];
      const isImportant = importantWords.includes(word);
      const scale = isImportant ? 4 + Math.random() * 2 : 2.5 + Math.random() * 2;
      sprite.scale.setScalar(scale);
      
      scene.add(sprite);
      return sprite;
    });

    textSpritesRef.current = sprites;

    // Create sophisticated GSAP timeline with staggered, elegant animations
    const timeline = gsap.timeline({ repeat: -1 });
    
    sprites.forEach((sprite, index) => {
      const delay = index * 3; // Longer delays for more contemplative feel
      const duration = 12 + Math.random() * 6; // Longer, more meditative durations
      
      // Sophisticated fade in with easing
      timeline.to(sprite.material, {
        opacity: 0.7 + Math.random() * 0.2,
        duration: 3.5, // Slower, more elegant fade
        ease: "power3.out"
      }, delay);
      
      // Gentle, flowing movement - more zen-like
      timeline.to(sprite.position, {
        x: sprite.position.x + (Math.random() - 0.5) * 15,
        y: sprite.position.y + (Math.random() - 0.5) * 12,
        z: sprite.position.z + (Math.random() - 0.5) * 8,
        duration: duration,
        ease: "power1.inOut"
      }, delay);
      
      // Subtle, breathing-like scale animation
      timeline.to(sprite.scale, {
        x: sprite.scale.x * (0.85 + Math.random() * 0.3),
        y: sprite.scale.y * (0.85 + Math.random() * 0.3),
        z: sprite.scale.z * (0.85 + Math.random() * 0.3),
        duration: duration * 0.7,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      }, delay + 2);
      
      // Very subtle rotation for organic feel
      timeline.to(sprite.rotation, {
        z: sprite.rotation.z + (Math.random() - 0.5) * Math.PI * 0.2,
        duration: duration,
        ease: "power1.inOut"
      }, delay);
      
      // Elegant fade out
      timeline.to(sprite.material, {
        opacity: 0,
        duration: 3.5,
        ease: "power3.in"
      }, delay + duration - 3.5);
    });

    animationTimelineRef.current = timeline;
    console.log('✅ Sophisticated floating text meshes created with Playfair Display font');

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