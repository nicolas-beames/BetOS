import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import Logo from "../assets/img/logo.png";
import { useRouter, Link } from "expo-router";
import { Styles } from "../constants/Styles";

// Página temporária para acessar as outras rotas enquanto não são definidas as permissões

const Home = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={Styles.container}>
        <Image source={Logo} style={Styles.img} />
        <Text style={Styles.title}>Bem Vindo</Text>
        <Link href="/login" style={Styles.link}>
          Login
        </Link>
        <Link href="/dashboard" style={Styles.link}>
          Dashboard (Técnicos)
        </Link>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
