import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { HapticTab } from "@/components/common/haptic-tab";
import { IconSymbol } from "@/components/common/icon-symbol";
import { QuitGameModal } from "@/components/QuitGameModal/QuitGameModal";
import { Colors } from "@/constants/theme";
import { GameProvider, useGameContext } from "@/context/GameContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { GameState } from "@/types/game";

function TabNavigator() {
  const { gameState, setIsQuitModalVisible } = useGameContext();
  const { t } = useAppTranslation();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[(colorScheme as "light" | "dark") ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
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
          title: t("tabs.rules"),
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
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.settings"),
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="settings-sharp" color={color} />
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
