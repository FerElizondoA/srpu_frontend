
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createInstitucionFinanciera: (req, res) => {
    const Descripcion = req.body.Descripcion;
    const IdUsuarioCreador = req.body.IdUsuario;

    if (Descripcion == null || /^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese Institución Financiera",
      });
    } else {
      db.query(`CALL sp_AgregarInstitucionFinanciera('${IdUsuarioCreador}', '${Descripcion}' )`, (err, result) => {
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
  getInstitucionesFinancieras: (req, res) => {
    db.query(`CALL sp_ListadoInstitucionesFinancieras()`, (err, result) => {
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
  getDetailInstitucionFinanciera: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    db.query(`CALL sp_DetalleInstitucionFinanciera('${IdDescripcion}')`, (err, result) => {
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
  modifyInstitucionFinanciera: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    const NuevaInstitucion = req.body.Descripcion;
    const IdUsuarioModificador = req.body.IdUsuario;


    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }
    
    if (NuevaInstitucion == null || /^[\s]*$/.test(NuevaInstitucion)) {
      return res.status(409).send({
        error: "Ingrese Nueva Institución Financiera",
      });
    } else {
      db.query(
        `CALL sp_ModificaInstitucionFinanciera('${IdDescripcion}','${NuevaInstitucion}','${IdUsuarioModificador}')`,
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
  deleteInstitucionFinanciera: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaInstitucionFinanciera('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
