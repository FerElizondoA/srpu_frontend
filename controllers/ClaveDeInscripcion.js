const db = require("../config/db.js");

module.exports = {
  //CREAR
  createClaveDeInscripcion: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const ClaveDeInscripcion = req.body.ClaveDeInscripcion;

    if ((ClaveDeInscripcion == null ||/^[\s]*$/.test(ClaveDeInscripcion)) && ClaveDeInscripcion.length() <= 255) {
      return res.status(409).send({
        error: "Ingresé Clave de inscripcion válida.",
      });
    } 
    if ((IdUsuario == null || /^[\s]*$/.test(IdUsuario)) && IdUsuario.length() <= 36) {
        return res.status(409).send({
          error: "Ingresé Id usuario válido.",
        });
      } 
    else {
      db.query(
        `CALL sp_AgregarClaveDeInscripcion('${IdUsuario}', '${ClaveDeInscripcion}' )`,
        (err, result) => {
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
        }
      );
    }
  },

  //LISTADO COMPLETO
  getClavesDeInscripcion: (req, res) => {
    db.query(`CALL sp_ListadoClavesDeInscripcion()`, (err, result) => {
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
  getDetailClaveDeInscripcion: (req, res) => {
    const IdClaveDeInscripcion = req.body.IdClaveDeInscripcion;
    if (IdClaveDeInscripcion == null ||/^[\s]*$/.test(IdClaveDeInscripcion)) {
        return res.status(409).send({
          error: "Ingresé IdClaveDeInscripcion.",
        });
      } 

    db.query(
      `CALL sp_DetalleClaveDeInscripcion('${IdClaveDeInscripcion}')`,
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
  modifyClaveDeInscripcion: (req, res) => {
    const IdClaveDeInscripcion = req.body.IdClaveDeInscripcion;
    const ClaveDeInscripcion = req.body.ClaveDeInscripcion;
    const IdUsuarioModificador = req.body.ModificadoPor;

    if (IdClaveDeInscripcion == null ||/^[\s]*$/.test(IdClaveDeInscripcion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (ClaveDeInscripcion == null ||/^[\s]*$/.test(ClaveDeInscripcion)) {
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
        `CALL sp_ModificaClaveDeInscripcion('${IdClaveDeInscripcion}','${ClaveDeInscripcion}','${IdUsuarioModificador}')`,
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
  deleteClaveDeInscripcion: (req, res) => {
    const IdClaveDeInscripcion = req.body.IdClaveDeInscripcion;
    const IdUsuarioModificador = req.body.ModificadoPor;
    db.query(
      `CALL sp_BajaLogicaClaveDeInscripcion('${IdClaveDeInscripcion}', '${IdUsuarioModificador}')`,
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
