import { StyleSheet, View, Text, Image, Button } from "react-native";
import { useState, useEffect } from 'react';
import { Link } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Styles } from "../../constants/Styles";
import * as Location from 'expo-location';
import * as SQLite from "expo-sqlite";

const delay = ms => new Promise(res => setTimeout(res, ms));



const Ping = () => {
  const styles = Styles.title;
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log("A");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    }

    async function commitToDb() {
      const db = await SQLite.openDatabaseAsync('betosdb');
      console.log("aaa");

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS localizacao (
          id INTEGER NOT NULL AUTO_INCREMENT,
          accuracy INTEGER,
          latitute REAL,
          longitude REAL,
          speed REAL,
          mocked INTEGER,
          timestamp INTEGER 
        );
      `);

      console.log("Adb");
    }

    commitToDb();

    const pingar = setInterval(() => {
      getCurrentLocation();
    }, 10000);
  }, []);
  
  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    console.log("b");
  }    

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <Text style={styles.paragraph}>Oi</Text>
    </View>
  );
};

export default Ping;



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
