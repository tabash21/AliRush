import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/common/haptic-tab";
import { IconSymbol } from "@/components/common/icon-symbol";
import { QuitGameModal } from "@/components/QuitGameModal/QuitGameModal";
import { Colors } from "@/constants/theme";
import { GameProvider, useGameContext } from "@/context/GameContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { GameState } from "@/types/game";

function TabNavigator() {
  const { gameState, setIsQuitModalVisible } = useGameContext();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            if (gameState !== GameState.Setup) {
              e.preventDefault();
              setIsQuitModalVisible(true);
            }
          },
        }}
      />
      <Tabs.Screen
        name="how-to-play"
        options={{
          title: "Rules",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="questionmark.circle.fill" color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (gameState !== GameState.Setup) {
              e.preventDefault();
              setIsQuitModalVisible(true);
            }
          },
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <GameProvider>
      <QuitGameModal />
      <TabNavigator />
    </GameProvider>
  );
}
