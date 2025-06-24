// Noise function for the shader
const noiseFunction = `
  // Simplex 3D Noise 
  // by Ian McEwan, Ashima Arts
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    // Enhanced iterations for more detail
    for (int i = 0; i < 6; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }
`;

export const clothVertexShader = `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vNoise;

  ${noiseFunction}

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Create flowing, organic displacement
    float noise1 = fbm(vec3(uv * 2.0, uTime * 0.15));
    float noise2 = fbm(vec3(uv * 4.0 + 100.0, uTime * 0.25));
    float noise3 = fbm(vec3(uv * 1.0 + 200.0, uTime * 0.08));
    
    // Enhanced combination for more dramatic effect
    float displacement = noise1 * 0.7 + noise2 * 0.4 + noise3 * 0.5;
    
    // Apply enhanced displacement
    pos.z += displacement * uIntensity;
    
    // More pronounced xy displacement for organic flow
    pos.x += noise2 * 0.3;
    pos.y += noise3 * 0.3;
    
    vPosition = pos;
    vNoise = displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const clothFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform vec3 uColor5;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vNoise;

  ${noiseFunction}

  void main() {
    // Enhanced color mixing with theme colors
    float colorNoise1 = fbm(vec3(vUv * 3.0, uTime * 0.1));
    float colorNoise2 = fbm(vec3(vUv * 1.5 + 50.0, uTime * 0.08));
    float colorNoise3 = fbm(vec3(vUv * 4.0 + 100.0, uTime * 0.12));
    
    // Create flowing color transitions
    float mixFactor1 = 0.5 + colorNoise1 * 0.3;
    float mixFactor2 = 0.5 + colorNoise2 * 0.3;
    float mixFactor3 = 0.5 + colorNoise3 * 0.3;
    
    // Multi-layer color mixing for rich gradients
    vec3 color1 = mix(uColor1, uColor2, mixFactor1);
    vec3 color2 = mix(uColor3, uColor4, mixFactor2);
    vec3 color3 = mix(uColor2, uColor5, mixFactor3);
    
    // Combine colors based on UV and noise
    vec3 finalColor = mix(color1, color2, vUv.y + vNoise * 0.2);
    finalColor = mix(finalColor, color3, vUv.x + colorNoise1 * 0.15);
    
    // Enhanced brightness variations
    float brightness = 1.0 + fbm(vec3(vUv * 5.0, uTime * 0.1)) * 0.3;
    finalColor *= brightness;
    
    // Enhanced glow effect based on displacement
    float glow = smoothstep(0.0, 1.0, abs(vNoise)) * 0.4;
    finalColor += glow * mix(uColor4, uColor5, 0.5);
    
    // Pulsing energy effect
    float pulse = sin(uTime * 2.0 + vNoise * 10.0) * 0.1 + 0.9;
    finalColor *= pulse;
    
    // Edge fade for seamless blending
    float edgeFade = smoothstep(0.0, 0.15, vUv.x) * 
                     smoothstep(1.0, 0.85, vUv.x) * 
                     smoothstep(0.0, 0.15, vUv.y) * 
                     smoothstep(1.0, 0.85, vUv.y);
    
    // Center enhancement for more dramatic effect
    float centerDistance = length(vUv - 0.5);
    float centerFade = smoothstep(0.7, 0.2, centerDistance);
    
    gl_FragColor = vec4(finalColor, uOpacity * edgeFade * (0.4 + centerFade * 0.6));
  }
`;