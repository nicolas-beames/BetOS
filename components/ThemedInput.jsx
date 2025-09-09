import { View, TextInput } from "react-native";
import { useTheme } from "../hooks/useTheme";
import ThemedLabel from "./ThemedLabel";

const ThemedInput = ({ label, labelStyle, inputStyle, style, ...props }) => {
  const { styles } = useTheme();
  return (
    <View style={style}>
      <ThemedLabel text={label} />
      <TextInput style={[styles.input, inputStyle]} {...props} />
    </View>
  );
};

export default ThemedInput;
