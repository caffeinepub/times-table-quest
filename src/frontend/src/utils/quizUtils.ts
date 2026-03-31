export type TableSelection = number | "all";

export interface Question {
  a: number; // factor 1–9
  b: number; // table 2–9
  answer: number; // a * b
}

export function generateQuestions(
  table: TableSelection,
  total = 20,
): Question[] {
  return Array.from({ length: total }, () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b =
      table === "all" ? Math.floor(Math.random() * 8) + 2 : (table as number);
    return { a, b, answer: a * b };
  });
}

export function calcStars(score: number, total: number): number {
  const pct = score / total;
  if (pct >= 0.9) return 3;
  if (pct >= 0.75) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}

export function tableLabel(table: TableSelection): string {
  return table === "all" ? "All Tables" : `${table}\u00d7`;
}
