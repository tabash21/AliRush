import { Animated } from "react-native";
import { styles } from "./style";

interface ProgressBarProps {
  progressWidth: Animated.AnimatedInterpolation<string | number>;
  topInset: number;
}

export function ProgressBar({ progressWidth, topInset }: ProgressBarProps) {
  return (
    <Animated.View style={[styles.container, { top: topInset }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: progressWidth,
          },
        ]}
      />
    </Animated.View>
  );
}
