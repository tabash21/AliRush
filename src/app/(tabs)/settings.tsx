import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ThemedText } from "@/components/common/themed-text";
import { ThemedView } from "@/components/common/themed-view";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { Language } from "@/types/game";

export default function SettingsScreen() {
  const { t, i18n, setLanguage } = useAppTranslation();
  const currentLang = i18n.language;

  const languages = [
    { id: Language.English, label: "English", flag: "🇬🇧" },
    { id: Language.Hebrew, label: "עברית", flag: "🇮🇱" },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={32} color="#e74c3c" />
        <ThemedText type="title" style={styles.title}>
          {t("common.settings")}
        </ThemedText>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="language-outline" size={24} color="#e74c3c" />
          <ThemedText style={styles.sectionTitle}>{t("common.language")}</ThemedText>
        </View>

        <View style={styles.langList}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.langItem,
                currentLang === lang.id && styles.activeLangItem,
              ]}
              onPress={() => setLanguage(lang.id)}
            >
              <View style={styles.langInfo}>
                <ThemedText style={styles.flag}>{lang.flag}</ThemedText>
                <ThemedText style={[styles.langLabel, currentLang === lang.id && styles.activeLangLabel]}>
                  {lang.label}
                </ThemedText>
              </View>
              {currentLang === lang.id && (
                <Ionicons name="checkmark-circle" size={24} color="#e74c3c" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    gap: 12,
  },
  title: {
    fontSize: 28,
  },
  section: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  langList: {
    gap: 12,
  },
  langItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  activeLangItem: {
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    borderColor: "rgba(231, 76, 60, 0.3)",
    borderWidth: 1,
  },
  langInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flag: {
    fontSize: 24,
  },
  langLabel: {
    fontSize: 16,
  },
  activeLangLabel: {
    color: "#e74c3c",
    fontWeight: "bold",
  },
});
