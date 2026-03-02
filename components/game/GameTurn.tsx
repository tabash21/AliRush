import { ThemedText } from "@/components/themed-text";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { GameState } from "../../types/game";

interface TurnProps {
  gameState: GameState;
  currentGroup: number;
  groupScores: number[];
  timeLeft: number;
  turnScore: number;
  currentWord: string;
  pan: Animated.ValueXY;
  panResponderHandlers: any;
  isDark: boolean;
  chipBorderColor: string;
  chipBgActive: string;
  onStartTurn: () => void;
  onProceedToNextGroup: () => void;
  onReturnToSetup: () => void;
}

export function GameTurn({
  gameState,
  currentGroup,
  groupScores,
  timeLeft,
  turnScore,
  currentWord,
  pan,
  panResponderHandlers,
  isDark,
  chipBorderColor,
  chipBgActive,
  onStartTurn,
  onProceedToNextGroup,
  onReturnToSetup,
}: TurnProps) {
  return (
    <View style={styles.gameContainer}>
      {gameState === GameState.Ready && (
        <View style={styles.centerContent}>
          <ThemedText type="title" style={{ marginBottom: 20 }}>
            Group {currentGroup + 1} Ready!
          </ThemedText>
          <ThemedText style={{ marginBottom: 40, fontSize: 18 }}>
            Current Score: {groupScores[currentGroup]}
          </ThemedText>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: chipBgActive }]}
            onPress={onStartTurn}
          >
            <ThemedText style={styles.actionButtonText}>Start Turn</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {gameState === GameState.Playing && (
        <View style={styles.centerContent}>
          <View style={styles.header}>
            <ThemedText type="subtitle">Time left: {timeLeft}s</ThemedText>
            <ThemedText type="subtitle">Points: {turnScore}</ThemedText>
          </View>
          <Animated.View
            {...panResponderHandlers}
            style={[
              styles.card,
              { backgroundColor: isDark ? "#333" : "#fff", borderColor: chipBorderColor },
              { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
            ]}
          >
            <ThemedText style={styles.cardText}>{currentWord}</ThemedText>
          </Animated.View>
          <View style={styles.swipeHints}>
            <ThemedText style={[styles.hint, { color: "#e74c3c" }]}>&lt; Left (Fail)</ThemedText>
            <ThemedText style={[styles.hint, { color: "#2ecc71" }]}>Right (Win) &gt;</ThemedText>
          </View>
        </View>
      )}

      {gameState === GameState.TurnEnd && (
        <View style={styles.centerContent}>
          <ThemedText type="title" style={{ marginBottom: 20 }}>
            Time's up!
          </ThemedText>
          <ThemedText style={{ marginBottom: 10, fontSize: 18 }}>
            Group {currentGroup + 1} scored {turnScore} points this turn.
          </ThemedText>
          <ThemedText style={{ marginBottom: 40, fontSize: 18 }}>
            Total score: {groupScores[currentGroup]}
          </ThemedText>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: chipBgActive }]}
            onPress={onProceedToNextGroup}
          >
            <ThemedText style={styles.actionButtonText}>Continue</ThemedText>
          </TouchableOpacity>
        </View>
      )}

      {gameState === GameState.GameOver && (
        <View style={styles.centerContent}>
          <ThemedText type="title" style={{ marginBottom: 20 }}>
            Game Over!
          </ThemedText>
          {groupScores.map((score, index) => (
            <ThemedText key={index} style={{ fontSize: 20, marginBottom: 10 }}>
              Group {index + 1}: {score} points
            </ThemedText>
          ))}
          <ThemedText type="subtitle" style={{ marginTop: 20, marginBottom: 40, color: "#f1c40f" }}>
            Group {groupScores.indexOf(Math.max(...groupScores)) + 1} wins!
          </ThemedText>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: chipBgActive }]}
            onPress={onReturnToSetup}
          >
            <ThemedText style={styles.actionButtonText}>Back to Setup</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 50,
  },
  card: {
    width: 300,
    height: 400,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  swipeHints: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 100,
  },
  hint: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
