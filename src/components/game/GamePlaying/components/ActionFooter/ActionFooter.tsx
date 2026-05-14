import { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/common/themed-text";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useTurnContext } from "../../../../../context/TurnContext";
import { styles } from "./style";

export function ActionFooter() {
  const { isLastWordMode, undoSwipe, swipeHistory } = useTurnContext();
  const { t } = useAppTranslation();
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
          <ThemedText style={styles.instructionText}>
            {t("playing.action_footer_last_word_title")}
          </ThemedText>
          <ThemedText style={styles.instructionSubText}>
            {t("playing.action_footer_last_word_subtitle")}
          </ThemedText>
        </View>
      ) : canUndo ? (
        <TouchableOpacity onPress={undoSwipe} style={styles.undoButton}>
          <ThemedText style={{ fontWeight: "600" }}>{t("playing.action_footer_undo")}</ThemedText>
        </TouchableOpacity>
      ) : (
        <Animated.View style={{ opacity: hintPulse }}>
          <ThemedText style={styles.swipeHintText}>
            {t("playing.action_footer_swipe_hint")}
          </ThemedText>
        </Animated.View>
      )}
    </View>
  );
}
