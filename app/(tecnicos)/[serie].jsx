import { useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import DropdownComponent from "../../components/DropdownMenu";
import ThemedText from "../../components/ThemedText";
import Logo from "../../components/Logo";
import { useTheme } from "../../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

export default function Acompanhamento() {
    const { osId, serie } = useLocalSearchParams();
    const { styles: theme } = useTheme();

    const pecas = [
        { label: "Compressor", value: "Compressor" },
        { label: "Solenoide", value: "Solenoide" },
        { label: "Controlador", value: "Controlador" },
        { label: "Micromotor", value: "Micromotor" },
        { label: "Filtro", value: "Filtro" },
        { label: "Condensador", value: "Condensador" },
        { label: "Micro Canal", value: "Micro Canal" },
        { label: "Capilar", value: "Capilar" },
        { label: "Inversor", value: "Inversor" },
        { label: "Tubulação", value: "Tubulação" },
    ];

    const defeitos = [
        { label: "Em Massa", value: "Em Massa" },
        { label: "Em Curto", value: "Em Curto" },
        { label: "Corrente Alta", value: "Corrente Alta" },
        { label: "Não Parte", value: "Não Parte" },
    ];

    const [defeitosSelecionados, setDefeitosSelecionados] = useState([
        { peca: "", defeito: "" },
    ]);

    const adicionarDefeito = () => {
        setDefeitosSelecionados((prev) => [...prev, { peca: "", defeito: "" }]);
    };

    const removerDefeito = (index) => {
        setDefeitosSelecionados((prev) => prev.filter((_, i) => i !== index));
    };

    const atualizarDefeito = (index, campo, valor) => {
        setDefeitosSelecionados((prev) => {
            const novos = [...prev];
            novos[index][campo] = valor;
            return novos;
        });
    };

    return (
        <SafeAreaView style={[theme.container, { padding: 20 }]}>
            <View style={styles.header}>
                <Logo style={{ width: 80, height: 40 }} />
                <View style={styles.osBox}>
                    <Text style={styles.osLabel}>O.S.:</Text>
                    <Text style={styles.osValue}>{osId}</Text>
                </View>
            </View>

            <Text style={styles.serieText}>Nº SÉRIE: {serie}</Text>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <Text style={styles.sectionTitle}>REGISTRAR DEFEITOS</Text>

                {defeitosSelecionados.map((item, index) => (
                    <View key={index} style={styles.defeitoLinha}>
                        <View style={{ flex: 1 }}>
                            <DropdownComponent
                                data={pecas}
                                selectedValue={item.peca}
                                onValueChange={(val) =>
                                    atualizarDefeito(index, "peca", val)
                                }
                                placeholder="Selecione a peça"
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <DropdownComponent
                                data={defeitos}
                                selectedValue={item.defeito}
                                onValueChange={(val) =>
                                    atualizarDefeito(index, "defeito", val)
                                }
                                placeholder="Selecione o defeito"
                            />
                        </View>
                        {defeitosSelecionados.length > 1 && (
                            <Pressable
                                onPress={() => removerDefeito(index)}
                                style={styles.removeButton}
                            >
                                <Ionicons
                                    name="trash-outline"
                                    size={20}
                                    color="#fff"
                                />
                            </Pressable>
                        )}
                    </View>
                ))}

                <Pressable onPress={adicionarDefeito} style={styles.addButton}>
                    <Ionicons
                        name="add-circle-outline"
                        size={22}
                        color="#0B4D8E"
                    />
                    <Text style={styles.addText}>Adicionar outro defeito</Text>
                </Pressable>

                <Pressable style={styles.submitButton}>
                    <Text style={styles.submitText}>Registrar defeito</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    osBox: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
    },
    osLabel: { fontWeight: "bold", color: "#333", marginRight: 6 },
    osValue: { color: "#555", fontSize: 16 },
    serieText: { fontSize: 16, fontWeight: "600", color: "#0B4D8E" },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginVertical: 15,
        color: "#0B4D8E",
        textAlign: "center",
    },
    defeitoLinha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    addText: { color: "#0B4D8E", fontWeight: "600", marginLeft: 6 },
    removeButton: { backgroundColor: "#D11A2A", padding: 6, borderRadius: 8 },
    submitButton: {
        backgroundColor: "#002E63",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
    },
    submitText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
