
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createEstatus: (req, res) => {
    const State = req.body.State;
    const IdUsuarioCreador = req.body.CreadoPor;

    if (State == null || /^[\s]*$/.test(State)) {
      return res.status(409).send({
        error: "Ingrese Estatus",
      });
    } else {
      db.query(`CALL sp_AgregarEstatus('${IdUsuarioCreador}', '${State}' )`, (err, result) => {
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
  getEstatus: (req, res) => {
    db.query(`CALL sp_ListadoEstatus()`, (err, result) => {
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
  getDetailEstatus: (req, res) => {
    const IdState = req.body.IdEstatus;
    db.query(`CALL sp_DetalleEstatus('${IdState}')`, (err, result) => {
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
  modifyEstatus: (req, res) => {
    const IdState = req.body.IdEstatus;
    const NuevaState = req.body.NuevoEstatus;
    const IdUsuarioModificador = req.body.ModificadoPor;


    if (IdState == null || /^[\s]*$/.test(IdState)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }
    
    if (NuevaState == null || /^[\s]*$/.test(NuevaState)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Estatus",
      });
    } else {
      db.query(
        `CALL sp_ModificaEstatus('${IdState}','${NuevaState}','${IdUsuarioModificador}')`,
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
  deleteEstatus: (req, res) => {
    const IdState = req.body.IdEstatus;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaEstatus('${IdState}', '${IdUsuarioModificador}')`,
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
