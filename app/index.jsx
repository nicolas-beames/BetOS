import { StyleSheet, View, Text, Image } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import Logo from "../assets/img/logo.png";
import { useRouter, Link } from "expo-router";

const Home = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>Bem Vindo</Text>
        <Link href="/login" style={styles.link}>
          Login
        </Link>
        <Link href="/dashboard" style={styles.link}>
          Dashboard (Técnicos)
        </Link>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: { padding: 20, margin: 10 },
  title: { fontFamily: "LouisCondensedRegular", fontSize: 32 },
  link: {
    fontFamily: "LouisCondensedRegular",
    color: "#003155",
    margin: 10,
    fontSize: 24,
  },
});
