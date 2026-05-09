import { ThemedText } from "@/components/common/themed-text";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { useGameContext } from "../../../context/GameContext";
import { useTurnContext } from "../../../context/TurnContext";
import { styles } from "./style";
import { getTurnSummary } from "./utils";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function GameTurnEnd() {
  const {
    settings,
    currentGroup,
    currentWordIndex,
    currentWords,
    onProceedToNextGroup,
    lastWordWinner,
  } = useGameContext();
  const { turnScore, swipeHistory, toggleSwipe, isLastWordMode } = useTurnContext();
  const { t } = useAppTranslation();

  const { correctWords, failedWords } = getTurnSummary(
    currentWordIndex,
    swipeHistory,
    currentWords,
    isLastWordMode,
  );

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <ThemedText style={styles.mainTitle}>{t("playing.round_over")}</ThemedText>
        <ThemedText style={styles.subTitle}>
          {t("ready.team_turn", { number: currentGroup + 1 })}
        </ThemedText>
      </View>

      {/* Points Earned Card */}
      <View style={styles.pointsCard}>
        <ThemedText style={styles.pointsLabel}>{t("playing.points_earned")}</ThemedText>
        <ThemedText style={[styles.pointsValue, { color: turnScore >= 0 ? "#2ecc71" : "#e74c3c" }]}>
          {turnScore > 0 ? `+${turnScore}` : turnScore}
        </ThemedText>
      </View>

      <ScrollView style={styles.listsContainer} showsVerticalScrollIndicator={false}>
        {/* Last Word Section */}
        {settings.lastWordForAll &&
          isLastWordMode &&
          swipeHistory[swipeHistory.length - 1] === "right" && (
            <View style={styles.listSection}>
              <View style={styles.listHeader}>
                <MaterialCommunityIcons name="trophy-variant" size={20} color="#FFD700" />
                <ThemedText style={styles.listTitle}>{t("playing.last_word_winner_title")}</ThemedText>
              </View>
              <View style={styles.lastWordWinnerStatusInfo}>
                {lastWordWinner !== null ? (
                  <View style={styles.winnerInfoPill}>
                    <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
                    <ThemedText style={styles.winnerInfoText}>
                      {t("playing.team_earned_point", { number: lastWordWinner + 1 })}
                    </ThemedText>
                  </View>
                ) : (
                  <ThemedText style={styles.noWinnerInfoText}>{t("playing.no_team_guessed")}</ThemedText>
                )}
              </View>
            </View>
          )}
        {/* Correct Words */}
        {correctWords.length > 0 && (
          <View style={styles.listSection}>
            <View style={styles.listHeader}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#2ecc71" />
              <ThemedText style={styles.listTitle}>
                {t("playing.guessed_correctly", { count: correctWords.length })}
              </ThemedText>
            </View>
            {correctWords.map((entry) => (
              <View key={entry.originalIndex} style={[styles.wordCard, styles.correctWordCard]}>
                <View style={styles.wordInfo}>
                  <MaterialCommunityIcons name="check" size={16} color="#2ecc71" />
                  <ThemedText style={[styles.wordText, styles.correctWordText]}>
                    {entry.word}
                  </ThemedText>
                </View>
                <TouchableOpacity
                  onPress={() => toggleSwipe(entry.originalIndex)}
                  style={styles.toggleButton}
                  activeOpacity={0.6}
                >
                  <MaterialCommunityIcons name="swap-horizontal" size={20} color="#888" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Failed Words */}
        {failedWords.length > 0 && (
          <View style={styles.listSection}>
            <View style={styles.listHeader}>
              <MaterialCommunityIcons name="close-circle" size={20} color="#e74c3c" />
              <ThemedText style={styles.listTitle}>
                {t("playing.failed_words", { count: failedWords.length })}
              </ThemedText>
            </View>
            {failedWords.map((entry) => (
              <View key={entry.originalIndex} style={[styles.wordCard, styles.failedWordCard]}>
                <View style={styles.wordInfo}>
                  <MaterialCommunityIcons name="close" size={16} color="#e74c3c" />
                  <ThemedText style={[styles.wordText, styles.failedWordText]}>
                    {entry.word}
                  </ThemedText>
                </View>
                <TouchableOpacity
                  onPress={() => toggleSwipe(entry.originalIndex)}
                  style={styles.toggleButton}
                  activeOpacity={0.6}
                >
                  <MaterialCommunityIcons name="swap-horizontal" size={20} color="#888" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Footer Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={onProceedToNextGroup}
        activeOpacity={0.8}
      >
        <ThemedText style={styles.nextButtonText}>{t("playing.next_team_turn")}</ThemedText>
        <MaterialIcons name="arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
