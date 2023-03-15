import { View, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/Text/Text";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";

export default function SignUp({ navigation }) {
  const genderType = ["Male", "Female"];
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      email !== "" &&
      password !== "" &&
      name !== "" &&
      age !== "" &&
      gender !== ""
    ) {
      setLoading(true);
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await addDoc(collection(db, "users"), {
          name: name,
          age: age,
          gender: gender,
          uid: result.user.uid,
        });
        setLoading(false);
      } catch (error) {
        showMessage({ message: error.message, type: "danger" });
        setLoading(false);
      }
    } else {
      showMessage({ message: "All input must be filled...!", type: "danger" });
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.gobackArea}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text preset="h5" style={styles.backText}>
          Sign up
        </Text>
      </View>
      <View style={styles.inputArea}>
        <Input
          placeholder="Email address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={secure}
          setSecure={setSecure}
          onChangeText={(text) => setPassword(text)}
          icon={<Ionicons name="eye" size={24} color={colors.lightGrey} />}
        />
        <Input placeholder="Full name" onChangeText={(text) => setName(text)} />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />
        {genderType?.map((title) => {
          const selected = title === gender;
          return (
            <Pressable
              style={styles.radioArea}
              key={title}
              onPress={() => setGender(title)}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectedOuterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCircle,
                  ]}
                ></View>
              </View>
              <Text style={styles.radioText}>{title}</Text>
            </Pressable>
          );
        })}
        {!loading ? (
          <Button
            title={"Submit"}
            customStyles={styles.button}
            onPress={handleSignUp}
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
        <Text preset="h5">Already have an account?</Text>
        <Pressable onPress={() => navigation.navigate("signin")}>
          <Text preset="h5" style={styles.redirectText}>
            Sign in
          </Text>
        </Pressable>
      </View>
      <Text style={styles.policy}>
        By continuing, you accept the Terms of Use and Privacy Policy.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gobackArea: {
    flexDirection: "row",
    marginLeft: 15,
    alignItems: "center",
  },
  backText: {
    marginLeft: 24,
  },
  inputArea: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[8],
  },
  button: {
    alignSelf: "center",
    marginTop: spacing[13],
  },
  indicator: { marginTop: spacing[13] },
  redirectArea: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing[4],
  },
  redirectText: {
    marginLeft: spacing[1],
    color: colors.lightGreen,
  },
  radioArea: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing[4],
    marginLeft: spacing[4],
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.pink,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOuterCircle: {
    borderColor: colors.purple,
  },
  selectedInnerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.purple,
  },
  radioText: {
    marginLeft: 21,
    color: colors.black,
    fontWeight: 700,
  },
  policy: {
    fontSize: 10,
    fontWeight: 600,
    textAlign: "center",
    marginTop: 38,
  },
});
