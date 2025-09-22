# 📦 Exercício 1 - Loja do Seu Manoel - API de Empacotamento

O projeto do Exercício 1 está disponível na pasta **orderBoxPacker/** deste repositório.

## Sobre o sistema

Este projeto é uma API em Node.js utilizando NestJS que automatiza o empacotamento de pedidos da Loja do Seu Manoel.  
A aplicação recebe pedidos com produtos e suas dimensões e retorna a melhor forma de embalar os produtos em caixas de papelão disponíveis, otimizando o uso de espaço.

### Principais funcionalidades:
- Empacotamento automático de pedidos em caixas de papelão.
- Definição de quais produtos vão em cada caixa, minimizando o número de caixas.
- API REST documentada com Swagger.
- Seeds iniciais de caixas, produtos e usuário admin.
- Testes unitários implementados com Jest.

### Estrutura e seed de demonstração
Ao iniciar o sistema via Docker, a estrutura do banco de dados é criada automaticamente com o PostgreSQL.  
Um conjunto de **seeds iniciais** é inserido (caixas, produtos e usuário admin) para facilitar os testes e a demonstração.

---

## ⚙️ Tecnologias principais

- Node.js + NestJS  
- TypeScript  
- PostgreSQL + TypeORM  
- Docker + Docker Compose  
- Jest para testes unitários  
- Swagger para documentação da API  

---

## 🚀 Como executar

### 1️⃣ Pré-requisitos
* Docker Desktop instalado e em execução.

### 2️⃣ Acessar a pasta do projeto
1. Acesse a pasta `orderBoxPacker/`.
2. Execute:
	```bash
	docker compose up --build -d
	docker compose up
	```

# Exercício 2 - HORÁRIOS DE AULA

O projeto do Exercício 2 está disponível na pasta **classtimes/** deste repositório.

## Sobre o sistema

O sistema foi desenvolvido para demonstrar consultas de horários de aula, professores e salas, conforme solicitado pelo Professor Girafales.

### Principais funcionalidades:
- Consulta da quantidade de horas que cada professor tem comprometido em aulas (SQL pronta).
- Listagem de salas com horários livres e ocupados (SQL pronta).

### Estrutura e seed de demonstração
Ao iniciar o sistema, uma estrutura de tabelas e um seed de dados são criados automaticamente, permitindo testar e visualizar os relatórios sem necessidade de cadastro manual.

### Como executar
1. Acesse a pasta `classtimes/`.
2. Execute:
	```bash
	docker compose up --build -d
	docker compose up
	```
3. Os relatórios serão exibidos no console, já utilizando dados de exemplo.

Para detalhes das consultas e exemplos, veja o arquivo `README.md` dentro da pasta `classtimes/`.

## 📄 Licença

Projeto criado por [Tiago Gonçalves](https://www.linkedin.com/in/tiagogoncalvesdecastro) como parte de exercício técnico de automação de empacotamento.