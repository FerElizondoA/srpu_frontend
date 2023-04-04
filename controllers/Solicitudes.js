
const db = require("../config/db.js");



module.exports = {
  //CREAR
  createSolicitud: (req, res) => {
    const IdInstitucionFinanciera = req.body.IdInstitucionFinanciera;
    const IdTipoEntePublico = req.body.IdTipoEntePublico;
    const IdEstatus= req.body.IdEstatus;
    const IdClaveInscripcion= req.body.IdClaveInscripcion;
    const MontoOriginalContratado = req.body.MontoOriginalContratado;
    const FechaContratacion = req.body.FechaContratacion;
    const Solicitud = req.body.Solicitud;
    const CreadoPor = req.body.CreadoPor;
    if (IdInstitucionFinanciera== null || /^[\s]*$/.test(IdInstitucionFinanciera)) {
      return res.status(409).send({
        error: "Ingrese IdInsitucionFinanciera",
      });
    }
    if ( IdTipoEntePublico== null || /^[\s]*$/.test(IdTipoEntePublico)) {
        return res.status(409).send({
          error: "Ingrese IdTipoEntePublico",
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

      db.query(`CALL sp_AgregarSolicitud('${IdInstitucionFinanciera}', '${IdTipoEntePublico}', '${IdEstatus}', '${IdClaveInscripcion}', '${MontoOriginalContratado}', '${FechaContratacion}', '${Solicitud}', '${CreadoPor}' )`, (err, result) => {
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

  
  
};
