"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

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
    description: "Black Hat, DEF CON, RSA // 15+ Talks",
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
  const [stars, setStars] = useState<{ x: number; y: number; s: number; b: number; speed: number }[]>([]);
  const router = useRouter();
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate background stars
  useEffect(() => {
    const s = Array.from({ length: 400 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: Math.random() * 2 + 0.5,
      b: Math.random(),
      speed: Math.random() * 0.0003 + 0.0001,
    }));
    setStars(s);
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

    let time = 0;
    const animate = () => {
      time += 0.016;
      const w = canvas.width;
      const h = canvas.height;

      // Clear
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, w, h);

      // Subtle nebula clouds
      const grd = ctx.createRadialGradient(w * 0.3, h * 0.4, 0, w * 0.3, h * 0.4, w * 0.4);
      grd.addColorStop(0, "rgba(57,211,83,0.03)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      const grd2 = ctx.createRadialGradient(w * 0.7, h * 0.6, 0, w * 0.7, h * 0.6, w * 0.3);
      grd2.addColorStop(0, "rgba(167,139,250,0.02)");
      grd2.addColorStop(1, "transparent");
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, w, h);

      // Background stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * 2 + star.b * 100) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(200,220,255,${twinkle * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.s, 0, Math.PI * 2);
        ctx.fill();
      });

      // Star lanes
      STAR_LANES.forEach(([fromId, toId]) => {
        const from = SYSTEMS.find((s) => s.id === fromId)!;
        const to = SYSTEMS.find((s) => s.id === toId)!;
        ctx.strokeStyle = "rgba(57,211,83,0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.moveTo(from.x * w, from.y * h);
        ctx.lineTo(to.x * w, to.y * h);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Star systems
      SYSTEMS.forEach((sys) => {
        const sx = sys.x * w;
        const sy = sys.y * h;
        const isHovered = hoveredSystem?.id === sys.id;
        const isSelected = selectedSystem?.id === sys.id;
        const pulse = Math.sin(time * 2 + SYSTEMS.indexOf(sys)) * 0.3 + 1;
        const sz = sys.size * (isHovered ? 1.3 : 1) * (isSelected ? 1.4 : 1);

        // Glow
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 3 * pulse);
        glow.addColorStop(0, sys.glowColor);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 3 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = sys.color;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Ring
        if (isHovered || isSelected) {
          ctx.strokeStyle = sys.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(sx, sy, sz * 1.2, 0, Math.PI * 2);
          ctx.stroke();

          // Selection ring
          if (isSelected) {
            ctx.strokeStyle = `${sys.color}80`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(sx, sy, sz * 1.8, time * 2, time * 2 + Math.PI * 1.5);
            ctx.stroke();
          }
        }

        // Label
        ctx.fillStyle = isHovered || isSelected ? sys.color : "rgba(200,220,255,0.5)";
        ctx.font = `${isHovered || isSelected ? "bold " : ""}10px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.fillText(sys.name, sx, sy + sz * 1.8 + 12);
      });

      // Warp effect
      if (warpTarget) {
        const progress = Math.min(1, (time % 100));
        ctx.fillStyle = `rgba(57,211,83,${progress * 0.3})`;
        ctx.fillRect(0, 0, w, h);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [stars, hoveredSystem, selectedSystem, warpTarget]);

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
    setTimeout(() => {
      router.push(selectedSystem.href);
    }, 800);
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

      {/* System Info Panel */}
      {(hoveredSystem || selectedSystem) && (
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${showUI ? "opacity-100" : "opacity-0"}`}
        >
          <div className="max-w-6xl mx-auto p-4">
            <div className="border border-green-400/20 bg-[#050510]/90 backdrop-blur rounded p-4 max-w-md mx-auto sm:mx-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.15em] text-green-400/40 uppercase">
                    {(selectedSystem || hoveredSystem)!.type}
                  </p>
                  <h2
                    className="font-mono text-xl mt-1"
                    style={{ color: (selectedSystem || hoveredSystem)!.color }}
                  >
                    {(selectedSystem || hoveredSystem)!.name}
                  </h2>
                  <p className="font-mono text-xs text-green-400/60 mt-2">
                    {(selectedSystem || hoveredSystem)!.description}
                  </p>
                </div>
                {selectedSystem && (
                  <button
                    onClick={handleWarp}
                    className={`font-mono text-xs px-4 py-2 border rounded transition-all ${
                      warpTarget
                        ? "border-green-400 bg-green-400 text-black"
                        : "border-green-400/40 text-green-400 hover:border-green-400 hover:bg-green-400/10"
                    }`}
                  >
                    {warpTarget ? "WARPING..." : "ENGAGE >>"}
                  </button>
                )}
              </div>

              {/* Scanline decoration */}
              <div className="mt-3 flex gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[2px] flex-1 rounded"
                    style={{
                      backgroundColor: (selectedSystem || hoveredSystem)!.color,
                      opacity: Math.random() * 0.5 + 0.1,
                    }}
                  />
                ))}
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

      {/* Warp overlay */}
      {warpTarget && (
        <div className="absolute inset-0 pointer-events-none animate-warp">
          <div className="absolute inset-0 bg-gradient-radial from-green-400/20 via-transparent to-transparent" />
        </div>
      )}
    </div>
  );
}
