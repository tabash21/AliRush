import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { useGameContext } from "@/context/GameContext";
import { useTurnContext } from "@/context/TurnContext";
import { styles } from "./style";

interface ProgressBarProps {
  topInset: number;
}

export function ProgressBar({ topInset }: ProgressBarProps) {
  const { settings } = useGameContext();
  const { timeLeft } = useTurnContext();

  const roundTimer = settings.roundTimer;
  const timePassedPercentage = ((roundTimer - timeLeft) / roundTimer) * 100;
  const progressAnim = useRef(new Animated.Value(timePassedPercentage)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: ((roundTimer - timeLeft) / roundTimer) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [timeLeft, roundTimer]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

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
