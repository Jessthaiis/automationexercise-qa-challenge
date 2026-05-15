# 🧪 Automation Exercise - QA Challenge

Projeto desenvolvido para o case técnico de QA Pleno utilizando **Cypress** para automação de testes UI e API, além de testes exploratórios e análise de qualidade da aplicação.

---

## 🎯 Objetivo

Validar o fluxo ponta a ponta do e-commerce Automation Exercise através de:

- Automação de testes UI (E2E)
- Automação de testes API (contratos e validações)
- Testes exploratórios
- Análise de edge cases
- Documentação de bugs e melhorias críticas

---

## 🛠️ Tecnologias utilizadas

- 🧪 Cypress — Framework de automação de testes
- 🟨 JavaScript — Linguagem principal
- 🎲 FakerJS — Geração de dados dinâmicos
- 🔌 Cypress API Plugin — Visualização e testes de API
- 🐙 GitHub — Versionamento

---

## 📌 Parte 1.1 — BDD

### 📖 Funcionalidade: Finalização de compra com cadastro obrigatório

#### 🧾 História do Usuário

```gherkin
Como visitante do e-commerce  
Quero realizar meu cadastro durante o processo de compra  
Para concluir a aquisição de produtos na plataforma
```

---

### 📍 Contexto

- Dado que acesso a loja "Automation Exercise"
- E possuo produtos adicionados ao carrinho

---

### 🧪 Cenários

#### ✅ Cenário 1: Finalizar compra realizando cadastro de novo usuário

- Quando acesso o checkout
- E escolho a opção de registro de novo usuário
- E informo dados válidos para criação da conta
- E concluo o cadastro com sucesso
- E confirmo os dados de entrega e cobrança
- E informo um cartão de crédito válido
- E confirmo a finalização da compra
- Então o sistema deve exibir a mensagem **"Pedido realizado com sucesso"**
- E o pedido deve ser registrado para o usuário criado
- E a conta do usuário deve permanecer ativa após a compra

---

#### ❌ Cenário 2: Excluir conta após finalizar compra

- Dado que o usuário possui uma conta cadastrada
- E realizou uma compra com sucesso
- Quando solicitar a exclusão da conta
- Então o sistema deve excluir a conta permanentemente
- E exibir a mensagem **"Conta excluída com sucesso"**

---

## 🔎 Parte 1.2 — Testes Exploratórios / Edge Cases

### ⚠️ 1. Double submit no pagamento

**Objetivo:**  
Garantir que o sistema não permita a criação de pedidos duplicados ao realizar múltiplos cliques no botão de pagamento.

**Cenário:**  
- Usuário está na etapa de pagamento  
- Possui dados de cartão válidos  
- Clica repetidamente no botão "Pay and Confirm Order"

**Resultado esperado:**  
- Apenas um pedido deve ser criado  
- O botão deve ser desabilitado durante o processamento  
- Não deve haver duplicidade de pedidos  

**Risco:**  
Criação de pedidos duplicados e inconsistência no processamento do pedido.

---

### ⚠️ 2. Validação de dados inválidos no pagamento

**Objetivo:**  
Garantir que o sistema valide corretamente os dados inseridos no cartão de crédito.

**Cenário:**  
- Usuário está na etapa de pagamento  
- Insere caracteres inválidos nos campos do cartão:
  - Card Number  
  - CVC  
  - Expiration Month  
  - Expiration Year  
- Tenta finalizar a compra  

**Resultado esperado:**  
- A compra não deve ser concluída  
- O sistema deve exibir mensagens de validação nos campos inválidos  

**Risco:**  
Envio de dados inválidos e falhas no fluxo de pagamento.

---

### ⚠️ 3. Expiração de sessão durante checkout

**Objetivo:**  
Garantir a consistência do carrinho e do fluxo de checkout após expiração de sessão.

**Cenário:**  
- Usuário possui produtos no carrinho  
- Inicia o processo de checkout  
- A sessão expira durante a finalização da compra  

**Resultado esperado:**  
- Usuário deve ser redirecionado para a tela de login  
- Itens do carrinho devem ser mantidos  
- Usuário deve conseguir retomar o checkout após autenticação  

**Risco:**  
Perda de carrinho, abandono de compra e impacto negativo na experiência do usuário.

---

## 🚀 Parte 2 — Automação API & UI

Este projeto utiliza Cypress com uma arquitetura voltada para testes de contrato (API) e testes E2E, utilizando dados dinâmicos para garantir independência entre execuções.

---

## 📦 Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Git
- Node.js LTS

---

## ⚙️ Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/Jessthaiis/automationexercise-qa-challenge.git
```

### 2. Acessar o projeto

```bash
cd automationexercise-qa-challenge
```

### 3. Instalar dependências

```bash
npm install
```

---

## ▶️ Execução dos testes

### 🖥️ Modo interativo (UI)

```bash
npx cypress open
```

Após abrir o Cypress:
- Selecionar **E2E Testing**
- Escolher o navegador
- Executar os testes desejados

---

### ⚡ Modo headless (terminal)

```bash
npx cypress run
```

---

## 📁 Estrutura do projeto

```
cypress/
 └── e2e/
      ├── Checkout.cy.js        # Fluxo E2E de compra completa (UI)
      ├── ProductsAPI.cy.js     # Teste de contrato e listagem (API)
      └── RegisterUserAPI.cy.js # Criação de usuário via POST (API)
```

---

## ✨ Diferenciais do projeto

### 🧑‍💻 Automação UI (Front-end)

- Fluxo completo de checkout ponta a ponta
- Dados dinâmicos com FakerJS
- Tratamento de anúncios e overlays da aplicação
- Execução estável e reutilizável

---

### 🔌 Automação API (Back-end)

- Validação de contrato (schema)
- Teste de listagem de produtos (GET)
- Criação de usuário via API (POST)
- Validação de responseCode e consistência de dados
- Uso de plugin para visualização das requisições

---

# 🧪 QA Report - Defeitos e Melhorias Identificadas

Este documento apresenta dois problemas identificados durante testes funcionais (UI) e de API, com análise de impacto, passos de reprodução e comportamento esperado conforme boas práticas de qualidade, segurança e validação de dados.

---

## 🐞 1. Validação inadequada em campos de cartão de crédito (input via colagem)

### 📌 Tipo
Bug de validação / Input validation

---

### 🧩 Descrição
Na tela de pagamento, os campos de dados do cartão de crédito estão permitindo a inserção de caracteres especiais através do evento de colagem (*paste*). Isso indica ausência ou inconsistência de validação no input, permitindo entrada de dados inválidos em campos que deveriam aceitar apenas valores numéricos.

---

### 🔁 Fluxo para reproduzir
1. Acessar a aplicação
2. Adicionar um produto ao carrinho
3. Acessar o carrinho de compras
4. Prosseguir para checkout
5. Realizar login ou criar uma nova conta
6. Retornar ao carrinho (quando aplicável ao fluxo da aplicação)
7. Prosseguir para a tela de pagamento
8. Localizar os campos de cartão de crédito (número, CVV, validade)
9. Copiar um valor contendo caracteres não numéricos (ex: `12@34#56`)
10. Colar o valor no campo de entrada

---

### ❗ Resultado atual
O sistema aceita caracteres especiais sem validação ou sanitização nos campos de cartão de crédito.

---

### ✅ Resultado esperado
- Bloqueio de caracteres não numéricos no evento de entrada/colagem  
ou  
- Sanitização automática removendo caracteres inválidos  
- Validação em tempo real antes da submissão do pagamento  
- Exibição de mensagem de erro clara ao usuário  

---

### ⚠️ Impacto
- Inconsistência de dados em informações financeiras
- Possível falha na validação de pagamento
- Impacto negativo na experiência do usuário no checkout
- Falta de consistência entre validação de frontend e backend

---

## 🔐 2. Exclusão de conta via API sem autenticação adequada

### 📌 Tipo
Falha de segurança / Access control issue (Critical)

---

### 🧩 Descrição
O endpoint de exclusão de conta permite a execução da operação via API utilizando apenas email e senha no corpo da requisição, sem exigir autenticação via token ou sessão. Isso indica fragilidade no controle de acesso e ausência de proteção adequada no endpoint.

---

### 🔁 Fluxo para reproduzir
1. Abrir o Postman (ou ferramenta similar)
2. Selecionar o método **DELETE**
3. Inserir a URL: https://automationexercise.com/api/deleteAccount
4. Ir até a aba **Body**
5. Selecionar o formato:`Form URL Encoded`
6. Inserir os parâmetros:
- **email:** seu_email_cadastrado  
- **password:** sua_senha  
7. Clicar em **Send**
8. Observar a resposta da API

---

### ❗ Resultado atual
A API permite a exclusão da conta apenas com email e senha no body, sem autenticação via token ou mecanismo adicional de validação de sessão.

---

### ✅ Resultado esperado
- Exigir autenticação válida (token/session/JWT)
- Validar autorização antes da execução da operação
- Retornar códigos apropriados:
- `401 Unauthorized` → ausência de autenticação
- `403 Forbidden` → usuário sem permissão

---

### ⚠️ Impacto
- Vulnerabilidade crítica de segurança (Broken Access Control)
- Possibilidade de automação de deleção de contas
- Exposição do endpoint a uso indevido
- Não conformidade com boas práticas de segurança (OWASP Top 10)
- Risco direto à integridade dos dados dos usuários

## 👩‍💻 Desenvolvido por

**Jessica Thaís Machado**
```
