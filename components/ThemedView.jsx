import { View } from "react-native";

const ThemedView = ({ style, ...props }) => {
  return <View style={[{ backgroundColor: "#fff" }, style]} {...props} />;
};

export default ThemedView;
