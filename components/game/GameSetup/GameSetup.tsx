import { ThemedText } from "@/components/common/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { GameSettings, Language } from "../../../types/game";
import { GAMESETUP_COLORS } from "./consts";
import { styles } from "./style";

interface SetupProps {
  settings: GameSettings;
  setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
  onStartGame: () => void;
}

export function GameSetup({ settings, setSettings, onStartGame }: SetupProps) {
  const updateSetting = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const primaryRed = GAMESETUP_COLORS.primaryRed;

  return (
    <View style={styles.container}>
      {/* Number of Groups */}
      <View style={styles.settingContainer}>
        <View style={styles.labelRow}>
          <Ionicons name="people" size={18} color={primaryRed} />
          <ThemedText style={styles.sectionLabel}>GROUP NUMBER</ThemedText>
        </View>
        <View style={styles.chipRow}>
          {[2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.groupChip,
                settings.groupCount === num
                  ? {
                      borderColor: primaryRed,
                      backgroundColor: "rgba(211, 84, 0, 0.15)",
                    }
                  : { backgroundColor: "rgba(255, 255, 255, 0.05)" },
              ]}
              onPress={() => updateSetting("groupCount", num)}
            >
              <ThemedText
                style={[styles.chipText, settings.groupCount === num && { color: "#fff" }]}
              >
                {num}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Round Timer */}
      <View style={styles.settingContainer}>
        <View style={styles.labelRow}>
          <Ionicons name="timer-outline" size={18} color={primaryRed} />
          <ThemedText style={styles.sectionLabel}>TIME PER ROUND</ThemedText>
        </View>
        <View style={styles.timerGrid}>
          {[
            { val: 30, label: "30s" },
            { val: 60, label: "1m" },
            { val: 90, label: "1.5m" },
            { val: 120, label: "2m" },
          ].map((time) => (
            <TouchableOpacity
              key={time.val}
              style={[
                styles.timerChip,
                settings.roundTimer === time.val
                  ? {
                      borderColor: primaryRed,
                      backgroundColor: "rgba(211, 84, 0, 0.15)",
                    }
                  : { backgroundColor: "rgba(255, 255, 255, 0.05)" },
              ]}
              onPress={() => updateSetting("roundTimer", time.val)}
            >
              <ThemedText
                style={[styles.chipText, settings.roundTimer === time.val && { color: "#fff" }]}
              >
                {time.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Language Selection */}
      <View style={styles.settingContainer}>
        <View style={styles.labelRow}>
          <Ionicons name="globe-outline" size={18} color={primaryRed} />
          <ThemedText style={styles.sectionLabel}>LANGUAGE</ThemedText>
        </View>
        <View style={styles.chipRow}>
          {[
            { id: Language.English, label: "ENG", flag: "🇬🇧" },
            { id: Language.Hebrew, label: "HEB", flag: "🇮🇱" },
          ].map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.langChip,
                settings.language === lang.id
                  ? {
                      borderColor: primaryRed,
                      backgroundColor: "rgba(211, 84, 0, 0.15)",
                    }
                  : { backgroundColor: "rgba(255, 255, 255, 0.05)" },
              ]}
              onPress={() => updateSetting("language", lang.id)}
            >
              <View style={styles.langInner}>
                <ThemedText style={styles.flagText}>{lang.flag}</ThemedText>
                <ThemedText
                  style={[styles.chipText, settings.language === lang.id && { color: "#fff" }]}
                >
                  {lang.label}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Target Points */}
      <View style={styles.settingContainer}>
        <View style={styles.labelRow}>
          <Ionicons name="trophy-outline" size={18} color={primaryRed} />
          <ThemedText style={styles.sectionLabel}>TARGET POINTS</ThemedText>
        </View>
        <View style={styles.stepperPill}>
          <TouchableOpacity
            style={styles.stepperBtn}
            onPress={() => updateSetting("targetPoints", Math.max(50, settings.targetPoints - 10))}
          >
            <Ionicons name="remove" size={24} color="#FFF" />
          </TouchableOpacity>
          <ThemedText style={styles.pointsText}>{settings.targetPoints}</ThemedText>
          <TouchableOpacity
            style={[styles.stepperBtn, { backgroundColor: "rgba(231, 76, 60, 0.1)" }]}
            onPress={() => updateSetting("targetPoints", Math.min(150, settings.targetPoints + 10))}
          >
            <Ionicons name="add" size={24} color={primaryRed} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Last Word for All Toggle */}
      <View style={styles.settingContainer}>
        <View style={styles.labelRow}>
          <Ionicons name="flash-outline" size={18} color={primaryRed} />
          <ThemedText style={styles.sectionLabel}>LAST WORD FOR ALL</ThemedText>
        </View>
        <TouchableOpacity
          style={[
            styles.togglePill,
            settings.lastWordForAll
              ? {
                  backgroundColor: "rgba(231, 76, 60, 0.15)",
                  borderColor: primaryRed,
                }
              : { backgroundColor: "rgba(255, 255, 255, 0.05)" },
          ]}
          onPress={() => updateSetting("lastWordForAll", !settings.lastWordForAll)}
        >
          <ThemedText style={[styles.chipText, settings.lastWordForAll && { color: "#fff" }]}>
            {settings.lastWordForAll ? "ACTIVE" : "INACTIVE"}
          </ThemedText>
          <Ionicons
            name={settings.lastWordForAll ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={settings.lastWordForAll ? primaryRed : "#6b829e"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.playButton, { backgroundColor: primaryRed }]}
        onPress={onStartGame}
      >
        <Ionicons name="play" size={22} color="#fff" />
        <ThemedText style={styles.playButtonText}>START GAME</ThemedText>
      </TouchableOpacity>
    </View>
  );
}
