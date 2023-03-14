const express = require("express");
const verifyToken = require("../controllers/auth/verifyToken.js");
const { createClaveDeInscripcion, getClavesDeInscripcion, getDetailClaveDeInscripcion, modifyClaveDeInscripcion, deleteClaveDeInscripcion } = require("../controllers/ClaveDeInscripcion.js");
const { createDestino, getDestinos, getDetailDestino, modifyDestino, deleteDestino } = require("../controllers/Destinos.js");
const { createEntePublicoObligado, getEntePublicoObligado, getDetailEntePublicoObligado, modifyEntePublicoObligado, deleteEntePublicoObligado } = require("../controllers/EntesPublicosObligados.js");
const { createEstatus, getDetailEstatus, modifyEstatus, deleteEstatus, getEstatus } = require("../controllers/Estatus.js");
const { deleteFuenteAlternaDePago, createFuenteAlternaDePago, getFuenteAlternaDePago, getDetailFuenteAlternaDePago, modifyFuenteAlternaDePago } = require("../controllers/FuenteAlternaDePago.js");
const { createFuenteDePago, getFuenteDePago, getDetailFuenteDePago, modifyFuenteDePago, deleteFuenteDePago } = require("../controllers/FuenteDePago.js");
const router = express.Router();
const { createInstitucionFinanciera, modifyInstitucionFinanciera, deleteInstitucionFinanciera, getInstitucionesFinancieras, getDetailInstitucionFinanciera } = require("../controllers/InstitucionesFinancieras.js");
const { createObligadoSolidarioAval, getObligadoSolidarioAval, getDetailObligadoSolidarioAval, modifyObligadoSolidarioAval, deleteObligadoSolidarioAval } = require("../controllers/ObligadoSolidarioAval.js");
const { createRol, getRoles, getDetailRol, modifyRol, deleteRol } = require("../controllers/Roles.js");
const { createTipoDeDocumento, getListadoTipoDeDocumentoCortoPlazo, getListadoTipoDeDocumentoLargoPlazo, getListadoTipoDeDocumento } = require("../controllers/TipoDeDocumentos.js");

const { getDetailUsuario } = require("../controllers/usuarios.js");



//Instituciones Financieras
router.post("/create-institucionFinanciera",  verifyToken.verifyJWT, (req, res, express) => {
  createInstitucionFinanciera(req, res);
});

router.get("/get-institucionesFinancieras", verifyToken.verifyJWT, (req, res) => {
  getInstitucionesFinancieras(req, res);
});

router.get("/detail-institucionFinanciera", verifyToken.verifyJWT, (req, res) => {
  getDetailInstitucionFinanciera(req, res);
});

router.put("/modify-institucionFinanciera", verifyToken.verifyJWT, (req, res) => {
  modifyInstitucionFinanciera(req, res);
});


router.delete("/delete-institucionFinanciera", verifyToken.verifyJWT, (req, res) => {
  deleteInstitucionFinanciera(req, res);
});

//Estatus
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

//EntePublicoObligado
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


//ObligadoSolidarioAval
router.post("/create-obligadoSolidarioAval",  verifyToken.verifyJWT, (req, res, express) => {
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


//FuenteDePago
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


//FuenteAlternaDePago
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

//Destinos
router.post("/create-destino",  verifyToken.verifyJWT, (req, res, express) => {
  createDestino(req, res);
});

router.get("/get-destinos", verifyToken.verifyJWT, (req, res) => {
  getDestinos(req, res);
});

router.get("/detail-destino", verifyToken.verifyJWT, (req, res) => {
  getDetailDestino(req, res);
});

router.put("/modify-destino", verifyToken.verifyJWT, (req, res) => {
  modifyDestino(req, res);
});


router.delete("/delete-destino", verifyToken.verifyJWT, (req, res) => {
  deleteDestino(req, res);
});

//Roles
router.post("/create-rol",  verifyToken.verifyJWT, (req, res, express) => {
  createRol(req, res);
});

router.get("/get-roles", verifyToken.verifyJWT, (req, res) => {
  getRoles(req, res);
});

router.get("/detail-rol", verifyToken.verifyJWT, (req, res) => {
  getDetailRol(req, res);
});

router.put("/modify-rol", verifyToken.verifyJWT, (req, res) => {
  modifyRol(req, res);
});


router.delete("/delete-rol", verifyToken.verifyJWT, (req, res) => {
  deleteRol(req, res);
});

//Usuario
router.get("/detail-usuario", verifyToken.verifyJWT, (req, res) => {
  getDetailUsuario(req, res);
});
//TipoDeDocumento
router.post("/create-tipoDeDocumento",  verifyToken.verifyJWT, (req, res) => {
  createTipoDeDocumento(req, res);
});

router.post("/get-tipoDeDocumento",  verifyToken.verifyJWT, (req, res) => {
  getListadoTipoDeDocumento(req, res);
});

router.post("/get-tipoDeDocumentoLargoPlazo",  verifyToken.verifyJWT, (req, res) => {
  getListadoTipoDeDocumentoLargoPlazo(req, res);
});

router.post("/get-tipoDeDocumentoCortoPlazo",  verifyToken.verifyJWT, (req, res) => {
  getListadoTipoDeDocumentoCortoPlazo(req, res);
});

router.post("/delete-tipoDeDocumento",  verifyToken.verifyJWT, (req, res) => {
  deleteTipoDeDocumento(req, res);
});


module.exports = router;
