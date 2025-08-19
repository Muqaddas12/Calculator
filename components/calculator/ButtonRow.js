import React from "react";
import { View, StyleSheet } from "react-native";

export default function ButtonRow({ children }) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", justifyContent: "space-between" },
});
