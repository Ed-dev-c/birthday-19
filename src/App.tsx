import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---
interface PhotoCard {
  url: string;
  caption: string;
  emoji: string;
}

// --- Components ---

const FloatingEmoji = ({ emoji, delay }: { emoji: string; delay: number }) => {
  const randomX = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 20;

  return (
    <motion.div
      initial={{ y: '110vh', x: `${randomX}vw`, opacity: 0, scale: 0.5 }}
      animate={{
        y: '-10vh',
        opacity: [0, 1, 1, 0],
        rotate: [0, 45, -45, 0],
      }}
      transition={{
        duration: randomDuration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="fixed pointer-events-none text-2xl z-0 opacity-40 select-none"
    >
      {emoji}
    </motion.div>
  );
};

const PhotoCardComp = ({ photo, index }: { photo: PhotoCard; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-white p-4 rounded-3xl shadow-xl border-4 border-pink-200 max-w-sm mx-auto mb-16"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-pink-50 flex items-center justify-center border-2 border-pink-100">
        <img
          src={photo.url}
          alt={photo.caption}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop`;
          }}
        />
        <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-pink-500">
          <Heart size={20} fill="currentColor" />
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-pink-600 font-medium text-lg leading-snug">
          {photo.caption}
        </p>
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-pink-400">💕</span>
          <span className="text-pink-400">🌸</span>
          <span className="text-pink-400">✨</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const photos: PhotoCard[] = [
    { url: 'photo1.jpg', caption: 'Твоя прекрасная улыбка освещает всё вокруг ❤️', emoji: '🌸' },
    { url: 'photo2.jpg', caption: 'Пусть каждый момент будет наполнен счастьем!', emoji: '✨' },
    { url: 'photo3.jpg', caption: 'Ты самая удивительная девушка в мире!', emoji: '💖' },
  ];

  const floatingEmojis = ['🌸', '🦋', '✨', '🌷', '🌻', '💗', '⭐', '🎈'];

  return (
    <div className="min-h-screen bg-[#FFF0F5] selection:bg-pink-200 overflow-x-hidden font-sans relative">
      {/* Floating Emojis Background */}
      {floatingEmojis.map((emoji, idx) => (
        <React.Fragment key={idx}>
          {[...Array(3)].map((_, i) => (
            <FloatingEmoji key={`${idx}-${i}`} emoji={emoji} delay={idx * 2 + i * 5} />
          ))}
        </React.Fragment>
      ))}

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-4 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.5 }}
          className="mb-8"
        >
          <div className="text-7xl mb-4">👑</div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-4xl md:text-6xl font-black text-pink-600 mb-2 drop-shadow-sm"
        >
          С Днём Рождения!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xl md:text-2xl text-pink-500 font-semibold"
        >
          Тебе уже 19! 🥳✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
          className="absolute bottom-10 text-pink-400 font-medium flex flex-col items-center"
        >
          <span>Листай вниз</span>
          <span className="text-2xl">↓</span>
        </motion.div>
      </section>

      {/* Photo Grid Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {photos.map((photo, idx) => (
          <PhotoCardComp key={idx} photo={photo} index={idx} />
        ))}
      </section>

      {/* Wishes Section */}
      <section className="max-w-2xl mx-auto px-6 pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/70 backdrop-blur-md p-8 rounded-[40px] shadow-2xl border-2 border-white text-center"
        >
          <div className="flex justify-center gap-3 mb-6 text-3xl">
            <span>💕</span><span>💖</span><span>💗</span><span>💓</span><span>💞</span>
          </div>

          <h2 className="text-3xl font-bold text-pink-600 mb-6">С 19-летием, любимая!</h2>
          <p className="text-pink-500 font-medium text-lg mb-8 leading-relaxed">
            Ты — моё солнышко! ☀️<br/><br/>
            В этот особенный день я хочу сказать тебе самые тёплые слова. 
            Ты делаешь этот мир красивее просто тем, что ты есть. 
            Пусть твои 19 лет будут наполнены счастьем, любовью и невероятными приключениями!
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Tag text="🌟 Красивая" color="bg-pink-100" />
            <Tag text="💝 Умная" color="bg-rose-100" />
            <Tag text="✨ Незабываемая" color="bg-fuchsia-100" />
            <Tag text="🦋 Единственная" color="bg-pink-100" />
          </div>

          <div className="bg-pink-50 p-6 rounded-3xl border-2 border-pink-100 flex flex-col items-center">
             <div className="text-5xl mb-3">🎂</div>
             <p className="text-pink-600 font-bold text-xl">Happy 19th Birthday!</p>
          </div>
        </motion.div>

        <footer className="mt-12 text-center text-pink-500 font-medium">
          <p className="mb-4">С любовью 💕</p>
          <div className="flex justify-center gap-4 text-2xl">
             <span>🌸</span><span>🌺</span><span>🌻</span><span>🌷</span><span>🌹</span>
          </div>
        </footer>
      </section>
    </div>
  );
}

function Tag({ text, color }: { text: string; color: string }) {
  return (
    <span className={`${color} text-pink-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm border border-white/50`}>
      {text}
    </span>
  );
}
