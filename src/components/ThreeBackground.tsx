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
        powerPreference: 'high-performance',
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
        0.8, // strength
        0.6, // radius
        0.4 // threshold
      );
      composer.addPass(bloomPass);

      // FXAA for anti-aliasing
      const fxaaPass = new ShaderPass(FXAAShader);
      fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
      fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
      composer.addPass(fxaaPass);

      console.log('✅ Post-processing setup complete');

      // Create the main cloth/sky plane - updated to emphasise purple (#8B5CF6) & green (#10B981)
      console.log('🌊 Creating cloth shader plane...');
      const clothGeometry = new THREE.PlaneGeometry(40, 40, 256, 256);

      const clothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 3.5 },
          uColor1: { value: new THREE.Color(0x0B1426) }, // Deep midnight
          uColor2: { value: new THREE.Color(0x8B5CF6) }, // Dominant purple
          uColor3: { value: new THREE.Color(0x10B981) }, // Dominant green
          uColor4: { value: new THREE.Color(0xA78BFA) }, // Lavender accent (purple family)
          uColor5: { value: new THREE.Color(0x10B981) }, // Reinforce green (removed blue)
          uOpacity: { value: 0.85 },
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

      // Layer 1: Distant cloth – deep tones anchored by purple & green
      const distantClothGeometry = new THREE.PlaneGeometry(60, 60, 128, 128);
      const distantClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 2.0 },
          uColor1: { value: new THREE.Color(0x1A2332) }, // Dark slate
          uColor2: { value: new THREE.Color(0x4C1D95) }, // Deepened purple
          uColor3: { value: new THREE.Color(0x10B981) }, // Green highlight
          uColor4: { value: new THREE.Color(0x8B5CF6) }, // Purple highlight
          uColor5: { value: new THREE.Color(0x10B981) }, // Green highlight
          uOpacity: { value: 0.6 },
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      const distantClothMesh = new THREE.Mesh(
        distantClothGeometry,
        distantClothMaterial
      );
      distantClothMesh.position.z = -15;
      distantClothMesh.rotation.z = Math.PI * 0.1;
      scene.add(distantClothMesh);

      // Layer 2: Foreground cloth – brighter purple & green flourishes
      const foregroundClothGeometry = new THREE.PlaneGeometry(30, 30, 192, 192);
      const foregroundClothMaterial = new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: 4.0 },
          uColor1: { value: new THREE.Color(0xA78BFA) }, // Soft lavender
          uColor2: { value: new THREE.Color(0x8B5CF6) }, // Purple
          uColor3: { value: new THREE.Color(0x10B981) }, // Green
          uColor4: { value: new THREE.Color(0x10B981) }, // Green accent (replaces cyan)
          uColor5: { value: new THREE.Color(0x8B5CF6) }, // Purple accent (replaces pink)
          uOpacity: { value: 0.7 },
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

      const foregroundClothMesh = new THREE.Mesh(
        foregroundClothGeometry,
        foregroundClothMaterial
      );
      foregroundClothMesh.position.z = 2;
      foregroundClothMesh.rotation.z = -Math.PI * 0.05;
      scene.add(foregroundClothMesh);

      console.log('✅ Background layers created');

      // Atmospheric particles – limited to purple/green palette
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

        // Generate colours biased toward purple & green
        const isPurple = Math.random() < 0.5;
        if (isPurple) {
          // Purple variant (#8B5CF6 → ~0.54,0.36,0.96)
          colors[i] = 0.54 + Math.random() * 0.2; // R
          colors[i + 1] = 0.36 + Math.random() * 0.2; // G
          colors[i + 2] = 0.96 + Math.random() * 0.04; // B
        } else {
          // Green variant (#10B981 → ~0.06,0.72,0.50)
          colors[i] = 0.06 + Math.random() * 0.1; // R
          colors[i + 1] = 0.72 + Math.random() * 0.2; // G
          colors[i + 2] = 0.50 + Math.random() * 0.3; // B
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

      // Floating geometric shapes – colour-limited to purple & green family
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
          color: 0x8B5CF6, // Purple
          transparent: true,
          opacity: 0.6,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0x10B981, // Green
          transparent: true,
          opacity: 0.5,
          wireframe: true,
        }),
        new THREE.MeshBasicMaterial({
          color: 0xA78BFA, // Lavender (purple family)
          transparent: true,
          opacity: 0.55,
          wireframe: true,
        }),
        // Replace cyan with green to stay on‑palette
        new THREE.MeshBasicMaterial({
          color: 0x10B981, // Green duplicate
          transparent: true,
          opacity: 0.45,
          wireframe: true,
        }),
        // Replace pink with purple to stay on‑palette
        new THREE.MeshBasicMaterial({
          color: 0x8B5CF6, // Purple duplicate
          transparent: true,
          opacity: 0.5,
          wireframe: true,
        }),
      ];

      const shapes: THREE.Mesh[] = [];
      for (let i = 0; i < 25; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material =
          shapeMaterials[Math.floor(Math.random() * shapeMaterials.length)];
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

      // Animation loop
      let frameCount = 0;
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        frameCount++;

        const elapsedTime = clockRef.current.getElapsedTime();

        // Update cloth shader uniforms
        clothMaterial.uniforms.uTime.value = elapsedTime * 0.8;
        distantClothMaterial.uniforms.uTime.value = elapsedTime * 0.5;
        foregroundClothMaterial.uniforms.uTime.value = elapsedTime * 1.2;

        // Cloth rotations
        clothMesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02;
        distantClothMesh.rotation.z =
          Math.PI * 0.1 + Math.sin(elapsedTime * 0.07) * 0.015;
        foregroundClothMesh.rotation.z =
          -Math.PI * 0.05 + Math.sin(elapsedTime * 0.13) * 0.025;

        // Particle drift
        const pPositions = particleSystem.geometry.attributes
          .position.array as Float32Array;
        for (let i = 0; i < pPositions.length; i += 3) {
          pPositions[i + 1] += Math.sin(elapsedTime * 0.8 + i * 0.01) * 0.003;
          pPositions[i] += Math.cos(elapsedTime * 0.6 + i * 0.008) * 0.002;
          pPositions[i + 2] += Math.sin(elapsedTime * 0.4 + i * 0.012) * 0.001;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;

        // Particle system rotation
        particleSystem.rotation.y = elapsedTime * 0.02;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.05) * 0.01;

        // Shape animations
        shapes.forEach((shape, index) => {
          shape.rotation.x += 0.01 + index * 0.0003;
          shape.rotation.y += 0.015 + index * 0.0004;
          shape.rotation.z += 0.008 + index * 0.0002;

          shape.position.y += Math.sin(elapsedTime * 1.5 + index) * 0.008;
          shape.position.x += Math.cos(elapsedTime * 1.2 + index) * 0.006;
          shape.position.z += Math.sin(elapsedTime * 0.9 + index) * 0.004;
        });

        // Render
        composer.render();
      };

      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);

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

        // Dispose materials & geometries
        clothMaterial.dispose();
        clothGeometry.dispose();
        distantClothMaterial.dispose();
        distantClothGeometry.dispose();
        foregroundClothMaterial.dispose();
        foregroundClothGeometry.dispose();
        particleMaterial.dispose();
        particles.dispose();

        shapes.forEach((shape) => {
          (shape.material as THREE.Material).dispose();
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
          background:
            'radial-gradient(ellipse at center, #0B1426 0%, #000000 100%)',
        }}
      />
      {sceneRef.current && <FloatingTextMeshes scene={sceneRef.current} />}
    </>
  );
};

export default ThreeBackground;
