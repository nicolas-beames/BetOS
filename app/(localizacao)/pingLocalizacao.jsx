import { StyleSheet, View, Text, Image, Button } from "react-native";
import { useState, useEffect } from 'react';
import { Link } from "expo-router";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import * as Location from 'expo-location';


// const delay = ms => new Promise(res => setTimeout(res, ms));


const Ping = () => {
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
      console.log('=-=location=-=');
      console.log('=-=altitude=-=: ', location.coords.altitude);
      console.log('=-=latitude=-=: ', location.coords.latitude);
      console.log('=-=accuracy=-=: ', location.coords.accuracy);
      console.log('=-=timestamp=-=: ', location.timestamp);
      
      setInterval(() => {
        // setLocation(location);
        // console.log(location);
      }, 1000);
    }

    // async function commitToDb() {
    //   const db = await SQLite.openDatabaseAsync('betosdb');
    //   console.log("aaa");
    //
    //   await db.execAsync(`
    //     CREATE TABLE IF NOT EXISTS localizacao (
    //       id INTEGER NOT NULL AUTO_INCREMENT,
    //       accuracy INTEGER,
    //       latitute REAL,
    //       longitude REAL,
    //       speed REAL,
    //       mocked INTEGER,
    //       timestamp INTEGER 
    //     );
    //   `);
    //
    //   console.log("Adb");
    // }

    // commitToDb();
      getCurrentLocation();
    setInterval(() => {
        //   getCurrentLocation();
    }, 2000);
  }, []);
};

export default Ping;