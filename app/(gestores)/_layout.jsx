import { Tabs } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Gestores() {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth.isGestor) {
      router.replace("/");
    }
  }, [auth]);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="os"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "clipboard-text" : "clipboard-text-outline"}
              size={24}
              color={focused ? "black" : "dark-gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="clientes"
        options={{
          title: "Clientes",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "account-box-multiple"
                  : "account-box-multiple-outline"
              }
              size={24}
              color={focused ? "black" : "dark-gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tecnicos"
        options={{
          title: "Técnicos",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-wrench" : "account-wrench-outline"}
              size={24}
              color={focused ? "black" : "dark-gray"}
            />
          ),
        }}
      />
      <Tabs.Screen name="(modal)" options={{ href: null }} />
    </Tabs>
  );
}
