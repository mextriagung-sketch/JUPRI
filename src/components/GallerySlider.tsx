import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, ZoomIn, X, Heart } from 'lucide-react';

interface GallerySliderProps {
  images: {
    url: string;
    title: string;
    desc: string;
  }[];
}

export default function GallerySlider({ images }: GallerySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false); // pause auto-play on user interaction
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6" id="gallery-slider-root">
      {/* Slide Container Frame (Portrait aspect-[3/4]) */}
      <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-gold/20 shadow-2xl bg-stone-950/80 group">
        
        {/* Inner Gold Thin Border Accent */}
        <div className="absolute inset-2.5 border border-gold/10 rounded-2xl pointer-events-none z-10" />

        {/* Slides Presentation with Animation */}
        <div className="w-full h-full relative cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={images[currentIndex].url}
                alt={images[currentIndex].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />

              {/* Text Caption Overlay */}
              <div className="absolute bottom-6 inset-x-6 z-20 text-center space-y-1">
                <span className="text-[9px] font-luxury tracking-[0.2em] text-gold uppercase flex items-center justify-center gap-1">
                  <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500 animate-pulse" />
                  <span>{images[currentIndex].title}</span>
                </span>
                <p className="text-[11px] font-sans text-rose-100/90 leading-relaxed font-light">
                  {images[currentIndex].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hover Zoom-In Hint Icon */}
        <div className="absolute top-4 right-4 z-20 bg-stone-950/70 border border-gold/20 p-2 rounded-xl text-gold/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <ZoomIn className="w-3.5 h-3.5" />
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
            setIsPlaying(false);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-stone-950/75 border border-gold/25 text-gold hover:text-white hover:bg-stone-900 hover:border-gold/50 transition-all duration-300 shadow-md cursor-pointer active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4.5 h-4.5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
            setIsPlaying(false);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-stone-950/75 border border-gold/25 text-gold hover:text-white hover:bg-stone-900 hover:border-gold/50 transition-all duration-300 shadow-md cursor-pointer active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Slider Controls (Dots, AutoPlay toggle, Page Indicator) */}
      <div className="flex items-center justify-between px-2">
        {/* Play/Pause Autoplay Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/20 bg-stone-950/40 hover:bg-stone-900/50 hover:border-gold/40 text-[9px] font-bold text-gold uppercase tracking-wider transition-all duration-300 cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 text-gold" />
              <span>Pause Slideshow</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-gold" />
              <span>Play Slideshow</span>
            </>
          )}
        </button>

        {/* Custom Dot Indicators */}
        <div className="flex items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? 'w-6 bg-gold'
                  : 'w-2 bg-gold/30 hover:bg-gold/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Index Page Tracker */}
        <span className="font-mono text-[10px] text-rose-200/40">
          0{currentIndex + 1} / 0{images.length}
        </span>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-950/95 flex flex-col items-center justify-center p-4 backdrop-blur-md select-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 z-[110] w-11 h-11 flex items-center justify-center rounded-full bg-stone-900/85 border border-gold/35 text-gold hover:text-white hover:border-gold transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Main Image Container */}
            <div 
              className="relative max-w-4xl max-h-[75vh] w-full rounded-2xl overflow-hidden border border-gold/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentIndex].url}
                alt={images[currentIndex].title}
                className="w-full h-auto max-h-[75vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 inset-x-0 bg-stone-950/70 p-4 text-center border-t border-gold/10">
                <span className="text-[10px] font-luxury tracking-[0.25em] text-gold uppercase block mb-1">
                  {images[currentIndex].title}
                </span>
                <p className="text-xs font-sans text-rose-100 font-light">
                  {images[currentIndex].desc}
                </p>
              </div>
            </div>

            {/* Lightbox Navigation Buttons */}
            <div className="flex items-center gap-6 mt-6" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handlePrev}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-stone-900/80 border border-gold/25 text-gold hover:text-white hover:border-gold/50 transition-all cursor-pointer active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="font-mono text-xs text-rose-200/60 bg-stone-900/50 px-3.5 py-1.5 rounded-full border border-gold/10">
                {currentIndex + 1} / {images.length}
              </span>

              <button
                onClick={handleNext}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-stone-900/80 border border-gold/25 text-gold hover:text-white hover:border-gold/50 transition-all cursor-pointer active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
