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
  async EstacaoVendaAnos(req, res) {
    connection.query(
      `select Nome,ano,Qntd,Nome_Bairro  from VendaEstacao natural join Estacao natural join Bairro where Qntd >0 order by Qntd  desc;`,
      async function (error, results, fields) {
        if (error) res.status(500).send();
        res.send(results);
      }
    );
  },
  async VendasAnoTotais(req, res) {
    connection.query(
      `select ano,sum(Qntd) as totalVendas from VendaEstacao natural join Estacao where ID_Venda in (select ID_Venda from VendaEstacao where Qntd >0) group by ano order by ano;`,
      async function (error, results, fields) {
        if (error) res.status(500).send();
        res.send(results);
      }
    );
  },
  async VendaValores(req, res) {
    connection.query(
      `select distinct ano,tarifa from VendaEstacao natural join Venda;`,
      async function (error, results, fields) {
        if (error) res.status(500).send();
        res.send(results);
      }
    );
  },
  async EstacoesPorBairo(req, res) {
    connection.query(
      `select Nome_Bairro, count(ID_estacao) as QntdEstacao, avg(IDH) as IDH from Qntd_Familia natural join Bairro left outer join Estacao on Bairro.ID_Bairro = Estacao.ID_Bairro group by Nome_Bairro  order by IDH;`,
      async function (error, results, fields) {
        if (error) res.status(500).send();
        res.send(results);
      }
    );
  },

  async VendasEstacaoPorIDH(req, res) {
    const order = req.query.filter;
    if (order == "IDH") {
      connection.query(
        `select Nome_Bairro, sum(Qntd) as vendas, avg(${order}) as ${order} from VendaEstacao natural join Venda natural join Estacao natural join Bairro group by Nome_Bairro order by ${order};`,
        async function (error, results, fields) {
          if (error) res.status(500).send();
          res.send(results);
        }
      );
    } else {
      connection.query(
        `select Nome_Bairro, sum(Qntd) as vendas, avg(${order}) as ${order}  from VendaEstacao natural join Venda natural join Estacao natural join Bairro natural join Qntd_Familia group by Nome_Bairro order by ${order} desc ;`,
        async function (error, results, fields) {
          if (error) res.status(500).send();
          res.send(results);
        }
      );
    }
  },
  async VendasSoma(req, res) {
    connection.query(
      `select sum(Qntd) as Total from VendaEstacao where ID_Venda in (select ID_Venda from VendaEstacao where Qntd >0);`,
      async function (error, results, fields) {
        if (error) res.status(500).send();
        res.send(results);
      }
    );
  },
};
