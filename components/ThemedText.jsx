import { Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const ThemedText = ({ style, title = false, ...props }) => {
  const { theme, styles } = useTheme();

  return (
    <Text style={[title ? styles.title : styles.text, style]} {...props} />
  );
};
export default ThemedText;
