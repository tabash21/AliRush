import ParallaxScrollView from "@/components/common/parallax-scroll-view";
import { ThemedText } from "@/components/common/themed-text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Trans } from "react-i18next";
import { useAppTranslation } from "@/hooks/useAppTranslation";

export default function HowToPlayScreen() {
  const { t } = useAppTranslation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image source={require("@/assets/images/wordRush.png")} style={styles.headerImage} />
      }
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="lightbulb-outline" size={40} color="#e74c3c" />
          </View>
          <ThemedText style={styles.title}>{t("rules.title")}</ThemedText>
          <ThemedText style={styles.description}>
            <Trans
              i18nKey="rules.description"
              components={{ 1: <ThemedText style={styles.highlight} /> }}
            />
          </ThemedText>

          <View style={styles.rulesList}>
            <View style={styles.ruleItem}>
              <MaterialCommunityIcons name="close-circle-outline" size={20} color="#e74c3c" />
              <ThemedText style={styles.ruleText}>{t("rules.no_translations")}</ThemedText>
            </View>
            <View style={styles.ruleItem}>
              <MaterialCommunityIcons name="close-circle-outline" size={20} color="#e74c3c" />
              <ThemedText style={styles.ruleText}>{t("rules.no_root_words")}</ThemedText>
            </View>
            <View style={styles.ruleItem}>
              <MaterialCommunityIcons name="check-circle-outline" size={20} color="#27ae60" />
              <ThemedText style={styles.ruleText}>{t("rules.creative")}</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>{t("rules.game_settings")}</ThemedText>
        </View>

        <View style={styles.settingsGrid}>
          <View style={styles.settingBox}>
            <View style={[styles.settingIconBox, { backgroundColor: "rgba(52, 152, 219, 0.15)" }]}>
              <MaterialCommunityIcons name="account-group" size={24} color="#3498db" />
            </View>
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingLabel}>{t("rules.groups.title")}</ThemedText>
              <ThemedText style={styles.settingInfo}>{t("rules.groups.desc")}</ThemedText>
            </View>
          </View>

          <View style={styles.settingBox}>
            <View style={[styles.settingIconBox, { backgroundColor: "rgba(241, 196, 15, 0.15)" }]}>
              <MaterialCommunityIcons name="timer-sand" size={24} color="#f1c40f" />
            </View>
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingLabel}>{t("rules.timer.title")}</ThemedText>
              <ThemedText style={styles.settingInfo}>{t("rules.timer.desc")}</ThemedText>
            </View>
          </View>

          <View style={styles.settingBox}>
            <View style={[styles.settingIconBox, { backgroundColor: "rgba(155, 89, 182, 0.15)" }]}>
              <MaterialCommunityIcons name="translate" size={24} color="#9b59b2" />
            </View>
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingLabel}>{t("rules.language.title")}</ThemedText>
              <ThemedText style={styles.settingInfo}>{t("rules.language.desc")}</ThemedText>
            </View>
          </View>

          <View style={styles.settingBox}>
            <View style={[styles.settingIconBox, { backgroundColor: "rgba(46, 204, 113, 0.15)" }]}>
              <MaterialCommunityIcons name="trophy" size={24} color="#2ecc71" />
            </View>
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingLabel}>{t("rules.target_points.title")}</ThemedText>
              <ThemedText style={styles.settingInfo}>{t("rules.target_points.desc")}</ThemedText>
            </View>
          </View>

          <View style={styles.settingBox}>
            <View style={[styles.settingIconBox, { backgroundColor: "rgba(231, 76, 60, 0.15)" }]}>
              <MaterialCommunityIcons name="flash" size={24} color="#e74c3c" />
            </View>
            <View style={styles.settingContent}>
              <ThemedText style={styles.settingLabel}>{t("rules.last_word_all.title")}</ThemedText>
              <ThemedText style={styles.settingInfo}>{t("rules.last_word_all.desc")}</ThemedText>
              <ThemedText style={styles.settingInfoHighlight}>
                {t("rules.last_word_all.notice")}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.winCard}>
          <View style={styles.winIconBox}>
            <MaterialCommunityIcons name="crown" size={40} color="#f1c40f" />
          </View>
          <ThemedText style={styles.sectionTitle}>{t("rules.how_to_win")}</ThemedText>
          <ThemedText style={styles.winDescription}>{t("rules.win_desc")}</ThemedText>
          <View style={styles.fairPlayNotice}>
            <MaterialCommunityIcons name="information-outline" size={20} color="#f1c40f" />
            <ThemedText style={styles.fairPlayText}>{t("rules.fair_play")}</ThemedText>
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  container: {
    paddingBottom: 40,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "rgba(231, 76, 60, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: "#aaa",
    lineHeight: 28,
    textAlign: "center",
    marginBottom: 30,
  },
  highlight: {
    color: "#e74c3c",
    fontWeight: "900",
  },
  rulesList: {
    width: "100%",
    gap: 16,
    marginTop: 10,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  ruleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  ruleText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "600",
  },
  sectionHeader: {
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 2,
  },
  settingsGrid: {
    gap: 15,
  },
  settingBox: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  settingIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 2,
  },
  settingInfo: {
    fontSize: 13,
    color: "#888",
    lineHeight: 18,
  },
  settingInfoHighlight: {
    fontSize: 13,
    color: "#e74c3c",
    lineHeight: 18,
  },
  winCard: {
    backgroundColor: "rgba(241, 196, 15, 0.05)",
    borderRadius: 24,
    padding: 30,
    marginTop: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(241, 196, 15, 0.2)",
  },
  winIconBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "rgba(241, 196, 15, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  winDescription: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  fairPlayNotice: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
  },
  fairPlayText: {
    flex: 1,
    fontSize: 14,
    color: "#aaa",
    lineHeight: 20,
    fontStyle: "italic",
  },
});
