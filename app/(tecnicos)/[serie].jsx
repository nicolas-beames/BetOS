import { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import DropdownComponent from "../../components/DropdownMenu";
import ThemedText from "../../components/ThemedText";
import Logo from "../../components/Logo";
import { useTheme } from "../../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { apiRequest } from "../../utils/api";

export default function Acompanhamento() {
    const { osId, equipamento } = useLocalSearchParams();
    const { styles: theme } = useTheme();

    // Deserializa o objeto equipamento se foi passado como JSON
    let equipamentoData = null;
    if (equipamento) {
        try {
            // Se equipamento já é um objeto (caso raro), usa diretamente
            // Caso contrário, tenta fazer parse do JSON string
            if (typeof equipamento === 'string') {
                equipamentoData = JSON.parse(equipamento);
            } else {
                equipamentoData = equipamento;
            }
        } catch (e) {
            console.error('Erro ao deserializar equipamento:', e);
        }
    }

    console.log('EQUIPAMENTO: ', equipamentoData);
    
        
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

    /** @type {Array<{ peca: string; defeito: string; id_defeito?: number }>} */
    const [defeitosSelecionados, setDefeitosSelecionados] = useState([
        { peca: "", defeito: "" },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDefeitos, setIsLoadingDefeitos] = useState(false);

    const adicionarDefeito = () => {
        setDefeitosSelecionados((prev) => [...prev, { peca: "", defeito: "" }]);
    };

    const removerDefeito = async (index) => {
        const defeito = defeitosSelecionados[index];
        
        // Se o defeito tem ID (existe no banco), pergunta se quer deletar
        if (defeito.id_defeito) {
            Alert.alert(
                "Confirmar exclusão",
                "Deseja realmente excluir este defeito do banco de dados?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel",
                    },
                    {
                        text: "Excluir",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                setIsLoading(true);
                                
                                // Garante que o ID seja um número
                                const defeitoId = Number(defeito.id_defeito);
                                
                                if (!defeitoId || isNaN(defeitoId)) {
                                    throw new Error("ID do defeito inválido");
                                }
                                
                                console.log("Deletando defeito com ID:", defeitoId);
                                console.log("URL completa será:", `/defeitos/${defeitoId}`);
                                
                                const response = await apiRequest(`/defeitos/${defeitoId}`, {
                                    method: "DELETE",
                                    // Não envia data para DELETE - o interceptor remove Content-Type automaticamente
                                });
                                
                                // A API retorna 204 (sem corpo) em caso de sucesso
                                // Qualquer status 2xx é considerado sucesso
                                if (response.status >= 200 && response.status < 300) {
                                    // Remove da lista após deletar
                                    setDefeitosSelecionados((prev) => prev.filter((_, i) => i !== index));
                                    Alert.alert("Sucesso", "Defeito excluído com sucesso!");
                                } else {
                                    throw new Error(`Resposta inesperada do servidor: ${response.status}`);
                                }
                            } catch (error) {
                                console.error("Erro ao deletar defeito:", error);
                                console.error("Detalhes do erro:", {
                                    message: error.message,
                                    response: error.response?.data,
                                    status: error.response?.status,
                                    id_defeito: defeito.id_defeito,
                                    error_full: error.response
                                });
                                
                                // Mensagem de erro mais detalhada
                                let mensagemErro = error.message || "Não foi possível excluir o defeito.";
                                
                                // Tenta pegar mensagem mais específica do servidor
                                if (error.response?.data) {
                                    const errorData = error.response.data;
                                    if (errorData.message) {
                                        mensagemErro = errorData.message;
                                    } else if (errorData.error) {
                                        mensagemErro = errorData.error;
                                    } else if (typeof errorData === 'string') {
                                        mensagemErro = errorData;
                                    }
                                }
                                
                                if (error.response?.status === 500) {
                                    mensagemErro = `Erro interno do servidor (500).\n\nID do defeito: ${defeito.id_defeito}\n\nVerifique os logs do servidor para mais detalhes.`;
                                }
                                
                                Alert.alert("Erro", mensagemErro);
                            } finally {
                                setIsLoading(false);
                            }
                        },
                    },
                ]
            );
        } else {
            // Se não tem ID, apenas remove da lista (ainda não foi salvo)
            setDefeitosSelecionados((prev) => prev.filter((_, i) => i !== index));
        }
    };

    const atualizarDefeito = (index, campo, valor) => {
        setDefeitosSelecionados((prev) => {
            const novos = [...prev];
            novos[index][campo] = valor;
            return novos;
        });
    };

    // Carrega defeitos existentes do equipamento
    useEffect(() => {
        const carregarDefeitos = async () => {
            if (!equipamentoData || !equipamentoData.id_equipamento) {
                return;
            }

            setIsLoadingDefeitos(true);
            try {
                // Busca defeitos do equipamento
                // Assumindo que a API aceita query param id_equipamento ou tem endpoint específico
                const response = await apiRequest("/defeitos", {
                    method: "GET",
                    params: { id_equipamento: equipamentoData.id_equipamento },
                });

                // A resposta pode vir em diferentes formatos, ajuste conforme sua API
                const defeitosArray = response.data?.data || response.data || [];
                
                if (Array.isArray(defeitosArray) && defeitosArray.length > 0) {
                    // Mapeia os defeitos do banco para o formato do estado
                    const defeitosMapeados = defeitosArray.map((defeito) => ({
                        id_defeito: defeito.id_defeito,
                        peca: defeito.peca || "",
                        defeito: defeito.defeito || "",
                    }));
                    
                    // Adiciona um campo vazio no final para permitir adicionar novos defeitos
                    setDefeitosSelecionados([...defeitosMapeados, { peca: "", defeito: "" }]);
                } else {
                    // Se não houver defeitos, mantém um campo vazio para adicionar
                    setDefeitosSelecionados([{ peca: "", defeito: "" }]);
                }
            } catch (error) {
                console.error("Erro ao carregar defeitos:", error);
                // Em caso de erro, mantém o estado inicial
                // Não mostra alerta para não incomodar o usuário se não houver defeitos
            } finally {
                setIsLoadingDefeitos(false);
            }
        };

        carregarDefeitos();
    }, [equipamentoData?.id_equipamento]);

    const registrarDefeitos = async () => {
        // Validação: verifica se há equipamento
        if (!equipamentoData || !equipamentoData.id_equipamento) {
            Alert.alert("Erro", "Equipamento não encontrado. Não é possível registrar defeitos.");
            return;
        }

        // Validação: filtra apenas defeitos com peça e defeito preenchidos
        const defeitosValidos = defeitosSelecionados.filter(
            (defeito) => defeito.peca && defeito.defeito
        );

        if (defeitosValidos.length === 0) {
            Alert.alert("Atenção", "Por favor, preencha pelo menos um defeito com peça e defeito.");
            return;
        }

        setIsLoading(true);

        try {
            // Separa defeitos existentes (com id_defeito) dos novos (sem id_defeito)
            const defeitosParaAtualizar = defeitosValidos.filter((d) => d.id_defeito);
            const defeitosParaCriar = defeitosValidos.filter((d) => !d.id_defeito);

            const promessas = [];

            // Atualiza defeitos existentes
            defeitosParaAtualizar.forEach((defeito) => {
                promessas.push(
                    apiRequest(`/defeitos/${defeito.id_defeito}`, {
                        method: "PUT",
                        data: {
                            peca: defeito.peca,
                            defeito: defeito.defeito,
                            id_equipamento: equipamentoData.id_equipamento,
                        },
                    })
                );
            });

            // Cria novos defeitos
            defeitosParaCriar.forEach((defeito) => {
                promessas.push(
                    apiRequest("/defeitos", {
                        method: "POST",
                        data: {
                            peca: defeito.peca,
                            defeito: defeito.defeito,
                            id_equipamento: equipamentoData.id_equipamento,
                        },
                    })
                );
            });

            // Aguarda todas as requisições serem concluídas
            const resultados = await Promise.all(promessas);

            // Atualiza os IDs dos defeitos criados no estado
            let indiceNovos = 0;
            const defeitosAtualizados = defeitosSelecionados.map((defeito) => {
                // Se já tem ID, mantém (foi atualizado)
                if (defeito.id_defeito) {
                    return defeito;
                }
                // Se não tem ID e está válido, pega o ID da resposta da criação
                if (defeito.peca && defeito.defeito && indiceNovos < defeitosParaCriar.length) {
                    const resultado = resultados[defeitosParaAtualizar.length + indiceNovos];
                    const novoId = resultado?.data?.id_defeito || resultado?.data?.data?.id_defeito;
                    indiceNovos++;
                    if (novoId) {
                        return {
                            ...defeito,
                            id_defeito: novoId,
                        };
                    }
                }
                return defeito;
            }).filter((d) => d.peca && d.defeito); // Remove campos vazios
            
            // Adiciona um campo vazio no final para permitir adicionar novos defeitos
            setDefeitosSelecionados([...defeitosAtualizados, { peca: "", defeito: "" }]);

            const totalAtualizados = defeitosParaAtualizar.length;
            const totalCriados = defeitosParaCriar.length;
            let mensagem = "";
            
            if (totalAtualizados > 0 && totalCriados > 0) {
                mensagem = `${totalAtualizados} defeito(s) atualizado(s) e ${totalCriados} defeito(s) criado(s) com sucesso!`;
            } else if (totalAtualizados > 0) {
                mensagem = `${totalAtualizados} defeito(s) atualizado(s) com sucesso!`;
            } else {
                mensagem = `${totalCriados} defeito(s) registrado(s) com sucesso!`;
            }

            Alert.alert("Sucesso", mensagem);
        } catch (error) {
            console.error("Erro ao registrar defeitos:", error);
            Alert.alert(
                "Erro",
                error.message || "Não foi possível registrar os defeitos. Tente novamente."
            );
        } finally {
            setIsLoading(false);
        }
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

            {equipamentoData && (
                <Text style={styles.serieText}>Nº SÉRIE: {equipamentoData.num_serie || equipamentoData.id_equipamento}</Text>
            )}

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <Text style={styles.sectionTitle}>REGISTRAR DEFEITOS</Text>
                
                {isLoadingDefeitos && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#0B4D8E" />
                        <Text style={styles.loadingText}>Carregando defeitos...</Text>
                    </View>
                )}

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

                <Pressable 
                    style={[styles.submitButton, isLoading && styles.submitButtonDisabled]} 
                    onPress={registrarDefeitos}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.submitText}>Registrar defeito</Text>
                    )}
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
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    loadingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 15,
        gap: 10,
    },
    loadingText: {
        color: "#0B4D8E",
        fontSize: 14,
    },
});
