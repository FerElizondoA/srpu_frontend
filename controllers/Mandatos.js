const db = require("../config/db.js");

module.exports = {
  //CREAR
  createMandato: (req, res) => {
    const FechaMandato = req.body.FechaMandato;
    const Mandatario = req.body.Mandatario;
    const MunicipioMandante = req.body.MunicipioMandante;
    const OrganismoMandante = req.body.OrganismoMandante;
    const TipoMovimiento = req.body.TipoMovimiento;
    const SoporteDocumental = req.body.SoporteDocumental;
    const CreadoPor = req.body.CreadoPor;

    db.query(
      `CALL sp_AgregarMandato('${FechaMandato}', '${Mandatario}', '${MunicipioMandante}' , '${OrganismoMandante}' , '${TipoMovimiento}' , '${SoporteDocumental}' , '${CreadoPor}'  )`,
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
  getDetailMandato: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese IdDescripcion.",
      });
    }

    db.query(`CALL sp_DetalleMandato('${IdDescripcion}')`, (err, result) => {
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
    });
  },

  //MODIFICA POR ID
  modifyMandato: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    const Descripcion = req.body.Descripcion;
    const IdUsuarioModificador = req.body.IdUsuario;

    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese Id",
      });
    }

    if (Descripcion == null || /^[\s]*$/.test(Descripcion)) {
      return res.status(409).send({
        error: "Ingrese Nuevo Mandato",
      });
    }

    if (IdUsuarioModificador == null || /^[\s]*$/.test(IdUsuarioModificador)) {
      return res.status(409).send({
        error: "Ingrese Id usuario modificador",
      });
    } else {
      db.query(
        `CALL sp_ModificaMandato('${IdDescripcion}','${Descripcion}','${IdUsuarioModificador}')`,
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
