import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageCircle, Sparkles, Star } from 'lucide-react';

interface StoryEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function LoveStory() {
  const stories: StoryEvent[] = [
    {
      date: 'Agustus 2019',
      title: 'Awal Pertemuan (Instagram DM)',
      description: 'Tak ada yang menyangka, sebuah pesan sederhana melalui Instagram menjadi awal dari kisah yang begitu berarti. Berawal dari saling menyapa, bertukar cerita, dan mengenal satu sama lain tanpa pernah tahu ke mana arah perjalanan ini akan membawa.',
      icon: <MessageCircle className="w-5 h-5 text-amber-200" />
    },
    {
      date: 'November 2020',
      title: 'Menemukan Kenyamanan',
      description: 'Waktu mempertemukan hati kami lebih dekat. Percakapan yang semula hanya sesekali berubah menjadi rutinitas yang selalu dinanti. Di tengah tawa, cerita, dan berbagai suka duka, kami menemukan kenyamanan yang perlahan tumbuh menjadi cinta.',
      icon: <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
    },
    {
      date: 'Juli 2025',
      title: 'Prosesi Lamaran',
      description: 'Kami melangsungkan, keseriusan untuk beribadah bersama. Kami melaksanakan prosesi lamaran. Yang hanya dihadiri oleh keluarga terdekat.',
      icon: <Sparkles className="w-5 h-5 text-amber-200" />
    }
  ];

  return (
    <section className="w-full max-w-xl mx-auto px-6 py-12 relative overflow-hidden text-center space-y-10">
      {/* Decorative Blur Background Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-900/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Section Header */}
      <div className="space-y-1 relative z-10">
        <span className="text-gold font-luxury text-xs uppercase tracking-[0.25em] block">Our Journey</span>
        <h2 className="text-3xl font-serif text-amber-100 font-medium tracking-wide">Love Story</h2>
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mt-2" />
      </div>

      {/* Timeline Section */}
      <div className="relative z-10 max-w-md mx-auto mt-10 text-left">
        {/* Vertical Center Gold Line */}
        <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-gold/5 via-gold/30 to-gold/5 -translate-x-[0.75px]" />

        {/* Story Elements */}
        <div className="space-y-10">
          {stories.map((story, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Connector Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-stone-950 border border-gold/40 flex items-center justify-center shadow-lg shadow-black/80 group hover:border-gold transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-maroon-950 to-stone-900 flex items-center justify-center border border-gold/10">
                      {story.icon}
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className={`w-full pl-16 md:pl-0 md:w-[45%] ${
                  isEven ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'
                }`}>
                  <div className="p-5 rounded-2xl border border-gold/15 bg-stone-950/40 backdrop-blur-sm shadow-xl space-y-2 relative overflow-hidden group hover:border-gold/30 transition-all duration-300">
                    {/* Tiny decorative gold line */}
                    <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                    
                    <span className="inline-block text-xs font-mono font-semibold text-amber-200 bg-maroon-950/40 px-2.5 py-0.5 rounded-full border border-gold/10">
                      {story.date}
                    </span>
                    <h3 className="text-base font-serif text-amber-100 font-semibold tracking-wide">
                      {story.title}
                    </h3>
                    <p className="text-xs font-sans text-rose-100/70 leading-relaxed font-light">
                      {story.description}
                    </p>
                  </div>
                </div>

                {/* Empty block for layout on desktop */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Beautiful Closing Quote & Hashtag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-md mx-auto p-6 rounded-3xl border border-gold/10 bg-gradient-to-b from-stone-950/45 to-maroon-950/20 backdrop-blur-sm shadow-xl relative overflow-hidden space-y-4"
      >
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <Star className="w-5 h-5 text-gold/60 mx-auto animate-pulse" />
        <p className="text-xs md:text-sm font-serif text-rose-100/90 leading-relaxed italic font-light px-2">
          "Dari sebuah pesan di Instagram hingga sebuah ikatan yang dipenuhi harapan, kami percaya bahwa setiap pertemuan telah dituliskan dengan indah oleh Tuhan. Kini, kami menantikan babak baru untuk melangkah bersama, membangun rumah yang penuh cinta, doa, dan kebahagiaan."
        </p>
        <div className="pt-2">
          <span className="text-gold font-sans text-sm font-semibold tracking-widest uppercase block animate-pulse">
            #JupriDEAkhirPelabuhan
          </span>
        </div>
      </motion.div>
    </section>
  );
}
