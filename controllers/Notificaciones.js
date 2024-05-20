const db = require("../config/db.js");
const { sendEmail } = require("./mail/sendMail.js");

module.exports = {
  //Crear
  createNotificacion: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
    const ControlInterno = req.body.ControlInterno;
    const Titulo = req.body.Titulo;
    const Mensaje = req.body.Mensaje;
    const IdUsuarioCreador = req.body.IdUsuarioCreador;
    const ListadoUsuarios = req.body.ListadoUsuarios;

    if (Titulo == null || /^[\s]*$/.test(Titulo)) {
      return res.status(409).send({
        error: "Ingrese Titulo",
      });
    }
    if (Mensaje == null || /^[\s]*$/.test(Mensaje)) {
      return res.status(409).send({
        error: "Ingrese Mensaje",
      });
    }
    if (IdUsuarioCreador == null || /^[\s]*$/.test(IdUsuarioCreador)) {
      return res.status(409).send({
        error: "Ingrese IdUsuarioCreador",
      });
    }
    if (ListadoUsuarios === null) {
      return res.status(409).send({
        error: "Ingrese ListaUsuarios",
      });
    }

    if (IdSolicitud === null) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }

    if (ControlInterno === null) {
      return res.status(409).send({
        error: "Ingrese ControlInterno",
      });
    }
    const Usuarios = JSON.stringify({ Usuarios: ListadoUsuarios });

    db.query(
      `CALL sp_AgregarNotificacion('${IdSolicitud}','${ControlInterno}','${Titulo}','${Mensaje}','${IdUsuarioCreador}', '${Usuarios}')`,
      (err, result) => {

        if (err) {
          return res.status(500).send({
            error: err,
          });
        }
        if (result.length) {
          const data = result[0][0];
          if (data.error) {
            return res.status(409).send({
              result: data,
            });
          }
          sendEmail({
            usuarios: ListadoUsuarios,
            titulo: Titulo,
            asunto: Mensaje,
            plantilla: "sgcm-1",
          });
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

  //LISTADO DE NOTIFICACINES DEL USUARIO
  getNotificaciones: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    db.query(
      `CALL sp_ListadoNotificacionesUsuario('${IdUsuario}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: err,
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

  //MARCAR MOMO LEIDA UNA  NOTIFICACION
  leerNotificacion: (req, res) => {
    const IdNotificacion = req.body.IdNotificacion;

    if (IdNotificacion == null || /^[\s]*$/.test(IdNotificacion)) {
      return res.status(409).send({
        error: "Ingrese IdNotificacion",
      });
    }

    db.query(
      `CALL sp_LeerNotificacion( '${IdNotificacion}')`,
      (err, result) => {
        if (err) {
          return res.status(500).send({
            error: "Error de servidor",
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
  //LISTADO DE NOTIFICACIONES CREADAS  POR  EL USAURIO
  getNotificacionesCreadas: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }
    db.query(
      `CALL sp_ListadoHistorialNotificaciones('${IdUsuario}')`,
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
  //LISTADO DE INFORMACION DE UNA NOTIFICACION
  getInfoNotificacion: (req, res) => {
    const IdNotificacion = req.query.IdNotificacion;
    if (IdNotificacion == null || /^[\s]*$/.test(IdNotificacion)) {
      return res.status(409).send({
        error: "Ingrese IdNotificacion",
      });
    }
    db.query(`CALL sp_InfoNotificacion('${IdNotificacion}')`, (err, result) => {
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
};
