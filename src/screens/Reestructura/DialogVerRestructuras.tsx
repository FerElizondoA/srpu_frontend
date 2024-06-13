import {
  AccordionActions,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { ISolicitudLargoPlazo } from "../../store/Inscripcion/inscripcion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
// interface AccordionItem {
//     title: string;
//     content: string;
//     [key: string]: any; // Esto permite propiedades adicionales
//   }

interface AccordionItem {
  [key: string]: any;
}

export function DialogVerRestrucuturas({
  showRestructura,
  openRestructura,
  IdSolicitud,
  solicitud,
}: {
  showRestructura: Function;
  openRestructura: boolean;
  IdSolicitud: string;
  solicitud: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openRestructura);
  }, [openRestructura]);

  const [restructuras, setRestructuras] = useState([]);

  

  async function getRestrucutras() {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_APPLICATION_BACK}/listaRestructura`,
      params: {
        Id: IdSolicitud,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken") || "",
      },
    })
      .then(({ data }) => {
        let newJson = data.data;

        let newArrayjson: any = [];
        // eslint-disable-next-line array-callback-return
        newJson.map((item: any) => {
          newArrayjson.push(JSON.parse(item.SolicitudReestructura));
        });

        console.log("newjson: ", JSON.stringify(newArrayjson[0]));

        setRestructuras(newArrayjson);
      })
      .catch((error) => {});
  }

  useEffect(() => {
    //console.log("solicitudObjeto: ", JSON.stringify(newArrayjsonSolicitud));
    getRestrucutras();
  }, []);

  const restructura = solicitud;

  
  const keyMapping: { [key: string]: string } = {
    tipoDocumento: "Tipo de documento",
    tipoEntePublico: "Tipo de Ente Publico",
    organismo: "Organismo",
    fechaContratacion: "Fecha de Contratación",
    MontoAutorizado: "Monto Autorizado",
    NumeroAutorizacion: "Numero de Auto",
    autorizacionReestructura: "Autorización de Reestructura",
    tablaDeclaratorias: "Tabla de Declaratorias",
    ClausulaOriginal: "Clausula Original",
    ClausulaModificada: "Clausula Modificada",
    ReestructuraDeclaratorias: "Reestructura de Declaratorias",
    TipoConvenio: "Tipo de Convenio",
    FechaConvenio: "Fecha de Convenio",
    SalgoVigente: "Saldo Vigente",
    PeriodoFinanciamiento: "Periodo de Financiamiento",
    PeriodoAdminitracion: "Periodo por Administración",
    pagosDeCapital: "Pagos de Capital",
    fechaPrimerPago: "Fecha de Primer Pago",
    numeroDePago: "Numero de Pago",
    disposición: "Disposición",
    importe: "Importe",
    tasaInteres: "Tasa de Interes",
    tasaFija: "Tasa Fija",
    diasEjercicio: "Dias de Ejercicio",
    tasaReferencia: "Tasa de Referencia",
    sobretasa: "Sobre Tasa",
    tasaEfectiva: "Tasa Efectiva",
    comisiones: "Comisiones",
    fechaComision: "Fecha de Comisión",
    tipoDeComision: "Tipo de Comisión",
    monto: "Monto",
    porcentaje: "Porcentaje",
    iva: "Iva",
    descripcionTipo: "Tipo de Descripción",
    nombreArchivo: "Nombre de Archivo",
    mecanismoVehiculoDePago: "Mecanismo Vehiculo de Pago",
    NumeroRegistro: "Numero de Registro",
    fuente: "Fuente",
    tipoFuente: "Tipo de Fuente",
    fondoIngreso: "Fondo de Ingreso",
    fondoIngresoGobiernoEstatal: "Fondo a Ingreso Gobierno Estatal",
    fondoIngresoMunicipios: "Fondo de Ingreso por Municipios",
    fondoIngresoAsignadoMunicipio: "Fondo de Ingreso Asignado a Municipio",
    ingresoOrganismo: "Ingreso de Organismo",
    fondoIngresoAfectadoXGobiernoEstatal:
      "Fondo de Ingreso de Afecto por Gobierno Estatal",
    afectacionGobiernoEstatalEntre100:
      "Afectación de Gobierno Estatal entre 100",
    acumuladoAfectacionGobiernoEstatalEntre100:
      "Acumulado de Afectación del Gobierno Estatal entre 100",
    fondoIngresoAfectadoXMunicipio: "Fondo Ingreso Afectado por Municipio",
    acumuladoAfectacionMunicipioEntreAsignadoMunicipio:
      "Acumulado Afectado de Municipio entre Asignado de Municipio",
    ingresoAfectadoXOrganismo: "Ingreso Afectado por Organismo",
    acumuladoAfectacionOrganismoEntre100:
      "Acumulado de Afectación del Organismo entre 100",
    garantiaDePago: "Garantía de Pago",
    informacionGeneral: "Informacion General",
    fechaVencimiento: "Fecha de Vencimiento",
    plazo: "Plazo",
    destino: "Destino",
    denominación: "Denominación",
    institucionFinanciera: "Institución Financiera",
    destinoGastosCostos: "Destino de Gastos y Costos",
    detalleInversion: "Detalle de Inversión",
    archivoDetalleInversion: "Archivo Detalle de Inversión",
    archivo: "Archivo",
    claveInscripcionFinanciamiento: "Clave de Inscripción de Financiamiento",
    gastosAdicionales: "Gastos Adicionales",
    montoGastosAdicionales: "Monto de Gastos Adicionales",
    saldoVigente: "Saldo Vigente",
    declaratorias: "Declaratorias",
  };

  

  function renderProperties(obj: any) {
    return Object.keys(obj)
      .map((key, idx) => {
        const value = obj[key];

        // Excluir propiedades que contienen la palabra 'Id' o 'tipoArchivo'
        if (
          key.toLowerCase().includes("id") ||
          key.toLowerCase().includes("tipoarchivo")
        )
          return null;

        // Obtener la etiqueta mapeada o usar la clave original si no hay mapeo
        const label = keyMapping[key] || key;

        if (typeof value === "object" && value !== null) {
          return (
            <Grid item xs={12} key={idx}>
              <Typography sx={{ color: "rgb(175, 140, 85)" }}>
                <strong>{label}</strong>:
              </Typography>
              <Grid container spacing={1} sx={{ paddingLeft: 2 }}>
                {renderProperties(value)}
              </Grid>
            </Grid>
          );
        } else {
          const formattedValue = key.toLowerCase().includes("fecha")
            ? format(new Date(value), "dd/MM/yyyy", { locale: es })
            : JSON.stringify(value);

          return (
            <Grid item xs={12} key={idx}>
              <Typography>
                <strong>{label}</strong>: {formattedValue}
              </Typography>
            </Grid>
          );
        }
      })
      .filter(Boolean); // Filtrar elementos nulos
  }

  return (
    <Dialog
      fullScreen
      open={open}
      sx={{ height: "100%" }}
      onClose={() => showRestructura(false)}
    >
      <DialogTitle
        sx={{
          fontFamily: "MontserratBold",
          backgroundColor: "rgb(175, 140, 85)",
          display: "flex",
          color: "white",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Restructuras
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => showRestructura(false)}
          aria-label="close"
          sx={{ ml: 2 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
         <Grid container spacing={3}>
        {restructuras.map((item, index) => {
         // const diffMap = compareObjects(restructura, item);

          return (
            <Grid item xs={12} key={index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <strong>{"Solicitud de Restructura"}</strong>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid item container flexDirection={"column"} spacing={2}>
                    {['encabezado', 'autorizacion', 'SolicitudReestructuracion', 'condicionesFinancieras', 'documentacion', 'fuenteDePago', 'informacionGeneral', 'inscripcion'].map((section, idx) => (
                      <Grid
                        item
                        key={idx}
                        sx={{
                          borderBlockColor: "black",
                          border: 1,
                          borderRadius: 5,
                          justifyContent: "center",
                          padding: 2, // Añadir padding interno
                          marginBottom: 2, // Añadir separación inferior
                        }}
                      >
                        <Typography>
                          <strong>{section.charAt(0).toUpperCase() + section.slice(1)}:</strong>
                        </Typography>
                        {renderProperties(item[section])}
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          );
        })}
      </Grid>
      </DialogContent>
    </Dialog>
  );
}
