import { ThemedText } from "@/components/themed-text";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface GameReadyProps {
  currentGroup: number;
  groupScores: number[];
  targetPoints: number;
  chipBgActive: string;
  onStartTurn: () => void;
}

export function GameReady({
  currentGroup,
  groupScores,
  targetPoints,
  chipBgActive,
  onStartTurn,
}: GameReadyProps) {
  return (
    <View style={styles.centerContent}>
      <ThemedText type="title" style={{ marginBottom: 20 }}>
        Group {currentGroup + 1} Ready!
      </ThemedText>

      <View style={styles.scoresContainer}>
        <ThemedText style={styles.targetText}>Target: {targetPoints} pts</ThemedText>
        {groupScores.map((score, index) => (
          <ThemedText
            key={index}
            style={[styles.scoreText, index === currentGroup && styles.activeGroupText]}
          >
            Group {index + 1}: {score}
          </ThemedText>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: chipBgActive }]}
        onPress={onStartTurn}
      >
        <ThemedText style={styles.actionButtonText}>Start Turn</ThemedText>
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
  scoresContainer: {
    marginBottom: 40,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 20,
    borderRadius: 15,
    minWidth: 200,
  },
  targetText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#f39c12",
  },
  scoreText: {
    fontSize: 18,
    marginVertical: 4,
    opacity: 0.7,
  },
  activeGroupText: {
    fontWeight: "bold",
    opacity: 1,
    color: "#2ecc71",
  },
  actionButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
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
