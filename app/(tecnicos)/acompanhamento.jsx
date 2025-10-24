import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Acompanhamento() {
    const { osId } = useLocalSearchParams();

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Acompanhamento da OS
            </Text>
            <Text style={{ marginTop: 10, fontSize: 18 }}>{osId}</Text>
        </View>
    );
}
