import { Tabs } from "expo-router";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Gestores() {
  const router = useRouter();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth.isGestor) {
      router.replace("/");
    }
  }, [auth]);

  return (
    <Tabs>
      <Tabs.Screen
        name="os"
        options={{ title: "Dashboard", headerShown: false }}
      />
      <Tabs.Screen
        name="clientes"
        options={{ title: "Clientes", headerShown: false }}
      />
      <Tabs.Screen
        name="tecnicos"
        options={{ title: "Técnicos", headerShown: false }}
      />
    </Tabs>
  );
}
