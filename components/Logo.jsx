import { Image, StyleSheet } from "react-native";
import Img from "../assets/img/logo.png";

const Logo = () => {
  return <Image source={Img} style={styles.img} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    fontFamily: "LouisCondensedRegular",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  img: { padding: 20, margin: 10 },
  title: { fontFamily: "LouisCondensedRegular", fontSize: 32 },
});

export default Logo;
