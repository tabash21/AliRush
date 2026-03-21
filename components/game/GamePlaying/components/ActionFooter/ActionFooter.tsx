import { ThemedText } from "@/components/common/themed-text";
import { Animated, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

interface ActionFooterProps {
  isLastWordMode: boolean;
  canUndo: boolean;
  undoSwipe: () => void;
  hintPulse: Animated.Value;
}

export function ActionFooter({
  isLastWordMode,
  canUndo,
  undoSwipe,
  hintPulse,
}: ActionFooterProps) {
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
