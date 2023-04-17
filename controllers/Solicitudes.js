
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createSolicitud: (req, res) => {
    const IdEntePublico = req.body.IdEntePublico;
    const IdTipoEntePublico = req.body.IdTipoEntePublico;
    const TipoSolicitud = req.body.TipoSolicitud;
    const IdInstitucionFinanciera = req.body.IdInstitucionFinanciera;
    const IdEstatus= req.body.IdEstatus;
    const IdClaveInscripcion= req.body.IdClaveInscripcion;
    const MontoOriginalContratado = req.body.MontoOriginalContratado;
    const FechaContratacion = req.body.FechaContratacion;
    const Solicitud = req.body.Solicitud;
    const CreadoPor = req.body.CreadoPor;
  
    if (IdEntePublico== null || /^[\s]*$/.test(IdEntePublico)) {
      return res.status(409).send({
        error: "Ingrese IdEntePublico",
      });
    }

    if ( IdTipoEntePublico== null || /^[\s]*$/.test(IdTipoEntePublico)) {
        return res.status(409).send({
          error: "Ingrese IdTipoEntePublico",
        });
      }
      if (TipoSolicitud== null || /^[\s]*$/.test(TipoSolicitud)) {
        return res.status(409).send({
          error: "Ingrese TipoSolicitud",
        });
      }

      if (IdInstitucionFinanciera== null || /^[\s]*$/.test(IdInstitucionFinanciera)) {
        return res.status(409).send({
          error: "Ingrese IdInsitucionFinanciera",
        });
      }

      if ( IdEstatus== null || /^[\s]*$/.test(IdEstatus)) {
        return res.status(409).send({
          error: "Ingrese IdEstatus",
        });
      }
      if ( IdClaveInscripcion== null || /^[\s]*$/.test(IdClaveInscripcion)) {
        return res.status(409).send({
          error: "Ingrese IdClaveInscripcion",
        });
      }
      if ( MontoOriginalContratado== null || /^[\s]*$/.test(MontoOriginalContratado)) {
        return res.status(409).send({
          error: "Ingrese MontoOriginalContratado",
        });
      }
      if ( FechaContratacion== null || /^[\s]*$/.test(FechaContratacion)) {
        return res.status(409).send({
          error: "Ingrese FechaContratacion",
        });
      }
      if ( Solicitud== null || /^[\s]*$/.test(Solicitud)) {
        return res.status(409).send({
          error: "Ingrese Solicitud",
        });
      }
      if ( CreadoPor== null || /^[\s]*$/.test(CreadoPor)) {
        return res.status(409).send({
          error: "Ingrese CreadoPor",
        });
      }

      db.query(`CALL sp_AgregarSolicitud( '${IdEntePublico}','${IdTipoEntePublico}', '${TipoSolicitud}','${IdInstitucionFinanciera}','${IdEstatus}', '${IdClaveInscripcion}', '${MontoOriginalContratado}', '${FechaContratacion}', '${Solicitud}', '${CreadoPor}' )`, (err, result) => {
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
      });
    
  },

  //LISTADO COMPLETO
  getSolicitudes: (req, res) => {
    db.query(`CALL sp_ListadoSolicitudes()`, (err, result) => {
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

   //delete solicitud
  deleteSolicitud: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
    const IdUsuario = req.body.IdUsuario;
  
    if (IdSolicitud== null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }

    if ( IdUsuario== null || /^[\s]*$/.test(IdUsuario)) {
        return res.status(409).send({
          error: "Ingrese IdUsuario",
        });
      }
    db.query(`CALL sp_BajaLogicaSolicitudes('${IdSolicitud}','${IdUsuario}')`, (err, result) => {
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

   //MODIFICAR
   modifySolicitud: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
    const IdEntePublico = req.body.IdEntePublico;
    const IdTipoEntePublico = req.body.IdTipoEntePublico;
    const TipoSolicitud = req.body.TipoSolicitud;
    const IdInstitucionFinanciera = req.body.IdInstitucionFinanciera;
    const IdEstatus= req.body.IdEstatus;
    const IdClaveInscripcion= req.body.IdClaveInscripcion;
    const MontoOriginalContratado = req.body.MontoOriginalContratado;
    const FechaContratacion = req.body.FechaContratacion;
    const Solicitud = req.body.Solicitud;
    const IdUsuario = req.body.IdUsuario;

    if (IdSolicitud== null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }
  
    if (IdEntePublico== null || /^[\s]*$/.test(IdEntePublico)) {
      return res.status(409).send({
        error: "Ingrese IdEntePublico",
      });
    }

    if ( IdTipoEntePublico== null || /^[\s]*$/.test(IdTipoEntePublico)) {
        return res.status(409).send({
          error: "Ingrese IdTipoEntePublico",
        });
      }
      if (TipoSolicitud== null || /^[\s]*$/.test(TipoSolicitud)) {
        return res.status(409).send({
          error: "Ingrese TipoSolicitud",
        });
      }

      if (IdInstitucionFinanciera== null || /^[\s]*$/.test(IdInstitucionFinanciera)) {
        return res.status(409).send({
          error: "Ingrese IdInsitucionFinanciera",
        });
      }

      if ( IdEstatus== null || /^[\s]*$/.test(IdEstatus)) {
        return res.status(409).send({
          error: "Ingrese IdEstatus",
        });
      }
      if ( IdClaveInscripcion== null || /^[\s]*$/.test(IdClaveInscripcion)) {
        return res.status(409).send({
          error: "Ingrese IdClaveInscripcion",
        });
      }
      if ( MontoOriginalContratado== null || /^[\s]*$/.test(MontoOriginalContratado)) {
        return res.status(409).send({
          error: "Ingrese MontoOriginalContratado",
        });
      }
      if ( FechaContratacion== null || /^[\s]*$/.test(FechaContratacion)) {
        return res.status(409).send({
          error: "Ingrese FechaContratacion",
        });
      }
      if ( Solicitud== null || /^[\s]*$/.test(Solicitud)) {
        return res.status(409).send({
          error: "Ingrese Solicitud",
        });
      }
      if ( IdUsuario== null || /^[\s]*$/.test(IdUsuario)) {
        return res.status(409).send({
          error: "Ingrese IdUsuario",
        });
      }

      db.query(`CALL sp_ModificaSolicitud( '${IdSolicitud}','${IdEntePublico}','${IdTipoEntePublico}', '${TipoSolicitud}','${IdInstitucionFinanciera}','${IdEstatus}', '${IdClaveInscripcion}', '${MontoOriginalContratado}', '${FechaContratacion}', '${Solicitud}', '${IdUsuario}' )`, (err, result) => {
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
      });
    
  },

  createComentario: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
    const Comentario = req.body.Comentario;
    const IdUsuario = req.body.IdUsuario;
    
  
    if (IdSolicitud== null || /^[\s]*$/.test(IdSolicitud)) {
      return res.status(409).send({
        error: "Ingrese IdSolicitud",
      });
    }

    if ( Comentario== null || /^[\s]*$/.test(Comentario)) {
        return res.status(409).send({
          error: "Ingrese Comentario",
        });
      }
      if (IdUsuario== null || /^[\s]*$/.test(IdUsuario)) {
        return res.status(409).send({
          error: "Ingrese IdUsuario",
        });
      }

      db.query(`CALL sp_AgregarComentario( '${IdSolicitud}','${Comentario}', '${IdUsuario}')`, (err, result) => {
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
      });
    
  },

  //LISTADO COMPLETO
  getComentarios: (req, res) => {
    const IdSolicitud = req.body.IdSolicitud;
  
    if (IdSolicitud== null || /^[\s]*$/.test(IdSolicitud)) {
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
  
  
};
