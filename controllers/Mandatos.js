const db = require("../config/db.js");

module.exports = {
  //CREAR
  createMandato: (req, res) => {
    const IdUsuario = req.body.IdUsuario;
    const NumeroMandato = req.body.NumeroMandato;
    const FechaMandato = req.body.FechaMandato;
    const Mandatario = req.body.Mandatario;
    const MunicipioOrganismoMandante = req.body.MunicipioOrganismoMandante;
    const TipoEntePublicoObligado = req.body.TipoEntePublicoObligado;
    const MecanismoPago = req.body.MecanismoPago;
    const TipoMovimiento = req.body.TipoMovimiento;
    const SoporteDocumental = req.body.SoporteDocumental;
    const CreadoPor = req.body.IdUsuario;
    if (
      (NumeroMandato == null || /^[\s]*$/.test(NumeroMandato)) &&
      NumeroMandato.length() <= 255
    ) {
      return res.status(409).send({
        error: "Ingrese Descripcion válida.",
      });
    }
    if (
      (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) &&
      IdUsuario.length() <= 36
    ) {
      return res.status(409).send({
        error: "Ingrese Id usuario válido.",
      });
    } else {

    db.query(
      `CALL sp_AgregarMandato('${NumeroMandato}', '${FechaMandato}', '${Mandatario}', '${MunicipioOrganismoMandante}' , '${TipoEntePublicoObligado}' ,  '${MecanismoPago}' , '${TipoMovimiento}' , '${SoporteDocumental}' , '${CreadoPor}'  )`,
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
  getMandatos: (req, res) => {
    db.query(`CALL sp_ListadoMandatos()`, (err, result) => {
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
  // getDetailMandato: (req, res) => {
  //   const IdDescripcion = req.body.IdDescripcion;
  //   if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
  //     return res.status(409).send({
  //       error: "Ingrese IdDescripcion.",
  //     });
  //   }

  //   db.query(`CALL sp_DetalleMandato('${IdDescripcion}')`, (err, result) => {
  //     if (err) {
  //       return res.status(500).send({
  //         error: "Error",
  //       });
  //     }
  //     if (result.length) {
  //       const data = result[0][0];
  //       if (data.error) {
  //         return res.status(409).send({
  //           result: data,
  //         });
  //       }
  //       return res.status(200).send({
  //         data,
  //       });
  //     } else {
  //       return res.status(409).send({
  //         error: "¡Sin Información!",
  //       });
  //     }
  //   });
  // },

  //MODIFICA POR ID

  modifyMandato: (req, res) => {
    const IdMandato = req.body.IdMandato;
    const IdUsuario = req.body.IdUsuario;
    const FechaMandato = req.body.FechaMandato;
    const Mandatario = req.body.Mandatario;
    const MunicipioOrganismoMandante = req.body.MunicipioOrganismoMandante;
    const TipoEntePublicoObligado = req.body.TipoEntePublicoObligado;
    const MecanismoPago = req.body.MecanismoPago
    const TipoMovimiento = req.body.TipoMovimiento;
    const SoporteDocumental = req.body.SoporteDocumental;

    if (IdMandato == null || /^[\s]*$/.test(IdMandato)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (IdUsuario == null || /^[\s]*$/.test(IdUsuario)) {
      return res.status(409).send({
        error: "Ingrese Id usuario modificador",
      });
    } else {
      db.query(
        `CALL sp_ModificaMandato('${IdMandato}','${IdUsuario}','${FechaMandato}','${Mandatario}','${MunicipioOrganismoMandante}' , '${TipoEntePublicoObligado}' , '${MecanismoPago}','${TipoMovimiento}','${SoporteDocumental}')`,
        (err, result) => {
          console.log(err)
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
  deleteMandato: (req, res) => {
    const IdMandato = req.body.IdMandato;
    const IdUsuarioModificador = req.body.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaMandato('${IdMandato}', '${IdUsuarioModificador}')`,
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
