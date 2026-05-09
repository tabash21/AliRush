import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#e74c3c",
    letterSpacing: -0.5,
  },
  subTitle: {
    fontSize: 16,
    color: "#888",
    marginTop: 4,
    fontWeight: "600",
  },
  pointsCard: {
    backgroundColor: "#1e1e24",
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  pointsLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#888",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 56,
    fontWeight: "900",
    height: 45,
    textAlign: "center",
    textAlignVertical: "center",
  },
  listsContainer: {
    flex: 1,
  },
  listSection: {
    marginBottom: 24,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  wordCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 8,
  },
  wordInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  lastWordWinnerStatusInfo: {
    marginTop: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  winnerInfoPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  winnerInfoText: {
    fontWeight: "900",
    color: "#FFD700",
    fontSize: 14,
  },
  noWinnerInfoText: {
    color: "#888",
    fontWeight: "700",
    fontSize: 14,
  },
  groupPickBtn: {
    flex: 1,
    minWidth: "45%",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(100, 100, 100, 0.2)",
    alignItems: "center",
  },
  groupPickBtnActive: {
    backgroundColor: "#FFD700",
    borderColor: "#FFD700",
  },
  groupPickText: {
    fontWeight: "800",
    fontSize: 12,
    color: "#888",
  },
  groupPickTextActive: {
    color: "#000",
  },
  correctWordCard: {
    backgroundColor: "rgba(46, 204, 113, 0.15)",
  },
  failedWordCard: {
    backgroundColor: "rgba(231, 76, 60, 0.15)",
  },
  wordText: {
    fontSize: 16,
    fontWeight: "700",
  },
  correctWordText: {
    color: "#2ecc71",
  },
  failedWordText: {
    color: "#e74c3c",
  },
  nextButton: {
    flexDirection: "row",
    backgroundColor: "#e74c3c",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 8,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
