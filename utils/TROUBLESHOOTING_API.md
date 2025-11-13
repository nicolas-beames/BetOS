# Troubleshooting - Problemas de Conexão com API

## Problemas Comuns e Soluções

### 1. Erro: "Erro de conexão" ou "Network Error"

#### ✅ Solução 1: Verificar a URL da API

O código já detecta automaticamente a plataforma, mas se ainda tiver problemas:

**Android Emulador:**
- Use: `http://10.0.2.2:3333`
- O código já faz isso automaticamente

**iOS Simulador:**
- Use: `http://localhost:3333`
- O código já faz isso automaticamente

**Dispositivo Físico (Android ou iOS):**
- Você precisa usar o IP da sua máquina, não localhost
- Descubra o IP da sua máquina:
  - **Windows:** Abra o CMD e digite `ipconfig`, procure por "IPv4"
  - **Mac/Linux:** Abra o Terminal e digite `ifconfig` ou `ip addr`
  - Procure por algo como `192.168.1.100` ou `192.168.0.100`
- Use: `http://SEU_IP:3333` (ex: `http://192.168.1.100:3333`)

**Para usar IP manual em dispositivo físico:**

Edite `utils/api.js` e adicione uma opção para IP manual:

```javascript
const getBaseURL = () => {
    if (__DEV__) {
        // Para dispositivo físico, descomente e coloque seu IP:
        // return "http://192.168.1.100:3333";
        
        if (Platform.OS === 'android') {
            return "http://10.0.2.2:3333";
        } else if (Platform.OS === 'ios') {
            return "http://localhost:3333";
        } else {
            return "http://localhost:3333";
        }
    }
    return "https://sua-api-producao.com/api";
};
```

### 2. Erro: "ECONNREFUSED" ou "Não foi possível conectar ao servidor"

#### ✅ Solução: Verificar se a API está rodando

1. Certifique-se de que sua API backend está rodando na porta 3333
2. Teste a API no navegador ou Postman:
   - Abra: `http://localhost:3333/os` (ou a URL da sua API)
   - Se não funcionar, a API não está rodando

### 3. Erro: "CORS" ou "CORS policy"

#### ✅ Solução: Configurar CORS no backend

Se sua API é React/Node.js, configure o CORS para aceitar requisições do frontend:

```javascript
// Exemplo com Express.js
const cors = require('cors');
app.use(cors({
    origin: '*', // Em produção, use o domínio específico
    credentials: true
}));
```

### 4. Verificar logs no console

O código agora mostra logs detalhados:

- **=== REQUEST ===**: Mostra a requisição sendo enviada
- **=== RESPONSE ===**: Mostra a resposta recebida
- **=== ERROR ===**: Mostra detalhes do erro

Verifique o console do React Native para ver:
- A URL completa sendo chamada
- Os dados enviados
- A resposta recebida ou o erro

### 5. Teste rápido

Para testar se a conexão está funcionando, você pode fazer um teste simples:

```javascript
// No console do React Native, teste:
import { apiRequest } from './utils/api';
apiRequest('/os')
    .then(res => console.log('Sucesso:', res))
    .catch(err => console.error('Erro:', err));
```

### 6. Checklist

Antes de reportar um problema, verifique:

- [ ] A API está rodando na porta 3333?
- [ ] Você está usando a URL correta para sua plataforma?
- [ ] Se é dispositivo físico, está usando o IP da máquina?
- [ ] O CORS está configurado no backend?
- [ ] Você verificou os logs no console?
- [ ] A URL completa está correta? (verifique nos logs)

### 7. Exemplo de URL correta

**Android Emulador:**
```
http://10.0.2.2:3333/os
```

**iOS Simulador:**
```
http://localhost:3333/os
```

**Dispositivo Físico:**
```
http://192.168.1.100:3333/os
```
(Substitua pelo IP da sua máquina)

