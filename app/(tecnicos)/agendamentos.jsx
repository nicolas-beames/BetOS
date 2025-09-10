import { useEffect, useState } from "react";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import DashboardCard from "../../components/DashboardCard";
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  Image,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme.jsx";

const Agendamentos = () => {
  const [refreshing, setRefreshing] = useState(false);

  const textFieldArray = [
    { label: "EQUIPAMENTO: ", text: "XXXXXXX" },
    { label: "TEL: ", text: "XXXXX-XXXX" },
    { label: "CIDADE: ", text: "XXXXXXX XX" },
    { label: "END: ", text: "XXXX, Nº XX; BAIRRO: XXX" },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    console.log("Refreshing");
    setTimeout(() => {
      setRefreshing(false);
      console.log("Finished refreshing");
    }, 2000);
  };
  const { auth, logout } = useAuth();

  const router = useRouter();
  useEffect(() => {
    if (!auth.isTecnico) {
      router.replace("/");
    }
  }, [auth]);

  const { styles } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={logout} style={{ alignSelf: "flex-start" }}>
        <ThemedText title={true}>Agendamentos</ThemedText>
      </Pressable>
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <DashboardCard
          key={1}
          title={"OS000001 - Muffato"}
          contentArray={textFieldArray}
          buttonAction={() => {
            console.log("dashboard button pressed");
          }}
          buttonText="Abrir"
        />
        <DashboardCard
          key={2}
          title={"OS000002 - Viscardi"}
          contentArray={textFieldArray}
          buttonAction={() => {
            console.log("dashboard button pressed");
          }}
          buttonText="Abrir"
        />
        <DashboardCard
          key={3}
          title={"OS000003 - Santarém"}
          contentArray={textFieldArray}
          buttonAction={() => {
            console.log("dashboard button pressed");
          }}
          buttonText="Abrir"
        />
        <DashboardCard
          key={4}
          title={"OS000004 - Musamar"}
          contentArray={textFieldArray}
          buttonAction={() => {
            console.log("dashboard button pressed");
          }}
          buttonText="Abrir"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Agendamentos;
