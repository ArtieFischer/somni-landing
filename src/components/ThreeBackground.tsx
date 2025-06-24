import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { clothVertexShader, clothFragmentShader } from '../shaders/clothShader';
import FloatingTextMeshes from './FloatingTextMeshes';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const composerRef = useRef<EffectComposer>();
  const animationIdRef = useRef<number>();
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  useEffect(() => {
    console.log('🚀 ThreeBackground useEffect starting...');
    
    if (!mountRef.current) {
      console.log('❌ mountRef.current is null');
      return;
    }

    console.log('✅ mountRef.current exists, initializing Three.js...');

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      console.log('✅ Scene created');

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 15;
      console.log('✅ Camera created');

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      rendererRef.current = renderer;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Canvas styling
      renderer.domElement.style.position = 'fixed';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.zIndex = '1';
      renderer.domElement.style.pointerEvents = 'none';
      
      console.log('✅ Renderer created, appending to DOM...');
      mountRef.current.appendChild(renderer.domElement);
      console.log('✅ Renderer appended to DOM');

      // Post-processing setup
      console.log('🎨 Setting up post-processing...');
      const composer = new EffectComposer(renderer);
      composerRef.current = composer;

      // Render pass
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // Bloom pass for ethereal glow
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,   // strength
        0.4,   // radius  
        0.1    // threshold
      );
      composer.addPass(bloomPass);

      // FXAA for anti-aliasing
      const fxaaPass = new ShaderPass(FXAAShader);
      fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
      fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
      composer.addPass(fxaaPass);

      console.log('✅ Post-processing setup complete');

      // Create the main cloth/sky plane
      console.log('🌊 Creating cloth shader plane...');
      const clothGeometry = new THREE.PlaneGeometry(40, 40, 256, 256);
      
      const clothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 3.0 },
          uColor1: { value: new THREE.Color(0x0B1426) }, // Deep midnight
          uColor2: { value: new THREE.Color(0x1A2332) }, // Darker slate  
          uColor3: { value: new THREE.Color(0x8B5CF6) }, // Aurora purple
          uOpacity: { value: 0.9 }
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
      clothMesh.position.z = -5;
      scene.add(clothMesh);
      console.log('✅ Cloth shader plane created');

      // Create additional background layers for depth
      console.log('🌌 Creating background layers...');
      
      // Layer 1: Distant cloth
      const distantClothGeometry = new THREE.PlaneGeometry(60, 60, 128, 128);
      const distantClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 1.5 },
          uColor1: { value: new THREE.Color(0x000000) },
          uColor2: { value: new THREE.Color(0x0B1426) },
          uColor3: { value: new THREE.Color(0x10B981) }, // Ethereal teal
          uOpacity: { value: 0.4 }
        },
        transparent: true,
        side: THREE.DoubleSide,
      });
      
      const distantClothMesh = new THREE.Mesh(distantClothGeometry, distantClothMaterial);
      distantClothMesh.position.z = -15;
      distantClothMesh.rotation.z = Math.PI * 0.1;
      scene.add(distantClothMesh);

      // Layer 2: Foreground cloth
      const foregroundClothGeometry = new THREE.PlaneGeometry(30, 30, 192, 192);
      const foregroundClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 4.0 },
          uColor1: { value: new THREE.Color(0x1A2332) },
          uColor2: { value: new THREE.Color(0xA78BFA) }, // Mystic lavender
          uColor3: { value: new THREE.Color(0x8B5CF6) }, // Aurora purple
          uOpacity: { value: 0.6 }
        },
        transparent: true,
        side: THREE.DoubleSide,
      });
      
      const foregroundClothMesh = new THREE.Mesh(foregroundClothGeometry, foregroundClothMaterial);
      foregroundClothMesh.position.z = 2;
      foregroundClothMesh.rotation.z = -Math.PI * 0.05;
      scene.add(foregroundClothMesh);

      console.log('✅ Background layers created');

      // Add some floating particles for extra atmosphere
      console.log('✨ Creating atmospheric particles...');
      const particleCount = 800;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 50;

        // Soft color palette
        const colorChoice = Math.random();
        if (colorChoice < 0.5) {
          colors[i] = 0.9;     // R
          colors[i + 1] = 0.9; // G  
          colors[i + 2] = 1.0; // B
        } else {
          colors[i] = 0.6;     // R
          colors[i + 1] = 0.4; // G
          colors[i + 2] = 1.0; // B
        }

        sizes[i / 3] = Math.random() * 0.5 + 0.1;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.3,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      console.log('✅ Atmospheric particles created');

      console.log(`🎯 Total scene objects: ${scene.children.length}`);

      // Animation loop
      let frameCount = 0;
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        frameCount++;

        const elapsedTime = clockRef.current.getElapsedTime();

        // Update cloth shader uniforms
        clothMaterial.uniforms.uTime.value = elapsedTime;
        distantClothMaterial.uniforms.uTime.value = elapsedTime * 0.7;
        foregroundClothMaterial.uniforms.uTime.value = elapsedTime * 1.3;

        // Subtle rotation for the cloth layers
        clothMesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02;
        distantClothMesh.rotation.z = Math.PI * 0.1 + Math.sin(elapsedTime * 0.08) * 0.01;
        foregroundClothMesh.rotation.z = -Math.PI * 0.05 + Math.sin(elapsedTime * 0.12) * 0.015;

        // Animate particles
        const positions = particleSystem.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(elapsedTime + i * 0.01) * 0.002;
          positions[i] += Math.cos(elapsedTime * 0.8 + i * 0.008) * 0.001;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;

        // Slow rotation of particle system
        particleSystem.rotation.y = elapsedTime * 0.02;

        // Log every 120 frames
        if (frameCount % 120 === 0) {
          console.log(`🎬 CLOTH ANIMATION RUNNING! Frame: ${frameCount}, Time: ${elapsedTime.toFixed(2)}`);
        }

        // Render with post-processing
        composer.render();
      };

      console.log('🎬 Starting cloth animation loop...');
      animate();
      console.log('✅ Cloth animation loop started successfully!');

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        
        // Update FXAA resolution
        fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
        fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
        
        console.log('📱 Window resized, renderer and composer updated');
      };

      window.addEventListener('resize', handleResize);

      return () => {
        console.log('🧹 Cleaning up Three.js cloth background...');
        window.removeEventListener('resize', handleResize);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        
        // Dispose of materials and geometries
        clothMaterial.dispose();
        clothGeometry.dispose();
        distantClothMaterial.dispose();
        distantClothGeometry.dispose();
        foregroundClothMaterial.dispose();
        foregroundClothGeometry.dispose();
        particleMaterial.dispose();
        particles.dispose();
        
        renderer.dispose();
        composer.dispose();
        console.log('✅ Cloth background cleanup completed');
      };
    } catch (error) {
      console.error('❌ Error initializing Three.js cloth background:', error);
    }
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          background: 'radial-gradient(ellipse at center, #0B1426 0%, #000000 100%)',
        }}
      />
      {sceneRef.current && <FloatingTextMeshes scene={sceneRef.current} />}
    </>
  );
};

export default ThreeBackground;