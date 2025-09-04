import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Stack } from "expo-router";
// import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { createContext, useEffect, useContext, useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    LouisCondensedRegular: require("../assets/fonts/louis-condensed-regular/Louis-Condensed-Regular.otf"),
  });

  // const colorScheme = useColorScheme();
  // const theme = Colors[colorScheme] ?? Colors.dark;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StatusBar value="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tecnicos)/agendamentos" />
        <Stack.Screen name="(gestores)" />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
