import { View, Text } from "react-native";
import ThemedButton from "./ThemedButton";
import { useTheme } from "../hooks/useTheme";

const DashboardCard = ({ title, contentArray, buttonText, buttonAction }) => {
    const { styles } = useTheme();

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{title}</Text>

            {contentArray.map((field, i) => (
                <Text key={i} style={styles.cardText}>
                    {field.label} {field.text}
                </Text>
            ))}

            <View
                style={{
                    paddingVertical: 5,
                    width: "100%",
                    alignItems: "flex-end",
                }}
            >
                <ThemedButton text={buttonText} action={buttonAction} />
            </View>
        </View>
    );
};

export default DashboardCard;
