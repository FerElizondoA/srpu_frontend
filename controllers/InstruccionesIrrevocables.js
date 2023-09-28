const db = require("../config/db.js");

module.exports = {
  //CREAR
  createInstruccion: (req, res) => {
    const NumeroCuenta = req.body.NumeroCuenta;
    const CLABE = req.body.CLABE;
    const Banco = req.body.Banco;
    const TipoMovimiento = req.body.TipoMovimiento;
    const EntePublico = req.body.EntePublico;
    const CreadoPor = req.body.CreadoPor;
    db.query(
      `CALL sp_AgregarInstruccionIrrevocable('${CreadoPor}', '${NumeroCuenta}', '${CLABE}', '${Banco}', '${TipoMovimiento}', '${EntePublico}' )`,
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
  getInstrucciones: (req, res) => {
    db.query(`CALL sp_ListadoInstruccionesIrrevocables()`, (err, result) => {
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
  getDetailInstruccion: (req, res) => {
    const IdDescripcion = req.body.IdDescripcion;
    if (IdDescripcion == null || /^[\s]*$/.test(IdDescripcion)) {
      return res.status(409).send({
        error: "Ingrese IdDescripcion.",
      });
    }

    db.query(
      `CALL sp_DetalleInstruccion('${IdDescripcion}')`,
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
  modifyInstruccion: (req, res) => {
    const Id = req.body.Id;
    const NumeroCuenta = req.body.NumeroCuenta;
    const CLABE = req.body.CLABE;
    const Banco = req.body.Banco;
    const TipoMovimiento = req.body.TipoMovimiento;
    const EntePublico = req.body.EntePublico;
    const CreadoPor = req.body.CreadoPor;
    db.query(
      `CALL sp_ModificaInstruccionIrrevocable( '${Id}','${CreadoPor}', '${NumeroCuenta}', '${CLABE}', '${Banco}', '${TipoMovimiento}', '${EntePublico}' )`,
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

  //BORRADO LOGICO
  deleteInstruccion: (req, res) => {
    const IdDescripcion = req.query.IdDescripcion;
    const IdUsuarioModificador = req.query.IdUsuario;
    db.query(
      `CALL sp_BajaLogicaInstruccion('${IdDescripcion}', '${IdUsuarioModificador}')`,
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
