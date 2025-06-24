import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { clothVertexShader, clothFragmentShader } from '../shaders/clothShader';
import FloatingTextMeshes from './FloatingTextMeshes';

/**
 * NOTE ──────────────────────────────────────────────────────────────────
 * The visual balance is now tuned to create a **green‑purple aurora**.
 * ‑ Dominant hues → Purple `#8B5CF6` & Green `#10B981`.
 * ‑ Supporting hues → Deep violet `#4C1D95`, grey‑blue `#1E293B`.
 * ‑ Very limited blue; only subtle grey‑blue for depth.
 */

const PURPLE        = 0x8B5CF6; // #8B5CF6 (violet‑purple)
const PURPLE_DEEP   = 0x4C1D95; // #4C1D95 (deep violet)
const PURPLE_SOFT   = 0xA78BFA; // #A78BFA (soft lavender)
const GREEN         = 0x10B981; // #10B981 (jade‑green)
const GREEN_LIGHT   = 0x34D399; // #34D399 (mint‑green)
const BLUE_GREY     = 0x1E293B; // #1E293B (slate blue‑grey)
const BACKGROUND    = 0x0B1426; // #0B1426 (midnight)

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const composerRef = useRef<EffectComposer>();
  const animationIdRef = useRef<number>();
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  useEffect(() => {
    if (!mountRef.current) return;

    /* ──────────────────────────── THREE INITIALISATION ─────────────────────────── */
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /* Canvas styling */
    Object.assign(renderer.domElement.style, {
      position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: '1', pointerEvents: 'none',
    });
    mountRef.current.appendChild(renderer.domElement);

    /* ───────────────────────────── POST‑PROCESSING ─────────────────────────────── */
    const composer = new EffectComposer(renderer);
    composerRef.current = composer;
    composer.addPass(new RenderPass(scene, camera));

    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8, // strength
        0.6, // radius
        0.35 // threshold (slightly lowered)
      )
    );

    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
    fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
    composer.addPass(fxaaPass);

    /* ──────────────────────────────── SHADERS ──────────────────────────────────── */
    const createClothMaterial = (uIntensity: number, colors: number[], opacity = 0.75) =>
      new THREE.ShaderMaterial({
        vertexShader: clothVertexShader,
        fragmentShader: clothFragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIntensity: { value: uIntensity },
          uColor1: { value: new THREE.Color(colors[0]) },
          uColor2: { value: new THREE.Color(colors[1]) },
          uColor3: { value: new THREE.Color(colors[2]) },
          uColor4: { value: new THREE.Color(colors[3]) },
          uColor5: { value: new THREE.Color(colors[4]) },
          uOpacity: { value: opacity },
        },
        transparent: true,
        side: THREE.DoubleSide,
      });

    /* PRIMARY CLOTH (main aurora sheet) */
    const clothGeometry = new THREE.PlaneGeometry(40, 40, 256, 256);
    const clothMaterial = createClothMaterial(3.5, [BACKGROUND, PURPLE, GREEN, PURPLE_SOFT, GREEN_LIGHT], 0.85);
    const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial);
    clothMesh.position.z = -5;
    scene.add(clothMesh);

    /* DISTANT BACKDROP */
    const distantGeometry = new THREE.PlaneGeometry(60, 60, 128, 128);
    const distantMaterial = createClothMaterial(2.0, [BLUE_GREY, PURPLE_DEEP, GREEN, PURPLE, GREEN_LIGHT], 0.6);
    const distantMesh = new THREE.Mesh(distantGeometry, distantMaterial);
    distantMesh.position.z = -15;
    distantMesh.rotation.z = Math.PI * 0.1;
    scene.add(distantMesh);

    /* FOREGROUND HIGHLIGHT */
    const fgGeometry = new THREE.PlaneGeometry(30, 30, 192, 192);
    const fgMaterial = createClothMaterial(4.0, [PURPLE_SOFT, PURPLE, GREEN_LIGHT, GREEN, PURPLE_DEEP], 0.7);
    const fgMesh = new THREE.Mesh(fgGeometry, fgMaterial);
    fgMesh.position.z = 2;
    fgMesh.rotation.z = -Math.PI * 0.05;
    scene.add(fgMesh);

    /* ────────────────────────── PARTICLES (AURORA DUST) ────────────────────────── */
    const particleCount = 800;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i]     = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) *  50;

      const rnd = Math.random();
      let color: THREE.Color;
      if (rnd < 0.55)        color = new THREE.Color(PURPLE);          // ~55% purple
      else if (rnd < 0.9)    color = new THREE.Color(GREEN_LIGHT);     // ~35% green
      else                   color = new THREE.Color(BLUE_GREY);       // ~10% grey‑blue accent

      colors[i]     = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;

      sizes[i / 3] = Math.random() * 0.5 + 0.1;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

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

    /* ────────────────────── FLOATING GEOMETRIC SHAPES ─────────────────────────── */
    const geometries = [
      new THREE.TetrahedronGeometry(0.8),
      new THREE.OctahedronGeometry(0.7),
      new THREE.IcosahedronGeometry(0.6),
      new THREE.TorusGeometry(0.6, 0.2, 8, 16),
      new THREE.RingGeometry(0.4, 0.8, 8),
    ];

    const shapeMaterials = [PURPLE, GREEN, PURPLE_SOFT, GREEN_LIGHT, PURPLE_DEEP].map(
      (col) =>
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55, wireframe: true })
    );

    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 25; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = shapeMaterials[Math.floor(Math.random() * shapeMaterials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40);
      mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
      shapes.push(mesh);
      scene.add(mesh);
    }

    /* ───────────────────────────────── ANIMATE ────────────────────────────────── */
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      const t = clockRef.current.getElapsedTime();

      clothMaterial.uniforms.uTime.value = t * 0.8;
      distantMaterial.uniforms.uTime.value = t * 0.5;
      fgMaterial.uniforms.uTime.value = t * 1.2;

      clothMesh.rotation.z    = Math.sin(t * 0.1) * 0.02;
      distantMesh.rotation.z  = Math.PI * 0.1 - Math.sin(t * 0.07) * 0.015;
      fgMesh.rotation.z       = -Math.PI * 0.05 + Math.sin(t * 0.13) * 0.025;

      /* gentle drift for particles */
      const pArray = particleSystem.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pArray.length; i += 3) {
        pArray[i + 1] += Math.sin(t * 0.8 + i * 0.01) * 0.003;
        pArray[i]     += Math.cos(t * 0.6 + i * 0.008) * 0.002;
        pArray[i + 2] += Math.sin(t * 0.4 + i * 0.012) * 0.001;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      particleSystem.rotation.y = t * 0.02;
      particleSystem.rotation.x = Math.sin(t * 0.05) * 0.01;

      shapes.forEach((s, i) => {
        s.rotation.x += 0.01 + i * 0.0003;
        s.rotation.y += 0.015 + i * 0.0004;
        s.rotation.z += 0.008 + i * 0.0002;
        s.position.y += Math.sin(t * 1.5 + i) * 0.008;
        s.position.x += Math.cos(t * 1.2 + i) * 0.006;
        s.position.z += Math.sin(t * 0.9 + i) * 0.004;
      });

      composer.render();
    };
    animate();

    /* ─────────────────────────────  RESIZE HANDLER ───────────────────────────── */
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      fxaaPass.material.uniforms['resolution'].value.x = 1 / window.innerWidth;
      fxaaPass.material.uniforms['resolution'].value.y = 1 / window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    /* ─────────────────────────────── CLEAN‑UP ─────────────────────────────────── */
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);

      [clothMaterial, distantMaterial, fgMaterial, particleMaterial].forEach((m) => m.dispose());
      [clothGeometry, distantGeometry, fgGeometry, particles].forEach((g) => g.dispose());
      shapes.forEach((s) => {
        (s.material as THREE.Material).dispose();
        s.geometry.dispose();
      });
      renderer.dispose();
      composer.dispose();
    };
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
