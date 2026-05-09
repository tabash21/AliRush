import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    paddingHorizontal: 30,
    zIndex: 10,
  },
  headerBlock: {
    alignItems: "flex-start",
  },
  headerLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#888",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  headerValRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerVal: {
    fontSize: 26,
    fontWeight: "900",
  },
});
