import React from "react";
import { SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity, View, Button } from "react-native";
import { useRouter } from "expo-router";
import { useCalculator } from "../contexts/CalculatorContext";

export default function History() {
  const router = useRouter();
  const { history, clearHistory, loadFromHistory } = useCalculator();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calculation History</Text>

      {history.length === 0 ? (
        <Text style={styles.empty}>No history yet...</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                loadFromHistory(item);
                router.push("/");
              }}
            >
              <Text style={styles.item}>
                {item.prev} {item.operator} {item.current} = {item.result}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.buttons}>
        <Button title="Back" onPress={() => router.back()} />
        <Button title="Clear History" onPress={clearHistory} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 16, gap: 12 },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  empty: { color: "#aaa", fontSize: 18, marginTop: 16, textAlign: "center" },
  item: {
    color: "#fff",
    fontSize: 18,
    paddingVertical: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
});
