import { useState, useEffect } from "react";
import * as Crypto from "expo-crypto";
import ThemedButton from "../../components/ThemedButton";
import DashboardCard from "../../components/DashboardCard";
import ThemedText from "../../components/ThemedText";
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

const Clientes = () => {
  const [refreshing, setRefreshing] = useState(false);
  const uuid = () => {
    return Crypto.randomUUID();
  };

  const textFieldArray = [
    { label: "RESPONSÁVEL: ", text: "xxxxxxx", id: 1 },
    { label: "TEL: ", text: "xxxxx-xxxx", id: 2 },
    { label: "CIDADE: ", text: "xxxxxxx xx", id: 3 },
    { label: "END: ", text: "xxxx, Nº xx; BAIRRO: xxx", id: 4 },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    console.log("refreshing");
    setTimeout(() => {
      setRefreshing(false);
      console.log("finished refreshing");
    }, 2000);
  };
  const { logout } = useAuth();

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
      <Pressable onPress={logout}>
        <ThemedText style={{ paddingTop: 20, paddingBottom: 20 }}>
          Clientes
        </ThemedText>
      </Pressable>
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <DashboardCard
          title={"OS000001 - Muffato"}
          contentArray={textFieldArray}
          buttonAction={() => {
            console.log("dashboard button pressed");
          }}
          buttonText="Abrir"
          key={uuid()}
        />
        <DashboardCard
          title={"OS000002 - Viscardi"}
          contentArray={textFieldArray}
          buttonAction={() => {
            console.log("dashboard button pressed");
          }}
          buttonText="Abrir"
          key={uuid()}
        />
        <DashboardCard
          title={"OS000003 - Santarém"}
          contentArray={textFieldArray}
          buttonAction={() => {
            console.log("dashboard button pressed");
          }}
          buttonText="Abrir"
          key={uuid()}
        />
        <DashboardCard
          title={"OS000004 - Musamar"}
          contentArray={textFieldArray}
          buttonAction={() => {
            console.log("dashboard button pressed");
          }}
          buttonText="Abrir"
          key={uuid()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Clientes;
