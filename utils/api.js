/**
 * Utilitário para fazer chamadas de API usando Axios
 * 
 * Este arquivo centraliza as configurações e funções para comunicação com a API backend
 */

import axios from 'axios';
import { Platform } from 'react-native';

// URL base da sua API - ajuste conforme necessário
// IMPORTANTE: Em React Native, localhost/127.0.0.1 não funciona!
// - Android Emulador: use "http://10.0.2.2:3333"
// - iOS Simulador: use "http://localhost:3333" ou "http://127.0.0.1:3333"
// - Dispositivo físico: use o IP da sua máquina (ex: "http://192.168.1.100:3333")
// - Web: use "http://localhost:3333"

// Detecta a plataforma e ajusta a URL automaticamente
const getBaseURL = () => {
    if (__DEV__) {
        if (Platform.OS === 'android') {
            // Android Emulador
            return "http://10.0.2.2:3333";
        } else if (Platform.OS === 'ios') {
            // iOS Simulador - pode usar localhost
            return "http://localhost:3333";
        } else {
            // Web
            return "http://localhost:3333";
        }
    }
    // Produção
    return "https://sua-api-producao.com/api";
};

const API_BASE_URL = getBaseURL();

// Cria uma instância do axios com configurações padrão
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 segundos de timeout
    headers: {
        'Content-Type': 'application/json',
    },
    // Transforma a resposta para tratar respostas vazias (204)
    transformResponse: [
        function (data) {
            // Se a resposta for uma string vazia, retorna null
            if (data === '') {
                return null;
            }
            // Se já for um objeto (axios já fez parse), retorna como está
            if (typeof data === 'object' && data !== null) {
                return data;
            }
            // Se for null ou undefined, retorna null
            if (data === null || data === undefined) {
                return null;
            }
            // Se for string, tenta fazer parse (caso o axios não tenha feito)
            if (typeof data === 'string') {
                try {
                    // Se for a string literal "null", retorna null
                    if (data.trim() === 'null') {
                        return null;
                    }
                    return JSON.parse(data);
                } catch (e) {
                    // Se não for JSON válido, retorna null
                    return null;
                }
            }
            return data;
        }
    ],
});

/**
 * INTERCEPTOR DE REQUEST
 * Executa antes de cada requisição
 * Útil para adicionar tokens de autenticação automaticamente
 */
apiClient.interceptors.request.use(
    (config) => {
        // Exemplo: Adicionar token de autenticação automaticamente
        // Descomente e ajuste conforme necessário:
        // const token = AsyncStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        // Para requisições DELETE sem body, remove Content-Type
        // Alguns servidores rejeitam DELETE com Content-Type quando não há body
        if (config.method?.toLowerCase() === 'delete' && (!config.data || config.data === null || config.data === undefined)) {
            delete config.headers['Content-Type'];
        }

        // Log completo da requisição para debug
        console.log('=== REQUEST ===');
        console.log('Method:', config.method?.toUpperCase());
        console.log('URL:', config.baseURL + config.url);
        console.log('Full URL:', config.url);
        console.log('Params:', config.params);
        console.log('Data:', config.data);
        console.log('Headers:', config.headers);
        return config;
    },
    (error) => {
        // Trata erros antes de enviar a requisição
        console.error('Erro no request:', error);
        return Promise.reject(error);
    }
);

/**
 * INTERCEPTOR DE RESPONSE
 * Executa após cada resposta
 * Útil para tratar erros globalmente ou transformar dados
 */
apiClient.interceptors.response.use(
    (response) => {
        // Resposta bem-sucedida (2xx)
        // Para respostas 204 (No Content), não há corpo, então garantimos que data seja null
        if (response.status === 204) {
            response.data = null;
        }
        // console.log('=== RESPONSE ===');
        // console.log('Status:', response.status);
        // console.log('Data:', response.data);
        return response;
    },
    (error) => {
        // Trata erros de resposta (4xx, 5xx)
        console.error('=== ERROR ===');
        
        if (error.response) {
            // Servidor respondeu com erro
            const { status, data, config } = error.response;
            
            console.error('Status:', status);
            console.error('URL:', config?.url);
            console.error('Data:', data);
            console.error('Message:', data?.message || error.message);
            
            switch (status) {
                case 401:
                    // Não autorizado - redirecionar para login
                    console.error('Não autorizado');
                    error.message = data?.message || 'Não autorizado. Faça login novamente.';
                    // Descomente para redirecionar automaticamente:
                    // router.replace('/login');
                    break;
                case 403:
                    console.error('Acesso negado');
                    error.message = data?.message || 'Acesso negado.';
                    break;
                case 404:
                    console.error('Recurso não encontrado');
                    error.message = data?.message || 'Recurso não encontrado.';
                    break;
                case 500:
                    console.error('Erro interno do servidor');
                    error.message = data?.message || 'Erro interno do servidor.';
                    break;
                default:
                    console.error('Erro:', data?.message || 'Erro desconhecido');
                    error.message = data?.message || `Erro ${status}: ${error.message}`;
            }
        } else if (error.request) {
            // Requisição foi feita mas não houve resposta
            console.error('Sem resposta do servidor');
            console.error('Request:', error.request);
            console.error('URL tentada:', error.config?.baseURL + error.config?.url);
            
            // Mensagens mais específicas
            if (error.code === 'ECONNREFUSED') {
                error.message = 'Não foi possível conectar ao servidor. Verifique se a API está rodando.';
            } else if (error.code === 'ETIMEDOUT') {
                error.message = 'Tempo de conexão esgotado. Verifique sua internet.';
            } else if (error.message.includes('Network Error')) {
                error.message = 'Erro de rede. Verifique sua conexão com a internet e se a API está acessível.';
            } else {
                error.message = 'Erro de conexão. Verifique sua internet e se a API está rodando.';
            }
        } else {
            // Erro ao configurar a requisição
            console.error('Erro na configuração:', error.message);
            error.message = error.message || 'Erro ao fazer requisição.';
        }

        return Promise.reject(error);
    }
);

/**
 * Função genérica para fazer requisições HTTP
 * Com axios, não precisa fazer JSON.stringify manualmente
 * @param {string} endpoint - Endpoint da API (ex: "/agendamentos")
 * @param {object} options - Opções da requisição (method, data, params, headers, etc)
 * @returns {Promise} - Promise com a resposta da API
 */
export const apiRequest = async (endpoint, options = {}) => {
    const {
        method = "GET",
        data = null,
        params = null,
        headers = {},
        ...restOptions
    } = options;

    try {
        const response = await apiClient.request({
            url: endpoint, // Não precisa adicionar API_BASE_URL, o axios já usa baseURL
            method,
            data, // axios usa 'data' ao invés de 'body'
            params, // query parameters
            headers,
            ...restOptions,
        });

        // Axios já retorna response.data automaticamente
        // Mas mantemos o formato { data, status } para compatibilidade
        return {
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        // O interceptor já tratou o erro, mas podemos adicionar tratamento específico aqui
        throw error;
    }
};

/**
 * Funções específicas para agendamentos
 */
export const agendamentosAPI = {
    /**
     * Busca todos os agendamentos do técnico
     * @param {string} tecnicoId - ID do técnico
     * @returns {Promise} - Lista de agendamentos
     */
    getAgendamentos: async (tecnicoId) => {
        return apiRequest("/os", {
            method: "GET",
            // params: { tecnicoId }, // axios transforma automaticamente em query string
        });
    },

    /**
     * Cria uma nova OS
     * @param {object} osData - Dados da OS seguindo o schema do backend
     * @returns {Promise} - OS criada
     */
    createOS: async (osData) => {
        return apiRequest("/os", {
            method: "POST",
            data: osData,
        });
    },

    /**
     * Busca uma OS específica por ID
     * @param {number} osId - ID da OS
     * @returns {Promise} - Dados da OS
     */
    getOSById: async (osId) => {
        return apiRequest(`/os/${osId}`, {
            method: "GET",
        });
    },

    /**
     * Busca um agendamento específico por ID
     * @param {string} agendamentoId - ID do agendamento
     * @returns {Promise} - Dados do agendamento
     */
    getAgendamentoById: async (agendamentoId) => {
        return apiRequest(`/agendamentos/${agendamentoId}`);
    },

    /**
     * Cria um novo agendamento
     * @param {object} agendamentoData - Dados do agendamento
     * @returns {Promise} - Agendamento criado
     */
    createAgendamento: async (agendamentoData) => {
        return apiRequest("/agendamentos", {
            method: "POST",
            data: agendamentoData, // axios faz JSON.stringify automaticamente
        });
    },

    /**
     * Atualiza um agendamento existente
     * @param {string} agendamentoId - ID do agendamento
     * @param {object} agendamentoData - Novos dados do agendamento
     * @returns {Promise} - Agendamento atualizado
     */
    updateAgendamento: async (agendamentoId, agendamentoData) => {
        return apiRequest(`/agendamentos/${agendamentoId}`, {
            method: "PUT",
            data: agendamentoData,
        });
    },

    /**
     * Deleta um agendamento
     * @param {string} agendamentoId - ID do agendamento
     * @returns {Promise}
     */
    deleteAgendamento: async (agendamentoId) => {
        return apiRequest(`/agendamentos/${agendamentoId}`, {
            method: "DELETE",
        });
    },
};

/**
 * Funções específicas para equipamentos
 */
export const equipamentosAPI = {
    /**
     * Cria um novo equipamento vinculado a uma OS
     * @param {object} equipamentoData - Dados do equipamento
     * @returns {Promise} - Equipamento criado
     */
    createEquipamento: async (equipamentoData) => {
        return apiRequest("/equipamentos", {
            method: "POST",
            data: equipamentoData,
        });
    },
};

/**
 * Funções específicas para clientes
 */
export const clientesAPI = {
    /**
     * Lista clientes com paginação e filtros
     * @param {object} params - Parâmetros de busca (page, limit, search, ativo)
     * @returns {Promise} - Lista de clientes
     */
    getClientes: async (params = {}) => {
        return apiRequest("/clientes", {
            method: "GET",
            params,
        });
    },

    /**
     * Busca um cliente específico por ID
     * @param {number} clienteId - ID do cliente
     * @returns {Promise} - Dados do cliente
     */
    getClienteById: async (clienteId) => {
        return apiRequest(`/clientes/${clienteId}`, {
            method: "GET",
        });
    },

    /**
     * Cria um novo cliente
     * @param {object} clienteData - Dados do cliente
     * @returns {Promise} - Cliente criado
     */
    createCliente: async (clienteData) => {
        return apiRequest("/clientes", {
            method: "POST",
            data: clienteData,
        });
    },

    /**
     * Atualiza um cliente existente
     * @param {number} clienteId - ID do cliente
     * @param {object} clienteData - Novos dados do cliente
     * @returns {Promise} - Cliente atualizado
     */
    updateCliente: async (clienteId, clienteData) => {
        return apiRequest(`/clientes/${clienteId}`, {
            method: "PUT",
            data: clienteData,
        });
    },

    /**
     * Deleta um cliente
     * @param {number} clienteId - ID do cliente
     * @returns {Promise}
     */
    deleteCliente: async (clienteId) => {
        return apiRequest(`/clientes/${clienteId}`, {
            method: "DELETE",
        });
    },
};

/**
 * Funções específicas para técnicos
 */
export const tecnicosAPI = {
    /**
     * Lista técnicos com paginação e filtros
     * @param {object} params - Parâmetros de busca (page, limit, search, ativo, id_gestor)
     * @returns {Promise} - Lista de técnicos
     */
    getTecnicos: async (params = {}) => {
        return apiRequest("/tecnicos", {
            method: "GET",
            params,
        });
    },

    /**
     * Busca um técnico específico por ID
     * @param {number} tecnicoId - ID do técnico
     * @returns {Promise} - Dados do técnico
     */
    getTecnicoById: async (tecnicoId) => {
        return apiRequest(`/tecnicos/${tecnicoId}`, {
            method: "GET",
        });
    },

    /**
     * Cria um novo técnico
     * @param {object} tecnicoData - Dados do técnico
     * @returns {Promise} - Técnico criado
     */
    createTecnico: async (tecnicoData) => {
        return apiRequest("/tecnicos", {
            method: "POST",
            data: tecnicoData,
        });
    },

    /**
     * Atualiza um técnico existente
     * @param {number} tecnicoId - ID do técnico
     * @param {object} tecnicoData - Novos dados do técnico
     * @returns {Promise} - Técnico atualizado
     */
    updateTecnico: async (tecnicoId, tecnicoData) => {
        return apiRequest(`/tecnicos/${tecnicoId}`, {
            method: "PUT",
            data: tecnicoData,
        });
    },

    /**
     * Deleta um técnico
     * @param {number} tecnicoId - ID do técnico
     * @returns {Promise}
     */
    deleteTecnico: async (tecnicoId) => {
        return apiRequest(`/tecnicos/${tecnicoId}`, {
            method: "DELETE",
        });
    },
};

/**
 * Função auxiliar para criar um token de cancelamento
 * Útil quando o usuário sai de uma tela antes da requisição terminar
 * @returns {object} - Objeto com token e método cancel()
 */
export const createCancelToken = () => {
    return axios.CancelToken.source();
};

/**
 * Exemplo de uso do cancelamento:
 * 
 * const cancelToken = createCancelToken();
 * 
 * try {
 *     const response = await apiRequest("/agendamentos", {
 *         cancelToken: cancelToken.token
 *     });
 * } catch (error) {
 *     if (axios.isCancel(error)) {
 *         console.log('Requisição cancelada');
 *     }
 * }
 * 
 * // Para cancelar:
 * cancelToken.cancel('Usuário saiu da tela');
 */
