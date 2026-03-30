import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EmojiData {
  id: number;
  char: string;
  x: number;
  y: number;
  delay: number;
}

const PhotoCard = ({ url, caption, emoji, tags = [] }: { url: string; caption: string; emoji: string; tags?: string[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl p-6 shadow-xl border-4 border-pink-200 max-w-sm w-full mx-auto my-12"
    >
      <div className="aspect-[4/5] bg-pink-50 rounded-2xl mb-4 overflow-hidden border-2 border-pink-100 relative group">
        <img
          src={url}
          alt="Moment"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400"; // Fallback image
          }}
        />
        <div className="absolute top-2 right-2 text-2xl">{emoji}</div>
      </div>
      <div className="text-center">
        <p className="text-[#D147A3] font-medium text-lg leading-relaxed mb-4">
          {caption}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-pink-50 text-pink-500 rounded-full text-sm font-semibold border border-pink-100">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [emojis, setEmojis] = useState<EmojiData[]>([]);

  useEffect(() => {
    const emojiList = ['🌸', '🌷', '🦋', '✨', '💖', '🌻', '🌺'];
    const newEmojis = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      char: emojiList[Math.floor(Math.random() * emojiList.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 20,
    }));
    setEmojis(newEmojis);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF0F5] font-sans selection:bg-pink-200 selection:text-pink-600 relative overflow-x-hidden">
      {/* Background Floating Elements */}
      {emojis.map((e) => (
        <div
          key={e.id}
          className="fixed pointer-events-none text-2xl"
          style={{ left: `${e.x}%`, top: `${e.y}%`, opacity: 0.4 }}
        >
          <motion.div
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: e.delay,
            }}
          >
            {e.char}
          </motion.div>
        </div>
      ))}

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-7xl mb-6"
        >
          👑
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-[#E91E63] mb-4 drop-shadow-sm"
        >
          С Днём Рождения!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl md:text-3xl text-pink-600 font-medium flex items-center gap-2"
        >
          Тебе уже 19! <span className="text-3xl">🎉</span>
        </motion.p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-20 text-pink-400 text-lg flex flex-col items-center gap-2"
        >
          Листай вниз
          <span className="text-2xl">↓</span>
        </motion.div>
      </section>

      {/* Photos Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <PhotoCard
          url="/photo1.jpg"
          caption="Твоя прекрасная улыбка освещает всё вокруг 💕"
          emoji="🌸"
          tags={['#нежная', '#любимая']}
        />
        <PhotoCard
          url="/photo2.jpg"
          caption="Каждый момент с тобой наполнен волшебством и радостью ✨"
          emoji="💖"
          tags={['#счастье', '#вместе']}
        />
        <PhotoCard
          url="/photo3.jpg"
          caption="Твои глаза сияют ярче всех звёзд на этом небе ⭐"
          emoji="🦋"
          tags={['#сияй', '#лучшая']}
        />
      </section>

      {/* Final Message Card */}
      <section className="max-w-2xl mx-auto px-4 pb-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2rem] p-10 shadow-2xl border-4 border-pink-200 text-center"
        >
          <div className="flex justify-center gap-2 mb-6">
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-3xl">💕</motion.span>
            <motion.span animate={{ rotate: [0, -15, 15, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="text-3xl">💝</motion.span>
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="text-3xl">💗</motion.span>
          </div>

          <h2 className="text-4xl font-bold text-[#D147A3] mb-6">
            С 19-летием, любимая!
          </h2>
          <p className="text-xl text-pink-600 mb-8 font-medium">
            Ты — моё солнышко! ☀️
          </p>

          <p className="text-gray-600 leading-relaxed mb-10 text-lg italic">
            "В этот особенный день я хочу сказать тебе самые тёплые слова. Ты делаешь этот мир красивее просто тем, что ты есть. Пусть твои 19 лет будут наполнены счастьем, любовью и невероятными приключениями!"
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { text: '🌟 Красивая', color: 'bg-yellow-50' },
              { text: '❤️ Умная', color: 'bg-red-50' },
              { text: '✨ Незабываемая', color: 'bg-purple-50' },
              { text: '🦋 Единственная', color: 'bg-pink-50' },
              { text: '🌹 Нежная', color: 'bg-orange-50' },
              { text: '🌈 Яркая', color: 'bg-blue-50' },
            ].map((tag, i) => (
              <div key={i} className={`${tag.color} p-3 rounded-2xl text-gray-700 font-semibold text-sm shadow-sm`}>
                {tag.text}
              </div>
            ))}
          </div>

          <div className="bg-pink-100 rounded-3xl p-8 border-2 border-pink-200 relative overflow-hidden">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-6xl mb-4 relative z-10"
            >
              🎂
            </motion.div>
            <p className="text-2xl font-bold text-pink-600 relative z-10">Happy 19th Birthday!</p>
          </div>

          <div className="mt-12 text-pink-500 font-medium">
            С любовью 💕
            <div className="flex justify-center gap-2 mt-4 opacity-70">
              🌸 🌺 🌻 🌷 🌹
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer text */}
      <footer className="py-10 text-center text-pink-300 text-sm italic relative z-10">
        Создано с любовью специально для тебя ✨
      </footer>
    </div>
  );
}
