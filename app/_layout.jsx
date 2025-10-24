import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Text, View, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createContext, useEffect, useContext, useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "../hooks/useTheme";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    LouisCondensedRegular: require("../assets/fonts/louis-condensed-regular/Louis-Condensed-Regular.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
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
            <Stack.Screen name="(localizacao)" />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
