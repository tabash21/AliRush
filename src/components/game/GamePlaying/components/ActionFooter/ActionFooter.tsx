import { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/common/themed-text";
import { useTurnContext } from "../../../../../context/TurnContext";
import { styles } from "./style";

export function ActionFooter() {
  const { isLastWordMode, undoSwipe, swipeHistory } = useTurnContext();
  const hintPulse = useRef(new Animated.Value(0.4)).current;

  const canUndo = swipeHistory.length > 0;

  useEffect(() => {
    if (!canUndo) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(hintPulse, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(hintPulse, {
            toValue: 0.4,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [canUndo]);

  return (
    <View style={styles.container}>
      {isLastWordMode ? (
        <View style={styles.lastWordInstructions}>
          <ThemedText style={styles.instructionText}>ALL TEAMS CAN GUESS!</ThemedText>
          <ThemedText style={styles.instructionSubText}>Swipe when someone wins</ThemedText>
        </View>
      ) : canUndo ? (
        <TouchableOpacity onPress={undoSwipe} style={styles.undoButton}>
          <ThemedText style={{ fontWeight: "600" }}>Undo Swipe</ThemedText>
        </TouchableOpacity>
      ) : (
        <Animated.View style={{ opacity: hintPulse }}>
          <ThemedText style={styles.swipeHintText}>{"« Swipe Left or Right »"}</ThemedText>
        </Animated.View>
      )}
    </View>
  );
}
