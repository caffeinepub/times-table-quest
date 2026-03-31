import HomeScreen from "@/components/HomeScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultsScreen from "@/components/ResultsScreen";
import type { TableSelection } from "@/utils/quizUtils";
import { useState } from "react";

export default function App() {
  const [screen, setScreen] = useState<"home" | "quiz" | "results">("home");
  const [table, setTable] = useState<TableSelection>(2);
  const [score, setScore] = useState(0);

  const startQuiz = (t: TableSelection) => {
    setTable(t);
    setScreen("quiz");
  };

  return (
    <div className="min-h-screen font-body">
      {screen === "home" && <HomeScreen onStart={startQuiz} />}
      {screen === "quiz" && (
        <QuizScreen
          table={table}
          onFinish={(s) => {
            setScore(s);
            setScreen("results");
          }}
          onExit={() => setScreen("home")}
        />
      )}
      {screen === "results" && (
        <ResultsScreen
          score={score}
          total={20}
          table={table}
          onPlayAgain={() => setScreen("quiz")}
          onHome={() => setScreen("home")}
        />
      )}
    </div>
  );
}
