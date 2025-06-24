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

      // Post-processing setup - enhanced for beautiful glow
      console.log('🎨 Setting up post-processing...');
      const composer = new EffectComposer(renderer);
      composerRef.current = composer;

      // Render pass
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      // Enhanced bloom for beautiful glow
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.6,   // strength - reduced for subtler glow
        0.8,   // radius - larger for softer glow
        0.5    // threshold - higher for more selective bloom
      );
      composer.addPass(bloomPass);

      // FXAA for anti-aliasing
      const fxaaPass = new ShaderPass(FXAAShader);
      fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
      fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
      composer.addPass(fxaaPass);

      console.log('✅ Post-processing setup complete');

      // Create the main cloth/sky plane - using dark blue and gray colors
      console.log('🌊 Creating cloth shader plane...');
      const clothGeometry = new THREE.PlaneGeometry(40, 40, 256, 256);
      
      const clothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 3.5 },
          uColor1: { value: new THREE.Color(0x0B1426) }, // Deep midnight (unchanged)
          uColor2: { value: new THREE.Color(0x1E3A8A) }, // Deep blue
          uColor3: { value: new THREE.Color(0x374151) }, // Dark gray
          uColor4: { value: new THREE.Color(0x475569) }, // Medium gray
          uColor5: { value: new THREE.Color(0x1E40AF) }, // Royal blue
          uOpacity: { value: 0.85 }
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
      clothMesh.position.z = -5;
      scene.add(clothMesh);
      console.log('✅ Cloth shader plane created');

      // Create additional background layers for depth - with dark blue/gray colors
      console.log('🌌 Creating background layers...');
      
      // Layer 1: Distant cloth - very dark blues and grays
      const distantClothGeometry = new THREE.PlaneGeometry(60, 60, 128, 128);
      const distantClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 2.0 },
          uColor1: { value: new THREE.Color(0x1A2332) }, // Darker slate (unchanged)
          uColor2: { value: new THREE.Color(0x1E293B) }, // Very dark blue-gray
          uColor3: { value: new THREE.Color(0x334155) }, // Slate gray
          uColor4: { value: new THREE.Color(0x1E3A8A) }, // Deep blue
          uColor5: { value: new THREE.Color(0x64748B) }, // Light gray
          uOpacity: { value: 0.6 }
        },
        transparent: true,
        side: THREE.DoubleSide,
      });
      
      const distantClothMesh = new THREE.Mesh(distantClothGeometry, distantClothMaterial);
      distantClothMesh.position.z = -15;
      distantClothMesh.rotation.z = Math.PI * 0.1;
      scene.add(distantClothMesh);

      // Layer 2: Foreground cloth - brighter blues and grays
      const foregroundClothGeometry = new THREE.PlaneGeometry(30, 30, 192, 192);
      const foregroundClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 4.0 },
          uColor1: { value: new THREE.Color(0x475569) }, // Medium gray
          uColor2: { value: new THREE.Color(0x1E40AF) }, // Royal blue
          uColor3: { value: new THREE.Color(0x374151) }, // Dark gray
          uColor4: { value: new THREE.Color(0x2563EB) }, // Bright blue
          uColor5: { value: new THREE.Color(0x6B7280) }, // Cool gray
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

      // Add enhanced atmospheric particles with dark blue/gray colors
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

        // Dark blue and gray color variants
        const colorChoice = Math.random();
        if (colorChoice < 0.3) {
          // Deep blue variants
          colors[i] = 0.12 + Math.random() * 0.1;     // R
          colors[i + 1] = 0.23 + Math.random() * 0.15; // G  
          colors[i + 2] = 0.54 + Math.random() * 0.2; // B
        } else if (colorChoice < 0.6) {
          // Dark gray variants
          colors[i] = 0.22 + Math.random() * 0.15;     // R
          colors[i + 1] = 0.26 + Math.random() * 0.15; // G
          colors[i + 2] = 0.32 + Math.random() * 0.15; // B
        } else if (colorChoice < 0.8) {
          // Medium gray variants
          colors[i] = 0.28 + Math.random() * 0.15;     // R
          colors[i + 1] = 0.32 + Math.random() * 0.15; // G
          colors[i + 2] = 0.34 + Math.random() * 0.15; // B
        } else {
          // Royal blue variants
          colors[i] = 0.15 + Math.random() * 0.1;     // R
          colors[i + 1] = 0.25 + Math.random() * 0.15; // G
          colors[i + 2] = 0.69 + Math.random() * 0.15; // B
        }

        sizes[i / 3] = Math.random() * 0.5 + 0.1;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      console.log('✅ Atmospheric particles created');

      // Add floating geometric shapes with dark blue/gray colors
      console.log('🔷 Creating floating geometric shapes...');
      const geometries = [
        new THREE.TetrahedronGeometry(0.8),
        new THREE.OctahedronGeometry(0.7),
        new THREE.IcosahedronGeometry(0.6),
        new THREE.TorusGeometry(0.6, 0.2, 8, 16),
        new THREE.RingGeometry(0.4, 0.8, 8),
      ];

      const shapeMaterials = [
        new THREE.MeshBasicMaterial({
          color: 0x1E40AF, // Royal blue
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x374151, // Dark gray
          transparent: true,
          opacity: 0.5,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x475569, // Medium gray
          transparent: true,
          opacity: 0.55,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x2563EB, // Bright blue
          transparent: true,
          opacity: 0.45,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x6B7280, // Cool gray
          transparent: true,
          opacity: 0.5,
          wireframe: true,
        }),
      ];

      const shapes: THREE.Mesh[] = [];
      for (let i = 0; i < 25; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = shapeMaterials[Math.floor(Math.random() * shapeMaterials.length)];
        const shape = new THREE.Mesh(geometry, material);
        
        shape.position.set(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 40
        );
        
        shape.rotation.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        );
        
        shapes.push(shape);
        scene.add(shape);
      }

      // Animation loop - enhanced movement
      let frameCount = 0;
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
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

        // Animate particles - more dynamic
        const positions = particleSystem.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(elapsedTime * 0.8 + i * 0.01) * 0.003;
          positions[i] += Math.cos(elapsedTime * 0.6 + i * 0.008) * 0.002;
          positions[i + 2] += Math.sin(elapsedTime * 0.4 + i * 0.012) * 0.001;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;

        // Rotate particle system
        particleSystem.rotation.y = elapsedTime * 0.02;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.05) * 0.01;

        // Animate floating shapes
        shapes.forEach((shape, index) => {
          shape.rotation.x += 0.01 + index * 0.0003;
          shape.rotation.y += 0.015 + index * 0.0004;
          shape.rotation.z += 0.008 + index * 0.0002;
          
          shape.position.y += Math.sin(elapsedTime * 1.5 + index) * 0.008;
          shape.position.x += Math.cos(elapsedTime * 1.2 + index) * 0.006;
          shape.position.z += Math.sin(elapsedTime * 0.9 + index) * 0.004;
        });

        // Render with post-processing
        composer.render();
      };

      animate();

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
        
        // Dispose shape materials and geometries
        shapes.forEach(shape => {
          shape.material.dispose();
          shape.geometry.dispose();
        });
        
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