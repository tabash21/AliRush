import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    alignItems: "center",
  },
  lastWordInstructions: {
    alignItems: "center",
    gap: 4,
  },
  instructionText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#e74c3c",
  },
  instructionSubText: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
  },
  undoButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "rgba(100, 100, 100, 0.2)",
    borderRadius: 20,
  },
  swipeHintText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#888",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});
