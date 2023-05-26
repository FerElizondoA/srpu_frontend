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
} from "@mui/material";
import { useState } from "react";
import { useCortoPlazoStore } from "../../../store/main";
import { queries } from "../../../queries";
import { format, lightFormat } from "date-fns";
import {
  CondicionFinanciera,
  IComisiones,
  TasaInteres,
} from "../../../store/condicion_financiera";
import { ObligadoSolidarioAval } from "../../../store/informacion_general";
import { StyledTableCell, StyledTableRow } from "../../CustomComponents";
import { IFile } from "./Documentacion";
import CloseIcon from "@mui/icons-material/Close";
import { headsComision, headsTasa } from "./CondicionesFinancieras";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import { ComentarioApartado } from "../Dialogs/DialogComentarioApartado";
import { IComentario } from "../../../store/comentarios_apartado";

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
    label: "Tipo de ente público obligado",
  },
  {
    label: "Ente público obligado",
  },
];

const headsCondiciones: Head[] = [
  {
    label: "Fecha de Disposición",
  },
  {
    label: "Importe de Disposición",
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

export function Resumen() {
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
  const tablaCondicionesFinancieras: CondicionFinanciera[] = useCortoPlazoStore(
    (state) => state.tablaCondicionesFinancieras
  );

  const comentarios: IComentario[] = useCortoPlazoStore(
    (state) => state.comentarios
  );

  // Documentación
  const documentos: IFile[] = useCortoPlazoStore(
    (state) => state.tablaDocumentos
  );

  const [openTasa, setOpenTasa] = useState(false);
  const [openComision, setOpenComision] = useState(false);

  const [rowTasa, setRowTasa] = useState<Array<TasaInteres>>([]);
  const [rowComision, setRowComision] = useState<Array<IComisiones>>([]);

  const [openComentarioApartado, setOpenComentarioApartado] = useState({
    open: false,
    apartado: "",
    tab: "",
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
      label: "Fecha de Contratación",
      value: FechadeContratación,
    },
    {
      label: "Cargo del Solicitante",
      value: CargodelSolicitante,
    },
  ];

  const infoGeneral: HeadLabels[] = [
    {
      label: "Fecha de Contratación",
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

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "85vh",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: ".5vw",
          mt: 1,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,5)",
          outline: "1px solid slategrey",
          borderRadius: 1,
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
                {/* <Tooltip title="Añadir comentario a este apartado">
                  <IconButton
                    color={
                      comentarios.filter(
                        (_, i) =>
                          _.Apartado === head.label && _.Tab === "Encabezado"
                      ).length > 0
                        ? "success"
                        : "primary"
                    }
                    size="small"
                    onClick={() => {
                      setOpenComentarioApartado({
                        open: true,
                        apartado: head.label,
                        tab: "Encabezado",
                      });
                    }}
                  >
                    <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                  </IconButton>
                </Tooltip> */}
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

        <Grid mt={5}>
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
                {/* <Tooltip title="Añadir comentario a este apartado">
                    <IconButton
                      color={
                        comentarios.filter(
                          (_, i) =>
                            _.Apartado === head.label &&
                            _.Tab === "Información General"
                        ).length > 0
                          ? "success"
                          : "primary"
                      }
                      size="small"
                      onClick={() => {
                        setOpenComentarioApartado({
                          open: true,
                          apartado: head.label,
                          tab: "Información General",
                        });
                      }}
                    >
                      <CommentIcon fontSize="small" sx={{ mr: 2 }} />
                    </IconButton>
                  </Tooltip> */}
                <Typography sx={queries.medium_text}>
                  <strong>{head.label}: </strong>
                  {head.label.includes("Fecha")
                    ? format(new Date(head.value), "dd/MM/yyyy")
                    : head.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Divider color="lightGrey"></Divider>
          <Grid item>
            <TableContainer>
              <Table>
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
            </TableContainer>
          </Grid>
        </Grid>

        <Grid mt={5}>
          <Typography sx={queries.bold_text}>
            Condiciones Financieras
          </Typography>
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
                        <StyledTableCell component="th" scope="row">
                          {format(
                            new Date(row.disposicion.fechaDisposicion),
                            "dd/MM/yyyy"
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {"$" + row.disposicion.importe}
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
                  <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
                    <TableContainer sx={{ maxHeight: "400px" }}>
                      <Table>
                        <TableHead sx={{ maxHeight: "200px" }}>
                          <TableRow>
                            {headsTasa.map((head, index) => (
                              <StyledTableCell key={index}>
                                <TableSortLabel>{head.label}</TableSortLabel>
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowTasa.map((row, index) => {
                            return (
                              <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
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
                  <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
                    <TableContainer sx={{ maxHeight: "400px" }}>
                      <Table>
                        <TableHead sx={{ maxHeight: "200px" }}>
                          <TableRow>
                            {headsComision.map((head, index) => (
                              <StyledTableCell key={index}>
                                <TableSortLabel>{head.label}</TableSortLabel>
                              </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rowComision.map((row, index) => {
                            return (
                              <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row">
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
                <ComentarioApartado
                  setOpen={setOpenComentarioApartado}
                  openState={openComentarioApartado}
                />
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Divider color="lightGrey"></Divider>
        <Grid mt={5}>
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
            {documentos.map((doc, index) => (
              <Grid key={index}>
                <Typography sx={queries.medium_text}>
                  {doc.descripcionTipo}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
