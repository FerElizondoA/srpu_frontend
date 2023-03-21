
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createTipoEntePublico: (req, res) => {
    const TipoEntePublico = req.body.TipoEntePublico;
    const IdUsuarioCreador = req.body.CreadoPor;

    if (TipoEntePublico == null || /^[\s]*$/.test(TipoEntePublico)) {
      return res.status(409).send({
        error: "Ingrese Tipo Ente Publico",
      });
    } else {
      db.query(`CALL sp_AgregarTipoEntePublico('${IdUsuarioCreador}', '${TipoEntePublico}' )`, (err, result) => {
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
  getTiposEntePublico: (req, res) => {
    db.query(`CALL sp_ListadoTiposEntePublico()`, (err, result) => {
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
  getDetailTipoEntePublico: (req, res) => {
    const IdTipoEntePublico = req.body.IdTipoEntePublico;
    db.query(`CALL sp_DetalleTipoEntePublico('${IdTipoEntePublico}')`, (err, result) => {
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
  modifyTipoEntePublico: (req, res) => {
    const IdTipoEntePublico = req.body.IdTipoEntePublico;
    const NuevaTipoEntePublico = req.body.NuevoTipoEntePublico;
    const IdUsuarioModificador = req.body.ModificadoPor;


    if (IdTipoEntePublico == null || /^[\s]*$/.test(IdTipoEntePublico)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }
    
    if (NuevaTipoEntePublico == null || /^[\s]*$/.test(NuevaTipoEntePublico)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Ente Publico Obligado",
      });
    } else {
      db.query(
        `CALL sp_ModificaTipoEntePublico('${IdTipoEntePublico}','${NuevaTipoEntePublico}','${IdUsuarioModificador}')`,
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
  deleteTipoEntePublico: (req, res) => {
    const IdTipoEntePublico = req.body.IdTipoEntePublico;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaTipoEntePublico('${IdTipoEntePublico}', '${IdUsuarioModificador}')`,
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
