import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useContext } from "react";
import ThemedText from "../components/ThemedText";
import Logo from "../assets/img/logo.png";
import { useRouter, Link } from "expo-router";
import { useAuth } from "../hooks/useAuth";

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
    <SafeAreaView>
      <Image source={Logo} />
      <ThemedText title={true}>Bem Vindo</ThemedText>
      <Link href="/login">Tela de Login</Link>
      <Pressable
        onPress={() => {
          souTecnico();
        }}
      >
        <ThemedText>App de Técnicos</ThemedText>
      </Pressable>
      <Pressable
        onPress={() => {
          souGestor();
        }}
      >
        <ThemedText>App de Gestores</ThemedText>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;
