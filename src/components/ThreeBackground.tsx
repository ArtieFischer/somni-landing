import React, { useRef, useEffect, useState } from 'react';
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Defer Three.js initialization for better LCP
    const timer = setTimeout(() => {
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
      // Limit pixel ratio for better performance
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      
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

      // Post-processing setup - enhanced for beautiful glow
      console.log('🎨 Setting up post-processing...');
      const composer = new EffectComposer(renderer);
      composerRef.current = composer;

      // Render pass
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // Reduced bloom for better performance
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.4,   // strength - reduced for performance
        0.4,   // radius - reduced for performance
        0.6    // threshold - higher to bloom only bright areas
      );
      composer.addPass(bloomPass);

      // Skip FXAA on mobile for better performance
      if (window.innerWidth > 768) {
        const fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
        fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
        composer.addPass(fxaaPass);
      }

      console.log('✅ Post-processing setup complete');

      // Create the main cloth/sky plane - using theme colors
      console.log('🌊 Creating cloth shader plane...');
      const clothGeometry = new THREE.PlaneGeometry(40, 40, 64, 64);
      
      const clothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 3.5 }, // Increased for more movement
          uColor1: { value: new THREE.Color(0x0B1426) }, // Deep midnight (theme)
          uColor2: { value: new THREE.Color(0x8B5CF6) }, // Aurora purple (theme)
          uColor3: { value: new THREE.Color(0x10B981) }, // Ethereal teal (theme)
          uColor4: { value: new THREE.Color(0xA78BFA) }, // Mystic lavender (theme)
          uColor5: { value: new THREE.Color(0x3b3ef6) }, // Dream blue (complementary)
          uOpacity: { value: 0.85 } // More visible
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
      clothMesh.position.z = -5;
      scene.add(clothMesh);
      console.log('✅ Cloth shader plane created');

      // Create additional background layers for depth - with theme colors
      console.log('🌌 Creating background layers...');
      
      // Layer 1: Distant cloth - deep purple/teal
      const distantClothGeometry = new THREE.PlaneGeometry(60, 60, 32, 32);
      const distantClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 2.0 },
          uColor1: { value: new THREE.Color(0x1A2332) }, // Darker slate (theme)
          uColor2: { value: new THREE.Color(0x4C1D95) }, // Deep purple (complementary)
          uColor3: { value: new THREE.Color(0x065F46) }, // Deep teal (complementary)
          uColor4: { value: new THREE.Color(0x8B5CF6) }, // Aurora purple (theme)
          uColor5: { value: new THREE.Color(0x10B981) }, // Ethereal teal (theme)
          uOpacity: { value: 0.6 }
        },
        transparent: true,
        side: THREE.DoubleSide,
      });
      
      const distantClothMesh = new THREE.Mesh(distantClothGeometry, distantClothMaterial);
      distantClothMesh.position.z = -15;
      distantClothMesh.rotation.z = Math.PI * 0.1;
      scene.add(distantClothMesh);

      // Layer 2: Foreground cloth - bright theme colors
      const foregroundClothGeometry = new THREE.PlaneGeometry(30, 30, 48, 48);
      const foregroundClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 4.0 }, // More dramatic
          uColor1: { value: new THREE.Color(0xA78BFA) }, // Mystic lavender (theme)
          uColor2: { value: new THREE.Color(0x8B5CF6) }, // Aurora purple (theme)
          uColor3: { value: new THREE.Color(0x10B981) }, // Ethereal teal (theme)
          uColor4: { value: new THREE.Color(0x06B6D4) }, // Cyan (complementary)
          uColor5: { value: new THREE.Color(0xEC4899) }, // Pink (complementary)
          uOpacity: { value: 0.7 }
        },
        transparent: true,
        side: THREE.DoubleSide,
      });
      
      const foregroundClothMesh = new THREE.Mesh(foregroundClothGeometry, foregroundClothMaterial);
      foregroundClothMesh.position.z = 2;
      foregroundClothMesh.rotation.z = -Math.PI * 0.05;
      scene.add(foregroundClothMesh);

      console.log('✅ Background layers created');

      // Animation loop - optimized
      let frameCount = 0;
      let lastTime = 0;
      const targetFPS = 30; // Limit to 30fps for better performance
      const frameInterval = 1000 / targetFPS;
      
      const animate = (currentTime: number) => {
        animationIdRef.current = requestAnimationFrame(animate);
        
        // Throttle animation to target FPS
        const deltaTime = currentTime - lastTime;
        if (deltaTime < frameInterval) return;
        
        lastTime = currentTime - (deltaTime % frameInterval);
        frameCount++;

        const elapsedTime = clockRef.current.getElapsedTime();

        // Update cloth shader uniforms - more dynamic
        clothMaterial.uniforms.uTime.value = elapsedTime * 0.8;
        distantClothMaterial.uniforms.uTime.value = elapsedTime * 0.5;
        foregroundClothMaterial.uniforms.uTime.value = elapsedTime * 1.2;

        // Enhanced rotation for the cloth layers
        clothMesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02;
        distantClothMesh.rotation.z = Math.PI * 0.1 + Math.sin(elapsedTime * 0.07) * 0.015;
        foregroundClothMesh.rotation.z = -Math.PI * 0.05 + Math.sin(elapsedTime * 0.13) * 0.025;


        // Render with post-processing
        composer.render();
      };

      // Start animation immediately after setup
      setIsLoaded(true);
      animate(0);

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        
        // Update FXAA resolution if it exists
        if (window.innerWidth > 768) {
          // FXAA pass would be the last pass if it exists
          const passes = composer.passes;
          const fxaaPass = passes[passes.length - 1];
          if (fxaaPass && fxaaPass.material && fxaaPass.material.uniforms['resolution']) {
            fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
            fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
          }
        }
        
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
        
        renderer.dispose();
        composer.dispose();
        console.log('✅ Cloth background cleanup completed');
      };
    } catch (error) {
      console.error('❌ Error initializing Three.js cloth background:', error);
    }
    }, 500); // Delay Three.js init by 500ms to let hero content render first
    
    return () => clearTimeout(timer);
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
          transition: 'opacity 0.5s ease-in-out',
          opacity: isLoaded ? 1 : 0.3,
        }}
      />
      {sceneRef.current && <FloatingTextMeshes scene={sceneRef.current} />}
    </>
  );
};

export default ThreeBackground;