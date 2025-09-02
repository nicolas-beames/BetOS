import { StyleSheet, Text, Pressable, Button } from "react-native";

export default function ThemedButton({ action, text, style, ...props }) {
  return (
    <Pressable style={[styles.button, style]} onPress={action} {...props}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#003155",
    borderRadius: 8,
    height: 37,
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: "#fff",
    fontWeight: 900,
  },
});
