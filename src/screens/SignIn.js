import {
  View,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/Text/Text";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleSignIn = () => {
    setLoading(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        res && showMessage({ message: "Login success ...!", type: "success" });
        setLoading(true);
      })
      .catch((error) => {
        showMessage({ message: error.message, type: "danger" });
        setLoading(true);
      });
  };

  return (
    <SafeAreaView>
      <Image
        style={styles.image}
        source={require("../../assets/empty-state.png")}
      />
      <Text style={styles.title}>Never forget your notes</Text>
      <View style={styles.inputArea}>
        <Input
          placeholder="Email address"
          onChangeText={(email) => setEmail(email)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={secure}
          setSecure={setSecure}
          onChangeText={(text) => setPassword(text)}
          icon={<Ionicons name="eye" size={24} color={colors.lightGrey} />}
        />
        {loading ? (
          <Button
            title={"Login"}
            customStyles={styles.button}
            onPress={handleSignIn}
          />
        ) : (
          <ActivityIndicator
            style={styles.indicator}
            color={"blue"}
            size={"large"}
          />
        )}
      </View>
      <View style={styles.redirectArea}>
        <Text preset="h5">Don't have any account?</Text>
        <Pressable onPress={() => navigation.navigate("signup")}>
          <Text preset="h5" style={styles.redirectText}>
            Sign up
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    color: colors.drakGrey,
    textAlign: "center",
  },
  inputArea: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[8],
  },
  button: {
    alignSelf: "center",
    marginTop: spacing[13],
  },
  indicator: { height: 45, marginTop: spacing[13] },
  redirectArea: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing[14],
  },
  redirectText: {
    marginLeft: spacing[1],
    color: colors.lightGreen,
  },
});
