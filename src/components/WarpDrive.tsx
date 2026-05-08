"use client";

import { useEffect, useRef, useCallback } from "react";

interface WarpDriveProps {
  active: boolean;
  color?: string;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  speed: number;
  size: number;
  angle: number;
  radius: number;
  hue: number;
  layer: number;
}

interface Ring {
  radius: number;
  alpha: number;
  width: number;
  speed: number;
}

interface Lightning {
  points: { x: number; y: number }[];
  alpha: number;
  hue: number;
}

const PARTICLE_COUNT = 3000;
const PHASE_IDLE = 0;
const PHASE_CHARGE = 1;
const PHASE_JUMP = 2;
const PHASE_STREAK = 3;
const PHASE_TUNNEL = 4;
const PHASE_FLASH = 5;

export function WarpDrive({ active, color = "#39d353", onComplete }: WarpDriveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const phaseRef = useRef<number>(PHASE_IDLE);
  const phaseTimeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const ringsRef = useRef<Ring[]>([]);
  const lightningRef = useRef<Lightning[]>([]);
  const activeRef = useRef(false);
  const completedRef = useRef(false);
  const shakeRef = useRef({ x: 0, y: 0 });
  const bassRef = useRef(0);
  // Track last known dimensions to detect layout shifts
  const dimsRef = useRef({ w: 0, h: 0 });
  // Stable refs for props so the animation loop never restarts
  const colorRef = useRef(color);
  const onCompleteRef = useRef(onComplete);
  colorRef.current = color;
  onCompleteRef.current = onComplete;

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(w, h) * 0.7;
      const layer = Math.floor(Math.random() * 3);
      particles.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random() * 2000,
        speed: (Math.random() * 2 + 0.5) * (1 + layer * 0.5),
        size: Math.random() * 2 + 0.5 + layer,
        angle,
        radius,
        hue: Math.random() * 60 - 30,
        layer,
      });
    }
    particlesRef.current = particles;
    dimsRef.current = { w, h };
  }, []);

  const generateLightning = useCallback((cx: number, cy: number, targetX: number, targetY: number, segments: number): { x: number; y: number }[] => {
    const points: { x: number; y: number }[] = [{ x: cx, y: cy }];
    const dx = (targetX - cx) / segments;
    const dy = (targetY - cy) / segments;
    for (let i = 1; i < segments; i++) {
      const jitter = (segments - i) * 3;
      points.push({
        x: cx + dx * i + (Math.random() - 0.5) * jitter,
        y: cy + dy * i + (Math.random() - 0.5) * jitter,
      });
    }
    points.push({ x: targetX, y: targetY });
    return points;
  }, []);

  useEffect(() => {
    if (active && !activeRef.current) {
      activeRef.current = true;
      completedRef.current = false;
      phaseRef.current = PHASE_CHARGE;
      phaseTimeRef.current = 0;
      ringsRef.current = [];
      lightningRef.current = [];
      bassRef.current = 0;
      shakeRef.current = { x: 0, y: 0 };
      // Re-init particles if viewport dimensions changed since last init
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (dimsRef.current.w !== vw || dimsRef.current.h !== vh || particlesRef.current.length === 0) {
        initParticles(vw, vh);
      }
    } else if (!active) {
      // Reset activeRef so the animation can be triggered again next time
      activeRef.current = false;
    }
  }, [active, initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Always re-init on resize so particles use correct center
      initParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Force canvas to cover full viewport on every frame to catch any layout shifts
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (canvas.width !== vw || canvas.height !== vh) {
        canvas.width = vw;
        canvas.height = vh;
        // Re-init particles if dims changed while active
        if (activeRef.current) {
          initParticles(vw, vh);
        }
      }

      const w = canvas.width;
      const h = canvas.height;
      const rgb = hexToRgb(colorRef.current);
      // Base center is always exact viewport center; shake is additive offset only
      const baseCx = w / 2;
      const baseCy = h / 2;
      const cx = baseCx + shakeRef.current.x;
      const cy = baseCy + shakeRef.current.y;
      const phase = phaseRef.current;
      phaseTimeRef.current += dt;
      const pt = phaseTimeRef.current;

      // Decay shake
      shakeRef.current.x *= 0.9;
      shakeRef.current.y *= 0.9;

      // Decay bass pulse
      bassRef.current *= 0.92;

      // === PHASE: FLASH (final) ===
      if (phase === PHASE_FLASH) {
        const flashProgress = Math.min(pt / 0.5, 1);
        // White flash that fades through the accent color
        if (flashProgress < 0.3) {
          ctx.fillStyle = `rgba(255,255,255,${1 - flashProgress / 0.3 * 0.3})`;
        } else {
          const fade = (flashProgress - 0.3) / 0.7;
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${(1 - fade) * 0.6})`;
        }
        ctx.fillRect(0, 0, w, h);
        if (flashProgress >= 1 && !completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current?.();
        }
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      // === BACKGROUND ===
      if (phase === PHASE_IDLE) {
        ctx.fillStyle = "rgba(5,5,16,0.95)";
        ctx.fillRect(0, 0, w, h);
      } else if (phase === PHASE_TUNNEL || phase === PHASE_STREAK) {
        ctx.fillStyle = "rgba(5,5,16,0.08)";
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = `rgba(5,5,16,${0.25 - bassRef.current * 0.15})`;
        ctx.fillRect(0, 0, w, h);
      }

      // Bass pulse overlay
      if (bassRef.current > 0.01) {
        const pulseGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
        pulseGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${bassRef.current * 0.4})`);
        pulseGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${bassRef.current * 0.1})`);
        pulseGrad.addColorStop(1, "transparent");
        ctx.fillStyle = pulseGrad;
        ctx.fillRect(0, 0, w, h);
      }

      const particles = particlesRef.current;

      // === PHASE: IDLE ===
      if (phase === PHASE_IDLE && !activeRef.current) {
        particles.forEach((p) => {
          p.angle += 0.0005 * p.speed;
          const sx = cx + Math.cos(p.angle) * p.radius;
          const sy = cy + Math.sin(p.angle) * p.radius;
          const alpha = 0.15 + p.layer * 0.1;
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // === PHASE: CHARGE (1.4s) ===
      else if (phase === PHASE_CHARGE) {
        const progress = Math.min(pt / 1.4, 1);
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        // Screen shake ramps up
        if (eased > 0.4) {
          const intensity = (eased - 0.4) * 25;
          shakeRef.current.x = (Math.random() - 0.5) * intensity;
          shakeRef.current.y = (Math.random() - 0.5) * intensity;
        }

        // Bass pulse hits
        if (progress > 0.3 && Math.random() < eased * 0.15) {
          bassRef.current = Math.min(1, bassRef.current + 0.3);
        }

        // Particles spiral in with increasing urgency
        particles.forEach((p) => {
          const spiralSpeed = (0.01 + eased * 0.25) * p.speed;
          p.angle += spiralSpeed;
          const shrink = 1 - eased * 0.92;
          const currentR = p.radius * shrink;
          p.x = Math.cos(p.angle) * currentR;
          p.y = Math.sin(p.angle) * currentR;

          const sx = cx + p.x;
          const sy = cy + p.y;
          const alpha = 0.2 + eased * 0.8;
          const size = p.size * (0.5 + eased * 1.5);

          // Color shifts toward white as energy builds
          const white = eased * 0.6;
          const r = Math.min(255, rgb.r + (255 - rgb.r) * white);
          const g = Math.min(255, rgb.g + (255 - rgb.g) * white);
          const b = Math.min(255, rgb.b + (255 - rgb.b) * white);

          ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();

          // Comet trails on fast particles
          if (p.speed > 1.5 && eased > 0.2) {
            const trailLen = eased * 20 * p.speed;
            const trailAngle = p.angle - spiralSpeed * 3;
            const tx = cx + Math.cos(trailAngle) * (currentR + trailLen * 0.3);
            const ty = cy + Math.sin(trailAngle) * (currentR + trailLen * 0.3);
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.3})`;
            ctx.lineWidth = size * 0.4;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(tx, ty);
            ctx.stroke();
          }
        });

        // Expanding shockwave rings
        if (eased > 0.3 && Math.random() < eased * 0.08) {
          ringsRef.current.push({
            radius: 5,
            alpha: 0.8,
            width: 2 + Math.random() * 2,
            speed: 200 + Math.random() * 300,
          });
        }
        ringsRef.current.forEach((ring) => {
          ring.radius += ring.speed * dt;
          ring.alpha *= 0.96;
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${ring.alpha})`;
          ctx.lineWidth = ring.width;
          ctx.beginPath();
          ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
          ctx.stroke();
        });
        ringsRef.current = ringsRef.current.filter((r) => r.alpha > 0.02);

        // Lightning bolts between converging particles
        if (eased > 0.5 && Math.random() < eased * 0.2) {
          const pA = particles[Math.floor(Math.random() * particles.length)];
          const pB = particles[Math.floor(Math.random() * particles.length)];
          lightningRef.current.push({
            points: generateLightning(
              cx + pA.x, cy + pA.y,
              cx + pB.x, cy + pB.y,
              8
            ),
            alpha: 0.9,
            hue: Math.random() * 40 - 20,
          });
        }
        lightningRef.current.forEach((bolt) => {
          bolt.alpha *= 0.85;
          ctx.strokeStyle = `rgba(${Math.min(255, rgb.r + 80)|0},${Math.min(255, rgb.g + 80)|0},${Math.min(255, rgb.b + 80)|0},${bolt.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          bolt.points.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.stroke();
        });
        lightningRef.current = lightningRef.current.filter((b) => b.alpha > 0.03);

        // Central energy orb
        const orbSize = 10 + eased * 60;
        const orbGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbSize);
        orbGlow.addColorStop(0, `rgba(255,255,255,${eased * 0.9})`);
        orbGlow.addColorStop(0.2, `rgba(${rgb.r},${rgb.g},${rgb.b},${eased * 0.8})`);
        orbGlow.addColorStop(0.6, `rgba(${rgb.r},${rgb.g},${rgb.b},${eased * 0.3})`);
        orbGlow.addColorStop(1, "transparent");
        ctx.fillStyle = orbGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, orbSize, 0, Math.PI * 2);
        ctx.fill();

        // Outer halo rings (rotating)
        if (eased > 0.4) {
          const haloAlpha = (eased - 0.4) * 1.5;
          for (let i = 0; i < 3; i++) {
            const haloR = orbSize * (1.5 + i * 0.6);
            const rot = pt * (3 + i * 2) + i * 2;
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${haloAlpha * (0.4 - i * 0.1)})`;
            ctx.lineWidth = 1.5 - i * 0.3;
            ctx.beginPath();
            ctx.arc(cx, cy, haloR, rot, rot + Math.PI * 1.2);
            ctx.stroke();
          }
        }

        // CRT scanline overlay — retro-tech feel during charge buildup
        if (eased > 0.15) {
          const scanAlpha = Math.min(0.06, eased * 0.07);
          ctx.fillStyle = `rgba(0,0,0,${scanAlpha})`;
          for (let row = 0; row < h; row += 4) {
            ctx.fillRect(0, row, w, 2);
          }
          // Subtle horizontal flicker line that drifts down the screen
          const flickerY = ((pt * 180) % (h + 40)) - 20;
          const flickerGrad = ctx.createLinearGradient(0, flickerY - 6, 0, flickerY + 6);
          flickerGrad.addColorStop(0, "transparent");
          flickerGrad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${eased * 0.08})`);
          flickerGrad.addColorStop(1, "transparent");
          ctx.fillStyle = flickerGrad;
          ctx.fillRect(0, flickerY - 6, w, 12);
        }

        if (progress >= 1) {
          phaseRef.current = PHASE_JUMP;
          phaseTimeRef.current = 0;
          // Big bass hit on transition
          bassRef.current = 1;
          shakeRef.current = { x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 40 };
        }
      }

      // === PHASE: JUMP (0.4s) - explosive detonation ===
      else if (phase === PHASE_JUMP) {
        const progress = Math.min(pt / 0.4, 1);
        const eased = 1 - Math.pow(1 - progress, 4);

        // Screen shake decays
        shakeRef.current.x = (Math.random() - 0.5) * 30 * (1 - progress);
        shakeRef.current.y = (Math.random() - 0.5) * 30 * (1 - progress);

        // Massive central detonation
        const detRadius = eased * Math.max(w, h) * 0.3;
        const det = ctx.createRadialGradient(cx, cy, 0, cx, cy, detRadius);
        det.addColorStop(0, `rgba(255,255,255,${(1 - eased) * 0.95})`);
        det.addColorStop(0.15, `rgba(${rgb.r},${rgb.g},${rgb.b},${(1 - eased) * 0.8})`);
        det.addColorStop(0.4, `rgba(${rgb.r},${rgb.g},${rgb.b},${(1 - eased) * 0.3})`);
        det.addColorStop(1, "transparent");
        ctx.fillStyle = det;
        ctx.fillRect(0, 0, w, h);

        // Speed lines explode from center - chromatic aberration
        particles.forEach((p, i) => {
          if (i % 2 !== 0) return; // render every other for perf
          const dist = eased * Math.max(w, h) * p.speed * 0.6;
          const tipX = cx + Math.cos(p.angle) * dist;
          const tipY = cy + Math.sin(p.angle) * dist;
          const tailDist = dist * (0.1 + (1 - eased) * 0.4);
          const tailX = cx + Math.cos(p.angle) * tailDist;
          const tailY = cy + Math.sin(p.angle) * tailDist;

          // RGB split effect
          const offset = 3 * eased;
          const alpha = (0.6 + p.speed * 0.2) * (1 - eased * 0.3);

          // Main line
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
          ctx.lineWidth = p.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(tipX, tipY);
          ctx.stroke();

          // Red ghost (chromatic aberration)
          if (p.layer === 0) {
            ctx.strokeStyle = `rgba(255,80,80,${alpha * 0.3})`;
            ctx.lineWidth = p.size * 0.4;
            ctx.beginPath();
            ctx.moveTo(tailX + offset, tailY + offset);
            ctx.lineTo(tipX + offset, tipY + offset);
            ctx.stroke();
          }
          // Blue ghost
          if (p.layer === 2) {
            ctx.strokeStyle = `rgba(80,80,255,${alpha * 0.3})`;
            ctx.lineWidth = p.size * 0.4;
            ctx.beginPath();
            ctx.moveTo(tailX - offset, tailY - offset);
            ctx.lineTo(tipX - offset, tipY - offset);
            ctx.stroke();
          }
        });

        // Shockwave ring
        const ringR = eased * Math.max(w, h) * 0.5;
        ctx.strokeStyle = `rgba(255,255,255,${(1 - eased) * 0.7})`;
        ctx.lineWidth = 4 * (1 - eased);
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.stroke();

        if (progress >= 1) {
          phaseRef.current = PHASE_STREAK;
          phaseTimeRef.current = 0;
        }
      }

      // === PHASE: STREAK (1.0s) - starfield acceleration ===
      else if (phase === PHASE_STREAK) {
        const progress = Math.min(pt / 1.0, 1);
        const accel = 1 + progress * 8;

        particles.forEach((p) => {
          p.z -= dt * 1200 * accel * p.speed;
          if (p.z < 1) {
            p.z = 2000;
            p.x = (Math.random() - 0.5) * w * 2;
            p.y = (Math.random() - 0.5) * h * 2;
          }

          const scale = 400 / p.z;
          const sx = cx + p.x * scale;
          const sy = cy + p.y * scale;

          const prevZ = p.z + dt * 1200 * accel * p.speed;
          const prevScale = 400 / prevZ;
          const px = cx + p.x * prevScale;
          const py = cy + p.y * prevScale;

          if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) return;

          const screenDist = Math.sqrt((sx - cx) ** 2 + (sy - cy) ** 2);
          const maxDist = Math.sqrt(cx * cx + cy * cy);
          const alpha = Math.min(1, screenDist / maxDist * 1.5 + 0.3);
          const lineWidth = Math.max(0.5, scale * 2.5);

          // Multi-color streaks based on layer
          let r = rgb.r, g = rgb.g, b = rgb.b;
          if (p.layer === 1) { r = Math.min(255, r + 40); b = Math.max(0, b - 20); }
          if (p.layer === 2) { b = Math.min(255, b + 60); r = Math.max(0, r - 20); }

          const grad = ctx.createLinearGradient(px, py, sx, sy);
          grad.addColorStop(0, `rgba(${r},${g},${b},0)`);
          grad.addColorStop(0.7, `rgba(${r},${g},${b},${alpha * 0.7})`);
          grad.addColorStop(1, `rgba(255,255,255,${alpha * 0.9})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.stroke();
        });

        // Rotating tunnel rings
        const ringCount = 5;
        for (let i = 0; i < ringCount; i++) {
          const ringZ = ((pt * 600 + i * 400) % 2000);
          const ringScale = 400 / Math.max(ringZ, 1);
          const ringR = Math.max(w, h) * 0.5 * ringScale;
          if (ringR > 10 && ringR < Math.max(w, h)) {
            const ringAlpha = Math.min(0.3, ringScale * 0.5) * (1 - progress * 0.5);
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${ringAlpha})`;
            ctx.lineWidth = Math.max(0.5, ringScale);
            ctx.beginPath();
            ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Edge vignette deepens
        const vig = ctx.createRadialGradient(cx, cy, 0, cx, cy, diagRadius(w, h));
        vig.addColorStop(0, "transparent");
        vig.addColorStop(0.5, "transparent");
        vig.addColorStop(0.8, `rgba(5,5,16,${0.2 + progress * 0.3})`);
        vig.addColorStop(1, `rgba(5,5,16,${0.5 + progress * 0.4})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, w, h);

        // Screen-space chromatic aberration: read the canvas into an offscreen
        // buffer and composite slightly offset red and blue copies on top.
        // We approximate this cheaply by drawing two full-frame tinted overlays
        // with globalCompositeOperation = 'screen' shifted left/right.
        {
          const aberration = progress * 6; // px offset grows with speed
          if (aberration > 0.5) {
            // Red channel ghost — shift left
            ctx.save();
            ctx.globalCompositeOperation = "screen";
            ctx.globalAlpha = 0.08 * progress;
            ctx.translate(-aberration, 0);
            ctx.drawImage(canvas, 0, 0);
            ctx.restore();

            // Blue channel ghost — shift right
            ctx.save();
            ctx.globalCompositeOperation = "screen";
            ctx.globalAlpha = 0.08 * progress;
            ctx.translate(aberration, 0);
            ctx.drawImage(canvas, 0, 0);
            ctx.restore();

            // Tint the red ghost red and blue ghost blue via blend rects
            ctx.save();
            ctx.globalCompositeOperation = "multiply";
            ctx.fillStyle = `rgba(255,80,80,${0.06 * progress})`;
            ctx.fillRect(0, 0, w / 2, h);
            ctx.fillStyle = `rgba(80,80,255,${0.06 * progress})`;
            ctx.fillRect(w / 2, 0, w / 2, h);
            ctx.restore();
          }
        }

        if (progress >= 1) {
          phaseRef.current = PHASE_TUNNEL;
          phaseTimeRef.current = 0;
        }
      }

      // === PHASE: TUNNEL (1.2s) - wormhole corridor ===
      else if (phase === PHASE_TUNNEL) {
        const progress = Math.min(pt / 1.2, 1);
        const speed = 12 + progress * 30; // faster: was 5+15

        // Spiral tunnel walls — tighter spiral with higher rotation speed
        const spiralCount = 80; // more points = tighter weave (was 60)
        for (let i = 0; i < spiralCount; i++) {
          const z = ((pt * speed * 100 + i * (2000 / spiralCount)) % 2000) + 1;
          const scale = 500 / z;
          // Tighter spiral: rotate at 8 rad/s (was 3), tighten radius oscillation
          const baseAngle = (i / spiralCount) * Math.PI * 2 + pt * 8;
          const tunnelR = (100 + Math.sin(pt * 5 + i * 0.4) * 20) * scale; // tighter radius (was 150+30)

          const sx = cx + Math.cos(baseAngle) * tunnelR;
          const sy = cy + Math.sin(baseAngle) * tunnelR;

          if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) continue;

          const alpha = Math.min(0.8, scale * 1.5);
          const size = Math.max(2, scale * 8);

          // Gradient from accent to white
          const whiten = scale * 0.5;
          const r = Math.min(255, rgb.r + (255 - rgb.r) * whiten) | 0;
          const g = Math.min(255, rgb.g + (255 - rgb.g) * whiten) | 0;
          const b = Math.min(255, rgb.b + (255 - rgb.b) * whiten) | 0;

          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, Math.PI * 2);
          ctx.fill();

          // Connect adjacent spiral points with lines
          const nextAngle = baseAngle + (Math.PI * 2 / spiralCount);
          const nx = cx + Math.cos(nextAngle) * tunnelR;
          const ny = cy + Math.sin(nextAngle) * tunnelR;
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 0.3})`;
          ctx.lineWidth = Math.max(0.5, scale * 2);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(nx, ny);
          ctx.stroke();
        }

        // Particle streaks continue through tunnel
        particles.forEach((p, i) => {
          if (i % 3 !== 0) return;
          p.z -= dt * 2000 * p.speed;
          if (p.z < 1) {
            p.z = 2000;
            p.x = (Math.random() - 0.5) * w;
            p.y = (Math.random() - 0.5) * h;
          }
          const scale = 400 / p.z;
          const sx = cx + p.x * scale;
          const sy = cy + p.y * scale;
          if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) return;

          const alpha = Math.min(1, scale * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(1, scale * 2), 0, Math.PI * 2);
          ctx.fill();
        });

        // Central bright point grows
        const coreSize = 20 + progress * 200;
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize);
        core.addColorStop(0, `rgba(255,255,255,${0.2 + progress * 0.8})`);
        core.addColorStop(0.3, `rgba(${rgb.r},${rgb.g},${rgb.b},${progress * 0.5})`);
        core.addColorStop(1, "transparent");
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
        ctx.fill();

        // Heavy vignette
        const vig = ctx.createRadialGradient(cx, cy, 0, cx, cy, diagRadius(w, h));
        vig.addColorStop(0, "transparent");
        vig.addColorStop(0.3, "transparent");
        vig.addColorStop(0.7, `rgba(5,5,16,${0.4 + progress * 0.3})`);
        vig.addColorStop(1, `rgba(5,5,16,0.9)`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, w, h);

        // Final white-out ramp
        if (progress > 0.6) {
          const whiteout = (progress - 0.6) / 0.4;
          ctx.fillStyle = `rgba(255,255,255,${whiteout * whiteout})`;
          ctx.fillRect(0, 0, w, h);
        }

        if (progress >= 1) {
          phaseRef.current = PHASE_FLASH;
          phaseTimeRef.current = 0;
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Runs once - reads props from refs to avoid teardown

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999]"
      style={{
        // Always render but hide when inactive - this ensures canvas has
        // correct viewport dimensions before the animation fires
        pointerEvents: active ? "all" : "none",
        opacity: active ? 1 : 0,
        // Use opacity only (not visibility:hidden) so the element
        // remains in the layout and canvas dims stay accurate
        transition: "opacity 0.1s",
      }}
    />
  );
}

function diagRadius(w: number, h: number) {
  return Math.sqrt((w / 2) ** 2 + (h / 2) ** 2);
}
