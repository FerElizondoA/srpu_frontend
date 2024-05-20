
const db = require("../config/db.js");

module.exports = {
  //CREAR
  createTiposConvenio: (req, res) => {
    const Descripcion = req.body.Descripcion;
    const IdUsuarioCreador = req.body.IdUsuario;

    if (Descripcion == null || /^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese Tipo de Convenio",
      });
    } else {
      db.query(`CALL sp_AgregarTiposConvenio('${IdUsuarioCreador}', '${Descripcion}' )`, (err, result) => {
        if (err) {
            console.log(err)
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
  getTiposConvenio: (req, res) => {
    db.query(`CALL sp_ListadoTiposConvenio()`, (err, result) => {
      if (err) {
        console.log(err)
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
  getDetailTiposConvenio: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    db.query(`CALL sp_DetalleTiposConvenio('${IdDescripcion}')`, (err, result) => {
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
  modifyTiposConvenio: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    const NuevaTipoConvenio = req.body.Descripcion;
    const IdUsuarioModificador = req.body.IdUsuario;


    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
        console.log(err)
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }
    
    if (NuevaTipoConvenio == null || /^[\s]*$/.test(NuevaTipoConvenio)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Ente Publico Obligado",
      });
    } else {
      db.query(
        `CALL sp_ModificaTiposConvenio('${IdDescripcion}','${NuevaTipoConvenio}','${IdUsuarioModificador}')`,
        (err, result) => {
          if (err) {

            console.log(err)
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
  deleteTiposConvenio: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaTiposConvenio('${IdDescripcion}', '${IdUsuarioModificador}')`,
      (err, result) => {
        if (err) {
            console.log(err)
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
