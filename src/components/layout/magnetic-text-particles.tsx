'use client';

import React, { useEffect, useRef, useCallback, useSyncExternalStore } from 'react';
import * as THREE from 'three';

interface MagneticTextParticlesProps {
  readonly text?: string;
  readonly className?: string;
}

const emptySubscribe = () => () => {};

/**
 * Checks whether WebGL / WebGL2 context is supported in the current environment.
 */
function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

function useWebGLCapability(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => isWebGLAvailable(),
    () => false
  );
}

/**
 * Resolves a valid CSS font-family string from computed styles or DOM variables.
 * Guarantees that no unresolved CSS 'var(...)' enters canvas 2D ctx.font.
 */
function getResolvedFontFamily(element: HTMLElement): string {
  try {
    const computed = window.getComputedStyle(element).fontFamily;
    if (computed && !computed.includes('var(')) {
      return computed;
    }
    const varFont = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue('--font-dm-sans')
      .trim();
    if (varFont) {
      return `${varFont}, system-ui, sans-serif`;
    }
  } catch {
    // Fallback
  }
  return '"DM Sans", system-ui, -apple-system, sans-serif';
}

/**
 * Interactive Magnetic Particle Text Watermark powered by Three.js.
 * - Samples exact font contours and kerning using offscreen rasterization.
 * - Applies a silky vertical bottom fade matching the original design.
 * - Particles avoid cursor locally within a specified radius and smoothly spring back.
 * - Pauses rendering when scrolled out of viewport for optimal battery & CPU efficiency.
 * - Robust across SPA route changes by managing clean WebGL canvas lifecycle.
 */
export function MagneticTextParticles({
  text = 'JOREN',
  className = '',
}: MagneticTextParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasWebGL = useWebGLCapability();

  const getThemeColor = useCallback((): THREE.Color => {
    if (typeof document === 'undefined') return new THREE.Color(0.9, 0.9, 0.9);
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? new THREE.Color(0.92, 0.92, 0.95) : new THREE.Color(0.15, 0.15, 0.18);
  }, []);

  useEffect(() => {
    if (!hasWebGL) return;
    const container = containerRef.current;
    if (!container) return;

    // Dynamically create a fresh canvas element to guarantee no stale WebGL context reuse across page routes
    const canvas = document.createElement('canvas');
    canvas.className = 'w-full pointer-events-auto block';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    // Pre-flight check WebGL context to avoid uncaught driver / browser allocation errors
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      gl =
        canvas.getContext('webgl2', { alpha: true, antialias: true }) ||
        canvas.getContext('webgl', { alpha: true, antialias: true });
    } catch {
      gl = null;
    }

    if (!gl || gl.isContextLost()) {
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      return;
    }

    let animationFrameId: number;
    let isVisible = true;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let pointsMesh: THREE.Points | null = null;

    // Simulation state arrays
    let count = 0;
    let positions: Float32Array;
    let velocities: Float32Array;
    let origins: Float32Array;
    let alphas: Float32Array;

    // Current canvas layout dimensions
    let currentWidth = 1000;
    let currentHeight = 250;

    // Mouse interaction state in Three.js coordinate space
    const mouse = {
      x: -99999,
      y: -99999,
      active: false,
    };

    let interactionRadius = 110;
    const repulsionStrength = 11.0;
    const springFactor = 0.055;
    const damping = 0.86;

    // Initialize WebGL Renderer with the pre-validated context
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
      camera.position.z = 10;
    } catch {
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
      return;
    }

    // Custom Shader Material for anti-aliased circular point sprites
    const themeColor = getThemeColor();
    material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: themeColor },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uBaseSize: { value: 3.2 },
      },
      vertexShader: /* glsl */ `
        attribute float aAlpha;
        varying float vAlpha;
        uniform float uPixelRatio;
        uniform float uBaseSize;

        void main() {
          vAlpha = aAlpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uBaseSize * uPixelRatio;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;
          // Soft circular anti-aliased edge
          float edge = smoothstep(0.5, 0.30, dist);
          gl_FragColor = vec4(uColor, vAlpha * edge);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    /**
     * Samples the text onto an offscreen canvas to extract particle target positions
     * preserving exact font metrics and bottom gradient fade.
     */
    const rebuildParticles = () => {
      if (!container || !renderer || !scene || !camera || !material) return;

      const containerWidth = container.clientWidth || window.innerWidth || 1200;
      if (containerWidth <= 0) return;

      // Calculate responsive font size matching [28vw] md:[22vw] lg:[20vw]
      let fontSize = containerWidth * 0.20;
      if (containerWidth < 768) {
        fontSize = containerWidth * 0.28;
      } else if (containerWidth < 1024) {
        fontSize = containerWidth * 0.22;
      }
      fontSize = Math.min(Math.max(fontSize, 64), 380);

      const height = Math.round(fontSize * 0.95);
      const width = containerWidth;
      currentWidth = width;
      currentHeight = height;

      // Explicit layout heights
      container.style.height = `${height}px`;
      canvas.style.height = `${height}px`;
      canvas.style.width = '100%';

      // Update renderer & orthographic camera mapping 1:1 with canvas pixels
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      interactionRadius = Math.max(85, Math.min(150, width * 0.11));

      // Offscreen canvas for glyph rasterization
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const ctx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      // Resolve valid font family avoiding any raw CSS 'var(...)'
      const fontFamily = getResolvedFontFamily(container);
      ctx.font = `900 ${fontSize}px ${fontFamily}`;

      // If browser rejected the font string and reverted to 10px, fallback to system sans-serif
      if (ctx.font.includes('10px') || !ctx.font.includes(Math.round(fontSize).toString())) {
        ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if ('letterSpacing' in ctx) {
        (ctx as unknown as { letterSpacing: string }).letterSpacing = '-0.05em';
      }
      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, width / 2, height / 2);

      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Adaptive sampling step: 3px for high density, 4px for wide screens
      const step = width < 640 ? 3 : width < 1280 ? 3 : 4;

      const tempCoords: { x: number; y: number; alpha: number }[] = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const pixelAlpha = data[index + 3];
          if (pixelAlpha !== undefined && pixelAlpha > 45) {
            // Three.js centered coordinates
            const posX = x - width / 2;
            const posY = height / 2 - y;

            // Normalized vertical progress from 0 (top) to 1 (bottom)
            const normY = y / height;

            // Silky smooth vertical bottom fade:
            // - Top (0 - 15%): full crisp intensity
            // - Mid (15% - 84%): smooth Hermite (smoothstep) falloff
            // - Bottom (84% - 100%): seamlessly fades out into the background void
            let fadeFactor = 1.0;
            if (normY > 0.15) {
              const progress = Math.min(1.0, Math.max(0, (normY - 0.15) / 0.69));
              // Hermite smoothstep curve: 3p^2 - 2p^3
              const smoothProgress = progress * progress * (3 - 2 * progress);
              fadeFactor = Math.pow(Math.max(0, 1.0 - smoothProgress), 1.25);
            }

            // Alpha tuned for high visual clarity on black background
            const baseAlpha = 0.55;
            const alpha = baseAlpha * fadeFactor * (pixelAlpha / 255);

            if (alpha > 0.015) {
              tempCoords.push({ x: posX, y: posY, alpha });
            }
          }
        }
      }

      count = tempCoords.length;
      positions = new Float32Array(count * 3);
      velocities = new Float32Array(count * 2);
      origins = new Float32Array(count * 2);
      alphas = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const item = tempCoords[i];
        if (!item) continue;
        const idx3 = i * 3;
        const idx2 = i * 2;

        positions[idx3] = item.x;
        positions[idx3 + 1] = item.y;
        positions[idx3 + 2] = 0;

        origins[idx2] = item.x;
        origins[idx2 + 1] = item.y;

        velocities[idx2] = 0;
        velocities[idx2 + 1] = 0;

        alphas[i] = item.alpha;
      }

      // Dispose existing mesh & geometry
      if (pointsMesh) {
        scene.remove(pointsMesh);
      }
      if (geometry) {
        geometry.dispose();
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1));

      pointsMesh = new THREE.Points(geometry, material);
      pointsMesh.frustumCulled = false;
      scene.add(pointsMesh);
    };

    rebuildParticles();

    // Re-rasterize when web fonts finish loading
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        rebuildParticles();
      });
    }

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        rebuildParticles();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // Dark/Light mode theme change observer
    const themeObserver = new MutationObserver(() => {
      if (material && material.uniforms.uColor) {
        material.uniforms.uColor.value = getThemeColor();
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Pointer & Touch event tracking with scale calibration
    const updatePointerPos = (clientX: number, clientY: number) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      // Check if cursor is within canvas bounds with margin
      if (
        relativeX >= -40 &&
        relativeX <= rect.width + 40 &&
        relativeY >= -40 &&
        relativeY <= rect.height + 40
      ) {
        const scaleX = currentWidth / (rect.width || 1);
        const scaleY = currentHeight / (rect.height || 1);
        mouse.x = relativeX * scaleX - currentWidth / 2;
        mouse.y = currentHeight / 2 - relativeY * scaleY;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePointerPos(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updatePointerPos(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    // IntersectionObserver to suspend animation when scrolled offscreen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry?.isIntersecting ?? false;
      },
      { threshold: 0.01, rootMargin: '100px' }
    );
    intersectionObserver.observe(container);

    // Physics & Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !renderer || !scene || !camera || !geometry || count === 0) {
        return;
      }

      let hasMovement = false;
      const activeRadius = interactionRadius;
      const activeRadiusSq = activeRadius * activeRadius;

      for (let i = 0; i < count; i++) {
        const idx3 = i * 3;
        const idx2 = i * 2;

        const currentX = positions[idx3] ?? 0;
        const currentY = positions[idx3 + 1] ?? 0;
        const originX = origins[idx2] ?? 0;
        const originY = origins[idx2 + 1] ?? 0;

        let vx = velocities[idx2] ?? 0;
        let vy = velocities[idx2 + 1] ?? 0;

        // Magnetic Repulsion: active only for particles within radius of mouse
        if (mouse.active) {
          const dx = currentX - mouse.x;
          const dy = currentY - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < activeRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const forceRatio = Math.pow(1.0 - dist / activeRadius, 1.4);
            const force = forceRatio * repulsionStrength;
            const angle = Math.atan2(dy, dx);

            vx += Math.cos(angle) * force;
            vy += Math.sin(angle) * force;
            hasMovement = true;
          }
        }

        // Elastic Hooke's Law Return Force
        const homeDx = originX - currentX;
        const homeDy = originY - currentY;

        vx += homeDx * springFactor;
        vy += homeDy * springFactor;

        vx *= damping;
        vy *= damping;

        // Snap threshold to keep resting glyphs 100% stable & razor sharp
        if (
          !mouse.active &&
          Math.abs(homeDx) < 0.04 &&
          Math.abs(homeDy) < 0.04 &&
          Math.abs(vx) < 0.02 &&
          Math.abs(vy) < 0.02
        ) {
          positions[idx3] = originX;
          positions[idx3 + 1] = originY;
          velocities[idx2] = 0;
          velocities[idx2 + 1] = 0;
        } else {
          positions[idx3] = currentX + vx;
          positions[idx3 + 1] = currentY + vy;
          velocities[idx2] = vx;
          velocities[idx2 + 1] = vy;
          hasMovement = true;
        }
      }

      if (hasMovement && geometry.attributes.position) {
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      themeObserver.disconnect();
      intersectionObserver.disconnect();

      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) {
        renderer.dispose();
      }
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [hasWebGL, text, getThemeColor]);

  // Fallback for non-WebGL environments (e.g. jsdom, legacy clients)
  if (!hasWebGL) {
    return (
      <div
        className={`w-full flex justify-center pointer-events-none select-none overflow-hidden ${className}`}
      >
        <span
          className="text-[28vw] md:text-[22vw] lg:text-[20vw] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground/20 via-foreground/5 to-transparent select-none"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 92%)',
            maskImage:
              'linear-gradient(to bottom, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0) 92%)',
          }}
          aria-hidden="true"
        >
          {text}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full relative flex items-center justify-center select-none overflow-hidden cursor-crosshair touch-none ${className}`}
      aria-label={`${text} magnetic particle watermark`}
    >
      {/* Screen reader semantic element */}
      <span className="sr-only">{text}</span>
    </div>
  );
}
