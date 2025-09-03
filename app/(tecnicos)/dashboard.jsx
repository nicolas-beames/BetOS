import { useState } from "react";
import ThemedButton from "../../components/ThemedButton";
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  Image,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Styles } from "../../constants/Styles";

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const styles = Styles.title;

  const handleRefresh = () => {
    setRefreshing(true);
    console.log("Refreshing");
    setTimeout(() => {
      setRefreshing(false);
      console.log("Finished refreshing");
    }, 2000);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          Styles.container,
          {
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "orange",
            paddingTop: 40,
            paddingLeft: 30,
            paddingRight: 20,
          },
        ]}
      >
        <Text style={[Styles.headline3, { paddingTop: 20, paddingBottom: 20 }]}>
          Agendamentos
        </Text>
        <ScrollView
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View
            style={{
              backgroundColor: "gray",
              padding: 20,
              borderWidth: 2,
              borderRadius: 8,
              borderColor: "#e2e8f0",
              width: "100%",
            }}
          >
            <Text style={Styles.headline4}>OS000001 - Meussaco</Text>
            <Text style={Styles.paragraph}>EQUIPAMENTO</Text>
            <Text style={Styles.paragraph}>TEL:</Text>
            <Text style={Styles.paragraph}>CIDADE:</Text>
            <Text style={Styles.paragraph}>END:</Text>
            <View
              style={{
                marginTop: 20,
                backgroundColor: "red",
                alignContent: "flex-end",
                alignItems: "right",
                alignSelf: "flex-end",
                outlineColor: "black",
                outlineWidth: 2,
                borderRadius: 5,
                borderColor: "yellow",
                borderWidth: 3,
              }}
            >
              <ThemedButton
                text={"Abrir"}
                style={{ width: 124 }}
                action={() => {
                  console.log("butao apertado");
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;
