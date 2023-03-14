import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import Create from "./src/screens/Create";
import Edit from "./src/screens/Edit";
import { useFonts } from "expo-font";
import FlashMessage from "react-native-flash-message";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import ViewNote from "./src/screens/ViewNote";

const Stack = createNativeStackNavigator();
const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return authCheck;
  }, []);

  const [loaded] = useFonts({
    "Encode-Medium": require("./assets/fonts/EncodeSans-SemiBold.ttf"),
    "Encode-Bold": require("./assets/fonts/EncodeSans-Bold.ttf"),
    "Encode-Regular": require("./assets/fonts/EncodeSans-Regular.ttf"),
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Font is loading</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={"blue"} size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="home" options={{ headerShown: false }}>
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="create" options={{ headerShown: false }}>
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="view"
              component={ViewNote}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="edit"
              component={Edit}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="signin"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="signup"
              options={{ headerShown: false }}
              component={SignUp}
            />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
