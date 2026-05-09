import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import * as SecureStore from "expo-secure-store";
import { I18nManager, Platform, DevSettings } from "react-native";
import * as Updates from "expo-updates";

import enCommon from "./locales/en/common.json";
import enSetup from "./locales/en/setup.json";
import enReady from "./locales/en/ready.json";
import enOver from "./locales/en/over.json";
import enModals from "./locales/en/modals.json";
import enWinner from "./locales/en/winner.json";
import enPlaying from "./locales/en/playing.json";
import enRules from "./locales/en/rules.json";

import heCommon from "./locales/he/common.json";
import heSetup from "./locales/he/setup.json";
import heReady from "./locales/he/ready.json";
import heOver from "./locales/he/over.json";
import heModals from "./locales/he/modals.json";
import heWinner from "./locales/he/winner.json";
import hePlaying from "./locales/he/playing.json";
import heRules from "./locales/he/rules.json";

const LANGUAGE_KEY = "user-language";

const resources = {
  en: {
    translation: {
      common: enCommon,
      setup: enSetup,
      ready: enReady,
      over: enOver,
      modals: enModals,
      winner: enWinner,
      playing: enPlaying,
      rules: enRules,
    },
  },
  he: {
    translation: {
      common: heCommon,
      setup: heSetup,
      ready: heReady,
      over: heOver,
      modals: heModals,
      winner: heWinner,
      playing: hePlaying,
      rules: heRules,
    },
  },
};

export const initI18n = async () => {
  let savedLanguage = await SecureStore.getItemAsync(LANGUAGE_KEY);
  
  if (!savedLanguage) {
    const locales = Localization.getLocales();
    savedLanguage = locales[0]?.languageCode || "en";
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  // Handle RTL for Hebrew if it's the selected language
  const isRTL = i18n.dir() === "rtl";
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    
    // React Native needs a reload to apply RTL changes globally.
    // If we're already initializing and find a mismatch, it means we need to restart now.
    if (Platform.OS !== "web") {
      if (__DEV__) {
        DevSettings.reload();
      } else {
        Updates.reloadAsync();
      }
    }
  }

  return i18n;
};

export default i18n;
