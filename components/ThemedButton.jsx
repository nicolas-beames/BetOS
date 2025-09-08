import { Text, Pressable } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function ThemedButton({ action, title, text, style, ...props }) {
  const { styles, theme } = useTheme();
  return (
    <Pressable style={[styles.button, style]} onPress={action} {...props}>
      <Text style={title ? styles.title : styles.buttonText}>{text}</Text>
    </Pressable>
  );
}
