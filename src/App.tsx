import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- Types ---
interface PhotoCard {
  url: string;
  caption: string;
}

// --- Components ---

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const PhotoCard = ({ photo, index }: { photo: PhotoCard; index: number }) => (
  <FadeIn delay={index * 0.1}>
    <div className="group mb-20 last:mb-0">
      <div className="aspect-[3/4] overflow-hidden rounded-sm bg-stone-100">
        <img
          src={photo.url}
          alt={photo.caption}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop';
          }}
        />
      </div>
      <p className="mt-4 text-sm text-stone-600 tracking-wide max-w-xs mx-auto text-center font-light leading-relaxed">
        {photo.caption}
      </p>
    </div>
  </FadeIn>
);

const Tag = ({ text }: { text: string }) => (
  <span className="px-3 py-1 text-xs tracking-wider text-stone-500 border border-stone-200 rounded-full uppercase">
    {text}
  </span>
);

// --- Main ---

export default function App() {
  useEffect(() => {
    // Лёгкий конфетти только в начале
    const end = Date.now() + 2000;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#e7e5e4', '#d6d3d1', '#a8a29e'], // нейтральные тона
        disableForReducedMotion: true,
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const photos: PhotoCard[] = [
    { url: 'photo1.jpg', caption: 'Твоя улыбка освещает всё вокруг' },
    { url: 'photo2.jpg', caption: 'Пусть каждый момент будет наполнен счастьем' },
    { url: 'photo3.jpg', caption: 'Ты самая удивительная' },
  ];

  return (
    <div className="min-h-screen bg-white text-stone-900 selection:bg-stone-200 font-sans antialiased">
      {/* Hero */}
      <section className="h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-light tracking-tight mb-4"
        >
          С Днём Рождения
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-stone-400 font-light tracking-widest uppercase"
        >
          Тебе уже 19
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 text-stone-300 text-xs tracking-widest uppercase"
        >
          Scroll
        </motion.div>
      </section>

      {/* Photos */}
      <section className="max-w-md mx-auto px-6 py-20">
        {photos.map((photo, idx) => (
          <PhotoCard key={idx} photo={photo} index={idx} />
        ))}
      </section>

      {/* Wishes */}
      <section className="max-w-xl mx-auto px-6 pb-32 text-center">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-tight">
            С 19-летием, любимая
          </h2>
          
          <p className="text-stone-600 font-light leading-loose mb-12 max-w-md mx-auto">
            Ты — моё солнышко. В этот особенный день хочу сказать тебе самые тёплые слова. 
            Ты делаешь этот мир красивее просто тем, что ты есть. 
            Пусть твои 19 лет будут наполнены счастьем, любовью и невероятными приключениями.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            <Tag text="Красивая" />
            <Tag text="Умная" />
            <Tag text="Незабываемая" />
            <Tag text="Единственная" />
          </div>

          <div className="pt-10 border-t border-stone-100">
            <p className="text-sm text-stone-400 tracking-widest uppercase mb-2">С любовью</p>
            <p className="text-stone-300 text-xs">2025</p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
