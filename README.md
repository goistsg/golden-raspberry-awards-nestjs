
# Golden Raspeberry Awards

## Description

API RESTful para possibilitar a leitura da lista de indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards.

## Technologies and libraries

NestJS – Framework principal para construção da API.
TypeORM – ORM para integração com banco de dados relacional.
SQLite – Banco de dados padrão para desenvolvimento e testes.
Swagger – Documentação automática dos endpoints.
Jest – Testes automatizados (unitários e integração).
Supertest – Testes de integração dos endpoints HTTP.
class-validator/class-transformer – Validação e transformação de DTOs.

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

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## Licença

Este projeto está sob a licença MIT.
