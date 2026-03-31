import { calcStars, tableLabel } from "@/utils/quizUtils";
import type { TableSelection } from "@/utils/quizUtils";
import { motion } from "motion/react";

const STAR_MESSAGES = [
  "Keep practicing — you'll get there! 💪",
  "Good effort! Practice makes perfect! 😊",
  "Great job! You're getting the hang of it! 🌟",
  "Amazing! You're a times table star! 🏆",
];

const CONFETTI_COLORS = [
  "oklch(0.72 0.22 17)",
  "oklch(0.72 0.20 38)",
  "oklch(0.74 0.20 72)",
  "oklch(0.68 0.22 150)",
  "oklch(0.62 0.18 225)",
  "oklch(0.62 0.21 287)",
  "oklch(0.68 0.24 348)",
];

function Confetti({ count = 40 }: { count?: number }) {
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    delay: `${Math.random() * 2}s`,
    duration: `${2.5 + Math.random() * 2}s`,
    size: `${6 + Math.random() * 8}px`,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece rounded-sm"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function ResultsScreen({
  score,
  total,
  table,
  onPlayAgain,
  onHome,
}: {
  score: number;
  total: number;
  table: TableSelection;
  onPlayAgain: () => void;
  onHome: () => void;
}) {
  const stars = calcStars(score, total);
  const accuracy = Math.round((score / total) * 100);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.94 0.04 217) 0%, oklch(0.88 0.06 235) 100%)",
      }}
      data-ocid="results.section"
    >
      {stars === 3 && <Confetti count={50} />}

      <motion.div
        className="flex flex-col items-center gap-6 w-full max-w-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Heading */}
        <div className="text-center">
          <motion.h1
            className="font-display font-extrabold text-5xl sm:text-6xl text-game-dark"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.1,
            }}
          >
            Quiz Complete!
          </motion.h1>
          <p className="mt-2 text-lg text-game-dark/60 font-medium">
            {tableLabel(table)}
          </p>
        </div>

        {/* Score card */}
        <motion.div
          className="bg-white/80 backdrop-blur rounded-3xl px-10 py-6 text-center shadow-card w-full"
          data-ocid="results.score.section"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.25,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <p className="font-display font-extrabold text-7xl text-game-dark">
            {score}
            <span className="text-4xl text-game-dark/40"> / {total}</span>
          </p>
          <p className="mt-1 text-2xl font-bold text-game-dark/60">
            {accuracy}% accuracy
          </p>
        </motion.div>

        {/* Stars */}
        <div
          className="flex items-center gap-3"
          data-ocid="results.stars.section"
          aria-label={`${stars} out of 3 stars`}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="text-5xl sm:text-6xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: i < stars ? 1 : 0.7,
                opacity: i < stars ? 1 : 0.25,
              }}
              transition={{
                delay: 0.45 + i * 0.18,
                type: "spring",
                stiffness: 350,
                damping: 16,
              }}
            >
              ⭐
            </motion.span>
          ))}
        </div>

        {/* Message */}
        <motion.p
          className="text-lg font-medium text-game-dark/70 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {STAR_MESSAGES[stars]}
        </motion.p>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 }}
        >
          <button
            type="button"
            data-ocid="results.play_again.primary_button"
            onClick={onPlayAgain}
            className="flex-1 rounded-2xl py-4 px-5 font-display font-bold text-xl text-white
                       transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.22 150), oklch(0.52 0.24 144))",
              boxShadow:
                "0 5px 0 oklch(0.38 0.22 142), 0 6px 16px rgba(0,0,0,0.15)",
            }}
          >
            ↺ Play Again
          </button>
          <button
            type="button"
            data-ocid="results.home.secondary_button"
            onClick={onHome}
            className="flex-1 rounded-2xl py-4 px-5 font-display font-bold text-xl text-white
                       transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.18 225), oklch(0.48 0.20 218))",
              boxShadow:
                "0 5px 0 oklch(0.34 0.18 216), 0 6px 16px rgba(0,0,0,0.15)",
            }}
          >
            🏠 Choose Table
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
