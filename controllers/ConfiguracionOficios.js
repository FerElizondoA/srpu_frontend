const db = require("../config/db.js");

module.exports = {
  //CREAR
  createConfiguracionOficios: (req, res) => {
    const { Tipo, Descripcion, CreadoPor } = req.body;

    if (Tipo == null || /^[\s]*$/.test(Tipo)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }
    if (Descripcion == null || /^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    db.query(
      `CALL sp_AgregarConfiguracionOficios('${Tipo}', '${Descripcion}', '${CreadoPor}'  )`,
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

  //LISTADO COMPLETO
  getConfiguracionOficios: (req, res) => {
    db.query(`CALL sp_ListadoConfiguracionOficios()`, (err, result) => {
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

  //LISTADO COMPLETO
  getHeader: (req, res) => {
    db.query(`CALL sp_DetalleHeader()`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: " ",
        });
      }
      if (result.length) {
        const data = result[0][0].Descripcion;
        return res.status(200).send({
          data,
        });
      } else {
        return res.status(409).send({
          error: " ",
        });
      }
    });
  },

  // DETALLE POR ID
  getDetailConfiguracionOficios: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese IdDescripcion.",
      });
    }

    db.query(
      `CALL sp_DetalleConfiguracionOficios('${IdDescripcion}')`,
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
  modifyConfiguracionOficios: (req, res) => {
    let { IdDescripcion, Descripcion, IdUsuario } = req.body;

    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (Descripcion == null || /^[\s]*$/.test(Descripcion)) {
      Descripcion = "";
    }

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese Id usuario modificador",
      });
    } else {
      db.query(
        `CALL sp_ModificaConfiguracionOficios('${IdDescripcion}','${Descripcion}','${IdUsuario}')`,
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
  deleteConfiguracionOficios: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaConfiguracionOficios('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
