const db = require("../config/db.js");

module.exports = {
  //CREAR
  createFideicomiso: (req, res) => {
    const NumeroFideicomiso = req.body.NumeroFideicomiso;
    const FechaFideicomiso = req.body.FechaFideicomiso;
    const TipoFideicomiso = req.body.TipoFideicomiso;
    const Fiduciario = req.body.Fiduciario;
    const Fideicomisario = req.body.Fideicomisario;
    const TipoMovimiento = req.body.TipoMovimiento;
    const AcumuladoEstado = req.body.AcumuladoEstado;
    const AcumuladoMunicipios = req.body.AcumuladoMunicipios;
    const AcumuladoOrganismos = req.body.AcumuladoOrganismos;
    const SoporteDocumental = req.body.SoporteDocumental;
    const CreadoPor = req.body.CreadoPor;

    if (
      (NumeroFideicomiso == null || /^[\s]*$/.test(NumeroFideicomiso)) &&
      NumeroFideicomiso.length() <= 255
    ) {
      return res.status(409).send({
        error: "Ingrese Descripcion válido.",
      });
    }

    if (
      (CreadoPor == null || /^[\s]*$/.test(CreadoPor)) &&
      CreadoPor.length() <= 36
    ) {
      return res.status(409).send({
        error: "Ingrese Id usuario válido.",
      });
    } else {
      db.query(
        `CALL sp_AgregarFideicomiso('${NumeroFideicomiso}', '${FechaFideicomiso}', '${TipoFideicomiso}', '${Fiduciario}', '${Fideicomisario}', '${TipoMovimiento}', '${AcumuladoEstado}', '${AcumuladoMunicipios}', '${AcumuladoOrganismos}', '${SoporteDocumental}','${CreadoPor}' )`,
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
  getFideicomisos: (req, res) => {
    db.query(`CALL sp_ListadoFideicomisos()`, (err, result) => {
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
  getDetailFideicomiso: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese IdDescripcion.",
      });
    }

    db.query(
      `CALL sp_DetalleFideicomiso('${IdDescripcion}')`,
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
  modifyFideicomiso: (req, res) => {
    const IdFideicomiso = req.body.IdFideicomiso;
    const FechaFideicomiso = req.body.FechaFideicomiso;
    const TipoFideicomiso = req.body.TipoFideicomiso;
    const Fiduciario = req.body.Fiduciario;
    const Fideicomisario = req.body.Fideicomisario;
    const TipoMovimiento = req.body.TipoMovimiento;
    const AcumuladoEstado = req.body.AcumuladoEstado;
    const AcumuladoMunicipios = req.body.AcumuladoMunicipios;
    const AcumuladoOrganismos = req.body.AcumuladoOrganismos;
    const SoporteDocumental = req.body.SoporteDocumental;
    const CreadoPor = req.body.CreadoPor;

    if (IdFideicomiso == null || /^[\s]*$/.test(IdFideicomiso)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (CreadoPor == null || /^[\s]*$/.test(CreadoPor)) {
      return res.status(409).send({
        error: "Ingrese Id usuario modificador",
      });
    } else {
      db.query(
        `CALL sp_ModificaFideicomiso('${IdFideicomiso}', '${FechaFideicomiso}', '${TipoFideicomiso}', '${Fiduciario}', '${Fideicomisario}', '${TipoMovimiento}', '${AcumuladoEstado}', '${AcumuladoMunicipios}', '${AcumuladoOrganismos}', '${SoporteDocumental}','${CreadoPor}')`,
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
  deleteFideicomiso: (req, res) => {
    const IdFideicomiso = req.body.IdFideicomiso;
    const IdUsuarioModificador = req.body.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaFideicomiso('${IdFideicomiso}', '${IdUsuarioModificador}')`,
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
