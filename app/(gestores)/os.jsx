import { useEffect, useState } from "react";
import ThemedText from "../../components/ThemedText";
import ThemedButton from "../../components/ThemedButton";
import DashboardCard from "../../components/DashboardCard";
import { ScrollView, View, RefreshControl, Pressable, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme.jsx";
import { agendamentosAPI } from "../../utils/api";

const DashboardGestor = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [osList, setOsList] = useState([]);
    const [error, setError] = useState(null);
    const { logout } = useAuth();
    const router = useRouter();
    const { styles } = useTheme();

    useEffect(() => {
        buscarOS();
    }, []);

    /**
     * Função para buscar OS da API
     */
    const buscarOS = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await agendamentosAPI.getAgendamentos();
            const osArray = response.data?.data || [];
            
            setOsList(Array.isArray(osArray) ? osArray : []);

        } catch (err) {
            console.error("Erro ao buscar OS:", err);
            setError(err.message);
            Alert.alert("Erro", err.message || "Não foi possível carregar as OS");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    /**
     * Função de refresh que busca os dados novamente da API
     */
    const handleRefresh = async () => {
        setRefreshing(true);
        await buscarOS();
    };

    /**
     * Converte os dados da API para o formato esperado pelo DashboardCard
     */
    const formatarDadosOS = (os) => {
        const equipamentoNome = os?.equipamento && Array.isArray(os.equipamento) && os.equipamento.length > 0
            ? os.equipamento[0].nome
            : "N/A";
        
        return [
            { label: "EQUIP: ", text: equipamentoNome },
            { label: "TEL: ", text: os.cliente?.telefone || "N/A" },
            { label: "CEP: ", text: os.cep || "N/A" },
            { label: "END: ", text: `${os.rua || "N/A"}, Nº ${os.numero || "N/A"}; COMPLEMENTO: ${os.complemento || "N/A"}` },
        ]; 
    };

    const abrirAcompanhamento = (os) => {
        router.push({
            pathname: "/acompanhamento",
            params: { 
                agendamento: JSON.stringify(os),
                osId: os.numero_os
            },
        });
    };

    // Mostra loading enquanto busca os dados
    if (loading && osList.length === 0) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#0B4D8E" />
                <ThemedText style={{ marginTop: 10 }}>Carregando OS...</ThemedText>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={logout} style={{ alignSelf: "flex-start" }}>
                <ThemedText title={true}>OS</ThemedText>
            </Pressable>

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
                {osList.length === 0 && !loading ? (
                    <View style={{ padding: 20, alignItems: "center" }}>
                        <ThemedText>Nenhuma OS encontrada</ThemedText>
                    </View>
                ) : (
                    osList.map((os, index) => (
                        <DashboardCard
                            key={os.numero_os || index}
                            title={`${os.numero_os} - ${os.cliente?.nome || "N/A"}`}
                            contentArray={formatarDadosOS(os)}
                            buttonText="Abrir"
                            buttonAction={() => abrirAcompanhamento(os)}
                        />
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardGestor;
