# Automation Exercise - QA Challenge

Projeto desenvolvido para o case técnico de QA Pleno utilizando Cypress para automação UI e API, além de testes exploratórios e análise de qualidade da aplicação.

---

# Objetivo

Validar o fluxo ponta a ponta do e-commerce Automation Exercise através de:
- automação de testes UI;
- automação de testes API;
- testes exploratórios;
- análise de edge cases;
- documentação de bugs e melhorias críticas.

---

# Tecnologias utilizadas

- Cypress
- JavaScript
- FakerJS
- Bruno (API Testing)
- GitHub

---
# Parte 1.1 — BDD

## Funcionalidade: Finalização de compra com cadastro obrigatório

```gherkin
Funcionalidade: Finalização de compra com cadastro obrigatório

  Como visitante do e-commerce
  Quero realizar meu cadastro durante o processo de compra
  Para concluir a aquisição de produtos na plataforma

  Contexto:
    Dado que acesso a loja "Automation Exercise"
    E possuo produtos adicionados ao carrinho

  Cenário: Finalizar compra realizando cadastro de novo usuário
    Quando acesso o checkout
    E escolho a opção de registro de novo usuário
    E informo dados válidos para criação da conta
    E concluo o cadastro com sucesso
    E confirmo os dados de entrega e cobrança
    E informo um cartão de crédito válido
    E confirmo a finalização da compra
    Então o sistema deve exibir a mensagem "Pedido realizado com sucesso"
    E o pedido deve ser registrado para o usuário criado
    E a conta do usuário deve permanecer ativa após a compra

  Cenário: Excluir conta após finalizar compra
    Dado que o usuário possui uma conta cadastrada
    E realizou uma compra com sucesso
    Quando solicitar a exclusão da conta
    Então o sistema deve excluir a conta permanentemente
    E exibir a mensagem "Conta excluída com sucesso"
```
# Parte 1.2 — Testes Exploratórios / Edge Cases

## 1. Double submit no pagamento

### Objetivo
Validar o comportamento da aplicação ao receber múltiplos cliques consecutivos no botão de confirmação da compra.

### Cenário
```gherkin
Cenário: Evitar múltiplos envios do pedido

  Dado que o usuário está na etapa de pagamento
  E informou dados válidos de pagamento

  Quando clicar rapidamente múltiplas vezes no botão "Pay and Confirm Order"

  Então o sistema deve processar apenas um pedido
  E o botão deve ser desabilitado durante o processamento
  E não devem existir pedidos duplicados
```

### Risco
Possível geração de pedidos duplicados e inconsistência financeira.

---

## 2. Validação de dados inválidos no pagamento

### Objetivo
Validar o tratamento de entradas inválidas nos campos financeiros do checkout.

### Cenário
```gherkin
Cenário: Impedir conclusão da compra com dados inválidos

  Dado que o usuário está na etapa de pagamento

  Quando informar letras e caracteres especiais nos campos:
    | Campo             |
    | Card Number       |
    | CVC               |
    | Expiration Month  |
    | Expiration Year   |

  E tentar concluir a compra

  Então o sistema deve exibir mensagens de validação
  E impedir a finalização do pedido
```

### Risco
Submissão de dados inconsistentes e falhas no fluxo financeiro.

---

## 3. Expiração de sessão durante checkout

### Objetivo
Validar o comportamento da aplicação quando a sessão expira durante o processo de compra.

### Cenário
```gherkin
Cenário: Manter consistência do checkout após expiração de sessão

  Dado que o usuário possui produtos adicionados ao carrinho
  E está no processo de checkout

  Quando a sessão expirar durante a compra

  Então o sistema deve solicitar novo login
  E os produtos do carrinho devem permanecer salvos
  E o usuário deve conseguir continuar a compra após autenticação
```

### Risco
Perda de carrinho, abandono de compra e inconsistência na experiência do usuário.

# Parte 2 - Automação API/UI

# Como executar a automação

## Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

- Git
- Node.js
- npm

---

# 1. Instalar Git

Download oficial:

```txt
https://git-scm.com/downloads
```

Após instalação, validar no terminal:

```bash
git --version
```

---

# 2. Instalar Node.js

Download oficial:

```txt
https://nodejs.org/
```

Recomendado:
- Node.js LTS

Após instalação, validar:

```bash
node -v
npm -v
```

---

# 3. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

---

# 4. Acessar a pasta do projeto

```bash
cd automationexercise-qa-challenge
```

---

# 5. Instalar dependências

Executar o comando abaixo para instalar todas as dependências do projeto:

```bash
npm install
```

O comando irá instalar automaticamente:
- Cypress
- FakerJS
- demais bibliotecas utilizadas na automação

---

# 6. Executar automação

## Executar em modo interativo

```bash
npx cypress open
```

Após abrir o Cypress:
1. Selecionar "E2E Testing"
2. Escolher o navegador desejado
3. Executar os cenários disponíveis

---

## Executar em modo headless

Executa todos os testes sem interface gráfica:

```bash
npx cypress run
```

---

# Estrutura do projeto

```bash
cypress/
 └── e2e/
      ├── api/
      │    ├── products.cy.js
      │    └── register-user.cy.js
      │
      └── ui/
           └── checkout.cy.js
```

---

# Cenários automatizados

## API

### GET All Products List
Valida:
- status da resposta;
- estrutura da API;
- lista de produtos retornados.

### POST Create/Register User
Valida:
- criação dinâmica de usuário;
- retorno da API;
- responseCode da operação.

---

## UI (Front-end)

Fluxo ponta a ponta:
- adicionar produtos ao carrinho;
- realizar checkout;
- criar usuário dinamicamente;
- validar carrinho;
- preencher pagamento;
- validar compra concluída.


Jessica Thaís Machado
