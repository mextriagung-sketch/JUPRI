import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export function RotatingMandala({ className = 'w-48 h-48', speed = 'slow' }: { className?: string, speed?: 'slow' | 'slower' }) {
  const speedClass = speed === 'slower' ? 'animate-spin-slow-reverse' : 'animate-spin-slow';
  return (
    <div className={`${className} ${speedClass} opacity-15 pointer-events-none flex items-center justify-center select-none`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-none stroke-current stroke-[0.35]">
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 45} 50 50)`}>
            <ellipse cx="50" cy="50" rx="35" ry="9" className="stroke-gold/40" />
            <path d="M50,15 Q46,32 50,50 Q54,32 50,15" className="stroke-gold/30" />
            <circle cx="50" cy="10" r="1.5" className="fill-gold/60" />
          </g>
        ))}
        <circle cx="50" cy="50" r="12" className="stroke-gold/20" />
        <circle cx="50" cy="50" r="6" className="stroke-gold/30 fill-gold/5" />
      </svg>
    </div>
  );
}

export function FloatingSparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Sparkle 1 */}
      <div className="absolute top-[10%] left-[8%] text-gold/30 animate-float-slow" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-5 h-5" />
      </div>
      {/* Sparkle 2 */}
      <div className="absolute top-[25%] right-[10%] text-gold/25 animate-float-slower" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-4 h-4" />
      </div>
      {/* Sparkle 3 */}
      <div className="absolute top-[45%] left-[12%] text-gold/20 animate-float-slow" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-6 h-6" />
      </div>
      {/* Sparkle 4 */}
      <div className="absolute top-[65%] right-[8%] text-gold/35 animate-float-slower" style={{ animationDelay: '3.5s' }}>
        <Sparkles className="w-5 h-5" />
      </div>
      {/* Sparkle 5 */}
      <div className="absolute top-[85%] left-[6%] text-gold/20 animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="w-4.5 h-4.5" />
      </div>
      {/* Sparkle 6 */}
      <div className="absolute top-[92%] right-[15%] text-gold/25 animate-float-slower" style={{ animationDelay: '4s' }}>
        <Sparkles className="w-5.5 h-5.5" />
      </div>

      {/* Swaying hearts in background */}
      <div className="absolute top-[18%] left-[25%] text-rose-500/10 animate-float-slow" style={{ animationDelay: '3s' }}>
        <Heart className="w-4 h-4 fill-current" />
      </div>
      <div className="absolute top-[55%] right-[22%] text-rose-500/15 animate-float-slower" style={{ animationDelay: '5s' }}>
        <Heart className="w-5 h-5 fill-current" />
      </div>
      <div className="absolute top-[78%] left-[20%] text-rose-500/10 animate-float-slow" style={{ animationDelay: '0.5s' }}>
        <Heart className="w-4.5 h-4.5 fill-current" />
      </div>
    </div>
  );
}

export function AmbientLightPulse({ className = 'w-64 h-64 bg-rose-800/5' }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl pointer-events-none animate-pulse select-none ${className}`} />
  );
}

export function IslamicLantern({ className = 'w-16 h-40', delay = '0s', speed = 'slow' }: { className?: string, delay?: string, speed?: 'slow' | 'slower' }) {
  const swayClass = speed === 'slower' ? 'animate-sway-slower' : 'animate-sway-slow';
  return (
    <div 
      style={{ animationDelay: delay }} 
      className={`${className} ${swayClass} pointer-events-none select-none drop-shadow-[0_10px_15px_rgba(130,4,10,0.35)]`}
    >
      <svg viewBox="0 0 40 100" className="w-full h-full text-gold fill-none stroke-current stroke-[1]">
        {/* Chain/String */}
        <line x1="20" y1="0" x2="20" y2="30" className="stroke-gold/40" />
        {/* Hanging Ring */}
        <circle cx="20" cy="31" r="2.5" className="stroke-gold/70" />
        
        {/* Dome Cap */}
        <path d="M13,34 Q20,24 27,34 Z" className="fill-gold/20 stroke-gold" />
        <path d="M11,34 L29,34 L27,37 L13,37 Z" className="fill-gold/40 stroke-gold" />
        
        {/* Lantern Body */}
        <path d="M13,37 L9,64 L20,77 L31,64 L27,37 Z" className="fill-gold/10 stroke-gold" />
        
        {/* Delicate inner patterns */}
        <path d="M20,37 L20,77" className="stroke-gold/30" strokeDasharray="2,2" />
        <path d="M9,64 L31,64" className="stroke-gold/30" />
        
        {/* Arabesque / crescent details inside */}
        <path d="M20,43 Q17,45 17,48 Q17,51 20,53 Q23,51 23,48 Q23,45 20,43 Z" className="stroke-gold/50 fill-gold/5" />
        <path d="M20,55 Q16,57 16,61 Q16,65 20,67 Q24,65 24,61 Q24,57 20,55 Z" className="stroke-gold/50 fill-gold/5" />

        {/* Bottom Tip */}
        <path d="M17,77 L20,82 L23,77 Z" className="fill-gold/60 stroke-gold" />
        <circle cx="20" cy="84" r="1.2" className="fill-gold/80 stroke-none" />

        {/* Light glow (animated pulse) */}
        <circle cx="20" cy="54" r="7" className="fill-amber-400/25 blur-[3px] stroke-none animate-pulse" />
        <circle cx="20" cy="54" r="1.5" className="fill-white/90 blur-[1px] stroke-none animate-pulse" />
      </svg>
    </div>
  );
}

export function IslamicStarOrnament({ className = 'w-12 h-12', speed = 'slow', opacity = 'opacity-25' }: { className?: string, speed?: 'slow' | 'slower', opacity?: string }) {
  const speedClass = speed === 'slower' ? 'animate-spin-slow-reverse' : 'animate-spin-slow';
  return (
    <div className={`${className} ${speedClass} ${opacity} pointer-events-none select-none flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-none stroke-current stroke-[0.8]">
        {/* First Square */}
        <rect x="25" y="25" width="50" height="50" className="stroke-gold" />
        {/* Second Square rotated 45 degrees to form the 8-pointed star */}
        <rect x="25" y="25" width="50" height="50" className="stroke-gold" transform="rotate(45 50 50)" />
        
        {/* Outer concentric star ring */}
        <circle cx="50" cy="50" r="42" className="stroke-gold/40" strokeDasharray="3,3" />
        <circle cx="50" cy="50" r="32" className="stroke-gold/30" />
        <circle cx="50" cy="50" r="8" className="stroke-gold/50 fill-gold/10" />

        {/* Geometric radiating line details */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="50" y1="8" x2="50" y2="25" className="stroke-gold/40" transform={`rotate(${i * 45} 50 50)`} />
        ))}
      </svg>
    </div>
  );
}

export function ArabicCircularOrnament({ className = 'w-48 h-48', speed = 'slow', opacity = 'opacity-20' }: { className?: string, speed?: 'slow' | 'slower', opacity?: string }) {
  const speedClass = speed === 'slower' ? 'animate-spin-slow-reverse' : 'animate-spin-slow';
  return (
    <div className={`${className} ${speedClass} ${opacity} pointer-events-none select-none flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-none stroke-current stroke-[0.4]">
        {/* Outer concentric rings */}
        <circle cx="50" cy="50" r="48" className="stroke-gold/20" />
        <circle cx="50" cy="50" r="46" className="stroke-gold/40" strokeDasharray="1,2" />
        <circle cx="50" cy="50" r="43" className="stroke-gold/30" />
        
        {/* Beautiful Arabic circular frame petals */}
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 22.5} 50 50)`}>
            {/* Elegant outer pointed arch motif */}
            <path d="M50,7 Q45,20 50,30 Q55,20 50,7" className="stroke-gold/50 fill-gold/5" />
            {/* Small circular beads */}
            <circle cx="50" cy="11" r="0.8" className="fill-gold/75 stroke-none" />
            <circle cx="50" cy="43" r="1.2" className="fill-gold/45 stroke-none" />
            {/* Intersecting arches */}
            <path d="M50,7 C38,18 42,35 50,43" className="stroke-gold/15" />
          </g>
        ))}

        {/* Inner Star Pattern */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`star-${i}`} transform={`rotate(${i * 45} 50 50)`}>
            <path d="M50,22 L60,35 L50,48 L40,35 Z" className="stroke-gold/35 fill-gold/5" />
            <path d="M50,22 Q50,35 60,35" className="stroke-gold/20" />
            <path d="M50,22 Q50,35 40,35" className="stroke-gold/20" />
          </g>
        ))}

        {/* Concentric central rings */}
        <circle cx="50" cy="50" r="22" className="stroke-gold/55" />
        <circle cx="50" cy="50" r="18" className="stroke-gold/30" strokeDasharray="2,1" />
        <circle cx="50" cy="50" r="12" className="stroke-gold/40 fill-gold/10" />
        <circle cx="50" cy="50" r="5" className="fill-gold/30 stroke-none" />
      </svg>
    </div>
  );
}

export function LuxuryMandalaOrnament({ className = 'w-56 h-56', speed = 'slow', opacity = 'opacity-30' }: { className?: string, speed?: 'slow' | 'slower', opacity?: string }) {
  const speedClass = speed === 'slower' ? 'animate-spin-slow-reverse' : 'animate-spin-slow';
  return (
    <div className={`${className} ${speedClass} ${opacity} pointer-events-none select-none flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-gold fill-none stroke-current stroke-[0.4]">
        {/* Definition for elegant radial color paths */}
        <defs>
          <radialGradient id="luxury-gold-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3c677" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#d4af37" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#1a0005" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Radial Fill */}
        <circle cx="50" cy="50" r="48" fill="url(#luxury-gold-glow)" className="stroke-none" />

        {/* Outer Fine Lace Rings */}
        <circle cx="50" cy="50" r="48" className="stroke-gold/30" />
        <circle cx="50" cy="50" r="46.5" className="stroke-gold/15" />
        <circle cx="50" cy="50" r="44.5" className="stroke-gold/50" strokeDasharray="0.5,1.5" />
        <circle cx="50" cy="50" r="42" className="stroke-gold/25" />

        {/* 12-Pointed Outer Star Points & Arabesque Petals */}
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={`outer-${i}`} transform={`rotate(${i * 30} 50 50)`}>
            {/* Elegant Pointed Arch */}
            <path d="M50,2 Q41,16 50,28 Q59,16 50,2" className="stroke-gold/65 fill-gold/5" />
            
            {/* Flanking ornate scroll loops */}
            <path d="M50,12 C44,18 45,24 50,28" className="stroke-gold/30" />
            <path d="M50,12 C56,18 55,24 50,28" className="stroke-gold/30" />
            
            {/* Hanging miniature lanterns / beads */}
            <circle cx="50" cy="6" r="0.9" className="fill-gold/80 stroke-none" />
            <circle cx="43.5" cy="12" r="0.6" className="fill-gold/60 stroke-none" />
            <circle cx="56.5" cy="12" r="0.6" className="fill-gold/60 stroke-none" />
          </g>
        ))}

        {/* Intermediate Concentric Star (Rub el Hizb style double square rotated) */}
        {Array.from({ length: 3 }).map((_, i) => (
          <g key={`star-rect-${i}`} transform={`rotate(${i * 30} 50 50)`}>
            <rect x="23" y="23" width="54" height="54" className="stroke-gold/45 fill-gold/3" rx="2" />
          </g>
        ))}

        {/* Intermediate Floral Crests */}
        {Array.from({ length: 24 }).map((_, i) => (
          <g key={`mid-${i}`} transform={`rotate(${i * 15} 50 50)`}>
            <path d="M50,18 C47,24 50,30 50,32" className="stroke-gold/25" />
            <circle cx="50" cy="22" r="0.6" className="fill-gold/50 stroke-none" />
          </g>
        ))}

        {/* Inner Detailed Lace Ring */}
        <circle cx="50" cy="50" r="26" className="stroke-gold/60" />
        <circle cx="50" cy="50" r="24" className="stroke-gold/30" strokeDasharray="1,1" />

        {/* Beautiful Inner 8-pointed Rosette */}
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={`inner-${i}`} transform={`rotate(${i * 45} 50 50)`}>
            <path d="M50,26 L56,36 L50,42 L44,36 Z" className="stroke-gold/70 fill-gold/10" />
            <circle cx="50" cy="31" r="1" className="fill-gold/90 stroke-none" />
          </g>
        ))}

        {/* Central Core Medallion */}
        <circle cx="50" cy="50" r="14" className="stroke-gold/80 fill-gold/15" />
        <circle cx="50" cy="50" r="11" className="stroke-gold/40" strokeDasharray="2,1" />
        <circle cx="50" cy="50" r="8" className="stroke-gold/60 fill-gold/20" />
        <circle cx="50" cy="50" r="3" className="fill-gold stroke-none animate-pulse" />
      </svg>
    </div>
  );
}

