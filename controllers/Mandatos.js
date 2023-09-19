const db = require("../config/db.js");

module.exports = {
  //CREAR
  createMandato: (req, res) => {
    const NumeroMandato = req.body.NumeroMandato;
    const FechaMandato = req.body.FechaMandato;
    const Mandatario = req.body.Mandatario;
    const MunicipioMandante = req.body.MunicipioMandante;
    const OrganismoMandante = req.body.OrganismoMandante;
    const TipoMovimiento = req.body.TipoMovimiento;
    const SoporteDocumental = req.body.SoporteDocumental;
    const CreadoPor = req.body.IdUsuario;

    db.query(
      `CALL sp_AgregarMandato('${NumeroMandato}', '${FechaMandato}', '${Mandatario}', '${MunicipioMandante}' , '${OrganismoMandante}' , '${TipoMovimiento}' , '${SoporteDocumental}' , '${CreadoPor}'  )`,
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
    const MunicipioMandante = req.body.MunicipioMandante;
    const OrganismoMandante = req.body.OrganismoMandante;
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
        `CALL sp_ModificaMandato('${IdMandato}','${IdUsuario}','${FechaMandato}','${Mandatario}','${MunicipioMandante}','${OrganismoMandante}','${TipoMovimiento}','${SoporteDocumental}')`,
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
  deleteMandato: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaMandato('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
