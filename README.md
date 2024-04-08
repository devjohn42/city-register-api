# API REST - City-Register

Uma api-rest para cadastro de cidades e pessoas com autenticação para usuários cadastrados.

## 🗺 Rotas - EndPoints

#### CIDADES - PRIVADO

- GET **_/cities_**: Busca uma lista das cidades cadastradas, com paginação e filtro por nome.
- POST **_/create-city_**: Cria/Cadastra uma nova cidade.
- GET **_/city/:id_**: Busca uma cidade pelo id.
- PUT **_/city-update/:id_**: Atualiza os dados de uma cidade pelo id.
- DELETE **_/city-delete/:id_**: Apaga uma cidade pelo id.

#### PESSOAS - PRIVADO

- GET **_/people_**: Busca uma lista das pessoas cadastradas, com paginação e filtro por nome.
- POST **_/create-person_**: Cria/Cadastra uma nova pessoa.
- GET **_/person/:id_**: Busca uma pessoa pelo id.
- PUT **_/person-update/:id_**: Atualiza os dados de uma pessoa pelo id.
- DELETE **_/person-delete/:id_**: Apaga uma pessoa pelo id.

#### USUÁRIOS - PÚBLICO

- POST **_/sign-in_**: Permite um usuário existente no sistema gerar um token de acesso para as rotas privadas.
- POST **_/sign-up_**: Permite criar um novo usuário.

### ⌨ Comandos

#### Clonar o projeto

```
git clone git@github.com:devjohn42/city-register-api.git
```

#### Instalar todas as dependências

```
npm install
```

#### Iniciar o Servidor Localmente

```
npm run server:dev
```

#### Criação das tabelas no ambiente de desenvolvimento

```
npm run knex:migrate
```

#### Inserção dos dados iniciais no banco de dados

```
npm run knex:seed
```

#### Reversão das últimas migrações aplicadas ao banco de dados.

```
npm run knex:rollback
```

#### Reversão de todas migrações aplicadas ao banco de dados.

```
npm run knex:rollback
```

#### Realizar Testes

```
npm run test
```

#### Produção

```
npm run production
```

### 🛠 Ferramentas Utilizadas

- Node.js
- Express.js
- Typescript
- Knex.js
- JWT
- Jest

### 🤝🏻 Contribuições

Contribuições são bem-vindas! Se você encontrar um problema ou desejar adicionar novos recursos, sinta-se à vontade para criar um Pull Request.

### Licença

Este projeto está licenciado sob a Licença MIT.
