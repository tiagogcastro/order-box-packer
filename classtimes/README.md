# 🏫 Classtimes - Sistema do Professor Girafales

Este projeto é um sistema para gestão de horários de aulas, professores e salas, criado para ajudar o Professor Girafales, novo diretor da escola do Chavito, a organizar a rotina escolar.

---

## 🧠 Objetivo

- Consultar a quantidade de horas que cada professor tem comprometido em aulas.
- Listar salas com horários livres e ocupados.

---

## ⚙️ Tecnologias principais

- Node.js
- PostgreSQL
- Docker

---

## 🚀 Como Iniciar o Projeto (Docker)

### Pré-requisitos
* Docker instalado e em execução.


### 1️⃣ Criar e subir os containers
```bash
docker compose up --build -d
```

### 2️⃣ Executar o sistema e ver os relatórios
```bash
docker compose up
```

## 📂 Estrutura

- `src/queries/professores.js`: Consulta de horas dos professores
- `src/queries/rooms.js`: Consultas de salas livres e ocupadas
- `src/config/database.js`: Configuração do banco de dados
- `src/setup/initDatabase.js`: Inicialização das tabelas

---

## Evidências do projeto

SQL para Database inicial

![SQL para Database inicial](.github/classtimes_initial_database.png)

Logs no Docker mostrando o resultado esperado

![Logs no Docker mostrando o resultado esperado](.github/classtimes_docker_logs.png)


## 👨‍🏫 Relatórios

Os relatórios podem ser gerados executando o projeto. Os resultados das consultas são exibidos no console.

---

## �️ Estrutura e Seed de Demonstração

O projeto já inclui uma estrutura de tabelas e um seed de dados para facilitar a demonstração do funcionamento. Ao iniciar o sistema, os dados de exemplo são inseridos automaticamente, permitindo visualizar os relatórios sem necessidade de cadastro manual.

Isso garante que, ao rodar o projeto, você já terá professores, salas, horários e aulas populados para testar as consultas e visualizar os resultados.
