import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ScoreEntry {
    score: bigint;
    tables: Array<bigint>;
    timestamp: bigint;
    playerName: string;
    questions: bigint;
}
export interface backendInterface {
    getLeaderboard(): Promise<Array<ScoreEntry>>;
    getScoresByPlayer(playerName: string): Promise<Array<ScoreEntry>>;
    getTotalGames(): Promise<bigint>;
    saveScore(playerName: string, score: bigint, questions: bigint, tables: Array<bigint>): Promise<void>;
}
