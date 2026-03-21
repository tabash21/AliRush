import { ThemedText } from "@/components/common/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { styles } from "./style";

interface GameHeaderProps {
  timeLeft: number;
  turnScore: number;
  topInset: number;
}

export function GameHeader({ timeLeft, turnScore, topInset }: GameHeaderProps) {
  return (
    <View style={[styles.container, { top: topInset + 20 }]}>
      <View style={styles.headerBlock}>
        <ThemedText style={styles.headerLabel}>TIME LEFT</ThemedText>
        <View style={styles.headerValRow}>
          <MaterialIcons name="timer" size={22} color="#e74c3c" />
          <ThemedText style={styles.headerVal}>{timeLeft}s</ThemedText>
        </View>
      </View>

      <View style={[styles.headerBlock, { alignItems: "flex-end" }]}>
        <ThemedText style={styles.headerLabel}>POINTS</ThemedText>
        <View style={styles.headerValRow}>
          <ThemedText style={styles.headerVal}>{turnScore}</ThemedText>
          <MaterialIcons name="star" size={22} color="#f1c40f" />
        </View>
      </View>
    </View>
  );
}
