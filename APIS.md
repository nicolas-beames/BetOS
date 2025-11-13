# Exemplos de cURL para APIs BetOS

Este documento contém exemplos de cURL para todos os endpoints da API BetOS.

**Base URL:** `http://localhost:3333`

---

## 📋 Índice

1. [Health Check](#health-check)
2. [Clientes](#clientes)
3. [Gestores](#gestores)
4. [Técnicos](#técnicos)
5. [Ordens de Serviço (OS)](#ordens-de-serviço-os)
6. [Equipamentos](#equipamentos)
7. [Defeitos](#defeitos)

---

## Health Check

### GET /health
Verifica se o servidor está funcionando.

```bash
curl -X GET http://localhost:3333/health
```

---

## Clientes

### GET /clientes
Lista clientes com paginação e filtros.

**Query Parameters:**
- `page` (opcional, padrão: 1): Número da página
- `limit` (opcional, padrão: 10, máximo: 100): Itens por página
- `search` (opcional): Busca por nome ou CNPJ
- `ativo` (opcional): Filtrar por status (true/false)

```bash
# Listar todos os clientes (página 1, 10 itens)
curl -X GET "http://localhost:3333/clientes"

# Listar com paginação
curl -X GET "http://localhost:3333/clientes?page=1&limit=20"

# Buscar clientes por termo
curl -X GET "http://localhost:3333/clientes?search=Empresa"

# Filtrar apenas clientes ativos
curl -X GET "http://localhost:3333/clientes?ativo=true"

# Combinar filtros
curl -X GET "http://localhost:3333/clientes?page=1&limit=10&search=Empresa&ativo=true"
```

### GET /clientes/:id
Busca um cliente específico por ID.

```bash
curl -X GET http://localhost:3333/clientes/1
```

### POST /clientes
Cria um novo cliente.

**Body (JSON):**
- `nome` (obrigatório): Nome do cliente (máx. 100 caracteres)
- `cnpj` (obrigatório): CNPJ formatado (18 caracteres, ex: "12.345.678/0001-90")
- `cep` (obrigatório): CEP formatado (9 caracteres, ex: "12345-678")
- `numero` (obrigatório): Número do endereço (máx. 10 caracteres)
- `telefone` (obrigatório): Telefone (máx. 20 caracteres)
- `ativo` (opcional): Status ativo/inativo (padrão: true)

```bash
curl -X POST http://localhost:3333/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Empresa ABC Ltda",
    "cnpj": "12.345.678/0001-90",
    "cep": "12345-678",
    "numero": "100",
    "telefone": "(11) 98765-4321",
    "ativo": true
  }'
```

### PUT /clientes/:id
Atualiza um cliente existente (todos os campos são opcionais, mas pelo menos um deve ser fornecido).

```bash
curl -X PUT http://localhost:3333/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Empresa ABC Atualizada",
    "telefone": "(11) 99999-8888"
  }'
```

### DELETE /clientes/:id
Remove um cliente.

```bash
curl -X DELETE http://localhost:3333/clientes/1
```

---

## Gestores

### GET /gestores
Lista gestores com paginação e filtros.

**Query Parameters:**
- `page` (opcional, padrão: 1): Número da página
- `limit` (opcional, padrão: 10, máximo: 100): Itens por página
- `search` (opcional): Busca por nome, CNPJ ou login
- `ativo` (opcional): Filtrar por status (true/false)

```bash
# Listar todos os gestores
curl -X GET "http://localhost:3333/gestores"

# Buscar gestores por termo
curl -X GET "http://localhost:3333/gestores?search=João"

# Filtrar apenas gestores ativos
curl -X GET "http://localhost:3333/gestores?ativo=true"
```

### GET /gestores/:id
Busca um gestor específico por ID.

```bash
curl -X GET http://localhost:3333/gestores/1
```

### POST /gestores
Cria um novo gestor.

**Body (JSON):**
- `nome` (obrigatório): Nome do gestor (máx. 100 caracteres)
- `cnpj` (obrigatório): CNPJ formatado (18 caracteres)
- `login` (obrigatório): Login único (máx. 50 caracteres)
- `senha` (obrigatório): Senha (mín. 6, máx. 255 caracteres)
- `ativo` (opcional): Status ativo/inativo (padrão: true)

```bash
curl -X POST http://localhost:3333/gestores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cnpj": "12.345.678/0001-90",
    "login": "joao.silva",
    "senha": "senha123",
    "ativo": true
  }'
```

### PUT /gestores/:id
Atualiza um gestor existente.

```bash
curl -X PUT http://localhost:3333/gestores/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Atualizado",
    "senha": "novaSenha123"
  }'
```

### DELETE /gestores/:id
Remove um gestor.

```bash
curl -X DELETE http://localhost:3333/gestores/1
```

---

## Técnicos

### GET /tecnicos
Lista técnicos com paginação e filtros.

**Query Parameters:**
- `page` (opcional, padrão: 1): Número da página
- `limit` (opcional, padrão: 10, máximo: 100): Itens por página
- `search` (opcional): Busca por nome, CNPJ ou login
- `ativo` (opcional): Filtrar por status (true/false)
- `id_gestor` (opcional): Filtrar por gestor

```bash
# Listar todos os técnicos
curl -X GET "http://localhost:3333/tecnicos"

# Filtrar técnicos de um gestor específico
curl -X GET "http://localhost:3333/tecnicos?id_gestor=1"

# Buscar técnicos por termo
curl -X GET "http://localhost:3333/tecnicos?search=Maria"
```

### GET /tecnicos/:id
Busca um técnico específico por ID.

```bash
curl -X GET http://localhost:3333/tecnicos/1
```

### POST /tecnicos
Cria um novo técnico.

**Body (JSON):**
- `nome` (obrigatório): Nome do técnico (máx. 100 caracteres)
- `cnpj` (obrigatório): CNPJ formatado (18 caracteres)
- `login` (obrigatório): Login único (máx. 50 caracteres)
- `senha` (obrigatório): Senha (mín. 6, máx. 255 caracteres)
- `id_gestor` (obrigatório): ID do gestor responsável
- `ativo` (opcional): Status ativo/inativo (padrão: true)

```bash
curl -X POST http://localhost:3333/tecnicos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos",
    "cnpj": "98.765.432/0001-10",
    "login": "maria.santos",
    "senha": "senha123",
    "id_gestor": 1,
    "ativo": true
  }'
```

### PUT /tecnicos/:id
Atualiza um técnico existente.

```bash
curl -X PUT http://localhost:3333/tecnicos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Santos Atualizada",
    "id_gestor": 2
  }'
```

### DELETE /tecnicos/:id
Remove um técnico.

```bash
curl -X DELETE http://localhost:3333/tecnicos/1
```

---

## Ordens de Serviço (OS)

### GET /os
Lista ordens de serviço com paginação e filtros.

**Query Parameters:**
- `page` (opcional, padrão: 1): Número da página
- `limit` (opcional, padrão: 10, máximo: 100): Itens por página
- `search` (opcional): Busca por defeitos, observações, nome ou CNPJ do cliente
- `finalizada` (opcional): Filtrar por status (Y/N)
- `id_cliente` (opcional): Filtrar por cliente
- `id_tecnico` (opcional): Filtrar por técnico

```bash
# Listar todas as OS
curl -X GET "http://localhost:3333/os"

# Filtrar OS finalizadas
curl -X GET "http://localhost:3333/os?finalizada=Y"

# Filtrar OS de um cliente específico
curl -X GET "http://localhost:3333/os?id_cliente=1"

# Filtrar OS de um técnico específico
curl -X GET "http://localhost:3333/os?id_tecnico=1"

# Buscar OS por termo
curl -X GET "http://localhost:3333/os?search=problema"
```

### GET /os/:id
Busca uma ordem de serviço específica por ID.

```bash
curl -X GET http://localhost:3333/os/1
```

### POST /os
Cria uma nova ordem de serviço.

**Body (JSON):**
- `id_cliente` (obrigatório): ID do cliente
- `id_tecnico` (opcional): ID do técnico responsável
- `custos` (opcional): Valor dos custos (número não negativo)
- `defeitos` (opcional): Descrição dos defeitos
- `observacoes` (opcional): Observações gerais
- `finalizada` (opcional): Status de finalização (Y/N, padrão: N)

```bash
curl -X POST http://localhost:3333/os \
  -H "Content-Type: application/json" \
  -d '{
    "id_cliente": 1,
    "id_tecnico": 1,
    "custos": 150.50,
    "defeitos": "Problema na refrigeração",
    "observacoes": "Equipamento precisa de manutenção preventiva",
    "finalizada": "N"
  }'
```

### PUT /os/:id
Atualiza uma ordem de serviço existente.

**Body (JSON):**
- Todos os campos são opcionais, mas pelo menos um deve ser fornecido
- `id_cliente` (opcional): ID do cliente
- `id_tecnico` (opcional ou null): ID do técnico ou null para remover
- `custos` (opcional): Valor dos custos
- `data_fechamento` (opcional ou null): Data de fechamento (ISO 8601)
- `defeitos` (opcional ou null): Descrição dos defeitos
- `observacoes` (opcional ou null): Observações gerais
- `finalizada` (opcional): Status de finalização (Y/N)

```bash
# Atualizar custos e finalizar OS
curl -X PUT http://localhost:3333/os/1 \
  -H "Content-Type: application/json" \
  -d '{
    "custos": 200.00,
    "finalizada": "Y",
    "data_fechamento": "2024-01-15T10:30:00Z"
  }'

# Remover técnico da OS
curl -X PUT http://localhost:3333/os/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id_tecnico": null
  }'
```

### DELETE /os/:id
Remove uma ordem de serviço.

```bash
curl -X DELETE http://localhost:3333/os/1
```

---

## Equipamentos

### GET /equipamentos
Lista equipamentos com paginação e filtros.

**Query Parameters:**
- `page` (opcional, padrão: 1): Número da página
- `limit` (opcional, padrão: 10, máximo: 100): Itens por página
- `search` (opcional): Busca por nome ou número de série
- `tipo` (opcional): Filtrar por tipo de equipamento
  - Valores possíveis: `CHECK_STANDS_MOBILIAS`, `CHECK_OUTS`, `GONDOLAS`, `RACK_INTEGRADO`, `REFRIGERACAO_MAQUINA_ACOPLADA`, `ELETROFRIO`
- `numero_os` (opcional): Filtrar por ordem de serviço

```bash
# Listar todos os equipamentos
curl -X GET "http://localhost:3333/equipamentos"

# Filtrar por tipo de equipamento
curl -X GET "http://localhost:3333/equipamentos?tipo=CHECK_OUTS"

# Filtrar equipamentos de uma OS específica
curl -X GET "http://localhost:3333/equipamentos?numero_os=1"

# Buscar equipamentos por termo
curl -X GET "http://localhost:3333/equipamentos?search=Refrigerador"

# Combinar filtros
curl -X GET "http://localhost:3333/equipamentos?page=1&limit=20&tipo=ELETROFRIO&numero_os=1"
```

### GET /equipamentos/:id
Busca um equipamento específico por ID.

```bash
curl -X GET http://localhost:3333/equipamentos/1
```

### POST /equipamentos
Cria um novo equipamento.

**Body (JSON):**
- `nome` (obrigatório): Nome do equipamento
- `tipo` (obrigatório): Tipo do equipamento
  - Valores possíveis: `CHECK_STANDS_MOBILIAS`, `CHECK_OUTS`, `GONDOLAS`, `RACK_INTEGRADO`, `REFRIGERACAO_MAQUINA_ACOPLADA`, `ELETROFRIO`
- `num_serie` (obrigatório): Número de série do equipamento
- `numero_os` (obrigatório): ID da ordem de serviço

```bash
curl -X POST http://localhost:3333/equipamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Refrigerador Industrial",
    "tipo": "ELETROFRIO",
    "num_serie": "RF-2024-001",
    "numero_os": 1
  }'
```

### PUT /equipamentos/:id
Atualiza um equipamento existente.

```bash
curl -X PUT http://localhost:3333/equipamentos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Refrigerador Industrial Atualizado",
    "tipo": "REFRIGERACAO_MAQUINA_ACOPLADA"
  }'
```

### DELETE /equipamentos/:id
Remove um equipamento.

```bash
curl -X DELETE http://localhost:3333/equipamentos/1
```

---

## Defeitos

### GET /defeitos
Lista defeitos com paginação e filtros.

**Query Parameters:**
- `page` (opcional, padrão: 1): Número da página
- `limit` (opcional, padrão: 10, máximo: 100): Itens por página
- `search` (opcional): Busca por peça ou descrição do defeito
- `id_equipamento` (opcional): Filtrar por equipamento

```bash
# Listar todos os defeitos
curl -X GET "http://localhost:3333/defeitos"

# Filtrar defeitos de um equipamento específico
curl -X GET "http://localhost:3333/defeitos?id_equipamento=1"

# Buscar defeitos por termo
curl -X GET "http://localhost:3333/defeitos?search=compressor"

# Combinar filtros
curl -X GET "http://localhost:3333/defeitos?page=1&limit=20&id_equipamento=1&search=compressor"
```

### GET /defeitos/:id
Busca um defeito específico por ID.

```bash
curl -X GET http://localhost:3333/defeitos/1
```

### POST /defeitos
Cria um novo defeito.

**Body (JSON):**
- `peca` (obrigatório): Nome da peça com defeito
- `defeito` (obrigatório): Descrição do defeito
- `id_equipamento` (obrigatório): ID do equipamento
- `data_registro` (opcional): Data de registro (ISO 8601, padrão: agora)

```bash
curl -X POST http://localhost:3333/defeitos \
  -H "Content-Type: application/json" \
  -d '{
    "peca": "Compressor",
    "defeito": "Compressor não está ligando, possível problema elétrico",
    "id_equipamento": 1,
    "data_registro": "2024-01-15T10:30:00Z"
  }'
```

### PUT /defeitos/:id
Atualiza um defeito existente.

```bash
curl -X PUT http://localhost:3333/defeitos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "peca": "Compressor e Ventilador",
    "defeito": "Compressor e ventilador com problemas"
  }'
```

### DELETE /defeitos/:id
Remove um defeito.

```bash
curl -X DELETE http://localhost:3333/defeitos/1
```

---

## 📝 Notas Importantes

1. **Content-Type**: Todos os requests POST e PUT devem incluir o header `Content-Type: application/json`.

2. **Porta Padrão**: A API roda na porta `3333` por padrão. Se configurada diferente, ajuste a URL.

3. **Validação**: Todos os endpoints validam os dados de entrada. Erros de validação retornam status 400 com detalhes.

4. **IDs**: Todos os IDs devem ser números inteiros positivos.

5. **Paginação**: Os endpoints de listagem suportam paginação. O limite máximo é 100 itens por página.

6. **Filtros**: Múltiplos filtros podem ser combinados usando `&` na query string.

7. **Enums**: 
   - `equipamento_tipo`: `CHECK_STANDS_MOBILIAS`, `CHECK_OUTS`, `GONDOLAS`, `RACK_INTEGRADO`, `REFRIGERACAO_MAQUINA_ACOPLADA`, `ELETROFRIO`
   - `finalizada`: `Y` ou `N`

8. **Relacionamentos**: 
   - Equipamentos pertencem a uma OS (obrigatório)
   - Defeitos pertencem a um Equipamento (obrigatório)
   - Técnicos pertencem a um Gestor (obrigatório)
   - OS pertence a um Cliente (obrigatório) e pode ter um Técnico (opcional)

---

## 🔧 Exemplos de Teste Completo

### Fluxo completo: Criar Cliente → Criar OS → Criar Equipamento → Criar Defeito

```bash
# 1. Criar cliente
CLIENTE_ID=$(curl -s -X POST http://localhost:3333/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Supermercado XYZ",
    "cnpj": "12.345.678/0001-90",
    "cep": "12345-678",
    "numero": "500",
    "telefone": "(11) 98765-4321"
  }' | jq -r '.id_cliente')

echo "Cliente criado com ID: $CLIENTE_ID"

# 2. Criar OS
OS_ID=$(curl -s -X POST http://localhost:3333/os \
  -H "Content-Type: application/json" \
  -d "{
    \"id_cliente\": $CLIENTE_ID,
    \"custos\": 0,
    \"finalizada\": \"N\"
  }" | jq -r '.numero_os')

echo "OS criada com ID: $OS_ID"

# 3. Criar equipamento
EQUIPAMENTO_ID=$(curl -s -X POST http://localhost:3333/equipamentos \
  -H "Content-Type: application/json" \
  -d "{
    \"nome\": \"Refrigerador Principal\",
    \"tipo\": \"ELETROFRIO\",
    \"num_serie\": \"RF-2024-001\",
    \"numero_os\": $OS_ID
  }" | jq -r '.id_equipamento')

echo "Equipamento criado com ID: $EQUIPAMENTO_ID"

# 4. Criar defeito
curl -X POST http://localhost:3333/defeitos \
  -H "Content-Type: application/json" \
  -d "{
    \"peca\": \"Compressor\",
    \"defeito\": \"Compressor não está funcionando\",
    \"id_equipamento\": $EQUIPAMENTO_ID
  }"

echo "Defeito criado com sucesso!"
```

---
