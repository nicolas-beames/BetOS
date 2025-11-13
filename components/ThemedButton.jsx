import { Text, Pressable } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function ThemedButton({
  action,
  text,
  style,
  disabled = false,
  ...props
}) {
  const { styles } = useTheme();

  return (
    <Pressable
      style={[styles.button, style, disabled ? { opacity: 0.6 } : null]}
      onPress={action}
      disabled={disabled}
      {...props}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}
