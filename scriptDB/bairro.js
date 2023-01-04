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
const data = [];

connection.connect();
fs.createReadStream("./idh-bairro.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    data.push(`"${crypto.randomUUID()}", "${row[0]}", ${row[1]}`);
  })
  .on("end", () => {
    connection.connect((er) => {
      if (er) {
        console.log(er);
      } else {
        data.forEach((item) => {
          connection.query(
            `insert into Bairro values(${item});`,
            async function (error, results, fields) {
              if (error) throw error;
            }
          );
        });
      }
    });
  });
