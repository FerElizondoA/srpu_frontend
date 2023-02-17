const db = require("../config/db.js");

module.exports = {
  //CREAR
  createObligadoSolidarioAval: (req, res) => {
    const ObligadoSolidarioAval = req.body.ObligadoSolidarioAval;
    const IdUsuarioCreador = req.body.CreadoPor;

    if (
      ObligadoSolidarioAval == null ||
      /^[\s]*$/.test(ObligadoSolidarioAval)
    ) {
      return res.status(409).send({
        error: "Ingrese Obligado Solidario / Aval",
      });
    } else {
      db.query(
        `CALL sp_AgregarObligadoSolidarioAval('${IdUsuarioCreador}', '${ObligadoSolidarioAval}' )`,
        (err, result) => {
          console.log(result);
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
        }
      );
    }
  },

  //LISTADO COMPLETO
  getObligadoSolidarioAval: (req, res) => {
    db.query(`CALL sp_ListadoObligadosSolidariosAvales()`, (err, result) => {
      console.log(err);
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }

      if (result.length) {
        const data = result[0];
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

  // DETALLE POR ID
  getDetailObligadoSolidarioAval: (req, res) => {
    const IdObligadoSolidarioAval = req.body.IdObligadoSolidarioAval;
    db.query(
      `CALL sp_DetalleObligadoSolidarioAval('${IdObligadoSolidarioAval}')`,
      (err, result) => {
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
      }
    );
  },

  //MODIFICA POR ID
  modifyObligadoSolidarioAval: (req, res) => {
    const IdObligadoSolidarioAval = req.body.IdObligadoSolidarioAval;
    const NuevaObligadoSolidarioAval = req.body.NuevoObligadoSolidarioAval;
    const IdUsuarioModificador = req.body.ModificadoPor;

    if (
      IdObligadoSolidarioAval == null ||
      /^[\s]*$/.test(IdObligadoSolidarioAval)
    ) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (
      NuevaObligadoSolidarioAval == null ||
      /^[\s]*$/.test(NuevaObligadoSolidarioAval)
    ) {
      return res.status(409).send({
        error: "Ingrese Nuevo Obligado Solidario / Aval",
      });
    } else {
      db.query(
        `CALL sp_ModificaObligadoSolidarioAval('${IdObligadoSolidarioAval}','${NuevaObligadoSolidarioAval}','${IdUsuarioModificador}')`,
        (err, result) => {
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
              result: data,
            });
          } else {
            return res.status(409).send({
              error: "¡Sin Información!",
            });
          }
        }
      );
    }
  },

  //BORRADO LOGICO
  deleteObligadoSolidarioAval: (req, res) => {
    const IdObligadoSolidarioAval = req.body.IdObligadoSolidarioAval;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaObligadoSolidarioAval('${IdObligadoSolidarioAval}', '${IdUsuarioModificador}')`,
      (err, result) => {
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
            result: data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },
};
