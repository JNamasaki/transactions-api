### API de Transações Financeiras

---

## Overview
Esta API fornece endpoints para gerenciar transações financeiras e contas. Ela suporta operações como criação, recuperação, atualização e exclusão de transações e contas. Além disso, oferece funcionalidade para consultar os saldos das contas.

---

## Endpoints

### Root Endpoint

### Transactions

#### 1. **Obter Todas as Transações**
- **`GET /transactions`**  
    Retorna uma lista de todas as transações.

  **Response**:  
  - **`200`**: Lista de transações.  
  - **`404`**: Nenhuma transação encontrada.   

#### 2. **Criar uma Transação**
- **`POST /transactions`**  
  Cria uma nova transação 

  **Request Body**:  
  ```json
  {
    "idContaPagador": "string",
    "nomePagador": "string",
    "idContaRecebedor": "string",
    "nomeRecebedor": "string",
    "tipoContaRecebedor": "string",
    "tipoTransacao": "string",
    "valor": "number"
  }
  ```

  **Response**:  
  - **`201`**: Transação criada com sucesso.  
  - **`400`**: Dados obrigatórios ausentes ou tipo de transação inválido.  
  - **`405`**: Violação de regra de negócio.  
  - **`500`**: Erro ao salvar a transação.

#### 3. **Atualizar uma Transação**
- **`PUT /transactions/:id`**  
  Atualiza uma transação existente.  

  **Request Parameters**:  
  - `id`: Transaction ID.  

  **Request Body**:  
  ```json
  {
    "fieldToUpdate": "newValue"
  }
  ```

  **Response**:  
  - **`200`**: Transação atualizada com sucesso 
  - **`404`**: Transação não encontrada. 
  - **`500`**: Erro ao atualizar a transação.  

#### 4. **Deletar uma Transação**
- **`DELETE /transactions/:id`**  
  Exclui uma transação existente. 

  **Request Parameters**:  
  - `id`: Transaction ID.  

  **Response**:  
  - **`200`**: Transação excluída.  
  - **`404`**: Transação não encontrada.  
  - **`500`**:  Erro ao excluir a transação. 

---

### Accounts

#### 1. **Pegar saldos bancarios**
- **`GET /balance`**  
  Retorna o saldo de todas as contas.  

  **Response**:  
  - **`200`**: Lista todas as contas com os saldos.  
  - **`500`**: Erro ao localizar contas.  

#### 2. **Cadastrar Conta**
- **`POST /accounts`**  
  Cria uma nova conta.  

  **Request Body**:  
  ```json
  {
    "nome": "string",
    "cpf": "string",
    "tipoConta": "string",
    "saldo": "number"
  }
  ```

  **Response**:  
  - **`200`**: Conta criada com sucesso.  
  - **`505`**: Dados obrigatorios faltando.  
  - **`500`**: Erro ao salvar conta.  

#### 3. **Atualizando Conta**
- **`PUT /accounts/:id`**  
  Atualiza ou altera dados da conta.  

  **Request Parameters**:  
  - `id`: Account ID.  

  **Request Body**:  
  ```json
  {
    "fieldToUpdate": "newValue"
  }
  ```

  **Response**:  
  - **`200`**: Conta atualizada com sucesso.  
  - **`404`**: Conta náo encontrada.  
  - **`500`**: Erro ao atualizar conta.  

#### 4. **Deletar conta**
- **`DELETE /accounts/:id`**  
  Deletar conta.  

  **Request Parameters**:  
  - `id`: Account ID.  

  **Response**:  
  - **`200`**: Conta deletada.  
  - **`404`**: Conta náo encontrada.  
  - **`500`**: Erro ao deletar conta.  

---

## Tratamento de Erros

A API retorna mensagens de erro consistentes para erros de cliente e servidor. Cada resposta de erro inclui um campo msg e, em alguns casos, detalhes adicionais para depuração.

---

## Registro de Logs

Todas as operações críticas e erros são registrados no log da aplicação para rastreamento e depuração.

---

## Setup
### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository.  
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the server:  
   ```bash
   npm start
   ```

---

## License
This project is licensed under the MIT License.