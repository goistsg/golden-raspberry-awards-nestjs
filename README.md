# Golden Raspberry Awards

## Description

API RESTful para possibilitar a leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

## Technologies and libraries

- NestJS – Framework principal para construção da API.
- TypeORM – ORM para integração com banco de dados relacional.
- SQLite – Banco de dados padrão para desenvolvimento e testes.
- Swagger – Documentação automática dos endpoints.
- Jest – Testes automatizados (unitários e integração).
- Supertest – Testes de integração dos endpoints HTTP.
- class-validator/class-transformer – Validação e transformação de DTOs.

## Attention

Ao iniciar a aplicação, a lista de filmes do Golden Raspberry Awards é automaticamente carregada a partir de um arquivo CSV e inserida no banco de dados.
Assim, você já pode consultar e testar os endpoints sem precisar cadastrar filmes manualmente após o primeiro start.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# e2e tests
$ npm run test:e2e
```

## Endpoints principais

A API estará disponível em: **http://localhost:3000**

### Awards

- **GET /awards**
  - Lista todos os filmes. Parâmetros opcionais: `limit`, `page`, `year`, `studio`.
  - Exemplo: `GET http://localhost:3000/awards?year=1990&studio=Warner`

- **GET /awards/winners**
  - Lista todos os vencedores do prêmio.
  - Exemplo: `GET http://localhost:3000/awards/winners`

- **POST /awards**
  - Cria um novo filme/prêmio.
  - Exemplo:
    ```json
    POST http://localhost:3000/awards
    {
      "year": 2022,
      "title": "Filme Teste",
      "studios": "Estúdio Teste",
      "producers": "Produtor Teste",
      "winner": false
    }
    ```

- **PUT /awards**
  - Atualiza um filme/prêmio existente.
  - Exemplo:
    ```json
    PUT http://localhost:3000/awards
    {
      "id": 1,
      "title": "Filme Atualizado"
    }
    ```

- **DELETE /awards/:id**
  - Remove um filme/prêmio pelo ID.
  - Exemplo: `DELETE http://localhost:3000/awards/1`

### Producers

- **GET /awards/producers/interval**
  - Lista os produtores com maior e menor intervalo entre vitórias.
  - Exemplo: `GET http://localhost:3000/awards/producers/interval`

## Documentação Swagger

Acesse a documentação interativa e completa dos endpoints em:

**http://localhost:3000/api**

Nela você pode testar todos os endpoints diretamente pelo navegador.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Licença

Este projeto está sob a licença MIT.
