const db = require("../config/db.js");

module.exports = {
  //CREAR  
  createDestino: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const Destino = req.body.Destino;

    if ((Destino == null ||/^[\s]*$/.test(Destino)) && Destino.length() <= 255) {
      return res.status(409).send({
        error: "Ingresé Destino válido.",
      });
    } 
    if ((IdUsuario == null || /^[\s]*$/.test(IdUsuario)) && IdUsuario.length() <= 36) {
        return res.status(409).send({
          error: "Ingresé Id usuario válido.",
        });
      } 
    else {
      db.query(
        `CALL sp_AgregarDestino('${IdUsuario}', '${Destino}' )`,
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
              data,
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

  //LISTADO COMPLETO
  getDestinos: (req, res) => {
    db.query(`CALL sp_ListadoDestinos()`, (err, result) => {
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
  getDetailDestino: (req, res) => {
    const IdDestino = req.body.IdDestino;
    if (IdDestino == null ||/^[\s]*$/.test(IdDestino)) {
        return res.status(409).send({
          error: "Ingresé IdDestino.",
        });
      } 

    db.query(
      `CALL sp_DetalleDestino('${IdDestino}')`,
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
            data,
          });
        } else {
          return res.status(409).send({
            error: "¡Sin Información!",
          });
        }
      }
    );
  },

  //MODIFICA POR ID
  modifyDestino: (req, res) => {
    const IdDestino = req.body.IdDestino;
    const Destino = req.body.Destino;
    const IdUsuarioModificador = req.body.ModificadoPor;

    if (IdDestino == null ||/^[\s]*$/.test(IdDestino)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (Destino == null ||/^[\s]*$/.test(Destino)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Clave de inscripcion",
      });
    }
    
    if (IdUsuarioModificador == null ||/^[\s]*$/.test(IdUsuarioModificador)) {
        return res.status(409).send({
          error: "Ingrese Id usuario modificador",
        });
      } else {
      db.query(
        `CALL sp_ModificaDestino('${IdDestino}','${Destino}','${IdUsuarioModificador}')`,
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
  deleteDestino: (req, res) => {
    const IdDestino = req.body.IdDestino;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaDestino('${IdDestino}', '${IdUsuarioModificador}')`,
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
