import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const base = width / 4;

export default function Button({ label, onPress, size, theme }) {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === "double") buttonStyles.push(styles.double);
  if (theme === "secondary") { buttonStyles.push(styles.secondary); textStyles.push(styles.textSecondary); }
  if (theme === "accent")    { buttonStyles.push(styles.accent); }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} activeOpacity={0.6}>
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: { color: "#fff", fontSize: width * 0.06, fontWeight: "600" },
  textSecondary: { color: "#060606" },
  button: {
    backgroundColor: "#333333",
    flex: 1,
    height: Math.floor(base - 10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Math.floor(base),
    margin: 5,
  },
  double: { width: width / 2 - 10, flex: 0, alignItems: "flex-start", paddingLeft: 36 },
  secondary: { backgroundColor: "#a6a6a6" },
  accent: { backgroundColor: "#f09a36" },
});
