import React from "react";
import { Stack } from "expo-router";
import { CalculatorProvider } from "../contexts/CalculatorContext";

export default function RootLayout() {
  return (
    <CalculatorProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CalculatorProvider>
  );
}
