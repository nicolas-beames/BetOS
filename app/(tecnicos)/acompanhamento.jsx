import { useMemo, useEffect, useState } from "react";
import {
    View,
    Text,
    Pressable,
    ScrollView,
    StyleSheet,
    Alert,
    Modal,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import Logo from "../../components/Logo";
import DropdownComponent from "../../components/DropdownMenu";
import { useTheme } from "../../hooks/useTheme";
import { equipamentosAPI } from "../../utils/api";

export default function ListaEquipamentos() {
    const { agendamento, osId } = useLocalSearchParams();
    const { styles, theme } = useTheme();
    const router = useRouter();

    // Tipos válidos de equipamento conforme a API
    const tiposEquipamento = [
        { label: "Check Stands e Mobilias", value: "CHECK_STANDS_MOBILIAS" },
        { label: "Check Outs", value: "CHECK_OUTS" },
        { label: "Gondolas", value: "GONDOLAS" },
        { label: "Rack Integrado", value: "RACK_INTEGRADO" },
        { label: "Refrigeração Máquina Acoplada", value: "REFRIGERACAO_MAQUINA_ACOPLADA" },
        { label: "Eletrofrio", value: "ELETROFRIO" },
    ];

    const agendamentoData = useMemo(() => {
        if (!agendamento) {
            return null;
        }

        try {
            return typeof agendamento === "string" ? JSON.parse(agendamento) : agendamento;
        } catch (e) {
            console.error("Erro ao deserializar agendamento:", e);
            return null;
        }
    }, [agendamento]);

    const [equipamentos, setEquipamentos] = useState(agendamentoData?.equipamento || []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [savingEquipamento, setSavingEquipamento] = useState(false);
    const [novoEquipamento, setNovoEquipamento] = useState({
        nome: "",
        tipo: "",
        num_serie: "",
    });

    useEffect(() => {
        setEquipamentos(agendamentoData?.equipamento || []);
    }, [agendamentoData]);

    const numeroOS = agendamentoData?.numero_os || osId || "N/A";
    const dataAberturaDate = agendamentoData?.data_abertura
        ? new Date(agendamentoData.data_abertura)
        : null;
    const dataAbertFormat =
        dataAberturaDate && !Number.isNaN(dataAberturaDate.getTime())
            ? dataAberturaDate.toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
              })
            : "N/A";

    const handleChangeNovoEquipamento = (field, value) => {
        setNovoEquipamento((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const resetNovoEquipamento = () => {
        setNovoEquipamento({
            nome: "",
            tipo: "",
            num_serie: "",
        });
    };

    const fecharModal = () => {
        if (savingEquipamento) {
            return;
        }
        setIsModalVisible(false);
        resetNovoEquipamento();
    };

    const handleCreateEquipamento = async () => {
        const nome = novoEquipamento.nome.trim();
        const tipo = novoEquipamento.tipo.trim();
        const numSerie = novoEquipamento.num_serie.trim();

        if (!nome) {
            Alert.alert("Validação", "Informe o nome do equipamento.");
            return;
        }

        if (!tipo) {
            Alert.alert("Validação", "Informe o tipo do equipamento.");
            return;
        }

        if (!numSerie) {
            Alert.alert("Validação", "Informe o número de série do equipamento.");
            return;
        }

        // Valida se numero_os está disponível
        const numeroOSValue = agendamentoData?.numero_os || osId;
        if (!numeroOSValue || numeroOSValue === "N/A") {
            Alert.alert("Validação", "Não foi possível identificar a OS. Tente novamente.");
            return;
        }

        // Converte numero_os para número se for string
        const numeroOSNumber = typeof numeroOSValue === 'string' 
            ? (numeroOSValue.match(/\d+/) ? Number(numeroOSValue.match(/\d+/)[0]) : null)
            : Number(numeroOSValue);

        if (!numeroOSNumber || isNaN(numeroOSNumber)) {
            Alert.alert("Validação", "Número da OS inválido. Tente novamente.");
            return;
        }

        const payload = {
            nome,
            tipo,
            num_serie: numSerie,
            numero_os: numeroOSNumber,
        };

        try {
            setSavingEquipamento(true);
            console.log("Criando equipamento com payload:", JSON.stringify(payload, null, 2));
            const response = await equipamentosAPI.createEquipamento(payload);
            console.log("Resposta da API:", response);
            const created = response?.data?.data || response?.data || payload;

            setEquipamentos((prev) => [...prev, { ...payload, ...created }]);
            Alert.alert("Sucesso", "Equipamento criado com sucesso!");
            setIsModalVisible(false);
            resetNovoEquipamento();
        } catch (error) {
            console.error("Erro ao criar equipamento:", error);
            console.error("Detalhes do erro:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            
            let errorMessage = error.message || "Não foi possível criar o equipamento. Tente novamente.";
            
            if (error.response?.data) {
                const errorData = error.response.data;
                if (errorData.message) {
                    errorMessage = errorData.message;
                } else if (errorData.error) {
                    errorMessage = errorData.error;
                } else if (typeof errorData === 'string') {
                    errorMessage = errorData;
                }
            }
            
            Alert.alert("Erro", errorMessage);
        } finally {
            setSavingEquipamento(false);
        }
    };

    return (
        <SafeAreaView style={[styles.container, local.container]}>
            <Logo style={{ width: 80, height: 40 }} />
            <ThemedText title={true}>Acompanhamento da OS</ThemedText>

            <View style={local.headerRow}>
                <View style={{ flex: 1 }}>
                    <Text style={local.osInfo}>O.S. NÚMERO: {numeroOS}</Text>
                    <Text style={local.osInfo}>DATA ABERTURA: {dataAbertFormat}</Text>
                </View>

                <ThemedButton
                    text="Adicionar equipamento"
                    action={() => setIsModalVisible(true)}
                    disabled={savingEquipamento}
                    style={{ paddingHorizontal: 16, minWidth: 180, marginLeft: 16 }}
                />
            </View>

            <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                {equipamentos.length === 0 ? (
                    <View style={local.emptyState}>
                        <ThemedText>Nenhum equipamento cadastrado.</ThemedText>
                    </View>
                ) : (
                    equipamentos.map((equip, index) => {
                        const key = equip.id_equipamento || equip.num_serie || index;
                        return (
                            <Pressable
                                key={key}
                                style={local.card}
                                onPress={() =>
                                    router.push({
                                        pathname: `/${equip.num_serie}`,
                                        params: {
                                            osId: numeroOS,
                                            equipamento: JSON.stringify(equip), // Serializa o objeto como JSON string
                                        },
                                    })
                                }
                            >
                                <Text style={local.cardTitle}>{equip.tipo || "Equipamento"}</Text>
                                <Text style={local.cardSubtitle}>
                                    Nº de Série: {equip.num_serie || "N/A"}
                                </Text>
                                {equip.fabricante && (
                                    <Text style={local.cardSubtitle}>Fabricante: {equip.fabricante}</Text>
                                )}
                                {equip.modelo && (
                                    <Text style={local.cardSubtitle}>Modelo: {equip.modelo}</Text>
                                )}
                            </Pressable>
                        );
                    })
                )}
            </ScrollView>

            <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                onRequestClose={fecharModal}
            >
                <View style={local.modalOverlay}>
                    <View style={[styles.card, local.modalContent]}>
                        <ThemedText title={true} style={{ marginBottom: 16 }}>
                            Adicionar equipamento
                        </ThemedText>

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{ gap: 12 }}
                        >
                            <View>
                                <ThemedText style={local.modalLabel}>Nome *</ThemedText>
                                <TextInput
                                    value={novoEquipamento.nome}
                                    onChangeText={(value) => handleChangeNovoEquipamento("nome", value)}
                                    placeholder="Ex: Refrigerador Industrial"
                                    style={[styles.input, local.inputFullWidth]}
                                />
                            </View>

                            <View>
                                <ThemedText style={local.modalLabel}>Tipo *</ThemedText>
                                <DropdownComponent
                                    data={tiposEquipamento}
                                    selectedValue={novoEquipamento.tipo}
                                    onValueChange={(value) => handleChangeNovoEquipamento("tipo", value)}
                                    placeholder="Selecione o tipo de equipamento"
                                />
                            </View>

                            <View>
                                <ThemedText style={local.modalLabel}>Número de série *</ThemedText>
                                <TextInput
                                    value={novoEquipamento.num_serie}
                                    onChangeText={(value) =>
                                        handleChangeNovoEquipamento("num_serie", value)
                                    }
                                    placeholder="Informe o número de série"
                                    style={[styles.input, local.inputFullWidth]}
                                />
                            </View>

                            {savingEquipamento && (
                                <ActivityIndicator
                                    size="small"
                                    color={theme.colors.primary}
                                    style={{ marginTop: 8 }}
                                />
                            )}
                        </ScrollView>

                        <View style={local.modalActions}>
                            <ThemedButton
                                text="Cancelar"
                                action={fecharModal}
                                disabled={savingEquipamento}
                                style={{
                                    flex: 1,
                                    backgroundColor: theme.defaultColors.grey300,
                                    marginRight: 8,
                                }}
                            />
                            <ThemedButton
                                text={savingEquipamento ? "Salvando..." : "Salvar"}
                                action={handleCreateEquipamento}
                                disabled={savingEquipamento}
                                style={{ flex: 1, marginLeft: 8 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const local = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 20,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
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
    emptyState: {
        paddingVertical: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        padding: 16,
        justifyContent: "center",
    },
    modalContent: {
        margin: 0,
        width: "100%",
        maxHeight: "90%",
        alignSelf: "center",
        paddingBottom: 16,
    },
    modalLabel: {
        marginBottom: 4,
        color: "#444",
    },
    inputFullWidth: {
        width: "100%",
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});
