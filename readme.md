# API para Teste Técnico

Este repositório contém uma aplicação desenvolvida como parte de um teste técnico. A aplicação foi construída utilizando **Node.js** e **TypeScript**, com o ORM **Sequelize** para interação com o banco de dados **MySQL**. Toda a aplicação é executada dentro de contêineres usando **Docker Compose**.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Sequelize ORM**: ORM (Object-Relational Mapping) para interagir com o banco de dados MySQL.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **Docker Compose**: Ferramenta para definir e gerenciar ambientes de múltiplos contêineres Docker.
- **Google Gemini API**: Integração com a API do Google Gemini.

## Endpoints Disponíveis

A aplicação expõe os seguintes endpoints:

- **POST /upload**: Endpoint para realizar o upload de arquivos ou dados.

**Modelo de Requisição**:

```json
{
 "image": "base64",
 "customer_code": "string",
 "measure_datetime": "datetime",
 "measure_type": "WATER" ou "GAS"
}

```

- **PATCH /confirm**: Endpoint para confirmação de dados ou operações.

**Modelo de Requisição**:

```json
{
 "measure_uuid": "string",
 "confirmed_value": "integer"
}

```

- **GET /<customer code>/list**: Endpoint para listar informações com base no código do cliente.
**Modelo de Requisição**:

{base url}/<customer code>/list?measure_type=WATER 


## Como Executar a Aplicação

1. **Clone este repositório**:

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

2. **Navegue até o diretório do projeto**:

    ```bash
    cd nome-do-repositorio
    ```

3. **Crie um arquivo `.env`**:
   - No diretório raiz do projeto, crie um arquivo `.env` e adicione sua chave da API do Google Gemini:

    ```plaintext
    GEMINI_API_KEY="sua_chave"
    ```

4. **Construa e inicie os contêineres usando Docker Compose**:

    ```bash
    docker-compose up --build
    ```

5. **Acesse a API**: 
    A API estará disponível em `http://localhost:5001`.

## Integração com a API do Google Gemini

Esta aplicação inclui uma integração com a API do Google Gemini, que permite realizar operações adicionais conforme as necessidades do projeto.

## Considerações Finais

Este projeto foi desenvolvido como parte de um teste técnico. Sugestões e contribuições são bem-vindas.

---