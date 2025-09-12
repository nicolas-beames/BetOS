import ThemedText from "../../components/ThemedText";
import { View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Clientes = () => {
  return (
    <SafeAreaView
      style={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 40,
        paddingLeft: 30,
        paddingRight: 20,
      }}
    >
      <Link href="/cadastroTecnico">
        <ThemedText>Novo Técnico</ThemedText>
      </Link>
    </SafeAreaView>
  );
};

export default Clientes;
