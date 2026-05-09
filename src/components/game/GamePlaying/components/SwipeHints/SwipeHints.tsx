import { ThemedText } from "@/components/common/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, View } from "react-native";
import { useTurnContext } from "@/context/TurnContext";
import { styles } from "./style";

export function SwipeHints() {
  const { pan } = useTurnContext();

  // Scale and opacity for hints to show they react to swiping
  const leftHintScale = pan.x.interpolate({
    inputRange: [-150, -50, 0],
    outputRange: [1.3, 1.1, 1],
    extrapolate: "clamp",
  });

  const rightHintScale = pan.x.interpolate({
    inputRange: [0, 50, 150],
    outputRange: [1, 1.1, 1.3],
    extrapolate: "clamp",
  });

  const leftHintOpacity = pan.x.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0.5],
    extrapolate: "clamp",
  });

  const rightHintOpacity = pan.x.interpolate({
    inputRange: [0, 100],
    outputRange: [0.5, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.hintBox,
          { opacity: leftHintOpacity, transform: [{ scale: leftHintScale }] },
        ]}
      >
        <View style={[styles.iconCircle, { backgroundColor: "rgba(231, 76, 60, 0.15)" }]}>
          <MaterialIcons name="keyboard-double-arrow-left" size={32} color="#e74c3c" />
        </View>
        <ThemedText style={[styles.hintText, { color: "#e74c3c" }]}>SKIP</ThemedText>
      </Animated.View>

      <View style={styles.hintBox}>{/* spacer */}</View>

      <Animated.View
        style={[
          styles.hintBox,
          {
            opacity: rightHintOpacity,
            transform: [{ scale: rightHintScale }],
          },
        ]}
      >
        <View style={[styles.iconCircle, { backgroundColor: "rgba(46, 204, 113, 0.15)" }]}>
          <MaterialIcons name="keyboard-double-arrow-right" size={32} color="#2ecc71" />
        </View>
        <ThemedText style={[styles.hintText, { color: "#2ecc71" }]}>SUCCESS</ThemedText>
      </Animated.View>
    </View>
  );
}
