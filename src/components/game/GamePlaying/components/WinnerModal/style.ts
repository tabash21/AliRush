import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1e1e24",
    width: "90%",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.3)",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 5,
  },
  modalSubTitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 24,
    fontWeight: "600",
  },
  winnerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    width: "100%",
  },
  winnerBtn: {
    backgroundColor: "rgba(231, 76, 60, 0.15)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    minWidth: "45%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(231, 76, 60, 0.3)",
  },
  winnerBtnText: {
    fontWeight: "800",
    color: "#e74c3c",
  },
  noWinnerBtn: {
    marginTop: 20,
    paddingVertical: 10,
  },
  noWinnerBtnText: {
    color: "#888",
    fontWeight: "700",
    letterSpacing: 1,
  },
});
