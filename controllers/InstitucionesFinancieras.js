
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createInstitucionFinanciera: (req, res) => {
    const Institucion = req.body.Institucion;
    const IdUsuarioCreador = req.body.CreadoPor;

    if (Institucion == null || /^[\s]*$/.test(Institucion)) {
      return res.status(409).send({
        error: "Ingrese Institución Financiera",
      });
    } else {
      db.query(`CALL sp_AgregarInstitucionFinanciera('${IdUsuarioCreador}', '${Institucion}' )`, (err, result) => {
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
    const IdInstitucion = req.body.IdInstitucion;
    db.query(`CALL sp_DetalleInstitucionFinanciera('${IdInstitucion}')`, (err, result) => {
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
    const IdInstitucion = req.body.IdInstitucion;
    const NuevaInstitucion = req.body.NuevaInstitucion;
    const IdUsuarioModificador = req.body.ModificadoPor;


    if (IdInstitucion == null || /^[\s]*$/.test(IdInstitucion)) {
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
        `CALL sp_ModificaInstitucionFinanciera('${IdInstitucion}','${NuevaInstitucion}','${IdUsuarioModificador}')`,
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
    const IdInstitucion = req.body.IdInstitucion;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaInstitucionFinanciera('${IdInstitucion}', '${IdUsuarioModificador}')`,
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
