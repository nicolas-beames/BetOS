import { useEffect, useState } from "react";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import DashboardCard from "../../components/DashboardCard";
import { ScrollView, View, RefreshControl, Pressable, ActivityIndicator, Alert, Modal, TextInput, Switch } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme.jsx";
import { agendamentosAPI } from "../../utils/api";

const Agendamentos = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [agendamentos, setAgendamentos] = useState([]);
    const [error, setError] = useState(null);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [creatingOS, setCreatingOS] = useState(false);
    const [novaOS, setNovaOS] = useState({
        id_cliente: "",
        id_tecnico: "",
        custos: "",
        defeitos: "",
        observacoes: "",
        finalizada: false,
    });
    const { auth, logout } = useAuth();
    const router = useRouter();
    const { styles, theme } = useTheme();

    useEffect(() => {
        if (!auth.isTecnico) {
            router.replace("/");
        } else {
            // Busca agendamentos quando o componente é montado
            buscarAgendamentos();
        }
    }, [auth]);

    /**
     * Função para buscar agendamentos da API
     * Exemplo de GET request
     */
    const buscarAgendamentos = async () => {
        try {
            setLoading(true);
            setError(null);

            // Exemplo 1: Usando a função específica do utilitário
            // Substitua "tecnico123" pelo ID real do técnico logado
            const tecnicoId = "tecnico123"; // Você pode pegar isso do contexto de auth
            const response = await agendamentosAPI.getAgendamentos(tecnicoId);
            // A resposta vem no formato { data: { data: [...] }, status }
            console.log("retorno da API:: ", JSON.stringify(response));
            console.log("typeof do retorno da API: ", typeof response);
            
            // A estrutura é: response.data.data = array de agendamentos
            const agendamentosArray = response.data?.data || [];
            console.log("Array de agendamentos:", agendamentosArray);
            console.log("Quantidade de agendamentos:", agendamentosArray.length);
            
            // Iterar sobre todos os agendamentos
            agendamentosArray.forEach((agendamento, index) => {
                console.log(`\n=== Agendamento ${index + 1} ===`);
                console.log("Número OS:", agendamento.numero_os);
                console.log("Custos:", agendamento.custos);
                console.log("Data abertura:", agendamento.data_abertura);
                console.log("Cliente:", agendamento.cliente?.nome || "N/A");
                console.log("Telefone:", agendamento.cliente?.telefone || "N/A");
                console.log("Técnico:", agendamento.tecnico?.nome || "N/A");
                console.log("Rua:", agendamento.rua || "N/A");
                console.log("CEP:", agendamento.cep || "N/A");
                console.log("Número:", agendamento.numero || "N/A");
                console.log("Complemento:", agendamento.complemento || "N/A");
            });
            
            setAgendamentos(Array.isArray(agendamentosArray) ? agendamentosArray : []);

        } catch (err) {
            console.error("Erro ao buscar agendamentos:", err);
            setError(err.message);
            Alert.alert("Erro", err.message || "Não foi possível carregar os agendamentos");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    /**
     * Exemplo de função para enviar dados para a API (POST)
     */
    const criarAgendamento = async (dadosAgendamento) => {
        try {
            setLoading(true);

            // Exemplo de dados que você pode enviar
            const novoAgendamento = {
                tecnicoId: "tecnico123",
                clienteId: dadosAgendamento.clienteId,
                dataAgendamento: dadosAgendamento.data,
                observacoes: dadosAgendamento.observacoes,
                // ... outros campos
            };

            const response = await agendamentosAPI.createAgendamento(novoAgendamento);

            console.log("Agendamento criado:", response.data);
            Alert.alert("Sucesso", "Agendamento criado com sucesso!");

            // Atualiza a lista após criar
            await buscarAgendamentos();
            return response.data;
        } catch (err) {
            console.error("Erro ao criar agendamento:", err);
            Alert.alert("Erro", err.message || "Não foi possível criar o agendamento");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetNovaOS = () => {
        setNovaOS({
            id_cliente: "",
            id_tecnico: "",
            custos: "",
            defeitos: "",
            observacoes: "",
            finalizada: false,
        });
    };

    const handleChangeNovaOS = (field, value) => {
        setNovaOS((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const fecharModalCriacao = () => {
        setCreateModalVisible(false);
        resetNovaOS();
    };

    const handleCreateOS = async () => {
        if (!novaOS.id_cliente) {
            Alert.alert("Validação", "Informe o ID do cliente.");
            return;
        }

        const idClienteNumber = Number(novaOS.id_cliente);
        if (!Number.isInteger(idClienteNumber) || idClienteNumber <= 0) {
            Alert.alert("Validação", "O ID do cliente deve ser um número inteiro positivo.");
            return;
        }

        const payload = {
            id_cliente: idClienteNumber,
            finalizada: novaOS.finalizada ? "Y" : "N",
        };

        if (novaOS.id_tecnico) {
            const idTecnicoNumber = Number(novaOS.id_tecnico);
            if (!Number.isInteger(idTecnicoNumber) || idTecnicoNumber <= 0) {
                Alert.alert("Validação", "O ID do técnico deve ser um número inteiro positivo.");
                return;
            }
            payload.id_tecnico = idTecnicoNumber;
        }

        if (novaOS.custos) {
            const custosNumber = Number(novaOS.custos);
            if (Number.isNaN(custosNumber) || custosNumber < 0) {
                Alert.alert("Validação", "O custo deve ser um número maior ou igual a zero.");
                return;
            }
            payload.custos = custosNumber;
        }

        if (novaOS.defeitos?.trim()) {
            payload.defeitos = novaOS.defeitos.trim();
        }

        if (novaOS.observacoes?.trim()) {
            payload.observacoes = novaOS.observacoes.trim();
        }

        try {
            setCreatingOS(true);
            console.log("Criando OS com payload:", JSON.stringify(payload, null, 2));
            const response = await agendamentosAPI.createOS(payload);
            console.log("Resposta da API:", response);
            Alert.alert("Sucesso", "OS criada com sucesso!");
            fecharModalCriacao();
            await buscarAgendamentos();
        } catch (err) {
            console.error("Erro ao criar OS:", err);
            console.error("Detalhes do erro:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });
            Alert.alert("Erro", err.message || "Não foi possível criar a OS");
        } finally {
            setCreatingOS(false);
        }
    };

    /**
     * Exemplo de função para atualizar dados (PUT)
     */
    const atualizarAgendamento = async (agendamentoId, dadosAtualizados) => {
        try {
            setLoading(true);

            const response = await agendamentosAPI.updateAgendamento(
                agendamentoId,
                dadosAtualizados
            );

            console.log("Agendamento atualizado:", response.data);
            Alert.alert("Sucesso", "Agendamento atualizado com sucesso!");

            // Atualiza a lista após atualizar
            await buscarAgendamentos();

            return response.data;
        } catch (err) {
            console.error("Erro ao atualizar agendamento:", err);
            Alert.alert("Erro", err.message || "Não foi possível atualizar o agendamento");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Exemplo de função para deletar (DELETE)
     */
    const deletarAgendamento = async (agendamentoId) => {
        try {
            setLoading(true);

            await agendamentosAPI.deleteAgendamento(agendamentoId);

            console.log("Agendamento deletado");
            Alert.alert("Sucesso", "Agendamento deletado com sucesso!");

            // Atualiza a lista após deletar
            await buscarAgendamentos();
        } catch (err) {
            console.error("Erro ao deletar agendamento:", err);
            Alert.alert("Erro", err.message || "Não foi possível deletar o agendamento");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Função de refresh que busca os dados novamente da API
     */
    const handleRefresh = async () => {
        setRefreshing(true);
        await buscarAgendamentos();
    };

    /**
     * Converte os dados da API para o formato esperado pelo DashboardCard
     */
    const formatarDadosAgendamento = (agendamento) => {
        // Verifica se equipamento existe e tem itens antes de acessar
        const equipamentoNome = agendamento?.equipamento && Array.isArray(agendamento.equipamento) && agendamento.equipamento.length > 0
            ? agendamento.equipamento[0].nome
            : "N/A";
        
        return [
            { label: "EQUIP: ", text: equipamentoNome },
            { label: "TEL: ", text: agendamento.cliente?.telefone || "N/A" },
            { label: "CEP: ", text: agendamento.cep || "N/A" },
            { label: "END: ", text: `${agendamento.rua || "N/A"}, Nº ${agendamento.numero || "N/A"}; COMPLEMENTO: ${agendamento.complemento || "N/A"}` },
        ]; 
    };

    const abrirAcompanhamento = (agendamento) => {
        // Serializa o objeto agendamento como JSON string para passar via params
        // O Expo Router só aceita strings nos params
        router.push({
            pathname: "/acompanhamento",
            params: { 
                agendamento: JSON.stringify(agendamento),
                osId: agendamento.numero_os // Mantém também o osId para compatibilidade
            },
        });
    };

    // Mostra loading enquanto busca os dados
    if (loading && agendamentos.length === 0) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#0B4D8E" />
                <ThemedText style={{ marginTop: 10 }}>Carregando agendamentos...</ThemedText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <Pressable onPress={logout} style={{ alignSelf: "flex-start" }}>
                    <ThemedText title={true}>Agendamentos</ThemedText>
                </Pressable>
                <ThemedButton
                    text="Criar OS"
                    action={() => setCreateModalVisible(true)}
                    disabled={creatingOS}
                    style={{ paddingHorizontal: 16, minWidth: 120 }}
                />
            </View>

            {error && (
                <View style={{ padding: 10, backgroundColor: "#ffebee", borderRadius: 5, marginBottom: 10 }}>
                    <ThemedText style={{ color: "#c62828" }}>{error}</ThemedText>
                </View>
            )}

            <ScrollView
                style={{ width: "100%" }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
                {agendamentos.length === 0 && !loading ? (
                    <View style={{ padding: 20, alignItems: "center" }}>
                        <ThemedText>Nenhum agendamento encontrado</ThemedText>
                    </View>
                ) : (
                    agendamentos.map((agendamento, index) => (
                        <DashboardCard
                            key={agendamento.numero_os || index}
                            title={`${agendamento.numero_os} - ${agendamento.cliente?.nome || "N/A"}`}
                            contentArray={formatarDadosAgendamento(agendamento)}
                            buttonText="Abrir"
                            buttonAction={() => abrirAcompanhamento(agendamento)}
                        />
                    ))
                )}

                {/* Exemplo de dados estáticos (fallback) - remova quando a API estiver funcionando */}
                {agendamentos.length === 0 && (
                    <>
                        <DashboardCard
                            key={1}
                            title={"OS000001 - Muffato"}
                            contentArray={[
                                { label: "EQUIPAMENTO: ", text: "XXXXXXX" },
                                { label: "TEL: ", text: "XXXXX-XXXX" },
                                { label: "CIDADE: ", text: "XXXXXXX XX" },
                                { label: "END: ", text: "XXXX, Nº XX; BAIRRO: XXX" },
                            ]}
                            buttonText="Abrir"
                            buttonAction={() => abrirAcompanhamento("OS000001")}
                        />
                    </>
                )}
            </ScrollView>

            <Modal
                visible={createModalVisible}
                transparent
                animationType="slide"
                onRequestClose={fecharModalCriacao}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        justifyContent: "center",
                        padding: 16,
                    }}
                >
                    <View
                        style={[
                            styles.card,
                            {
                                margin: 0,
                                width: "100%",
                                maxHeight: "90%",
                                alignSelf: "center",
                            },
                        ]}
                    >
                        <ThemedText title={true} style={{ marginBottom: 16 }}>
                            Criar nova OS
                        </ThemedText>

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                gap: 12,
                                paddingBottom: 16,
                            }}
                        >
                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>ID do Cliente *</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novaOS.id_cliente}
                                    onChangeText={(value) => handleChangeNovaOS("id_cliente", value)}
                                    keyboardType="number-pad"
                                    placeholder="Informe o ID do cliente"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>ID do Técnico</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novaOS.id_tecnico}
                                    onChangeText={(value) => handleChangeNovaOS("id_tecnico", value)}
                                    keyboardType="number-pad"
                                    placeholder="Informe o ID do técnico (opcional)"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Custos</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novaOS.custos}
                                    onChangeText={(value) => handleChangeNovaOS("custos", value)}
                                    keyboardType="decimal-pad"
                                    placeholder="Informe o custo (opcional)"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Defeitos</ThemedText>
                                <TextInput
                                    style={[
                                        styles.input,
                                        { width: "100%", minHeight: 80, textAlignVertical: "top" },
                                    ]}
                                    value={novaOS.defeitos}
                                    onChangeText={(value) => handleChangeNovaOS("defeitos", value)}
                                    multiline
                                    placeholder="Descreva os defeitos (opcional)"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Observações</ThemedText>
                                <TextInput
                                    style={[
                                        styles.input,
                                        { width: "100%", minHeight: 80, textAlignVertical: "top" },
                                    ]}
                                    value={novaOS.observacoes}
                                    onChangeText={(value) => handleChangeNovaOS("observacoes", value)}
                                    multiline
                                    placeholder="Adicione observações (opcional)"
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <ThemedText>Finalizada</ThemedText>
                                <Switch
                                    value={novaOS.finalizada}
                                    onValueChange={(value) => handleChangeNovaOS("finalizada", value)}
                                    trackColor={{
                                        false: theme.defaultColors.grey400,
                                        true: theme.colors.primary,
                                    }}
                                    thumbColor="#fff"
                                />
                            </View>

                            {creatingOS && (
                                <ActivityIndicator size="small" color={theme.colors.primary} />
                            )}

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    gap: 12,
                                    marginTop: 8,
                                }}
                            >
                                <ThemedButton
                                    text="Cancelar"
                                    action={fecharModalCriacao}
                                    style={{
                                        backgroundColor: theme.defaultColors.grey300,
                                        flex: 1,
                                    }}
                                    disabled={creatingOS}
                                />
                                <ThemedButton
                                    text={creatingOS ? "Criando..." : "Salvar"}
                                    action={handleCreateOS}
                                    disabled={creatingOS}
                                    style={{ flex: 1 }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Agendamentos;
