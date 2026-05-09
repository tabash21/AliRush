import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import { I18nManager, DevSettings, Platform } from "react-native";
import * as Updates from "expo-updates";
import { useCallback } from "react";

const LANGUAGE_KEY = "user-language";

export const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  const setLanguage = useCallback(async (lang: string) => {
    await i18n.changeLanguage(lang);
    await SecureStore.setItemAsync(LANGUAGE_KEY, lang);

    // Handle RTL
    const isRTL = i18n.dir() === "rtl";
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      
      // On mobile, we often need to restart the app to apply RTL changes
      if (Platform.OS !== "web") {
        if (__DEV__) {
          DevSettings.reload();
        } else {
          // In production, we use expo-updates to reload the app
          Updates.reloadAsync();
        }
      }
    }
  }, [i18n]);

  return {
    t,
    i18n,
    setLanguage,
    currentLanguage: i18n.language,
    isRTL: i18n.dir() === "rtl",
  };
};
