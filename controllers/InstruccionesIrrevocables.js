const db = require("../config/db.js");

module.exports = {
  //CAMBIA VARIABLES
  createInstruccion: (req, res) => {
    const NumeroCuenta = req.body.NumeroCuenta;
    const CLABE = req.body.CLABE;
    const Banco = req.body.Banco;
    const MunicipioOrganismoMandante = req.body.MunicipioOrganismoMandante;
    const TipoEntePublicoObligado = req.body.TipoEntePublicoObligado;
    const MecanismoPago = req.body.MecanismoPago;
    const TipoMovimiento = req.body.TipoMovimiento;
    const AcumuladoEstado = req.body.AcumuladoEstado;
    const AcumuladoMunicipios = req.body.AcumuladoMunicipios;
    const AcumuladoOrganismos = req.body.AcumuladoOrganismos;
    const SoporteDocumental = req.body.SoporteDocumental;
    const CreadoPor = req.body.CreadoPor;
    if (
      (NumeroCuenta == null || /^[\s]*$/.test(NumeroCuenta)) &&
      NumeroCuenta.length() <= 255
    ) {
      return res.status(409).send({
        error: "Ingrese Descripcion válida.",
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
        `CALL sp_AgregarInstruccionIrrevocable('${NumeroCuenta}' , '${CLABE}', '${Banco}', '${MunicipioOrganismoMandante}', '${TipoEntePublicoObligado}' ,'${MecanismoPago}', '${TipoMovimiento}',   '${AcumuladoEstado}' , '${AcumuladoMunicipios}' , '${AcumuladoOrganismos}' , '${SoporteDocumental}','${CreadoPor}')`,
        (err, result) => {
          if (err) {
            console.log(err);
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

  modifyInstruccion: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const IdInstruccion = req.body.IdInstruccion;
    const NumeroCuenta = req.body.NumeroCuenta;
    const CLABE = req.body.CLABE;
    const Banco = req.body.Banco;
    const MunicipioOrganismoMandante = req.body.MunicipioOrganismoMandante;
    const TipoEntePublicoObligado = req.body.TipoEntePublicoObligado;
    const MecanismoPago = req.body.MecanismoPago;
    const TipoMovimiento = req.body.TipoMovimiento;
    const AcumuladoEstado = req.body.AcumuladoEstado;
    const AcumuladoMunicipios = req.body.AcumuladoMunicipios;
    const AcumuladoOrganismos = req.body.AcumuladoOrganismos;
    const SoporteDocumental = req.body.SoporteDocumental;

    if (CreadoPor == null || /^[\s]*$/.test(CreadoPor)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Clave de inscripcion",
      });
    } else {
      db.query(
        `CALL sp_ModificaInstruccionIrrevocable('${IdUsuario}', '${IdInstruccion}', '${NumeroCuenta}' , '${CLABE}', '${Banco}', '${MunicipioOrganismoMandante}', '${TipoEntePublicoObligado}', '${MecanismoPago}', '${TipoMovimiento}', '${AcumuladoEstado}','${AcumuladoMunicipios}','${AcumuladoOrganismos}', '${SoporteDocumental}')`,
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

  deleteInstruccion: (req, res) => {
    const IdInstruccion = req.body.IdInstruccion;
    const IdUsuarioModificador = req.body.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaInstruccionesIrrevocables('${IdInstruccion}', '${IdUsuarioModificador}')`,
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

  getInstrucciones: (req, res) => {
    db.query(`CALL sp_ListadoInstruccionesIrrevocables()`, (err, result) => {
      if (err) {
        console.log(err);
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
