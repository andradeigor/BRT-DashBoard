import connection from "../../database/index.js";

export default {
  async Bairros(req, res) {
    try {
      connection.query(
        `select Nome,Qntd,ano,Nome_Bairro  from VendaEstacao natural join Estacao natural join Bairro where Qntd >0;`,
        async function (error, results, fields) {
          if (error) res.status(500).send();
          res.send(results);
        }
      );
    } catch (error) {
      throw error;
    }
  },
};
