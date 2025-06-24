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

      // Post-processing setup - much more subtle
      console.log('🎨 Setting up post-processing...');
      const composer = new EffectComposer(renderer);
      composerRef.current = composer;

      // Render pass
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // Very subtle bloom for minimal glow
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.3,   // strength - much lower
        0.2,   // radius - smaller
        0.9    // threshold - higher (less bloom)
      );
      composer.addPass(bloomPass);

      // FXAA for anti-aliasing
      const fxaaPass = new ShaderPass(FXAAShader);
      fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
      fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
      composer.addPass(fxaaPass);

      console.log('✅ Post-processing setup complete');

      // Create the main cloth/sky plane - much darker colors
      console.log('🌊 Creating cloth shader plane...');
      const clothGeometry = new THREE.PlaneGeometry(40, 40, 256, 256);
      
      const clothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 2.0 }, // Reduced intensity
          uColor1: { value: new THREE.Color(0x000000) }, // Pure black
          uColor2: { value: new THREE.Color(0x0B1426) }, // Deep midnight (theme)
          uColor3: { value: new THREE.Color(0x1A2332) }, // Darker slate (theme)
          uOpacity: { value: 0.7 } // More transparent
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
      clothMesh.position.z = -5;
      scene.add(clothMesh);
      console.log('✅ Cloth shader plane created');

      // Create additional background layers for depth - very dark
      console.log('🌌 Creating background layers...');
      
      // Layer 1: Distant cloth - almost invisible
      const distantClothGeometry = new THREE.PlaneGeometry(60, 60, 128, 128);
      const distantClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 1.0 }, // Very subtle
          uColor1: { value: new THREE.Color(0x000000) }, // Black
          uColor2: { value: new THREE.Color(0x050A13) }, // Very dark blue
          uColor3: { value: new THREE.Color(0x0B1426) }, // Deep midnight
          uOpacity: { value: 0.2 } // Very transparent
        },
        transparent: true,
        side: THREE.DoubleSide,
      });
      
      const distantClothMesh = new THREE.Mesh(distantClothGeometry, distantClothMaterial);
      distantClothMesh.position.z = -15;
      distantClothMesh.rotation.z = Math.PI * 0.1;
      scene.add(distantClothMesh);

      // Layer 2: Foreground cloth - subtle purple hints
      const foregroundClothGeometry = new THREE.PlaneGeometry(30, 30, 192, 192);
      const foregroundClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 2.5 },
          uColor1: { value: new THREE.Color(0x0B1426) }, // Deep midnight
          uColor2: { value: new THREE.Color(0x1A2332) }, // Darker slate
          uColor3: { value: new THREE.Color(0x2D1B69) }, // Very dark purple (muted theme color)
          uOpacity: { value: 0.4 } // Semi-transparent
        },
        transparent: true,
        side: THREE.DoubleSide,
      });
      
      const foregroundClothMesh = new THREE.Mesh(foregroundClothGeometry, foregroundClothMaterial);
      foregroundClothMesh.position.z = 2;
      foregroundClothMesh.rotation.z = -Math.PI * 0.05;
      scene.add(foregroundClothMesh);

      console.log('✅ Background layers created');

      // Add minimal atmospheric particles
      console.log('✨ Creating atmospheric particles...');
      const particleCount = 400; // Reduced count
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 50;

        // Very subtle colors - mostly dark with tiny hints of theme colors
        const colorChoice = Math.random();
        if (colorChoice < 0.7) {
          // Mostly very dark grays
          colors[i] = 0.1;     // R
          colors[i + 1] = 0.12; // G  
          colors[i + 2] = 0.15; // B
        } else if (colorChoice < 0.9) {
          // Subtle purple hints
          colors[i] = 0.2;     // R
          colors[i + 1] = 0.1; // G
          colors[i + 2] = 0.3; // B
        } else {
          // Rare teal hints
          colors[i] = 0.05;    // R
          colors[i + 1] = 0.2; // G
          colors[i + 2] = 0.15; // B
        }

        sizes[i / 3] = Math.random() * 0.3 + 0.05; // Smaller particles
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.2, // Smaller
        vertexColors: true,
        transparent: true,
        opacity: 0.3, // Much more transparent
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      console.log('✅ Atmospheric particles created');

      console.log(`🎯 Total scene objects: ${scene.children.length}`);

      // Animation loop - slower, more subtle
      let frameCount = 0;
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        frameCount++;

        const elapsedTime = clockRef.current.getElapsedTime();

        // Update cloth shader uniforms - slower time progression
        clothMaterial.uniforms.uTime.value = elapsedTime * 0.5; // Slower
        distantClothMaterial.uniforms.uTime.value = elapsedTime * 0.3; // Even slower
        foregroundClothMaterial.uniforms.uTime.value = elapsedTime * 0.7;

        // Very subtle rotation for the cloth layers
        clothMesh.rotation.z = Math.sin(elapsedTime * 0.05) * 0.01; // Much slower and smaller
        distantClothMesh.rotation.z = Math.PI * 0.1 + Math.sin(elapsedTime * 0.03) * 0.005;
        foregroundClothMesh.rotation.z = -Math.PI * 0.05 + Math.sin(elapsedTime * 0.07) * 0.008;

        // Animate particles - very subtle
        const positions = particleSystem.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(elapsedTime * 0.5 + i * 0.01) * 0.001; // Much slower
          positions[i] += Math.cos(elapsedTime * 0.3 + i * 0.008) * 0.0005;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;

        // Very slow rotation of particle system
        particleSystem.rotation.y = elapsedTime * 0.01;

        // Log every 120 frames
        if (frameCount % 120 === 0) {
          console.log(`🎬 SUBTLE CLOTH ANIMATION! Frame: ${frameCount}, Time: ${elapsedTime.toFixed(2)}`);
        }

        // Render with post-processing
        composer.render();
      };

      console.log('🎬 Starting subtle cloth animation loop...');
      animate();
      console.log('✅ Subtle cloth animation loop started successfully!');

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