import { useAudioPlayer } from "expo-audio";
import { useEffect, useRef } from "react";
import { Animated, Vibration, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGameContext } from "../../../context/GameContext";
import { useTurnContext } from "../../../context/TurnContext";
import {
  ActionFooter,
  GameHeader,
  ProgressBar,
  SwipeHints,
  WinnerModal,
  WordCard,
} from "./components";
import { GAMEPLAYING_SOUNDS } from "./consts";
import { styles } from "./style";

export function GamePlaying() {
  const { settings, currentWord, assignLastWordPoint } = useGameContext();
  const {
    timeLeft,
    turnScore,
    pan,
    panResponderHandlers,
    undoSwipe,
    swipeHistory,
    isLastWordMode,
    onTurnEnd,
    showWinnerModal,
    setShowWinnerModal,
  } = useTurnContext();

  const tickPlayer = useAudioPlayer(GAMEPLAYING_SOUNDS.tick);
  const endPlayer = useAudioPlayer(GAMEPLAYING_SOUNDS.end);

  const hintPulse = useRef(new Animated.Value(0.4)).current;
  const insets = useSafeAreaInsets();
  const roundTimer = settings.roundTimer;
  const canUndo = swipeHistory.length > 0;

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

  // Calculate elapsed time progression 0 to 100 scale
  const timePassedPercentage = ((roundTimer - timeLeft) / roundTimer) * 100;
  const progressAnim = useRef(new Animated.Value(timePassedPercentage)).current;

  // Handle timer-based logic (progress animation, ticking sound, and end signal)
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: ((roundTimer - timeLeft) / roundTimer) * 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    if (timeLeft <= 3 && timeLeft > 0) {
      tickPlayer.play();
      tickPlayer.seekTo(0);
    }

    if (isLastWordMode && timeLeft === 0) {
      Vibration.vibrate(500);
      endPlayer.play();
    }
  }, [timeLeft, roundTimer, isLastWordMode]);

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

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.centerContent}>
      <ProgressBar progressWidth={progressWidth} topInset={insets.top} />

      <GameHeader timeLeft={timeLeft} turnScore={turnScore} topInset={insets.top} />

      <WordCard
        currentWord={currentWord}
        isLastWordMode={isLastWordMode}
        isDark={false} // This was isDark but it was not truly used for chipBorderColor anymore
        dynamicBorderColor={dynamicBorderColor}
        dynamicShadowOpacity={dynamicShadowOpacity}
        pan={pan}
        panResponderHandlers={panResponderHandlers}
      />

      <SwipeHints
        leftHintOpacity={leftHintOpacity}
        leftHintScale={leftHintScale}
        rightHintOpacity={rightHintOpacity}
        rightHintScale={rightHintScale}
      />

      <ActionFooter
        isLastWordMode={isLastWordMode}
        canUndo={canUndo}
        undoSwipe={undoSwipe}
        hintPulse={hintPulse}
      />

      <WinnerModal
        showWinnerModal={showWinnerModal}
        setShowWinnerModal={setShowWinnerModal}
        groupCount={settings.groupCount}
        assignLastWordPoint={assignLastWordPoint}
        onTurnEnd={onTurnEnd}
      />
    </View>
  );
}
