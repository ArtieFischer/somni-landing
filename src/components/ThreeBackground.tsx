import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import { clothVertexShader, clothFragmentShader } from '../shaders/clothShader'
import FloatingTextMeshes from './FloatingTextMeshes'

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const composerRef = useRef<EffectComposer>()
  const animationIdRef = useRef<number>()
  const clockRef = useRef(new THREE.Clock())

  useEffect(() => {
    if (!mountRef.current) return

    // --- Scene & Renderer ---
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 15

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    rendererRef.current = renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.position = 'fixed'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.zIndex = '1'
    renderer.domElement.style.pointerEvents = 'none'
    mountRef.current.appendChild(renderer.domElement)

    // --- Post-processing ---
    const composer = new EffectComposer(renderer)
    composerRef.current = composer
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.6,
        0.4
      )
    )
    const fxaa = new ShaderPass(FXAAShader)
    fxaa.material.uniforms['resolution'].value.x = 1 / window.innerWidth
    fxaa.material.uniforms['resolution'].value.y = 1 / window.innerHeight
    composer.addPass(fxaa)

    // --- Main cloth plane ---
    const clothGeometry = new THREE.PlaneGeometry(40, 40, 256, 256)
    const clothMaterial = new THREE.ShaderMaterial({
      vertexShader: clothVertexShader,
      fragmentShader: clothFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 3.5 },
        uColor1: { value: new THREE.Color(0x8B5CF6) }, // purple nebula
        uColor2: { value: new THREE.Color(0x151B2E) }, // deep blue-gray center
        uColor3: { value: new THREE.Color(0x10B981) }, // bright green aurora
        uColor4: { value: new THREE.Color(0x8B5CF6) }, // purple nebula
        uColor5: { value: new THREE.Color(0x151B2E) }, // deep blue-gray
        uOpacity: { value: 0.85 }
      },
      transparent: true,
      side: THREE.DoubleSide
    })
    const clothMesh = new THREE.Mesh(clothGeometry, clothMaterial)
    clothMesh.position.z = -5
    scene.add(clothMesh)

    // --- Distant cloth layer ---
    const distantGeometry = new THREE.PlaneGeometry(60, 60, 128, 128)
    const distantMaterial = new THREE.ShaderMaterial({
      vertexShader: clothVertexShader,
      fragmentShader: clothFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 2.0 },
        uColor1: { value: new THREE.Color(0x8B5CF6) },
        uColor2: { value: new THREE.Color(0x0B1426) },
        uColor3: { value: new THREE.Color(0x10B981) },
        uColor4: { value: new THREE.Color(0x8B5CF6) },
        uColor5: { value: new THREE.Color(0x0B1426) },
        uOpacity: { value: 0.6 }
      },
      transparent: true,
      side: THREE.DoubleSide
    })
    const distantMesh = new THREE.Mesh(distantGeometry, distantMaterial)
    distantMesh.position.z = -15
    distantMesh.rotation.z = Math.PI * 0.1
    scene.add(distantMesh)

    // --- Foreground cloth layer ---
    const fgGeometry = new THREE.PlaneGeometry(30, 30, 192, 192)
    const fgMaterial = new THREE.ShaderMaterial({
      vertexShader: clothVertexShader,
      fragmentShader: clothFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 4.0 },
        uColor1: { value: new THREE.Color(0x10B981) },
        uColor2: { value: new THREE.Color(0x8B5CF6) },
        uColor3: { value: new THREE.Color(0x151B2E) },
        uColor4: { value: new THREE.Color(0x10B981) },
        uColor5: { value: new THREE.Color(0x8B5CF6) },
        uOpacity: { value: 0.7 }
      },
      transparent: true,
      side: THREE.DoubleSide
    })
    const fgMesh = new THREE.Mesh(fgGeometry, fgMaterial)
    fgMesh.position.z = 2
    fgMesh.rotation.z = -Math.PI * 0.05
    scene.add(fgMesh)

    // --- Particles ---
    const count = 800
    const geom = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 100
      pos[i+1] = (Math.random() - 0.5) * 100
      pos[i+2] = (Math.random() - 0.5) * 50
      const r = Math.random()
      if (r < 0.4) {
        col[i] = 0.54 + Math.random()*0.2
        col[i+1] = 0.36 + Math.random()*0.2
        col[i+2] = 0.96 + Math.random()*0.04
      } else if (r < 0.7) {
        col[i] = 0.06 + Math.random()*0.1
        col[i+1] = 0.72 + Math.random()*0.2
        col[i+2] = 0.50 + Math.random()*0.3
      } else {
        col[i] = 0.23 + Math.random()*0.2
        col[i+1] = 0.51 + Math.random()*0.2
        col[i+2] = 0.98 + Math.random()*0.02
      }
      sz[i/3] = Math.random()*0.5 + 0.1
    }
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(col, 3))
    geom.setAttribute('size', new THREE.BufferAttribute(sz, 1))
    const mat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })
    const pts = new THREE.Points(geom, mat)
    scene.add(pts)

    // --- Shapes ---
    const geoms = [
      new THREE.TetrahedronGeometry(0.8),
      new THREE.OctahedronGeometry(0.7),
      new THREE.IcosahedronGeometry(0.6),
      new THREE.TorusGeometry(0.6,0.2,8,16),
      new THREE.RingGeometry(0.4,0.8,8)
    ]
    const mats = [
      new THREE.MeshBasicMaterial({color:0x8B5CF6,transparent:true,opacity:0.6,wireframe:true}),
      new THREE.MeshBasicMaterial({color:0x10B981,transparent:true,opacity:0.5,wireframe:true}),
      new THREE.MeshBasicMaterial({color:0xA78BFA,transparent:true,opacity:0.55,wireframe:true}),
      new THREE.MeshBasicMaterial({color:0x151B2E,transparent:true,opacity:0.45,wireframe:true}),
      new THREE.MeshBasicMaterial({color:0x0B1426,transparent:true,opacity:0.5,wireframe:true})
    ]
    const shapes: THREE.Mesh[] = []
    for (let i=0; i<25; i++) {
      const g = geoms[Math.floor(Math.random()*geoms.length)]
      const m = mats[Math.floor(Math.random()*mats.length)]
      const s = new THREE.Mesh(g,m)
      s.position.set((Math.random()-0.5)*60,(Math.random()-0.5)*60,(Math.random()-0.5)*40)
      s.rotation.set(Math.random()*Math.PI*2,Math.random()*Math.PI*2,Math.random()*Math.PI*2)
      shapes.push(s)
      scene.add(s)
    }

    // --- Animate ---
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      const t = clockRef.current.getElapsedTime()
      clothMaterial.uniforms.uTime.value = t*0.8
      distantMaterial.uniforms.uTime.value = t*0.5
      fgMaterial.uniforms.uTime.value = t*1.2
      clothMesh.rotation.z = Math.sin(t*0.1)*0.02
      distantMesh.rotation.z = Math.PI*0.1 + Math.sin(t*0.07)*0.015
      fgMesh.rotation.z = -Math.PI*0.05 + Math.sin(t*0.13)*0.025
      const arr = pts.geometry.attributes.position.array as Float32Array
      for (let i=0; i<arr.length; i+=3) {
        arr[i+1] += Math.sin(t*0.8 + i*0.01)*0.003
        arr[i] += Math.cos(t*0.6 + i*0.008)*0.002
        arr[i+2] += Math.sin(t*0.4 + i*0.012)*0.001
      }
      pts.geometry.attributes.position.needsUpdate = true
      pts.rotation.y = t*0.02
      pts.rotation.x = Math.sin(t*0.05)*0.01
      shapes.forEach((s, idx) => {
        s.rotation.x += 0.01 + idx*0.0003
        s.rotation.y += 0.015 + idx*0.0004
        s.rotation.z += 0.008 + idx*0.0002
        s.position.y += Math.sin(t*1.5 + idx)*0.008
        s.position.x += Math.cos(t*1.2 + idx)*0.006
        s.position.z += Math.sin(t*0.9 + idx)*0.004
      })
      composer.render()
    }
    animate()

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
      fxaa.material.uniforms['resolution'].value.x = 1 / window.innerWidth
      fxaa.material.uniforms['resolution'].value.y = 1 / window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
      mountRef.current?.removeChild(renderer.domElement)
      clothMaterial.dispose()
      clothGeometry.dispose()
      distantMaterial.dispose()
      distantGeometry.dispose()
      fgMaterial.dispose()
      fgGeometry.dispose()
      mat.dispose()
      geom.dispose()
      shapes.forEach(s => { s.material.dispose(); s.geometry.dispose() })
      renderer.dispose()
      composer.dispose()
    }
  }, [])

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
          background: 'radial-gradient(ellipse at center, #8B5CF6 0%, #151B2E 45%, #0B1426 100%)'
        }}
      />
      {sceneRef.current && <FloatingTextMeshes scene={sceneRef.current} />}
    </>
  )
}

export default ThreeBackground
