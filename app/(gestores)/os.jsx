import { ScrollView, View, RefreshControl, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useState } from "react";
import * as Crypto from "expo-crypto";

import ThemedText from "../../components/ThemedText";
import DashboardCard from "../../components/DashboardCard";

const DashboardGestor = () => {
  const [refreshing, setRefreshing] = useState(false);

  const textFieldArray = [
    { label: "EQUIPAMENTO: ", text: "XXXXXXX" },
    { label: "TEL: ", text: "XXXXX-XXXX" },
    { label: "CIDADE: ", text: "XXXXXXX XX" },
    { label: "END: ", text: "XXXX, Nº XX; BAIRRO: XXX" },
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

  const uuid = () => {
    return Crypto.randomUUID();
  };

  const { styles } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={logout} style={{ alignSelf: "flex-start" }}>
        <ThemedText title={true}>OS</ThemedText>
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

export default DashboardGestor;
