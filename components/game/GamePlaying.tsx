import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

interface GamePlayingProps {
  timeLeft: number;
  turnScore: number;
  currentWord: string;
  pan: Animated.ValueXY;
  panResponderHandlers: any;
  isDark: boolean;
  chipBorderColor: string;
  onUndo: () => void;
  canUndo: boolean;
}

export function GamePlaying({
  timeLeft,
  turnScore,
  currentWord,
  pan,
  panResponderHandlers,
  isDark,
  chipBorderColor,
  onUndo,
  canUndo,
}: GamePlayingProps) {
  // Interpolate side swipe to create dynamic border colors indicating the action
  const dynamicBorderColor = pan.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["rgba(231, 76, 60, 1)", chipBorderColor, "rgba(46, 204, 113, 1)"],
    extrapolate: "clamp",
  });

  const dynamicShadowOpacity = pan.x.interpolate({
    inputRange: [-100, -50, 0, 50, 100],
    outputRange: [0.8, 0.4, 0.1, 0.4, 0.8],
    extrapolate: "clamp",
  });

  const dynamicShadowColor = pan.x.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["#e74c3c", "#000", "#2ecc71"],
  });

  return (
    <View style={styles.centerContent}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Time left: {timeLeft}s</ThemedText>
        <ThemedText type="subtitle">Points: {turnScore}</ThemedText>
      </View>

      <Animated.View
        {...panResponderHandlers}
        style={[
          styles.card,
          {
            backgroundColor: isDark ? "#222" : "#fdfdfd",
            borderColor: dynamicBorderColor,
            shadowOpacity: dynamicShadowOpacity,
            shadowColor: dynamicShadowColor as any,
          },
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
        ]}
      >
        <ThemeTextContainer word={currentWord} />
      </Animated.View>

      <View style={styles.swipeHints}>
        <View style={styles.hintBox}>
          <ThemedText style={[styles.hint, { color: "#e74c3c" }]}>&lt;&lt; Left</ThemedText>
          <ThemedText style={[styles.hintSub, { color: "#e74c3c" }]}>Fail/Skip</ThemedText>
        </View>
        <View style={[styles.hintBox, { alignItems: "flex-end" }]}>
          <ThemedText style={[styles.hint, { color: "#2ecc71" }]}>Right &gt;&gt;</ThemedText>
          <ThemedText style={[styles.hintSub, { color: "#2ecc71" }]}>Win Points</ThemedText>
        </View>
      </View>

      <View style={styles.undoContainer}>
        {canUndo && (
          <TouchableOpacity onPress={onUndo} style={styles.undoButton}>
            <IconSymbol size={24} name="arrow.uturn.backward" color={isDark ? "#fff" : "#000"} />
            <ThemedText style={{ marginLeft: 8, fontWeight: "600" }}>Undo Swipe</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Inner view for properly padding and wrapping the text inside the card avoiding Animated interference
function ThemeTextContainer({ word }: { word: string }) {
  return (
    <View style={styles.cardTextContainer}>
      <ThemedText style={styles.cardText} adjustsFontSizeToFit numberOfLines={2}>
        {word}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 50,
    paddingHorizontal: 20,
    zIndex: 10,
  },
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
    paddingVertical: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  cardText: {
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 1,
  },
  swipeHints: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 120,
    paddingHorizontal: 30,
    zIndex: 10,
  },
  hintBox: {
    alignItems: "flex-start",
  },
  hint: {
    fontSize: 18,
    fontWeight: "800",
  },
  hintSub: {
    fontSize: 12,
    fontWeight: "600",
    opacity: 0.8,
  },
  undoContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  undoButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "rgba(100, 100, 100, 0.2)",
    borderRadius: 20,
  },
});
