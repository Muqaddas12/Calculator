import { Stack } from "expo-router";
import { CalculatorProvider } from "../contexts/CalculatorContext";
import Calculator from "../components/calculator/Calculator";

export default function Index() {
  return (
    <CalculatorProvider>
      <Stack.Screen options={{ headerShown: false }} />
      <Calculator />
    </CalculatorProvider>
  );
}
