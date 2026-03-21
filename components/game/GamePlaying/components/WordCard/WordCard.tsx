import { ThemedText } from "@/components/common/themed-text";
import { Animated, View } from "react-native";
import { styles } from "./style";

interface WordCardProps {
  currentWord: string;
  isLastWordMode: boolean;
  isDark: boolean;
  dynamicBorderColor: Animated.AnimatedInterpolation<string | number>;
  dynamicShadowOpacity: Animated.AnimatedInterpolation<string | number>;
  pan: Animated.ValueXY;
  panResponderHandlers: any;
}

export function WordCard({
  currentWord,
  isLastWordMode,
  isDark,
  dynamicBorderColor,
  dynamicShadowOpacity,
  pan,
  panResponderHandlers,
}: WordCardProps) {
  return (
    <Animated.View
      {...panResponderHandlers}
      style={[
        styles.card,
        {
          backgroundColor: isLastWordMode ? "rgba(255, 25, 25, 0.55)" : isDark ? "#222" : "#fdfdfd",
          borderColor: dynamicBorderColor,
          shadowOpacity: dynamicShadowOpacity,
        },
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
      ]}
    >
      {isLastWordMode && (
        <View style={styles.lastWordBadge}>
          <ThemedText style={styles.lastWordBadgeText}>LAST WORD!</ThemedText>
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
