
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createFuenteDePago: (req, res) => {
    const FuenteDePago = req.body.FuenteDePago;
    const IdUsuarioCreador = req.body.CreadoPor;

    if (FuenteDePago == null || /^[\s]*$/.test(FuenteDePago)) {
      return res.status(409).send({
        error: "Ingrese Fuente De Pago",
      });
    } else {
      db.query(`CALL sp_AgregarFuenteDePago('${IdUsuarioCreador}', '${FuenteDePago}' )`, (err, result) => {
        console.log(result);
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
  getFuenteDePago: (req, res) => {
    db.query(`CALL sp_ListadoFuentesDePago()`, (err, result) => {
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
  getDetailFuenteDePago: (req, res) => {
    const IdFuenteDePago = req.body.IdFuenteDePago;
    db.query(`CALL sp_DetalleFuenteDePago('${IdFuenteDePago}')`, (err, result) => {
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
  modifyFuenteDePago: (req, res) => {
    const IdFuenteDePago = req.body.IdFuenteDePago;
    const NuevaFuenteDePago = req.body.NuevoFuenteDePago;
    const IdUsuarioModificador = req.body.ModificadoPor;


    if (IdFuenteDePago == null || /^[\s]*$/.test(IdFuenteDePago)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }
    
    if (NuevaFuenteDePago == null || /^[\s]*$/.test(NuevaFuenteDePago)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Fuente De Pago",
      });
    } else {
      db.query(
        `CALL sp_ModificaFuenteDePago('${IdFuenteDePago}','${NuevaFuenteDePago}','${IdUsuarioModificador}')`,
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
  deleteFuenteDePago: (req, res) => {
    const IdFuenteDePago = req.body.IdFuenteDePago;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaFuenteDePago('${IdFuenteDePago}', '${IdUsuarioModificador}')`,
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
