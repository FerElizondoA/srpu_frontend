/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  Divider,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Tooltip,
  Paper,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLargoPlazoStore } from "../../../store/CreditoLargoPlazo/main";
import { queries } from "../../../queries";
import { format, lightFormat } from "date-fns";
import {
  CondicionFinancieraLP,
  Disposicion,
  IComisiones,
  TasaInteres,
} from "../../../store/CreditoLargoPlazo/condicion_financiera";
import { ObligadoSolidarioAval } from "../../../store/informacion_general";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { IFileLP } from "./Documentacion";
import CloseIcon from "@mui/icons-material/Close";
import {
  headsComision,
  headsDisposicion,
  headsTasa,
} from "./CondicionesFinancieras";
//"./CondicionesFinancieras";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ComentarioApartado } from "../Dialog/DialogComentarioApartado";
//"../Dialogs/DialogComentarioApartado";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import CommentIcon from "@mui/icons-material/Comment";
import {
  getDocumento,
  getPathDocumentos,
  listFile,
} from "../../APIS/pathDocSol/APISDocumentos";
import { AsignarFuente } from "../../../store/CreditoLargoPlazo/FuenteDePago";

interface Head {
  label: string;
}

interface HeadLabels {
  label: string;
  value: string;
}

interface IPathDocumentos {
  Id: string;
  IdSolicitud: string;
  Ruta: string;
  NombreIdentificador: string;
  NombreArchivo: string;
}

const heads: Head[] = [
  {
    label: "Obligado solidario / aval",
  },
  {
    label: "Tipo de ente público obligado",
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
    label: "Periocidad de Pago Capital",
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

const headsAutorizacion: Head[] = [
  {
    label: "Accion",
  },
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

const headFP: Head[] = [
  {
    label: "Tipo de fuente de pago",
  },
  {
    label: "Fuente de pago",
  },
  {
    label: "% asignado del ingreso fondo ",
  },
  {
    label:
      "% acumulado de afectacion del fobierno del estado a los mecanismos de pago/100",
  },
  {
    label: "% de afectacion del gobierno del estado/100 del ingreso o fondo",
  },
  {
    label: "% afectado al fideicomiso",
  },
  {
    label: "% acumulado de afectación a los mecanismos de pago",
  },
  {
    label:
      "% asignado al financiemieno u obligación respecto del ingreso o fondo",
  },
  {
    label: "% acumulado de la asignacion a las obligaciones",
  },
  {
    label: "Accion",
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

  const destinoGC: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.destino.Descripcion
  );

  const detalleInversion: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.detalleInversion.Descripcion
  );

  const gastosAdicionales: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.gastosAdicionales
  );

  const claveInscripcionFinanciamiento: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.claveInscripcionFinanciamiento
  );
  const descripcion: string = useLargoPlazoStore(
    (state) => state.generalGastosCostos.descripcion
  );

  const montoGC: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.monto
  );

  const saldoVigente: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.saldoVigente
  );

  const montoGastosAdicionales: number = useLargoPlazoStore(
    (state) => state.generalGastosCostos.montoGastosAdicionales
  );

  // Condiciones Financieras
  const tablaCondicionesFinancieras: CondicionFinancieraLP[] =
    useLargoPlazoStore((state) => state.tablaCondicionesFinancieras);

  // Documentación
  const documentos: IFileLP[] = useLargoPlazoStore(
    (state) => state.tablaDocumentosLP
  );

  //Mecanismo o vehiculo de pago

  const vehiculoPago: string = useLargoPlazoStore(
    (state) => state.Mecanismo.vehiculoDePago
  );

  const numeroFideicomiso: string = useLargoPlazoStore(
    (state) => state.Mecanismo.numeroFideicomiso
  );

  const bonoCuponCero: string = useLargoPlazoStore(
    (state) => state.Mecanismo.bonoCuponCero
  );

  const clasificacionBono: string = useLargoPlazoStore(
    (state) => state.Mecanismo.clasificacionBonoCuponCero
  );

  //Asignar Fuente
  const clasificacion: string = useLargoPlazoStore(
    (state) => state.generalAsignarFuente.clasificacion
  );

  const tipoFuente: string = useLargoPlazoStore(
    (state) => state.generalAsignarFuente.tipoFuente
  );

  const fuentePago: string = useLargoPlazoStore(
    (state) => state.generalAsignarFuente.fuentePago
  );

  const Respecto: string = useLargoPlazoStore(
    (state) => state.generalAsignarFuente.Respecto
  );

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
      label: "Destino",
      value: clasificacion,
    },
    {
      label: "Detalle de la inversión",
      value: tipoFuente,
    },
    {
      label: "Inversión Pública Productiva",
      value: fuentePago,
    },
    {
      label: "Periodo de Administración",
      value: Respecto,
    },
    {
      label: "Gastos Adicionales",
      value: clasificacion,
    },
    {
      label: "Clave de Inscripcion del Financiamiento",
      value: tipoFuente,
    },
    {
      label: "Descripcion",
      value: fuentePago,
    },
    {
      label: "Monto",
      value: Respecto,
    },
    {
      label: "Periodo de Financiamiento (Meses)",
      value: tipoFuente,
    },
    {
      label: "Saldo Vigente",
      value: fuentePago,
    },
    {
      label: "Monto Gastos Adicionales",
      value: Respecto,
    },
  ];

  const vehiculoDePago: HeadLabels[] = [
    {
      label: "Mecanismo o vehículo de pago",
      value: vehiculoPago,
    },
    {
      label: "Numero del fideicomiso",
      value: numeroFideicomiso,
    },
    {
      label: "Bono cupón cero",
      value: bonoCuponCero,
    },
    {
      label: "Clasificacion del bono del cupon cero:",
      value: clasificacionBono,
    },
  ];

  const asignarFuente: HeadLabels[] = [
    {
      label: "Clasificacion",
      value: clasificacion,
    },
    {
      label: "Tipo de fuente",
      value: tipoFuente,
    },
    {
      label: "Fuente de pago",
      value: fuentePago,
    },
    {
      label: "Respecto a",
      value: Respecto,
    },
  ];

  const [pathDocumentos, setPathDocumentos] = useState<Array<IPathDocumentos>>(
    []
  );

  const [fileSelected, setFileSelected] = useState<any>("");

  const tablaDocumentos: IFileLP[] = useLargoPlazoStore(
    (state) => state.tablaDocumentos
  );

  const comentario: any = useLargoPlazoStore((state) => state.comentarios);

  useEffect(() => {
    if (IdSolicitud !== "") {
      getPathDocumentos(IdSolicitud, setPathDocumentos);
      listFile(`/DOCSOL/${IdSolicitud}`);
    }
  }, [IdSolicitud]);

  const [arr, setArr] = useState<any>([]);

  useEffect(() => {
    if (
      pathDocumentos.length > 0 &&
      pathDocumentos[0]?.NombreArchivo !== undefined
    ) {
      let loc: any = [...arr];
      pathDocumentos?.map((val: any) => {
        return getDocumento(
          val?.Ruta.replaceAll(`${val?.NombreIdentificador}`, "/"),
          val?.NombreIdentificador,
          (res: any, index: number) => {
            loc.push({ file: res, nombre: val.NombreArchivo });
          }
        );
      });
      setArr(loc);
    }
  }, [pathDocumentos]);

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
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "auto",
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
        <Grid mt={5}>
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
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip>

                <Typography sx={queries.medium_text}>
                  <strong>{head.label}: </strong>
                  {head.label.includes("Fecha")
                    ? format(new Date(head.value), "dd/MM/yyyy")
                    : head.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid mt={5} mb={4}>
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
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip>
                {/* Revisar */}

                <Typography sx={queries.medium_text}>
                  <strong>{head.label}: </strong>
                  {head.label.includes("Fecha")
                    ? format(new Date(head.value), "dd/MM/yyyy")
                    : head.value}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Grid item display="flex" height={350} mt={2} mb={2}>
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
                  <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                </IconButton>
              </Tooltip>

              {/* Revisar */}
            </Grid>

            <Paper sx={{ width: "100%" }}>
              <TableContainer
                sx={{
                  maxHeight: "100%",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: ".5vw",
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
          <Typography sx={queries.bold_text}>Destino / Gastos y Costos Relacionados con la Contratación</Typography>
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
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip>
                <Typography sx={queries.medium_text}>
                  <strong>{head.label}: </strong>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid mb={3} display={"flex"}>
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
                <CommentIcon fontSize="small" sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
            {/* Revisar */}
          </Grid>

          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ height: "20rem", width: "100%" }}>
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

        <Typography sx={queries.bold_text}>Autorizacion</Typography>
        <Divider color="lightGrey"></Divider>

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
                <CommentIcon fontSize="small" sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Paper sx={{ width: "95%" }}>
            <TableContainer sx={{ height: "20rem", width: "100%" }}>
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

            {vehiculoDePago.map((head, index) => (
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
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip>
                <Typography sx={queries.medium_text}>
                  <strong>{head.label}: </strong>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid display={"flex"}>
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
                <CommentIcon fontSize="small" sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
            {/* Revisar */}
          </Grid>

          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ height: "20rem", width: "100%" }}>
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

            {asignarFuente.map((head, index) => (
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
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip>
                <Typography sx={queries.medium_text}>
                  <strong>{head.label}: </strong>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid display={"flex"}>
          <Grid>
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
                <CommentIcon fontSize="small" sx={{ mr: 2 }} />
              </IconButton>
            </Tooltip>
            {/* Revisar */}
          </Grid>

          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ height: "20rem", width: "100%" }}>
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
          <Grid width={"103%"} mt={3} item display={"flex"} height={350}>
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
                  <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                </IconButton>
              </Tooltip>
              {/* Revisar */}
            </Grid>

            <Paper sx={{ width: "100%" }}>
              {
                tablaCondicionesFinancieras.length > 0 ? (
                  <TableContainer
                    sx={{
                      maxHeight: "100%",
                      width: "100%",
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        width: ".5vw",
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
        <Grid mt={5} mb={4}>
          <Typography sx={queries.bold_text}>Documentación</Typography>
          <Divider color="lightGrey"></Divider>
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
                    <StyledTableCell>Comentarios</StyledTableCell>
                    <StyledTableCell>Tipo de documento</StyledTableCell>
                    <StyledTableCell>Documento cargado</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documentos.map((row, index) => {
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
                                      console.log(
                                        arr.filter((td: any) =>
                                          td.nombre.includes(row.nombreArchivo)
                                        )[0].file
                                      );

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
