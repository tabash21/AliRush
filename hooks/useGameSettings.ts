import { useState } from "react";
import { GameSettings, Language } from "../types/game";

export function useGameSettings() {
  const [settings, setSettings] = useState<GameSettings>({
    groupCount: 2,
    language: Language.English,
    roundTimer: 60,
    targetPoints: 90,
  });

  return {
    settings,
    setSettings,
  };
}
