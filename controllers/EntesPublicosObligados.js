
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createEntePublicoObligado: (req, res) => {
    const EntePublicoObligado = req.body.EntePublicoObligado;
    const IdUsuarioCreador = req.body.CreadoPor;

    if (EntePublicoObligado == null || /^[\s]*$/.test(EntePublicoObligado)) {
      return res.status(409).send({
        error: "Ingrese Ente Publico Obligado",
      });
    } else {
      db.query(`CALL sp_AgregarEntePublicoObligado('${IdUsuarioCreador}', '${EntePublicoObligado}' )`, (err, result) => {
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
    }
  },

  //LISTADO COMPLETO
  getEntePublicoObligado: (req, res) => {
    db.query(`CALL sp_ListadoEntesPublicosObligados()`, (err, result) => {
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
  getDetailEntePublicoObligado: (req, res) => {
    const IdEntePublicoObligado = req.body.IdEntePublicoObligado;
    db.query(`CALL sp_DetalleEntePublicoObligado('${IdEntePublicoObligado}')`, (err, result) => {
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

  //MODIFICA POR ID
  modifyEntePublicoObligado: (req, res) => {
    const IdEntePublicoObligado = req.body.IdEntePublicoObligado;
    const NuevaEntePublicoObligado = req.body.NuevoEntePublicoObligado;
    const IdUsuarioModificador = req.body.ModificadoPor;


    if (IdEntePublicoObligado == null || /^[\s]*$/.test(IdEntePublicoObligado)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }
    
    if (NuevaEntePublicoObligado == null || /^[\s]*$/.test(NuevaEntePublicoObligado)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Ente Publico Obligado",
      });
    } else {
      db.query(
        `CALL sp_ModificaEntePublicoObligado('${IdEntePublicoObligado}','${NuevaEntePublicoObligado}','${IdUsuarioModificador}')`,
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
  deleteEntePublicoObligado: (req, res) => {
    const IdEntePublicoObligado = req.body.IdEntePublicoObligado;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaEntePublicoObligado('${IdEntePublicoObligado}', '${IdUsuarioModificador}')`,
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
