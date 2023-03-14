import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Text from "./Text/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { spacing } from "../theme/spacing";
import { colors } from "../theme/colors";

export default function Note({ item, navigation }) {
  const { title, color } = item;

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    showMessage({ message: "Successfully deleted...!", type: "success" });
  };

  return (
    <View style={[{ backgroundColor: color }, styles.notes]}>
      <Text preset={"h4"} style={styles.listTitle}>
        {title.length > 20 ? title.substring(0, 20 - 3) + "..." : title}
      </Text>
      <View style={styles.actionArea}>
        <Pressable onPress={() => navigation.navigate("view", { item })}>
          <MaterialIcons name="remove-red-eye" size={24} color="black" />
        </Pressable>
        <Pressable
          style={styles.spaceing}
          onPress={() => navigation.navigate("edit", { item })}
        >
          <FontAwesome name="edit" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => handleDelete(item.id)}>
          <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notes: {
    height: 78,
    padding: 27,
    marginBottom: 28,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listTitle: {
    color: colors.white,
  },
  actionArea: {
    flexDirection: "row",
  },
  spaceing: {
    marginLeft: spacing[3],
    marginRight: spacing[3],
  },
});
