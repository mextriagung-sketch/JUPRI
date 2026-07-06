import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // ISO string or parsable format
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  if (timeLeft.isCompleted) {
    return (
      <div className="text-center py-4 px-6 rounded-2xl border border-gold/20 bg-maroon-950/40 backdrop-blur-md">
        <p className="text-gold font-luxury text-lg tracking-widest uppercase">Hari Bahagia Telah Tiba!</p>
        <p className="text-rose-200/70 text-xs font-sans mt-1">19 Agustus 2026</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <p className="text-rose-200/60 font-sans tracking-widest text-[10px] uppercase font-light">Menuju Hari Bahagia</p>
      
      <div className="flex items-center justify-center gap-3 md:gap-5 w-full max-w-sm">
        {timeBlocks.map((block, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            {/* Box Container */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-gold/15 bg-stone-950/60 flex flex-col items-center justify-center relative shadow-xl overflow-hidden group">
              {/* Decorative light shimmer */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-maroon-950/10 to-transparent pointer-events-none" />
              
              {/* Number */}
              <span className="text-2xl md:text-3xl font-serif font-bold text-amber-200 leading-none">
                {String(block.value).padStart(2, '0')}
              </span>
            </div>
            
            {/* Label */}
            <span className="text-[10px] md:text-xs font-sans font-medium text-rose-200/50 uppercase mt-2 tracking-wider">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
