"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { WarpDrive } from "@/components/WarpDrive";

interface StarSystem {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
  href: string;
  description: string;
  type: string;
}

const SYSTEMS: StarSystem[] = [
  {
    id: "home",
    name: "SOL PRIME",
    x: 0.5,
    y: 0.45,
    size: 18,
    color: "#39d353",
    glowColor: "#39d35380",
    href: "/",
    description: "Home System // theoradical.ai",
    type: "Class M - Homeworld",
  },
  {
    id: "about",
    name: "GENESIS",
    x: 0.25,
    y: 0.25,
    size: 14,
    color: "#4ade80",
    glowColor: "#4ade8060",
    href: "/about",
    description: "Origin Story // Career Timeline",
    type: "Class K - Desert World",
  },
  {
    id: "projects",
    name: "FORGE",
    x: 0.75,
    y: 0.2,
    size: 16,
    color: "#f0c040",
    glowColor: "#f0c04060",
    href: "/projects",
    description: "Tools & Open Source // Arbiter, SmogCloud, Starlog",
    type: "Class H - Industrial",
  },
  {
    id: "hackathons",
    name: "NEBULA",
    x: 0.15,
    y: 0.6,
    size: 15,
    color: "#a78bfa",
    glowColor: "#a78bfa60",
    href: "/hackathons",
    description: "NEBULA:FOG // AI x Security Hackathon",
    type: "Class N - Nebula Station",
  },
  {
    id: "talks",
    name: "BROADCAST",
    x: 0.8,
    y: 0.55,
    size: 14,
    color: "#38bdf8",
    glowColor: "#38bdf860",
    href: "/talks",
    description: "Black Hat, DEF CON, RSA // 18+ Talks",
    type: "Class T - Comm Relay",
  },
  {
    id: "writing",
    name: "ARCHIVE",
    x: 0.35,
    y: 0.75,
    size: 12,
    color: "#fb923c",
    glowColor: "#fb923c60",
    href: "/blog",
    description: "Dark Reading, Bishop Fox // Published Work",
    type: "Class D - Data Vault",
  },
  {
    id: "contact",
    name: "BEACON",
    x: 0.7,
    y: 0.8,
    size: 12,
    color: "#f87171",
    glowColor: "#f8717160",
    href: "/contact",
    description: "Comms Channel // Get In Touch",
    type: "Class S - Signal Post",
  },
];

const STAR_LANES: [string, string][] = [
  ["home", "about"],
  ["home", "projects"],
  ["home", "hackathons"],
  ["home", "talks"],
  ["about", "hackathons"],
  ["projects", "talks"],
  ["hackathons", "writing"],
  ["talks", "contact"],
  ["writing", "contact"],
];

export default function GalaxyPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSystem, setHoveredSystem] = useState<StarSystem | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<StarSystem | null>(null);
  const [warpTarget, setWarpTarget] = useState<StarSystem | null>(null);
  const [showUI, setShowUI] = useState(false);
  const router = useRouter();
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const starsRef = useRef<{ x: number; y: number; s: number; phase: number; color: string; layer: number }[]>([]);
  const dustRef = useRef<{ x: number; y: number; vx: number; vy: number; s: number; alpha: number }[]>([]);
  const laneParticlesRef = useRef<{ laneIdx: number; t: number; speed: number; size: number }[]>([]);

  // Generate background stars + dust + lane particles
  useEffect(() => {
    // 3 layers of stars
    const allStars: typeof starsRef.current = [];
    // Layer 0: distant tiny (800)
    for (let i = 0; i < 800; i++) {
      const r = Math.random();
      allStars.push({
        x: Math.random(), y: Math.random(),
        s: Math.random() * 0.8 + 0.3,
        phase: Math.random() * Math.PI * 2,
        color: r < 0.7 ? `rgba(255,255,255,${Math.random() * 0.3 + 0.3})`
             : r < 0.9 ? `rgba(180,200,255,${Math.random() * 0.3 + 0.2})`
             : `rgba(255,200,150,${Math.random() * 0.2 + 0.2})`,
        layer: 0,
      });
    }
    // Layer 1: medium (150)
    for (let i = 0; i < 150; i++) {
      const r = Math.random();
      allStars.push({
        x: Math.random(), y: Math.random(),
        s: Math.random() * 1.2 + 0.8,
        phase: Math.random() * Math.PI * 2,
        color: r < 0.6 ? `rgba(220,230,255,${Math.random() * 0.3 + 0.5})`
             : r < 0.85 ? `rgba(180,200,255,${Math.random() * 0.3 + 0.4})`
             : `rgba(255,210,160,${Math.random() * 0.3 + 0.3})`,
        layer: 1,
      });
    }
    // Layer 2: bright foreground (40) with diffraction spikes
    for (let i = 0; i < 40; i++) {
      allStars.push({
        x: Math.random(), y: Math.random(),
        s: Math.random() * 1.5 + 1.5,
        phase: Math.random() * Math.PI * 2,
        color: `rgba(240,245,255,${Math.random() * 0.3 + 0.6})`,
        layer: 2,
      });
    }
    starsRef.current = allStars;

    // Ambient dust particles
    const dust: typeof dustRef.current = [];
    for (let i = 0; i < 120; i++) {
      dust.push({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00005,
        vy: (Math.random() - 0.5) * 0.00005,
        s: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.12 + 0.03,
      });
    }
    dustRef.current = dust;

    // Lane particles
    const lp: typeof laneParticlesRef.current = [];
    STAR_LANES.forEach((_, idx) => {
      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        lp.push({ laneIdx: idx, t: Math.random(), speed: Math.random() * 0.003 + 0.001, size: Math.random() + 0.5 });
      }
    });
    laneParticlesRef.current = lp;

    setTimeout(() => setShowUI(true), 500);
  }, []);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Pre-compute nebula positions (stable across frames)
    const nebulae = [
      { cx: 0.2, cy: 0.3, r: 0.45, color: "rgba(45,27,105," },   // deep purple
      { cx: 0.75, cy: 0.65, r: 0.35, color: "rgba(60,160,130," }, // teal
      { cx: 0.5, cy: 0.15, r: 0.3, color: "rgba(50,80,200," },   // blue
      { cx: 0.85, cy: 0.25, r: 0.25, color: "rgba(180,100,30," }, // amber
      { cx: 0.1, cy: 0.75, r: 0.3, color: "rgba(80,40,120," },   // violet
      { cx: 0.55, cy: 0.8, r: 0.35, color: "rgba(30,60,100," },  // deep blue
    ];

    let time = 0;
    const animate = () => {
      time += 0.016;
      const w = canvas.width;
      const h = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // === 1. Background fill ===
      ctx.fillStyle = "#050810";
      ctx.fillRect(0, 0, w, h);

      // === 2. Nebula clouds with parallax ===
      nebulae.forEach((n) => {
        const parallax = 0.15;
        const nx = (n.cx + (mx - 0.5) * parallax) * w;
        const ny = (n.cy + (my - 0.5) * parallax) * h;
        const nr = n.r * Math.max(w, h);
        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr);
        grd.addColorStop(0, n.color + "0.10)");
        grd.addColorStop(0.4, n.color + "0.06)");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      });

      // Dust lanes (subtle bezier streaks)
      ctx.strokeStyle = "rgba(200,220,255,0.015)";
      ctx.lineWidth = 60;
      ctx.beginPath();
      ctx.moveTo(w * 0.0, h * 0.3);
      ctx.quadraticCurveTo(w * 0.4, h * 0.35, w * 1.0, h * 0.25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(w * 0.1, h * 0.7);
      ctx.quadraticCurveTo(w * 0.6, h * 0.65, w * 0.9, h * 0.8);
      ctx.stroke();

      // === 3. Background star field with parallax ===
      const stars = starsRef.current;
      stars.forEach((star) => {
        const parallaxMul = star.layer === 0 ? 0.15 : star.layer === 1 ? 0.25 : 0.35;
        const sx = (star.x + (mx - 0.5) * parallaxMul) * w;
        const sy = (star.y + (my - 0.5) * parallaxMul) * h;

        // Twinkle
        const twinkle = star.layer === 0
          ? 1 // distant stars don't twinkle
          : star.layer === 1
            ? Math.sin(time * 1.5 + star.phase) * 0.15 + 0.85
            : Math.sin(time * 2.5 + star.phase) * 0.25 + 0.75;

        ctx.globalAlpha = twinkle;
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(sx, sy, star.s, 0, Math.PI * 2);
        ctx.fill();

        // Diffraction spikes on bright foreground stars
        if (star.layer === 2 && star.s > 2) {
          const spikeLen = star.s * 4;
          ctx.strokeStyle = `rgba(240,245,255,${0.15 * twinkle})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(sx - spikeLen, sy);
          ctx.lineTo(sx + spikeLen, sy);
          ctx.moveTo(sx, sy - spikeLen);
          ctx.lineTo(sx, sy + spikeLen);
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      });

      // === 4. Star lanes (curved, with glow + particle flow) ===
      STAR_LANES.forEach(([fromId, toId], laneIdx) => {
        const from = SYSTEMS.find((s) => s.id === fromId)!;
        const to = SYSTEMS.find((s) => s.id === toId)!;
        const x1 = from.x * w, y1 = from.y * h;
        const x2 = to.x * w, y2 = to.y * h;
        // Bezier control point - offset perpendicular to midpoint
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const dx = x2 - x1, dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const perpX = -dy / dist * dist * 0.08;
        const perpY = dx / dist * dist * 0.08;
        const cpx = midX + perpX;
        const cpy = midY + perpY;

        // Lane glow (wider, softer)
        ctx.strokeStyle = "rgba(120,170,210,0.06)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cpx, cpy, x2, y2);
        ctx.stroke();

        // Lane line
        ctx.strokeStyle = "rgba(120,170,210,0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(cpx, cpy, x2, y2);
        ctx.stroke();
      });

      // Lane particle flow
      laneParticlesRef.current.forEach((lp) => {
        lp.t = (lp.t + lp.speed) % 1;
        const lane = STAR_LANES[lp.laneIdx];
        if (!lane) return;
        const from = SYSTEMS.find((s) => s.id === lane[0])!;
        const to = SYSTEMS.find((s) => s.id === lane[1])!;
        const x1 = from.x * w, y1 = from.y * h;
        const x2 = to.x * w, y2 = to.y * h;
        const dx = x2 - x1, dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const perpX = -dy / dist * dist * 0.08;
        const perpY = dx / dist * dist * 0.08;
        const cpx = (x1 + x2) / 2 + perpX;
        const cpy = (y1 + y2) / 2 + perpY;
        // Quadratic bezier point at t
        const t = lp.t;
        const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cpx + t * t * x2;
        const py = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cpy + t * t * y2;
        ctx.fillStyle = `rgba(160,210,255,${0.5 - Math.abs(t - 0.5) * 0.8})`;
        ctx.beginPath();
        ctx.arc(px, py, lp.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // === 5. Star systems (layered glow with additive blending) ===
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      SYSTEMS.forEach((sys, sysIdx) => {
        const sx = sys.x * w;
        const sy = sys.y * h;
        const isHovered = hoveredSystem?.id === sys.id;
        const isSelected = selectedSystem?.id === sys.id;
        const sz = sys.size;
        const brightMul = (isHovered ? 1.3 : 1) * (isSelected ? 1.4 : 1);

        // Parse hex color to RGB
        const r = parseInt(sys.color.slice(1, 3), 16);
        const g = parseInt(sys.color.slice(3, 5), 16);
        const b = parseInt(sys.color.slice(5, 7), 16);

        // Outer corona
        const corona = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 3 * brightMul);
        corona.addColorStop(0, `rgba(${r},${g},${b},${0.15 * brightMul})`);
        corona.addColorStop(0.5, `rgba(${r},${g},${b},${0.05 * brightMul})`);
        corona.addColorStop(1, "transparent");
        ctx.fillStyle = corona;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 3 * brightMul, 0, Math.PI * 2);
        ctx.fill();

        // Mid glow
        const mid = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 1.5 * brightMul);
        mid.addColorStop(0, `rgba(${r},${g},${b},${0.5 * brightMul})`);
        mid.addColorStop(0.6, `rgba(${r},${g},${b},${0.15 * brightMul})`);
        mid.addColorStop(1, "transparent");
        ctx.fillStyle = mid;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 1.5 * brightMul, 0, Math.PI * 2);
        ctx.fill();

        // Inner white-hot core
        const core = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 0.5);
        core.addColorStop(0, `rgba(255,255,255,${0.9 * brightMul})`);
        core.addColorStop(0.4, `rgba(${Math.min(255, r + 80)},${Math.min(255, g + 80)},${Math.min(255, b + 80)},${0.6 * brightMul})`);
        core.addColorStop(1, "transparent");
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore(); // back to normal composite

      // === Orbital rings + moons (on top, normal blending) ===
      SYSTEMS.forEach((sys, sysIdx) => {
        const sx = sys.x * w;
        const sy = sys.y * h;
        const isHovered = hoveredSystem?.id === sys.id;
        const isSelected = selectedSystem?.id === sys.id;
        const sz = sys.size;

        // Orbital ring for larger systems
        if (sz >= 14) {
          const ringR = sz * 2.2;
          ctx.strokeStyle = `${sys.color}18`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.ellipse(sx, sy, ringR, ringR * 0.35, 0.3 + sysIdx * 0.5, 0, Math.PI * 2);
          ctx.stroke();

          // Tiny orbiting moon
          const moonAngle = time * 0.5 + sysIdx * 2;
          const moonX = sx + Math.cos(moonAngle) * ringR;
          const moonY = sy + Math.sin(moonAngle) * ringR * 0.35;
          ctx.fillStyle = `${sys.color}60`;
          ctx.beginPath();
          ctx.arc(moonX, moonY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Lens flare dots (subtle, along a diagonal)
        if (sz >= 12) {
          const flareAngle = 0.7;
          for (let f = 1; f <= 3; f++) {
            const fd = sz * f * 1.2;
            const fx = sx + Math.cos(flareAngle) * fd;
            const fy = sy + Math.sin(flareAngle) * fd;
            ctx.fillStyle = `${sys.color}${f === 1 ? "20" : "10"}`;
            ctx.beginPath();
            ctx.arc(fx, fy, 2 - f * 0.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Hover: bright reticle ring
        if (isHovered && !isSelected) {
          ctx.strokeStyle = `rgba(160,220,255,0.4)`;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 5]);
          ctx.beginPath();
          ctx.arc(sx, sy, sz * 1.8, time * 2, time * 2 + Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Selected: pulsing ring + targeting brackets
        if (isSelected) {
          // Pulsing expanding ring
          const pulseT = (time * 0.8) % 2;
          const pulseR = sz * 1.5 + pulseT * sz;
          const pulseAlpha = Math.max(0, 0.6 - pulseT * 0.3);
          ctx.strokeStyle = `${sys.color}${Math.floor(pulseAlpha * 255).toString(16).padStart(2, "0")}`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
          ctx.stroke();

          // Rotating selection arc
          ctx.strokeStyle = `${sys.color}90`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(sx, sy, sz * 2, time * 1.5, time * 1.5 + Math.PI * 0.8);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(sx, sy, sz * 2, time * 1.5 + Math.PI, time * 1.5 + Math.PI * 1.8);
          ctx.stroke();

          // Targeting brackets at corners
          const bSz = sz * 2.5;
          const bLen = 6;
          ctx.strokeStyle = `${sys.color}70`;
          ctx.lineWidth = 1;
          [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([dx, dy]) => {
            ctx.beginPath();
            ctx.moveTo(sx + dx * bSz, sy + dy * bSz + dy * -bLen);
            ctx.lineTo(sx + dx * bSz, sy + dy * bSz);
            ctx.lineTo(sx + dx * bSz + dx * -bLen, sy + dy * bSz);
            ctx.stroke();
          });
        }

        // Label
        ctx.fillStyle = isHovered || isSelected ? sys.color : "rgba(200,220,255,0.4)";
        ctx.font = `${isHovered || isSelected ? "bold " : ""}10px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.fillText(sys.name, sx, sy + sz * 2.5 + 10);
      });

      // === 6. Ambient dust ===
      dustRef.current.forEach((d) => {
        d.x = (d.x + d.vx + 1) % 1;
        d.y = (d.y + d.vy + 1) % 1;
        const dx = d.x * w;
        const dy = d.y * h;
        ctx.fillStyle = `rgba(140,170,220,${d.alpha})`;
        ctx.beginPath();
        ctx.arc(dx, dy, d.s, 0, Math.PI * 2);
        ctx.fill();
      });

      // === 8. Vignette (draw last!) ===
      const diag = Math.sqrt(w * w + h * h) / 2;
      const vig = ctx.createRadialGradient(w / 2, h / 2, diag * 0.3, w / 2, h / 2, diag);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(0.6, "transparent");
      vig.addColorStop(0.85, "rgba(0,0,0,0.35)");
      vig.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [hoveredSystem, selectedSystem, warpTarget]);

  // Mouse interaction
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = (e.clientX - rect.left) / rect.width;
      const my = (e.clientY - rect.top) / rect.height;
      mouseRef.current = { x: mx, y: my };

      const found = SYSTEMS.find((sys) => {
        const dx = sys.x - mx;
        const dy = sys.y - my;
        return Math.sqrt(dx * dx + dy * dy) < 0.04;
      });
      setHoveredSystem(found || null);
    },
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (hoveredSystem) {
        setSelectedSystem(hoveredSystem);
      } else {
        setSelectedSystem(null);
      }
    },
    [hoveredSystem]
  );

  const handleWarp = () => {
    if (!selectedSystem) return;
    setWarpTarget(selectedSystem);
  };

  const handleWarpComplete = () => {
    if (selectedSystem) {
      router.push(selectedSystem.href);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#050510] overflow-hidden select-none" style={{ cursor: hoveredSystem ? "pointer" : "crosshair" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />

      {/* Top HUD */}
      <div
        className={`absolute top-0 left-0 right-0 p-4 transition-opacity duration-1000 ${showUI ? "opacity-100" : "opacity-0"}`}
      >
        <div className="flex items-start justify-between max-w-6xl mx-auto gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-green-400/60 uppercase">
              Galactic Navigation
            </p>
            <h1 className="font-mono text-sm sm:text-lg text-green-400 mt-1">
              RAGAN SYSTEMS
            </h1>
          </div>
          <div className="text-right shrink-0">
            <button
              onClick={() => router.push("/")}
              className="font-mono text-[10px] text-green-400/60 hover:text-green-400 transition-colors"
            >
              [EXIT]
            </button>
          </div>
        </div>
      </div>

      {/* System Info Panel — HUD */}
      {(hoveredSystem || selectedSystem) && (
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${showUI ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="max-w-3xl mx-auto p-4">
            <div
              className="relative bg-[#050510]/95 backdrop-blur-md overflow-hidden"
              style={{
                border: `1px solid ${(selectedSystem || hoveredSystem)!.color}30`,
                boxShadow: `0 0 30px ${(selectedSystem || hoveredSystem)!.color}15, inset 0 0 30px ${(selectedSystem || hoveredSystem)!.color}08`,
              }}
            >
              {/* Corner accents */}
              {[
                "top-0 left-0 border-t border-l",
                "top-0 right-0 border-t border-r",
                "bottom-0 left-0 border-b border-l",
                "bottom-0 right-0 border-b border-r",
              ].map((pos) => (
                <div
                  key={pos}
                  className={`absolute w-4 h-4 ${pos}`}
                  style={{ borderColor: (selectedSystem || hoveredSystem)!.color }}
                />
              ))}

              {/* Top scanline bar */}
              <div className="h-[1px] w-full flex">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full"
                    style={{
                      backgroundColor: (selectedSystem || hoveredSystem)!.color,
                      opacity: Math.sin(i * 0.4) * 0.3 + 0.2,
                    }}
                  />
                ))}
              </div>

              <div className="p-5">
                {/* Header row: classification + coordinates */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {/* Status indicator */}
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        backgroundColor: (selectedSystem || hoveredSystem)!.color,
                        boxShadow: `0 0 8px ${(selectedSystem || hoveredSystem)!.color}`,
                      }}
                    />
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase"
                      style={{ color: `${(selectedSystem || hoveredSystem)!.color}99` }}
                    >
                      {(selectedSystem || hoveredSystem)!.type}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-[9px] text-green-400/30">
                      X:{((selectedSystem || hoveredSystem)!.x * 1000).toFixed(0)}
                    </span>
                    <span className="font-mono text-[9px] text-green-400/30">
                      Y:{((selectedSystem || hoveredSystem)!.y * 1000).toFixed(0)}
                    </span>
                    <span className="font-mono text-[9px] text-green-400/30">
                      R:{((selectedSystem || hoveredSystem)!.size * 12.4).toFixed(0)}ly
                    </span>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex items-end justify-between gap-6">
                  <div className="min-w-0">
                    <h2
                      className="font-mono text-2xl sm:text-3xl font-bold tracking-wide"
                      style={{
                        color: (selectedSystem || hoveredSystem)!.color,
                        textShadow: `0 0 20px ${(selectedSystem || hoveredSystem)!.color}40`,
                      }}
                    >
                      {(selectedSystem || hoveredSystem)!.name}
                    </h2>
                    <p className="font-mono text-xs text-green-400/50 mt-1.5 tracking-wide">
                      {(selectedSystem || hoveredSystem)!.description}
                    </p>

                    {/* Route info when selected */}
                    {selectedSystem && (
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <span className="font-mono text-[9px] text-green-400/50">SOL PRIME</span>
                        </div>
                        <div className="flex-1 max-w-[80px] h-[1px] relative overflow-hidden">
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(90deg, #39d353, ${selectedSystem.color})`,
                              animation: "warpRoutePulse 1s ease-in-out infinite",
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: selectedSystem.color }}
                          />
                          <span className="font-mono text-[9px]"
                            style={{ color: `${selectedSystem.color}80` }}
                          >
                            {selectedSystem.name}
                          </span>
                        </div>
                        <span className="font-mono text-[9px] text-green-400/30 ml-2">
                          {(Math.sqrt(
                            (selectedSystem.x - 0.5) ** 2 +
                            (selectedSystem.y - 0.45) ** 2
                          ) * 1000).toFixed(0)}ly
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Engage button */}
                  {selectedSystem && (
                    <div className="shrink-0">
                      <button
                        onClick={handleWarp}
                        className="relative group"
                      >
                        {/* Glow ring behind button */}
                        <div
                          className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                          style={{ backgroundColor: `${selectedSystem.color}30` }}
                        />
                        <div
                          className={`relative font-mono text-xs tracking-[0.15em] px-6 py-3 rounded-lg border transition-all duration-300 ${
                            warpTarget
                              ? "text-black font-bold"
                              : "hover:bg-opacity-20"
                          }`}
                          style={{
                            borderColor: warpTarget ? selectedSystem.color : `${selectedSystem.color}50`,
                            backgroundColor: warpTarget ? selectedSystem.color : `${selectedSystem.color}10`,
                            color: warpTarget ? "#050510" : selectedSystem.color,
                            boxShadow: warpTarget
                              ? `0 0 30px ${selectedSystem.color}60, 0 0 60px ${selectedSystem.color}30`
                              : `0 0 10px ${selectedSystem.color}10`,
                          }}
                        >
                          {warpTarget ? (
                            <span className="flex items-center gap-2">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#050510] animate-pulse" />
                              WARPING
                            </span>
                          ) : (
                            "ENGAGE \u00BB"
                          )}
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom telemetry bar */}
                <div className="mt-4 pt-3 border-t flex items-center justify-between"
                  style={{ borderColor: `${(selectedSystem || hoveredSystem)!.color}15` }}
                >
                  <div className="flex gap-6">
                    {[
                      { label: "WARP", value: selectedSystem ? "READY" : "IDLE" },
                      { label: "SHIELDS", value: "100%" },
                      { label: "NAV", value: selectedSystem ? "LOCKED" : "SCAN" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center gap-2">
                        <span className="font-mono text-[8px] text-green-400/25 tracking-wider">
                          {stat.label}
                        </span>
                        <span className="font-mono text-[9px]"
                          style={{
                            color: stat.value === "READY" || stat.value === "LOCKED"
                              ? (selectedSystem || hoveredSystem)!.color
                              : "rgba(57,211,83,0.4)",
                          }}
                        >
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Power level bars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 rounded-sm transition-all duration-300"
                        style={{
                          height: `${6 + i * 2}px`,
                          backgroundColor: selectedSystem
                            ? i < 6
                              ? (selectedSystem || hoveredSystem)!.color
                              : `${(selectedSystem || hoveredSystem)!.color}30`
                            : i < 3
                              ? "rgba(57,211,83,0.4)"
                              : "rgba(57,211,83,0.1)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend - hidden on mobile */}
      <div
        className={`absolute top-20 right-4 transition-opacity duration-1000 hidden md:block ${showUI ? "opacity-100" : "opacity-0"}`}
      >
        <div className="border border-green-400/10 bg-[#050510]/80 rounded p-3">
          <p className="font-mono text-[9px] tracking-[0.15em] text-green-400/30 uppercase mb-2">
            Systems
          </p>
          {SYSTEMS.map((sys) => (
            <div
              key={sys.id}
              className="flex items-center gap-2 py-0.5 cursor-pointer hover:opacity-100 opacity-60 transition-opacity"
              onClick={() => setSelectedSystem(sys)}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: sys.color }}
              />
              <span className="font-mono text-[10px] text-green-400/70">
                {sys.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Warp Drive Animation */}
      <WarpDrive
        active={!!warpTarget}
        color={warpTarget?.color || "#39d353"}
        onComplete={handleWarpComplete}
      />
    </div>
  );
}
