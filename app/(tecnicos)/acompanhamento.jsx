import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "../../components/ThemedText";
import Logo from "../../components/Logo";
import { useTheme } from "../../hooks/useTheme";

export default function ListaEquipamentos() {
    const { osId } = useLocalSearchParams();
    const { styles: theme } = useTheme();
    const router = useRouter();

    const equipamentos = [
        { serie: "201120047223", modelo: "Compressor X1" },
        { serie: "201020089577", modelo: "Inversor Y9" },
        { serie: "201530050120", modelo: "Condensador Z5" },
    ];

    return (
        <SafeAreaView style={[theme.container, local.container]}>
            <Logo style={{ width: 80, height: 40 }} />
            <ThemedText title={true}>Acompanhamento da OS</ThemedText>
            <Text style={local.osInfo}>O.S. NÚMERO: {osId}</Text>

            <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                {equipamentos.map((equip, index) => (
                    <Pressable
                        key={index}
                        style={local.card}
                        onPress={() =>
                            router.push({
                                pathname: `/${equip.serie}`,
                                params: { osId },
                            })
                        }
                    >
                        <Text style={local.cardTitle}>{equip.modelo}</Text>
                        <Text style={local.cardSubtitle}>
                            Nº de Série: {equip.serie}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const local = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 20,
    },
    osInfo: {
        marginTop: 8,
        color: "#444",
        fontSize: 16,
    },
    card: {
        backgroundColor: "#F4F6FA",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 6,
        borderLeftColor: "#0B4D8E",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#0B4D8E",
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
});
