import { ThemedText } from "@/components/common/themed-text";
import { useGameContext } from "@/context/GameContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

export function QuitGameModal() {
  const { isQuitModalVisible, setIsQuitModalVisible, onReturnToSetup } = useGameContext();

  if (!isQuitModalVisible) return null;

  return (
    <Modal
      transparent
      visible={isQuitModalVisible}
      animationType="fade"
      onRequestClose={() => setIsQuitModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="alert-circle-outline" size={48} color="#e74c3c" />
          </View>

          <ThemedText style={styles.title}>Quit Game?</ThemedText>
          <ThemedText style={styles.message}>
            Are you sure you want to quit the current game? All progress and scores will be lost.
          </ThemedText>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsQuitModalVisible(false)}
            >
              <ThemedText style={styles.cancelText}>CANCEL</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.quitButton]}
              onPress={() => onReturnToSetup()}
            >
              <ThemedText style={styles.quitText}>QUIT ANYWAY</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    width: "100%",
    backgroundColor: "#1e1e1e",
    borderRadius: 28,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 12,
    letterSpacing: 1,
  },
  message: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  quitButton: {
    backgroundColor: "#e74c3c",
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1,
  },
  quitText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
