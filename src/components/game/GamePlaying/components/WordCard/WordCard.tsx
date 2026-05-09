import { ThemedText } from "@/components/common/themed-text";
import { useGameContext } from "@/context/GameContext";
import { useTurnContext } from "@/context/TurnContext";
import { Animated, View } from "react-native";
import { styles } from "./style";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function WordCard() {
  const { currentWord } = useGameContext();
  const { isLastWordMode, pan, panResponderHandlers } = useTurnContext();
  const { t } = useAppTranslation();

  // Interpolate side swipe to create dynamic border colors indicating the action
  const dynamicBorderColor = pan.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["rgba(231, 76, 60, 1)", "#ccc", "rgba(46, 204, 113, 1)"],
    extrapolate: "clamp",
  });

  const dynamicShadowOpacity = pan.x.interpolate({
    inputRange: [-100, -50, 0, 50, 100],
    outputRange: [0.8, 0.4, 0.1, 0.4, 0.8],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      {...panResponderHandlers}
      style={[
        styles.card,
        {
          backgroundColor: isLastWordMode ? "rgba(255, 25, 25, 0.55)" : "#222", // Simplified isDark check as it was always true
          borderColor: dynamicBorderColor,
          shadowOpacity: dynamicShadowOpacity,
        },
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
      ]}
    >
      {isLastWordMode && (
        <View style={styles.lastWordBadge}>
          <ThemedText style={styles.lastWordBadgeText}>{t("playing.last_word")}</ThemedText>
        </View>
      )}
      <View style={styles.cardTextContainer}>
        <ThemedText
          style={styles.cardText}
          adjustsFontSizeToFit
          numberOfLines={3}
          minimumFontScale={0.3}
        >
          {currentWord}
        </ThemedText>
      </View>
    </Animated.View>
  );
}
