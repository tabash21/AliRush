import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
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
        <ThemedText type="title">Offline Alias</ThemedText>
      </ThemedView>

      <ThemedView style={styles.settingContainer}>
        <ThemedText type="subtitle">Groups</ThemedText>
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
              <ThemedText style={settings.groupCount === num ? styles.chipTextSelected : {}}>
                {num}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.settingContainer}>
        <ThemedText type="subtitle">Language</ThemedText>
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
              <ThemedText style={settings.language === lang.id ? styles.chipTextSelected : {}}>
                {lang.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.settingContainer}>
        <ThemedText type="subtitle">Round Timer</ThemedText>
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
              <ThemedText style={settings.roundTimer === time.val ? styles.chipTextSelected : {}}>
                {time.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.settingContainer}>
        <ThemedText type="subtitle">Target Points</ThemedText>
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
  chipRow: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
