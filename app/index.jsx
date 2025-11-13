import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/useAuth";

import Spacer from "../components/Spacer";
import Logo from "../components/Logo";
import ThemedButton from "../components/ThemedButton";
import ThemedText from "../components/ThemedText";
import ThemedLink from "../components/ThemedLink";

// Página temporária para acessar as outras rotas enquanto não são definidas as permissões

const Home = () => {
  const { auth, souTecnico, souGestor } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isGestor) {
      router.replace("/os");
    } else if (auth.isTecnico) {
      router.replace("/agendamentos");
    }
  }, [auth]);

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "space-evenly",
        alignContent: "space-evenly",
        flexDirection: "column",
      }}
    >
      <Logo />
      <ThemedText title={true}>Bem Vindo</ThemedText>
      {/* <Spacer /> */}
      {/* <ThemedLink href="/login" title={true}>
        Tela de Login
      </ThemedLink> */}
      <Spacer />
      <ThemedButton title={true} text={"Sou técnico"} action={souTecnico} />
      <Spacer />
      <ThemedButton title={true} text={"Sou gestor"} action={souGestor} />
      {/* <Spacer /> */}
      {/* <ThemedLink href="/pingLocalizacao" title={true}>
        Tela de Programa
      </ThemedLink> */}
    </SafeAreaView>
  );
};

export default Home;
