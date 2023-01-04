const { createConnection } = require("mysql2");
const fs = require("fs");
const { parse } = require("csv");
const crypto = require("crypto");
import dotenv from "dotenv";
dotenv.config();
const connection = createConnection({
  host: "localhost",
  user: process.env.DATA_USER,
  password: process.env.DATA_PASS,
  database: "BRT",
  multipleStatements: true,
});
let data = [];
connection.connect(async (er) => {
  if (er) {
    console.log(er);
  } else {
    connection.query(
      `select * from Bairro`,
      async function (error, results, fields) {
        if (error) throw error;
        data = [...results];
      }
    );
  }
});
let dataQntFamilia = [];
setTimeout(() => {
  fs.createReadStream("./numero-bolsa-família.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      dataQntFamilia.push(row);
    });
}, 100);
let dataQntFamiliaRenda = [];
setTimeout(() => {
  fs.createReadStream("./per capita atualizada.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      dataQntFamiliaRenda.push(row);
    });
}, 200);

const querries = [];

setTimeout(
  () =>
    data.forEach(async (item) => {
      const nomeBairro = item.Nome_Bairro.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .split(",")[0];
      const nomeTrata = nomeBairro.split("(")[0];

      const BairroDados = dataQntFamilia.filter((item) => item[0] == nomeTrata);
      if (BairroDados.length > 0) {
        const BairroDadosRenda = dataQntFamiliaRenda.filter(
          (item) => item[0] == nomeTrata
        );
        if (BairroDados[0][1].includes(".")) {
          BairroDados[0][1] = Math.round(parseFloat(BairroDados[0][1]) * 1000);
        } else {
          BairroDados[0][1] = parseFloat(BairroDados[0][1]);
        }
        if (BairroDadosRenda[0][1].includes(".")) {
          BairroDadosRenda[0][1] = Math.round(
            parseFloat(BairroDadosRenda[0][1]) * 1000
          );
        } else {
          BairroDadosRenda[0][1] = parseFloat(BairroDadosRenda[0][1]);
        }
        if (BairroDadosRenda[0][2].includes(".")) {
          BairroDadosRenda[0][2] = Math.round(
            parseFloat(BairroDadosRenda[0][2]) * 1000
          );
        } else {
          BairroDadosRenda[0][2] = parseFloat(BairroDadosRenda[0][2]);
        }
        if (BairroDadosRenda[0][3].includes(".")) {
          BairroDadosRenda[0][3] = Math.round(
            parseFloat(BairroDadosRenda[0][3]) * 1000
          );
        } else {
          BairroDadosRenda[0][3] = parseFloat(BairroDadosRenda[0][3]);
        }
        if (BairroDadosRenda[0][4].includes(".")) {
          BairroDadosRenda[0][4] = Math.round(
            parseFloat(BairroDadosRenda[0][4]) * 1000
          );
        } else {
          BairroDadosRenda[0][4] = parseFloat(BairroDadosRenda[0][4]);
        }
        querries.push(
          `"${crypto.randomUUID()}", ${BairroDadosRenda[0][1]}, ${
            BairroDadosRenda[0][2]
          }, ${BairroDadosRenda[0][3]}, ${BairroDadosRenda[0][4]},${
            BairroDados[0][1]
          } ,"${item.ID_Bairro}"`
        );
      }
    }),
  300
);

setTimeout(() => {
  connection.connect((er) => {
    if (er) {
      console.log(er);
    } else {
      querries.forEach((item) => {
        connection.query(
          `insert into Qntd_Familia values(${item});`,
          async function (error, results, fields) {
            if (error) throw error;
          }
        );
      });
    }
  });
}, 400);
