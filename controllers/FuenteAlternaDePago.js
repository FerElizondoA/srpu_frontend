
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createFuenteAlternaDePago: (req, res) => {
    const Descripcion = req.body.Descripcion;
    const IdUsuarioCreador = req.body.IdUsuario;

    if (Descripcion == null || /^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese Fuente Alterna De Pago",
      });
    } else {
      db.query(`CALL sp_AgregarFuenteAlternaDePago('${IdUsuarioCreador}', '${Descripcion}' )`, (err, result) => {
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
  getFuenteAlternaDePago: (req, res) => {
    db.query(`CALL sp_ListadoFuentesAlternasDePago()`, (err, result) => {
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
  getDetailFuenteAlternaDePago: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    db.query(`CALL sp_DetalleFuenteAlternaDePago('${IdDescripcion}')`, (err, result) => {
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
  modifyFuenteAlternaDePago: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    const NuevaFuenteAlternaDePago = req.body.Descripcion;
    const IdUsuarioModificador = req.body.IdUsuario;


    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }
    
    if (NuevaFuenteAlternaDePago == null || /^[\s]*$/.test(NuevaFuenteAlternaDePago)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Fuente Alterna De Pago",
      });
    } else {
      db.query(
        `CALL sp_ModificaFuenteAlternaDePago('${IdDescripcion}','${NuevaFuenteAlternaDePago}','${IdUsuarioModificador}')`,
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
  deleteFuenteAlternaDePago: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaFuenteAlternaDePago('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
