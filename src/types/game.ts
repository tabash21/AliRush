export enum GameState {
  Setup = "setup",
  Ready = "ready",
  Playing = "playing",
  TurnEnd = "turn_end",
  GameOver = "game_over",
}

export enum Language {
  English = "en",
  Hebrew = "he",
}

export interface GameSettings {
  groupCount: number;
  language: Language;
  roundTimer: number;
  targetPoints: number;
  lastWordForAll: boolean;
}
