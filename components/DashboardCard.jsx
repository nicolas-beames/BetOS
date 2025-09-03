import { View, Text, TextInput } from "react-native";
import { Styles } from "../constants/Styles";
import ThemedButton from "./ThemedButton";
// import { Colors } from "../constants/Colors";

const DashboardCard = ({
  title,
  contentArray,
  buttonText,
  buttonAction,
  style,
  ...props
}) => {
  // const colorScheme = useColorScheme();
  // const theme = Colors[colorScheme] ?? Colors.dark;

  return (
    <View
      style={{
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#e2e8f0",
        width: "97%",
      }}
    >
      <Text style={Styles.headline4}>{title}</Text>
      {contentArray.map((field) => {
        return (
          <>
            <Text style={Styles.paragraph}>
              {field.label} {field.text}
            </Text>
          </>
        );
      })}
      <View
        style={{
          marginTop: 20,
          alignContent: "flex-end",
          alignItems: "right",
          alignSelf: "flex-end",
        }}
      >
        <ThemedButton
          text={buttonText}
          style={{ width: 124 }}
          action={() => {
            buttonAction();
          }}
        />
      </View>
    </View>
  );
};

export default DashboardCard;
