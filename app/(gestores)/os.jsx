import { useState, useEffect } from "react";
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

const DashboardGestor = () => {
  const [refreshing, setRefreshing] = useState(false);
  const styles = Styles.title;

  const textFieldArray = [
    { label: "equipamento: ", text: "xxxxxxx", id: 1 },
    { label: "tel: ", text: "xxxxx-xxxx", id: 2 },
    { label: "cidade: ", text: "xxxxxxx xx", id: 3 },
    { label: "end: ", text: "xxxx, nº xx; bairro: xxx", id: 4 },
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    console.log("refreshing");
    setTimeout(() => {
      setRefreshing(false);
      console.log("finished refreshing");
    }, 2000);
  };
  const { auth, logout } = useAuth();

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
            OS
          </Text>
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
            key={1}
          />
          <DashboardCard
            title={"OS000002 - Viscardi"}
            contentArray={textFieldArray}
            buttonAction={() => {
              console.log("dashboard button pressed");
            }}
            buttonText="Abrir"
            key={2}
          />
          <DashboardCard
            title={"OS000003 - Santarém"}
            contentArray={textFieldArray}
            buttonAction={() => {
              console.log("dashboard button pressed");
            }}
            buttonText="Abrir"
            key={3}
          />
          <DashboardCard
            title={"OS000004 - Musamar"}
            contentArray={textFieldArray}
            buttonAction={() => {
              console.log("dashboard button pressed");
            }}
            buttonText="Abrir"
            key={4}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default DashboardGestor;
