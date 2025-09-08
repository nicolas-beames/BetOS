import { StyleSheet, View, useColorScheme } from "react-native";

const ThemedCard = ({ style, ...props }) => {
  return <View style={[styles.card, style]} {...props} />;
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    width: "80%",
    justifyContent: "space-between",
    borderRadius: 5,
    padding: 20,
  },
});
