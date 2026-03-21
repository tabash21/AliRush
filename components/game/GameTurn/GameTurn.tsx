import { View } from "react-native";
import { useGameContext } from "../../../context/GameContext";
import { GameState } from "../../../types/game";
import { GameOver } from "../GameOver";
import { GamePlaying } from "../GamePlaying";
import { GameReady } from "../GameReady";
import { GameTurnEnd } from "../GameTurnEnd";
import { styles } from "./style";

export function GameTurn() {
  const { gameState } = useGameContext();
  return (
    <View style={styles.container}>
      {gameState === GameState.Ready && <GameReady />}

      {gameState === GameState.Playing && <GamePlaying />}

      {gameState === GameState.TurnEnd && <GameTurnEnd />}

      {gameState === GameState.GameOver && <GameOver />}
    </View>
  );
}
