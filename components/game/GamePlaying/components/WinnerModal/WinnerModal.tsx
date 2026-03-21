import { ThemedText } from "@/components/common/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

interface WinnerModalProps {
  showWinnerModal: boolean;
  setShowWinnerModal: (show: boolean) => void;
  groupCount: number;
  assignLastWordPoint: (index: number | null) => void;
  onTurnEnd: () => void;
}

export function WinnerModal({
  showWinnerModal,
  setShowWinnerModal,
  groupCount,
  assignLastWordPoint,
  onTurnEnd,
}: WinnerModalProps) {
  return (
    <Modal
      visible={showWinnerModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowWinnerModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <MaterialIcons name="emoji-events" size={48} color="#FFD700" style={{ marginBottom: 10 }} />
          <ThemedText style={styles.modalTitle}>Last Word Winner!</ThemedText>
          <ThemedText style={styles.modalSubTitle}>Who guessed it correctly?</ThemedText>

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
                <ThemedText style={styles.winnerBtnText}>TEAM {i + 1}</ThemedText>
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
            <ThemedText style={styles.noWinnerBtnText}>NO ONE</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
