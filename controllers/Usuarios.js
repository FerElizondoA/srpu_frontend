const db = require("../config/db.js");

module.exports = {
  //CREAR
  createUsuario: (req, res) => {
    
    const IdUsuarioCreador = req.body.CreadoPor;
    const IdUsuarioCentral = req.body.IdUsuarioCentral;
    const Cargo = req.body.Cargo;
    const IdEntePublico = req.body.IdEntePublico;
    const CorreoDeRecuperacion  = req.body.CorreoDeRecuperacion;
    const IdRol = req.body.IdRol;

    if (IdUsuarioCreador == null ||/^[\s]*$/.test(IdUsuarioCreador)) {
      return res.status(409).send({
        error: "Ingrese IdUsuarioCreador",
      });
    } 
    if (IdUsuarioCentral == null ||/^[\s]*$/.test(IdUsuarioCentral)) {
      return res.status(409).send({
        error: "Ingrese IdUsuarioCentral",
      });
    } 
    if (Cargo == null ||/^[\s]*$/.test(Cargo)) {
      return res.status(409).send({
        error: "Ingrese Cargo",
      });
    } 
    if (IdEntePublico == null ||/^[\s]*$/.test(IdEntePublico)) {
      return res.status(409).send({
        error: "Ingrese IdEntePublico",
      });
    } 
    if (CorreoDeRecuperacion == null ||/^[\s]*$/.test(CorreoDeRecuperacion)) {
      return res.status(409).send({
        error: "Ingrese CorreoDeRecuperacion",
      });
    } 
    if (IdRol == null ||/^[\s]*$/.test(IdRol)) {
      return res.status(409).send({
        error: "Ingrese IdRol",
      });
    } 
      db.query(
        `CALL sp_NuevoUsuario('${IdUsuarioCreador}', '${IdUsuarioCentral}','${Cargo}','${IdEntePublico}','${CorreoDeRecuperacion}','${IdRol}' )`,
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

  //LISTADO COMPLETO
  getUsuarios: (req, res) => {
    const IdApp = req.query.IdApp;
    const  IdUsuario=req.query.IdUsuario;
    const  PermisosEspeciales=req.query.PermisosEspeciales;

    if (IdApp == null ||/^[\s]*$/.test(IdApp)) {
      return res.status(409).send({
        error: "Ingrese IdApp",
      });
    } 
    if (PermisosEspeciales == null ||/^[\s]*$/.test(PermisosEspeciales)) {
      return res.status(409).send({
        error: "Ingrese PermisosEspeciales",
      });
    } 
    if (IdUsuario == null ||/^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        
        error: "Ingrese IdUsuario",
      });
    } 
    db.query(`CALL sp_ListadoUsuarios('${IdApp}','${IdUsuario}','${PermisosEspeciales}')`, (err, result) => {
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
  getDetailUsuario: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    db.query(
      `CALL sp_DetalleUsuario('${IdUsuario}')`,
      (err, result) => {
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
      }
    );
  },

  getUsuariosAsignables: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    const Rol =req.query.Rol;

    if (IdUsuario == null ||/^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }

    if (Rol == null ||/^[\s]*$/.test(Rol)) {
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
