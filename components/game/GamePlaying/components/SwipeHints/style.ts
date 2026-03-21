import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 80,
    paddingHorizontal: 40,
    zIndex: 10,
  },
  hintBox: {
    alignItems: "center",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  hintText: {
    fontSize: 10,
    fontWeight: "900",
    opacity: 0.8,
  },
});
