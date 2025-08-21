import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const base = width / 4;

export default function Button({ label, onPress, size, theme }) {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === "double") buttonStyles.push(styles.double);

  if (theme === "secondary") {
    buttonStyles.push(styles.secondary);
    textStyles.push(styles.textSecondary);
  }

  if (theme === "accent") {
    buttonStyles.push(styles.accent);
    textStyles.push(styles.textAccent);
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} activeOpacity={0.7}>
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: Math.floor(base - 12),
    justifyContent: "center",
    alignItems: "center",
  },
  double: {
    width: width / 2 - 6,
    flex: 0,
    alignItems: "flex-start",
    paddingLeft: 28,
  },
  text: {
    fontSize: width * 0.065,
    fontWeight: "500",
    color: "#000",
  },
  textSecondary: {
    color: "#ff6600",
    fontWeight: "400",
    fontSize: width * 0.08,
  },
  textAccent: {
    color: "#ff6600",
    fontWeight: "400",
    fontSize: width * 0.1,
  },
  secondary: {
    color: "#ff6600",
  },
  accent: {},
});
