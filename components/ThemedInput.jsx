import { Text, TextInput } from "react-native";
import { useTheme } from "../hooks/useTheme";

const ThemedInput = ({ label, labelStyle, inputStyle, style, ...props }) => {
  const { theme, styles } = useTheme();
  return (
    <>
      {label && <Text style={[styles.text, labelStyle, style]}>{label}</Text>}
      <TextInput style={[styles.text, inputStyle, style]} {...props} />
    </>
  );
};

export default ThemedInput;
