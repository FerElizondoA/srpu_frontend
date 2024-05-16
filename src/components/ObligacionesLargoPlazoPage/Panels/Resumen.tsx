/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { format, lightFormat } from "date-fns";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { ICondicionFinanciera } from "../../../store/CreditoCortoPlazo/condicion_financiera";
import { IObligadoSolidarioAval } from "../../../store/CreditoCortoPlazo/informacion_general";
import {
  IDisposicion,
  ITasaInteres,
} from "../../../store/CreditoCortoPlazo/pagos_capital";
import { IComisiones } from "../../../store/CreditoCortoPlazo/tasa_efectiva";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { IInscripcion } from "../../../store/Inscripcion/inscripcion";
import { useInscripcionStore } from "../../../store/Inscripcion/main";
import { getDocumentos } from "../../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  headsComision,
  headsDisposicion,
  headsTasa,
} from "../../ObligacionesCortoPlazoPage/Panels/CondicionesFinancieras";
import { ComentarioApartado } from "../Dialog/DialogComentarioApartado";
import { IFile } from "./Documentacion";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { IAutorizaciones } from "../../../store/CreditoLargoPlazo/autorizacion";
import { IRegistro } from "../../../store/CreditoLargoPlazo/fuenteDePago";
import { useFideicomisoStore } from "../../../store/Fideicomiso/main";
import { useMandatoStore } from "../../../store/Mandatos/main";
import { useInstruccionesStore } from "../../../store/InstruccionesIrrevocables/main";
import { ICatalogo } from "../../Interfaces/InterfacesLplazo/encabezado/IListEncabezado";
import { IDatosGeneralesInstrucciones, IDeudorInstrucciones, ISoporteDocumentalInstrucciones } from "../../../store/InstruccionesIrrevocables/instruccionesIrrevocables";
import { useReestructuraStore } from "../../../store/Reestructura/main";
import { IGastosCostos } from "../../../store/CreditoLargoPlazo/informacion_general";




interface Head {
  label: string;
}

interface HeadLabels {
  label: string;
  value: string;
}

const heads: Head[] = [
  {
    label: "Tipo de Ente Público Obligado",
  },
  {
    label: "Ente público obligado",
  },
];

const headsCondiciones: Head[] = [
  {
    label: "Disposición(es)",
  },
  {
    label: "Fecha de Primer Pago Capital",
  },
  {
    label: "Periodicidad de Pago Capital",
  },
  {
    label: "Fecha de Primer Pago de Interés",
  },
  {
    label: "Tasa de Interés",
  },
  {
    label: "Comisiones",
  },
];

const headsAutorizacion: Head[] = [
  {
    label: "Número de autorización",
  },
  {
    label: "Fecha de publicación",
  },
  {
    label: "Monto autorizado",
  },
  {
    label: "Medio de publicación",
  },
  {
    label: "Documento soporte",
  },
  {
    label: "Detalle del destino",
  },
];

const headsTipoMovimiento: Head[] = [
  {
    label: "Id",
  },
  {
    label: "Tipo de Ente Público Obligado",
  },
  {
    label: "Ente Público Obligado",
  },
  {
    label: "Fuente de Pago",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% del Ingreso o Fondo Correspondiente a los Municipios",
  },
  {
    label: "% de Asignación del Fondo o Ingreso Correspondiente al Municipio",
  },
  {
    label: "% del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Afectado a la Instrucción del Ingreso o Fondo Correspondiente al Gobierno del Estado",
  },
  {
    label: "% de Afectación del Gobierno del Estado /100 del Fondo o Ingreso",
  },
  {
    label:
      "% Acumulado de Afectación del Gobierno del Estado a los Mecanismos de Pago /100",
  },
  {
    label:
      "% Afectado a la Instrucción del Ingreso o Fondo Correspondiente al Municipio",
  },
  {
    label:
      "% Acumulado de Afectación del Municipio a los Mecanismos de Pago /% Asignado al Municipio",
  },
  {
    label:
      "% Afectado a la Instrucción del Ingreso Correspondiente al Organismo",
  },
  {
    label:
      "% Acumulado de Afectación del Organismo a los Mecanismos de Pago /100 del Ingreso",
  },
];

const headsGC: Head[] = [
  {
    label: "Destino",
  },
  {
    label: "Detalle de la inversión",
  },
  {
    label: "Descripción",
  },
  {
    label: "Clave de Inscripción del Financiamiento",
  },
  {
    label: "Monto",
  },
  {
    label: "Gastos Adicionales",
  },
  {
    label: "Monto Gastos Adicionales",
  },
  {
    label: "Saldo Vigente",
  },
  {
    label: "Detalle de la Inversión",
  },
];

export function Resumen({ coments }: { coments: boolean }) {
  const [showModalPrevia, setShowModalPrevia] = useState(false);

  const inscripcion: IInscripcion = useInscripcionStore(
    (state) => state.inscripcion
  );

  // Encabezado
  const TipodeDocumento: string = useLargoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );
  const solicitanteAutorizado: {
    IdSolicitante: string;
    Cargo: string;
    Nombre: string;
  } = useLargoPlazoStore((state) => state.encabezado.solicitanteAutorizado);

  const TipodeEntePúblico: { Id: string; TipoEntePublico: string } =
    useLargoPlazoStore((state) => state.encabezado.tipoEntePublico);
  const MunicipiouOrganismo: { Id: string; Organismo: string } =
    useLargoPlazoStore((state) => state.encabezado.organismo);
  const FechadeContratación: string = useLargoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  // Informacion general
  const FechadeVencimiento: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );
  const Plazo: string = useLargoPlazoStore((state) =>
    state.informacionGeneral.plazo.toString()
  );
  const MontoOriginalContratado: string = useLargoPlazoStore((state) =>
    state.informacionGeneral.monto.toString()
  );
  const Destino: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.destino.Descripcion
  );
  const Denominación: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.denominacion
  );
  const InstituciónFinanciera: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.institucionFinanciera.Descripcion
  );

  const tablaObligados: IObligadoSolidarioAval[] = useLargoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );

  // Condiciones Financieras
  const tablaCondicionesFinancieras: ICondicionFinanciera[] =
    useLargoPlazoStore((state) => state.tablaCondicionesFinancieras);

  // Documentación
  const documentos: IFile[] = useLargoPlazoStore(
    (state) => state.tablaDocumentos
  );

  const [openTasa, setOpenTasa] = useState(false);
  const [openComision, setOpenComision] = useState(false);

  const [rowTasa, setRowTasa] = useState<Array<ITasaInteres>>([]);
  const [rowComision, setRowComision] = useState<Array<IComisiones>>([]);

  const [openComentarioApartado, setOpenComentarioApartado] = useState({
    open: false,
    apartado: "",
    tab: "Tab",
  });


  const mecanismoVehiculoPago: IRegistro = useLargoPlazoStore(
    (state) => state.mecanismoVehiculoPago
  );

  const setMecanismoVehiculoPago: Function = useLargoPlazoStore(
    (state) => state.setMecanismoVehiculoPago
  );

  const tipoMecanismoVehiculoPago: string = useLargoPlazoStore(
    (state) => state.tipoMecanismoVehiculoPago
  );

  const tablaMecanismoVehiculoPago: IRegistro[] = useLargoPlazoStore(
    (state) => state.tablaMecanismoVehiculoPago
  );

  const gastosCostos: IGastosCostos = useLargoPlazoStore(
    (state) => state.gastosCostos
  );

  const tablaGastosCostos: IGastosCostos[] = useLargoPlazoStore(
    (state) => state.tablaGastosCostos
  );

  const encabezado: HeadLabels[] = [
    {
      label: "Tipo de Documento",
      value: TipodeDocumento,
    },
    {
      label: "Tipo de Ente Público",
      value: TipodeEntePúblico.TipoEntePublico,
    },
    {
      label: "Solicitante Autorizado",
      value: solicitanteAutorizado.Nombre,
    },
    {
      label: "Municipio u Organismo",
      value: MunicipiouOrganismo.Organismo,
    },
    {
      label: "Fecha de Contratación (Encabezado)",
      value: FechadeContratación,
    },
    {
      label: "Cargo del Solicitante",
      value: solicitanteAutorizado.Cargo,
    },
  ];

  const infoGeneral: HeadLabels[] = [
    {
      label: "Fecha de Contratación (Informacion General)",
      value: FechadeContratación,
    },
    {
      label: "Fecha de Vencimiento",
      value: FechadeVencimiento,
    },
    {
      label: "Plazo",
      value: Plazo,
    },
    {
      label: "Monto Original Contratado",
      value: MontoOriginalContratado,
    },
    {
      label: "Destino",
      value: Destino,
    },
    {
      label: "Denominación",
      value: Denominación,
    },
    {
      label: "Institución Financiera",
      value: InstituciónFinanciera,
    },
  ];

  const GastosCostos: HeadLabels[] = [
    {
      label: "Monto",
      value: gastosCostos.monto,
    },
    {
      label: "Gastos Adicionales",
      value: gastosCostos.gastosAdicionales
    },
    {
      label: "Monto Gastos Adicionales",
      value: gastosCostos.montoGastosAdicionales
    },
    {
      label: "Saldo Vigente ",
      value: gastosCostos.saldoVigente
    },
  ];

  const fuenteDePago: HeadLabels[] = [
    {
      label: "Mecanismo o vehículo de pago",
      value: tipoMecanismoVehiculoPago,
    },
    {
      label: "Identificador",
      value: mecanismoVehiculoPago.NumeroRegistro,
    },
  ];

  const [fileSelected, setFileSelected] = useState<any>("");

  const comentarios: any = useLargoPlazoStore((state) => state.comentarios);

  const [arr, setArr] = useState<any>([]);

  // const [cargados, setCargados] = useState(true);

  useEffect(() => {
    inscripcion.Id &&
      getDocumentos(
        `/SRPU/LARGOPLAZO/DOCSOL/${inscripcion.Id}/`,
        setArr,
        () => { }
        // setCargados
      );
  }, []);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const [rowDisposicion, setRowDisposicion] = useState<Array<IDisposicion>>([]);
  const [openDisposicion, setOpenDisposicion] = useState(false);

  const activaAccion =
    localStorage.getItem("IdUsuario") === inscripcion.IdEditor;

  const reestructura: string = useReestructuraStore(
    (state) => state.reestructura
  );

  const autorizacionSelect: IAutorizaciones = useLargoPlazoStore(
    (state) => state.autorizacionSelect
  );


  const [arrDocs, setArrDocs] = useState<any>([]);

  const sumaPorcentajeAcumulado: {
    SumaAcumuladoEstado: number;
    SumaAcumuladoMunicipios: number;
    SumaAcumuladoOrganismos: number;
  } = useFideicomisoStore((state) => state.sumaPorcentajeAcumulado);

  const tablaTipoMovimiento: IDeudorInstrucciones[] = useInstruccionesStore(
    (state) => state.tablaTipoMovimiento
  );

  const addPorcentaje: Function = useInstruccionesStore(
    (state) => state.addPorcentaje
  );

  const tablaResumenMecanismoPago: IDeudorInstrucciones[] = useLargoPlazoStore(
    (state) => state.tablaResumenMecanismoPago
  )


  return (
    <Grid
      width={"100%"}
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: ".5vw",
          height: ".5vh",
          mt: 1,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#AF8C55",
          outline: "1px solid slategrey",
          borderRadius: 1,
        },
        height: "40rem",
        "@media (min-width: 480px)": {
          height: "40rem",
        },
        "@media (min-width: 768px)": {
          height: "45rem",
        },
        "@media (min-width: 1140px)": {
          height: "35rem",
        },
        "@media (min-width: 1400px)": {
          height: "35rem",
        },
        "@media (min-width: 1870px)": {
          height: "48rem",
        },
      }}
    >
      <Grid
        item
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid mt={{ xs: 1, sm: 5, md: 5, lg: 5, xl: 5 }}>
          <Typography sx={queries.bold_text}>Encabezado</Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
            }}
          >
            <Divider color="lightGrey"></Divider>
            {encabezado.map((head, index) => (
              <Grid sx={{ display: "flex", alignItems: "center" }} key={index}>
                {/* Revisar */}

                {activaAccion && reestructura !== "con autorizacion" ? (
                  <Tooltip title="Añadir comentario a este apartado">
                    <IconButton
                      color={
                        comentarios[head.label] &&
                          comentarios[head.label] !== ""
                          ? "success"
                          : "primary"
                      }
                      size="small"
                      onClick={() => {
                        setOpenComentarioApartado({
                          open: true,
                          apartado: head.label,
                          tab: "TabEncabezado",
                        });
                      }}
                    >
                      <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                    </IconButton>
                  </Tooltip>
                ) : null}

                <Typography sx={{ ...queries.medium_text, mb: 2 }}>
                  <strong>{head.label}: </strong>
                  {head.label.includes("Fecha")
                    ? format(new Date(head.value), "dd/MM/yyyy")
                    : head.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid mt={5} mb={4} width={"100%"}>
          <Typography sx={queries.bold_text}>Información General</Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
            }}
          >
            <Divider color="lightGrey"></Divider>
            {infoGeneral.map((head, index) => (
              <Grid sx={{ display: "flex", alignItems: "center" }} key={index}>
                {/* Revisar */}
                {activaAccion && reestructura !== "con autorizacion" ? (
                  <Tooltip title="Añadir comentario a este apartado">
                    <IconButton
                      color={
                        comentarios[head.label] &&
                          comentarios[head.label] !== ""
                          ? "success"
                          : "primary"
                      }
                      size="small"
                      onClick={() => {
                        setOpenComentarioApartado({
                          open: true,
                          apartado: head.label,
                          tab: "TabInformaciónGeneral",
                        });
                      }}
                    >
                      <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                    </IconButton>
                  </Tooltip>
                ) : null}

                <Typography sx={{ ...queries.medium_text, mb: 2 }}>
                  <strong>{head.label}: </strong>
                  {head.label.includes("Fecha")
                    ? format(new Date(head.value), "dd/MM/yyyy")
                    : head.value}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Grid item display="flex" height={350} mt={2} mb={2} width={"100%"}>
            <Grid mt={2}>
              {/* Revisar */}
              {activaAccion && reestructura !== "con autorizacion" ? (
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentarios["Tabla Obligado Solidario / Aval"] &&
                        comentarios["Tabla Obligado Solidario / Aval"] !== ""
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: "Tabla Obligado Solidario / Aval",
                        tab: "TabInformaciónGeneral",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Grid>

            <Paper sx={{ width: "96%" }}>
              <TableContainer
                sx={{
                  maxHeight: "100%",
                  width: "100%",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
                    height: ".5vh",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#AF8C55",
                    outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                {tablaObligados.length > 0 ? (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {heads.map((head, index) => (
                          <StyledTableCell key={index}>
                            {head.label}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {tablaObligados.map((row: any, index: number) => {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th">
                              {row.tipoEntePublicoObligado}
                            </StyledTableCell>
                            <StyledTableCell component="th">
                              {row.entePublicoObligado}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {heads.map((head, index) => (
                          <StyledTableCell key={index}>
                            {head.label}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell component="th">

                        </StyledTableCell>
                        <StyledTableCell component="th" align="left">
                          <Typography sx={{ padding: "1px 4px 1px 45px" }}>
                            NO APLICA
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell component="th">

                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        <Grid mt={5} mb={4} width={"100%"}>
          <Typography sx={queries.bold_text}>Gastos y Costos</Typography>

          <Divider color="lightGrey"></Divider>

          <Grid item display="flex" height={350} mt={2} mb={2} width={"100%"}>
            <Grid mt={2}>
              {/* Revisar */}
              {activaAccion && reestructura !== "con autorizacion" ? (
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentarios["Tabla Obligado Solidario / Aval"] &&
                        comentarios["Tabla Obligado Solidario / Aval"] !== ""
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: "Tabla Obligado Solidario / Aval",
                        tab: "TabInformaciónGeneral",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Grid>

            <Paper sx={{ width: "95%", overflow: "clip", height: "100%" }}>
              <TableContainer
                sx={{
                  height: "100%",
                  maxHeight: "100%",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".3vw",
                    height: ".5vh",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#AF8C55",
                    outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {headsGC.map((head, index) => (
                        <StyledTableCell align="center" key={index}>
                          {head.label}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tablaGastosCostos.map((row: IGastosCostos, index: number) => {
                      return (
                        <StyledTableRow key={index}>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.destino.Descripcion}
                          </StyledTableCell>

                          <StyledTableCell align="center" component="th">
                            {row.detalleInversion.Descripcion}
                          </StyledTableCell>

                          <StyledTableCell align="center" component="th">
                            {row.descripcion}
                          </StyledTableCell>

                          <StyledTableCell align="center" component="th">
                            {row.claveInscripcionFinanciamiento}
                          </StyledTableCell>

                          <StyledTableCell align="center" component="th">
                            {row.monto}
                          </StyledTableCell>

                          <StyledTableCell align="center" component="th">
                            {row.gastosAdicionales}
                          </StyledTableCell>

                          <StyledTableCell align="center" component="th">
                            {row.montoGastosAdicionales}
                          </StyledTableCell>

                          <StyledTableCell align="center" component="th">
                            {row.saldoVigente}
                          </StyledTableCell>

                          <StyledTableCell align="center" component="th">
                            <Tooltip title={"Ver Documento"}>
                              <IconButton
                                onClick={() => {
                                  toBase64(documentos[index].archivo)
                                    .then((data) => {
                                      setFileSelected(data);
                                    })
                                    .catch((err) => {
                                      setFileSelected(
                                        `data:application/pdf;base64,${arrDocs.filter((td: any) =>
                                          td.NOMBREFORMATEADO.includes(
                                            row?.detalleInversion.Descripcion
                                          )
                                        )[0].FILE
                                        }`
                                      );
                                    });


                                  setShowModalPrevia(true);
                                }}
                              >
                                <FileOpenIcon></FileOpenIcon>
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>



        <Grid mt={5} mb={4} width={"100%"}>
          <Typography sx={queries.bold_text}>Autorizacion</Typography>

          <Divider color="lightGrey"></Divider>

          <Grid item display="flex" height={150} mt={2} mb={2} width={"100%"}>
            <Grid mt={2}>
              {/* Revisar */}
              {activaAccion && reestructura !== "con autorizacion" ? (
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentarios["Tabla Obligado Solidario / Aval"] &&
                        comentarios["Tabla Obligado Solidario / Aval"] !== ""
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: "Tabla Obligado Solidario / Aval",
                        tab: "TabInformaciónGeneral",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Grid>

            <Paper
              sx={{
                width: "95%",
              }}
            >
              <TableContainer
                sx={{
                  width: "100%",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
                    height: ".6vh",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#AF8C55",
                    outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      {headsAutorizacion.map((head, index) => (
                        <StyledTableCell align="center" key={index}>
                          {head.label}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="center" component="th">
                        <Typography>
                          {autorizacionSelect?.NumeroAutorizacion}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th">
                        <Typography>
                          {autorizacionSelect?.FechaPublicacion}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        sx={{ width: 200 }}
                      >
                        <Typography>
                          {autorizacionSelect?.MontoAutorizado}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th">
                        <Typography>
                          {autorizacionSelect?.DescripcionMedioPublicacion}
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th">
                        <Tooltip title={autorizacionSelect?.DocumentoSoporte}>
                          <IconButton
                            onClick={() => {
                              setFileSelected(
                                `data:application/pdf;base64,${arrDocs.filter((td: any) =>
                                  td.nombre.includes(
                                    autorizacionSelect?.DocumentoSoporte
                                  )
                                )[0].file
                                }`
                              );

                              setShowModalPrevia(true);
                            }}
                          >
                            <FileOpenIcon></FileOpenIcon>
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell align="center" component="th">
                        <Typography>
                          {autorizacionSelect?.DetalleDestino &&
                            JSON.parse(autorizacionSelect?.DetalleDestino)[0]
                              .detalleDestino}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* <Paper sx={{ width: "96%" }}>
              <TableContainer
                sx={{
                  maxHeight: "100%",
                  width: "95%",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
                    height: ".5vh",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#AF8C55",
                    outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                {tablaObligados.length > 0 ? (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {heads.map((head, index) => (
                          <StyledTableCell key={index}>
                            {head.label}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {tablaObligados.map((row: any, index: number) => {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell component="th">
                              {row.tipoEntePublicoObligado}
                            </StyledTableCell>
                            <StyledTableCell component="th">
                              {row.entePublicoObligado}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {heads.map((head, index) => (
                          <StyledTableCell key={index}>
                            {head.label}
                          </StyledTableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell component="th" align="left">
                          <Typography sx={{ padding: "1px 4px 1px 45px" }}>
                            NO APLICA
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell component="th"></StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Paper> */}

          </Grid>
        </Grid>








        <Grid mt={5} mb={4} width={"100%"}>
          <Typography sx={queries.bold_text}>Fuente de Pago</Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
            }}
          >
            <Divider color="lightGrey"></Divider>
            {fuenteDePago.map((head, index) => (
              <Grid sx={{ display: "flex", alignItems: "center" }} key={index}>
                {/* Revisar */}
                {activaAccion && reestructura !== "con autorizacion" ? (
                  <Tooltip title="Añadir comentario a este apartado">
                    <IconButton
                      color={
                        comentarios[head.label] &&
                          comentarios[head.label] !== ""
                          ? "success"
                          : "primary"
                      }
                      size="small"
                      onClick={() => {
                        setOpenComentarioApartado({
                          open: true,
                          apartado: head.label,
                          tab: "TabInformaciónGeneral",
                        });
                      }}
                    >
                      <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                    </IconButton>
                  </Tooltip>
                ) : null}

                <Typography sx={{ ...queries.medium_text, mb: 2 }}>
                  <strong>{head.label}: </strong>
                  {head.label.includes("Fecha")
                    ? format(new Date(head.value), "dd/MM/yyyy")
                    : head.value}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Grid item display="flex" height={500} mt={2} mb={2} width={"100%"}>
            <Grid mt={2}>
              {/* Revisar */}
              {activaAccion && reestructura !== "con autorizacion" ? (
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentarios["Tabla Obligado Solidario / Aval"] &&
                        comentarios["Tabla Obligado Solidario / Aval"] !== ""
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: "Tabla Obligado Solidario / Aval",
                        tab: "TabInformaciónGeneral",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Grid>

            <Paper sx={{ width: "100%" }}>
              <TableContainer
                sx={{
                  height: "100%",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
                    height: "1vh",
                    mt: 1,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#AF8C55",
                    outline: "1px solid slategrey",
                    borderRadius: 1,
                  },
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {headsTipoMovimiento.map((head, index) => (
                        <StyledTableCell align="center" key={index}>
                          <Typography sx={{ fontSize: "0.7rem" }}>
                            {head.label}
                          </Typography>
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tablaResumenMecanismoPago.length > 0
                      ?

                      tablaResumenMecanismoPago.map(
                        (row: IDeudorInstrucciones, index: number) => {
                          return (
                            <StyledTableRow key={index}>
                              {/* ID */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.id}
                                </Typography>
                              </StyledTableCell>

                              {/* TIPO MANDANTE */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.tipoEntePublicoObligado.Descripcion}
                                </Typography>
                              </StyledTableCell>


                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.entePublicoObligado.Descripcion}
                                </Typography>
                              </StyledTableCell>

                              {/* FUENTE DE PAGO */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.tipoFuente.Descripcion}
                                </Typography>
                              </StyledTableCell>

                              {/* FONDO INGRESO GOBIERNO ESTATAL */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.fondoIngresoGobiernoEstatal}
                                </Typography>
                              </StyledTableCell>

                              {/* FONDO INGRESO MUNICIPIOS */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.fondoIngresoMunicipios}
                                </Typography>
                              </StyledTableCell>

                              {/* FONDO INGRESO MUNICIPIO */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.fondoIngresoAsignadoMunicipio}
                                </Typography>
                              </StyledTableCell>

                              {/* INGRESO ORGANISMO */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.ingresoOrganismo}
                                </Typography>
                              </StyledTableCell>

                              {/* AFECTADO POR GOBIERNO ESTATAL */}
                              <StyledTableCell align="center">
                                {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                                  "gobierno estatal" && (
                                    <TextField
                                      inputProps={{
                                        sx: {
                                          fontSize: "0.7rem",
                                        },
                                      }}
                                      size="small"
                                      value={row?.fondoIngresoAfectadoXGobiernoEstatal}
                                      onChange={(v) => {
                                        let auxArray = [...tablaTipoMovimiento];
                                        let val = Number(v.target.value);

                                        if (
                                          val <= 100 &&
                                          Number(
                                            sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                          ) +
                                          val <=
                                          Number(
                                            tablaTipoMovimiento[index]
                                              .fondoIngresoGobiernoEstatal
                                          )
                                        ) {
                                          let suma = 0;

                                          tablaTipoMovimiento.map((column) => {
                                            return (suma += Number(
                                              column.fondoIngresoAfectadoXGobiernoEstatal
                                            ));
                                          });

                                          auxArray.map((column) => {
                                            return (column.acumuladoAfectacionGobiernoEstatalEntre100 =
                                              (
                                                suma +
                                                val +
                                                Number(
                                                  sumaPorcentajeAcumulado.SumaAcumuladoEstado
                                                )
                                              ).toString());
                                          });

                                          auxArray[
                                            index
                                          ].fondoIngresoAfectadoXGobiernoEstatal =
                                            val.toString();

                                          addPorcentaje(auxArray);
                                        }
                                      }}
                                    />
                                  )}
                              </StyledTableCell>

                              {/* AFECTACION GOBIERNO ESTATAL / 100 */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.afectacionGobiernoEstatalEntre100}
                                </Typography>
                              </StyledTableCell>

                              {/* ACUMULADO AFECTACION GOBIERNO ESTATAL / 100 */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.acumuladoAfectacionGobiernoEstatalEntre100}
                                </Typography>
                              </StyledTableCell>

                              {/* AFECTADO POR MUNICIPIO */}
                              <StyledTableCell align="center">
                                {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                                  "municipio" && (
                                    <TextField
                                      type="number"
                                      inputProps={{
                                        sx: {
                                          fontSize: "0.7rem",
                                        },
                                      }}
                                      size="small"
                                      value={row?.fondoIngresoAfectadoXMunicipio}
                                      onChange={(v) => {
                                        let auxArray = [...tablaTipoMovimiento];
                                        let val = Number(v.target.value);

                                        if (
                                          val <= 100 &&
                                          Number(
                                            sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                          ) +
                                          val <=
                                          Number(
                                            tablaTipoMovimiento[index]
                                              .fondoIngresoAsignadoMunicipio
                                          )
                                        ) {
                                          let suma = 0;

                                          tablaTipoMovimiento.map((column) => {
                                            return (suma += Number(
                                              column.fondoIngresoAfectadoXMunicipio
                                            ));
                                          });

                                          auxArray.map((column) => {
                                            return (column.acumuladoAfectacionMunicipioEntreAsignadoMunicipio =
                                              (
                                                suma +
                                                val +
                                                Number(
                                                  sumaPorcentajeAcumulado.SumaAcumuladoMunicipios
                                                )
                                              ).toString());
                                          });

                                          auxArray[
                                            index
                                          ].fondoIngresoAfectadoXMunicipio =
                                            val.toString();

                                          addPorcentaje(auxArray);
                                        }
                                      }}
                                    />
                                  )}
                              </StyledTableCell>

                              {/* ACUMULADO AFECTACION MUNICIPIOS / ASIGNADO AL MUNICIPIO */}
                              <StyledTableCell align="center">
                                {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() ===
                                  "municipio" && (
                                    <Typography sx={{ fontSize: "0.7rem" }}>
                                      {
                                        row?.acumuladoAfectacionMunicipioEntreAsignadoMunicipio
                                      }
                                    </Typography>
                                  )}
                              </StyledTableCell>

                              {/* AFECTADO POR ORGANISMO */}
                              <StyledTableCell align="center">
                                {row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                                  "gobierno estatal" &&
                                  row?.tipoEntePublicoObligado.Descripcion.toLowerCase() !==
                                  "municipio" && (
                                    <TextField
                                      type="number"
                                      inputProps={{
                                        sx: {
                                          fontSize: "0.7rem",
                                        },
                                      }}
                                      size="small"
                                      value={row?.ingresoAfectadoXOrganismo}
                                      onChange={(v) => {
                                        let auxArray = [...tablaTipoMovimiento];
                                        let val = Number(v.target.value);

                                        if (
                                          val <= 100 &&
                                          Number(
                                            sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                          ) +
                                          val <=
                                          Number(
                                            tablaTipoMovimiento[index]
                                              .ingresoOrganismo
                                          )
                                        ) {
                                          let suma = 0;

                                          tablaTipoMovimiento.map((column) => {
                                            return (suma += Number(
                                              column.ingresoAfectadoXOrganismo
                                            ));
                                          });

                                          auxArray.map((column) => {
                                            return (column.acumuladoAfectacionOrganismoEntre100 =
                                              (
                                                suma +
                                                val +
                                                Number(
                                                  sumaPorcentajeAcumulado.SumaAcumuladoOrganismos
                                                )
                                              ).toString());
                                          });

                                          auxArray[index].ingresoAfectadoXOrganismo =
                                            val.toString();

                                          addPorcentaje(auxArray);
                                        }
                                      }}
                                    />
                                  )}
                              </StyledTableCell>

                              {/* ACUMULADO AFECTACION ORGANISMO / 100 */}
                              <StyledTableCell align="center">
                                <Typography sx={{ fontSize: "0.7rem" }}>
                                  {row?.acumuladoAfectacionOrganismoEntre100}
                                </Typography>
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        }
                      )

                      : null
                    }

                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>











        <Grid mt={3} width={"100%"}>
          <Typography sx={queries.bold_text}>
            Condiciones Financieras
          </Typography>
          <Divider color="lightGrey"></Divider>
          <Grid item width={"100%"} mt={3} display={"flex"} height={350}>
            <Grid mt={4}>
              {/* Revisar */}
              {activaAccion && reestructura !== "con autorizacion" ? (
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentarios["Tabla Condiciones Financieras"] &&
                        comentarios["Tabla Condiciones Financieras"] !== ""
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: "Tabla Condiciones Financieras",
                        tab: "TabCondiciones Financieras",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Grid>

            <Paper sx={{ width: "95%" }}>
              {
                tablaCondicionesFinancieras.length > 0 ? (
                  <TableContainer
                    sx={{
                      height: 350,
                      maxHeight: "100%",
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        width: ".5vw",
                        height: ".5vh",
                        mt: 1,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#AF8C55",
                        outline: "1px solid slategrey",
                        borderRadius: 1,
                      },
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headsCondiciones.map((head, index) => (
                            <StyledTableCell key={index}>
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tablaCondicionesFinancieras.map((row, index) => {
                          return (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center">
                                <Button
                                  onClick={() => {
                                    setRowDisposicion(row.disposicion);
                                    setOpenDisposicion(true);
                                  }}
                                >
                                  <InfoOutlinedIcon />
                                </Button>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {format(
                                  new Date(row.pagosDeCapital.fechaPrimerPago),
                                  "dd/MM/yyyy"
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {
                                  row.pagosDeCapital.periodicidadDePago
                                    .Descripcion
                                }
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {format(
                                  new Date(row.pagosDeCapital.fechaPrimerPago),
                                  "dd/MM/yyyy"
                                )}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Button
                                  onClick={() => {
                                    setRowTasa(row.tasaInteres);
                                    setOpenTasa(true);
                                  }}
                                >
                                  <InfoOutlinedIcon />
                                </Button>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Button
                                  onClick={() => {
                                    setRowComision(row.comisiones);
                                    setOpenComision(true);
                                  }}
                                >
                                  <InfoOutlinedIcon />
                                </Button>
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>

                      <Dialog
                        open={openTasa}
                        onClose={() => {
                          setOpenTasa(false);
                        }}
                        maxWidth={"lg"}
                      >
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                          <IconButton
                            onClick={() => {
                              setOpenTasa(false);
                            }}
                            sx={{
                              position: "absolute",
                              right: 8,
                              top: 8,
                              color: "black",
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </DialogTitle>
                        <DialogContent
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <TableContainer sx={{ maxHeight: "400px" }}>
                            <Table>
                              <TableHead sx={{ maxHeight: "200px" }}>
                                <TableRow>
                                  {headsTasa.map((head, index) => (
                                    <StyledTableCell key={index}>
                                      <TableSortLabel>
                                        {head.label}
                                      </TableSortLabel>
                                    </StyledTableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowTasa.map((row, index) => {
                                  return (
                                    <StyledTableRow key={index}>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {lightFormat(
                                          new Date(row.fechaPrimerPago),
                                          "dd-MM-yyyy"
                                        )}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.tasaFija}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.periocidadPago.Descripcion}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.tasaReferencia.Descripcion}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.sobreTasa}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.diasEjercicio.Descripcion}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={openComision}
                        onClose={() => {
                          setOpenComision(false);
                        }}
                        maxWidth={"lg"}
                      >
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                          <IconButton
                            onClick={() => {
                              setOpenComision(false);
                            }}
                            sx={{
                              position: "absolute",
                              right: 8,
                              top: 8,
                              color: "black",
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </DialogTitle>
                        <DialogContent
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <TableContainer sx={{ maxHeight: "400px" }}>
                            <Table>
                              <TableHead sx={{ maxHeight: "200px" }}>
                                <TableRow>
                                  {headsComision.map((head, index) => (
                                    <StyledTableCell key={index}>
                                      <TableSortLabel>
                                        {head.label}
                                      </TableSortLabel>
                                    </StyledTableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowComision.map((row, index) => {
                                  return (
                                    <StyledTableRow key={index}>
                                      <StyledTableCell
                                        component="th"
                                        scope="row"
                                      >
                                        {row.tipoDeComision.Descripcion}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {lightFormat(
                                          new Date(row.fechaComision),
                                          "dd-MM-yyyy"
                                        )}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.periodicidadDePago.Descripcion}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.porcentaje}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.monto}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.iva}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={openDisposicion}
                        onClose={() => {
                          setOpenDisposicion(false);
                        }}
                        maxWidth={"lg"}
                      >
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                          <IconButton
                            onClick={() => {
                              setOpenDisposicion(false);
                            }}
                            sx={{
                              position: "absolute",
                              right: 8,
                              top: 8,
                              color: "black",
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </DialogTitle>
                        <DialogContent
                          sx={{ display: "flex", flexDirection: "row" }}
                        >
                          <TableContainer>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  {headsDisposicion.map((head, index) => (
                                    <StyledTableCell key={index}>
                                      <TableSortLabel>
                                        {head.label}
                                      </TableSortLabel>
                                    </StyledTableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {rowDisposicion.map((row, index) => {
                                  return (
                                    <StyledTableRow key={index}>
                                      <StyledTableCell align="center">
                                        {lightFormat(
                                          new Date(row.fechaDisposicion),
                                          "dd-MM-yyyy"
                                        )}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.importe}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </DialogContent>
                      </Dialog>
                    </Table>
                  </TableContainer>
                ) : (
                  //**********CONDICIONAL************

                  <TableContainer
                    sx={{
                      maxHeight: "100%",
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        width: ".5vw",
                        height: ".5vh",
                        mt: 1,
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#AF8C55",
                        outline: "1px solid slategrey",
                        borderRadius: 1,
                      },
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          {headsCondiciones.map((head, index) => (
                            <StyledTableCell key={index}>
                              <TableSortLabel>{head.label}</TableSortLabel>
                            </StyledTableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <StyledTableRow>
                          <StyledTableCell
                            component="th"
                            scope="row"
                          ></StyledTableCell>

                          <StyledTableCell align="center"></StyledTableCell>

                          <StyledTableCell align="center"></StyledTableCell>

                          <StyledTableCell>
                            <Typography>NO APLICA</Typography>
                          </StyledTableCell>

                          <StyledTableCell align="center"></StyledTableCell>

                          <StyledTableCell align="center"></StyledTableCell>

                          <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )
                //*********FIN TERNARIO ************/
              }
            </Paper>
          </Grid>
        </Grid>

        {/* <Divider color="lightGrey"></Divider> */}
        <Grid mt={5} mb={4} width={"100%"}>
          <Typography sx={queries.bold_text}>Documentación</Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
              //border: "1px solid"
            }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {coments && <StyledTableCell>Comentarios</StyledTableCell>}
                    <StyledTableCell>Tipo de documento</StyledTableCell>
                    <StyledTableCell>Documento cargado</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documentos.map((row, index) => {
                    return (
                      <StyledTableRow key={index}>
                        {activaAccion && reestructura !== "con autorizacion" ? (
                          <Tooltip title="Añadir comentario a este apartado">
                            <IconButton
                              color={
                                comentarios[row.descripcionTipo] &&
                                  comentarios[row.descripcionTipo] !== ""
                                  ? "success"
                                  : "primary"
                              }
                              size="small"
                              onClick={() => {
                                setOpenComentarioApartado({
                                  open: true,
                                  apartado: row.descripcionTipo,
                                  tab: "TabDocumentacion",
                                });
                              }}
                            >
                              <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          "No disponible para reestructura"
                        )}

                        {row.descripcionTipo === undefined ? (
                          <StyledTableCell
                            sx={{
                              bgcolor: "rgb(255 0 0 / 24%)",
                              fontWeight: "bold",
                            }}
                          >
                            Faltante
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell>
                            {row.descripcionTipo}
                          </StyledTableCell>
                        )}

                        {row.nombreArchivo === undefined ? (
                          <StyledTableCell
                            sx={{
                              bgcolor: "rgb(255 0 0 / 24%)",
                              fontWeight: "bold",
                            }}
                          >
                            Faltante
                          </StyledTableCell>
                        ) : (
                          <StyledTableCell>{row.nombreArchivo}</StyledTableCell>
                        )}

                        {row.nombreArchivo === undefined ? null : (
                          <StyledTableCell>
                            <Tooltip title={"Ver Documento"}>
                              {/* {cargados ? (
                                <CircularProgress />
                              ) : ( */}
                              <IconButton
                                onClick={() => {
                                  // var a = document.createElement("a"); //Create <a>
                                  // a.href =
                                  //   "data:application/pdf;base64," +
                                  //   arr.filter((td: any) =>
                                  //     td.NOMBREFORMATEADO.includes(
                                  //       row.nombreArchivo
                                  //     )
                                  //   )[0].FILE; //Image Base64 Goes here
                                  // a.download = `${"NOMBRE"}.pdf`; //File name Here

                                  toBase64(documentos[index].archivo)
                                    .then((data) => {
                                      setFileSelected(data);
                                    })
                                    .catch((err) => {
                                      setFileSelected(
                                        `data:application/pdf;base64,${arr.filter((td: any) =>
                                          td.NOMBREFORMATEADO.includes(
                                            row.nombreArchivo
                                          )
                                        )[0].FILE
                                        }`
                                      );
                                    });
                                  // setFileSelected(a);
                                  setShowModalPrevia(true);
                                  // a.click();
                                }}
                              >
                                <FileOpenIcon></FileOpenIcon>
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        )}
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        open={showModalPrevia}
        onClose={() => {
          setShowModalPrevia(false);
        }}
        fullWidth
        maxWidth={"lg"}
      >
        <DialogTitle sx={{ mb: 2 }}>
          <IconButton
            onClick={() => {
              setShowModalPrevia(false);
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ height: "100vh" }}>
          <iframe
            style={{
              width: "100%",
              height: "85vh",
            }}
            src={fileSelected}
            title="description"
          ></iframe>
        </DialogContent>
      </Dialog>
      <ComentarioApartado
        setOpen={setOpenComentarioApartado}
        openState={openComentarioApartado}
      />
    </Grid>
  );
}
