import connection from "../../database/index.js";

export default {
  async EstacaoVendas(req, res) {
    const year = req.query.year;
    try {
      if (!year) {
        connection.query(
          `select distinct Nome,Qntd,ano,Nome_Bairro from Bairro join (select * from VendaEstacao natural join Estacao where Qntd >0) as P on P.ID_Bairro=Bairro.ID_Bairro ;          `,
          async function (error, results, fields) {
            if (error) res.status(500).send();
            res.send(results);
          }
        );
      } else {
        connection.query(
          `select distinct Nome,Qntd,ano,Nome_Bairro from Bairro join (select * from VendaEstacao natural join Estacao where Qntd >0) as P on P.ID_Bairro=Bairro.ID_Bairro where ano=${year};          `,
          async function (error, results, fields) {
            if (error) res.status(500).send();
            res.send(results);
          }
        );
      }
    } catch (error) {
      throw error;
    }
  },
  async EstacaoVendasTotais(req, res) {
    connection.query(
      `select Nome,sum(Qntd) as totalVendas,Nome_Bairro from VendaEstacao natural join Estacao natural join Bairro where Qntd >0 group by ID_Estacao order by totalVendas  desc ;`,
      async function (error, results, fields) {
        if (error) res.status(500).send();
        res.send(results);
      }
    );
  },
};
