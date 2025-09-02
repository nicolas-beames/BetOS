import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import ThemedView from "../../components/ThemedView";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import Logo from "../../assets/img/logo.png";
import ThemedInput from "../../components/ThemedInput";
import ThemedButton from "../../components/ThemedButton";
import Spacer from "../../components/Spacer";

const Home = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const handlePress = (msg) => {
    console.log(msg);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Spacer />
        <Image source={Logo} style={styles.img} />
        <ThemedView>
          <ThemedInput
            label={"Usuário"}
            onChangeText={setUser}
            placeholder={"ID Login"}
            style={{ marginLeft: 24, marginRight: 24 }}
          />
          <ThemedInput
            label={"Senha"}
            secureTextEntry={true}
            onChangeText={setPwd}
            placeholder={"******"}
            style={{ marginLeft: 24, marginRight: 24 }}
          />
        </ThemedView>
        <ThemedButton
          text={"Acessar"}
          style={{ width: 124 }}
          action={() => {
            handlePress("butao apertado");
          }}
        />
        <Spacer />
        <Spacer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    fontFamily: "LouisCondensedRegular",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  img: { padding: 20, margin: 10 },
  title: { fontFamily: "LouisCondensedRegular", fontSize: 32 },
});
