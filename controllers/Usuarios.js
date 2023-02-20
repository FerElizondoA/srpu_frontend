const db = require("../config/db.js");

module.exports = {
//   //CREAR
//   createUsuario: (req, res) => {
//     const Usuario = req.body.Usuario;
//     const IdUsuarioCreador = req.body.CreadoPor;

//     if (
//       Usuario == null ||
//       /^[\s]*$/.test(Usuario)
//     ) {
//       return res.status(409).send({
//         error: "Ingrese Usuario",
//       });
//     } else {
//       db.query(
//         `CALL sp_AgregarUsuario('${IdUsuarioCreador}', '${Usuario}' )`,
//         (err, result) => {
//           if (err) {
//             return res.status(500).send({
//               error: "Error",
//             });
//           }
//           if (result.length) {
//             const data = result[0][0];
//             if (data.error) {
//               return res.status(409).send({
//                 result: data,
//               });
//             }
//             return res.status(200).send({
//               data,
//             });
//           } else {
//             return res.status(409).send({
//               error: "¡Sin Información!",
//             });
//           }
//         }
//       );
//     }
//   },

//   //LISTADO COMPLETO
//   getUsuario: (req, res) => {
//     db.query(`CALL sp_ListadoUsuarios()`, (err, result) => {
//       if (err) {
//         return res.status(500).send({
//           error: "Error",
//         });
//       }

//       if (result.length) {
//         const data = result[0];
//         return res.status(200).send({
//           data,
//         });
//       } else {
//         return res.status(409).send({
//           error: "¡Sin Información!",
//         });
//       }
//     });
//   },

  // DETALLE POR ID
  getDetailUsuario: (req, res) => {
    const IdUsuario = req.query.IdUsuario;
    db.query(
      `CALL sp_DetalleUsuario('${IdUsuario}')`,
      (err, result) => {
        console.log(err);
        if (err) {
          return res.status(500).send({
            error: "Error",
          });
        }
        if (result.length) {
          const data = result[0][0];
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

//   //MODIFICA POR ID
//   modifyUsuario: (req, res) => {
//     const IdUsuario = req.body.IdUsuario;
//     const NuevoUsuario = req.body.NuevoUsuario;
//     const IdUsuarioModificador = req.body.ModificadoPor;

//     if (
//       IdUsuario == null ||
//       /^[\s]*$/.test(IdUsuario)
//     ) {
//       return res.status(409).send({
//         error: "Ingrese Id",
//       });
//     }

//     if (
//       NuevoUsuario == null ||
//       /^[\s]*$/.test(NuevoUsuario)
//     ) {
//       return res.status(409).send({
//         error: "Ingrese Nuevo Usuario",
//       });
//     } else {
//       db.query(
//         `CALL sp_ModificaUsuario('${IdUsuario}','${NuevoUsuario}','${IdUsuarioModificador}')`,
//         (err, result) => {
//           if (err) {
//             return res.status(500).send({
//               error: "Error",
//             });
//           }
//           if (result.length) {
//             const data = result[0][0];
//             if (data.error) {
//               return res.status(409).send({
//                 result: data,
//               });
//             }
//             return res.status(200).send({
//               result: data,
//             });
//           } else {
//             return res.status(409).send({
//               error: "¡Sin Información!",
//             });
//           }
//         }
//       );
//     }
//   },

};
