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
        0.8,   // strength - increased for more visible purple/green glow
        0.6,   // radius - larger for softer glow
        0.3    // threshold - lower for more bloom on our colors
      );
      composer.addPass(bloomPass);

      // FXAA for anti-aliasing
      const fxaaPass = new ShaderPass(FXAAShader);
      fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
      fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
      composer.addPass(fxaaPass);

      console.log('✅ Post-processing setup complete');

      // Create the main cloth/sky plane - NOW WITH VISIBLE PURPLE AND GREEN!
      console.log('🌊 Creating cloth shader plane with PURPLE AND GREEN...');
      const clothGeometry = new THREE.PlaneGeometry(40, 40, 256, 256);
      
      const clothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 3.5 },
          uColor1: { value: new THREE.Color(0x0B1426) }, // Deep midnight (base)
          uColor2: { value: new THREE.Color(0x8B5CF6) }, // 🟣 AURORA PURPLE - PRIMARY!
          uColor3: { value: new THREE.Color(0x10B981) }, // 🟢 ETHEREAL GREEN - SECONDARY!
          uColor4: { value: new THREE.Color(0x1E3A8A) }, // Deep blue (supporting)
          uColor5: { value: new THREE.Color(0xA78BFA) }, // 🟣 MYSTIC LAVENDER - PRIMARY VARIANT!
          uOpacity: { value: 0.9 } // Increased for more visibility
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
      clothMesh.position.z = -5;
      scene.add(clothMesh);
      console.log('✅ Cloth shader plane created with PURPLE AND GREEN');

      // Create additional background layers - WITH MORE PURPLE AND GREEN
      console.log('🌌 Creating background layers with PURPLE AND GREEN...');
      
      // Layer 1: Distant cloth - purple and green dominant
      const distantClothGeometry = new THREE.PlaneGeometry(60, 60, 128, 128);
      const distantClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 2.0 },
          uColor1: { value: new THREE.Color(0x1A2332) }, // Darker slate (base)
          uColor2: { value: new THREE.Color(0x8B5CF6) }, // 🟣 AURORA PURPLE - PRIMARY!
          uColor3: { value: new THREE.Color(0x10B981) }, // 🟢 ETHEREAL GREEN - SECONDARY!
          uColor4: { value: new THREE.Color(0x7C3AED) }, // 🟣 VIOLET - PRIMARY VARIANT!
          uColor5: { value: new THREE.Color(0x059669) }, // 🟢 EMERALD - SECONDARY VARIANT!
          uOpacity: { value: 0.7 } // Increased visibility
        },
        transparent: true,
        side: THREE.DoubleSide,
      });
      
      const distantClothMesh = new THREE.Mesh(distantClothGeometry, distantClothMaterial);
      distantClothMesh.position.z = -15;
      distantClothMesh.rotation.z = Math.PI * 0.1;
      scene.add(distantClothMesh);

      // Layer 2: Foreground cloth - bright purple and green
      const foregroundClothGeometry = new THREE.PlaneGeometry(30, 30, 192, 192);
      const foregroundClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 4.0 },
          uColor1: { value: new THREE.Color(0xA78BFA) }, // 🟣 MYSTIC LAVENDER - PRIMARY!
          uColor2: { value: new THREE.Color(0x8B5CF6) }, // 🟣 AURORA PURPLE - PRIMARY!
          uColor3: { value: new THREE.Color(0x10B981) }, // 🟢 ETHEREAL GREEN - SECONDARY!
          uColor4: { value: new THREE.Color(0x34D399) }, // 🟢 BRIGHT GREEN - SECONDARY VARIANT!
          uColor5: { value: new THREE.Color(0x9333EA) }, // 🟣 BRIGHT PURPLE - PRIMARY VARIANT!
          uOpacity: { value: 0.8 } // High visibility
        },
        transparent: true,
        side: THREE.DoubleSide,
      });
      
      const foregroundClothMesh = new THREE.Mesh(foregroundClothGeometry, foregroundClothMaterial);
      foregroundClothMesh.position.z = 2;
      foregroundClothMesh.rotation.z = -Math.PI * 0.05;
      scene.add(foregroundClothMesh);

      // NEW: Add dedicated PURPLE and GREEN accent layers for maximum visibility!
      console.log('💜💚 Creating dedicated PURPLE and GREEN accent layers...');
      
      // Purple accent layer
      const purpleAccentGeometry = new THREE.PlaneGeometry(35, 35, 128, 128);
      const purpleAccentMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 2.5 },
          uColor1: { value: new THREE.Color(0x8B5CF6) }, // 🟣 AURORA PURPLE
          uColor2: { value: new THREE.Color(0xA78BFA) }, // 🟣 MYSTIC LAVENDER
          uColor3: { value: new THREE.Color(0x7C3AED) }, // 🟣 VIOLET
          uColor4: { value: new THREE.Color(0x9333EA) }, // 🟣 BRIGHT PURPLE
          uColor5: { value: new THREE.Color(0xC084FC) }, // 🟣 LIGHT PURPLE
          uOpacity: { value: 0.6 }
        },
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending, // Enhanced blending for glow
      });
      
      const purpleAccentMesh = new THREE.Mesh(purpleAccentGeometry, purpleAccentMaterial);
      purpleAccentMesh.position.set(-8, 5, -2);
      purpleAccentMesh.rotation.z = Math.PI * 0.15;
      scene.add(purpleAccentMesh);

      // Green accent layer
      const greenAccentGeometry = new THREE.PlaneGeometry(32, 32, 128, 128);
      const greenAccentMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 2.8 },
          uColor1: { value: new THREE.Color(0x10B981) }, // 🟢 ETHEREAL GREEN
          uColor2: { value: new THREE.Color(0x059669) }, // 🟢 EMERALD
          uColor3: { value: new THREE.Color(0x34D399) }, // 🟢 BRIGHT GREEN
          uColor4: { value: new THREE.Color(0x6EE7B7) }, // 🟢 LIGHT GREEN
          uColor5: { value: new THREE.Color(0x047857) }, // 🟢 DARK GREEN
          uOpacity: { value: 0.65 }
        },
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending, // Enhanced blending for glow
      });
      
      const greenAccentMesh = new THREE.Mesh(greenAccentGeometry, greenAccentMaterial);
      greenAccentMesh.position.set(6, -3, 0);
      greenAccentMesh.rotation.z = -Math.PI * 0.12;
      scene.add(greenAccentMesh);

      console.log('✅ Background layers created with DOMINANT PURPLE AND GREEN');

      // Add enhanced atmospheric particles with PURPLE AND GREEN
      console.log('✨ Creating atmospheric particles with PURPLE AND GREEN...');
      const particleCount = 1000; // Increased count
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 50;

        // PURPLE AND GREEN dominant particles!
        const colorChoice = Math.random();
        if (colorChoice < 0.4) {
          // 🟣 PURPLE variants (40% of particles)
          colors[i] = 0.54 + Math.random() * 0.3;     // R
          colors[i + 1] = 0.36 + Math.random() * 0.2; // G  
          colors[i + 2] = 0.96 + Math.random() * 0.04; // B
        } else if (colorChoice < 0.8) {
          // 🟢 GREEN variants (40% of particles)
          colors[i] = 0.06 + Math.random() * 0.15;     // R
          colors[i + 1] = 0.72 + Math.random() * 0.25; // G
          colors[i + 2] = 0.50 + Math.random() * 0.3; // B
        } else {
          // Dark blue/gray supporting colors (20% of particles)
          colors[i] = 0.12 + Math.random() * 0.1;     // R
          colors[i + 1] = 0.23 + Math.random() * 0.15; // G
          colors[i + 2] = 0.54 + Math.random() * 0.2; // B
        }

        sizes[i / 3] = Math.random() * 0.6 + 0.2; // Larger particles
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.5, // Larger
        vertexColors: true,
        transparent: true,
        opacity: 0.8, // More visible
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      console.log('✅ Atmospheric particles created with PURPLE AND GREEN');

      // Add floating geometric shapes with PURPLE AND GREEN
      console.log('🔷 Creating floating geometric shapes with PURPLE AND GREEN...');
      const geometries = [
        new THREE.TetrahedronGeometry(0.8),
        new THREE.OctahedronGeometry(0.7),
        new THREE.IcosahedronGeometry(0.6),
        new THREE.TorusGeometry(0.6, 0.2, 8, 16),
        new THREE.RingGeometry(0.4, 0.8, 8),
      ];

      const shapeMaterials = [
        new THREE.MeshBasicMaterial({
          color: 0x8B5CF6, // 🟣 AURORA PURPLE - PRIMARY
          transparent: true,
          opacity: 0.7,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x10B981, // 🟢 ETHEREAL GREEN - SECONDARY
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0xA78BFA, // 🟣 MYSTIC LAVENDER - PRIMARY VARIANT
          transparent: true,
          opacity: 0.65,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x34D399, // 🟢 BRIGHT GREEN - SECONDARY VARIANT
          transparent: true,
          opacity: 0.55,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x9333EA, // 🟣 BRIGHT PURPLE - PRIMARY VARIANT
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        }),
      ];

      const shapes: THREE.Mesh[] = [];
      for (let i = 0; i < 30; i++) { // More shapes
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

      console.log('✅ Floating geometric shapes created with PURPLE AND GREEN');

      console.log(`🎯 Total scene objects: ${scene.children.length}`);

      // Animation loop - enhanced movement with PURPLE AND GREEN focus
      let frameCount = 0;
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        frameCount++;

        const elapsedTime = clockRef.current.getElapsedTime();

        // Update cloth shader uniforms - more dynamic
        clothMaterial.uniforms.uTime.value = elapsedTime * 0.8;
        distantClothMaterial.uniforms.uTime.value = elapsedTime * 0.5;
        foregroundClothMaterial.uniforms.uTime.value = elapsedTime * 1.2;
        
        // Animate the NEW purple and green accent layers
        purpleAccentMaterial.uniforms.uTime.value = elapsedTime * 0.9;
        greenAccentMaterial.uniforms.uTime.value = elapsedTime * 1.1;

        // Enhanced rotation for all cloth layers
        clothMesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02;
        distantClothMesh.rotation.z = Math.PI * 0.1 + Math.sin(elapsedTime * 0.07) * 0.015;
        foregroundClothMesh.rotation.z = -Math.PI * 0.05 + Math.sin(elapsedTime * 0.13) * 0.025;
        
        // Animate purple and green accent layers
        purpleAccentMesh.rotation.z = Math.PI * 0.15 + Math.sin(elapsedTime * 0.11) * 0.03;
        purpleAccentMesh.position.y = 5 + Math.sin(elapsedTime * 0.8) * 2;
        
        greenAccentMesh.rotation.z = -Math.PI * 0.12 + Math.sin(elapsedTime * 0.09) * 0.025;
        greenAccentMesh.position.x = 6 + Math.cos(elapsedTime * 0.7) * 1.5;

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

        // Log every 120 frames
        if (frameCount % 120 === 0) {
          console.log(`🎬 PURPLE & GREEN SMOKE ANIMATION! Frame: ${frameCount}, Time: ${elapsedTime.toFixed(2)}`);
        }

        // Render with post-processing
        composer.render();
      };

      console.log('🎬 Starting PURPLE AND GREEN smoke animation loop...');
      animate();
      console.log('✅ PURPLE AND GREEN smoke animation loop started successfully!');

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
        console.log('🧹 Cleaning up Three.js PURPLE AND GREEN background...');
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
        purpleAccentMaterial.dispose();
        purpleAccentGeometry.dispose();
        greenAccentMaterial.dispose();
        greenAccentGeometry.dispose();
        particleMaterial.dispose();
        particles.dispose();
        
        // Dispose shape materials and geometries
        shapes.forEach(shape => {
          shape.material.dispose();
          shape.geometry.dispose();
        });
        
        renderer.dispose();
        composer.dispose();
        console.log('✅ PURPLE AND GREEN background cleanup completed');
      };
    } catch (error) {
      console.error('❌ Error initializing Three.js PURPLE AND GREEN background:', error);
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