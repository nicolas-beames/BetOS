import { useState } from "react";
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
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);

  const textFieldArray = [
    { label: "EQUIPAMENTO: ", text: "XXXXXXX", id: 1 },
    { label: "TEL: ", text: "XXXXX-XXXX", id: 2 },
    { label: "CIDADE: ", text: "XXXXXXX XX", id: 3 },
    { label: "END: ", text: "XXXX, Nº XX; BAIRRO: XXX", id: 4 },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    console.log("Refreshing");
    setTimeout(() => {
      setRefreshing(false);
      console.log("Finished refreshing");
    }, 2000);
  };
  const uuid = () => {
    return Crypto.randomUUID();
  };
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
      <ThemedText style={{ paddingTop: 20, paddingBottom: 20 }}>
        Agendamentos
      </ThemedText>
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
          backgroundColor=""
          key={uuid()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
