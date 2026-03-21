import { ThemedText } from "@/components/common/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated, View } from "react-native";
import { styles } from "./style";

interface SwipeHintsProps {
  leftHintOpacity: Animated.AnimatedInterpolation<string | number>;
  leftHintScale: Animated.AnimatedInterpolation<string | number>;
  rightHintOpacity: Animated.AnimatedInterpolation<string | number>;
  rightHintScale: Animated.AnimatedInterpolation<string | number>;
}

export function SwipeHints({
  leftHintOpacity,
  leftHintScale,
  rightHintOpacity,
  rightHintScale,
}: SwipeHintsProps) {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.hintBox, { opacity: leftHintOpacity, transform: [{ scale: leftHintScale }] }]}
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
