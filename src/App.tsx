import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Cake, Flower } from 'lucide-react';
import confetti from 'canvas-confetti';

// Floating Emoji Component
const FloatingEmoji = ({ emoji, delay, x, duration }: { emoji: string, delay: number, x: string, duration: number }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 1, 1, 0],
      x: [x, `${parseFloat(x) + (Math.random() * 10 - 5)}%`]
    }}
    transition={{ 
      duration: duration, 
      delay: delay, 
      repeat: Infinity,
      ease: "linear"
    }}
    className="fixed text-2xl z-0 pointer-events-none"
    style={{ left: x }}
  >
    {emoji}
  </motion.div>
);

const PhotoCard = ({ url, caption, emoji, index }: { url: string, caption: string, emoji: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl border-4 border-pink-200 max-w-sm mx-auto mb-20 relative overflow-hidden group hover:scale-[1.02] transition-transform"
  >
    <div className="absolute top-2 right-2 text-3xl group-hover:rotate-12 transition-transform">
      {emoji}
    </div>
    <div className="aspect-[3/4] rounded-2xl bg-pink-50 overflow-hidden border-2 border-pink-100 mb-4">
      {/* Fallback image if user hasn't added photos yet */}
      <img 
        src={url} 
        alt="Birthday Photo" 
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop`;
        }}
      />
    </div>
    <p className="text-pink-600 font-medium text-center text-lg leading-relaxed">
      {caption}
    </p>
    <div className="flex justify-center gap-2 mt-4 text-pink-400">
      <Heart className="w-5 h-5 fill-current" />
      <Flower className="w-5 h-5" />
      <Sparkles className="w-5 h-5" />
    </div>
  </motion.div>
);

function App() {
  const emojis = ['🌸', '✨', '🦋', '🌷', '🌻', '💐', '💖', '⭐', '🎈', '👑'];
  const floatingElements = Array.from({ length: 25 }).map(() => ({
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    delay: Math.random() * 20,
    x: `${Math.random() * 100}%`,
    duration: 15 + Math.random() * 15
  }));

  const photos = [
    { 
      url: "photo1.jpg", 
      caption: "Твоя прекрасная улыбка освещает всё вокруг 💕", 
      emoji: "💖" 
    },
    { 
      url: "photo2.jpg", 
      caption: "Каждый момент, проведённый с тобой — это подарок ✨", 
      emoji: "🦋" 
    },
    { 
      url: "photo3.jpg", 
      caption: "Ты делаешь этот мир ярче и добрее одним своим присутствием 🌷", 
      emoji: "🌟" 
    }
  ];

  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffc0cb']
    });
  };

  useEffect(() => {
    handleConfetti();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff0f5] overflow-x-hidden selection:bg-pink-300 selection:text-white font-sans">
      {/* Floating Emojis Background */}
      {floatingElements.map((el, i) => (
        <FloatingEmoji key={i} {...el} />
      ))}

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-8xl mb-6 inline-block"
          >
            👑
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 mb-4 drop-shadow-sm">
            С Днём Рождения!
          </h1>
          <p className="text-2xl md:text-3xl text-pink-600 font-medium mb-8">
            Тебе уже 19! 🥳✨
          </p>
          
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-pink-400 font-light flex flex-col items-center gap-2"
          >
            <span>Листай вниз</span>
            <span className="text-2xl">↓</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          {photos.map((photo, index) => (
            <PhotoCard key={index} {...photo} index={index} />
          ))}
        </div>
      </section>

      {/* Final Message Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-lg p-10 md:p-16 rounded-[40px] shadow-2xl border-4 border-pink-100 max-w-2xl w-full text-center relative overflow-hidden"
        >
          <div className="flex justify-center gap-4 mb-8">
            <motion.span whileHover={{ scale: 1.2 }} className="text-4xl">💕</motion.span>
            <motion.span whileHover={{ scale: 1.2 }} className="text-4xl">💖</motion.span>
            <motion.span whileHover={{ scale: 1.2 }} className="text-4xl">💗</motion.span>
            <motion.span whileHover={{ scale: 1.2 }} className="text-4xl">💓</motion.span>
            <motion.span whileHover={{ scale: 1.2 }} className="text-4xl">💞</motion.span>
          </div>

          <h2 className="text-4xl font-bold text-pink-600 mb-6">
            С 19-летием, любимая!
          </h2>
          <p className="text-xl text-pink-500 mb-8 font-medium">
            Ты — моё солнышко! ☀️
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-10 text-pretty">
            В этот особенный день я хочу сказать тебе самые тёплые слова. Ты делаешь этот мир красивее просто тем, что ты есть. Пусть твои 19 лет будут наполнены счастьем, любовью и невероятными приключениями!
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { text: 'Красивая', emoji: '🌟', color: 'bg-pink-100 text-pink-600' },
              { text: 'Умная', emoji: '💝', color: 'bg-rose-100 text-rose-600' },
              { text: 'Незабываемая', emoji: '✨', color: 'bg-purple-100 text-purple-600' },
              { text: 'Единственная', emoji: '🦋', color: 'bg-pink-100 text-pink-600' },
            ].map((tag, i) => (
              <span key={i} className={`${tag.color} px-4 py-2 rounded-full font-bold flex items-center gap-2 text-sm`}>
                {tag.emoji} {tag.text}
              </span>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleConfetti}
            className="bg-gradient-to-r from-pink-100 to-rose-100 p-8 rounded-3xl cursor-pointer border-2 border-pink-200"
          >
            <Cake className="w-16 h-16 mx-auto mb-4 text-pink-500" />
            <span className="text-2xl font-black text-pink-600 block">Happy 19th Birthday!</span>
          </motion.div>

          <div className="mt-12 text-pink-400 font-medium">
            С любовью 💕
            <div className="flex justify-center gap-2 mt-2">
               🌸 💐 🌻 🌷 🌹 🌺
            </div>
          </div>
        </motion.div>
      </section>

      {/* Music Control Hint (Decorative) */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-pink-500 text-white p-4 rounded-full shadow-lg"
          onClick={handleConfetti}
        >
          <Sparkles className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}

export default App;
