import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/Text/Text";
import { spacing } from "../theme/spacing";
import Input from "../components/Input/Input";
import { colors } from "../theme/colors";
import Button from "../components/Button/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";

export default function Create({ navigation, route, user }) {
  const [title, setTile] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = ["red", "green", "blue"];

  const addNotes = async () => {
    if (title !== "" && color !== "" && description !== "") {
      setLoading(true);
      try {
        await addDoc(collection(db, "notes"), {
          title: title,
          description: description,
          color: color,
          uid: user.uid,
        });
        setLoading(false);
        showMessage({ message: "Notes added...!", type: "success" });
        navigation.goBack();
      } catch (error) {
        showMessage({ message: error.message, type: "danger" });
        setLoading(false);
      }
    } else {
      showMessage({ message: "All input must be filled...!", type: "danger" });
    }
  };

  return (
    <SafeAreaView style={styles.createContainer}>
      <View style={styles.title}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
        <Text preset="h3">Create Note</Text>
      </View>
      <View style={styles.inputArea}>
        <Input placeholder={"Title"} onChangeText={(text) => setTile(text)} />
      </View>
      <View style={styles.inputArea}>
        <Input
          placeholder={"Description"}
          multiline={true}
          onChangeText={(desc) => setDescription(desc)}
        />
      </View>
      <View style={styles.inputArea}>
        <Text style={styles.themeTitle}>Theme</Text>
        <View style={styles.themeArea}>
          {theme?.map((title, index) => {
            const selected = title === color;
            return (
              <Pressable
                style={index !== 0 && styles.radioArea}
                key={title}
                onPress={() => setColor(title)}
              >
                <View
                  style={[
                    styles.outerCircle,
                    { backgroundColor: title },
                    selected
                      ? { borderColor: title }
                      : { borderColor: "white" },
                  ]}
                ></View>
              </Pressable>
            );
          })}
        </View>
      </View>
      {loading ? (
        <ActivityIndicator
          style={styles.saveButton}
          color={"blue"}
          size={"large"}
        />
      ) : (
        <Button
          title={"Save"}
          customStyles={styles.saveButton}
          onPress={addNotes}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  createContainer: {
    flex: 1,
  },
  title: {
    flexDirection: "row",
    marginLeft: spacing[4],
    marginTop: spacing[4],
  },
  backButton: {
    marginRight: spacing[5],
  },
  inputArea: {
    marginLeft: spacing[5],
    marginRight: spacing[5],
    marginTop: spacing[15],
  },
  themeTitle: {
    color: colors.drakGrey,
  },
  themeArea: { flexDirection: "row", marginTop: spacing[4] },
  radioArea: {
    marginLeft: spacing[4],
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    alignSelf: "center",
    marginTop: 180,
  },
});
