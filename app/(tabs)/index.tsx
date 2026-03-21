import ParallaxScrollView from "@/components/common/parallax-scroll-view";
import { ThemedView } from "@/components/common/themed-view";
import { GameSetup } from "@/components/game/GameSetup";
import { GameTurn } from "@/components/game/GameTurn";
import { useGameContext } from "@/context/GameContext";
import { TurnProvider } from "@/context/TurnContext";
import { GameState } from "@/types/game";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const { settings, gameState, onStartGame, setSettings, setIsQuitModalVisible } = useGameContext();

  const navigation = useNavigation() as any;

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e: any) => {
      if (gameState !== GameState.Setup) {
        e.preventDefault();
        setIsQuitModalVisible(true);
      }
    });
    return unsubscribe;
  }, [navigation, gameState, setIsQuitModalVisible]);

  if (gameState !== GameState.Setup) {
    return (
      <ThemedView style={styles.gameContainer}>
        <TurnProvider>
          <GameTurn />
        </TurnProvider>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/aliRush-logo.jpg")} style={styles.reactLogo} />
      }
    >
      <GameSetup settings={settings} setSettings={setSettings} onStartGame={onStartGame} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
