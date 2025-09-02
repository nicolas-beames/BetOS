import { StyleSheet, Text, TextInput, useColorScheme } from "react-native";
// import { Colors } from "../constants/Colors";

const ThemedInput = ({ label, labelStyle, inputStyle, style, ...props }) => {
  // const colorScheme = useColorScheme();
  // const theme = Colors[colorScheme] ?? Colors.dark;

  return (
    <>
      {label && <Text style={[styles.label, labelStyle, style]}>{label}</Text>}
      <TextInput style={[styles.input, inputStyle, style]} {...props} />
    </>
  );
};

export default ThemedInput;

const styles = StyleSheet.create({
  label: { fontSize: 14, fontWeight: 500, lineHeight: 20, color: "#718096" },
  input: {
    borderRadius: 5,
    backgroundColor: "#fff",
    fontFace: "LouisCondensedRegular",
    fontSize: 16,
    lineHeight: 20,
    borderColor: "#e2e8f0",
    color: "#1a202c",
    borderWidth: 1,
    padding: 8,
    width: 208,
  },
});
