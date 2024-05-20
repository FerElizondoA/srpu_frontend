const db = require("../config/db.js");

module.exports = {
  createSolicitud: (req, res) => {
    const IdEntePublico = req.body.IdEntePublico;
    const IdTipoEntePublico = req.body.IdTipoEntePublico;
    const TipoSolicitud = req.body.TipoSolicitud;
    const IdInstitucionFinanciera = req.body.IdInstitucionFinanciera;
    const Estatus = req.body.Estatus;
    const IdClaveInscripcion = req.body.IdClaveInscripcion;
    const MontoOriginalContratado = req.body.MontoOriginalContratado;
    const FechaContratacion = req.body.FechaContratacion;
    const Solicitud = req.body.Solicitud;
    const IdEditor = req.body.IdEditor;
    const CreadoPor = req.body.CreadoPor;

    if (IdEntePublico == null || /^[\s]*$/.test(IdEntePublico)) {
      return res.status(409).send({
        error: "Ingrese IdEntePublico",
      });
    }

    if (IdEditor == null || /^[\s]*$/.test(IdEditor)) {
      return res.status(409).send({
        error: "Ingrese IdEditor",
      });
    }

    if (IdTipoEntePublico == null || /^[\s]*$/.test(IdTipoEntePublico)) {
      return res.status(409).send({
        error: "Ingrese IdTipoEntePublico",
      });
    }
    if (TipoSolicitud == null || /^[\s]*$/.test(TipoSolicitud)) {
      return res.status(409).send({
        error: "Ingrese TipoSolicitud",
      });
    }

    if (
      IdInstitucionFinanciera == null ||
      /^[\s]*$/.test(IdInstitucionFinanciera)
    ) {
      return res.status(409).send({
        error: "Ingrese IdInsitucionFinanciera",
      });
    }

    if (Estatus == null || /^[\s]*$/.test(Estatus)) {
      return res.status(409).send({
        error: "Ingrese Estatus",
      });
    }
    if (IdClaveInscripcion == null || /^[\s]*$/.test(IdClaveInscripcion)) {
      return res.status(409).send({
        error: "Ingrese IdClaveInscripcion",
      });
    }
    if (
      MontoOriginalContratado == null ||
      /^[\s]*$/.test(MontoOriginalContratado)
    ) {
      return res.status(409).send({
        error: "Ingrese MontoOriginalContratado",
      });
    }
    if (FechaContratacion == null || /^[\s]*$/.test(FechaContratacion)) {
      return res.status(409).send({
        error: "Ingrese FechaContratacion",
      });
    }
    if (Solicitud == null || /^[\s]*$/.test(Solicitud)) {
      return res.status(409).send({
        error: "Ingrese Solicitud",
      });
    }
    if (CreadoPor == null || /^[\s]*$/.test(CreadoPor)) {
      return res.status(409).send({
        error: "Ingrese CreadoPor",
      });
    }

    db.query(
      `CALL sp_AgregarSolicitud( '${IdEntePublico}','${IdTipoEntePublico}', '${TipoSolicitud}','${IdInstitucionFinanciera}','${Estatus}', '${IdClaveInscripcion}', '${MontoOriginalContratado}', '${FechaContratacion}', '${Solicitud}','${IdEditor}', '${CreadoPor}' )`,
      (err, result) => {
        console.log("err", err)
        console.log("result", result)
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
  getSolicitudes: (req, res) => {
    const { IdUsuario, TipoListado, IdEntePublico } = req.query;

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }

    db.query(
      `CALL sp_ListadoSolicitudes('${IdUsuario}', '${TipoListado}', '${IdEntePublico}')`,
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

  //LISTADO SOLAMENTE CANCELADO O EN ESPERA CANCELACION
  getSolicitudesCancelaciones: (req, res) => {
    const IdUsuario = req.query.IdUsuario;

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }

    db.query(
      `CALL sp_ListadoSolicitudesCancelaciones('${IdUsuario}')`,
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

  getSolicitudesReestructura: (req, res) => {
    const IdUsuario = req.query.IdUsuario;

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }

    db.query(
      `CALL sp_ListadoSolicitudesReestructura('${IdUsuario}')`,
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

  //delete solicitud
  deleteSolicitud: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
    const IdUsuario = req.body.IdUsuario;

    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }
    db.query(
      `CALL sp_BajaLogicaSolicitudes('${IdSolicitud}','${IdUsuario}')`,
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

  //MODIFICAR
  modifySolicitud: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
    const IdEntePublico = req.body.IdEntePublico;
    const IdTipoEntePublico = req.body.IdTipoEntePublico;
    const TipoSolicitud = req.body.TipoSolicitud;
    const IdInstitucionFinanciera = req.body.IdInstitucionFinanciera;
    const Estatus = req.body.Estatus;
    const MontoOriginalContratado = req.body.MontoOriginalContratado;
    const FechaContratacion = req.body.FechaContratacion;
    const Solicitud = req.body.Solicitud;
    const IdEditor = req.body.IdEditor;
    const IdUsuario = req.body.IdUsuario;

    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }

    if (IdEditor == null || /^[\s]*$/.test(IdEditor)) {
      return res.status(409).send({
        error: "Ingrese IdEditor",
      });
    }

    if (IdEntePublico == null || /^[\s]*$/.test(IdEntePublico)) {
      return res.status(409).send({
        error: "Ingrese IdEntePublico",
      });
    }

    if (IdTipoEntePublico == null || /^[\s]*$/.test(IdTipoEntePublico)) {
      return res.status(409).send({
        error: "Ingrese IdTipoEntePublico",
      });
    }
    if (TipoSolicitud == null || /^[\s]*$/.test(TipoSolicitud)) {
      return res.status(409).send({
        error: "Ingrese TipoSolicitud",
      });
    }

    if (
      IdInstitucionFinanciera == null ||
      /^[\s]*$/.test(IdInstitucionFinanciera)
    ) {
      return res.status(409).send({
        error: "Ingrese IdInsitucionFinanciera",
      });
    }

    if (Estatus == null || /^[\s]*$/.test(Estatus)) {
      return res.status(409).send({
        error: "Ingrese IdEstatus",
      });
    }
    if (
      MontoOriginalContratado == null ||
      /^[\s]*$/.test(MontoOriginalContratado)
    ) {
      return res.status(409).send({
        error: "Ingrese MontoOriginalContratado",
      });
    }
    if (FechaContratacion == null || /^[\s]*$/.test(FechaContratacion)) {
      return res.status(409).send({
        error: "Ingrese FechaContratacion",
      });
    }
    if (Solicitud == null || /^[\s]*$/.test(Solicitud)) {
      return res.status(409).send({
        error: "Ingrese Solicitud",
      });
    }
    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }

    db.query(
      `CALL sp_ModificaSolicitud( '${IdSolicitud}','${IdEntePublico}','${IdTipoEntePublico}', '${TipoSolicitud}','${IdInstitucionFinanciera}','${Estatus}', '${MontoOriginalContratado}', '${FechaContratacion}', '${Solicitud}','${IdEditor}', '${IdUsuario}' )`,
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

  createComentario: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
    const Comentario = req.body.Comentario;
    const Tipo = req.body.Tipo;
    const IdUsuario = req.body.IdUsuario;
    const IdComentario = req.body.IdComentario || null;

    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }

    if (Comentario == null || /^[\s]*$/.test(Comentario)) {
      return res.status(409).send({
        error: "Ingrese Comentario",
      });
    }
    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese IdUsuario",
      });
    }

    db.query(
      `CALL sp_AgregarComentario( '${IdSolicitud}','${Comentario}','${Tipo}','${IdUsuario}','${IdComentario}')`,
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

  //LISTADO COMPLETO
  getComentarios: (req, res) => {
    const IdSolicitud = req.query.IdSolicitud;
    if (IdSolicitud == null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }
    db.query(`CALL sp_ListadoComentarios('${IdSolicitud}')`, (err, result) => {
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
    });
  },

  cambiaEstatus: (req, res) => {
    const { Id, Estatus, ModificadoPor, IdEditor } = req.body;

    db.query(
      `CALL sp_CambiaEstatusSolicitud('${Id}','${Estatus}','${ModificadoPor}','${IdEditor}')`,
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

  eliminaComentario: (req, res) => {
    const Id = req.body.Id;
    const ModificadoPor = req.body.ModificadoPor;

    db.query(
      `CALL sp_BajaLogicaComentario('${Id}','${ModificadoPor}')`,
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

  getSolicitudesAdministrador: (req, res) => {
    const Estatus = req.query.Estado;
    const tipoListado = req.query.tipoListado;

    db.query(
      `CALL sp_ListadoSolicitudesAdministrador('${Estatus}', '${tipoListado}')`,
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
};
