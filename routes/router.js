const express = require("express");
const verifyToken = require("../controllers/auth/verifyToken.js");
const { createClaveDeInscripcion, getClavesDeInscripcion, getDetailClaveDeInscripcion, modifyClaveDeInscripcion, deleteClaveDeInscripcion } = require("../controllers/ClaveDeInscripcion.js");
const { createDestino, getDestinos, getDetailDestino, modifyDestino, deleteDestino } = require("../controllers/Destinos.js");
const { createDiaDelEjercicio, getDiasDelEjercicio, getDetailDiaDelEjercicio, modifyDiaDelEjercicio, deleteDiaDelEjercicio } = require("../controllers/DiaDelEjercicio.js");
const { createEntePublicoObligado, getEntePublicoObligado, getDetailEntePublicoObligado, modifyEntePublicoObligado, deleteEntePublicoObligado } = require("../controllers/EntesPublicosObligados.js");
const { createEstatus, getDetailEstatus, modifyEstatus, deleteEstatus, getEstatus } = require("../controllers/Estatus.js");
const { deleteFuenteAlternaDePago, createFuenteAlternaDePago, getFuenteAlternaDePago, getDetailFuenteAlternaDePago, modifyFuenteAlternaDePago } = require("../controllers/FuenteAlternaDePago.js");
const { createFuenteDePago, getFuenteDePago, getDetailFuenteDePago, modifyFuenteDePago, deleteFuenteDePago } = require("../controllers/FuenteDePago.js");
const router = express.Router();
const { createInstitucionFinanciera, modifyInstitucionFinanciera, deleteInstitucionFinanciera, getInstitucionesFinancieras, getDetailInstitucionFinanciera } = require("../controllers/InstitucionesFinancieras.js");
const { createObligadoSolidarioAval, getObligadoSolidarioAval, getDetailObligadoSolidarioAval, modifyObligadoSolidarioAval, deleteObligadoSolidarioAval } = require("../controllers/ObligadoSolidarioAval.js");
const { createPeriodicidadDePago, getPeriodicidadDePago, getDetailPeriodicidadDePago, modifyPeriodicidadDePago, deletePeriodicidadDePago } = require("../controllers/PeriodicidadDelPago.js");
const { createReglaDeFinanciamiento, getReglasDeFinanciamiento, getDetailReglaDeFinanciamiento, modifyReglaDeFinanciamiento, deleteReglaDeFinanciamiento } = require("../controllers/ReglaDeFinanciamiento.js");
const { createRol, getRoles, getDetailRol, modifyRol, deleteRol } = require("../controllers/Roles.js");
const { createTasaDeReferencia, getTasasDeReferencia, getDetailTasaDeReferencia, modifyTasaDeReferencia, deleteTasaDeReferencia } = require("../controllers/TasaDeReferencia.js");
const { createTipoDeComision, getTiposDeComision, getDetailTipoDeComision, modifyTipoDeComision, deleteTipoDeComision } = require("../controllers/TipoDeComision.js");
const { createTipoEntePublico, modifyTipoEntePublico, deleteTipoEntePublico, getTiposEntePublico, getDetailTipoEntePublico } = require("../controllers/TipoEntePublico.js");
const { createSolicitud, getSolicitudes } = require("../controllers/Solicitudes.js");
const { createTipoDeDocumento, getListadoTipoDeDocumentoCortoPlazo, getListadoTipoDeDocumentoLargoPlazo, getListadoTipoDeDocumento, deleteTipoDeDocumento, modifyTipoDocumento } = require("../controllers/TipoDeDocumentos.js");

const { getDetailUsuario, getUsuarios } = require("../controllers/Usuarios.js");


//#region Instituciones Financieras
router.post("/create-institucionesFinancieras",  verifyToken.verifyJWT, (req, res, express) => {
  createInstitucionFinanciera(req, res);
});

router.get("/get-institucionesFinancieras", verifyToken.verifyJWT, (req, res) => {
  getInstitucionesFinancieras(req, res);
});

router.get("/detail-institucionesFinancieras", verifyToken.verifyJWT, (req, res) => {
  getDetailInstitucionFinanciera(req, res);
});

router.put("/modify-institucionesFinancieras", verifyToken.verifyJWT, (req, res) => {
  modifyInstitucionFinanciera(req, res);
});

router.delete("/delete-institucionesFinancieras", verifyToken.verifyJWT, (req, res) => {
  deleteInstitucionFinanciera(req, res);
});
//#endregion

//#region Estatus
router.post("/create-estatus",  verifyToken.verifyJWT, (req, res, express) => {
  createEstatus(req, res);
});

router.get("/get-estatus", verifyToken.verifyJWT, (req, res) => {
  getEstatus(req, res);
});

router.get("/detail-estatus", verifyToken.verifyJWT, (req, res) => {
  getDetailEstatus(req, res);
});

router.put("/modify-estatus", verifyToken.verifyJWT, (req, res) => {
  modifyEstatus(req, res);
});

router.delete("/delete-estatus", verifyToken.verifyJWT, (req, res) => {
  deleteEstatus(req, res);
});
//#endregion

//#region EntePublicoObligado
router.post("/create-entePublicoObligado",  verifyToken.verifyJWT, (req, res, express) => {
  createEntePublicoObligado(req, res);
});

router.get("/get-entePublicoObligado", verifyToken.verifyJWT, (req, res) => {
  getEntePublicoObligado(req, res);
});

router.get("/detail-entePublicoObligado", verifyToken.verifyJWT, (req, res) => {
  getDetailEntePublicoObligado(req, res);
});

router.put("/modify-entePublicoObligado", verifyToken.verifyJWT, (req, res) => {
  modifyEntePublicoObligado(req, res);
});

router.delete("/delete-entePublicoObligado", verifyToken.verifyJWT, (req, res) => {
  deleteEntePublicoObligado(req, res);
});
//#endregion

//#region TipoEntePublico
router.post("/create-tiposEntePublico",  verifyToken.verifyJWT, (req, res) => {
  createTipoEntePublico(req, res);
});

router.get("/get-tiposEntePublico", verifyToken.verifyJWT, (req, res) => {
  getTiposEntePublico(req, res);
});

router.get("/detail-tiposEntePublico", verifyToken.verifyJWT, (req, res) => {
  getDetailTipoEntePublico(req, res);
});

router.put("/modify-tiposEntePublico", verifyToken.verifyJWT, (req, res) => {
  modifyTipoEntePublico(req, res);
});

router.delete("/delete-tiposEntePublico", verifyToken.verifyJWT, (req, res) => {
  deleteTipoEntePublico(req, res);
});
//#endregion

//#region ObligadoSolidarioAval
router.post("/create-obligadoSolidarioAval",  verifyToken.verifyJWT, (req, res) => {
  createObligadoSolidarioAval(req, res);
});

router.get("/get-obligadoSolidarioAval", verifyToken.verifyJWT, (req, res) => {
  getObligadoSolidarioAval(req, res);
});

router.get("/detail-obligadoSolidarioAval", verifyToken.verifyJWT, (req, res) => {
  getDetailObligadoSolidarioAval(req, res);
});

router.put("/modify-obligadoSolidarioAval", verifyToken.verifyJWT, (req, res) => {
  modifyObligadoSolidarioAval(req, res);
});

router.delete("/delete-obligadoSolidarioAval", verifyToken.verifyJWT, (req, res) => {
  deleteObligadoSolidarioAval(req, res);
});
//#endregion

//#region FuenteDePago
router.post("/create-fuenteDePago",  verifyToken.verifyJWT, (req, res, express) => {
  createFuenteDePago(req, res);
});

router.get("/get-fuenteDePago", verifyToken.verifyJWT, (req, res) => {
  getFuenteDePago(req, res);
});

router.get("/detail-fuenteDePago", verifyToken.verifyJWT, (req, res) => {
  getDetailFuenteDePago(req, res);
});

router.put("/modify-fuenteDePago", verifyToken.verifyJWT, (req, res) => {
  modifyFuenteDePago(req, res);
});

router.delete("/delete-fuenteDePago", verifyToken.verifyJWT, (req, res) => {
  deleteFuenteDePago(req, res);
});
//#endregion

//#region FuenteAlternaDePago
router.post("/create-fuenteAlternaDePago",  verifyToken.verifyJWT, (req, res, express) => {
  createFuenteAlternaDePago(req, res);
});

router.get("/get-fuenteAlternaDePago", verifyToken.verifyJWT, (req, res) => {
  getFuenteAlternaDePago(req, res);
});

router.get("/detail-fuenteAlternaDePago", verifyToken.verifyJWT, (req, res) => {
  getDetailFuenteAlternaDePago(req, res);
});

router.put("/modify-fuenteAlternaDePago", verifyToken.verifyJWT, (req, res) => {
  modifyFuenteAlternaDePago(req, res);
});

router.delete("/delete-fuenteAlternaDePago", verifyToken.verifyJWT, (req, res) => {
  deleteFuenteAlternaDePago(req, res);
});

//Clave de Inscripcion
router.post("/create-claveDeInscripcion",  verifyToken.verifyJWT, (req, res, express) => {
  createClaveDeInscripcion(req, res);
});

router.get("/get-claveDeInscripcion", verifyToken.verifyJWT, (req, res) => {
  getClavesDeInscripcion(req, res);
});

router.get("/detail-claveDeInscripcion", verifyToken.verifyJWT, (req, res) => {
  getDetailClaveDeInscripcion(req, res);
});

router.put("/modify-claveDeInscripcion", verifyToken.verifyJWT, (req, res) => {
  modifyClaveDeInscripcion(req, res);
});

router.delete("/delete-claveDeInscripcion", verifyToken.verifyJWT, (req, res) => {
  deleteClaveDeInscripcion(req, res);
});

//#endregion

//#region Destinos
router.post("/create-destinos",  verifyToken.verifyJWT, (req, res, express) => {
  createDestino(req, res);
});

router.get("/get-destinos", verifyToken.verifyJWT, (req, res) => {
  getDestinos(req, res);
});

router.get("/detail-destinos", verifyToken.verifyJWT, (req, res) => {
  getDetailDestino(req, res);
});

router.put("/modify-destinos", verifyToken.verifyJWT, (req, res) => {
  modifyDestino(req, res);
});

router.delete("/delete-destinos", verifyToken.verifyJWT, (req, res) => {
  deleteDestino(req, res);
});
//#endregion

//#region Roles
router.post("/create-roles",  verifyToken.verifyJWT, (req, res, express) => {
  createRol(req, res);
});

router.get("/get-roles", verifyToken.verifyJWT, (req, res) => {
  getRoles(req, res);
});

router.get("/detail-roles", verifyToken.verifyJWT, (req, res) => {
  getDetailRol(req, res);
});

router.put("/modify-roles", verifyToken.verifyJWT, (req, res) => {
  modifyRol(req, res);
});

router.delete("/delete-roles", verifyToken.verifyJWT, (req, res) => {
  deleteRol(req, res);
});
//#endregion

//#region TipoDocumento
router.post("/create-tiposDocumento",  verifyToken.verifyJWT, (req, res) => {
  createTipoDeDocumento(req, res);
});


router.get("/get-tiposDocumentos",  verifyToken.verifyJWT, (req, res) => {
  getListadoTipoDeDocumento(req, res);
});


router.get("/get-tiposDocumentosLargoPlazo",  verifyToken.verifyJWT, (req, res) => {
  getListadoTipoDeDocumentoLargoPlazo(req, res);
});

router.get("/get-tiposDocumentosCortoPlazo",  verifyToken.verifyJWT, (req, res) => {
  getListadoTipoDeDocumentoCortoPlazo(req, res);
}); 

router.put("/modify-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
  modifyTipoDocumento(req, res);
});

router.delete("/delete-tiposDocumento",  verifyToken.verifyJWT, (req, res) => {
  deleteTipoDeDocumento(req, res);
});

// //TipoDocumento
// router.post("/create-TiposDocumento",  verifyToken.verifyJWT, (req, res, express) => {
//   createTipoDocumento(req, res);
// });

// router.get("/get-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
//   getTiposDocumento(req, res);
// });

// router.get("/detail-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
//   getDetailTipoDocumento(req, res);
// });

// router.put("/modify-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
//   modifyTipoDocumento(req, res);
// });


// router.delete("/delete-TiposDocumento", verifyToken.verifyJWT, (req, res) => {
//   deleteTipoDocumento(req, res);
// });
//#endregion

//#region TipoPeriodicidadDePago
router.post("/create-periodicidadDePago",  verifyToken.verifyJWT, (req, res, express) => {
  createPeriodicidadDePago(req, res);
});

router.get("/get-periodicidadDePago", verifyToken.verifyJWT, (req, res) => {
  getPeriodicidadDePago(req, res);
});

router.get("/detail-periodicidadDePago", verifyToken.verifyJWT, (req, res) => {
  getDetailPeriodicidadDePago(req, res);
});

router.put("/modify-periodicidadDePago", verifyToken.verifyJWT, (req, res) => {
  modifyPeriodicidadDePago(req, res);
});

router.delete("/delete-periodicidadDePago", verifyToken.verifyJWT, (req, res) => {
  deletePeriodicidadDePago(req, res);
});
//#endregion

//#region TasaDeReferencia
router.post("/create-tasaDeReferencia",  verifyToken.verifyJWT, (req, res, express) => {
  createTasaDeReferencia(req, res);
});

router.get("/get-tasaDeReferencia", verifyToken.verifyJWT, (req, res) => {
  getTasasDeReferencia(req, res);
});

router.get("/detail-tasaDeReferencia", verifyToken.verifyJWT, (req, res) => {
  getDetailTasaDeReferencia(req, res);
});

router.put("/modify-tasaDeReferencia", verifyToken.verifyJWT, (req, res) => {
  modifyTasaDeReferencia(req, res);
});

router.delete("/delete-tasaDeReferencia", verifyToken.verifyJWT, (req, res) => {
  deleteTasaDeReferencia(req, res);
});
//#endregion

//#region DiaDelEjercicio
router.post("/create-diasDelEjercicio",  verifyToken.verifyJWT, (req, res, express) => {
  createDiaDelEjercicio(req, res);
});

router.get("/get-diasDelEjercicio", verifyToken.verifyJWT, (req, res) => {
  getDiasDelEjercicio(req, res);
});

router.get("/detail-diasDelEjercicio", verifyToken.verifyJWT, (req, res) => {
  getDetailDiaDelEjercicio(req, res);
});

router.put("/modify-diasDelEjercicio", verifyToken.verifyJWT, (req, res) => {
  modifyDiaDelEjercicio(req, res);
});

router.delete("/delete-diasDelEjercicio", verifyToken.verifyJWT, (req, res) => {
  deleteDiaDelEjercicio(req, res);
});
//#endregion

//#region TipoDeComision
router.post("/create-tipoDeComision",  verifyToken.verifyJWT, (req, res, express) => {
  createTipoDeComision(req, res);
});

router.get("/get-tipoDeComision", verifyToken.verifyJWT, (req, res) => {
  getTiposDeComision(req, res);
});

router.get("/detail-tipoDeComision", verifyToken.verifyJWT, (req, res) => {
  getDetailTipoDeComision(req, res);
});

router.put("/modify-tipoDeComision", verifyToken.verifyJWT, (req, res) => {
  modifyTipoDeComision(req, res);
});

router.delete("/delete-tipoDeComision", verifyToken.verifyJWT, (req, res) => {
  deleteTipoDeComision(req, res);
});
//#endregion

//#region ReglaDeFinanciamiento
router.post("/create-reglaDeFinanciamiento",  verifyToken.verifyJWT, (req, res, express) => {
  createReglaDeFinanciamiento(req, res);
});

router.get("/get-reglaDeFinanciamiento", verifyToken.verifyJWT, (req, res) => {
  getReglasDeFinanciamiento(req, res);
});

router.get("/detail-reglaDeFinanciamiento", verifyToken.verifyJWT, (req, res) => {
  getDetailReglaDeFinanciamiento(req, res);
});

router.put("/modify-reglaDeFinanciamiento", verifyToken.verifyJWT, (req, res) => {
  modifyReglaDeFinanciamiento(req, res);
});

router.delete("/delete-reglaDeFinanciamiento", verifyToken.verifyJWT, (req, res) => {
  deleteReglaDeFinanciamiento(req, res);
});
//#endregion

//#region Usuario
router.get("/usuario", verifyToken.verifyJWT, (req, res) => {
  getDetailUsuario(req, res);
});

router.get("/lista-usuarios", verifyToken.verifyJWT, (req, res) => {
  getUsuarios(req, res);
});

router.get("/detail-usuario", verifyToken.verifyJWT, (req, res) => {
  getDetailUsuario(req, res);
});
//#endregion

//#region Solicitudes
router.post("/create-solicitud", verifyToken.verifyJWT, (req, res) => {
  createSolicitud(req, res);
});

router.get("/get-solicitudes",  verifyToken.verifyJWT, (req, res) => {
  getSolicitudes(req, res);
});
//#endregion

module.exports = router;
