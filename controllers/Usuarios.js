const db = require("../config/db.js");

module.exports = {
  //LISTADO COMPLETO
  getUsuarios: (req, res) => {
    const IdApp = req.query.IdApp;

    if (IdApp == null || /^[\s]*$/.test(IdApp)) {
      return res.status(409).send({
        error: "Ingrese IdApp",
      });
    }
    db.query(`CALL sp_ListadoUsuarios('${IdApp}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: err.sqlMessage,
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
  getDetailUsuario: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    db.query(`CALL sp_DetalleUsuario('${IdUsuario}')`, (err, result) => {
      if (err) {
        return res.status(500).send({
          error: "Error",
        });
      }
      if (result.length) {
        const data = result[0][0];
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

  getUsuariosAsignables: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    const Rol = req.query.Rol;

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }

    if (Rol == null || /^[\s]*$/.test(Rol)) {
      return res.status(409).send({
        error: "Ingrese Rol",
      });
    }
    db.query(
      `CALL sp_UsuariosAsignables('${IdUsuario}','${Rol}')`,
      (err, result) => {
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
      }
    );
  },
};
