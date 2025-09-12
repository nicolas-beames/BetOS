import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import ThemedView from "../../components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Logo from "../../assets/img/logo.png";
import ThemedInput from "../../components/ThemedInput";
import ThemedButton from "../../components/ThemedButton";
import Spacer from "../../components/Spacer";
import { useTheme } from "../../hooks/useTheme";

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const handlePress = (msg) => {
    console.log(msg);
  };

  const { styles } = useTheme();

  return (
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
        action={() => {
          handlePress("butao apertado");
        }}
      />
      <Spacer />
      <Spacer />
    </SafeAreaView>
  );
};

export default Login;
