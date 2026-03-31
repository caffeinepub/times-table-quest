import { generateQuestions, tableLabel } from "@/utils/quizUtils";
import type { TableSelection } from "@/utils/quizUtils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

const TABLE_TINTS: Record<string, string> = {
  "2": "linear-gradient(180deg, oklch(0.96 0.03 17) 0%, oklch(0.93 0.05 17) 100%)",
  "3": "linear-gradient(180deg, oklch(0.96 0.03 38) 0%, oklch(0.93 0.05 38) 100%)",
  "4": "linear-gradient(180deg, oklch(0.96 0.03 72) 0%, oklch(0.94 0.05 72) 100%)",
  "5": "linear-gradient(180deg, oklch(0.96 0.03 148) 0%, oklch(0.93 0.05 148) 100%)",
  "6": "linear-gradient(180deg, oklch(0.96 0.025 192) 0%, oklch(0.93 0.04 192) 100%)",
  "7": "linear-gradient(180deg, oklch(0.96 0.025 222) 0%, oklch(0.93 0.04 222) 100%)",
  "8": "linear-gradient(180deg, oklch(0.96 0.025 285) 0%, oklch(0.93 0.04 285) 100%)",
  "9": "linear-gradient(180deg, oklch(0.96 0.03 345) 0%, oklch(0.93 0.05 345) 100%)",
  all: "linear-gradient(180deg, oklch(0.96 0.025 217) 0%, oklch(0.93 0.04 230) 100%)",
};

export default function QuizScreen({
  table,
  onFinish,
  onExit,
}: {
  table: TableSelection;
  onFinish: (score: number) => void;
  onExit: () => void;
}) {
  const questions = useMemo(() => generateQuestions(table, 20), [table]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [phase, setPhase] = useState<"asking" | "feedback">("asking");
  const [lastCorrect, setLastCorrect] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scoreRef = useRef(0);

  const currentQuestion = questions[currentIndex];
  const tintKey = table === "all" ? "all" : String(table);
  const bg = TABLE_TINTS[tintKey] ?? TABLE_TINTS.all;

  // Auto-focus when entering asking phase
  useEffect(() => {
    if (phase === "asking") {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Auto-advance after feedback
  useEffect(() => {
    if (phase !== "feedback") return;
    const timer = setTimeout(() => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= 20) {
        onFinish(scoreRef.current);
        return;
      }
      setCurrentIndex(nextIndex);
      setUserInput("");
      setPhase("asking");
    }, 1100);
    return () => clearTimeout(timer);
  }, [phase, currentIndex, onFinish]);

  const handleSubmit = () => {
    if (phase !== "asking") return;
    const trimmed = userInput.trim();
    if (!trimmed) return;
    const parsed = Number.parseInt(trimmed, 10);
    if (Number.isNaN(parsed)) return;

    const correct = parsed === currentQuestion.answer;
    setLastCorrect(correct);
    if (correct) {
      scoreRef.current++;
      setScore(scoreRef.current);
    }
    setAnswered((prev) => prev + 1);
    setPhase("feedback");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  const progress = ((currentIndex + (phase === "feedback" ? 1 : 0)) / 20) * 100;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: bg }}
      data-ocid="quiz.section"
    >
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 pt-5 pb-2">
        <button
          type="button"
          data-ocid="quiz.exit_button"
          onClick={onExit}
          className="flex items-center gap-1.5 text-sm font-semibold text-game-dark/50 hover:text-game-dark/80 transition-colors px-3 py-1.5 rounded-xl hover:bg-game-dark/8 active:bg-game-dark/12"
        >
          <span className="text-base leading-none">✕</span>
          <span>Exit</span>
        </button>
        <div className="font-display font-bold text-lg sm:text-xl text-game-dark/80">
          Table: <span className="text-game-dark">{tableLabel(table)}</span>
        </div>
        <div
          className="font-display font-bold text-lg sm:text-xl text-game-dark/80"
          data-ocid="quiz.score.section"
        >
          Score:{" "}
          <span className="text-game-dark">
            {score} / {answered}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="px-5 pb-3" data-ocid="quiz.progress.section">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-game-dark/10 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-game-dark/40 rounded-full"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm font-bold text-game-dark/60 whitespace-nowrap">
            {currentIndex + (phase === "feedback" ? 1 : 0)} / 20
          </span>
        </div>
      </div>

      {/* Main quiz area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6">
        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="text-center"
            data-ocid="quiz.question.section"
          >
            <p className="font-display font-extrabold text-6xl sm:text-7xl lg:text-8xl text-game-dark select-none">
              {currentQuestion.a} &times; {currentQuestion.b} = ?
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Input */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.input
            ref={inputRef}
            data-ocid="quiz.answer.input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userInput}
            onChange={(e) =>
              setUserInput(e.target.value.replace(/[^0-9]/g, ""))
            }
            onKeyDown={handleKeyDown}
            disabled={phase === "feedback"}
            placeholder="?"
            autoComplete="off"
            className="quiz-input"
            animate={
              phase === "feedback" && lastCorrect
                ? { scale: [1, 1.08, 1] }
                : phase === "feedback" && !lastCorrect
                  ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
                  : { scale: 1, x: 0 }
            }
            transition={{ duration: 0.45 }}
          />

          <button
            type="button"
            data-ocid="quiz.answer.submit_button"
            onClick={handleSubmit}
            disabled={phase === "feedback" || !userInput.trim()}
            className="quiz-submit-btn"
          >
            Submit &rarr;
          </button>
        </motion.div>

        {/* Feedback */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === "feedback" && (
              <motion.div
                key="feedback"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.3, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={`px-8 py-3 rounded-2xl font-display font-bold text-2xl text-white shadow-card ${
                  lastCorrect ? "bg-game-green" : "bg-destructive"
                }`}
                data-ocid={
                  lastCorrect
                    ? "quiz.feedback.success_state"
                    : "quiz.feedback.error_state"
                }
              >
                {lastCorrect
                  ? "\u2713 Correct!"
                  : `\u2717 Wrong! The answer was ${currentQuestion.answer}`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
