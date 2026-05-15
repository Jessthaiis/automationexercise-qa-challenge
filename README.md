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
Validar o comportamento da aplicação ao receber múltiplos cliques no botão de confirmação da compra.

**Risco:**  
Possível criação de pedidos duplicados e inconsistência financeira.

---

### ⚠️ 2. Validação de dados inválidos no pagamento

**Objetivo:**  
Validar o tratamento de entradas inválidas nos campos financeiros (Card Number, CVC, Expiration).

**Risco:**  
Submissão de dados inconsistentes e falhas no fluxo de pagamento.

---

### ⚠️ 3. Expiração de sessão durante checkout

**Objetivo:**  
Validar se os produtos do carrinho permanecem após expiração de sessão e reautenticação.

**Risco:**  
Perda de carrinho, abandono de compra e má experiência do usuário.

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

## 👩‍💻 Desenvolvido por

**Jessica Thaís Machado**
```
