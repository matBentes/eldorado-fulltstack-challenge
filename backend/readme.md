# Eldorado FullStack Challenge - Backend

![list of books](https://github.com/matBentes/eldorado-fulltstack-challenge/blob/main/backend/images/list-book.png)

<table>
<tr>
<td>
API do CRUD de um sistema de biblioteca feito em NodeJS com Prisma e MySQL, os campos obrigatórios são ISBN, Name, Author, Copies, Pages. As funcionalidades incluídas nessa aplicação são de Listar, Criar, Editar, Deletar.
</td>
</tr>
</table>

## Demonstração
O app está rodando em: https://eldorado-challenge-fullstack.herokuapp.com/book

## Backend 
Este projeto está usando um serviço real com deploy no heroku, que você pode ver [aqui](https://eldorado-challenge-fullstack.herokuapp.com/book). O servidor está usando Prisma, Postgres (apenas em produção, localmente, o banco é MySQL).

Este serviço está sendo consumido por um serviço de frontend. Para conferir o repositório do frontend, acesse [aqui](https://github.com/matBentes/eldorado-fulltstack-challenge-frontend).

## O que está incluído 
- [x] Teste com supertest e Jest.
- [x] Arquitetura MVC.
- [x] Docker e docker-compose.  

## Setup

Clone o projeto e, na pasta dele, preencha o arquivo **.env.example** com os seus valores.

Execute os comandos para subir a aplicação.

```bash
npm i
npm run start
```

Não esqueça de levantar os serviços do container.

```bash
docker-compose up && docker-compose rm -fvs
```

## Rotas 
- GET - [http://localhost:3333/](http://localhost:3333/)
- GET - [http://localhost:3333/book](http://localhost:3333/book)
- POST - [http://localhost:3333/book](http://localhost:3333/book)
- PATCH - [http://localhost:3333/book](http://localhost:3333/book)
- DELETE - [http://localhost:3333/book](http://localhost:3333/book)

## TODO 
- Adicionar casos de testes 
- Melhorar a arquitetura do projeto 
- Implementar CI/CD 
- Implementar [melhores práticas](https://github.com/goldbergyoni/nodebestpractices) para NodeJS
