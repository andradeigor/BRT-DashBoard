const { createConnection } = require("mysql2");
const { parse } = require("csv");
const fs = require("fs");
const crypto = require("crypto");

tarifas = {
  2012: 2.75,
  2013: 2.75,
  2014: 3,
  2015: 3.4,
  2016: 3.8,
  2017: 3.6,
  2018: 3.78,
  2019: 4.05,
  2020: 4.05,
  2021: 4.05,
  2022: 4.05,
};

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
const dataBrt = [];

setTimeout(() => {
  fs.createReadStream("./Passageiros nas estações do brt.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      dataBrt.push(row);
    });
}, 100);
const querriesEstacao = [];
const querriesVenda = [];
const querriesVendaEstacao = [];
setTimeout(() => {
  dataBrt.shift();
  const vendaIDS = [];
  for (let index = 0; index <= 9; index++) {
    const VendaID = crypto.randomUUID();
    vendaIDS.push(VendaID);
    const number = 2012 + index;
    querriesVenda.push(
      `INSERT INTO Venda VALUES("${VendaID}",${tarifas[number]})`
    );
  }
  dataBrt.forEach((item) => {
    const bairro = item[1]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
    const BairroFiltrado = data.filter((BairroData) => {
      const NomeBairro = BairroData.Nome_Bairro.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .split(",")[0];
      return NomeBairro == bairro;
    });
    const EstacaoId = crypto.randomUUID();
    querriesEstacao.push(
      `INSERT INTO Estacao VALUES("${EstacaoId}", true, "${item[0]}","${BairroFiltrado[0].ID_Bairro}")`
    );
    for (let index = 0; index < vendaIDS.length; index++) {
      const vendaId = vendaIDS[index];
      const ano = 2012 + index;
      const indexItem = 2 + index;
      querriesVendaEstacao.push(
        `INSERT INTO VendaEstacao VALUES(${ano},${
          item[indexItem] == "-"
            ? null
            : parseInt(item[indexItem].replace(/\s/g, ""))
        },"${vendaId}", "${EstacaoId}")`
      );
    }
  });
}, 200);

setTimeout(() => {
  connection.connect((er) => {
    if (er) {
      console.log(er);
    } else {
      querriesEstacao.forEach((item) => {
        connection.query(item, async function (error, results, fields) {
          if (error) throw error;
        });
      });
      querriesVenda.forEach((item) => {
        connection.query(item, async function (error, results, fields) {
          if (error) throw error;
        });
      });
      querriesVendaEstacao.forEach((item) => {
        connection.query(item, async function (error, results, fields) {
          if (error) throw error;
        });
      });
      connection.end();
    }
  });
}, 300);
