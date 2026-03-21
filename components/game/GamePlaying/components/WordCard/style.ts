import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "75%",
    aspectRatio: 3 / 4,
    borderWidth: 4,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 8,
  },
  cardTextContainer: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  cardText: {
    fontSize: 35,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1,
    height: 50,
    width: "100%",
  },
  lastWordBadge: {
    position: "absolute",
    top: -15,
    backgroundColor: "#FFD700",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  lastWordBadgeText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 12,
  },
});
