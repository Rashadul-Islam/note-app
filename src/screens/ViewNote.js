import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/Text/Text";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { Ionicons } from "@expo/vector-icons";

export default function ViewNote({ navigation, route }) {
  const { color, title, description } = route.params.item;
  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
        <Text preset="h3">View Note</Text>
      </View>
      <Text preset="h3" style={[{ color: color }, styles.heading]}>
        {title}
      </Text>
      <Text preset="h5" style={styles.description}>
        {description}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: "center",
    marginTop: spacing[8],
  },
  title: {
    flexDirection: "row",
    marginLeft: spacing[4],
    marginTop: spacing[4],
  },
  backButton: {
    marginRight: spacing[5],
  },
  description: {
    marginTop: spacing[5],
    marginBottom: spacing[5],
    padding: 18,
    color: colors.black,
  },
});
