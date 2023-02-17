
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createFuenteAlternaDePago: (req, res) => {
    const FuenteAlternaDePago = req.body.FuenteAlternaDePago;
    const IdUsuarioCreador = req.body.CreadoPor;

    if (FuenteAlternaDePago == null || /^[\s]*$/.test(FuenteAlternaDePago)) {
      return res.status(409).send({
        error: "Ingrese Fuente Alterna De Pago",
      });
    } else {
      db.query(`CALL sp_AgregarFuenteAlternaDePago('${IdUsuarioCreador}', '${FuenteAlternaDePago}' )`, (err, result) => {
        console.log(err);
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
  getDetailFuenteAlternaDePago: (req, res) => {
    const IdFuenteAlternaDePago = req.body.IdFuenteAlternaDePago;
    db.query(`CALL sp_DetalleFuenteAlternaDePago('${IdFuenteAlternaDePago}')`, (err, result) => {
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
    const IdFuenteAlternaDePago = req.body.IdFuenteAlternaDePago;
    const NuevaFuenteAlternaDePago = req.body.NuevoFuenteAlternaDePago;
    const IdUsuarioModificador = req.body.ModificadoPor;


    if (IdFuenteAlternaDePago == null || /^[\s]*$/.test(IdFuenteAlternaDePago)) {
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
        `CALL sp_ModificaFuenteAlternaDePago('${IdFuenteAlternaDePago}','${NuevaFuenteAlternaDePago}','${IdUsuarioModificador}')`,
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
    const IdFuenteAlternaDePago = req.body.IdFuenteAlternaDePago;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaFuenteAlternaDePago('${IdFuenteAlternaDePago}', '${IdUsuarioModificador}')`,
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
