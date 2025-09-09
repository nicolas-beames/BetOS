import { Image, StyleSheet } from "react-native";
import Img from "../assets/img/logo.png";
import { useTheme } from "../hooks/useTheme";

const Logo = () => {
  const { styles } = useTheme();

  return <Image source={Img} style={styles.img} />;
};

export default Logo;
