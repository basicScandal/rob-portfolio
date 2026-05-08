"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { WarpDrive } from "./WarpDrive";
import robPhoto from "../../public/rob-ragan-2024.jpg";

export function PortraitEasterEgg() {
  const [clicked, setClicked] = useState(false);
  const [warpActive, setWarpActive] = useState(false);
  const [porscheSrc, setPorscheSrc] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const prefix = window.location.pathname.includes("/rob-portfolio") ? "/rob-portfolio" : "";
    setPorscheSrc(`${prefix}/rob-porsche.png`);
    const img = new window.Image();
    img.src = `${prefix}/rob-porsche.png`;
  }, []);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);

    // Show porsche photo briefly, then fire the warp
    setTimeout(() => {
      setWarpActive(true);
    }, 800);
  };

  const handleWarpComplete = () => {
    router.push("/galaxy");
  };

  return (
    <div className="relative">
      {/* Portal WarpDrive to document.body so ancestor transforms
          (animate-fade-in-up) don't break position:fixed */}
      {mounted && createPortal(
        <WarpDrive
          active={warpActive}
          color="#39d353"
          onComplete={handleWarpComplete}
        />,
        document.body
      )}

      <div
        onClick={handleClick}
        className={`portrait-duotone w-64 h-72 sm:w-72 sm:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-accent/20 to-charcoal-light cursor-pointer transition-all duration-700 relative ${
          clicked
            ? "scale-105 ring-2 ring-green-400/50 shadow-[0_0_40px_rgba(57,211,83,0.3)]"
            : "hover:scale-[1.02]"
        }`}
      >
        <Image
          src={robPhoto}
          alt="Rob Ragan"
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
            clicked ? "opacity-0" : "opacity-100"
          }`}
          priority
          placeholder="blur"
        />
        {porscheSrc && (
          <img
            src={porscheSrc}
            alt="Rob Ragan"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
              clicked ? "opacity-100" : "opacity-0"
            }`}
            style={{ filter: "none", mixBlendMode: "normal" }}
          />
        )}
      </div>
      <div className="mt-3 text-center">
        <span className="font-mono text-[10px] text-fg-faint tracking-wider">
          {clicked
            ? "// entering hyperspace"
            : "Plate I \u00B7 San Francisco, CA"}
        </span>
      </div>
    </div>
  );
}
