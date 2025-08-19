import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "./Button";
import ButtonRow from "./ButtonRow";
import { useCalculator } from "../../contexts/CalculatorContext";

export default function Calculator() {
  const { state, handlePress } = useCalculator();
  const { previousValue, operator, currentValue, history } = state;

  return (
    <View style={styles.container}>
      {/* History / equation */}
      <Text style={styles.equation} numberOfLines={1} adjustsFontSizeToFit>
        {history}
      </Text>

      {/* Current value */}
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {currentValue}
      </Text>

      {/* Keypad */}
      <View style={styles.pad}>
        <ButtonRow>
          <Button label="C" theme="secondary" onPress={() => handlePress("clear")} />
          <Button label="+/-" theme="secondary" onPress={() => handlePress("posneg")} />
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
          <Button label="-" theme="accent" onPress={() => handlePress("operator", "-")} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end", padding: 20, backgroundColor: "#000" },
  equation: { color: "#888", fontSize: 22, textAlign: "right", marginBottom: 6 },
  result: { color: "#fff", fontSize: 56, textAlign: "right", marginBottom: 12 },
  pad: {},
});
