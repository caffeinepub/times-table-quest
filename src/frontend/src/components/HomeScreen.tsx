import type { TableSelection } from "@/utils/quizUtils";
import { motion } from "motion/react";

const TABLE_CONFIGS = [
  {
    table: 2,
    label: "2×",
    emoji: "🍎",
    bg: "linear-gradient(135deg, oklch(0.72 0.22 17), oklch(0.54 0.25 11))",
    shadow: "0 6px 0 oklch(0.38 0.22 10)",
  },
  {
    table: 3,
    label: "3×",
    emoji: "🦊",
    bg: "linear-gradient(135deg, oklch(0.72 0.20 38), oklch(0.56 0.22 32))",
    shadow: "0 6px 0 oklch(0.40 0.20 30)",
  },
  {
    table: 4,
    label: "4×",
    emoji: "✨",
    bg: "linear-gradient(135deg, oklch(0.74 0.20 72), oklch(0.60 0.22 65))",
    shadow: "0 6px 0 oklch(0.44 0.20 63)",
  },
  {
    table: 5,
    label: "5×",
    emoji: "🌿",
    bg: "linear-gradient(135deg, oklch(0.68 0.22 150), oklch(0.52 0.24 144))",
    shadow: "0 6px 0 oklch(0.38 0.22 142)",
  },
  {
    table: 6,
    label: "6×",
    emoji: "🌊",
    bg: "linear-gradient(135deg, oklch(0.64 0.16 195), oklch(0.50 0.18 188))",
    shadow: "0 6px 0 oklch(0.36 0.16 186)",
  },
  {
    table: 7,
    label: "7×",
    emoji: "💧",
    bg: "linear-gradient(135deg, oklch(0.62 0.18 225), oklch(0.48 0.20 218))",
    shadow: "0 6px 0 oklch(0.34 0.18 216)",
  },
  {
    table: 8,
    label: "8×",
    emoji: "🔮",
    bg: "linear-gradient(135deg, oklch(0.62 0.21 287), oklch(0.48 0.23 280))",
    shadow: "0 6px 0 oklch(0.34 0.21 278)",
  },
  {
    table: 9,
    label: "9×",
    emoji: "💗",
    bg: "linear-gradient(135deg, oklch(0.68 0.24 348), oklch(0.52 0.26 340))",
    shadow: "0 6px 0 oklch(0.38 0.24 338)",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const buttonVariants = {
  hidden: { scale: 0.4, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export default function HomeScreen({
  onStart,
}: {
  onStart: (table: TableSelection) => void;
}) {
  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-10"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.94 0.04 217) 0%, oklch(0.88 0.06 235) 100%)",
      }}
    >
      {/* Header */}
      <motion.header
        className="text-center mb-10"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <div className="text-6xl mb-3">&times;</div>
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-game-dark leading-tight">
          Times Table Quest
        </h1>
        <p className="mt-3 text-xl sm:text-2xl text-game-dark/70 font-medium">
          Pick a table to practice!
        </p>
      </motion.header>

      {/* Table grid */}
      <motion.main
        className="w-full max-w-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {TABLE_CONFIGS.map((cfg, idx) => (
            <motion.button
              key={cfg.table}
              data-ocid={`home.table.button.${idx + 1}`}
              onClick={() => onStart(cfg.table)}
              className="relative rounded-3xl py-6 px-4 text-white font-display font-bold
                         text-4xl flex flex-col items-center gap-1
                         focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60
                         transition-transform cursor-pointer select-none"
              style={{
                background: cfg.bg,
                boxShadow: `${cfg.shadow}, 0 8px 24px rgba(0,0,0,0.15)`,
              }}
              variants={buttonVariants}
              whileHover={{ scale: 1.07, translateY: -3 }}
              whileTap={{ scale: 0.93, translateY: 4 }}
            >
              <span className="text-3xl">{cfg.emoji}</span>
              <span>{cfg.label}</span>
            </motion.button>
          ))}
        </div>

        {/* All Tables */}
        <motion.button
          data-ocid="home.all_tables.button"
          onClick={() => onStart("all")}
          className="w-full rounded-3xl py-5 px-6 text-white font-display font-bold text-3xl
                     flex items-center justify-center gap-3
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60
                     cursor-pointer select-none"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.22 17), oklch(0.72 0.20 70), oklch(0.64 0.22 148), oklch(0.58 0.18 222), oklch(0.62 0.21 287), oklch(0.66 0.24 348))",
            boxShadow:
              "0 6px 0 oklch(0.28 0.05 240), 0 8px 24px rgba(0,0,0,0.20)",
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.65,
            type: "spring",
            stiffness: 200,
            damping: 18,
          }}
          whileHover={{ scale: 1.03, translateY: -2 }}
          whileTap={{ scale: 0.97, translateY: 4 }}
        >
          <span className="text-3xl">🌈</span> All Tables
        </motion.button>
      </motion.main>

      {/* Footer */}
      <footer className="mt-auto pt-10 text-sm text-game-dark/50 text-center">
        &copy; {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-game-dark/80 transition-colors"
        >
          Built with &#x2764;&#xfe0f; using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
