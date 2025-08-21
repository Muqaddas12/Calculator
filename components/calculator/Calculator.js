import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Button from "./Button";
import ButtonRow from "./ButtonRow";
import { useCalculator } from "../../contexts/CalculatorContext";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

export default function Calculator() {
  const { state, handlePress } = useCalculator();
  const { expression, result, currentValue, justEvaluated } = state;

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#ff6600" />
        </TouchableOpacity>
        <View style={styles.topActions}>
          <TouchableOpacity style={styles.topBtn}>
            <MaterialIcons name="apps" size={24} color="#ff6600" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBtn}>
            <Ionicons name="home" size={24} color="#ff6600" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={20} color="#ff6600" />
        </TouchableOpacity>
      </View>

      {/* Display */}
      <View style={styles.display}>
        <Text style={styles.equation} numberOfLines={1} adjustsFontSizeToFit>
          {expression || "0"}
        </Text>
        <Text
          style={[
            justEvaluated ? styles.finalResult : styles.previewResult,
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {justEvaluated ? `= ${currentValue}` : result || currentValue}
        </Text>
      </View>

      {/* Buttons */}
      <ButtonRow>
        <Button label="C" theme="secondary" onPress={() => handlePress("clear")} />
        <Button label="⌫" theme="secondary" onPress={() => handlePress("backspace")} />
        <Button label="%" theme="secondary" onPress={() => handlePress("percentage")} />
        <Button label="÷" theme="accent" onPress={() => handlePress("operator", "/")} />
      </ButtonRow>

      <ButtonRow>
        <Button label="7" onPress={() => handlePress("number", "7")} />
        <Button label="8" onPress={() => handlePress("number", "8")} />
        <Button label="9" onPress={() => handlePress("number", "9")} />
        <Button label="×" theme="accent" onPress={() => handlePress("operator", "*")} />
      </ButtonRow>

      <ButtonRow>
        <Button label="4" onPress={() => handlePress("number", "4")} />
        <Button label="5" onPress={() => handlePress("number", "5")} />
        <Button label="6" onPress={() => handlePress("number", "6")} />
        <Button label="−" theme="accent" onPress={() => handlePress("operator", "-")} />
      </ButtonRow>

      <ButtonRow>
        <Button label="1" onPress={() => handlePress("number", "1")} />
        <Button label="2" onPress={() => handlePress("number", "2")} />
        <Button label="3" onPress={() => handlePress("number", "3")} />
        <Button label="+" theme="accent" onPress={() => handlePress("operator", "+")} />
      </ButtonRow>

      <ButtonRow>
        <Button label="0" size="double" onPress={() => handlePress("number", "0")} />
        <Button label="." onPress={() => handlePress("number", ".")} />
        <Button label="=" theme="accent" onPress={() => handlePress("equal")} />
      </ButtonRow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 40 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  topActions: {
    flexDirection: "row",
    gap: 16,
  },
  topBtn: {
    padding: 6,
  },
  display: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  equation: {
    color: "#000",
    fontSize: 32,
    textAlign: "right",
    marginBottom: 6,
  },
  previewResult: {
    color: "#ff6600",
    fontSize: 26,
    textAlign: "right",
    marginBottom: 12,
  },
  finalResult: {
    color: "#000",
    fontSize: 48,
    textAlign: "right",
    fontWeight: "700",
    marginBottom: 12,
  },
});
