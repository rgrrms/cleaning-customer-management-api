## Cleaning Customer Management - API

Essa API foi desenvolvido como um teste. 

Utilizo as seguintes versões nesse projeto
### PostgreSQL 16
### Node 16.13.2

Para baixar as dependecias utilize o comando a seguir:

### `npm install`

e para rodar é só utilizar o comando a seguir:

### `npm start`

Para criação da base e da tabela de cliente utilizei o código abaixo:

```roomsql
CREATE DATABASE cleaning
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	
	
CREATE TABLE customers (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(12),
    x INT,
    y INT
);
```

### ENDPOINTS

1. Listar clientes:

`GET http://localhost:3001/v1/`

Retorna:
Quando tiver sucesso retorna Status:
`200 OK`

```json
[
    {
        "id": 1,
        "name": "Apple",
        "email": "teste@teste.com",
        "phone": "5198765432",
        "x": 1,
        "y": 1
    }
]
```


2. Cadastrar Clientes:
`POST http://localhost:3001/v1/`

Payload:
```json
{
    "name": "Rodrigo",
    "email": "rodrigo@teste.com",
    "phone": "51987654321",
    "x": 1,
    "y": 1
}
```

Retorna:
Quando tiver sucesso retorna Status:
`201 CREATED`

3. Calcular Rota:

`GET http://localhost:3001/v1/routes`

Retorna:
Quando tiver sucesso retorna Status:
`200 OK`

```json
[
    {
        "name": "empresa",
        "x": 0,
        "y": 0
    },
    {
        "name": "Rodrigo",
        "x": 1,
        "y": 5
    },
    {
        "name": "Paulo",
        "x": 1,
        "y": 2
    },
    {
        "name": "Fernando",
        "x": 1,
        "y": 1
    },
    {
        "name": "empresa",
        "x": 0,
        "y": 0
    }
]
```