import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Text from "../Text/Text";
import { colors } from "../../theme/colors";

export default function Button({ title, onPress, customStyles, preset }) {
  return (
    <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
      <Text preset={preset} style={styles.buttonText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    width: 145,
    borderRadius: 30,
    border: 1,
    borderColor: colors.darkOrange,
    backgroundColor: colors.lightOrange,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: colors.drakGrey,
  },
});
