import { View, StyleSheet, Pressable, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Text from "../components/Text/Text";
import { spacing } from "../theme/spacing";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import Note from "../components/Note";
import Button from "../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation, user, setUser }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const listener = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
    });
    return listener;
  }, []);

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setUser(null);
    } catch (e) {
      // remove error
    }
  };

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <View style={styles.HomeTop}>
        <Text preset="h3">My Notes</Text>
        {notes.length === 0 && (
          <Pressable style={styles.logout} onPress={() => removeUser()}>
            <Text preset="h5" style={styles.logoutText}>
              Logout
            </Text>
            <AntDesign name="logout" size={24} color="red" />
          </Pressable>
        )}
        {notes.length !== 0 && (
          <View style={styles.userAction}>
            <Pressable onPress={() => navigation.navigate("create")}>
              <AntDesign name="pluscircleo" size={24} color="blue" />
            </Pressable>
            <Pressable style={styles.logout} onPress={() => removeUser()}>
              <Text preset="h5" style={styles.logoutText}>
                Logout
              </Text>
              <AntDesign name="logout" size={24} color="red" />
            </Pressable>
          </View>
        )}
      </View>
      {notes.length !== 0 ? (
        <View style={styles.listArea}>
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <Note item={item} navigation={navigation} />
            )}
            keyExtractor={(item, index) => index}
            contentContainerStyle={styles.list}
          />
        </View>
      ) : (
        <View>
          <Image
            style={styles.image}
            source={require("../../assets/empty_note.png")}
          />
          <Text preset="h5" style={styles.emptyText}>
            Sorry you do not have notes
          </Text>
          <Button
            title={"ADD"}
            customStyles={styles.button}
            buttonStyle={styles.buttonText}
            preset="h4"
            onPress={() => navigation.navigate("create")}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
  },
  HomeTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: spacing[10],
    marginRight: spacing[10],
    marginTop: spacing[3],
  },
  listArea: { marginTop: spacing[14], marginBottom: spacing[14] },
  list: {
    marginLeft: spacing[8],
    marginRight: spacing[8],
  },
  image: {
    alignSelf: "center",
    marginTop: spacing[16],
  },
  emptyText: {
    textAlign: "center",
    marginTop: spacing[14],
  },
  button: {
    alignSelf: "center",
    marginTop: spacing[14],
  },
  userAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    marginLeft: spacing[5],
    marginRight: spacing[1],
  },
});
