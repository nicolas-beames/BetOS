import { useState, useEffect } from "react";
import ThemedButton from "../../components/ThemedButton";
import DashboardCard from "../../components/DashboardCard";
import ThemedText from "../../components/ThemedText";
import {
    ScrollView,
    View,
    RefreshControl,
    Pressable,
    ActivityIndicator,
    Alert,
    Modal,
    TextInput,
    Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { clientesAPI } from "../../utils/api";

const Clientes = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(null);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [saving, setSaving] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [novoCliente, setNovoCliente] = useState({
        nome: "",
        cnpj: "",
        cep: "",
        numero: "",
        telefone: "",
        ativo: true,
    });
    const { logout } = useAuth();
    const { styles, theme } = useTheme();

    useEffect(() => {
        buscarClientes();
    }, []);

    const buscarClientes = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await clientesAPI.getClientes();
            const clientesArray = response.data?.data || [];
            
            setClientes(Array.isArray(clientesArray) ? clientesArray : []);

        } catch (err) {
            console.error("Erro ao buscar clientes:", err);
            setError(err.message);
            Alert.alert("Erro", err.message || "Não foi possível carregar os clientes");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await buscarClientes();
    };

    const resetNovoCliente = () => {
        setNovoCliente({
            nome: "",
            cnpj: "",
            cep: "",
            numero: "",
            telefone: "",
            ativo: true,
        });
    };

    const handleChangeNovoCliente = (field, value) => {
        setNovoCliente((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const fecharModalCriacao = () => {
        setCreateModalVisible(false);
        resetNovoCliente();
    };

    const fecharModalEdicao = () => {
        setEditModalVisible(false);
        setClienteSelecionado(null);
    };

    const handleCreateCliente = async () => {
        if (!novoCliente.nome?.trim()) {
            Alert.alert("Validação", "Informe o nome do cliente.");
            return;
        }

        if (!novoCliente.cnpj?.trim()) {
            Alert.alert("Validação", "Informe o CNPJ do cliente.");
            return;
        }

        if (!novoCliente.cep?.trim()) {
            Alert.alert("Validação", "Informe o CEP do cliente.");
            return;
        }

        if (!novoCliente.numero?.trim()) {
            Alert.alert("Validação", "Informe o número do endereço.");
            return;
        }

        if (!novoCliente.telefone?.trim()) {
            Alert.alert("Validação", "Informe o telefone do cliente.");
            return;
        }

        const payload = {
            nome: novoCliente.nome.trim(),
            cnpj: novoCliente.cnpj.trim(),
            cep: novoCliente.cep.trim(),
            numero: novoCliente.numero.trim(),
            telefone: novoCliente.telefone.trim(),
            ativo: novoCliente.ativo,
        };

        try {
            setSaving(true);
            console.log("Criando cliente com payload:", JSON.stringify(payload, null, 2));
            const response = await clientesAPI.createCliente(payload);
            console.log("Resposta da API:", response);
            Alert.alert("Sucesso", "Cliente criado com sucesso!");
            fecharModalCriacao();
            await buscarClientes();
        } catch (err) {
            console.error("Erro ao criar cliente:", err);
            console.error("Detalhes do erro:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });
            
            let errorMessage = err.message || "Não foi possível criar o cliente. Tente novamente.";
            
            if (err.response?.data) {
                const errorData = err.response.data;
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
            setSaving(false);
        }
    };

    const abrirModalEdicao = (cliente) => {
        setClienteSelecionado(cliente);
        setNovoCliente({
            nome: cliente.nome || "",
            cnpj: cliente.cnpj || "",
            cep: cliente.cep || "",
            numero: cliente.numero || "",
            telefone: cliente.telefone || "",
            ativo: cliente.ativo !== undefined ? cliente.ativo : true,
        });
        setEditModalVisible(true);
    };

    const handleUpdateCliente = async () => {
        if (!clienteSelecionado) {
            return;
        }

        const payload = {};
        
        if (novoCliente.nome?.trim()) {
            payload.nome = novoCliente.nome.trim();
        }
        if (novoCliente.cnpj?.trim()) {
            payload.cnpj = novoCliente.cnpj.trim();
        }
        if (novoCliente.cep?.trim()) {
            payload.cep = novoCliente.cep.trim();
        }
        if (novoCliente.numero?.trim()) {
            payload.numero = novoCliente.numero.trim();
        }
        if (novoCliente.telefone?.trim()) {
            payload.telefone = novoCliente.telefone.trim();
        }
        if (novoCliente.ativo !== undefined) {
            payload.ativo = novoCliente.ativo;
        }

        if (Object.keys(payload).length === 0) {
            Alert.alert("Validação", "Informe pelo menos um campo para atualizar.");
            return;
        }

        try {
            setSaving(true);
            console.log("Atualizando cliente com payload:", JSON.stringify(payload, null, 2));
            const response = await clientesAPI.updateCliente(clienteSelecionado.id_cliente, payload);
            console.log("Resposta da API:", response);
            Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
            fecharModalEdicao();
            await buscarClientes();
        } catch (err) {
            console.error("Erro ao atualizar cliente:", err);
            console.error("Detalhes do erro:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });
            
            let errorMessage = err.message || "Não foi possível atualizar o cliente. Tente novamente.";
            
            if (err.response?.data) {
                const errorData = err.response.data;
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
            setSaving(false);
        }
    };

    const formatarDadosCliente = (cliente) => {
        return [
            { label: "CNPJ: ", text: cliente.cnpj || "N/A" },
            { label: "TEL: ", text: cliente.telefone || "N/A" },
            { label: "CEP: ", text: cliente.cep || "N/A" },
            { label: "NÚMERO: ", text: cliente.numero || "N/A" },
            { label: "STATUS: ", text: cliente.ativo ? "Ativo" : "Inativo" },
        ];
    };

    // Mostra loading enquanto busca os dados
    if (loading && clientes.length === 0) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#0B4D8E" />
                <ThemedText style={{ marginTop: 10 }}>Carregando clientes...</ThemedText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingTop: 40,
                    paddingLeft: 30,
                    paddingRight: 20,
                },
            ]}
        >
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                }}
            >
                <Pressable onPress={logout}>
                    <ThemedText style={{ paddingTop: 20, paddingBottom: 20 }} title={true}>
                        Clientes
                    </ThemedText>
                </Pressable>
                <ThemedButton
                    text="+ Novo"
                    action={() => setCreateModalVisible(true)}
                    disabled={saving}
                    style={{ paddingHorizontal: 16, minWidth: 100 }}
                />
            </View>

            {error && (
                <View style={{ padding: 10, backgroundColor: "#ffebee", borderRadius: 5, marginBottom: 10, width: "100%" }}>
                    <ThemedText style={{ color: "#c62828" }}>{error}</ThemedText>
                </View>
            )}

            <ScrollView
                style={{ width: "100%" }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                {clientes.length === 0 && !loading ? (
                    <View style={{ padding: 20, alignItems: "center" }}>
                        <ThemedText>Nenhum cliente encontrado</ThemedText>
                    </View>
                ) : (
                    clientes.map((cliente, index) => (
                        <DashboardCard
                            key={cliente.id_cliente || index}
                            title={cliente.nome || "Cliente sem nome"}
                            contentArray={formatarDadosCliente(cliente)}
                            buttonText="Editar"
                            buttonAction={() => abrirModalEdicao(cliente)}
                        />
                    ))
                )}
            </ScrollView>

            {/* Modal de Criação */}
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
                            Criar novo cliente
                        </ThemedText>

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                gap: 12,
                                paddingBottom: 16,
                            }}
                        >
                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Nome *</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.nome}
                                    onChangeText={(value) => handleChangeNovoCliente("nome", value)}
                                    placeholder="Informe o nome do cliente"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>CNPJ *</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.cnpj}
                                    onChangeText={(value) => handleChangeNovoCliente("cnpj", value)}
                                    placeholder="Ex: 12.345.678/0001-90"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>CEP *</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.cep}
                                    onChangeText={(value) => handleChangeNovoCliente("cep", value)}
                                    placeholder="Ex: 12345-678"
                                    keyboardType="numeric"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Número *</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.numero}
                                    onChangeText={(value) => handleChangeNovoCliente("numero", value)}
                                    placeholder="Informe o número do endereço"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Telefone *</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.telefone}
                                    onChangeText={(value) => handleChangeNovoCliente("telefone", value)}
                                    placeholder="Ex: (11) 98765-4321"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <ThemedText>Ativo</ThemedText>
                                <Switch
                                    value={novoCliente.ativo}
                                    onValueChange={(value) => handleChangeNovoCliente("ativo", value)}
                                    trackColor={{
                                        false: theme.defaultColors.grey400,
                                        true: theme.colors.primary,
                                    }}
                                    thumbColor="#fff"
                                />
                            </View>

                            {saving && (
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
                                    disabled={saving}
                                />
                                <ThemedButton
                                    text={saving ? "Salvando..." : "Salvar"}
                                    action={handleCreateCliente}
                                    disabled={saving}
                                    style={{ flex: 1 }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Modal de Edição */}
            <Modal
                visible={editModalVisible}
                transparent
                animationType="slide"
                onRequestClose={fecharModalEdicao}
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
                            Editar cliente
                        </ThemedText>

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                gap: 12,
                                paddingBottom: 16,
                            }}
                        >
                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Nome</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.nome}
                                    onChangeText={(value) => handleChangeNovoCliente("nome", value)}
                                    placeholder="Informe o nome do cliente"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>CNPJ</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.cnpj}
                                    onChangeText={(value) => handleChangeNovoCliente("cnpj", value)}
                                    placeholder="Ex: 12.345.678/0001-90"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>CEP</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.cep}
                                    onChangeText={(value) => handleChangeNovoCliente("cep", value)}
                                    placeholder="Ex: 12345-678"
                                    keyboardType="numeric"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Número</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.numero}
                                    onChangeText={(value) => handleChangeNovoCliente("numero", value)}
                                    placeholder="Informe o número do endereço"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Telefone</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoCliente.telefone}
                                    onChangeText={(value) => handleChangeNovoCliente("telefone", value)}
                                    placeholder="Ex: (11) 98765-4321"
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <ThemedText>Ativo</ThemedText>
                                <Switch
                                    value={novoCliente.ativo}
                                    onValueChange={(value) => handleChangeNovoCliente("ativo", value)}
                                    trackColor={{
                                        false: theme.defaultColors.grey400,
                                        true: theme.colors.primary,
                                    }}
                                    thumbColor="#fff"
                                />
                            </View>

                            {saving && (
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
                                    action={fecharModalEdicao}
                                    style={{
                                        backgroundColor: theme.defaultColors.grey300,
                                        flex: 1,
                                    }}
                                    disabled={saving}
                                />
                                <ThemedButton
                                    text={saving ? "Salvando..." : "Salvar"}
                                    action={handleUpdateCliente}
                                    disabled={saving}
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

export default Clientes;
