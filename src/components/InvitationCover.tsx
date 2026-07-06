import React from 'react';
import { motion } from 'motion/react';
import { MailOpen, MapPin, Sparkles } from 'lucide-react';
import { IslamicLantern, IslamicStarOrnament, ArabicCircularOrnament, LuxuryMandalaOrnament } from './MovingOrnaments';

interface InvitationCoverProps {
  onOpen: () => void;
  guestName: string;
}

export default function InvitationCover({ onOpen, guestName }: InvitationCoverProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-metallic-maroon text-center overflow-hidden px-4 select-none"
    >
      {/* Huge Slowly Rotating Golden Arabic Circular Ornament in the Background */}
      <div className="absolute w-[600px] h-[600px] md:w-[850px] md:h-[850px] pointer-events-none select-none z-0">
        <LuxuryMandalaOrnament className="w-full h-full" speed="slow" opacity="opacity-35" />
      </div>

      {/* Opposite Rotating Subtle Outer Arabic Ring */}
      <div className="absolute w-[450px] h-[450px] md:w-[650px] md:h-[650px] pointer-events-none select-none z-0">
        <ArabicCircularOrnament className="w-full h-full" speed="slower" opacity="opacity-15" />
      </div>

      {/* Decorative Golden Geometric Background Corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gold/30 m-4 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-gold/30 m-4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-gold/30 m-4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gold/30 m-4 pointer-events-none" />

      {/* Floating Sparkles & Soft Lights */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-rose-800/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-red-900/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Floating Sparkle Ornaments drifting up/down */}
      <div className="absolute top-1/3 left-10 md:left-24 text-gold/30 animate-float-slow pointer-events-none">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute bottom-1/3 right-10 md:right-24 text-gold/35 animate-float-slower pointer-events-none">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute top-1/4 right-1/4 text-gold/25 animate-float-slower pointer-events-none" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="w-4 h-4" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 text-gold/20 animate-float-slow pointer-events-none" style={{ animationDelay: '3s' }}>
        <Sparkles className="w-4.5 h-4.5" />
      </div>

      {/* Hanging Islamic Lanterns on the Left and Right Top Corners */}
      <div className="absolute top-0 left-[8%] md:left-[15%] z-10">
        <IslamicLantern className="w-14 h-36 md:w-18 md:h-44" delay="0s" speed="slow" />
      </div>
      <div className="absolute top-0 right-[8%] md:right-[15%] z-10">
        <IslamicLantern className="w-14 h-36 md:w-18 md:h-44" delay="1.5s" speed="slower" />
      </div>

      {/* Background Rotating Islamic Stars */}
      <div className="absolute top-12 left-12 md:left-28 z-0">
        <IslamicStarOrnament className="w-10 h-10 md:w-14 md:h-14" speed="slow" opacity="opacity-20" />
      </div>
      <div className="absolute bottom-12 right-12 md:right-28 z-0">
        <IslamicStarOrnament className="w-12 h-12 md:w-16 md:h-16" speed="slower" opacity="opacity-20" />
      </div>

      {/* Frame Container */}
      <div className="max-w-md w-full px-8 py-12 rounded-3xl border border-gold/20 bg-stone-950/60 backdrop-blur-md relative shadow-2xl flex flex-col items-center justify-center animate-float-slow">
        {/* Golden frame inner border */}
        <div className="absolute inset-2.5 rounded-[20px] border border-gold/10 pointer-events-none" />
        
        {/* Header Ribbon / Rose Icon */}
        <div className="mb-4 flex flex-col items-center">
          <IslamicStarOrnament className="w-6 h-6 mb-2" speed="slow" opacity="opacity-90" />
          <span className="text-gold font-luxury tracking-widest text-xs uppercase block mb-1">Undangan Pernikahan</span>
          <div className="h-[1px] w-24 bg-gradient-to-right from-transparent via-gold to-transparent mx-auto" />
        </div>

        {/* Initials Badge with rotating soft glow aura */}
        <div className="relative mb-6">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold/30 to-amber-500/10 blur opacity-70 animate-pulse pointer-events-none" />
          <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-maroon-950/60 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/20 to-transparent" />
            <span className="text-2xl font-script text-gold leading-none pt-1">D & J</span>
          </div>
        </div>

        {/* Main Wedding Title */}
        <h1 className="text-4xl md:text-5xl font-script text-amber-200 mb-2 drop-shadow-md">Dea & Jupri</h1>
        <p className="text-gold font-luxury tracking-[0.2em] text-xs uppercase mb-8">Rabu, 19 Agustus 2026</p>

        {/* Guest info card */}
        <div className="w-full py-6 px-4 bg-maroon-950/40 rounded-2xl border border-gold/15 mb-8 relative">
          <span className="text-rose-200/60 font-sans font-light tracking-wide text-xs block mb-2">Kepada Yth. Bapak/Ibu/Saudara/i:</span>
          <h2 className="text-xl md:text-2xl font-serif text-amber-100 font-medium tracking-wide break-words line-clamp-2 px-2">
            {guestName || 'Tamu Undangan'}
          </h2>
          {guestName && (
            <div className="flex items-center justify-center gap-1.5 mt-2 text-rose-300/60 text-[10px] tracking-wider font-sans uppercase">
              <MapPin className="w-3 h-3 text-gold" />
              <span>Di Tempat</span>
            </div>
          )}
        </div>

        {/* Subtitle invitation message */}
        <p className="text-rose-100/70 font-sans font-light text-xs leading-relaxed max-w-xs mb-8">
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam momen bahagia kami.
        </p>

        {/* Elegant Button with bounce anim */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpen}
          id="buka-undangan-btn"
          className="flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-sans font-semibold tracking-wider text-xs uppercase rounded-full shadow-lg border border-amber-300/40 hover:brightness-110 active:brightness-95 transition-all duration-300 cursor-pointer"
        >
          <MailOpen className="w-4 h-4 animate-bounce" />
          <span>Buka Undangan</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
