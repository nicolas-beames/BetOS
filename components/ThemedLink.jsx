import { Text } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../hooks/useTheme";

const ThemedLink = ({ href, style, title = false, ...props }) => {
  const { theme, styles } = useTheme();

  return (
    <Link href={href}>
      <Text style={[title ? styles.title : styles.text, style]} {...props} />
    </Link>
  );
};
export default ThemedLink;
