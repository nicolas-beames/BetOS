import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { Link, useRouter } from "expo-router";
import ThemedView from "../../../components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Logo from "../../../assets/img/logo.png";
import ThemedInput from "../../../components/ThemedInput";
import ThemedButton from "../../../components/ThemedButton";
import Spacer from "../../../components/Spacer";

const CadastroTecnico = () => {
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [cpf, setCpf] = useState("");
  const [pwd, setPwd] = useState("");
  const router = useRouter();

  const handlePress = (msg) => {
    console.log(msg);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spacer />
      <Link href="../tecnicos">
        <Image source={Logo} style={styles.img} />
      </Link>
      <ThemedView style={{ backgroundColor: "red", width: "90%" }}>
        <ThemedInput
          label={"Nome"}
          onChangeText={setNome}
          placeholder={"Digite o nome"}
        />
        <ThemedInput
          label={"Cidade"}
          onChangeText={setCidade}
          placeholder={"Digite a cidade"}
          style={{ marginLeft: 24, marginRight: 24 }}
        />
        <ThemedInput
          label={"CPF"}
          onChangeText={setCpf}
          placeholder={"Digite o CPF"}
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
  );
};

export default CadastroTecnico;

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
