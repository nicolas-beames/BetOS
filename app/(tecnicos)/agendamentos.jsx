import { useEffect, useState } from "react";
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
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Styles } from "../../constants/Styles";
import { useAuth } from "../../hooks/useAuth";

const Agendamentos = () => {
  const [refreshing, setRefreshing] = useState(false);
  const styles = Styles.title;

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

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          Styles.container,
          {
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingTop: 40,
            paddingLeft: 30,
            paddingRight: 20,
          },
        ]}
      >
        <Pressable onPress={logout}>
          <Text
            style={[Styles.headline3, { paddingTop: 20, paddingBottom: 20 }]}
          >
            Agendamentos
          </Text>
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
    </SafeAreaProvider>
  );
};

export default Agendamentos;
