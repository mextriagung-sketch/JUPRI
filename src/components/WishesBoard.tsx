import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Calendar, Sparkles, Heart } from 'lucide-react';
import { Wish } from '../types';

interface WishesBoardProps {
  onWishAdded: () => void;
  refreshTrigger: number;
}

export default function WishesBoard({ onWishAdded, refreshTrigger }: WishesBoardProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Teman');
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState<'hadir' | 'tidak_hadir' | 'tentatif'>('hadir');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Pre-populated default wishes to make the board look warm and welcoming
  const defaultWishes: Wish[] = [
    {
      id: 'def-1',
      name: 'Ibu Sri Sumarni, S.Pd. SD',
      relationship: 'Keluarga',
      message: 'Selamat menempuh hidup baru untuk putri tercintaku Dea dan putraku Jupri. Semoga Allah SWT selalu menuntun langkah kalian, memberkahi bahtera rumah tangga kalian menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin Ya Rabbal Alamin.',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      attendance: 'hadir',
    },
    {
      id: 'def-2',
      name: 'Ahmad Fauzi, S.E',
      relationship: 'Rekan Kerja',
      message: 'Selamat menempuh hidup baru Jupri bro! Akhirnya melepas masa lajang juga dengan pilihan hati. Semoga sukses seluruh rangkaian acara Akad & Resepsi di Lalan nanti. Semoga samawa selalu dan cepat diberikan momongan ya bro!',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      attendance: 'hadir',
    },
    {
      id: 'def-3',
      name: 'Fitri Handayani, S.Pd',
      relationship: 'Teman',
      message: 'Happy Wedding sahabat perjuanganku Dea Husnul! Terharu sekali akhirnya melihatmu melangkah ke pelaminan bersama Kak Jupri. Semoga kebahagiaan menyelimuti hari-hari baru kalian berdua, langgeng dunia akhirat yaaa!',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      attendance: 'hadir',
    },
    {
      id: 'def-4',
      name: 'Bapak Sudirman',
      relationship: 'Keluarga',
      message: 'Selamat berbahagia anakku Jupriyanto dan menantuku Dea. Doa bapak selalu menyertai kalian berdua. Jadilah imam yang bijaksana bagi istrimu, dan binalah keluarga yang penuh cinta kasih serta ketaatan kepada Sang Pencipta.',
      createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      attendance: 'hadir',
    }
  ];

  const loadWishes = () => {
    const savedWishes = localStorage.getItem('wedding_wishes');
    if (savedWishes) {
      setWishes(JSON.parse(savedWishes));
    } else {
      // Set default wishes on first load
      localStorage.setItem('wedding_wishes', JSON.stringify(defaultWishes));
      setWishes(defaultWishes);
    }
  };

  useEffect(() => {
    loadWishes();
  }, [refreshTrigger]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newWish: Wish = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      relationship,
      message: message.trim(),
      createdAt: new Date().toISOString(),
      attendance,
    };

    const updatedWishes = [newWish, ...wishes];
    localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));
    setWishes(updatedWishes);

    setName('');
    setMessage('');
    setAttendance('hadir');
    setRelationship('Teman');
    setSuccessMsg('Ucapan dan doa restu Anda berhasil dikirim!');

    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);

    setIsSubmitting(false);
    onWishAdded(); // Notify parent
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      
      // Minutes, Hours, Days
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return 'Baru saja';
      if (diffMins < 60) return `${diffMins} menit lalu`;
      if (diffHours < 24) return `${diffHours} jam lalu`;
      if (diffDays < 7) return `${diffDays} hari lalu`;

      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'Beberapa waktu lalu';
    }
  };

  const getAttendanceLabel = (status: 'hadir' | 'tidak_hadir' | 'tentatif') => {
    switch (status) {
      case 'hadir':
        return { text: 'Hadir', bg: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/20' };
      case 'tidak_hadir':
        return { text: 'Tidak Hadir', bg: 'bg-rose-950/40 text-rose-300 border-rose-500/20' };
      default:
        return { text: 'Tentatif', bg: 'bg-amber-950/40 text-amber-300 border-amber-500/20' };
    }
  };

  const getRelationshipBadgeColor = (rel: string) => {
    switch (rel) {
      case 'Keluarga':
        return 'bg-purple-950/40 text-purple-300 border-purple-500/20';
      case 'Teman':
        return 'bg-blue-950/40 text-blue-300 border-blue-500/20';
      case 'Rekan Kerja':
        return 'bg-teal-950/40 text-teal-300 border-teal-500/20';
      default:
        return 'bg-stone-900 text-stone-300 border-stone-800';
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 px-4">
      {/* Form Card */}
      <div className="py-8 px-6 rounded-3xl border border-gold/15 bg-stone-950/50 backdrop-blur-md relative shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-rose-900/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="text-center mb-6">
          <MessageSquare className="w-6 h-6 text-gold mx-auto mb-2" />
          <h3 className="text-2xl font-serif text-amber-100 font-medium tracking-wide">Kirim Doa Restu</h3>
          <p className="text-rose-200/50 font-sans text-xs mt-1">Berikan ucapan manis serta doa restu Anda untuk Dea & Jupri</p>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-3" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-3.5 bg-emerald-950/40 border border-emerald-500/20 rounded-xl flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-200 text-xs font-sans font-medium">{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-rose-200/70 font-sans block">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-4 py-2.5 rounded-xl border border-gold/10 bg-maroon-950/15 text-rose-100 placeholder-rose-200/30 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 transition-all duration-300"
              />
            </div>

            {/* Hubungan */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-rose-200/70 font-sans block">Hubungan</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold/10 bg-maroon-950/15 text-rose-100 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 transition-all duration-300"
              >
                {['Keluarga', 'Teman', 'Rekan Kerja', 'Tetangga'].map((rel) => (
                  <option key={rel} value={rel} className="bg-stone-950 text-rose-100">
                    {rel}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Kehadiran */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-rose-200/70 font-sans block">Kehadiran Anda</label>
            <div className="grid grid-cols-3 gap-2">
              {(['hadir', 'tidak_hadir', 'tentatif'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setAttendance(status)}
                  className={`py-2 rounded-lg border font-sans text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    attendance === status
                      ? 'bg-gradient-to-r from-amber-600 to-amber-500 border-amber-400 text-stone-950 shadow-sm'
                      : 'bg-maroon-950/10 border-gold/10 text-rose-200/50 hover:border-gold/25'
                  }`}
                >
                  {status === 'hadir' ? 'Hadir' : status === 'tidak_hadir' ? 'Absen' : 'Tentatif'}
                </button>
              ))}
            </div>
          </div>

          {/* Pesan */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-rose-200/70 font-sans block">Pesan/Doa Restu</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan selamat dan doa tulus terbaik Anda di sini..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gold/10 bg-maroon-950/15 text-rose-100 placeholder-rose-200/30 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-gold/30 focus:border-gold/30 transition-all duration-300 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 font-sans text-xs font-bold uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-98 transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </form>
      </div>

      {/* Wishes Feed List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gold/10 pb-3">
          <span className="font-serif text-lg text-amber-100 font-medium tracking-wide flex items-center gap-2">
            <span>Untaian Doa Restu</span>
            <span className="text-xs font-sans text-rose-200/40">({wishes.length} Ucapan)</span>
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-gold animate-ping" />
        </div>

        <div className="max-h-[420px] overflow-y-auto pr-2 space-y-4 custom-scrollbar no-scrollbar">
          <AnimatePresence initial={false}>
            {wishes.map((wish) => {
              const attInfo = getAttendanceLabel(wish.attendance);
              return (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-5 rounded-2xl border border-gold/10 bg-stone-950/40 relative shadow-lg group hover:border-gold/20 transition-all duration-300"
                >
                  {/* Decorative faint rose in the corner of the card */}
                  <div className="absolute top-4 right-4 text-rose-950/25 pointer-events-none transition-colors group-hover:text-rose-950/40 duration-300">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    {/* Guest Name */}
                    <h4 className="font-serif text-amber-100 font-semibold text-sm tracking-wide">
                      {wish.name}
                    </h4>
                    
                    {/* Relationship Badge */}
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-sans tracking-wide ${getRelationshipBadgeColor(wish.relationship)}`}>
                      {wish.relationship}
                    </span>

                    {/* Attendance Badge */}
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-sans tracking-wide ${attInfo.bg}`}>
                      {attInfo.text}
                    </span>
                  </div>

                  {/* Message content */}
                  <p className="text-rose-100/80 font-sans text-xs leading-relaxed font-light break-words">
                    {wish.message}
                  </p>

                  {/* Created Time footer */}
                  <div className="flex items-center gap-1.5 mt-3 text-[10px] text-rose-200/40 font-sans">
                    <Calendar className="w-3 h-3 text-gold/50" />
                    <span>{formatDate(wish.createdAt)}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
