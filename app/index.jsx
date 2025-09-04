import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState, useContext } from "react";
import Logo from "../assets/img/logo.png";
import { useRouter, Link } from "expo-router";
import { Styles } from "../constants/Styles";
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
    <SafeAreaProvider>
      <SafeAreaView style={Styles.container}>
        <Image source={Logo} style={Styles.img} />
        <Text style={Styles.title}>Bem Vindo</Text>
        <Link href="/login" style={Styles.link}>
          Tela de Login
        </Link>
        <Pressable
          onPress={() => {
            souTecnico();
          }}
        >
          <Text style={Styles.link}>App de Técnicos</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            souGestor();
          }}
        >
          <Text style={Styles.link}>App de Gestores</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
