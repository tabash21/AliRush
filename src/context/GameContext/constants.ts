import * as Localization from "expo-localization";
import { GameSettings, Language } from "../../types/game";

export const getInitialLanguage = (): Language => {
  const deviceLanguageCode = Localization.getLocales()[0]?.languageCode;

  // Type-safe check without 'as'
  const isLanguage = (code: string | null | undefined): code is Language => {
    if (!code) return false;
    return Object.values(Language).some((lang) => lang === code);
  };

  return isLanguage(deviceLanguageCode) ? deviceLanguageCode : Language.English;
};

export const DEFAULT_GAME_SETTINGS: GameSettings = {
  get language() {
    return getInitialLanguage();
  },
  groupCount: 2,
  roundTimer: 60,
  targetPoints: 90,
  lastWordForAll: true,
};
