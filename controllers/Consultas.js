const db = require("../config/db.js");

module.exports = {
  sumaPorcentajeAcumulado: (req, res) => {
    const { tabla } = req.query;

    db.query(`CALL sp_SumaPorcentajeAcumulado('${tabla}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0][0];
        if (data.error) {
          return res.status(409).send({
            result: data,
          });
        }
        return res.status(200).send({
          data,
        });
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },

  listaMecanismosDePago: (req, res) => {
    const { tabla } = req.query;

    db.query(`CALL sp_ListaMecanismosDePago('${tabla}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0];
        if (data.error) {
          return res.status(409).send({
            result: data,
          });
        }
        return res.status(200).send({
          data,
        });
      } else {
        return res.status(409).send({
          error: "¡Sin Información!",
        });
      }
    });
  },
};
