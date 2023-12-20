/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from "@mui/icons-material/Close";
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
  Tooltip,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { format, lightFormat } from "date-fns";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { ObligadoSolidarioAval } from "../../../store/CreditoCortoPlazo/informacion_general";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import {
  headsComision,
  headsDisposicion,
  headsTasa,
} from "./CondicionesFinancieras";
//"./CondicionesFinancieras";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ComentarioApartado } from "../Dialog/DialogComentarioApartado";
//"../Dialogs/DialogComentarioApartado";
import CommentIcon from "@mui/icons-material/Comment";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { listFile } from "../../APIS/pathDocSol/APISDocumentos";

import {
  Disposicion,
  IComisiones,
  TasaInteres,
} from "../../../store/CreditoCortoPlazo/condicion_financiera";
import { CondicionFinancieraLP } from "../../../store/CreditoLargoPlazo/condicion_financiera";
import { IFile } from "../../ObligacionesCortoPlazoPage/Panels/Documentacion";

interface Head {
  label: string;
}

interface HeadLabels {
  label: string;
  value: string;
}

const heads: Head[] = [
  {
    label: "Obligado solidario / aval",
  },
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

const headsGC: Head[] = [
  {
    label: "Destino",
  },
  {
    label: "Detalle de la inversión",
  },
  {
    label: "Descripcion",
  },
  {
    label: "Clave de Inscripción del Financiamiento",
  },
  {
    label: "Monto",
  },
];

const headsAutorizacion: Head[] = [
  {
    label: "Tipo de autorización",
  },
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
    label: "Tipo de autorización",
  },
  {
    label: "Documento soporte",
  },
  {
    label: "Detalle del destino",
  },
];

const headFideicomiso: Head[] = [
  {
    label: "Fideicomisario",
  },
  {
    label: "Orden fideicomisario",
  },
];

const headsAF: Head[] = [
  {
    label: "Destino",
  },
  {
    label: "Detalle de la Inversión",
  },
  {
    label: "Inversión Pública Productiva",
  },
  {
    label: "Periodo de Administración",
  },
  {
    label: "Gastos Adicionales",
  },
  {
    label: "Clave de Inscripción del Financiamiento",
  },
  {
    label: "Descripcion",
  },
  {
    label: "Monto",
  },
  {
    label: "Periodo de Financiamiento (Meses)",
  },
  {
    label: "Saldo Vigente",
  },
  {
    label: "Monto Gastos Adicionales",
  },
];

export function Resumen() {
  const [showModalPrevia, setShowModalPrevia] = useState(false);

  // IdSolicitud
  const IdSolicitud: string = useLargoPlazoStore((state) => state.idSolicitud);

  // Encabezado
  const TipodeDocumento: string = useLargoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );
  const SolicitanteAutorizado: string = useLargoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Nombre
  );
  const CargodelSolicitante: string = useLargoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Cargo
  );
  const TipodeEntePúblico: string = useLargoPlazoStore(
    (state) => state.encabezado.tipoEntePublico.TipoEntePublico
  );
  const MunicipiouOrganismo: string = useLargoPlazoStore(
    (state) => state.encabezado.organismo.Organismo
  );
  const FechadeContratación: string = useLargoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  // Informacion general
  const gFechadeContratación: string = useLargoPlazoStore(
    (state) => state.informacionGeneral.fechaContratacion
  );
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

  const tablaObligados: ObligadoSolidarioAval[] = useLargoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );

  //Destino / Gastos y Costos

  const gastosAdicionales: string = useLargoPlazoStore(
    (state) => state.GastosCostos.gastosAdicionales
  );

  const saldoVigente: number = useLargoPlazoStore(
    (state) => state.GastosCostos.saldoVigente
  );

  const montoGastosAdicionales: number = useLargoPlazoStore(
    (state) => state.GastosCostos.montoGastosAdicionales
  );

  const detalleInversionArchivo: { archivo: File; nombreArchivo: string } =
    useLargoPlazoStore((state) => state.archivoDetalleInversion);

  const tablaGastosCostos: any = useLargoPlazoStore(
    (state) => state.tablaGastosCostos
  );

  // Condiciones Financieras
  const tablaCondicionesFinancieras: CondicionFinancieraLP[] =
    useLargoPlazoStore((state) => state.tablaCondicionesFinancieras);

  const [openTasa, setOpenTasa] = useState(false);
  const [openComision, setOpenComision] = useState(false);

  const [rowTasa, setRowTasa] = useState<Array<TasaInteres>>([]);
  const [rowComision, setRowComision] = useState<Array<IComisiones>>([]);

  const [openComentarioApartado, setOpenComentarioApartado] = useState({
    open: false,
    apartado: "",
    tab: "Tab",
  });

  const encabezado: HeadLabels[] = [
    {
      label: "Tipo de Documento",
      value: TipodeDocumento,
    },
    {
      label: "Tipo de Ente Público",
      value: TipodeEntePúblico,
    },
    {
      label: "Solicitante Autorizado",
      value: SolicitanteAutorizado,
    },
    {
      label: "Municipio u Organismo",
      value: MunicipiouOrganismo,
    },
    {
      label: "Fecha de Contratación (Encabezado)",
      value: FechadeContratación,
    },
    {
      label: "Cargo del Solicitante",
      value: CargodelSolicitante,
    },
  ];

  const infoGeneral: HeadLabels[] = [
    {
      label: "Fecha de Contratación (Informacion General)",
      value: gFechadeContratación,
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
    // {
    //   label: "Tabla Info General",
    //   value: ""
    // }
  ];

  const GastoCostos: HeadLabels[] = [
    {
      label: "Inversión Pública Productiva (Archivo)",
      value: detalleInversionArchivo.nombreArchivo,
    },
    {
      label: "Gastos Adicionales",
      value: gastosAdicionales,
    },
    {
      label: "Saldo Vigente",
      value: saldoVigente.toString(),
    },
    {
      label: "Monto Gastos Adicionales",
      value: montoGastosAdicionales.toString(),
    },
  ];

  // const [pathDocumentos, setPathDocumentos] = useState<Array<IPathDocumentos>>(
  //   []
  // );

  const [fileSelected, setFileSelected] = useState<any>("");

  const tablaDocumentos: IFile[] = useLargoPlazoStore(
    (state) => state.tablaDocumentosLP
  );

  const comentario: any = useLargoPlazoStore((state) => state.comentarios);

  const [docsCargados, setDocsCargados] = useState(true);
  useEffect(() => {
    if (IdSolicitud !== "") {
      // getPathDocumentos(IdSolicitud, setPathDocumentos);
      listFile(`/DOCSOL/${IdSolicitud}`, setDocsCargados);
    }
  }, [IdSolicitud]);

  const [arr, setArr] = useState<any>([]);

  // useEffect(() => {
  //   if (
  //     pathDocumentos.length > 0 &&
  //     pathDocumentos[0]?.NombreArchivo !== undefined
  //   ) {
  //     // let loc: any = [...arr];
  //     // pathDocumentos?.map((val: any) => {
  //     //   return getDocumento(
  //     //     val?.Ruta.replaceAll(`${val?.NombreIdentificador}`, "/"),
  //     //     val?.NombreIdentificador,
  //     //     (res: any, index: number) => {
  //     //       loc.push({ file: res, nombre: val.NombreArchivo });
  //     //     }
  //     //   );
  //     // });
  //     // setArr(loc);
  //   }
  // }, [pathDocumentos]);

  const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const [rowDisposicion, setRowDisposicion] = useState<Array<Disposicion>>([]);
  const [openDisposicion, setOpenDisposicion] = useState(false);

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
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                {/* Revisar */}

                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentario[head.label] && comentario[head.label] !== ""
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
              <Grid sx={{ display: "flex", alignItems: "center" }}>
                {/* Revisar */}
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentario[head.label] && comentario[head.label] !== ""
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
                {/* Revisar */}

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

              <Tooltip title="Añadir comentario a este apartado">
                <IconButton
                  color={
                    comentario["Tabla Obligado Solidario Aval"] &&
                    comentario["Tabla Obligado Solidario Aval"] !== ""
                      ? "success"
                      : "primary"
                  }
                  size="small"
                  onClick={() => {
                    setOpenComentarioApartado({
                      open: true,
                      apartado: "Tabla Obligado Solidario Aval",
                      tab: "TabInformaciónGeneral",
                    });
                  }}
                >
                  <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                </IconButton>
              </Tooltip>

              {/* Revisar */}
            </Grid>

            <Paper sx={{ width: "96%" }}>
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
                              {row.obligadoSolidario}
                            </StyledTableCell>
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
                  //Condicional

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
                        <StyledTableCell component="th"></StyledTableCell>

                        <StyledTableCell component="th" align="left">
                          <Typography sx={{ padding: "1px 4px 1px 45px" }}>
                            Sin contenido
                          </Typography>
                        </StyledTableCell>

                        <StyledTableCell component="th"></StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/*PRUEBA!/************ */}

        <Grid width={"100%"}>
          <Typography sx={queries.bold_text}>
            Destino / Gastos y Costos Relacionados con la Contratación
          </Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
            }}
            mt={3}
            mb={3}
            width={"100%"}
          >
            <Divider color="lightGrey"></Divider>

            {GastoCostos.map((head, index) => (
              <Grid
                width={"100%"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentario[head.label] && comentario[head.label] !== ""
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: head.label,
                        tab: "Destino / Gastos y Costos",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                  </IconButton>
                </Tooltip>
                <Typography sx={{ ...queries.medium_text, mb: 2 }}>
                  <strong>{head.label}: </strong> {head.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid height={"50%"} display={"flex"} justifyContent={"space-evenly"}>
          <Grid>
            {/* Revisar */}
            <Tooltip title="Añadir comentario a este apartado">
              <IconButton
                color={
                  comentario["Tabla Gastos y Costos"] &&
                  comentario["Tabla Gastos y Costos"] !== ""
                    ? "success"
                    : "primary"
                }
                size="small"
                onClick={() => {
                  setOpenComentarioApartado({
                    open: true,
                    apartado: "Tabla Gastos y Costos",
                    tab: "TabGastos y Costos",
                  });
                }}
              >
                <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
              </IconButton>
            </Tooltip>
            {/* Revisar */}
          </Grid>
          <Paper sx={{ width: "96%" }}>
            <TableContainer
              sx={{
                height: "18rem",
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
                  {tablaGastosCostos.map((row: any, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.destino}
                        </StyledTableCell>

                        <StyledTableCell align="center" component="th">
                          {row.detalleInversion}
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
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid mt={3}>
          <Typography sx={queries.bold_text}>Autorizacion</Typography>
          <Divider color="lightGrey"></Divider>
        </Grid>

        <Grid
          height={"30%"}
          display={"flex"}
          justifyContent={"space-evenly"}
          mt={3}
          mb={4}
        >
          <Grid mt={4}>
            <Tooltip title="Añadir comentario a este apartado">
              <IconButton
                color={
                  comentario["Tabla Autorizacion"] &&
                  comentario["Tabla Autorizacion"] !== ""
                    ? "success"
                    : "primary"
                }
                size="small"
                onClick={() => {
                  setOpenComentarioApartado({
                    open: true,
                    apartado: "Tabla Autorizacion",
                    tab: "TabTabla Autorizacion",
                  });
                }}
              >
                <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Paper sx={{ width: "95%" }}>
            <TableContainer
              sx={{
                height: "20rem",
                width: "100%",
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
                    {headsAutorizacion.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        <TableSortLabel>{head.label}</TableSortLabel>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/*PRUEBA!/************ */}

        <Grid width={"100%"}>
          <Typography sx={queries.bold_text}>Fuente de pago</Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
            }}
            mt={3}
            mb={3}
            width={"100%"}
          >
            <Divider color="lightGrey"></Divider>

            {/* {vehiculoDePago.map((head, index) => (
              <Grid
                width={"100%"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentario[head.label] && comentario[head.label] !== ""
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: head.label,
                        tab: "Fuente de Pago",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                  </IconButton>
                </Tooltip>
                <Typography sx={{ ...queries.medium_text, mb: 2 }}>
                  <strong>{head.label}: </strong>
                </Typography>
              </Grid>
            ))} */}
          </Grid>
        </Grid>

        <Grid height={"50%"} display={"flex"} justifyContent={"space-evenly"}>
          <Grid>
            {/* Revisar */}
            <Tooltip title="Añadir comentario a este apartado">
              <IconButton
                color={
                  comentario["Tabla Fuente de Pago"] &&
                  comentario["Tabla Fuente de Pago"] !== ""
                    ? "success"
                    : "primary"
                }
                size="small"
                onClick={() => {
                  setOpenComentarioApartado({
                    open: true,
                    apartado: "Tabla Fuente de Pago",
                    tab: "TabFuente de Pago",
                  });
                }}
              >
                <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
              </IconButton>
            </Tooltip>
            {/* Revisar */}
          </Grid>

          <Paper sx={{ width: "95%" }}>
            <TableContainer
              sx={{
                height: "18rem",
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
              <Table>
                <TableHead>
                  <TableRow>
                    {headFideicomiso.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        <TableSortLabel>{head.label}</TableSortLabel>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* FIN BRUEBA*************** */}

        <Grid width={"100%"} mt={3}>
          <Typography sx={queries.bold_text}>Asignar Fuente</Typography>
          <Grid
            sx={{
              flexDirection: "row",
              mt: 1,
              alignItems: "center",
              borderBottom: 1,
              borderColor: "#cfcfcf",
              fontSize: "12px",
            }}
            mt={3}
            mb={3}
            width={"100%"}
          >
            <Divider color="lightGrey"></Divider>

            {/* {asignarFuente.map((head, index) => (
              <Grid
                width={"100%"}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentario[head.label] && comentario[head.label] !== ""
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: head.label,
                        tab: "Asignar Fuente",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
                  </IconButton>
                </Tooltip>
                <Typography sx={{ ...queries.medium_text, mb: 2 }}>
                  <strong>{head.label}: </strong>
                </Typography>
              </Grid>
            ))} */}
          </Grid>
        </Grid>

        <Grid item display={"flex"} mt={2} mb={2}>
          <Grid mt={2}>
            {/* Revisar */}
            <Tooltip title="Añadir comentario a este apartado">
              <IconButton
                color={
                  comentario["Tabla Asignar Fuente"] &&
                  comentario["Tabla Asignar Fuente"] !== ""
                    ? "success"
                    : "primary"
                }
                size="small"
                onClick={() => {
                  setOpenComentarioApartado({
                    open: true,
                    apartado: "Tabla Asignar Fuente",
                    tab: "TabTablaAsignar Fuente",
                  });
                }}
              >
                <CommentIcon fontSize="small" sx={{ mr: 2, mb: 2 }} />
              </IconButton>
            </Tooltip>
            {/* Revisar */}
          </Grid>

          <Paper sx={{ width: "95%" }}>
            <TableContainer
              sx={{
                height: 350,
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
              <Table>
                <TableHead>
                  <TableRow>
                    {headsAF.map((head, index) => (
                      <StyledTableCell align="center" key={index}>
                        <TableSortLabel>{head.label}</TableSortLabel>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid mt={3} width={"100%"}>
          <Typography sx={queries.bold_text}>
            Condiciones Financieras
          </Typography>
          <Divider color="lightGrey"></Divider>
          <Grid width={"100%"} mt={3} item display={"flex"} height={350}>
            <Grid mt={4}>
              {/* Revisar */}
              <Tooltip title="Añadir comentario a este apartado">
                <IconButton
                  color={
                    comentario["Tabla Condiciones Financieras"] &&
                    comentario["Tabla Condiciones Financieras"] !== ""
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
              {/* Revisar */}
            </Grid>

            <Paper sx={{ width: "95%" }}>
              {
                tablaCondicionesFinancieras.length > 0 ? (
                  <TableContainer
                    sx={{
                      height: 350,
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
                                {row.pagosDeCapital.periodicidadDePago}
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
                                        {row.tasa}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.periocidadPago}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.tasaReferencia}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.sobreTasa}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.diasEjercicio}
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
                                        {row.tipoDeComision}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {lightFormat(
                                          new Date(row.fechaContratacion),
                                          "dd-MM-yyyy"
                                        )}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.periodicidadDePago}
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
                      width: "100%",
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
                            <Typography>Sin contenido</Typography>
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
          <Divider color="lightGrey"></Divider>
          <Grid
            width={"100%"}
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
            <TableContainer
              sx={{
                width: "100%",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Comentarios</StyledTableCell>
                    <StyledTableCell>Tipo de documento</StyledTableCell>
                    <StyledTableCell>Documento cargado</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tablaDocumentos.map((row, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <Tooltip title="Añadir comentario a este apartado">
                          <IconButton
                            color={
                              comentario[row.descripcionTipo] &&
                              comentario[row.descripcionTipo] !== ""
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
                            {docsCargados ? (
                              <CircularProgress />
                            ) : (
                              <Tooltip
                                title={"Mostrar vista previa del documento"}
                              >
                                <IconButton
                                  onClick={() => {
                                    toBase64(tablaDocumentos[index].archivo)
                                      .then((data) => {
                                        setFileSelected(data);
                                      })
                                      .catch((err) => {
                                        setFileSelected(
                                          `data:application/pdf;base64,${
                                            arr.filter((td: any) =>
                                              td.nombre.includes(
                                                row.nombreArchivo
                                              )
                                            )[0].file
                                          }`
                                        );
                                      });
                                    setShowModalPrevia(true);
                                  }}
                                >
                                  <FileOpenIcon></FileOpenIcon>
                                </IconButton>
                              </Tooltip>
                            )}
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
          setArr([]);
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
            src={`${fileSelected}`}
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
