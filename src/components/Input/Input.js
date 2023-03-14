import { TextInput, StyleSheet, View, Pressable } from "react-native";
import React from "react";
import { spacing } from "../../theme/spacing";
import { colors } from "../../theme/colors";

export default function Input({
  placeholder,
  secureTextEntry,
  onChangeText,
  icon,
  setSecure,
  multiline,
  value,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        value={value}
      />
      {icon && (
        <Pressable
          onPress={() => setSecure(!secureTextEntry)}
          style={styles.icon}
        >
          {icon}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    height: spacing[11],
    borderBottomColor: colors.lightGrey,
    marginBottom: spacing[7],
    position: "relative",
  },
  icon: { position: "absolute", right: 0, bottom: 10 },
});
