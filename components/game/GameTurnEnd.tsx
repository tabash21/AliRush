import { ThemedText } from "@/components/themed-text";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface GameTurnEndProps {
  currentGroup: number;
  turnScore: number;
  totalGroupScore: number;
  chipBgActive: string;
  onProceedToNextGroup: () => void;
}

export function GameTurnEnd({
  currentGroup,
  turnScore,
  totalGroupScore,
  chipBgActive,
  onProceedToNextGroup,
}: GameTurnEndProps) {
  return (
    <View style={styles.centerContent}>
      <ThemedText type="title" style={{ marginBottom: 20 }}>
        Time's up!
      </ThemedText>

      <View style={styles.scoreBreakdown}>
        <ThemedText style={styles.infoText}>
          Group {currentGroup + 1} scored{" "}
          <ThemedText style={{ color: turnScore >= 0 ? "#2ecc71" : "#e74c3c", fontWeight: "bold" }}>
            {turnScore}
          </ThemedText>{" "}
          points this turn.
        </ThemedText>
        <ThemedText style={styles.totalText}>Total score: {totalGroupScore}</ThemedText>
      </View>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: chipBgActive }]}
        onPress={onProceedToNextGroup}
      >
        <ThemedText style={styles.actionButtonText}>Continue</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreBreakdown: {
    padding: 30,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 40,
  },
  infoText: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: "center",
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  actionButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
