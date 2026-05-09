import { ThemedText } from "@/components/common/themed-text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useGameContext } from "../../../context/GameContext";
import { styles } from "./style";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function GameReady() {
  const { currentGroup, groupScores, settings, onStartTurn } = useGameContext();
  const { t } = useAppTranslation();
  const targetPoints = settings.targetPoints;
  
  return (
    <View style={styles.centerContent}>
      <View style={styles.scoreboardCard}>
        <View style={styles.scoreboardHeader}>
          <ThemedText style={styles.scoreboardLabel}>{t("ready.scoreboard")}</ThemedText>
        </View>

        <ScrollView style={styles.scoreboardContent} nestedScrollEnabled={true}>
          {groupScores.map((score, index) => {
            const isActive = index === currentGroup;
            const progressPercentage = Math.min((score / targetPoints) * 100, 100);

            return (
              <View key={index} style={styles.teamRow}>
                <View style={styles.teamRowHeader}>
                  <ThemedText style={[styles.teamNameText, isActive && styles.activeTeamText]}>
                    {t("ready.team", { number: index + 1 })}
                  </ThemedText>
                  <ThemedText style={[styles.teamScoreText, isActive && styles.activeScoreText]}>
                    {score}/{targetPoints}
                  </ThemedText>
                </View>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      isActive && styles.activeProgressBarFill,
                      { width: `${progressPercentage}%` },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.headerContainer}>
        <ThemedText style={styles.teamTitle}>{t("ready.team_turn", { number: currentGroup + 1 })}</ThemedText>
        <ThemedText style={styles.mainTitle}>{t("ready.get_ready")}</ThemedText>
      </View>

      <View style={styles.middleActionContainer}>
        <View style={styles.pulseGlow}>
          <TouchableOpacity
            style={styles.actionCircleButton}
            onPress={onStartTurn}
            activeOpacity={0.8}
          >
            <View style={styles.actionInnerCircle}>
              <MaterialCommunityIcons name="gesture-tap" size={56} color="#fff" />
              <ThemedText style={styles.actionButtonText}>{t("ready.tap_to_start")}</ThemedText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
