"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import robPhoto from "../../public/rob-ragan-2024.jpg";

export function PortraitEasterEgg() {
  const [clicked, setClicked] = useState(false);
  const [warping, setWarping] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);

    // After photo swap animation, warp to galaxy
    setTimeout(() => {
      setWarping(true);
    }, 1200);

    setTimeout(() => {
      router.push("/galaxy");
    }, 2200);
  };

  return (
    <div className="relative">
      {/* Warp flash overlay */}
      {warping && (
        <div className="fixed inset-0 z-50 bg-[#050510] animate-fade-in-up pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-mono text-sm text-green-400 animate-pulse">
              INITIATING WARP DRIVE...
            </p>
          </div>
        </div>
      )}

      <div
        onClick={handleClick}
        className={`portrait-duotone w-64 h-72 sm:w-72 sm:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-accent/20 to-charcoal-light cursor-pointer transition-all duration-700 ${
          clicked ? "scale-105 ring-2 ring-green-400/50 shadow-[0_0_40px_rgba(57,211,83,0.3)]" : "hover:scale-[1.02]"
        }`}
      >
        {clicked ? (
          <img
            src="/rob-porsche.png"
            alt="Rob Ragan"
            className="w-full h-full object-cover object-center animate-fade-in-up"
            style={{ filter: "none", mixBlendMode: "normal" }}
          />
        ) : (
          <Image
            src={robPhoto}
            alt="Rob Ragan"
            className="w-full h-full object-cover object-top"
            priority
            placeholder="blur"
          />
        )}
      </div>
      <div className="mt-3 text-center">
        <span className="font-mono text-[10px] text-fg-faint tracking-wider">
          {clicked ? "// entering hyperspace" : "Plate I \u00B7 San Francisco, CA"}
        </span>
      </div>
    </div>
  );
}
