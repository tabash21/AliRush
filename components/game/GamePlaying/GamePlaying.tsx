import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";
import { Vibration, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGameContext } from "@/context/GameContext";
import { useTurnContext } from "@/context/TurnContext";
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
  const { settings } = useGameContext();
  const { timeLeft, isLastWordMode } = useTurnContext();

  const tickPlayer = useAudioPlayer(GAMEPLAYING_SOUNDS.tick);
  const endPlayer = useAudioPlayer(GAMEPLAYING_SOUNDS.end);

  const insets = useSafeAreaInsets();
  const roundTimer = settings.roundTimer;

  // Handle timer-based logic (ticking sound, and end signal)
  useEffect(() => {
    if (timeLeft <= 3 && timeLeft > 0) {
      tickPlayer.play();
      tickPlayer.seekTo(0);
    }

    if (isLastWordMode && timeLeft === 0) {
      Vibration.vibrate(500);
      endPlayer.play();
    }
  }, [timeLeft, roundTimer, isLastWordMode]);

  return (
    <View style={styles.centerContent}>
      <ProgressBar topInset={insets.top} />

      <GameHeader topInset={insets.top} />

      <WordCard />

      <SwipeHints />

      <ActionFooter />

      <WinnerModal />
    </View>
  );
}
