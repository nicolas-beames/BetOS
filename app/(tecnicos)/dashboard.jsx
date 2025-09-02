import { StyleSheet, View, Text, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Styles } from "../../constants/Styles";

const Dashboard = () => {
  const styles = Styles.title;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  img: { padding: 20, margin: 10 },
  title: { fontFamily: "LouisCondensedRegular", fontSize: 32 },
  link: {
    fontFamily: "LouisCondensedRegular",
    color: "#003155",
    margin: 10,
    fontSize: 24,
  },
});
