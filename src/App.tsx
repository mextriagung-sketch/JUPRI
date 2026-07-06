import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Copy,
  Check,
  Sparkles,
  Phone,
  BookOpen,
  Map,
  Music,
  Maximize,
  Smile,
  QrCode,
  Compass
} from 'lucide-react';

import FallingPetals from './components/FallingPetals';
import AudioPlayer from './components/AudioPlayer';
import InvitationCover from './components/InvitationCover';
import CountdownTimer from './components/CountdownTimer';
import RsvpForm from './components/RsvpForm';
import WishesBoard from './components/WishesBoard';
import GiftSection from './components/GiftSection';
import GallerySlider from './components/GallerySlider';
import { RotatingMandala, FloatingSparkles, AmbientLightPulse, IslamicLantern, IslamicStarOrnament, ArabicCircularOrnament, LuxuryMandalaOrnament } from './components/MovingOrnaments';

// Import beautiful generated assets
const luxuryRoseBanner = 'https://lh3.googleusercontent.com/d/1-znBTEFksuV2tumfvkYMUlB9ZolaYzf-';
const galleryPhoto3 = 'https://lh3.googleusercontent.com/d/1Z96Le5NkIC7QE0F2EsBhjw9amWUxVVzD';
const weddingCoupleArt = 'https://lh3.googleusercontent.com/d/1u--oVb9bY-SFJhCpoV-cymzmKCYlhx0f';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [refreshWishes, setRefreshWishes] = useState(0);

  // Invitation Link Generator states
  const [shareName, setShareName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Extract guest name from URL parameters
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to') || params.get('nama') || params.get('u') || '';
    setGuestName(decodeURIComponent(to).trim());
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true); // Start background music instantly on opening!
  };

  const handleRsvpSuccess = () => {
    // Refresh wishes board when someone submits RSVP
    setRefreshWishes((prev) => prev + 1);
  };

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareName.trim()) return;

    const encodedName = encodeURIComponent(shareName.trim());
    // Get base URL
    const baseUrl = window.location.origin + window.location.pathname;
    const finalUrl = `${baseUrl}?to=${encodedName}`;
    setGeneratedLink(finalUrl);
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!generatedLink) return;
    const textMessage = `*Yth. ${shareName.trim()}*%0A%0A` +
      `Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami (Dea & Jupri).%0A%0A` +
      `Detail info dan konfirmasi kehadiran dapat diakses melalui link undangan digital di bawah ini:%0A` +
      `👉 ${generatedLink}%0A%0A` +
      `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.%0A%0A` +
      `Terima kasih,%0A*Dea & Jupri*`;

    window.open(`https://api.whatsapp.com/send?text=${textMessage}`, '_blank');
  };

  const handleSaveToCalendar = (title: string, date: string, time: string, location: string) => {
    // Simple google calendar link generator
    const details = `Pernikahan Dea & Jupri - ${title}`;
    const start = '20260819T030000Z'; // 10:00 WIB in UTC is 03:00 UTC
    const end = '20260819T100000Z'; // s/d Selesai, estimate 17:00 WIB (10:00 UTC)
    const encodedTitle = encodeURIComponent(details);
    const encodedLoc = encodeURIComponent(location);
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${start}/${end}&details=Mohon+doa+restunya+untuk+pernikahan+Dea+&Jupri&location=${encodedLoc}`;
    window.open(calUrl, '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#610a0d] text-rose-100 font-sans selection:bg-gold selection:text-stone-900">
      
      {/* Falling Red Rose Petals - Immersive ambient layer */}
      <FallingPetals />

      {/* Background Classical Music Controller */}
      <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      {/* Screen 1: Cover Page */}
      <AnimatePresence>
        {!isOpen && (
          <InvitationCover onOpen={handleOpenInvitation} guestName={guestName} />
        )}
      </AnimatePresence>

      {/* Screen 2: Main Invitation Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-start w-full relative pb-20"
        >
          {/* Immersive Floating Sparkles and Background Hearts */}
          <FloatingSparkles />

          {/* Sways of Islamic Lanterns on the Left and Right gutters throughout scroll */}
          <div className="absolute top-[200px] left-4 md:left-12 pointer-events-none select-none z-10">
            <IslamicLantern className="w-10 h-28 md:w-14 md:h-36" delay="0.5s" speed="slow" />
          </div>
          <div className="absolute top-[600px] right-4 md:right-12 pointer-events-none select-none z-10">
            <IslamicLantern className="w-12 h-32 md:w-16 md:h-40" delay="2s" speed="slower" />
          </div>
          <div className="absolute top-[1400px] left-3 md:left-10 pointer-events-none select-none z-10">
            <IslamicLantern className="w-10 h-28 md:w-14 md:h-36" delay="1s" speed="slow" />
          </div>
          <div className="absolute top-[2200px] right-4 md:right-12 pointer-events-none select-none z-10">
            <IslamicLantern className="w-12 h-32 md:w-16 md:h-40" delay="3s" speed="slower" />
          </div>
          <div className="absolute top-[3200px] left-4 md:left-12 pointer-events-none select-none z-10">
            <IslamicLantern className="w-10 h-28 md:w-14 md:h-36" delay="1.8s" speed="slow" />
          </div>

          {/* Golden Rotating Islamic Star Ornaments along the scroll path */}
          <div className="absolute top-[450px] left-6 md:left-20 pointer-events-none select-none z-0">
            <IslamicStarOrnament className="w-8 h-8 md:w-12 md:h-12" speed="slow" opacity="opacity-20" />
          </div>
          <div className="absolute top-[1200px] right-6 md:right-20 pointer-events-none select-none z-0">
            <IslamicStarOrnament className="w-10 h-10 md:w-14 md:h-14" speed="slower" opacity="opacity-25" />
          </div>
          <div className="absolute top-[2500px] left-8 md:left-24 pointer-events-none select-none z-0">
            <IslamicStarOrnament className="w-12 h-12 md:w-16 md:h-16" speed="slow" opacity="opacity-20" />
          </div>
          <div className="absolute top-[3500px] right-8 md:right-24 pointer-events-none select-none z-0">
            <IslamicStarOrnament className="w-10 h-10 md:w-14 md:h-14" speed="slower" opacity="opacity-25" />
          </div>

          {/* Majestic slowly rotating background ornaments at various scroll checkpoints */}
          <div className="absolute top-[350px] -right-16 md:right-10 pointer-events-none select-none z-0">
            <ArabicCircularOrnament className="w-64 h-64 md:w-80 md:h-80" speed="slow" opacity="opacity-25" />
          </div>

          <div className="absolute top-[650px] -left-12 md:left-24 pointer-events-none select-none z-0">
            <ArabicCircularOrnament className="w-48 h-48 md:w-64 md:h-64" speed="slower" opacity="opacity-15" />
          </div>

          <div className="absolute top-[950px] -left-20 md:left-5 pointer-events-none select-none z-0">
            <LuxuryMandalaOrnament className="w-80 h-80 md:w-96 md:h-96" speed="slow" opacity="opacity-25" />
          </div>

          <div className="absolute top-[1800px] -right-24 md:-right-10 pointer-events-none select-none z-0">
            <ArabicCircularOrnament className="w-96 h-96 md:w-[450px] md:h-[450px]" speed="slow" opacity="opacity-30" />
          </div>

          <div className="absolute top-[2300px] -right-12 md:right-20 pointer-events-none select-none z-0">
            <ArabicCircularOrnament className="w-52 h-52 md:w-72 md:h-72" speed="slower" opacity="opacity-15" />
          </div>

          <div className="absolute top-[2800px] -left-20 md:left-10 pointer-events-none select-none z-0">
            <LuxuryMandalaOrnament className="w-72 h-72 md:w-[400px] md:h-[400px]" speed="slower" opacity="opacity-20" />
          </div>

          <div className="absolute top-[3300px] -left-16 md:left-28 pointer-events-none select-none z-0">
            <ArabicCircularOrnament className="w-60 h-60 md:w-80 md:h-80" speed="slow" opacity="opacity-20" />
          </div>

          <div className="absolute top-[3800px] -right-16 md:right-16 pointer-events-none select-none z-0">
            <ArabicCircularOrnament className="w-64 h-64 md:w-80 md:h-80" speed="slow" opacity="opacity-25" />
          </div>

          {/* Main Top Header Visual */}
          <div className="w-full max-w-xl mx-auto h-[260px] md:h-[320px] relative overflow-hidden shadow-2xl">
            <img
              src={luxuryRoseBanner}
              alt="Luxury Wedding Banner"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Dark elegant overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#100002] via-[#100002]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/20 to-transparent" />
          </div>

          {/* Section 1: Opening / Qur'an Quote */}
          <section className="w-full max-w-xl mx-auto px-6 py-12 text-center space-y-6 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/15 bg-maroon-950/20 text-[10px] uppercase tracking-widest font-semibold text-gold font-sans animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Maha Suci Allah</span>
            </div>

            <p className="font-serif text-amber-200/90 text-sm leading-relaxed max-w-md mx-auto italic font-light px-2">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
            </p>
            <p className="font-sans text-[10px] text-rose-300/40 uppercase tracking-[0.15em]">- Q.S. Ar-Rum: 21 -</p>
            
            <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-gold/25 to-transparent mx-auto" />
          </section>

          {/* Section 2: Mempelai (The Couple Profile) */}
          <section className="w-full max-w-xl mx-auto px-6 py-10 text-center space-y-8 relative">
            
            {/* Header section title */}
            <div className="space-y-1">
              <span className="text-gold font-luxury text-xs uppercase tracking-[0.25em] block">Kedua Mempelai</span>
              <h2 className="text-3xl font-serif text-amber-100 font-medium tracking-wide">Dea & Jupri</h2>
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-2" />
            </div>

            <p className="text-xs font-sans text-rose-100/70 leading-relaxed max-w-sm mx-auto font-light">
              Assalamu’alaikum Warahmatullahi Wabarakatuh.<br />
              Dengan memohon rahmat dan rida Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i dalam syukuran pernikahan kami:
            </p>

            {/* Couple portrait illustration card */}
            <div className="w-48 h-64 mx-auto rounded-3xl border border-gold/20 overflow-hidden shadow-2xl relative group bg-maroon-950/20">
              {/* Gold border overlay */}
              <div className="absolute inset-2.5 rounded-[18px] border border-gold/10 pointer-events-none" />
              <img
                src={weddingCoupleArt}
                alt="Wedding Couple Art"
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            </div>

            {/* Individual Profiles */}
            <div className="space-y-12 pt-4">
              {/* Bride: Dea */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h3 className="text-2xl font-serif text-amber-200 font-bold tracking-wide">
                  Dea Husnul Khotimah, S.Pd
                </h3>
                <p className="text-rose-100/60 font-sans text-xs italic font-light max-w-xs mx-auto">
                  Putri ketiga dari Bapak Sugeng, S.Pd <br />
                  dan Ibu Sri Sumarni, S.Pd. SD
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-rose-300/40 tracking-wider uppercase font-sans font-semibold pt-1">
                  <Compass className="w-3 h-3 text-gold/60" />
                  <span>Kec. Lalan, Musi Banyuasin</span>
                </div>
              </motion.div>

              {/* Heart ornament */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/30" />
                <Heart className="w-4 h-4 text-rose-700 fill-current animate-pulse" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/30" />
              </div>

              {/* Groom: Jupri */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h3 className="text-2xl font-serif text-amber-200 font-bold tracking-wide uppercase">
                  Jupriyanto, S.E
                </h3>
                <p className="text-rose-100/60 font-sans text-xs italic font-light max-w-xs mx-auto">
                  Putra Pertama dari Bapak Sudirman <br />
                  dan Ibu Siti Mariah (Almh)
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-rose-300/40 tracking-wider uppercase font-sans font-semibold pt-1">
                  <Compass className="w-3 h-3 text-gold/60" />
                  <span>Kec. Lalan, Musi Banyuasin</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Section 3: Waktu & Tempat (Event Details) */}
          <section className="w-full max-w-xl mx-auto px-6 py-12 text-center space-y-10 relative">
            {/* Background blurred circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-1">
              <span className="text-gold font-luxury text-xs uppercase tracking-[0.25em] block">Waktu & Tempat</span>
              <h2 className="text-3xl font-serif text-amber-100 font-medium tracking-wide">Hari Bahagia</h2>
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-2" />
            </div>

            {/* Live Countdown */}
            <div className="w-full py-4">
              <CountdownTimer targetDate="2026-08-19T10:00:00+07:00" />
            </div>

            {/* Events Cards (Akad & Resepsi) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Card 1: Akad Nikah */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl border border-gold/15 bg-stone-950/50 backdrop-blur-sm shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-gold/35 transition-all duration-500"
              >
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="space-y-4">
                  {/* Badge */}
                  <span className="inline-block px-3 py-1 rounded-full border border-gold/20 bg-maroon-950/30 text-[9px] uppercase tracking-widest font-bold text-amber-200">
                    Akad Nikah
                  </span>

                  {/* Day Date */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-serif text-amber-100 font-semibold">Rabu, 19 Agustus 2026</h4>
                    <p className="text-xs font-sans text-rose-200/50 flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold/70" />
                      <span>Pukul 10.00 WIB s/d selesai</span>
                    </p>
                  </div>

                  {/* Address */}
                  <div className="space-y-1 text-center">
                    <p className="text-xs font-sans font-semibold text-rose-100 flex items-center justify-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>Desa Galih Sari (P12)</span>
                    </p>
                    <p className="text-[11px] font-sans text-rose-200/60 leading-relaxed max-w-xs mx-auto">
                      RT 022 RW 05, Kec. Lalan, Kab. Musi Banyuasin, Sumatera Selatan
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => handleSaveToCalendar('Akad Nikah', '20260819', '1000', 'Desa Galih Sari (P12) RT 022 RW 05, Lalan, Musi Banyuasin')}
                    className="py-2.5 bg-stone-900 hover:bg-stone-850 text-gold border border-gold/20 hover:border-gold/40 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Simpan Ke Kalender</span>
                  </button>
                </div>
              </motion.div>

              {/* Card 2: Resepsi Pernikahan */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl border border-gold/15 bg-stone-950/50 backdrop-blur-sm shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-gold/35 transition-all duration-500"
              >
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="space-y-4">
                  {/* Badge */}
                  <span className="inline-block px-3 py-1 rounded-full border border-gold/20 bg-maroon-950/30 text-[9px] uppercase tracking-widest font-bold text-amber-200">
                    Resepsi Pernikahan
                  </span>

                  {/* Day Date */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-serif text-amber-100 font-semibold">Rabu, 19 Agustus 2026</h4>
                    <p className="text-xs font-sans text-rose-200/50 flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold/70" />
                      <span>Pukul 10.00 WIB s/d selesai</span>
                    </p>
                  </div>

                  {/* Address */}
                  <div className="space-y-1 text-center">
                    <p className="text-xs font-sans font-semibold text-rose-100 flex items-center justify-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>Desa Galih Sari (P12)</span>
                    </p>
                    <p className="text-[11px] font-sans text-rose-200/60 leading-relaxed max-w-xs mx-auto">
                      RT 22 RW 05, Kec. Lalan, Kab. Musi Banyuasin, Sumatera Selatan
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => handleSaveToCalendar('Resepsi Pernikahan', '20260819', '1000', 'Desa Galih Sari (P12) RT 22 RW 05, Lalan, Musi Banyuasin')}
                    className="py-2.5 bg-stone-900 hover:bg-stone-850 text-gold border border-gold/20 hover:border-gold/40 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Simpan Ke Kalender</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Google Maps Detail Map */}
            <div className="w-full py-4">
              <div className="p-4 rounded-3xl border border-gold/15 bg-stone-950/50 backdrop-blur-sm shadow-xl space-y-4">
                <div className="flex items-center gap-2.5 px-2">
                  <Map className="w-5 h-5 text-gold" />
                  <span className="font-sans text-xs font-semibold text-rose-100">
                    Peta Lokasi Pernikahan (Desa Galih Sari P12, Lalan)
                  </span>
                </div>
                
                {/* Embed Google Maps Iframe */}
                <div className="w-full h-56 rounded-2xl overflow-hidden border border-gold/10 relative shadow-inner">
                  <iframe
                    src="https://maps.google.com/maps?q=Desa%20Galih%20Sari%20P12%20Lalan%20Musi%20Banyuasin&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 grayscale opacity-80 contrast-125 focus:outline-none"
                    allowFullScreen
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none border border-gold/10 rounded-2xl" />
                </div>

                <button
                  onClick={() => window.open('https://maps.google.com/?q=Desa+Galih+Sari+P12+RT+22+RW+05+Lalan+Musi+Banyuasin', '_blank')}
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:brightness-110 text-stone-950 font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka Google Maps</span>
                </button>
              </div>
            </div>
          </section>

          {/* Section 4: Galeri Keindahan (Visual Gallery) */}
          <section className="w-full max-w-xl mx-auto px-6 py-12 text-center space-y-8 relative">
            <div className="space-y-1">
              <span className="text-gold font-luxury text-xs uppercase tracking-[0.25em] block">Galeri Foto</span>
              <h2 className="text-3xl font-serif text-amber-100 font-medium tracking-wide">Momen Bahagia</h2>
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-2" />
            </div>

            {/* Custom Gallery Slider utilizing the premium images */}
            <GallerySlider
              images={[
                {
                  url: luxuryRoseBanner,
                  title: 'Wedding Banner',
                  desc: 'Meniti langkah awal menuju kebahagiaan abadi'
                },
                {
                  url: weddingCoupleArt,
                  title: 'Wedding Art',
                  desc: 'Ikatan suci dua insan yang dipenuhi berkah dan cinta'
                },
                {
                  url: galleryPhoto3,
                  title: 'Momen Indah',
                  desc: 'Setiap detik bersamamu adalah anugerah terindah'
                }
              ]}
            />
          </section>

          {/* Section 5: RSVP Form */}
          <section className="w-full max-w-xl mx-auto px-6 py-10 relative">
            <RsvpForm guestName={guestName} onSuccess={handleRsvpSuccess} />
          </section>

          {/* Section 6: Wishes Board / Doa Restu Feed */}
          <section className="w-full max-w-xl mx-auto py-10 relative">
            <WishesBoard onWishAdded={handleRsvpSuccess} refreshTrigger={refreshWishes} />
          </section>

          {/* Section 7: Gift / Kado cashless and physical shipping */}
          <section className="w-full max-w-xl mx-auto px-6 py-10 relative">
            <GiftSection />
          </section>

          {/* Section 8: Pengantin Tools - Invitation Link Generator */}
          {/* This feature is incredibly helpful for the couple to create customized invitations on WhatsApp! */}
          <section className="w-full max-w-xl mx-auto px-6 py-10 relative">
            <div className="p-6 rounded-3xl border border-gold/15 bg-stone-950/70 backdrop-blur-md relative shadow-2xl text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5 text-gold animate-bounce" />
                <h4 className="font-serif text-amber-100 text-lg font-medium tracking-wide">
                  Fitur Pengantin: Kirim Undangan WA
                </h4>
              </div>
              <p className="text-[11px] font-sans text-rose-200/60 leading-relaxed max-w-xs mx-auto">
                Tulis nama tamu di bawah untuk membuat link undangan digital personal, lalu bagikan secara praktis lewat WhatsApp!
              </p>

              <form onSubmit={handleGenerateLink} className="space-y-3.5 pt-2 max-w-sm mx-auto">
                <input
                  type="text"
                  required
                  value={shareName}
                  onChange={(e) => setShareName(e.target.value)}
                  placeholder="Contoh: Bapak Budi Sutrisno"
                  className="w-full px-4 py-2.5 rounded-xl border border-gold/10 bg-maroon-950/20 text-rose-100 placeholder-rose-200/30 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-gold border border-gold/25 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Buat Link Undangan
                </button>
              </form>

              {generatedLink && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 pt-4 border-t border-gold/10 max-w-sm mx-auto overflow-hidden text-left"
                >
                  <span className="text-[10px] font-medium text-rose-200/70 font-sans block">
                    Link Undangan Berhasil Dibuat:
                  </span>
                  
                  <div className="flex items-center gap-2 p-2.5 bg-maroon-950/30 border border-gold/10 rounded-xl">
                    <span className="font-sans text-[10px] text-amber-200 truncate flex-1 select-all">
                      {generatedLink}
                    </span>
                    <button
                      onClick={handleCopyLink}
                      className="p-1.5 rounded-lg bg-stone-950 border border-gold/10 text-gold hover:bg-gold/15 transition-all"
                      title="Salin Link"
                    >
                      {copiedLink ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handleShareWhatsApp}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Bagikan ke WhatsApp Tamu</span>
                  </button>
                </motion.div>
              )}
            </div>
          </section>

          {/* Section 9: Closing Footer */}
          <footer className="w-full max-w-xl mx-auto px-6 py-16 text-center space-y-4">
            <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-6" />
            <p className="font-sans text-xs text-rose-100/40 tracking-wider">
              Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu bagi kami.
            </p>
            <p className="font-serif text-sm text-rose-200/50 pt-4">Wassalamu’alaikum Warahmatullahi Wabarakatuh.</p>
            <div className="space-y-1.5 pt-6">
              <span className="text-gold font-luxury text-[10px] uppercase tracking-widest block">Kami yang berbahagia</span>
              <p className="text-xl font-script text-amber-200">Dea & Jupri</p>
              <p className="text-[10px] font-sans text-rose-200/30 font-light uppercase tracking-wider">Keluarga Bapak Sugeng & Bapak Sudirman</p>
            </div>
          </footer>

          {/* Running Text Banner at the Bottom of the Page */}
          <div className="w-full bg-stone-950/90 border-t border-gold/20 py-3.5 overflow-hidden relative z-20 mt-10">
            <div className="max-w-xl mx-auto px-4">
              <marquee direction="right" scrollamount="4" className="font-sans text-[11px] text-amber-100/85 tracking-wider font-medium block">
                Percetakan Mextri Computer &bull; Desa Tri Mulya Agung, Lalan &bull; 082279088423
              </marquee>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
