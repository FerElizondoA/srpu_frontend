const db = require("../config/db.js");

module.exports = {
  //CREAR
  createRol: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const Rol = req.body.Rol;

    if ((Rol == null ||/^[\s]*$/.test(Rol)) && Rol.length() <= 255) {
      return res.status(409).send({
        error: "Ingrese Rol válido.",
      });
    } 
    if ((IdUsuario == null || /^[\s]*$/.test(IdUsuario)) && IdUsuario.length() <= 36) {
        return res.status(409).send({
          error: "Ingrese Id usuario válido.",
        });
      } 
    else {
      db.query(
        `CALL sp_AgregarRol('${IdUsuario}', '${Rol}' )`,
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
  getRoles: (req, res) => {
    db.query(`CALL sp_ListadoRoles()`, (err, result) => {
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
  getDetailRol: (req, res) => {
    const IdRol = req.body.IdRol;
    if (IdRol == null ||/^[\s]*$/.test(IdRol)) {
        return res.status(409).send({
          error: "Ingrese IdRol.",
        });
      } 

    db.query(
      `CALL sp_DetalleRol('${IdRol}')`,
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
  modifyRol: (req, res) => {
    const IdRol = req.body.IdRol;
    const Rol = req.body.NuevoRol;
    const IdUsuarioModificador = req.body.IdUsuario;

    if (IdRol == null ||/^[\s]*$/.test(IdRol)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (Rol == null ||/^[\s]*$/.test(Rol)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Rol",
      });
    }
    
    if (IdUsuarioModificador == null ||/^[\s]*$/.test(IdUsuarioModificador)) {
        return res.status(409).send({
          error: "Ingrese Id usuario modificador",
        });
      } else {
      db.query(
        `CALL sp_ModificaRol('${IdRol}','${Rol}','${IdUsuarioModificador}')`,
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
  deleteRol: (req, res) => {
    const IdRol = req.body.IdRol;
    const IdUsuarioModificador = req.body.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaRol('${IdRol}', '${IdUsuarioModificador}')`,
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
