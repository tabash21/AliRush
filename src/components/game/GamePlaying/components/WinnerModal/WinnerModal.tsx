import { ThemedText } from "@/components/common/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, TouchableOpacity, View } from "react-native";
import { useGameContext } from "@/context/GameContext";
import { useTurnContext } from "@/context/TurnContext";
import { styles } from "./style";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export function WinnerModal() {
  const { settings, assignLastWordPoint } = useGameContext();
  const { showWinnerModal, setShowWinnerModal, onTurnEnd } = useTurnContext();
  const { t } = useAppTranslation();

  const groupCount = settings.groupCount;
  return (
    <Modal
      visible={showWinnerModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowWinnerModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <MaterialIcons
            name="emoji-events"
            size={48}
            color="#FFD700"
            style={{ marginBottom: 10 }}
          />
          <ThemedText style={styles.modalTitle}>{t("playing.last_word_winner")}</ThemedText>
          <ThemedText style={styles.modalSubTitle}>{t("playing.who_guessed")}</ThemedText>

          <View style={styles.winnerGrid}>
            {Array.from({ length: groupCount }).map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  assignLastWordPoint(i);
                  setShowWinnerModal(false);
                  onTurnEnd();
                }}
                style={styles.winnerBtn}
              >
                <ThemedText style={styles.winnerBtnText}>{t("playing.team", { number: i + 1 })}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => {
              assignLastWordPoint(null);
              setShowWinnerModal(false);
              onTurnEnd();
            }}
            style={styles.noWinnerBtn}
          >
            <ThemedText style={styles.noWinnerBtnText}>{t("playing.no_one")}</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
