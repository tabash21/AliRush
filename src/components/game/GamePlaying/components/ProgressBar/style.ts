import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(0,0,0,0.05)",
    zIndex: 20,
  },
  fill: {
    height: "100%",
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: "#e74c3c",
  },
});
