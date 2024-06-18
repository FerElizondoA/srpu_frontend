import {
  AccordionActions,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
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
import { queries } from "../../queries";
// interface AccordionItem {
//     title: string;
//     content: string;
//     [key: string]: any; // Esto permite propiedades adicionales
//   }

interface AccordionItem {
  [key: string]: any;
}

interface Restructura {
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

  const [restructuras, setRestructuras] = useState<Restructura[]>([]);

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
    getRestrucutras();
  }, []);

  const restructura = solicitud;

  const keyMapping: { [key: string]: string } = {
    tipoDocumento: "Tipo de documento",
    tipoEntePublico: "Tipo de Ente Publico",
    TipoEntePublico: "Tipo de Ente Publico",
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
    SolicitudReestructuracion: "Solicitud de Reestructuracion",
    fechaDisposicion: " Fecha de Disposicion",
  };

  interface Differences {
    [key: string]: boolean;
  }

  const isObject = (value: any) =>
    value && typeof value === "object" && !Array.isArray(value);

  const compareObjects = (obj1: any, obj2: any): Differences => {
    const differences: Differences = {};

    const compare = (obj1: any, obj2: any, path: string = ""): void => {
      const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
      keys.forEach((key) => {
        const currentPath = path ? `${path}.${key}` : key;
        const val1 = obj1[key];
        const val2 = obj2[key];

        // console.log(`Comparing: ${currentPath}`);
        //console.log(`val1: ${val1}, val2: ${val2}`);

        if (isObject(val1) && isObject(val2)) {
          compare(val1, val2, currentPath);
        } else if (val1 !== val2) {
          console.log(`Difference found at: ${currentPath}`);
          differences[currentPath] = true;
        }
      });
    };

    compare(obj1, obj2);
    return differences;
  };

  const renderProperties = (
    obj: any,
    differences: Differences = {},
    path: string = ""
  ) => {
    return Object.keys(obj)
      .map((key, idx) => {
        const value = obj[key];
        const currentPath = path ? `${path}.${key}` : key;
        const label = keyMapping[key] || key;

        // Excluir propiedades que contienen la palabra 'Id' o 'tipoArchivo'
        if (
          key.toLowerCase().includes("id") ||
          key.toLowerCase().includes("tipoarchivo")
        ) {
          return null;
        }

        const isDifferent = differences[currentPath];

        if (typeof value === "object" && value !== null) {
          return (
            <Grid item container spacing={1} sx={{ paddingLeft: 2,  }} xs={12} key={idx}>
              <Typography
                sx={{
                  color: isDifferent ? "red" : "rgb(175, 140, 85)",
                  ...queries.bold_text,
                }}
              >
                <strong>{label}</strong>:
              </Typography>
              <Grid container >
                {renderProperties(value, differences, currentPath)}
              </Grid>
            </Grid>
          );
        } else {
          const formattedValue = key.toLowerCase().includes("fecha")
            ? format(new Date(value), "dd/MM/yyyy", { locale: es })
            : JSON.stringify(value);

          return (
            <Grid item xs={12} key={idx} sx={{}}>
              <Typography
                sx={{
                  color: isDifferent ? "red" : "inherit",
                  ...queries.bold_text,
                }}
              >
                <strong>{label}</strong>: {formattedValue}
              </Typography>
            </Grid>
          );
        }
      })
      .filter(Boolean);
  };

  const [expanded, setExpanded] = useState<string | false>(false); // Estado para mantener el índice del acordeón abierto

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false); // Actualiza el estado cuando se expande o colapsa el acordeón
    };

  return (
    <Dialog
      fullScreen
      open={openRestructura}
      sx={{ height: "100%" }}
      onClose={() => showRestructura(false)}
    >
      <DialogTitle
        sx={{
          //fontFamily: "MontserratBold",
          backgroundColor: "rgb(175, 140, 85)",
          display: "flex",
          color: "white",
          justifyContent: "space-between",
          alignItems: "center",
          ...queries.bold_text,
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
            const diffMap = compareObjects(JSON.parse(restructura), item);

            return (
              <Grid item xs={12} key={index}>
                <Accordion
                  expanded={expanded === `panel${index + 1}`}
                  onChange={handleChange(`panel${index + 1}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                    sx={queries.bold_text}
                    
                  >
                    <Typography sx={queries.bold_text}>
                      <strong>{"Solicitud de Restructura"}</strong>
                    </Typography>
                  </AccordionSummary>
                  {expanded === `panel${index + 1}` ? (
                    <AccordionDetails>
                      <Grid item container flexDirection={"column"}  marginBottom={2} spacing={2}>
                        {[
                          "encabezado",
                          "autorizacion",
                          "SolicitudReestructuracion",
                          "condicionesFinancieras",
                          "documentacion",
                          "fuenteDePago",
                          "informacionGeneral",
                          "inscripcion",
                        ].map((section, idx) => (
                          <Grid
                            item
                            key={idx}
                            sx={{
                              justifyContent: "center",
                              padding: 2,
                              marginBottom: 2,
                              
                            }}
                          >
                            <Typography sx={{ ...queries.bold_text }}>
                              <strong>
                                {section.charAt(0).toUpperCase() +
                                  section.slice(1)}
                              </strong>
                            </Typography>
                            <Divider color="lightGrey" sx={{ marginBottom: 1}}></Divider>
                            {renderProperties(item[section], diffMap, section)}
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  ) : null}
                </Accordion>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
