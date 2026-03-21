import { ThemedText } from "@/components/common/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity, View, useColorScheme } from "react-native";

import { useGameContext } from "../../../context/GameContext";
import { GAMEOVER_COLORS } from "./consts";
import { styles } from "./style";
import { getRankedScores } from "./utils";

export function GameOver() {
  const { groupScores, onReturnToSetup } = useGameContext();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const { rankedScores, topScore, winners, isDraw } = getRankedScores(groupScores);

  const cardBg = isDark ? "#2A2A2A" : "#FFFFFF";
  const rowBgSecondary = isDark ? "rgba(255, 255, 255, 0.05)" : "#F5F5F7";
  const winnerColor = GAMEOVER_COLORS.winner;
  const primaryRed = GAMEOVER_COLORS.primaryRed;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[styles.trophyContainer, { backgroundColor: isDark ? "#443C22" : "#FFF4E0" }]}>
          <Ionicons name="trophy" size={50} color={winnerColor} />
        </View>
        <ThemedText style={styles.gameOverText}>GAME OVER</ThemedText>
        <View style={styles.winnerNameContainer}>
          <ThemedText style={[styles.winnerName, { color: winnerColor }]}>
            {isDraw ? "ITS A DRAW!" : winners[0].name.toUpperCase()}
          </ThemedText>
          {!isDraw && <ThemedText style={styles.winsText}>WINS!</ThemedText>}
        </View>
      </View>

      {/* Scoreboard Card */}
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <ThemedText style={styles.cardTitle}>Final Scoreboard</ThemedText>
        <View style={[styles.divider, { backgroundColor: isDark ? "#444" : "#EEE" }]} />

        <ScrollView style={styles.scoreboardContent} nestedScrollEnabled={true}>
          {rankedScores.map((item, index) => {
            const isWinner = item.score === topScore;
            return (
              <View
                key={item.index}
                style={[
                  styles.scoreRow,
                  isWinner
                    ? { backgroundColor: primaryRed, shadowColor: primaryRed }
                    : { backgroundColor: rowBgSecondary },
                ]}
              >
                <View style={styles.rowLeft}>
                  <ThemedText style={[styles.rank, isWinner && styles.whiteText]}>
                    {index + 1}.
                  </ThemedText>
                  <ThemedText style={[styles.groupName, isWinner && styles.whiteText]}>
                    {item.name}
                  </ThemedText>
                </View>
                <View style={styles.rowRight}>
                  <ThemedText style={[styles.scoreValue, isWinner && styles.whiteText]}>
                    {item.score}
                  </ThemedText>
                  <ThemedText style={[styles.ptsLabel, isWinner && styles.whiteText]}>
                    PTS
                  </ThemedText>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Action Button */}
      <TouchableOpacity
        style={[styles.playAgainButton, { backgroundColor: primaryRed }]}
        onPress={onReturnToSetup}
      >
        <Ionicons name="refresh-outline" size={24} color="#FFF" style={{ marginRight: 10 }} />
        <ThemedText style={styles.playAgainText}>PLAY AGAIN</ThemedText>
      </TouchableOpacity>
    </View>
  );
}
