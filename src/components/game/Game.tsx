import { View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import { GameState } from "@/types/game";
import { GameOver } from "./GameOver";
import { GamePlaying } from "./GamePlaying";
import { GameReady } from "./GameReady";
import { GameTurnEnd } from "./GameTurnEnd";
import { styles } from "./style";
import { TurnProvider } from "@/context/TurnContext";
import { ThemedView } from "@/components/common/themed-view";

export function Game() {
  const { gameState } = useGameContext();

  return (
    <ThemedView style={styles.gameContainer}>
      <TurnProvider>
        <View style={styles.container}>
          {gameState === GameState.Ready && <GameReady />}

          {gameState === GameState.Playing && <GamePlaying />}

          {gameState === GameState.TurnEnd && <GameTurnEnd />}

          {gameState === GameState.GameOver && <GameOver />}
        </View>
      </TurnProvider>
    </ThemedView>
  );
}
