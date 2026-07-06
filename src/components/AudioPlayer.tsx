import React, { useEffect, useRef, useState } from 'react';
import { Music, VolumeX, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, setIsPlaying }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl] = useState('https://www.dropbox.com/scl/fi/oc49pdd4lxb9koiiq0pyq/videoplayback.mp3?rlkey=8f8sxwy8zh8deoskqh831h7oe&st=ljnco625&raw=1');

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.4; // 40% volume is perfect and non-intrusive
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log('Playback blocked or failed:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={togglePlayback}
        id="audio-toggle-btn"
        className="w-12 h-12 rounded-full bg-maroon-800 text-maroon-100 flex items-center justify-center shadow-lg border border-gold/40 hover:scale-105 active:scale-95 transition-all duration-300 relative group"
        title={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {/* Pulsing ring around button */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-gold/40 animate-ping opacity-60 pointer-events-none" />
        )}
        
        {/* Rotating disc style or standard speaker icon */}
        <div className={`transition-transform duration-500 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-amber-200" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {/* Tooltip */}
        <span className="absolute left-14 bg-stone-900/90 border border-gold/30 text-gold text-xs px-2.5 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap font-sans">
          {isPlaying ? 'Matikan Musik' : 'Putar Musik'}
        </span>
      </button>
    </div>
  );
}
