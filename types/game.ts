export enum GameState {
  Setup = "setup",
  Ready = "ready",
  Playing = "playing",
  TurnEnd = "turn_end",
  GameOver = "game_over",
}

export enum Language {
  English = "eng",
  Hebrew = "heb",
}

export interface GameSettings {
  groupCount: number;
  language: Language;
  roundTimer: number;
  targetPoints: number;
}
