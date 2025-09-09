import { Text } from "react-native";
import { useTheme } from "../hooks/useTheme";

const ThemedLabel = ({ text, style, ...props }) => {
  const { styles } = useTheme();

  return <Text style={[styles.label, style]}>{text}</Text>;
};

export default ThemedLabel;
