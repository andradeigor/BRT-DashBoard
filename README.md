# DiscordBotUFRJ

Este projeto consiste num dashboard do BRT feito com dados públicos disponíveis no portal <a href="https://cecad.cidadania.gov.br/cras_local.php">CECAD</a> e no <a href="https://www.data.rio/">DataRio</a>, foi feito como trabalho final da disciplina de Bando de Dados.

- [Como usar](#como-usar)
- [Comandos](#comandos)
- [Tecnologias](#tecnologias)
- [Contribuidores](#contribuidores)
- [Licença](#licença)

## 🤖 Como Usar:

Criando o DataBase.

```sql
CREATE DATABASE BRT;

CREATE TABLE BAIRRO(ID_BAIRRO VARCHAR(255) PRIMARY KEY,NOME_BAIRRO
VARCHAR(255) NOT NULL,IDH DECIMAL(3,2) NOT NULL );

CREATE TABLE ESTACAO(ID_ESTACAO VARCHAR(255) PRIMARY KEY NOT NULL, NOME
VARCHAR(255) NOT NULL, ID_BAIRRO VARCHAR(255) NOT NULL, FOREIGN KEY
(ID_BAIRRO) REFERENCES BAIRRO(ID_BAIRRO));

CREATE TABLE QNTD_FAMILIA(ID_QTDFAM VARCHAR(255) NOT NULL PRIMARY
KEY,EXTREMA_POBREZA INT NOT NULL, POBREZA INT NOT NULL,BAIXA_RENDA
INT NOT NULL,ACIMA_1_2_SM INT NOT NULL, QNTD_BOLSAFAMILIA INT NOT NULL
, ID_BAIRRO VARCHAR(255) NOT NULL, FOREIGN KEY(ID_BAIRRO) REFERENCES BAIRRO(ID_BAIRRO));

CREATE TABLE VENDA(ID_VENDA VARCHAR(255) NOT NULL PRIMARY KEY, TARIFA DECIMAL(10,2) NOT NULL);

CREATE TABLE VENDAESTACAO(ANO INT NOT NULL, QNTD INT, ID_VENDA VARCHAR(255) NOT NULL
, ID_ESTACAO VARCHAR(255) NOT NULL, PRIMARY
KEY(ANO,ID_VENDA,ID_ESTACAO),FOREIGN KEY(ID_VENDA) REFERENCES
VENDA(ID_VENDA), FOREIGN KEY(ID_ESTACAO) REFERENCES ESTACAO(ID_ESTACAO) );

```

Populando o Banco de dados.

```bash
 # Clone esse repositório
 $ git clone https://github.com/andradeigor/BRT-DashBoard

 # Acesse a pasta dos scripts
 $ cd scriptDB/

 # Instale dependências
 $ yarn

 # Copie o .env.example e renomeie como .env
 $ cp .env.example .env

 # Substituia as variáveis de ambiente

 # Rode o script bairro.js
 $ node bairro.js

 # Rode o script qntd_familias.js
 $ node qntd_familias.js

 # Rode o script Venda-brt.js
 $ node Venda-brt.js

```

Rodando o BackEnd.

```bash
 # Acesse a pasta do backend
 $ cd backend/

 # Instale dependências
 $ yarn

 # Copie o .env.example e renomeie como .env
 $ cp .env.example .env

 # Substituia as variáveis de ambiente

 # Inicie o servidor
 $ yarn start

```

Rodando o FrontEnd.

```bash
 # Acesse a pasta do frontend
 $ cd web/

 # Instale dependências
 $ yarn

 # Inicie o servidor web
 $ yarn start

```

## 📜 Demonstração:

## 💻 Tecnologias:

- NodeJS
- Express
- CSV
- DotEnv
- Mysql2
- CORS
- React
- Axios
- Recharts
- Styled Components

## 👥 Contribuidores:

Esses são os contribuidores do projeto (<a href="https://allcontributors.org/docs/en/emoji-key">emoji key</a>).

<table>
  <tr>
    <td align="center"><a href="https://github.com/andradeigor"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/21049910?v=4" width="100px;" alt=""/><br /><sub><b>Igor Andrade</b></sub></a><br /><a href="#" title="Igor Andrade">🤔 💻 🚧</a></td>
    <td align="center"><a href="https://github.com/GCarolC"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/88149336?v=4" width="100px;" alt=""/><br /><sub><b>Carol Carvalho</b></sub></a><br /><a href="#" title="Carol Carvalho">🤔 💻 🚧</a></td>
    <td align="center"><a href="https://github.com/BeMyLewski"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/87191058?v=4" width="100px;" alt=""/><br /><sub><b>Bernardo Milewski</b></sub></a><br /><a href="#" title="Bernardo Milewski">🤔 💻 🚧</a></td>
  </tr>
</table>

## 📖 Licença

Este projeto está licenciado sob a licença <a href="https://choosealicense.com/licenses/mit/">MIT</a>.
