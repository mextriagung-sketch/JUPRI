import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Send, Users, AlertCircle, Heart } from 'lucide-react';
import { RSVP } from '../types';

interface RsvpFormProps {
  guestName: string;
  onSuccess: (newRsvp: RSVP) => void;
}

export default function RsvpForm({ guestName, onSuccess }: RsvpFormProps) {
  const [name, setName] = useState(guestName || '');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir'>('hadir');
  const [guestsCount, setGuestsCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Placeholder phone number for WhatsApp RSVP (e.g., Dea & Jupri's contact)
  // Standard contact phone: +6282372778899
  const [coupleWhatsApp] = useState('6282372778899'); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Silakan isi nama Anda terlebih dahulu.');
      return;
    }

    const newRsvp: RSVP = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      attendance,
      guestsCount: attendance === 'hadir' ? guestsCount : 0,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const savedRsvps: RSVP[] = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    savedRsvps.push(newRsvp);
    localStorage.setItem('wedding_rsvps', JSON.stringify(savedRsvps));

    setIsSubmitted(true);
    onSuccess(newRsvp);

    // Auto trigger WhatsApp redirect optionally if the guest chooses to send it
  };

  const handleSendWhatsApp = () => {
    const textMessage = `*KONFIRMASI KEHADIRAN - PERNIKAHAN DEA & JUPRI*%0A%0A` +
      `Nama: *${name.trim()}*%0A` +
      `Status Kehadiran: *${attendance === 'hadir' ? 'HADIR (Insya Allah)' : 'TIDAK DAPAT HADIR'}*%0A` +
      `${attendance === 'hadir' ? `Jumlah Tamu: *${guestsCount} Orang*%0A` : ''}` +
      `${message.trim() ? `Pesan/Doa: _"${message.trim()}"_%0A` : ''}%0A` +
      `Terima kasih!`;

    window.open(`https://api.whatsapp.com/send?phone=${coupleWhatsApp}&text=${textMessage}`, '_blank');
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 px-6 rounded-3xl border border-gold/15 bg-stone-950/50 backdrop-blur-md relative shadow-2xl overflow-hidden">
      {/* Decorative Golden Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-rose-900/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-900/5 rounded-full blur-2xl pointer-events-none" />

      <div className="text-center mb-6">
        <Heart className="w-6 h-6 text-gold mx-auto mb-2 animate-pulse" />
        <h3 className="text-2xl font-serif text-amber-100 font-medium tracking-wide">Konfirmasi Kehadiran</h3>
        <p className="text-rose-200/50 font-sans text-xs mt-1">Mohon konfirmasi kehadiran Anda melalui formulir di bawah ini</p>
        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-3" />
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-emerald-400" />
          </div>
          <h4 className="text-lg font-serif text-amber-100 mb-2">Terima Kasih Atas Konfirmasinya!</h4>
          <p className="text-rose-200/70 text-xs leading-relaxed max-w-xs mx-auto mb-6">
            Konfirmasi Anda telah berhasil disimpan di dalam daftar tamu undangan digital ini.
          </p>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleSendWhatsApp}
              className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-semibold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Konfirmasi via WhatsApp</span>
            </button>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-rose-200/50 hover:text-gold text-xs font-sans underline transition-colors"
            >
              Isi Ulang Formulir
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 bg-red-950/50 border border-red-500/20 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="text-red-200 text-xs font-sans leading-relaxed">{error}</span>
            </div>
          )}

          {/* Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-rose-200/70 tracking-wide font-sans block">Nama Tamu</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap Anda"
              className="w-full px-4 py-3 rounded-xl border border-gold/10 bg-maroon-950/20 text-rose-100 placeholder-rose-200/30 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-gold/40 focus:border-gold/40 transition-all duration-300"
            />
          </div>

          {/* Attendance Choice */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-rose-200/70 tracking-wide font-sans block">Kehadiran</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttendance('hadir')}
                className={`py-3 rounded-xl border font-sans text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                  attendance === 'hadir'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 border-amber-400 text-stone-950 shadow-md font-semibold'
                    : 'bg-maroon-950/10 border-gold/10 text-rose-200/60 hover:border-gold/30'
                }`}
              >
                <span>Hadir</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAttendance('tidak_hadir');
                  setGuestsCount(0);
                }}
                className={`py-3 rounded-xl border font-sans text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                  attendance === 'tidak_hadir'
                    ? 'bg-gradient-to-r from-rose-900 to-rose-800 border-rose-500 text-rose-100 shadow-md'
                    : 'bg-maroon-950/10 border-gold/10 text-rose-200/60 hover:border-gold/30'
                }`}
              >
                <span>Tidak Hadir</span>
              </button>
            </div>
          </div>

          {/* Guests Count Selector */}
          {attendance === 'hadir' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-1.5 overflow-hidden"
            >
              <label className="text-xs font-medium text-rose-200/70 tracking-wide font-sans block">Jumlah Tamu</label>
              <div className="relative">
                <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-gold/60 pointer-events-none" />
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gold/10 bg-maroon-950/20 text-rose-100 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-gold/40 focus:border-gold/40 transition-all duration-300 appearance-none"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num} className="bg-stone-900 text-rose-100">
                      {num} Orang
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-4.5 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-gold/70" />
              </div>
            </motion.div>
          )}

          {/* Short Congratulatory Message / Catatan */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-rose-200/70 tracking-wide font-sans block">
              Pesan Singkat & Doa Restu (Opsional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan selamat atau doa restu hangat Anda..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gold/10 bg-maroon-950/20 text-rose-100 placeholder-rose-200/30 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-gold/40 focus:border-gold/40 transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-110 active:scale-98 text-stone-950 font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Simpan Konfirmasi</span>
          </button>
        </form>
      )}
    </div>
  );
}
