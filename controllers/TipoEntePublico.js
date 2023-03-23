
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createTipoEntePublico: (req, res) => {
    const Descripcion = req.body.Descripcion;
    const IdUsuarioCreador = req.body.IdUsuario;

    if (Descripcion == null || /^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese Tipo Ente Publico",
      });
    } else {
      db.query(`CALL sp_AgregarTipoEntePublico('${IdUsuarioCreador}', '${Descripcion}' )`, (err, result) => {
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
    const IdDescripcion = req.body.IdDescripcion;
    db.query(`CALL sp_DetalleTipoEntePublico('${IdDescripcion}')`, (err, result) => {
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
    const IdDescripcion = req.body.IdDescripcion;
    const NuevaTipoEntePublico = req.body.Descripcion;
    const IdUsuarioModificador = req.body.IdUsuario;


    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
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
        `CALL sp_ModificaTipoEntePublico('${IdDescripcion}','${NuevaTipoEntePublico}','${IdUsuarioModificador}')`,
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
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaTipoEntePublico('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
