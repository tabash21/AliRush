import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/common/haptic-tab";
import { IconSymbol } from "@/components/common/icon-symbol";
import { QuitGameModal } from "@/components/game/QuitGameModal";
import { Colors } from "@/constants/theme";
import { GameProvider } from "@/context/GameContext";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GameProvider>
      <QuitGameModal />
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
        />
        <Tabs.Screen
          name="how-to-play"
          options={{
            title: "Rules",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="questionmark.circle.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </GameProvider>
  );
}
