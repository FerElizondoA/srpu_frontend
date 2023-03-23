const db = require("../config/db.js");

module.exports = {
  //CREAR
  createObligadoSolidarioAval: (req, res) => {
    const Descripcion = req.body.Descripcion;
    const IdUsuarioCreador = req.body.IdUsuario;

    if (
      Descripcion == null ||
      /^[\s]*$/.test(Descripcion)
    ) {
      return res.status(409).send({
        error: "Ingrese Obligado Solidario / Aval",
      });
    } else {
      db.query(
        `CALL sp_AgregarObligadoSolidarioAval('${IdUsuarioCreador}', '${Descripcion}' )`,
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
    }
  },

  //LISTADO COMPLETO
  getObligadoSolidarioAval: (req, res) => {
    db.query(`CALL sp_ListadoObligadosSolidariosAvales()`, (err, result) => {
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
    const IdDescripcion = req.body.IdDescripcion;
    db.query(
      `CALL sp_DetalleObligadoSolidarioAval('${IdDescripcion}')`,
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
    const IdDescripcion = req.body.IdDescripcion;
    const Descripcion = req.body.Descripcion;
    const IdUsuarioModificador = req.body.IdUsuario;

    if (
      IdDescripcion == null ||
      /^[\s]*$/.test(IdDescripcion)
    ) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (
      Descripcion == null ||
      /^[\s]*$/.test(Descripcion)
    ) {
      return res.status(409).send({
        error: "Ingrese Nuevo Obligado Solidario / Aval",
      });
    } else {
      db.query(
        `CALL sp_ModificaObligadoSolidarioAval('${IdDescripcion}','${Descripcion}','${IdUsuarioModificador}')`,
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
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaObligadoSolidarioAval('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
