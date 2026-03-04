import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { GameSettings, Language } from "../../types/game";

interface SetupProps {
  settings: GameSettings;
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  onStartGame: () => void;
  chipBorderColor: string;
  chipBgActive: string;
  stepperBg: string;
}

export function GameSetup({
  settings,
  setSettings,
  onStartGame,
  chipBorderColor,
  chipBgActive,
  stepperBg,
}: SetupProps) {
  const updateSetting = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Game Settings</ThemedText>
      </ThemedView>

      <ThemedView style={styles.settingContainer}>
        <ThemedText style={styles.sectionLabel}>GROUPS</ThemedText>
        <ThemedView style={styles.chipRow}>
          {[2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.chip,
                { borderColor: chipBorderColor },
                settings.groupCount === num && {
                  backgroundColor: chipBgActive,
                  borderColor: chipBgActive,
                },
              ]}
              onPress={() => updateSetting("groupCount", num)}
            >
              <ThemedText
                style={[styles.chipText, settings.groupCount === num && styles.chipTextSelected]}
              >
                {num}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.settingContainer}>
        <ThemedText style={styles.sectionLabel}>LANGUAGE</ThemedText>
        <ThemedView style={styles.chipRow}>
          {[
            { id: Language.English, label: "🇬🇧 ENG" },
            { id: Language.Hebrew, label: "🇮🇱 HEB" },
          ].map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.chip,
                { borderColor: chipBorderColor },
                settings.language === lang.id && {
                  backgroundColor: chipBgActive,
                  borderColor: chipBgActive,
                },
              ]}
              onPress={() => updateSetting("language", lang.id)}
            >
              <ThemedText
                style={[styles.chipText, settings.language === lang.id && styles.chipTextSelected]}
              >
                {lang.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.settingContainer}>
        <ThemedText style={styles.sectionLabel}>ROUND TIMER</ThemedText>
        <ThemedView style={styles.chipRow}>
          {[
            { val: 30, label: "30s" },
            { val: 60, label: "1m" },
            { val: 90, label: "1.5m" },
            { val: 120, label: "2m" },
          ].map((time) => (
            <TouchableOpacity
              key={time.val}
              style={[
                styles.chip,
                { borderColor: chipBorderColor },
                settings.roundTimer === time.val && {
                  backgroundColor: chipBgActive,
                  borderColor: chipBgActive,
                },
              ]}
              onPress={() => updateSetting("roundTimer", time.val)}
            >
              <ThemedText
                style={[
                  styles.chipText,
                  settings.roundTimer === time.val && styles.chipTextSelected,
                ]}
              >
                {time.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.settingContainer}>
        <ThemedText style={styles.sectionLabel}>TARGET POINTS</ThemedText>
        <ThemedView style={styles.stepperContainer}>
          <TouchableOpacity
            style={[styles.stepperButton, { backgroundColor: stepperBg }]}
            onPress={() => updateSetting("targetPoints", Math.max(50, settings.targetPoints - 10))}
          >
            <ThemedText type="subtitle">-</ThemedText>
          </TouchableOpacity>
          <ThemedText type="title">{settings.targetPoints}</ThemedText>
          <TouchableOpacity
            style={[styles.stepperButton, { backgroundColor: stepperBg }]}
            onPress={() => updateSetting("targetPoints", Math.min(150, settings.targetPoints + 10))}
          >
            <ThemedText type="subtitle">+</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <TouchableOpacity
        style={[styles.playButton, { backgroundColor: chipBgActive }]}
        onPress={onStartGame}
      >
        <MaterialIcons name="play-arrow" size={28} color="#fff" />
        <ThemedText style={styles.playButtonText}>Start Game</ThemedText>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  settingContainer: {
    gap: 12,
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6b829e",
    letterSpacing: 1,
    marginBottom: 4,
  },
  chipRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  chip: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  chipTextSelected: {
    color: "#fff",
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginTop: 8,
  },
  stepperButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
