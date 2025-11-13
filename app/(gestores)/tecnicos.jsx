import React, { useState, useEffect } from "react";
import { FlatList, View, ScrollView, ActivityIndicator, Alert, Modal, TextInput, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import ThemedView from "../../components/ThemedView";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedInput from "../../components/ThemedInput";
import DashboardCard from "../../components/DashboardCard";
import { tecnicosAPI } from "../../utils/api";

const TechnicianChart = ({ data, title = "Estatísticas dos Técnicos", height = 200 }) => {
    const { styles } = useTheme();
    const maxValue = Math.max(...data.map(item => item.value));

    return (
        <ThemedView style={{
            marginVertical: 20,
            padding: 15,
            borderRadius: 8,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        }}>
            <ThemedText style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 15
            }}>
                {title}
            </ThemedText>

            {/* Container do Gráfico */}
            <View style={{
                height: height,
                position: 'relative',
                paddingBottom: 30,
            }}>
                {/* Container das Barras */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-around',
                    height: height - 30,
                    paddingHorizontal: 10,
                }}>
                    {data.map((item, index) => {
                        const barHeight = maxValue > 0 ? (item.value / maxValue) * (height - 60) : 10;
                        const colors = ['#4A90E2', '#50C878', '#FF6B6B', '#FFD93D', '#6C5CE7', '#A29BFE'];

                        return (
                            <View key={index} style={{
                                alignItems: 'center',
                                flex: 1,
                                maxWidth: 80,
                            }}>
                                {/* Valor acima da barra */}
                                <ThemedText style={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    marginBottom: 5,
                                }}>
                                    {item.value}
                                </ThemedText>

                                {/* Barra */}
                                <View style={{
                                    width: 30,
                                    height: Math.max(barHeight, 10),
                                    backgroundColor: colors[index % colors.length],
                                    borderRadius: 4,
                                    marginBottom: 8,
                                }} />

                                {/* Label */}
                                <ThemedText style={{
                                    fontSize: 10,
                                    textAlign: 'center',
                                    lineHeight: 12,
                                }}>
                                    {item.label}
                                </ThemedText>
                            </View>
                        );
                    })}
                </View>
            </View>
        </ThemedView>
    );
};

const SimplePieChart = ({ data, title = "Distribuição" }) => {
    const { styles } = useTheme();
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const colors = ['#4A90E2', '#50C878', '#FF6B6B', '#FFD93D', '#6C5CE7', '#A29BFE'];

    return (
        <ThemedView style={{
            marginVertical: 10,
            padding: 15,
            borderRadius: 8,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        }}>
            <ThemedText style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 15
            }}>
                {title}
            </ThemedText>

            {data.map((item, index) => {
                const percentage = total > 0 ? (item.value / total) * 100 : 0;
                return (
                    <View key={index} style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                        paddingHorizontal: 10,
                    }}>
                        <View style={{
                            width: 16,
                            height: 16,
                            borderRadius: 8,
                            backgroundColor: colors[index % colors.length],
                            marginRight: 10,
                        }} />
                        <View style={{ flex: 1 }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <ThemedText style={{ fontSize: 14 }}>
                                    {item.label}
                                </ThemedText>
                                <ThemedText style={{ fontSize: 12, fontWeight: 'bold' }}>
                                    {percentage.toFixed(1)}%
                                </ThemedText>
                            </View>
                            {/* Barra de progresso visual */}
                            <View style={{
                                height: 4,
                                backgroundColor: '#E0E0E0',
                                borderRadius: 2,
                                marginTop: 4,
                            }}>
                                <View style={{
                                    width: `${percentage}%`,
                                    height: 4,
                                    backgroundColor: colors[index % colors.length],
                                    borderRadius: 2,
                                }} />
                            </View>
                        </View>
                    </View>
                );
            })}
        </ThemedView>
    );
};

const Tecnicos = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [tecnicos, setTecnicos] = useState([]);
    const [error, setError] = useState(null);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [saving, setSaving] = useState(false);
    const [tecnicoSelecionado, setTecnicoSelecionado] = useState(null);
    const [novoTecnico, setNovoTecnico] = useState({
        nome: "",
        cnpj: "",
        login: "",
        senha: "",
        id_gestor: "",
        ativo: true,
    });
    const { logout } = useAuth();
    const { styles, theme } = useTheme();

    useEffect(() => {
        buscarTecnicos();
    }, []);

    const buscarTecnicos = async (searchTerm = "") => {
        try {
            setLoading(true);
            setError(null);

            const params = {};
            if (searchTerm) {
                params.search = searchTerm;
            }

            const response = await tecnicosAPI.getTecnicos(params);
            const tecnicosArray = response.data?.data || [];

            setTecnicos(Array.isArray(tecnicosArray) ? tecnicosArray : []);

        } catch (err) {
            console.error("Erro ao buscar técnicos:", err);
            setError(err.message);
            Alert.alert("Erro", err.message || "Não foi possível carregar os técnicos");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await buscarTecnicos(search);
    };

    const handleSearch = (text) => {
        setSearch(text);
        buscarTecnicos(text);
    };

    const resetNovoTecnico = () => {
        setNovoTecnico({
            nome: "",
            cnpj: "",
            login: "",
            senha: "",
            id_gestor: "",
            ativo: true,
        });
    };

    const handleChangeNovoTecnico = (field, value) => {
        setNovoTecnico((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const fecharModalCriacao = () => {
        setCreateModalVisible(false);
        resetNovoTecnico();
    };

    const fecharModalEdicao = () => {
        setEditModalVisible(false);
        setTecnicoSelecionado(null);
    };

    const handleCreateTecnico = async () => {
        if (!novoTecnico.nome?.trim()) {
            Alert.alert("Validação", "Informe o nome do técnico.");
            return;
        }

        if (!novoTecnico.cnpj?.trim()) {
            Alert.alert("Validação", "Informe o CNPJ do técnico.");
            return;
        }

        if (!novoTecnico.login?.trim()) {
            Alert.alert("Validação", "Informe o login do técnico.");
            return;
        }

        if (!novoTecnico.senha?.trim()) {
            Alert.alert("Validação", "Informe a senha do técnico.");
            return;
        }

        if (novoTecnico.senha.trim().length < 6) {
            Alert.alert("Validação", "A senha deve ter no mínimo 6 caracteres.");
            return;
        }

        if (!novoTecnico.id_gestor?.trim()) {
            Alert.alert("Validação", "Informe o ID do gestor.");
            return;
        }

        const idGestorNumber = Number(novoTecnico.id_gestor);
        if (!Number.isInteger(idGestorNumber) || idGestorNumber <= 0) {
            Alert.alert("Validação", "O ID do gestor deve ser um número inteiro positivo.");
            return;
        }

        const payload = {
            nome: novoTecnico.nome.trim(),
            cnpj: novoTecnico.cnpj.trim(),
            login: novoTecnico.login.trim(),
            senha: novoTecnico.senha.trim(),
            id_gestor: idGestorNumber,
            ativo: novoTecnico.ativo,
        };

        try {
            setSaving(true);
            console.log("Criando técnico com payload:", JSON.stringify(payload, null, 2));
            const response = await tecnicosAPI.createTecnico(payload);
            console.log("Resposta da API:", response);
            Alert.alert("Sucesso", "Técnico criado com sucesso!");
            fecharModalCriacao();
            await buscarTecnicos(search);
        } catch (err) {
            console.error("Erro ao criar técnico:", err);
            console.error("Detalhes do erro:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });

            let errorMessage = err.message || "Não foi possível criar o técnico. Tente novamente.";

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

    const abrirModalEdicao = (tecnico) => {
        setTecnicoSelecionado(tecnico);
        setNovoTecnico({
            nome: tecnico.nome || "",
            cnpj: tecnico.cnpj || "",
            login: tecnico.login || "",
            senha: "", // Não preenche senha por segurança
            id_gestor: tecnico.id_gestor?.toString() || "",
            ativo: tecnico.ativo !== undefined ? tecnico.ativo : true,
        });
        setEditModalVisible(true);
    };

    const handleUpdateTecnico = async () => {
        if (!tecnicoSelecionado) {
            return;
        }

        const payload = {};

        if (novoTecnico.nome?.trim()) {
            payload.nome = novoTecnico.nome.trim();
        }
        if (novoTecnico.cnpj?.trim()) {
            payload.cnpj = novoTecnico.cnpj.trim();
        }
        if (novoTecnico.login?.trim()) {
            payload.login = novoTecnico.login.trim();
        }
        if (novoTecnico.senha?.trim()) {
            if (novoTecnico.senha.trim().length < 6) {
                Alert.alert("Validação", "A senha deve ter no mínimo 6 caracteres.");
                return;
            }
            payload.senha = novoTecnico.senha.trim();
        }
        if (novoTecnico.id_gestor?.trim()) {
            const idGestorNumber = Number(novoTecnico.id_gestor);
            if (!Number.isInteger(idGestorNumber) || idGestorNumber <= 0) {
                Alert.alert("Validação", "O ID do gestor deve ser um número inteiro positivo.");
                return;
            }
            payload.id_gestor = idGestorNumber;
        }
        if (novoTecnico.ativo !== undefined) {
            payload.ativo = novoTecnico.ativo;
        }

        if (Object.keys(payload).length === 0) {
            Alert.alert("Validação", "Informe pelo menos um campo para atualizar.");
            return;
        }

        try {
            setSaving(true);
            console.log("Atualizando técnico com payload:", JSON.stringify(payload, null, 2));
            const response = await tecnicosAPI.updateTecnico(tecnicoSelecionado.id_tecnico, payload);
            console.log("Resposta da API:", response);
            Alert.alert("Sucesso", "Técnico atualizado com sucesso!");
            fecharModalEdicao();
            await buscarTecnicos(search);
        } catch (err) {
            console.error("Erro ao atualizar técnico:", err);
            console.error("Detalhes do erro:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });

            let errorMessage = err.message || "Não foi possível atualizar o técnico. Tente novamente.";

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

    const formatarDadosTecnico = (tecnico) => {
        return [
            { label: "CNPJ: ", text: tecnico.cnpj || "N/A" },
            { label: "LOGIN: ", text: tecnico.login || "N/A" },
            { label: "GESTOR ID: ", text: tecnico.id_gestor?.toString() || "N/A" },
            { label: "STATUS: ", text: tecnico.ativo ? "Ativo" : "Inativo" },
        ];
    };

    // Calcular estatísticas dos técnicos
    const calcularEstatisticas = () => {
        const ativos = tecnicos.filter(t => t.ativo).length;
        const inativos = tecnicos.filter(t => !t.ativo).length;
        return [
            { label: 'Ativos', value: ativos },
            { label: 'Inativos', value: inativos },
        ];
    };

    const estatisticas = calcularEstatisticas();

    // Mostra loading enquanto busca os dados
    if (loading && tecnicos.length === 0) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#0B4D8E" />
                <ThemedText style={{ marginTop: 10 }}>Carregando técnicos...</ThemedText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ThemedView style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    alignSelf: 'center',
                    width: '100%'
                }}>
                    <ThemedText title={true}>Técnicos</ThemedText>

                    <ThemedButton
                        text="+"
                        style={{ width: 50 }}
                        action={() => setCreateModalVisible(true)}
                        disabled={saving}
                    />
                </ThemedView>

                {error && (
                    <View style={{ padding: 10, backgroundColor: "#ffebee", borderRadius: 5, marginBottom: 10, width: "100%" }}>
                        <ThemedText style={{ color: "#c62828" }}>{error}</ThemedText>
                    </View>
                )}

                <ThemedView style={{ width: '100%', alignSelf: 'flex-start' }}>
                    <ThemedInput
                        label={"Pesquisa"}
                        value={search}
                        onChangeText={handleSearch}
                        placeholder={"Digite o nome do técnico"}
                    />

                    {tecnicos.length === 0 && !loading ? (
                        <View style={{ padding: 20, alignItems: "center" }}>
                            <ThemedText>Nenhum técnico encontrado</ThemedText>
                        </View>
                    ) : (
                        <>
                            {tecnicos.map((tecnico, index) => (
                                <View key={tecnico.id_tecnico || index} style={{ marginBottom: 12 }}>
                                    <DashboardCard
                                        title={tecnico.nome || "Técnico sem nome"}
                                        contentArray={formatarDadosTecnico(tecnico)}
                                        buttonText="Editar"
                                        buttonAction={() => abrirModalEdicao(tecnico)}
                                    />
                                </View>
                            ))}
                        </>
                    )}

                    {estatisticas.some(s => s.value > 0) && (
                        <>
                            <SimplePieChart
                                data={estatisticas}
                                title="Status dos Técnicos"
                            />
                        </>
                    )}
                </ThemedView>
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
                            Criar novo técnico
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
                                    value={novoTecnico.nome}
                                    onChangeText={(value) => handleChangeNovoTecnico("nome", value)}
                                    placeholder="Informe o nome do técnico"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>CNPJ *</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoTecnico.cnpj}
                                    onChangeText={(value) => handleChangeNovoTecnico("cnpj", value)}
                                    placeholder="Ex: 98.765.432/0001-10"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Login *</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoTecnico.login}
                                    onChangeText={(value) => handleChangeNovoTecnico("login", value)}
                                    placeholder="Informe o login do técnico"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Senha * (mín. 6 caracteres)</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoTecnico.senha}
                                    onChangeText={(value) => handleChangeNovoTecnico("senha", value)}
                                    placeholder="Informe a senha"
                                    secureTextEntry
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>ID do Gestor *</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoTecnico.id_gestor}
                                    onChangeText={(value) => handleChangeNovoTecnico("id_gestor", value)}
                                    placeholder="Informe o ID do gestor"
                                    keyboardType="number-pad"
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
                                    value={novoTecnico.ativo}
                                    onValueChange={(value) => handleChangeNovoTecnico("ativo", value)}
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
                                    action={handleCreateTecnico}
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
                            Editar técnico
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
                                    value={novoTecnico.nome}
                                    onChangeText={(value) => handleChangeNovoTecnico("nome", value)}
                                    placeholder="Informe o nome do técnico"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>CNPJ</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoTecnico.cnpj}
                                    onChangeText={(value) => handleChangeNovoTecnico("cnpj", value)}
                                    placeholder="Ex: 98.765.432/0001-10"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Login</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoTecnico.login}
                                    onChangeText={(value) => handleChangeNovoTecnico("login", value)}
                                    placeholder="Informe o login do técnico"
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>Nova Senha (deixe em branco para manter a atual)</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoTecnico.senha}
                                    onChangeText={(value) => handleChangeNovoTecnico("senha", value)}
                                    placeholder="Informe a nova senha (mín. 6 caracteres)"
                                    secureTextEntry
                                />
                            </View>

                            <View>
                                <ThemedText style={{ marginBottom: 4 }}>ID do Gestor</ThemedText>
                                <TextInput
                                    style={[styles.input, { width: "100%" }]}
                                    value={novoTecnico.id_gestor}
                                    onChangeText={(value) => handleChangeNovoTecnico("id_gestor", value)}
                                    placeholder="Informe o ID do gestor"
                                    keyboardType="number-pad"
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
                                    value={novoTecnico.ativo}
                                    onValueChange={(value) => handleChangeNovoTecnico("ativo", value)}
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
                                    action={handleUpdateTecnico}
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

export default Tecnicos;
