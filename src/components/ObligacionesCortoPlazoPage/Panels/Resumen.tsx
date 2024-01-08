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
  Tooltip,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { format, lightFormat } from "date-fns";
import { useEffect, useState } from "react";
import { queries } from "../../../queries";
import { ObligadoSolidarioAval } from "../../../store/CreditoCortoPlazo/informacion_general";
import { useCortoPlazoStore } from "../../../store/CreditoCortoPlazo/main";
import { getDocumentos } from "../../APIS/pathDocSol/APISDocumentos";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { ComentarioApartado } from "../Dialogs/DialogComentarioApartado";
import { rolesAdmin } from "../Dialogs/DialogSolicitarModificacion";
import {
  headsComision,
  headsDisposicion,
  headsTasa,
} from "./CondicionesFinancieras";
import { IFile } from "./Documentacion";
import {
  IComisiones,
  ICondicionFinanciera,
  IDisposicion,
  ITasaInteres,
} from "../../../store/CreditoCortoPlazo/condicion_financiera";

interface Head {
  label: string;
}

interface HeadLabels {
  label: string;
  value: string;
}

export interface IPathDocumentos {
  Id: string;
  IdSolicitud: string;
  Ruta: string;
  NombreIdentificador: string;
  NombreArchivo: string;
}

const heads: Head[] = [
  {
    label: "Obligado Solidario / Aval",
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

export function Resumen({ coments }: { coments: boolean }) {
  const [showModalPrevia, setShowModalPrevia] = useState(false);

  // IdSolicitud
  const IdSolicitud: string = useCortoPlazoStore((state) => state.idSolicitud);

  // Encabezado
  const TipodeDocumento: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoDocumento
  );
  const SolicitanteAutorizado: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Nombre
  );
  const CargodelSolicitante: string = useCortoPlazoStore(
    (state) => state.encabezado.solicitanteAutorizado.Cargo
  );
  const TipodeEntePúblico: string = useCortoPlazoStore(
    (state) => state.encabezado.tipoEntePublico.TipoEntePublico
  );
  const MunicipiouOrganismo: string = useCortoPlazoStore(
    (state) => state.encabezado.organismo.Organismo
  );
  const FechadeContratación: string = useCortoPlazoStore(
    (state) => state.encabezado.fechaContratacion
  );

  // Informacion general
  const gFechadeContratación: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaContratacion
  );
  const FechadeVencimiento: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.fechaVencimiento
  );
  const Plazo: string = useCortoPlazoStore((state) =>
    state.informacionGeneral.plazo.toString()
  );
  const MontoOriginalContratado: string = useCortoPlazoStore((state) =>
    state.informacionGeneral.monto.toString()
  );
  const Destino: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.destino.Descripcion
  );
  const Denominación: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.denominacion
  );
  const InstituciónFinanciera: string = useCortoPlazoStore(
    (state) => state.informacionGeneral.institucionFinanciera.Descripcion
  );

  const tablaObligados: ObligadoSolidarioAval[] = useCortoPlazoStore(
    (state) => state.tablaObligadoSolidarioAval
  );

  // Condiciones Financieras
  const tablaCondicionesFinancieras: ICondicionFinanciera[] =
    useCortoPlazoStore((state) => state.tablaCondicionesFinancieras);

  // Documentación
  const documentos: IFile[] = useCortoPlazoStore(
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
  ];

  const [fileSelected, setFileSelected] = useState<any>("");

  const comentario: any = useCortoPlazoStore((state) => state.comentarios);

  const [arr, setArr] = useState<any>([]);

  const [cargados, setCargados] = useState(true);

  useEffect(() => {
    getDocumentos(
      `/SRPU/CORTOPLAZO/DOCSOL/${IdSolicitud}/`,
      setArr,
      setCargados
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

  const estatus: string = useCortoPlazoStore((state) => state.estatus);

  const activaAccion =
    (coments && estatus !== "Autorizado") ||
    (rolesAdmin.includes(localStorage.getItem("Rol")!) &&
      ((estatus === "Revision" && localStorage.getItem("Rol") === "Revisor") ||
        (estatus === "Validacion" &&
          localStorage.getItem("Rol") === "Validador") ||
        (estatus === "Autorizacion" &&
          localStorage.getItem("Rol") === "Autorizador")));

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
                {activaAccion && (
                  <Tooltip title="Añadir comentario a este apartado">
                    <IconButton
                      color={
                        comentario[head.label]
                          ? // ||
                            // comentariosRegistro[head.label]
                            "success"
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
                )}
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
                {activaAccion && (
                  <Tooltip title="Añadir comentario a este apartado">
                    <IconButton
                      color={
                        comentario[head.label]
                          ? // ||
                            // comentariosRegistro[head.label]
                            "success"
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
                )}

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
              {activaAccion && (
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentario["Tabla Obligado Solidario / Aval"]
                        ? // ||
                          // comentariosRegistro["Tabla Obligado Solidario / Aval"]
                          "success"
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
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip>
              )}
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
        {/* <Divider color="lightGrey"></Divider> */}

        <Grid mt={3} width={"100%"}>
          <Typography sx={queries.bold_text}>
            Condiciones Financieras
          </Typography>
          <Divider color="lightGrey"></Divider>
          <Grid item width={"100%"} mt={3} display={"flex"} height={350}>
            <Grid mt={4}>
              {activaAccion && (
                <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentario["Tabla Condiciones Financieras"]
                        ? // ||
                          // comentariosRegistro["Tabla Condiciones Financieras"]
                          "success"
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
              )}
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
                        {activaAccion && (
                          <StyledTableCell sx={{ width: "5%" }}>
                            <Tooltip title="Añadir comentario a este apartado">
                              <IconButton
                                color={
                                  comentario[row.descripcionTipo]
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
                          </StyledTableCell>
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
                            <Tooltip
                              title={"Mostrar vista previa del documento"}
                            >
                              {cargados ? (
                                <CircularProgress />
                              ) : (
                                <IconButton
                                  onClick={() => {
                                    toBase64(documentos[index].archivo)
                                      .then((data) => {
                                        setFileSelected(data);
                                      })
                                      .catch((err) => {
                                        setFileSelected(
                                          `data:application/pdf;base64,${
                                            arr.filter((td: any) =>
                                              td.NOMBREFORMATEADO.includes(
                                                row.nombreArchivo
                                              )
                                            )[0].FILE
                                          }`
                                        );
                                      });
                                    setShowModalPrevia(true);
                                  }}
                                >
                                  <FileOpenIcon />
                                </IconButton>
                              )}
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
